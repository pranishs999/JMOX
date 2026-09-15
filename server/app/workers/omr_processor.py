# JMO Management System — OMR Processing Worker
import asyncio
import json
import logging
from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import async_session_maker
from app.config import settings
from app.models.results import OMRSubmission, OMRStatus, StudentAnswer, AnswerEntryMethod
from app.models.olympiad import Question, OlympiadPaper, Section
from app.models.core import Student, StudentBatch, StudentBatchStatus

logger = logging.getLogger(__name__)


class OMRProcessor:
    """OMR processing worker - processes scanned OMR sheets."""

    def __init__(self, concurrency: int = 2):
        self.concurrency = concurrency
        self.semaphore = asyncio.Semaphore(concurrency)

    async def process_submission(self, submission_id: UUID) -> None:
        """Process a single OMR submission."""
        async with self.semaphore:
            async with async_session_maker() as db:
                try:
                    # Get submission
                    result = await db.execute(
                        select(OMRSubmission).where(OMRSubmission.id == submission_id)
                    )
                    submission = result.scalar_one_or_none()
                    if not submission:
                        logger.error(f"Submission {submission_id} not found")
                        return

                    # Update status to processing
                    await db.execute(
                        update(OMRSubmission)
                        .where(OMRSubmission.id == submission_id)
                        .values(status=OMRStatus.PROCESSING, updated_at=datetime.now(timezone.utc))
                    )
                    await db.commit()

                    # TODO: Actual OMR processing logic
                    # This would involve:
                    # 1. Download image from Supabase Storage
                    # 2. Run bubble detection (OpenCV, custom ML model, etc.)
                    # 3. Extract answers
                    # For now, simulate with mock data
                    extracted = await self._mock_ocr_processing(submission)

                    # Store extracted answers
                    await db.execute(
                        update(OMRSubmission)
                        .where(OMRSubmission.id == submission_id)
                        .values(
                            status=OMRStatus.NEEDS_REVIEW,
                            extracted_answers=extracted,
                            updated_at=datetime.now(timezone.utc),
                        )
                    )
                    await db.commit()

                    logger.info(f"OMR submission {submission_id} processed, needs review")

                except Exception as e:
                    logger.exception(f"Error processing OMR submission {submission_id}")
                    async with async_session_maker() as db:
                        await db.execute(
                            update(OMRSubmission)
                            .where(OMRSubmission.id == submission_id)
                            .values(
                                status=OMRStatus.FAILED,
                                error_message=str(e),
                                updated_at=datetime.now(timezone.utc),
                            )
                        )
                        await db.commit()

    async def _mock_ocr_processing(self, submission: OMRSubmission) -> dict:
        """Mock OCR processing - replace with actual implementation."""
        # Get paper structure
        paper_result = await async_session_maker().execute(
            select(OlympiadPaper).where(OlympiadPaper.id == submission.paper_id)
        )
        paper = paper_result.scalar_one_or_none()

        # Get sections and questions
        sections_result = await async_session_maker().execute(
            select(Section).where(Section.paper_id == submission.paper_id).order_by(Section.sort_order)
        )
        sections = sections_result.scalars().all()

        # Mock extracted answers
        extracted = {
            "paper_id": str(submission.paper_id),
            "batch_id": str(submission.batch_id),
            "answers": [],
            "confidence_scores": [],
        }

        for section in sections:
            questions_result = await async_session_maker().execute(
                select(Question).where(Question.section_id == section.id).order_by(Question.question_number)
            )
            questions = questions_result.scalars().all()

            for q in questions:
                # In real implementation, this would come from bubble detection
                # For now, return empty for teacher review
                extracted["answers"].append({
                    "question_id": str(q.id),
                    "selected_option": None,  # Will be filled by teacher
                    "confidence": 0.0,
                })
                extracted["confidence_scores"].append({
                    "question_id": str(q.id),
                    "confidence": 0.0,
                })

        return extracted

    async def confirm_answers(self, submission_id: UUID, reviewed_answers: list[dict], user_id: UUID) -> None:
        """Confirm reviewed answers and create StudentAnswer records."""
        async with async_session_maker() as db:
            submission = await db.get(OMRSubmission, submission_id)
            if not submission:
                raise ValueError("Submission not found")

            if submission.status != OMRStatus.NEEDS_REVIEW:
                raise ValueError("Submission not in review state")

            # Get paper questions for validation
            questions_result = await db.execute(
                select(Question).join(Section).where(Section.paper_id == submission.paper_id)
            )
            questions = {q.id: q for q in questions_result.scalars().all()}

            # Create StudentAnswer records
            for ans in reviewed_answers:
                q_id = UUID(ans["question_id"])
                if q_id not in questions:
                    continue

                # Get student for this question (from batch enrollment)
                # In reality, you'd map each OMR sheet to a specific student
                # For now, this is a simplified version
                pass

            # Update submission status
            await db.execute(
                update(OMRSubmission)
                .where(OMRSubmission.id == submission_id)
                .values(status=OMRStatus.COMPLETED, updated_at=datetime.now(timezone.utc))
            )
            await db.commit()


async def run_worker():
    """Main worker loop."""
    processor = OMRProcessor(concurrency=settings.OMR_WORKER_CONCURRENCY)
    logger.info("OMR Worker started")

    while True:
        try:
            async with async_session_maker() as db:
                # Find pending submissions
                result = await db.execute(
                    select(OMRSubmission)
                    .where(OMRSubmission.status == OMRStatus.PENDING)
                    .order_by(OMRSubmission.created_at)
                    .limit(10)
                )
                submissions = result.scalars().all()

                for submission in submissions:
                    # Mark as processing
                    await db.execute(
                        update(OMRSubmission)
                        .where(OMRSubmission.id == submission.id)
                        .values(status=OMRStatus.PROCESSING, updated_at=datetime.now(timezone.utc))
                    )
                    await db.commit()

                    # Process in background
                    asyncio.create_task(processor.process_submission(submission.id))

        except Exception as e:
            logger.exception("Error in worker loop")

        await asyncio.sleep(5)  # Poll interval


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(run_worker())