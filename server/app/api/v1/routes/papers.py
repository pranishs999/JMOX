# JMO Management System — Olympiad Paper Routes
from typing import List, Optional
from uuid import UUID
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.olympiad import Olympiad, OlympiadPaper
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/papers", tags=["papers"])


@router.get("", response_model=PaginatedResponse)
async def list_papers(
    olympiad_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(OlympiadPaper).where(OlympiadPaper.institution_id == current_user.institution_id)
    if olympiad_id:
        query = query.where(OlympiadPaper.olympiad_id == olympiad_id)
    query = query.order_by(OlympiadPaper.created_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_paper(
    olympiad_id: UUID = Query(...),
    title: str = Query(...),
    duration_minutes: int = Query(60),
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.olympiad import OlympiadPaperStatus
    from uuid import uuid4

    # Verify olympiad exists and belongs to user's institution
    olympiad = await db.get(Olympiad, olympiad_id)
    if not olympiad or olympiad.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Olympiad not found")

    paper = OlympiadPaper(
        id=uuid4(),
        olympiad_id=olympiad_id,
        title=title,
        duration_minutes=duration_minutes,
        status=OlympiadPaperStatus.DRAFT,
        institution_id=current_user.institution_id,
    )
    db.add(paper)
    await db.commit()
    await db.refresh(paper)
    return {"id": paper.id, "title": paper.title, "status": paper.status.value}