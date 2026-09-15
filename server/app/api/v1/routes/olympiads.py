# JMO Management System — Olympiad Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.olympiad import Olympiad, OlympiadStatus
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/olympiads", tags=["olympiads"])


@router.get("", response_model=PaginatedResponse)
async def list_olympiads(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Olympiad).where(Olympiad.institution_id == current_user.institution_id)
    query = query.order_by(Olympiad.created_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_olympiad(
    name: str = Query(...),
    description: Optional[str] = Query(None),
    olympiad_date: Optional[str] = Query(None),
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from datetime import datetime
    from uuid import uuid4

    olympiad = Olympiad(
        id=uuid4(),
        name=name,
        description=description,
        olympiad_date=datetime.strptime(olympiad_date, "%Y-%m-%d") if olympiad_date else None,
        status=OlympiadStatus.DRAFT,
        institution_id=current_user.institution_id,
    )
    db.add(olympiad)
    await db.commit()
    await db.refresh(olympiad)
    return {"id": olympiad.id, "name": olympiad.name, "status": olympiad.status.value}