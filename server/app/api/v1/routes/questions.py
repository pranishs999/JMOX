# JMO Management System — Question Routes
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.olympiad import Question, QuestionOption
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/questions", tags=["questions"])


@router.get("", response_model=PaginatedResponse)
async def list_questions(
    section_id: Optional[UUID] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(Question).where(Question.institution_id == current_user.institution_id)
    if section_id:
        query = query.where(Question.section_id == section_id)
    query = query.order_by(Question.sort_order)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_question(
    section_id: UUID = Query(...),
    text: str = Query(...),
    question_type: str = Query("short_answer"),
    points: int = Query(1),
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.core import Question

    # Verify section exists and belongs to user's institution
    from app.models.olympiad import OlympiadPaper, Section
    section = await db.get(Section, section_id)
    if not section or section.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Section not found")

    question = Question(
        id=uuid4(),
        section_id=section_id,
        text=text,
        question_type=question_type,
        points=points,
        institution_id=current_user.institution_id,
    )
    db.add(question)
    await db.commit()
    await db.refresh(question)
    return {"id": question.id, "text": question.text, "points": question.points}