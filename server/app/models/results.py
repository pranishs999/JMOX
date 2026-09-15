# JMO Management System — Results & Rankings Models
from __future__ import annotations

import enum
from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4
from sqlalchemy import (
    DateTime,
    Enum,
    ForeignKey,
    Index,
    Integer,
    JSON,
    Numeric,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin, InstitutionMixin


class ResultStatus(str, enum.Enum):
    DRAFT = "draft"
    REVIEWED = "reviewed"
    PUBLISHED = "published"


class AssessmentResult(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "assessment_results"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    student_id: Mapped[UUID] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    olympiad_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiads.id", ondelete="CASCADE"), nullable=False
    )
    paper_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiad_papers.id", ondelete="CASCADE"), nullable=False
    )
    answer_key_id: Mapped[UUID] = mapped_column(
        ForeignKey("answer_keys.id", ondelete="CASCADE"), nullable=False
    )
    paper_version: Mapped[int] = mapped_column(Integer, nullable=False)
    class_at_time_of_exam: Mapped[UUID] = mapped_column(
        ForeignKey("classes.id", ondelete="RESTRICT"), nullable=False
    )
    batch_at_time_of_exam: Mapped[UUID] = mapped_column(
        ForeignKey("batches.id", ondelete="RESTRICT"), nullable=False
    )
    total_score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    max_possible_score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    percentage: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False, default=0.0)
    section_scores: Mapped[List[dict]] = mapped_column(JSON, nullable=False, default=list)
    correct_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    incorrect_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    unanswered_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    status: Mapped[ResultStatus] = mapped_column(
        Enum(ResultStatus, name="result_status", create_type=False),
        nullable=False,
        default=ResultStatus.DRAFT,
    )
    published_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    published_by: Mapped[Optional[UUID]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    # Relationships
    student: Mapped["Student"] = relationship("Student")
    olympiad: Mapped["Olympiad"] = relationship("Olympiad", back_populates="results")
    paper: Mapped["OlympiadPaper"] = relationship("OlympiadPaper", back_populates="results")
    answer_key: Mapped["AnswerKey"] = relationship("AnswerKey", back_populates="results")
    class_at_exam: Mapped["Class"] = relationship("Class", foreign_keys=[class_at_time_of_exam])
    batch_at_exam: Mapped["Batch"] = relationship("Batch", foreign_keys=[batch_at_time_of_exam])
    published_by_user: Mapped[Optional["User"]] = relationship("User", foreign_keys=[published_by])
    rankings: Mapped[List["Ranking"]] = relationship(
        "Ranking", back_populates="assessment_result", cascade="all, delete-orphan"
    )

    __table_args__ = (
        UniqueConstraint("student_id", "olympiad_id", "paper_id", name="uq_result_student_olympiad_paper"),
        Index("ix_results_olympiad_status", "olympiad_id", "status"),
        Index("ix_results_student", "student_id"),
    )

    @property
    def is_published(self) -> bool:
        return self.status == ResultStatus.PUBLISHED


class RankScope(str, enum.Enum):
    CLASS = "class"
    CROSS_CLASS = "cross_class"


class Ranking(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "rankings"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    assessment_result_id: Mapped[UUID] = mapped_column(
        ForeignKey("assessment_results.id", ondelete="CASCADE"), nullable=False
    )
    olympiad_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiads.id", ondelete="CASCADE"), nullable=False
    )
    class_id: Mapped[UUID] = mapped_column(
        ForeignKey("classes.id", ondelete="CASCADE"), nullable=False
    )
    rank: Mapped[int] = mapped_column(Integer, nullable=False)
    rank_scope: Mapped[RankScope] = mapped_column(
        Enum(RankScope, name="rank_scope", create_type=False), nullable=False
    )
    percentile: Mapped[Optional[float]] = mapped_column(Numeric(5, 2), nullable=True)

    # Relationships
    assessment_result: Mapped["AssessmentResult"] = relationship(
        "AssessmentResult", back_populates="rankings"
    )
    olympiad: Mapped["Olympiad"] = relationship("Olympiad")
    class_: Mapped["Class"] = relationship("Class")

    __table_args__ = (
        Index("ix_rankings_olympiad_scope", "olympiad_id", "rank_scope"),
        Index("ix_rankings_olympiad_class", "olympiad_id", "class_id"),
    )


class OMRStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    NEEDS_REVIEW = "needs_review"
    COMPLETED = "completed"
    FAILED = "failed"


class OMRSubmission(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "omr_submissions"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    batch_id: Mapped[UUID] = mapped_column(
        ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    paper_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiad_papers.id", ondelete="CASCADE"), nullable=False
    )
    uploaded_by: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), nullable=False
    )
    image_storage_key: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[OMRStatus] = mapped_column(
        Enum(OMRStatus, name="omr_status", create_type=False),
        nullable=False,
        default=OMRStatus.PENDING,
    )
    job_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    extracted_answers: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    error_message: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)

    # Relationships
    batch: Mapped["Batch"] = relationship("Batch", back_populates="omr_submissions")
    paper: Mapped["OlympiadPaper"] = relationship("OlympiadPaper", back_populates="omr_submissions")
    uploaded_by_user: Mapped["User"] = relationship("User")

    __table_args__ = (
        Index("ix_omr_status", "status"),
        Index("ix_omr_batch", "batch_id"),
    )


class AnswerEntryMethod(str, enum.Enum):
    MANUAL = "manual"
    OMR = "omr"


class StudentAnswer(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "student_answers"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    student_id: Mapped[UUID] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    question_id: Mapped[UUID] = mapped_column(
        ForeignKey("questions.id", ondelete="CASCADE"), nullable=False
    )
    paper_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiad_papers.id", ondelete="CASCADE"), nullable=False
    )
    olympiad_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiads.id", ondelete="CASCADE"), nullable=False
    )
    selected_option: Mapped[Optional[str]] = mapped_column(String(1), nullable=True)
    entry_method: Mapped[AnswerEntryMethod] = mapped_column(
        Enum(AnswerEntryMethod, name="answer_entry_method", create_type=False),
        nullable=False,
    )
    entered_by: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), nullable=False
    )

    # Relationships
    student: Mapped["Student"] = relationship("Student")
    question: Mapped["Question"] = relationship("Question", back_populates="student_answers")
    paper: Mapped["OlympiadPaper"] = relationship("OlympiadPaper")
    olympiad: Mapped["Olympiad"] = relationship("Olympiad")
    entered_by_user: Mapped["User"] = relationship("User")

    __table_args__ = (
        UniqueConstraint("student_id", "question_id", "paper_id", name="uq_student_answer_student_question_paper"),
        Index("ix_student_answers_student_paper", "student_id", "paper_id"),
    )