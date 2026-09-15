# JMO Management System — Core Permissions Logic
from dataclasses import dataclass
from typing import Optional
from uuid import UUID
from app.models.core import UserRole


@dataclass(frozen=True)
class CurrentUser:
    id: UUID
    public_id: str
    email: str
    role: UserRole
    status: str
    teacher_id: Optional[UUID] = None
    student_id: Optional[UUID] = None
    institution_id: UUID = None


@dataclass(frozen=True)
class BatchAssignment:
    teacher_id: UUID
    batch_id: UUID
    is_active: bool


def is_admin(user: CurrentUser) -> bool:
    return user.role == UserRole.ADMIN


def is_teacher(user: CurrentUser) -> bool:
    return user.role == UserRole.TEACHER


def is_student(user: CurrentUser) -> bool:
    return user.role == UserRole.STUDENT



def can_access_batch(
    user: CurrentUser,
    batch_id: UUID,
    teacher_assignments: list[BatchAssignment],
) -> bool:
    """Check if user can access a batch."""
    if is_admin(user):
        return True
    if is_teacher(user) and user.teacher_id:
        return any(
            a.batch_id == batch_id and a.is_active
            for a in teacher_assignments
            if a.teacher_id == user.teacher_id
        )
    return False


def can_access_student(
    user: CurrentUser,
    student_batch_ids: list[UUID],
    teacher_assignments: list[BatchAssignment],
) -> bool:
    """Check if user can access a student (via batch membership)."""
    if is_admin(user):
        return True
    if is_teacher(user) and user.teacher_id:
        assigned_batch_ids = {
            a.batch_id for a in teacher_assignments if a.teacher_id == user.teacher_id and a.is_active
        }
        return any(bid in assigned_batch_ids for bid in student_batch_ids)
    return False


def can_publish_results(user: CurrentUser) -> bool:
    """Only admins can publish results."""
    return is_admin(user)


def can_manage_users(user: CurrentUser) -> bool:
    """Only admins can manage user accounts."""
    return is_admin(user)


def can_manage_academic_structure(user: CurrentUser) -> bool:
    """Only admins can manage academic years, classes, batches."""
    return is_admin(user)


def can_manage_papers_questions(user: CurrentUser) -> bool:
    """Only admins can manage papers, sections, questions, answer keys."""
    return is_admin(user)


def can_enter_answers(user: CurrentUser, batch_id: UUID, teacher_assignments: list[BatchAssignment]) -> bool:
    """Admin and assigned teachers can enter answers."""
    if is_admin(user):
        return True
    return can_access_batch(user, batch_id, teacher_assignments)


def can_upload_omr(user: CurrentUser, batch_id: UUID, teacher_assignments: list[BatchAssignment]) -> bool:
    """Admin and assigned teachers can upload OMR."""
    return can_enter_answers(user, batch_id, teacher_assignments)


def can_review_omr(user: CurrentUser, batch_id: UUID, teacher_assignments: list[BatchAssignment]) -> bool:
    """Admin and assigned teachers can review OMR."""
    return can_enter_answers(user, batch_id, teacher_assignments)


def can_view_results(user: CurrentUser, batch_id: UUID, teacher_assignments: list[BatchAssignment]) -> bool:
    """Admin and assigned teachers can view results."""
    return can_enter_answers(user, batch_id, teacher_assignments)


def can_generate_reports(user: CurrentUser, batch_id: UUID | None, teacher_assignments: list[BatchAssignment]) -> bool:
    """Admin can generate all reports; teachers only for assigned batches."""
    if is_admin(user):
        return True
    if is_teacher(user) and batch_id:
        return can_access_batch(user, batch_id, teacher_assignments)
    return False


def can_manage_awards(user: CurrentUser) -> bool:
    """Only admins can manage awards and certificates."""
    return is_admin(user)


def can_view_audit_logs(user: CurrentUser) -> bool:
    """Only admins can view audit logs."""
    return is_admin(user)


def can_manage_custom_fields(user: CurrentUser) -> bool:
    """Only admins can manage custom fields."""
    return is_admin(user)


def can_manage_settings(user: CurrentUser) -> bool:
    """Only admins can manage settings."""
    return is_admin(user)