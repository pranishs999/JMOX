# JMO Management System — Students Router
from datetime import date
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.core import Student, StudentStatus, StudentBatch, StudentBatchStatus, Guardian, User
from app.schemas.students import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
    StudentListResponse,
    StudentTransferRequest,
    StudentWithdrawRequest,
    StudentImportRequest,
    ClassRef,
    BatchRef,
)

router = APIRouter(prefix="/students", tags=["students"])


@router.get("", response_model=StudentListResponse)
async def list_students(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    class_id: Optional[UUID] = None,
    batch_id: Optional[UUID] = None,
    status: Optional[StudentStatus] = None,
    search: Optional[str] = None,
    sort_by: str = Query("full_name"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$"),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Student).options(
        selectinload(Student.guardian),
        selectinload(Student.batch_enrollments),
    )

    # Filter by institution
    query = query.where(Student.institution_id == current_user.institution_id)

    # Teacher access control
    if current_user.role.value == "teacher":
        # Get assigned batch IDs
        from app.models.academic import TeacherBatch
        result = await db.execute(
            select(TeacherBatch.batch_id).where(
                TeacherBatch.teacher_id == current_user.teacher_id,
                TeacherBatch.removed_date.is_(None),
            )
        )
        assigned_batch_ids = [row[0] for row in result.all()]

        # Filter students enrolled in assigned batches
        subquery = select(StudentBatch.student_id).where(
            StudentBatch.batch_id.in_(assigned_batch_ids),
            StudentBatch.status == StudentBatchStatus.ACTIVE,
        )
        query = query.where(Student.id.in_(subquery))

    # Filters
    if class_id:
        subquery = select(StudentBatch.student_id).where(
            StudentBatch.class_id == class_id,
            StudentBatch.status == StudentBatchStatus.ACTIVE,
        )
        query = query.where(Student.id.in_(subquery))

    if batch_id:
        subquery = select(StudentBatch.student_id).where(
            StudentBatch.batch_id == batch_id,
            StudentBatch.status == StudentBatchStatus.ACTIVE,
        )
        query = query.where(Student.id.in_(subquery))

    if status:
        query = query.where(Student.status == status)

    if search:
        query = query.where(
            or_(
                Student.full_name.ilike(f"%{search}%"),
                Student.public_id.ilike(f"%{search}%"),
            )
        )

    # Soft delete filter
    query = query.where(Student.deleted_at.is_(None))

    # Count total
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    # Sorting
    if sort_order == "desc":
        query = query.order_by(getattr(Student, sort_by).desc())
    else:
        query = query.order_by(getattr(Student, sort_by).asc())

    # Pagination
    query = query.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(query)
    students = result.scalars().all()

    # Build response
    items = []
    for s in students:
        current_enrollment = next(
            (e for e in s.batch_enrollments if e.status == StudentBatchStatus.ACTIVE), None
        )
        items.append(StudentResponse(
            id=s.id,
            public_id=s.public_id,
            full_name=s.full_name,
            date_of_birth=s.date_of_birth,
            gender=s.gender,
            photo_url=s.photo_url,
            phone=s.phone,
            email=s.email,
            guardian=s.guardian,
            current_class=current_enrollment.class_ if current_enrollment else None,
            current_batch=current_enrollment.batch if current_enrollment else None,
            status=s.status,
            custom_fields=[],  # TODO: Load custom fields
            created_at=s.created_at,
        ))

    return StudentListResponse(
        data=items,
        pagination={
            "page": page,
            "page_size": page_size,
            "total_count": total,
            "total_pages": (total + page_size - 1) // page_size,
        },
    )


@router.post("", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
async def create_student(
    data: StudentCreate,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.services import create_student as create_student_svc
    guardian_dict = data.guardian.model_dump() if data.guardian else None

    student, plain_password = await create_student_svc(
        db=db,
        full_name=data.full_name,
        date_of_birth=data.date_of_birth,
        gender=data.gender,
        photo_url=data.photo_url,
        phone=data.phone,
        email=data.email,
        guardian_data=guardian_dict,
        class_id=data.class_id,
        batch_id=data.batch_id,
        enrollment_date=data.enrollment_date,
        custom_fields=data.custom_fields,
        institution_id=current_user.institution_id,
        created_by=current_user.id,
        password=data.password,
        create_login_pass=data.create_login_pass,
    )

    await db.refresh(student, ["guardian", "user"])

    current_class = None
    current_batch = None
    if data.class_id and data.batch_id:
        from app.models.academic import Class, Batch
        cls = await db.get(Class, data.class_id)
        batch = await db.get(Batch, data.batch_id)
        if cls:
            current_class = ClassRef(id=cls.id, name=cls.name)
        if batch:
            current_batch = BatchRef(id=batch.id, name=batch.name)

    login_pass = None
    if plain_password and student.user:
        from app.schemas.common import LoginPassResponse
        login_pass = LoginPassResponse(
            public_id=student.public_id,
            full_name=student.full_name,
            email_or_username=student.user.email,
            password=plain_password,
            role="student",
            status=student.user.status.value,
        )

    return StudentResponse(
        id=student.id,
        public_id=student.public_id,
        full_name=student.full_name,
        date_of_birth=student.date_of_birth,
        gender=student.gender,
        photo_url=student.photo_url,
        phone=student.phone,
        email=student.email,
        guardian=student.guardian,
        current_class=current_class,
        current_batch=current_batch,
        status=student.status,
        custom_fields=[],
        login_pass=login_pass,
        created_at=student.created_at,
    )


@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(
    student_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    student = await db.get(Student, student_id)
    if not student or student.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Student not found")

    # Check access for teachers
    if current_user.role.value == "teacher":
        from app.models.academic import TeacherBatch, StudentBatch, StudentBatchStatus
        result = await db.execute(
            select(TeacherBatch.batch_id).where(
                TeacherBatch.teacher_id == current_user.teacher_id,
                TeacherBatch.removed_date.is_(None),
            )
        )
        assigned_batch_ids = [row[0] for row in result.all()]

        student_batch = await db.execute(
            select(StudentBatch).where(
                StudentBatch.student_id == student_id,
                StudentBatch.batch_id.in_(assigned_batch_ids),
                StudentBatch.status == StudentBatchStatus.ACTIVE,
            )
        )
        if not student_batch.scalar_one_or_none():
            raise HTTPException(status_code=403, detail="Not authorized to view this student")

    return StudentResponse(
        id=student.id,
        public_id=student.public_id,
        full_name=student.full_name,
        date_of_birth=student.date_of_birth,
        gender=student.gender,
        photo_url=student.photo_url,
        phone=student.phone,
        email=student.email,
        guardian=student.guardian,
        current_class=student.current_class,
        current_batch=student.current_batch,
        status=student.status,
        custom_fields=[],
        created_at=student.created_at,
    )


@router.get("/{student_id}/login-pass", response_model=LoginPassResponse)
async def get_student_login_pass(
    student_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    student = await db.get(Student, student_id)
    if not student or student.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Student not found")

    user = student.user
    if not user:
        raise HTTPException(status_code=404, detail="No login account found for this student")

    from app.schemas.common import LoginPassResponse
    return LoginPassResponse(
        public_id=student.public_id,
        full_name=student.full_name,
        email_or_username=user.email,
        password=None,
        role=user.role.value if hasattr(user.role, 'value') else str(user.role),
        status=user.status.value if hasattr(user.status, 'value') else str(user.status),
    )


@router.post("/{student_id}/reset-login-pass", response_model=LoginPassResponse)
async def reset_student_login_pass(
    student_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    student = await db.get(Student, student_id)
    if not student or student.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Student not found")

    from app.services import generate_random_password
    from app.auth.service import hash_password
    from app.utils.ids import generate_public_id
    from app.models.core import UserRole, UserStatus

    new_password = generate_random_password("STD")
    user = student.user

    if not user:
        user_email = student.email or f"{student.public_id.lower().replace('-', '')}@student.jmox.org"
        user = User(
            public_id=await generate_public_id(db, "USR", User),
            email=user_email,
            password_hash=hash_password(new_password),
            role=UserRole.STUDENT,
            status=UserStatus.ACTIVE,
            institution_id=current_user.institution_id,
        )
        db.add(user)
        await db.flush()
        student.user_id = user.id
    else:
        user.password_hash = hash_password(new_password)
        user.status = UserStatus.ACTIVE

    await db.commit()

    from app.schemas.common import LoginPassResponse
    return LoginPassResponse(
        public_id=student.public_id,
        full_name=student.full_name,
        email_or_username=user.email,
        password=new_password,
        role=user.role.value if hasattr(user.role, 'value') else str(user.role),
        status=user.status.value if hasattr(user.status, 'value') else str(user.status),
    )



# Additional endpoints (update, transfer, withdraw, import, export) would go here
# For brevity, I'm including the core structure