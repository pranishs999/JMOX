# JMO Management System — Auth Service
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import UUID, uuid4

from passlib.context import CryptContext
from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.core import User, UserRole, UserStatus, Teacher
from app.models.extras import AuditLog, AuditAction


pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(user_id: UUID, role: UserRole, expires_minutes: int = 15) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    payload = {
        "sub": str(user_id),
        "role": role.value,
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "type": "access",
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")


def create_refresh_token(user_id: UUID) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {
        "sub": str(user_id),
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "type": "refresh",
        "jti": str(uuid4()),  # Unique token ID for rotation
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
    except JWTError:
        return {}


def generate_activation_token() -> tuple[str, datetime]:
    """Generate a secure activation token with 24-hour expiry."""
    token = secrets.token_urlsafe(32)
    expires = datetime.now(timezone.utc) + timedelta(hours=24)
    return token, expires


def generate_password_reset_token() -> tuple[str, datetime]:
    """Generate a secure password reset token with 1-hour expiry."""
    token = secrets.token_urlsafe(32)
    expires = datetime.now(timezone.utc) + timedelta(hours=1)
    return token, expires


from sqlalchemy.orm import selectinload


async def get_user_by_email(db: AsyncSession, identifier: str) -> Optional[User]:
    result = await db.execute(
        select(User)
        .outerjoin(Teacher, Teacher.user_id == User.id)
        .outerjoin(Student, Student.user_id == User.id)
        .options(selectinload(User.teacher), selectinload(User.student))
        .where(
            (User.email == identifier)
            | (User.public_id == identifier)
            | (Teacher.public_id == identifier)
            | (Student.public_id == identifier)
        )
    )
    return result.scalar_one_or_none()



async def get_user_by_id(db: AsyncSession, user_id: UUID) -> Optional[User]:
    result = await db.execute(
        select(User)
        .options(selectinload(User.teacher), selectinload(User.student))
        .where(User.id == user_id)
    )
    return result.scalar_one_or_none()


async def authenticate_user(
    db: AsyncSession, identifier: str, password: str
) -> Optional[User]:
    user = await get_user_by_email(db, identifier)
    if not user:
        return None
    if not user.password_hash:
        return None
    if not verify_password(password, user.password_hash):
        return None
    if user.status != UserStatus.ACTIVE:
        return None
    return user



async def create_session_token(user_id: UUID) -> str:
    """Create a signed session token for cookie-based auth."""
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, settings.APP_SECRET_KEY, algorithm="HS256")


def decode_session_token(token: str) -> Optional[UUID]:
    try:
        payload = jwt.decode(token, settings.APP_SECRET_KEY, algorithms=["HS256"])
        return UUID(payload["sub"])
    except (JWTError, KeyError, ValueError):
        return None


def generate_csrf_token() -> str:
    return secrets.token_urlsafe(32)


import json


def _sanitize_for_json(val):
    if val is None:
        return None
    return json.loads(json.dumps(val, default=str))


async def log_audit(
    db: AsyncSession,
    user_id: Optional[UUID],
    action: str,
    entity_type: str,
    entity_id: UUID,
    before_value: Optional[dict] = None,
    after_value: Optional[dict] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
    is_conflict: bool = False,
) -> AuditLog:
    audit = AuditLog(
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        before_value=_sanitize_for_json(before_value),
        after_value=_sanitize_for_json(after_value),
        ip_address=ip_address,
        user_agent=user_agent,
        is_conflict=is_conflict,
    )
    db.add(audit)
    await db.flush()
    return audit