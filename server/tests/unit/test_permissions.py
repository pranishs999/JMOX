import pytest
from uuid import uuid4
from app.models.core import UserRole
from app.core.permissions import (
    CurrentUser,
    BatchAssignment,
    is_admin,
    is_teacher,
    can_access_batch,
    can_access_student,
    can_publish_results,
    can_manage_users,
    can_manage_academic_structure,
    can_manage_papers_questions,
    can_manage_awards,
    can_view_audit_logs,
    can_manage_custom_fields,
    can_manage_settings,
    can_enter_answers,
    can_upload_omr,
)

def test_role_checks():
    admin_user = CurrentUser(id=uuid4(), public_id="USR-001", email="admin@jmox.org", role=UserRole.ADMIN, status="active")
    teacher_user = CurrentUser(id=uuid4(), public_id="USR-002", email="teacher@jmox.org", role=UserRole.TEACHER, status="active", teacher_id=uuid4())

    assert is_admin(admin_user) is True
    assert is_teacher(admin_user) is False

    assert is_admin(teacher_user) is False
    assert is_teacher(teacher_user) is True

def test_admin_permissions():
    admin_user = CurrentUser(id=uuid4(), public_id="USR-001", email="admin@jmox.org", role=UserRole.ADMIN, status="active")

    assert can_publish_results(admin_user) is True
    assert can_manage_users(admin_user) is True
    assert can_manage_academic_structure(admin_user) is True
    assert can_manage_papers_questions(admin_user) is True
    assert can_manage_awards(admin_user) is True
    assert can_view_audit_logs(admin_user) is True
    assert can_manage_custom_fields(admin_user) is True
    assert can_manage_settings(admin_user) is True

def test_teacher_permission_boundaries():
    teacher_id = uuid4()
    teacher_user = CurrentUser(id=uuid4(), public_id="USR-002", email="teacher@jmox.org", role=UserRole.TEACHER, status="active", teacher_id=teacher_id)

    # Teacher should NOT have administrative capabilities
    assert can_publish_results(teacher_user) is False
    assert can_manage_users(teacher_user) is False
    assert can_manage_academic_structure(teacher_user) is False
    assert can_manage_papers_questions(teacher_user) is False
    assert can_manage_awards(teacher_user) is False
    assert can_view_audit_logs(teacher_user) is False
    assert can_manage_custom_fields(teacher_user) is False
    assert can_manage_settings(teacher_user) is False

def test_batch_access_control():
    teacher1_id = uuid4()
    teacher2_id = uuid4()

    teacher1_user = CurrentUser(id=uuid4(), public_id="USR-002", email="t1@jmox.org", role=UserRole.TEACHER, status="active", teacher_id=teacher1_id)
    admin_user = CurrentUser(id=uuid4(), public_id="USR-001", email="admin@jmox.org", role=UserRole.ADMIN, status="active")

    batch_a = uuid4()
    batch_b = uuid4()

    assignments = [
        BatchAssignment(teacher_id=teacher1_id, batch_id=batch_a, is_active=True),
        BatchAssignment(teacher_id=teacher2_id, batch_id=batch_b, is_active=True),
    ]

    # Admin has access to all batches
    assert can_access_batch(admin_user, batch_a, assignments) is True
    assert can_access_batch(admin_user, batch_b, assignments) is True

    # Teacher 1 can access batch_a but NOT batch_b
    assert can_access_batch(teacher1_user, batch_a, assignments) is True
    assert can_access_batch(teacher1_user, batch_b, assignments) is False

def test_student_access_control():
    teacher1_id = uuid4()
    teacher1_user = CurrentUser(id=uuid4(), public_id="USR-002", email="t1@jmox.org", role=UserRole.TEACHER, status="active", teacher_id=teacher1_id)
    admin_user = CurrentUser(id=uuid4(), public_id="USR-001", email="admin@jmox.org", role=UserRole.ADMIN, status="active")

    batch_assigned = uuid4()
    batch_unassigned = uuid4()

    assignments = [
        BatchAssignment(teacher_id=teacher1_id, batch_id=batch_assigned, is_active=True),
    ]

    # Student in assigned batch
    assert can_access_student(admin_user, [batch_assigned], assignments) is True
    assert can_access_student(teacher1_user, [batch_assigned], assignments) is True

    # Student in unassigned batch only
    assert can_access_student(teacher1_user, [batch_unassigned], assignments) is False
