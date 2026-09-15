# JMO Management System — Assessment Results Routes
from typing import List, Optional
from uuid import UUID
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.results import AssessmentResult, ResultStatus
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/results", tags=["results"])


@router.get("", response_model=PaginatedResponse)
async def list_assessment_results(
    student_id: Optional[UUID] = Query(None),
    paper_id: Optional[UUID] = Query(None),
    status: Optional[ResultStatus] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(AssessmentResult).where(AssessmentResult.institution_id == current_user.institution_id)
    if student_id:
        query = query.where(AssessmentResult.student_id == student_id)
    if paper_id:
        query = query.where(AssessmentResult.paper_id == paper_id)
    if status:
        query = query.where(AssessmentResult.status == status)
    query = query.order_by(AssessmentResult.created_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("/{result_id}/publish", response_model=dict)
async def publish_result(
    result_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.results import AssessmentResult

    result = await db.get(AssessmentResult, result_id)
    if not result or result.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Result not found")

    if result.status != ResultStatus.DRAFT:
        raise HTTPException(status_code=400, detail="Only draft results can be published")

    result.status = ResultStatus.PUBLISHED
    result.published_at = func.now()
    result.published_by = current_user.id
    await db.commit()
    return {"id": result.id, "status": result.status.value, "published_at": result.published_at}


@router.post("/{result_id}/unpublish", response_model=dict)
async def unpublish_result(
    result_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.results import AssessmentResult

    result = await db.get(AssessmentResult, result_id)
    if not result or result.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Result not found")

    result.status = ResultStatus.DRAFT
    result.published_at = None
    result.published_by = None
    await db.commit()
    return {"id": result.id, "status": result.status.value}