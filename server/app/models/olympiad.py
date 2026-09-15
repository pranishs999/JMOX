# JMO Management System — Olympiad & Paper Models
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
    Integer,
    JSON,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin, InstitutionMixin


class OlympiadStatus(str, enum.Enum):
    DRAFT = "draft"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class Olympiad(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "olympiads"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    olympiad_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    academic_year_id: Mapped[UUID] = mapped_column(
        ForeignKey("academic_years.id", ondelete="CASCADE"), nullable=False
    )
    status: Mapped[OlympiadStatus] = mapped_column(
        Enum(OlympiadStatus, name="olympiad_status", create_type=False),
        nullable=False,
        default=OlympiadStatus.DRAFT,
    )

    # Relationships
    academic_year: Mapped["AcademicYear"] = relationship(
        "AcademicYear", back_populates="olympiads"
    )
    papers: Mapped[List["OlympiadPaper"]] = relationship(
        "OlympiadPaper", back_populates="olympiad", cascade="all, delete-orphan"
    )
    results: Mapped[List["AssessmentResult"]] = relationship(
        "AssessmentResult", back_populates="olympiad"
    )
    awards: Mapped[List["Award"]] = relationship(
        "Award", back_populates="olympiad", cascade="all, delete-orphan"
    )


class OlympiadPaper(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "olympiad_papers"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    olympiad_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiads.id", ondelete="CASCADE"), nullable=False
    )
    class_id: Mapped[UUID] = mapped_column(
        ForeignKey("classes.id", ondelete="CASCADE"), nullable=False
    )
    version: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    total_marks: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    locked_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    olympiad: Mapped["Olympiad"] = relationship("Olympiad", back_populates="papers")
    class_: Mapped["Class"] = relationship("Class", back_populates="olympiad_papers")
    sections: Mapped[List["Section"]] = relationship(
        "Section", back_populates="paper", cascade="all, delete-orphan"
    )
    answer_keys: Mapped[List["AnswerKey"]] = relationship(
        "AnswerKey", back_populates="paper", cascade="all, delete-orphan"
    )
    results: Mapped[List["AssessmentResult"]] = relationship(
        "AssessmentResult", back_populates="paper"
    )
    omr_submissions: Mapped[List["OMRSubmission"]] = relationship(
        "OMRSubmission", back_populates="paper"
    )

    __table_args__ = (
        UniqueConstraint("olympiad_id", "class_id", "version", name="uq_paper_olympiad_class_version"),
        Index("ix_papers_olympiad_class", "olympiad_id", "class_id"),
    )

    @property
    def is_locked(self) -> bool:
        return self.locked_at is not None


class Section(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "sections"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    paper_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiad_papers.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)
    marks_per_question: Mapped[int] = mapped_column(Integer, nullable=False)
    negative_marks_per_question: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    # Relationships
    paper: Mapped["OlympiadPaper"] = relationship("OlympiadPaper", back_populates="sections")
    questions: Mapped[List["Question"]] = relationship(
        "Question", back_populates="section", cascade="all, delete-orphan"
    )

    __table_args__ = (
        UniqueConstraint("paper_id", "sort_order", name="uq_section_paper_order"),
        Index("ix_sections_paper", "paper_id"),
    )


class Question(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "questions"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    section_id: Mapped[UUID] = mapped_column(
        ForeignKey("sections.id", ondelete="CASCADE"), nullable=False
    )
    question_number: Mapped[int] = mapped_column(Integer, nullable=False)
    question_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    marks: Mapped[int] = mapped_column(Integer, nullable=False)
    negative_marks: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    num_options: Mapped[int] = mapped_column(Integer, nullable=False, default=4)

    # Relationships
    section: Mapped["Section"] = relationship("Section", back_populates="questions")
    options: Mapped[List["QuestionOption"]] = relationship(
        "QuestionOption", back_populates="question", cascade="all, delete-orphan"
    )
    student_answers: Mapped[List["StudentAnswer"]] = relationship(
        "StudentAnswer", back_populates="question"
    )
    answer_key_entries: Mapped[List["AnswerKeyEntry"]] = relationship(
        "AnswerKeyEntry", back_populates="question"
    )

    __table_args__ = (
        UniqueConstraint("section_id", "question_number", name="uq_question_section_number"),
        Index("ix_questions_section", "section_id"),
    )


class QuestionOption(Base):
    __tablename__ = "question_options"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    question_id: Mapped[UUID] = mapped_column(
        ForeignKey("questions.id", ondelete="CASCADE"), nullable=False
    )
    label: Mapped[str] = mapped_column(String(1), nullable=False)
    option_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    # Relationships
    question: Mapped["Question"] = relationship("Question", back_populates="options")

    __table_args__ = (
        UniqueConstraint("question_id", "label", name="uq_option_question_label"),
        Index("ix_question_options_question", "question_id"),
    )


class AnswerKey(Base, TimestampMixin, InstitutionMixin):
    __tablename__ = "answer_keys"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    paper_id: Mapped[UUID] = mapped_column(
        ForeignKey("olympiad_papers.id", ondelete="CASCADE"), nullable=False
    )
    version: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    locked_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_by: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), nullable=False
    )

    # Relationships
    paper: Mapped["OlympiadPaper"] = relationship("OlympiadPaper", back_populates="answer_keys")
    entries: Mapped[List["AnswerKeyEntry"]] = relationship(
        "AnswerKeyEntry", back_populates="answer_key", cascade="all, delete-orphan"
    )
    results: Mapped[List["AssessmentResult"]] = relationship(
        "AssessmentResult", back_populates="answer_key"
    )
    created_by_user: Mapped["User"] = relationship("User")

    __table_args__ = (
        UniqueConstraint("paper_id", "version", name="uq_answer_key_paper_version"),
        Index("ix_answer_keys_paper", "paper_id"),
    )

    @property
    def is_locked(self) -> bool:
        return self.locked_at is not None


class AnswerKeyEntry(Base):
    __tablename__ = "answer_key_entries"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    answer_key_id: Mapped[UUID] = mapped_column(
        ForeignKey("answer_keys.id", ondelete="CASCADE"), nullable=False
    )
    question_id: Mapped[UUID] = mapped_column(
        ForeignKey("questions.id", ondelete="CASCADE"), nullable=False
    )
    correct_option: Mapped[str] = mapped_column(String(1), nullable=False)

    # Relationships
    answer_key: Mapped["AnswerKey"] = relationship("AnswerKey", back_populates="entries")
    question: Mapped["Question"] = relationship("Question", back_populates="answer_key_entries")

    __table_args__ = (
        UniqueConstraint("answer_key_id", "question_id", name="uq_answer_key_entry_key_question"),
        Index("ix_answer_key_entries_key", "answer_key_id"),
    )