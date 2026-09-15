# JMO Management System — Academic Routes (Classes, Batches, Academic Years)
from typing import Optional, List
from uuid import UUID
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.academic import AcademicYear, Class, Batch, BatchStatus, Session, SessionStatus, TeacherBatch
from app.models.core import StudentBatch, StudentBatchStatus
from app.schemas.common import (
    AcademicYearCreate, AcademicYearUpdate, AcademicYearResponse,
    ClassCreate, ClassUpdate, ClassResponse,
    BatchCreate, BatchUpdate, BatchResponse,
    PaginatedResponse,
)

router = APIRouter(prefix="/academic-years", tags=["academic-years"])


# Academic Years
@router.get("", response_model=PaginatedResponse)
async def list_academic_years(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(AcademicYear).where(AcademicYear.institution_id == current_user.institution_id)
    query = query.order_by(AcademicYear.start_date.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    years = result.scalars().all()

    items = []
    for ay in years:
        items.append(AcademicYearResponse(
            id=ay.id,
            name=ay.name,
            start_date=ay.start_date,
            end_date=ay.end_date,
            is_active=ay.is_active,
            class_count=0,  # TODO: count
            created_at=ay.created_at,
        ))

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("", response_model=AcademicYearResponse, status_code=status.HTTP_201_CREATED)
async def create_academic_year(
    data: AcademicYearCreate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import create_academic_year
    ay = await create_academic_year(
        db, data.name, data.start_date, data.end_date,
        current_user.institution_id, data.is_active, current_user.id,
    )
    return AcademicYearResponse(
        id=ay.id, name=ay.name, start_date=ay.start_date, end_date=ay.end_date,
        is_active=ay.is_active, class_count=0, created_at=ay.created_at,
    )


@router.put("/{year_id}/activate")
async def activate_academic_year(
    year_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    # Deactivate all
    await db.execute(
        AcademicYear.__table__.update()
        .where(AcademicYear.institution_id == current_user.institution_id)
        .values(is_active=False)
    )
    # Activate this one
    ay = await db.get(AcademicYear, year_id)
    if not ay or ay.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Academic year not found")
    ay.is_active = True
    await db.commit()
    return {"message": "Academic year activated"}


# Classes Router
classes_router = APIRouter(prefix="/classes", tags=["classes"])


@classes_router.get("", response_model=PaginatedResponse)
async def list_classes(
    academic_year_id: Optional[UUID] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Class).where(Class.institution_id == current_user.institution_id)
    if academic_year_id:
        query = query.where(Class.academic_year_id == academic_year_id)
    query = query.order_by(Class.sort_order)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    classes = result.scalars().all()

    items = []
    for c in classes:
        items.append(ClassResponse(
            id=c.id, name=c.name, academic_year_id=c.academic_year_id,
            sort_order=c.sort_order, batch_count=0, student_count=0, created_at=c.created_at,
        ))

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@classes_router.post("", response_model=ClassResponse, status_code=status.HTTP_201_CREATED)
async def create_class(
    data: ClassCreate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import create_class, create_academic_year
    academic_year_id = data.academic_year_id
    if not academic_year_id:
        active_ay = await db.scalar(
            select(AcademicYear.id).where(
                AcademicYear.institution_id == current_user.institution_id,
                AcademicYear.is_active == True,
            )
        )
        if not active_ay:
            active_ay = await db.scalar(
                select(AcademicYear.id).where(
                    AcademicYear.institution_id == current_user.institution_id
                )
            )
        if not active_ay:
            ay = await create_academic_year(
                db, "2026 Academic Session", date(2026, 1, 1), date(2026, 12, 31),
                current_user.institution_id, set_active=True, created_by=current_user.id
            )
            active_ay = ay.id
        academic_year_id = active_ay

    cls = await create_class(db, data.name, academic_year_id, data.sort_order, current_user.institution_id, current_user.id)
    return ClassResponse(id=cls.id, name=cls.name, academic_year_id=cls.academic_year_id, sort_order=cls.sort_order, batch_count=0, student_count=0, created_at=cls.created_at)



@classes_router.get("/{class_id}", response_model=ClassResponse)
async def get_class(
    class_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    cls = await db.get(Class, class_id)
    if not cls or cls.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Class not found")
    return ClassResponse(id=cls.id, name=cls.name, academic_year_id=cls.academic_year_id, sort_order=cls.sort_order, batch_count=0, student_count=0, created_at=cls.created_at)


@classes_router.put("/{class_id}", response_model=ClassResponse)
async def update_class(
    class_id: UUID,
    data: ClassUpdate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    cls = await db.get(Class, class_id)
    if not cls or cls.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Class not found")
    if data.name:
        cls.name = data.name
    if data.sort_order is not None:
        cls.sort_order = data.sort_order
    await db.commit()
    return ClassResponse(id=cls.id, name=cls.name, academic_year_id=cls.academic_year_id, sort_order=cls.sort_order, batch_count=0, student_count=0, created_at=cls.created_at)


@classes_router.delete("/{class_id}")
async def delete_class(
    class_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    cls = await db.get(Class, class_id)
    if not cls or cls.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Class not found")
    # Check if empty
    batch_count = await db.scalar(select(func.count(Batch.id)).where(Batch.class_id == class_id))
    if batch_count > 0:
        raise HTTPException(status_code=400, detail="Class has batches, cannot delete")
    await db.delete(cls)
    await db.commit()
    return {"message": "Class deleted"}


# Batches Router
batches_router = APIRouter(prefix="/batches", tags=["batches"])


@batches_router.get("", response_model=PaginatedResponse)
async def list_batches(
    class_id: Optional[UUID] = None,
    status: Optional[BatchStatus] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Batch).options(selectinload(Batch.class_)).where(Batch.institution_id == current_user.institution_id)
    if class_id:
        query = query.where(Batch.class_id == class_id)
    if status:
        query = query.where(Batch.status == status)
    query = query.order_by(Batch.name)

    # Teacher filter
    if current_user.role.value == "teacher":
        teacher_batches = await db.execute(
            select(TeacherBatch.batch_id).where(
                TeacherBatch.teacher_id == current_user.teacher_id,
                TeacherBatch.removed_date.is_(None),
            )
        )
        assigned_ids = [r[0] for r in teacher_batches.all()]
        query = query.where(Batch.id.in_(assigned_ids))

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    batches = result.scalars().all()

    items = []
    for b in batches:
        student_count = await db.scalar(
            select(func.count(StudentBatch.id)).where(
                StudentBatch.batch_id == b.id, StudentBatch.status == StudentBatchStatus.ACTIVE,
            )
        )
        items.append(BatchResponse(
            id=b.id, name=b.name, class_id=b.class_id, class_name=b.class_.name if b.class_ else None,
            schedule_days=b.schedule_days, status=b.status.value, teacher_count=0, student_count=student_count or 0,
            created_at=b.created_at,
        ))

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@batches_router.post("", response_model=BatchResponse, status_code=status.HTTP_201_CREATED)
async def create_batch(
    data: BatchCreate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import create_batch
    batch = await create_batch(db, data.name, data.class_id, data.schedule_days, current_user.institution_id, current_user.id)
    return BatchResponse(id=batch.id, name=batch.name, class_id=batch.class_id, class_name=None, schedule_days=batch.schedule_days, status=batch.status.value, teacher_count=0, student_count=0, created_at=batch.created_at)


@batches_router.get("/{batch_id}", response_model=BatchResponse)
async def get_batch(
    batch_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    batch = await db.get(Batch, batch_id)
    if not batch or batch.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Batch not found")
    student_count = await db.scalar(select(func.count(StudentBatch.id)).where(StudentBatch.batch_id == batch_id, StudentBatch.status == StudentBatchStatus.ACTIVE))
    return BatchResponse(id=batch.id, name=batch.name, class_id=batch.class_id, class_name=None, schedule_days=batch.schedule_days, status=batch.status.value, teacher_count=0, student_count=student_count or 0, created_at=batch.created_at)


@batches_router.put("/{batch_id}", response_model=BatchResponse)
async def update_batch(
    batch_id: UUID,
    data: BatchUpdate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    batch = await db.get(Batch, batch_id)
    if not batch or batch.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Batch not found")
    if data.name:
        batch.name = data.name
    if data.schedule_days is not None:
        batch.schedule_days = data.schedule_days
    if data.status:
        batch.status = BatchStatus(data.status)
    await db.commit()
    return BatchResponse(id=batch.id, name=batch.name, class_id=batch.class_id, class_name=None, schedule_days=batch.schedule_days, status=batch.status.value, teacher_count=0, student_count=0, created_at=batch.created_at)


@batches_router.get("/{batch_id}/students")
async def get_batch_students(
    batch_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    # Verify access
    batch = await db.get(Batch, batch_id)
    if not batch or batch.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Batch not found")

    if current_user.role.value == "teacher":
        tb = await db.execute(select(TeacherBatch).where(TeacherBatch.teacher_id == current_user.teacher_id, TeacherBatch.batch_id == batch_id, TeacherBatch.removed_date.is_(None)))
        if not tb.scalar_one_or_none():
            raise HTTPException(status_code=403, detail="Not assigned to this batch")

    enrollments = await db.execute(
        select(StudentBatch).where(StudentBatch.batch_id == batch_id, StudentBatch.status == StudentBatchStatus.ACTIVE).options(selectinload(StudentBatch.student))
    )
    enrollments = enrollments.scalars().all()
    return [{"id": e.student.id, "public_id": e.student.public_id, "full_name": e.student.full_name} for e in enrollments]


@batches_router.get("/{batch_id}/sessions")
async def get_batch_sessions(
    batch_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    batch = await db.get(Batch, batch_id)
    if not batch or batch.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Batch not found")

    sessions = await db.execute(select(Session).where(Session.batch_id == batch_id).order_by(Session.session_date))
    return [{"id": s.id, "session_date": s.session_date, "session_number": s.session_number, "status": s.status.value} for s in sessions.scalars().all()]


@batches_router.post("/{batch_id}/sessions/generate")
async def generate_batch_sessions(
    batch_id: UUID,
    start_date: date,
    end_date: date,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import generate_sessions
    sessions = await generate_sessions(db, batch_id, start_date, end_date, current_user.id)
    return {"generated": len(sessions)}