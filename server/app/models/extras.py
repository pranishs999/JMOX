# JMO Management System — Awards, Certificates, Custom Fields, Audit Log Models
from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4
from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    JSON,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin, InstitutionMixin, SoftDeleteMixin


class Award(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "awards"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    olympiad_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiads.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    criteria_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    min_rank: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    min_percentage: Mapped[Optional[float]] = mapped_column(Numeric(5, 2), nullable=True)

    # Relationships
    olympiad: Mapped["Olympiad"] = relationship("Olympiad", back_populates="awards")
    certificates: Mapped[List["Certificate"]] = relationship(
        "Certificate", back_populates="award", cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_awards_olympiad", "olympiad_id"),
    )


class Certificate(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "certificates"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    student_id: Mapped[UUID] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    award_id: Mapped[UUID] = mapped_column(
        ForeignKey("awards.id", ondelete="CASCADE"), nullable=False
    )
    olympiad_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiads.id", ondelete="CASCADE"), nullable=False
    )
    assessment_result_id: Mapped[UUID] = mapped_column(
        ForeignKey("assessment_results.id", ondelete="CASCADE"), nullable=False
    )
    certificate_url: Mapped[str] = mapped_column(String(500), nullable=False)
    issued_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    issued_by: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), nullable=False
    )

    # Relationships
    student: Mapped["Student"] = relationship("Student")
    award: Mapped["Award"] = relationship("Award", back_populates="certificates")
    olympiad: Mapped["Olympiad"] = relationship("Olympiad")
    assessment_result: Mapped["AssessmentResult"] = relationship("AssessmentResult")
    issued_by_user: Mapped["User"] = relationship("User")

    __table_args__ = (
        Index("ix_certificates_student", "student_id"),
        Index("ix_certificates_olympiad", "olympiad_id"),
    )


class CustomFieldType(str):
    TEXT = "text"
    NUMBER = "number"
    DATE = "date"
    DROPDOWN = "dropdown"


class CustomField(Base, TimestampMixin, InstitutionMixin, SoftDeleteMixin):
    __tablename__ = "custom_fields"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    field_name: Mapped[str] = mapped_column(String(100), nullable=False)
    field_type: Mapped[str] = mapped_column(String(20), nullable=False)
    dropdown_options: Mapped[Optional[List[str]]] = mapped_column(JSON, nullable=True)
    is_required: Mapped[bool] = mapped_column(nullable=False, default=False)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)

    # Relationships
    values: Mapped[List["CustomFieldValue"]] = relationship(
        "CustomFieldValue", back_populates="custom_field", cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_custom_fields_institution_active", "institution_id", "is_active"),
    )


class CustomFieldValue(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "custom_field_values"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    custom_field_id: Mapped[UUID] = mapped_column(
        ForeignKey("custom_fields.id", ondelete="CASCADE"), nullable=False
    )
    student_id: Mapped[UUID] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    value: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    custom_field: Mapped["CustomField"] = relationship("CustomField", back_populates="values")
    student: Mapped["Student"] = relationship("Student", back_populates="custom_field_values")

    __table_args__ = (
        UniqueConstraint("custom_field_id", "student_id", name="uq_custom_field_value_field_student"),
        Index("ix_custom_field_values_student", "student_id"),
    )


class AuditAction(str):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"
    PUBLISH = "publish"
    UNPUBLISH = "unpublish"
    ACTIVATE = "activate"
    DEACTIVATE = "deactivate"
    TRANSFER = "transfer"
    WITHDRAW = "withdraw"
    SYNC_CONFLICT = "sync_conflict"
    LOGIN = "login"
    LOGOUT = "logout"


class AuditLog(Base, InstitutionMixin):
    __tablename__ = "audit_logs"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    user_id: Mapped[Optional[UUID]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    action: Mapped[str] = mapped_column(String(50), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(100), nullable=False)
    entity_id: Mapped[UUID] = mapped_column(nullable=False)
    before_value: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    after_value: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    ip_address: Mapped[Optional[str]] = mapped_column(String(45), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    is_conflict: Mapped[bool] = mapped_column(nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationships
    user: Mapped[Optional["User"]] = relationship("User")

    __table_args__ = (
        Index("ix_audit_logs_entity", "entity_type", "entity_id"),
        Index("ix_audit_logs_user", "user_id"),
        Index("ix_audit_logs_created", "created_at"),
        Index("ix_audit_logs_conflict", "is_conflict", postgresql_where="is_conflict = true"),
    )