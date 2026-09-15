# JMO Management System — OMR Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.attendance import Attendance, AttendanceStatus as OMRStatus
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/omr", tags=["omr"])


@router.get("", response_model=PaginatedResponse)
async def list_omr_submissions(
    status: Optional[str] = Query(None),
    paper_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(OMRSubmission).where(OMRSubmission.institution_id == current_user.institution_id)
    if status:
        query = query.where(OMRSubmission.status == status)
    if paper_id:
        from app.models.olympiad import OlympiadPaper
        paper = await db.get(OlympiadPaper, paper_id)
        if not paper or paper.institution_id != current_user.institution_id:
            raise HTTPException(status_code=404, detail="Paper not found")
        query = query.where(OMRSubmission.paper_id == paper_id)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("/{submission_id}/confirm", response_model=dict)
async def confirm_omr_submission(
    submission_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.attendance import OMRSubmission

    submission = await db.get(OMRSubmission, submission_id)
    if not submission or submission.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="OMR submission not found")

    submission.status = "confirmed"
    await db.commit()
    return {"id": submission.id, "status": submission.status, "confirmed_at": submission.updated_at}