# JMO Management System — Core Models (User, Teacher, Student, Guardian)
from __future__ import annotations

import enum
from datetime import date, datetime
from typing import TYPE_CHECKING, List
from uuid import UUID, uuid4
from sqlalchemy import (
    Date,
    DateTime,
    Enum,
    ForeignKey,
    Index,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin, InstitutionMixin, SoftDeleteMixin
from .public_id_listeners import register_public_id_listeners


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"


class UserStatus(str, enum.Enum):
    INVITED = "invited"
    ACTIVE = "active"
    DISABLED = "disabled"


class User(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    public_id: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role", values_callable=lambda x: [e.value for e in x], create_type=False), nullable=False
    )
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus, name="user_status", values_callable=lambda x: [e.value for e in x], create_type=False),
        nullable=False,
        default=UserStatus.INVITED,
    )

    # Relationships
    teacher: Mapped["Teacher | None"] = relationship(
        "Teacher", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    student: Mapped["Student | None"] = relationship(
        "Student", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_users_institution_role", "institution_id", "role"),
        Index("ix_users_status", "status"),
    )


class Teacher(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "teachers"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    public_id: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="teacher")
    batch_assignments: Mapped[List["TeacherBatch"]] = relationship(
        "TeacherBatch", back_populates="teacher", cascade="all, delete-orphan"
    )


class StudentStatus(str, enum.Enum):
    ACTIVE = "active"
    WITHDRAWN = "withdrawn"


class StudentBatchStatus(str, enum.Enum):
    ACTIVE = "active"
    TRANSFERRED = "transferred"
    WITHDRAWN = "withdrawn"


class Student(Base, TimestampMixin, InstitutionMixin, SoftDeleteMixin):
    __tablename__ = "students"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    public_id: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    user_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), unique=True, nullable=True
    )
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    gender: Mapped[str | None] = mapped_column(String(20), nullable=True)
    photo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    guardian_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("guardians.id", ondelete="SET NULL"), nullable=True
    )
    status: Mapped[StudentStatus] = mapped_column(
        Enum(StudentStatus, name="student_status", values_callable=lambda x: [e.value for e in x], create_type=False),
        nullable=False,
        default=StudentStatus.ACTIVE,
    )

    # Relationships
    user: Mapped["User | None"] = relationship("User", back_populates="student")
    guardian: Mapped["Guardian | None"] = relationship(
        "Guardian", back_populates="students"
    )

    batch_enrollments: Mapped[List["StudentBatch"]] = relationship(
        "StudentBatch", back_populates="student", cascade="all, delete-orphan"
    )
    custom_field_values: Mapped[List["CustomFieldValue"]] = relationship(
        "CustomFieldValue", back_populates="student", cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_students_institution_status", "institution_id", "status"),
        Index("ix_students_full_name", "full_name"),
        Index("ix_students_guardian_id", "guardian_id"),
    )


class Guardian(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "guardians"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    relationship_type: Mapped[str | None] = mapped_column("relationship", String(50), nullable=True)

    phone: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # Relationships
    students = relationship(
        "Student", back_populates="guardian"
    )

    @property
    def relationship(self):
        return self.relationship_type


class StudentBatch(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "student_batches"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    student_id: Mapped[UUID] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    batch_id: Mapped[UUID] = mapped_column(
        ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    class_id: Mapped[UUID] = mapped_column(
        ForeignKey("classes.id", ondelete="CASCADE"), nullable=False
    )
    enrolled_date: Mapped[date] = mapped_column(Date, nullable=False)
    removed_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[StudentBatchStatus] = mapped_column(
        Enum(StudentBatchStatus, name="student_batch_status", values_callable=lambda x: [e.value for e in x], create_type=False),
        nullable=False,
        default=StudentBatchStatus.ACTIVE,
    )

    # Relationships
    student: Mapped["Student"] = relationship("Student", back_populates="batch_enrollments")
    batch: Mapped["Batch"] = relationship("Batch", back_populates="student_enrollments")
    class_: Mapped["Class"] = relationship("Class", back_populates="student_enrollments")

    __table_args__ = (
        Index("ix_student_batches_student_status", "student_id", "status"),
        Index("ix_student_batches_batch_status", "batch_id", "status"),
    )

# Register public_id listeners after model definitions
register_public_id_listeners(User, Teacher, Student)