# JMO Management System — Answer Key Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.olympiad import OlympiadPaper, AnswerKey, AnswerKeyEntry
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/answers/key", tags=["answers/key"])


@router.get("/{paper_id}", response_model=PaginatedResponse)
async def list_answer_key(
    paper_id: UUID,
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    # Verify paper exists and belongs to user's institution
    from app.models.olympiad import OlympiadPaper
    paper = await db.get(OlympiadPaper, paper_id)
    if not paper or paper.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Paper not found")

    query = select(AnswerKey).where(AnswerKey.paper_id == paper_id)
    query = query.order_by(AnswerKey.sort_order)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("/{paper_id}", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_answer_key(
    paper_id: UUID,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.olympiad import OlympiadPaper, AnswerKey

    # Verify paper exists and belongs to user's institution
    paper = await db.get(OlympiadPaper, paper_id)
    if not paper or paper.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Paper not found")

    # Check if key already exists
    existing = await db.execute(select(AnswerKey).where(AnswerKey.paper_id == paper_id))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Answer key already exists for this paper")

    key = AnswerKey(
        id=uuid4(),
        paper_id=paper_id,
        institution_id=current_user.institution_id,
    )
    db.add(key)
    await db.commit()
    await db.refresh(key)
    return {"id": key.id, "paper_id": paper_id, "created": True}