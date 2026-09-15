# JMO Management System — Reports Routes
from typing import List, Optional, Dict, Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.core import Student
from app.models.academic import Batch
from app.models.attendance import Attendance
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/attendance", response_model=PaginatedResponse)
async def attendance_report(
    batch_id: Optional[UUID] = Query(None),
    student_id: Optional[UUID] = Query(None),
    date_from: Optional[str] = Query(None),
    date_to: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Attendance).where(Attendance.institution_id == current_user.institution_id)
    if batch_id:
        from app.models.olympiad import OlympiadPaper  # just to check import works
        query = query.where(Attendance.batch_id == batch_id)
    if student_id:
        query = query.where(Attendance.student_id == student_id)
    if date_from:
        query = query.where(Attendance.recorded_at >= date_from)
    if date_to:
        query = query.where(Attendance.recorded_at <= date_to)
    query = query.order_by(Attendance.recorded_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.get("/results", response_model=PaginatedResponse)
async def results_report(
    batch_id: Optional[UUID] = Query(None),
    student_id: Optional[UUID] = Query(None),
    paper_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.results import AssessmentResult

    query = select(AssessmentResult).where(AssessmentResult.institution_id == current_user.institution_id)
    if batch_id:
        query = query.where(AssessmentResult.batch_at_time_of_exam == batch_id)
    if student_id:
        query = query.where(AssessmentResult.student_id == student_id)
    if paper_id:
        query = query.where(AssessmentResult.paper_id == paper_id)
    query = query.order_by(AssessmentResult.created_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.get("/student-progress/{student_id}", response_model=Dict[str, Any])
async def student_progress_report(
    student_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.core import Student
    from app.models.results import AssessmentResult
    from app.models.olympiad import Olympiad

    # Verify student belongs to user's institution
    student = await db.get(Student, student_id)
    if not student or student.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Student not found")

    # Get all results for this student
    results = await db.execute(select(AssessmentResult).where(AssessmentResult.student_id == student_id))
    results = results.scalars().all()

    # Get olympiads
    Olympiads = await db.execute(select(Olympiad).where(Olympiad.institution_id == current_user.institution_id))
    Olympiads = Olympiads.scalars().all()

    progress = {
        "student_id": student.id,
        "student_name": student.full_name,
        "results": []
    }

    for r in results:
        progress["results"].append({
            "result_id": r.id,
            "paper_id": str(r.paper_id) if r.paper_id else None,
            "olympiad_id": str(r.olympiad_id) if r.olympiad_id else None,
            "score": r.total_score,
            "max_score": r.max_possible_score,
            "percentage": float(r.percentage) if r.percentage else 0.0,
            "status": r.status.value,
            "published_at": str(r.published_at) if r.published_at else None,
        })

    return progress