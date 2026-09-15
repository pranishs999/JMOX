# JMO Management System — ID Generation Utilities
import random
import string
from typing import Type
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.base import Base


async def generate_public_id(
    db: AsyncSession,
    prefix: str,
    model: Type[Base],
    length: int = 6,
) -> str:
    """Generate a unique public ID with prefix (e.g., STU-123456)."""
    max_attempts = 10
    for _ in range(max_attempts):
        # Generate random alphanumeric part
        random_part = ''.join(random.choices(string.digits, k=length))
        public_id = f"{prefix}-{random_part}"

        # Check if exists
        result = await db.execute(
            select(model).where(model.public_id == public_id)
        )
        if not result.scalar_one_or_none():
            return public_id

    # Fallback: use timestamp + random
    import time
    timestamp = int(time.time() * 1000) % 1000000
    return f"{prefix}-{timestamp:06d}"


def generate_job_id() -> str:
    """Generate a unique job ID for background tasks."""
    import uuid
    return str(uuid.uuid4())