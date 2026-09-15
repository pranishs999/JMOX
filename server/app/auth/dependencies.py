# JMO Management System — Auth Dependencies
from typing import Optional
from uuid import UUID
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.service import (
    decode_token,
    decode_session_token,
    get_user_by_id,
)
from app.models.core import User, UserRole, UserStatus
from app.core.permissions import CurrentUser


async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_async_session),
) -> CurrentUser:
    """Extract user from cookie session OR JWT Bearer token."""
    # Try cookie first (web)
    session_id = request.cookies.get("session_id")
    if session_id:
        user_id = decode_session_token(session_id)
        if user_id:
            user = await get_user_by_id(db, user_id)
            if user and user.status == UserStatus.ACTIVE:
                teacher_id = None
                student_id = None
                if user.role == UserRole.TEACHER and user.teacher:
                    teacher_id = user.teacher.id
                elif user.role == UserRole.STUDENT and user.student:
                    student_id = user.student.id
                return CurrentUser(
                    id=user.id,
                    public_id=user.public_id,
                    email=user.email,
                    role=user.role,
                    status=user.status.value,
                    teacher_id=teacher_id,
                    student_id=student_id,
                    institution_id=user.institution_id,
                )

    # Then try JWT (Android)
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        payload = decode_token(token)
        if payload and payload.get("type") == "access":
            user_id_str = payload.get("sub")
            if user_id_str:
                try:
                    user_id = UUID(user_id_str)
                    user = await get_user_by_id(db, user_id)
                    if user and user.status == UserStatus.ACTIVE:
                        teacher_id = None
                        student_id = None
                        if user.role == UserRole.TEACHER and user.teacher:
                            teacher_id = user.teacher.id
                        elif user.role == UserRole.STUDENT and user.student:
                            student_id = user.student.id
                        return CurrentUser(
                            id=user.id,
                            public_id=user.public_id,
                            email=user.email,
                            role=user.role,
                            status=user.status.value,
                            teacher_id=teacher_id,
                            student_id=student_id,
                            institution_id=user.institution_id,
                        )

                except ValueError:
                    pass

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
        headers={"WWW-Authenticate": "Bearer"},
    )


async def get_current_user_optional(
    request: Request,
    db: AsyncSession = Depends(get_async_session),
) -> Optional[CurrentUser]:
    """Get current user if authenticated, otherwise None."""
    try:
        return await get_current_user(request, db)
    except HTTPException:
        return None


def require_admin(current_user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    """Require admin role."""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user


def require_teacher(current_user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    """Require teacher role."""
    if current_user.role != UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teacher access required",
        )
    return current_user