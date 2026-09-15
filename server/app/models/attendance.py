# JMO Management System — Attendance Model
from __future__ import annotations

import enum
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4
from sqlalchemy import (
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


class AttendanceStatus(str, enum.Enum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"
    EXCUSED = "excused"


class Attendance(Base, InstitutionMixin):
    __tablename__ = "attendance"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    student_id: Mapped[UUID] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    session_id: Mapped[UUID] = mapped_column(
        ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False
    )
    status: Mapped[AttendanceStatus] = mapped_column(
        Enum(AttendanceStatus, name="attendance_status", create_type=False),
        nullable=False,
    )
    recorded_by: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), nullable=False
    )
    sync_source: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    recorded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    student: Mapped["Student"] = relationship("Student")
    session: Mapped["Session"] = relationship("Session", back_populates="attendances")
    recorded_by_user: Mapped["User"] = relationship("User")

    __table_args__ = (
        UniqueConstraint("student_id", "session_id", name="uq_attendance_student_session"),
        Index("ix_attendance_session", "session_id"),
        Index("ix_attendance_student", "student_id"),
    )