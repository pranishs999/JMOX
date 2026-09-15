# JMO Management System — Public ID Configuration Model
from __future__ import annotations

import enum
from uuid import UUID, uuid4
from sqlalchemy import (
    String,
    Integer,
    UniqueConstraint,
    Index,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, TimestampMixin, InstitutionMixin

class PublicIDConfig(Base, TimestampMixin, InstitutionMixin):
    """Configuration for generating public IDs for entities.
    Allows institution-specific prefixes and sequence counters.
    """
    __tablename__ = "public_id_config"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    entity_type: Mapped[str] = mapped_column(String(50), nullable=False)  # e.g., 'student', 'teacher'
    prefix: Mapped[str] = mapped_column(String(10), nullable=False, default="JMO")
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    next_sequence: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    __table_args__ = (
        UniqueConstraint("institution_id", "entity_type", name="uq_public_id_config_inst_entity"),
        Index("ix_public_id_config_entity", "entity_type"),
    )

    def generate_public_id(self) -> str:
        """Generate the next public ID string based on config.
        Format: {prefix}-{year}-{sequence:04d}
        """
        seq = self.next_sequence
        self.next_sequence += 1
        return f"{self.prefix}-{self.year}-{seq:04d}"
