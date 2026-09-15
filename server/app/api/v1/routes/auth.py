# JMO Management System — Auth Router
from datetime import datetime, timezone
from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_async_session
from app.auth.service import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    generate_activation_token,
    generate_password_reset_token,
    create_session_token,
    generate_csrf_token,
    authenticate_user,
    log_audit,
)
from app.auth.schemas import (
    LoginRequest,
    LoginResponseWeb,
    LoginResponseAndroid,
    TokenRefreshRequest,
    TokenRefreshResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ActivateAccountRequest,
    CurrentUserResponse,
    UserResponse,
)
from app.auth.dependencies import get_current_user, require_admin
from app.models.core import User, UserRole, UserStatus, Teacher
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(
    request: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_async_session),
):
    user = await authenticate_user(db, request.email, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or account not active",
        )

    # Update last login could be added here

    if request.client_type == "web":
        # Cookie-based auth for web
        session_token = await create_session_token(user.id)
        csrf_token = generate_csrf_token()

        response.set_cookie(
            key="session_id",
            value=session_token,
            httponly=True,
            secure=settings.APP_ENV == "production",
            samesite="lax",
            max_age=86400,  # 24 hours
            path="/",
        )
        response.set_cookie(
            key="csrf_token",
            value=csrf_token,
            httponly=False,  # JS needs to read it
            secure=settings.APP_ENV == "production",
            samesite="lax",
            max_age=86400,
            path="/",
        )

        full_name = user.email
        if user.role == UserRole.TEACHER and user.teacher:
            full_name = user.teacher.full_name
        elif user.role == UserRole.STUDENT and user.student:
            full_name = user.student.full_name

        user_response = UserResponse(
            id=user.id,
            public_id=user.public_id,
            email=user.email,
            role=user.role,
            full_name=full_name,
            status=user.status,
        )

        return LoginResponseWeb(user=user_response)

    else:
        # JWT-based auth for Android
        access_token = create_access_token(user.id, user.role, settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token = create_refresh_token(user.id)

        full_name = user.email
        if user.role == UserRole.TEACHER and user.teacher:
            full_name = user.teacher.full_name
        elif user.role == UserRole.STUDENT and user.student:
            full_name = user.student.full_name

        user_response = UserResponse(
            id=user.id,
            public_id=user.public_id,
            email=user.email,
            role=user.role,
            full_name=full_name,
            status=user.status,
        )


        return LoginResponseAndroid(
            user=user_response,
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )


@router.post("/logout")
async def logout(
    response: Response,
    current_user: CurrentUserResponse = Depends(get_current_user),
):
    # Clear cookies
    response.delete_cookie("session_id", path="/")
    response.delete_cookie("csrf_token", path="/")
    return {"message": "Logged out successfully"}


@router.post("/refresh", response_model=TokenRefreshResponse)
async def refresh_token(
    request: TokenRefreshRequest,
    db: AsyncSession = Depends(get_async_session),
):
    payload = decode_token(request.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user_id = UUID(user_id_str)
    user = await get_user_by_id(db, user_id)
    if not user or user.status != UserStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )

    # Rotate refresh token
    new_access_token = create_access_token(user.id, user.role, settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    new_refresh_token = create_refresh_token(user.id)

    return TokenRefreshResponse(
        access_token=new_access_token,
        expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/forgot-password")
async def forgot_password(
    request: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_async_session),
):
    # Always return same response to prevent email enumeration
    user = await db.execute(select(User).where(User.email == request.email))
    user = user.scalar_one_or_none()

    if user and user.status == UserStatus.ACTIVE:
        # Generate reset token
        token, expires = generate_password_reset_token()
        # In production, store token in DB with expiry and send email
        # For now, we'll just log it
        print(f"Password reset token for {request.email}: {token} (expires: {expires})")

    return {"message": "If the email exists, a reset link has been sent"}


@router.post("/reset-password")
async def reset_password(
    request: ResetPasswordRequest,
    db: AsyncSession = Depends(get_async_session),
):
    # In production, validate token from DB
    # For now, decode and verify
    payload = decode_token(request.token)
    if not payload or payload.get("type") != "password_reset":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid reset token",
        )

    user = await get_user_by_id(db, UUID(user_id_str))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    user.password_hash = hash_password(request.password)
    user.status = UserStatus.ACTIVE
    await db.commit()

    await log_audit(
        db, user.id, AuditAction.UPDATE, "User", user.id,
        before_value={"status": user.status.value},
        after_value={"status": UserStatus.ACTIVE.value},
    )

    return {"message": "Password reset successfully"}


@router.post("/activate")
async def activate_account(
    request: ActivateAccountRequest,
    db: AsyncSession = Depends(get_async_session),
):
    # In production, validate token from DB
    payload = decode_token(request.token)
    if not payload or payload.get("type") != "activation":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired activation token",
        )

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid activation token",
        )

    user = await get_user_by_id(db, UUID(user_id_str))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if user.status != UserStatus.INVITED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account already activated",
        )

    user.password_hash = hash_password(request.password)
    user.status = UserStatus.ACTIVE
    await db.commit()

    await log_audit(
        db, user.id, AuditAction.ACTIVATE, "User", user.id,
        before_value={"status": UserStatus.INVITED.value},
        after_value={"status": UserStatus.ACTIVE.value},
    )

    return {"message": "Account activated successfully"}


@router.get("/me", response_model=CurrentUserResponse)
async def get_me(current_user: CurrentUser = Depends(get_current_user)):
    return {"user": current_user}