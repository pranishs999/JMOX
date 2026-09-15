# JMO Management System — Rankings Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.results import Ranking
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/rankings", tags=["rankings"])


@router.get("", response_model=PaginatedResponse)
async def list_rankings(
    result_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Ranking).where(Ranking.institution_id == current_user.institution_id)
    if result_id:
        query = query.where(Ranking.result_id == result_id)
    query = query.order_by(Ranking.rank)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("/export", response_model=dict)
async def export_rankings(
    result_id: UUID = Query(...),
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.results import AssessmentResult

    result = await db.get(AssessmentResult, result_id)
    if not result or result.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Result not found")

    rankings = await db.execute(select(Ranking).where(Ranking.result_id == result_id).order_by(Ranking.rank))
    data = [{"rank": r.rank, "student_id": r.student_id, "student_name": r.student.full_name, "score": r.score} for r in rankings.scalars().all()]

    return {"result_id": result_id, "total_ranked": len(data), "data": data}