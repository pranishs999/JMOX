# JMO Management System — Awards Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.extras import Award, Certificate
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/awards", tags=["awards"])


@router.get("", response_model=PaginatedResponse)
async def list_awards(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Award).where(Award.institution_id == current_user.institution_id)
    query = query.order_by(Award.created_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("/auto-assign/{result_id}", response_model=dict)
async def auto_assign_awards(
    result_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.results import AssessmentResult
    from app.models.awards import Award, AwardType, AwardStatus

    result = await db.get(AssessmentResult, result_id)
    if not result or result.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Result not found")

    # Get all students in the same batch/class
    from app.models.core import StudentBatch, Student
    students = await db.execute(select(StudentBatch).where(StudentBatch.batch_id == result.batch_at_time_of_exam))
    student_ids = [s.student_id for s in students.scalars().all()]

    assigned = []
    for student_id in student_ids:
        # Check if already awarded
        existing = await db.execute(select(Award).where(
            Award.student_id == student_id,
            Award.award_type == AwardType.ACHIEVEMENT,
            Award.status == AwardStatus.ACTIVE
        ))
        if existing.scalar_one_or_none():
            continue

        # Auto-assign based on score percentile
        score = result.total_score
        if score >= 100:
            award_type = AwardType.MERIT
        elif score >= 80:
            award_type = AwardType.DISTINCTION
        else:
            award_type = AwardType.PARTICIPATION

        award = Award(
            id=uuid4(),
            student_id=student_id,
            result_id=result_id,
            type=award_type,
            status=AwardStatus.ACTIVE,
            institution_id=current_user.institution_id,
        )
        db.add(award)
        assigned.append({"student_id": student_id, "award_type": award_type.value})

    await db.commit()
    return {"result_id": result_id, "assigned": len(assigned), "details": assigned}


@router.post("/generate-certificates/{result_id}", response_model=dict)
async def generate_certificates(
    result_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.results import AssessmentResult
    from app.models.extras import Award, AwardStatus

    result = await db.get(AssessmentResult, result_id)
    if not result or result.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Result not found")

    # Get all awards for this result
    awards = await db.execute(select(Award).where(Award.result_id == result_id, Award.status == AwardStatus.ACTIVE))
    awards = awards.scalars().all()

    return {
        "result_id": result_id,
        "total_awards": len(awards),
        "message": f"Generated certificates for {len(awards)} awards"
    }