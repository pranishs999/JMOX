# JMO Management System — Teachers Router
from typing import Optional, List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.core import Teacher, User, UserRole, UserStatus
from app.models.academic import Batch, TeacherBatch
from app.schemas.common import (
    TeacherCreate, TeacherUpdate, TeacherResponse, LoginPassResponse,
    PaginatedResponse,
)

router = APIRouter(prefix="/teachers", tags=["teachers"])


@router.get("", response_model=PaginatedResponse)
async def list_teachers(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    status: Optional[UserStatus] = None,
    search: Optional[str] = None,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Teacher).options(
        selectinload(Teacher.user),
        selectinload(Teacher.batch_assignments).selectinload(TeacherBatch.batch),
    )

    if status:
        query = query.join(User).where(User.status == status)

    if search:
        query = query.where(
            Teacher.full_name.ilike(f"%{search}%") |
            Teacher.public_id.ilike(f"%{search}%") |
            User.email.ilike(f"%{search}%")
        )

    query = query.where(Teacher.institution_id == current_user.institution_id)

    # Count
    from sqlalchemy import func
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    teachers = result.scalars().all()

    items = []
    for t in teachers:
        active_batches = [
            {"id": str(a.batch_id), "name": a.batch.name}
            for a in t.batch_assignments if a.removed_date is None
        ]
        items.append(TeacherResponse(
            id=t.id,
            public_id=t.public_id,
            full_name=t.full_name,
            email=t.user.email,
            phone=t.phone,
            status=t.user.status.value,
            assigned_batches=active_batches,
            created_at=t.created_at,
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


@router.post("", response_model=TeacherResponse, status_code=status.HTTP_201_CREATED)
async def create_teacher(
    data: TeacherCreate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import create_teacher
    teacher, plain_password = await create_teacher(
        db, data.full_name, data.email, data.phone,
        current_user.institution_id, current_user.id,
        password=data.password,
    )
    await db.refresh(teacher, ["user"])
    return TeacherResponse(
        id=teacher.id,
        public_id=teacher.public_id,
        full_name=teacher.full_name,
        email=teacher.user.email,
        phone=teacher.phone,
        status=teacher.user.status.value,
        assigned_batches=[],
        login_pass=LoginPassResponse(
            public_id=teacher.public_id,
            full_name=teacher.full_name,
            email_or_username=teacher.user.email,
            password=plain_password,
            role="teacher",
            status=teacher.user.status.value,
        ),
        created_at=teacher.created_at,
    )



@router.get("/{teacher_id}", response_model=TeacherResponse)
async def get_teacher(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    active_batches = [
        {"id": str(a.batch_id), "name": a.batch.name}
        for a in teacher.batch_assignments if a.removed_date is None
    ]
    return TeacherResponse(
        id=teacher.id,
        public_id=teacher.public_id,
        full_name=teacher.full_name,
        email=teacher.user.email,
        phone=teacher.phone,
        status=teacher.user.status.value,
        assigned_batches=active_batches,
        created_at=teacher.created_at,
    )


@router.put("/{teacher_id}", response_model=TeacherResponse)
async def update_teacher(
    teacher_id: UUID,
    data: TeacherUpdate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    if data.full_name:
        teacher.full_name = data.full_name
    if data.phone is not None:
        teacher.phone = data.phone

    await db.commit()
    await db.refresh(teacher, ["user"])

    active_batches = [
        {"id": str(a.batch_id), "name": a.batch.name}
        for a in teacher.batch_assignments if a.removed_date is None
    ]
    return TeacherResponse(
        id=teacher.id,
        public_id=teacher.public_id,
        full_name=teacher.full_name,
        email=teacher.user.email,
        phone=teacher.phone,
        status=teacher.user.status.value,
        assigned_batches=active_batches,
        created_at=teacher.created_at,
    )


@router.post("/{teacher_id}/deactivate")
async def deactivate_teacher(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    from app.services import deactivate_teacher as deactivate_svc
    await deactivate_svc(db, teacher.user_id, current_user.id)
    return {"message": "Teacher deactivated"}


@router.post("/{teacher_id}/reactivate")
async def reactivate_teacher(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    teacher.user.status = UserStatus.ACTIVE
    await db.commit()
    return {"message": "Teacher reactivated"}


@router.post("/{teacher_id}/resend-invite")
async def resend_invite(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    # TODO: Resend activation email
    return {"message": "Invitation resent"}


@router.get("/{teacher_id}/batches")
async def get_teacher_batches(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    active_batches = [
        {"id": str(a.batch_id), "name": a.batch.name, "assigned_date": a.assigned_date}
        for a in teacher.batch_assignments if a.removed_date is None
    ]
    return active_batches


@router.put("/{teacher_id}/batches")
async def update_teacher_batches(
    teacher_id: UUID,
    batch_ids: List[UUID],
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    from app.services import assign_teacher_batches
    await assign_teacher_batches(db, teacher_id, batch_ids, current_user.id)
    return {"message": "Batch assignments updated"}


@router.get("/{teacher_id}/login-pass", response_model=LoginPassResponse)
async def get_teacher_login_pass(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    user = teacher.user
    return LoginPassResponse(
        public_id=teacher.public_id,
        full_name=teacher.full_name,
        email_or_username=user.email,
        password=None,
        role=user.role.value if hasattr(user.role, 'value') else str(user.role),
        status=user.status.value if hasattr(user.status, 'value') else str(user.status),
    )


@router.post("/{teacher_id}/reset-login-pass", response_model=LoginPassResponse)
async def reset_teacher_login_pass(
    teacher_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    teacher = await db.get(Teacher, teacher_id)
    if not teacher or teacher.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Teacher not found")

    from app.services import generate_random_password
    from app.auth.service import hash_password

    new_password = generate_random_password("TCH")
    teacher.user.password_hash = hash_password(new_password)
    teacher.user.status = UserStatus.ACTIVE
    await db.commit()

    return LoginPassResponse(
        public_id=teacher.public_id,
        full_name=teacher.full_name,
        email_or_username=teacher.user.email,
        password=new_password,
        role=teacher.user.role.value if hasattr(teacher.user.role, 'value') else str(teacher.user.role),
        status=teacher.user.status.value if hasattr(teacher.user.status, 'value') else str(teacher.user.status),
    )