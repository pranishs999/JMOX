# JMO Management System — Custom Fields Routes
from typing import List, Optional, Dict, Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func, JSON
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.extras import CustomField, CustomFieldValue
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/custom-fields", tags=["custom-fields"])


@router.get("", response_model=PaginatedResponse)
async def list_custom_fields(
    entity_type: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(CustomField).where(CustomField.institution_id == current_user.institution_id)
    if entity_type:
        query = query.where(CustomField.entity_type == entity_type)
    query = query.order_by(CustomField.sort_order, CustomField.name)

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.post("/{field_id}/values/{entity_id}", response_model=dict)
async def set_custom_field_value(
    field_id: UUID,
    entity_id: UUID,
    value: str,
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.core import CustomField, CustomFieldValue

    # Verify custom field exists and belongs to user's institution
    field = await db.get(CustomField, field_id)
    if not field or field.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Custom field not found")

    # Check if value already exists
    existing = await db.execute(select(CustomFieldValue).where(
        CustomFieldValue.custom_field_id == field_id,
        CustomFieldValue.entity_id == entity_id
    ))
    if existing.scalar_one_or_none():
        # Update existing
        cv = existing.scalar_one()
        cv.value = value
        cv.updated_at = func.now()
    else:
        # Create new
        cv = CustomFieldValue(
            id=uuid4(),
            custom_field_id=field_id,
            entity_id=entity_id,
            value=value,
            institution_id=current_user.institution_id,
        )
        db.add(cv)

    await db.commit()
    return {"field_id": str(field_id), "entity_id": str(entity_id), "value": value}


@router.get("/{field_id}/values/{entity_id}", response_model=dict)
async def get_custom_field_value(
    field_id: UUID,
    entity_id: UUID,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    from app.models.core import CustomField, CustomFieldValue

    # Verify custom field exists and belongs to user's institution
    field = await db.get(CustomField, field_id)
    if not field or field.institution_id != current_user.institution_id:
        raise HTTPException(status_code=404, detail="Custom field not found")

    cv = await db.execute(select(CustomFieldValue).where(
        CustomFieldValue.custom_field_id == field_id,
        CustomFieldValue.entity_id == entity_id
    ))
    value = cv.scalar_one_or_none()
    return {"field_id": str(field_id), "entity_id": str(entity_id), "value": value.value if value else None}