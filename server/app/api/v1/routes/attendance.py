# JMO Management System — Attendance Routes
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.academic import Batch, Session, TeacherBatch
from app.models.core import Student, StudentBatch, StudentBatchStatus, Teacher, User
from app.models.attendance import Attendance, AttendanceStatus
from app.schemas.common import PaginatedResponse
from app.schemas.attendance import (
    AttendanceRecord,
    BulkAttendanceRequest,
    AttendanceSyncRequest,
    AttendanceSyncResponse,
)

router = APIRouter(prefix="/attendance", tags=["attendance"])


@router.get("", response_model=PaginatedResponse)
async def list_attendance(
    session_id: Optional[UUID] = Query(None),
    student_id: Optional[UUID] = Query(None),
    status: Optional[str] = Query(None),
    batch_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Attendance).options(
        selectinload(Attendance.student),
        selectinload(Attendance.session).selectinload(Session.batch),
    )
    
    # Filter by institution
    query = query.where(Attendance.institution_id == current_user.institution_id)
    
    # Teacher access control
    if current_user.role.value == "teacher":
        # Get assigned batch IDs
        result = await db.execute(
            select(TeacherBatch.batch_id).where(
                TeacherBatch.teacher_id == current_user.teacher_id,
                TeacherBatch.removed_date.is_(None),
            )
        )
        assigned_batch_ids = [row[0] for row in result.all()]
        query = query.where(Attendance.session.has(Session.batch_id.in_(assigned_batch_ids)))
    
    if session_id:
        query = query.where(Attendance.session_id == session_id)
    
    if student_id:
        query = query.where(Attendance.student_id == student_id)
    
    if status:
        query = query.where(Attendance.status == status)
    
    if batch_id:
        query = query.join(Session).where(Session.batch_id == batch_id)
    
    # Count
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)
    
    query = query.offset((page - 1) * page_size).limit(page_size)
    query = query.order_by(Attendance.recorded_at.desc())
    
    result = await db.execute(query)
    records = result.scalars().all()
    
    items = []
    for r in records:
        items.append(AttendanceRecord(
            id=r.id,
            student_id=r.student_id,
            session_id=r.session_id,
            status=r.status.value,
            recorded_by=r.recorded_by,
            sync_source=r.sync_source,
            recorded_at=r.recorded_at,
        ))
    
    return PaginatedResponse(
        data=items,
        pagination={
            "page": page,
            "page_size": page_size,
            "total_count": total,
            "total_pages": (total + page_size - 1) // page_size,
        },
    )


@router.post("/batch", response_model=dict, status_code=status.HTTP_201_CREATED)
async def record_bulk_attendance(
    request: BulkAttendanceRequest,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    # Verify session exists and user has access
    session = await db.get(Session, request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Teacher access control
    if current_user.role.value == "teacher":
        result = await db.execute(
            select(TeacherBatch.batch_id).where(
                TeacherBatch.teacher_id == current_user.teacher_id,
                TeacherBatch.removed_date.is_(None),
            )
        )
        assigned_batch_ids = [row[0] for row in result.all()]
        if session.batch_id not in assigned_batch_ids:
            raise HTTPException(status_code=403, detail="Not assigned to this batch")
    
    # Record attendance
    recorded_by = current_user.id
    attendances = []
    
    for record in request.records:
        # Check for duplicate
        existing = await db.execute(
            select(Attendance).where(
                Attendance.student_id == record.student_id,
                Attendance.session_id == request.session_id,
            )
        )
        if existing.scalar_one_or_none():
            continue  # Skip duplicate
        
        attendance = Attendance(
            student_id=record.student_id,
            session_id=request.session_id,
            status=AttendanceStatus(record.status),
            recorded_by=recorded_by,
            sync_source="web",
            institution_id=session.institution_id,
        )
        db.add(attendance)
        attendances.append(attendance)
    
    # Update session status
    session.status = "completed"
    
    await db.commit()
    
    # Log audit
    from app.auth.service import log_audit
    from app.models.extras import AuditAction
    await log_audit(db, recorded_by, AuditAction.CREATE, "Attendance", batch_id or request.session_id,
                    after_value={"count": len(attendances)})
    
    return {"message": f"Recorded {len(attendances)} attendance records"}


@router.post("/sync", response_model=AttendanceSyncResponse)
async def sync_attendance_offline(
    request: AttendanceSyncRequest,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import sync_attendance_offline as sync_svc
    result = await sync_svc(db, request.records, current_user.id)
    return result