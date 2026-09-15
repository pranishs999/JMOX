import pytest
from uuid import uuid4
from datetime import datetime, timezone
from app.models.attendance import AttendanceStatus
from app.core.attendance import resolve_attendance_conflict, AttendanceRecord

def test_attendance_status_transitions():
    assert AttendanceStatus.PRESENT.value == "present"
    assert AttendanceStatus.ABSENT.value == "absent"
    assert AttendanceStatus.LATE.value == "late"
    assert AttendanceStatus.EXCUSED.value == "excused"

def test_resolve_attendance_record_conflict():
    student_id = uuid4()
    session_id = uuid4()
    user_id = uuid4()
    t1 = datetime(2026, 9, 6, 10, 0, 0, tzinfo=timezone.utc)
    t2 = datetime(2026, 9, 6, 10, 5, 0, tzinfo=timezone.utc)

    rec1 = AttendanceRecord(student_id=student_id, session_id=session_id, status="present", recorded_at=t1, recorded_by=user_id)
    rec2 = AttendanceRecord(student_id=student_id, session_id=session_id, status="absent", recorded_at=t2, recorded_by=user_id)

    # Server timestamp precedence: rec2 (t2 > t1) wins -> client_wins
    resolution, winner = resolve_attendance_conflict(rec1, rec2)
    assert winner.status == "absent"
    assert resolution == "client_wins"

