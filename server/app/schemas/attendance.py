# JMO Management System — Attendance Schemas
from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from app.schemas.common import PaginatedResponse
from app.models.attendance import AttendanceStatus


class AttendanceRecord(BaseModel):
    id: UUID
    student_id: UUID
    session_id: UUID
    status: str
    recorded_by: UUID
    sync_source: Optional[str]
    recorded_at: str

    class Config:
        from_attributes = True


class BulkAttendanceRequest(BaseModel):
    session_id: UUID
    records: List[AttendanceRecord]


class AttendanceSyncRecord(BaseModel):
    session_id: UUID
    student_id: UUID
    status: str = Field(..., pattern="^(present|absent|late|excused)$")
    recorded_at: str
    client_id: UUID


class AttendanceSyncRequest(BaseModel):
    records: List[AttendanceSyncRecord]


class AttendanceSyncResponse(BaseModel):
    synced: int
    conflicts: int