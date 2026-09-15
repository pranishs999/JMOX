# JMO Management System — Audit Logs Routes
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.dependencies import get_current_user, require_admin
from app.models.extras import AuditLog
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/audit-logs", tags=["audit-logs"])


@router.get("", response_model=PaginatedResponse)
async def list_audit_logs(
    action: Optional[str] = Query(None),
    user_id: Optional[UUID] = Query(None),
    entity_type: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=500),
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_session),
):
    query = select(AuditLog).where(AuditLog.institution_id == current_user.institution_id)
    if action:
        query = query.where(AuditLog.action == action)
    if user_id:
        query = query.where(AuditLog.user_id == user_id)
    if entity_type:
        query = query.where(AuditLog.entity_type == entity_type)
    query = query.order_by(AuditLog.created_at.desc())

    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    items = result.scalars().all()

    return PaginatedResponse(data=items, pagination={"page": page, "page_size": page_size, "total_count": total, "total_pages": (total + page_size - 1) // page_size})


@router.get("/export", response_model=dict)
async def export_audit_logs(
    start_date: str = Query(...),
    end_date: str = Query(...),
    current_user = Depends(require_admin),
    db: AsyncSession = Depends(get_async_session),
):
    from sqlalchemy import text

    query = text(
        "SELECT * FROM audit_logs "
        "WHERE institution_id = :inst_id "
        "AND created_at >= :start_date "
        "AND created_at <= :end_date "
        "ORDER BY created_at DESC"
    )
    result = await db.execute(query, {
        "inst_id": current_user.institution_id,
        "start_date": start_date,
        "end_date": end_date
    })
    rows = result.fetchall()

    return {
        "start_date": start_date,
        "end_date": end_date,
        "total_entries": len(rows),
        "data": [dict(row._mapping) for row in rows]
    }