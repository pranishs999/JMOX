# JMO Management System — Academic Models (AcademicYear, Class, Batch, Session, TeacherBatch)
from __future__ import annotations

import enum
from datetime import date, datetime
from typing import List, Optional
from uuid import UUID, uuid4
from sqlalchemy import (
    Date,
    DateTime,
    Enum,
    ForeignKey,
    Index,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin, InstitutionMixin


class AcademicYear(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "academic_years"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=False)

    # Relationships
    classes: Mapped[List["Class"]] = relationship(
        "Class", back_populates="academic_year", cascade="all, delete-orphan"
    )
    olympiads: Mapped[List["Olympiad"]] = relationship(
        "Olympiad", back_populates="academic_year", cascade="all, delete-orphan"
    )

    __table_args__ = (
        # Partial unique index: only one active academic year per institution
        # This is implemented at DB level via migration
        Index("ix_academic_years_institution_active", "institution_id", "is_active"),
    )


class Class(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "classes"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    academic_year_id: Mapped[UUID] = mapped_column(
        ForeignKey("academic_years.id", ondelete="CASCADE"), nullable=False
    )
    sort_order: Mapped[int] = mapped_column(nullable=False, default=0)

    # Relationships
    academic_year: Mapped["AcademicYear"] = relationship(
        "AcademicYear", back_populates="classes"
    )
    batches: Mapped[List["Batch"]] = relationship(
        "Batch", back_populates="class_", cascade="all, delete-orphan"
    )
    student_enrollments: Mapped[List["StudentBatch"]] = relationship(
        "StudentBatch", back_populates="class_"
    )
    olympiad_papers: Mapped[List["OlympiadPaper"]] = relationship(
        "OlympiadPaper", back_populates="class_", cascade="all, delete-orphan"
    )

    __table_args__ = (
        UniqueConstraint(
            "institution_id", "academic_year_id", "name", name="uq_class_inst_year_name"
        ),
        Index("ix_classes_academic_year", "academic_year_id"),
    )


class BatchStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"


class Batch(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "batches"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    class_id: Mapped[UUID] = mapped_column(
        ForeignKey("classes.id", ondelete="CASCADE"), nullable=False
    )
    schedule_days: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    status: Mapped[BatchStatus] = mapped_column(
        Enum(BatchStatus, name="batch_status", values_callable=lambda x: [e.value for e in x], create_type=False),
        nullable=False,
        default=BatchStatus.ACTIVE,
    )

    # Relationships
    class_: Mapped["Class"] = relationship("Class", back_populates="batches")
    teacher_assignments: Mapped[List["TeacherBatch"]] = relationship(
        "TeacherBatch", back_populates="batch", cascade="all, delete-orphan"
    )
    student_enrollments: Mapped[List["StudentBatch"]] = relationship(
        "StudentBatch", back_populates="batch"
    )
    sessions: Mapped[List["Session"]] = relationship(
        "Session", back_populates="batch", cascade="all, delete-orphan"
    )
    omr_submissions: Mapped[List["OMRSubmission"]] = relationship(
        "OMRSubmission", back_populates="batch"
    )

    __table_args__ = (
        UniqueConstraint("class_id", "name", name="uq_batch_class_name"),
        Index("ix_batches_class_status", "class_id", "status"),
    )


class SessionStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Session(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "sessions"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    batch_id: Mapped[UUID] = mapped_column(
        ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    session_date: Mapped[date] = mapped_column(Date, nullable=False)
    session_number: Mapped[int] = mapped_column(nullable=False)
    status: Mapped[SessionStatus] = mapped_column(
        Enum(SessionStatus, name="session_status", create_type=False),
        nullable=False,
        default=SessionStatus.SCHEDULED,
    )

    # Relationships
    batch: Mapped["Batch"] = relationship("Batch", back_populates="sessions")
    attendances: Mapped[List["Attendance"]] = relationship(
        "Attendance", back_populates="session", cascade="all, delete-orphan"
    )

    __table_args__ = (
        UniqueConstraint(
            "batch_id", "session_date", "session_number", name="uq_session_batch_date_num"
        ),
        Index("ix_sessions_batch_date", "batch_id", "session_date"),
    )


class TeacherBatch(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "teacher_batches"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    teacher_id: Mapped[UUID] = mapped_column(
        ForeignKey("teachers.id", ondelete="CASCADE"), nullable=False
    )
    batch_id: Mapped[UUID] = mapped_column(
        ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    assigned_date: Mapped[date] = mapped_column(Date, nullable=False)
    removed_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    # Relationships
    teacher: Mapped["Teacher"] = relationship("Teacher", back_populates="batch_assignments")
    batch: Mapped["Batch"] = relationship("Batch", back_populates="teacher_assignments")

    __table_args__ = (
        # Partial unique index for active assignments: implemented in migration
        Index("ix_teacher_batches_teacher_active", "teacher_id", "removed_date"),
        Index("ix_teacher_batches_batch_active", "batch_id", "removed_date"),
    )