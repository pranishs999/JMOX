# JMO Management System — Section Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.olympiad import Section
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/sections", tags=["sections"])


@router.get("", response_model=PaginatedResponse)
async def list_sections(
    paper_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Section).where(Section.institution_id == current_user.institution_id)
    if paper_id:
        query = query.where(Section.paper_id == paper_id)
    query = query.order_by(Section.sort_order, Section.name)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_section(
    paper_id: UUID = Query(...),
    name: str = Query(...),
    order: int = Query(0),
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.core import Section

    # Verify paper exists and belongs to user's institution
    from app.models.olympiad import OlympiadPaper
    paper = await db.get(OlympiadPaper, paper_id)
    if not paper or paper.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Paper not found")

    section = Section(
        id=uuid4() if hasattr(__import__('uuid'), 'uuid4') else None,
        paper_id=paper_id,
        name=name,
        order=order,
        institution_id=current_user.institution_id,
    )
    db.add(section)
    await db.commit()
    await db.refresh(section)
    return {"id": section.id, "name": section.name, "order": section.order, "paper_id": paper_id}