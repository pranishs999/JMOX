# JMO Management System — Core Attendance Logic
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from uuid import UUID


@dataclass(frozen=True)
class AttendanceRecord:
    student_id: UUID
    session_id: UUID
    status: str
    recorded_at: datetime
    recorded_by: UUID
    sync_source: Optional[str] = None
    client_id: Optional[UUID] = None


@dataclass(frozen=True)
class SyncConflict:
    client_id: UUID
    student_id: UUID
    session_id: UUID
    client_status: str
    server_status: str
    resolution: str  # "server_wins" or "client_wins"
    audit_log_id: UUID


def resolve_attendance_conflict(
    existing: AttendanceRecord,
    incoming: AttendanceRecord,
) -> tuple[str, AttendanceRecord]:
    """
    Resolve conflict between existing (server) and incoming (client) attendance.
    Server timestamp wins. Return (resolution, winning_record).
    """
    if existing.recorded_at >= incoming.recorded_at:
        return ("server_wins", existing)
    else:
        return ("client_wins", incoming)


def deduplicate_attendance(
    records: list[AttendanceRecord],
) -> tuple[list[AttendanceRecord], list[SyncConflict]]:
    """
    Deduplicate attendance records by (student_id, session_id).
    For conflicts, server timestamp wins.
    Returns (deduplicated_records, conflicts).
    """
    seen: dict[tuple[UUID, UUID], AttendanceRecord] = {}
    conflicts: list[SyncConflict] = []

    for record in records:
        key = (record.student_id, record.session_id)
        if key not in seen:
            seen[key] = record
        else:
            existing = seen[key]
            resolution, winner = resolve_attendance_conflict(existing, record)
            if resolution == "client_wins":
                seen[key] = winner
            # Log conflict regardless of resolution
            from uuid import uuid4
            conflicts.append(
                SyncConflict(
                    client_id=record.client_id or uuid4(),
                    student_id=record.student_id,
                    session_id=record.session_id,
                    client_status=record.status,
                    server_status=existing.status,
                    resolution=resolution,
                    audit_log_id=uuid4(),
                )
            )

    return list(seen.values()), conflicts