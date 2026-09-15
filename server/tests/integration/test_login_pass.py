import asyncio
import pytest
from uuid import UUID, uuid4
from datetime import date
from sqlalchemy import select

from app.models.core import User, UserRole, UserStatus
from app.services import create_teacher, create_student
from app.auth.service import authenticate_user, hash_password
from app.db.session import async_session_maker, engine
from app.config import settings

DEFAULT_INSTITUTION_ID = UUID(settings.DEFAULT_INSTITUTION_ID)


def test_create_teacher_login_pass():
    async def _test():
        try:
            async with async_session_maker() as db_session:
                result = await db_session.execute(select(User).where(User.role == UserRole.ADMIN))
                admin = result.scalars().first()
                if not admin:
                    admin = User(
                        public_id="USR-ADM-001",
                        email="admin.test@jmox.org",
                        password_hash=hash_password("AdminPass123!"),
                        role=UserRole.ADMIN,
                        status=UserStatus.ACTIVE,
                        institution_id=DEFAULT_INSTITUTION_ID,
                    )
                    db_session.add(admin)
                    await db_session.commit()

                unique_email = f"alan.{uuid4().hex[:6]}@jmox.org"
                teacher, plain_pass = await create_teacher(
                    db=db_session,
                    full_name="Dr. Alan Turing",
                    email=unique_email,
                    phone="1234567890",
                    institution_id=DEFAULT_INSTITUTION_ID,
                    created_by=admin.id,
                )

                assert teacher.full_name == "Dr. Alan Turing"
                assert plain_pass.startswith("TCH-")

                # Verify authentication with generated password
                authenticated_user = await authenticate_user(
                    db=db_session,
                    identifier=unique_email,
                    password=plain_pass,
                )
                assert authenticated_user is not None
                assert authenticated_user.role == UserRole.TEACHER

                # Verify authentication with Public ID
                auth_by_pub_id = await authenticate_user(
                    db=db_session,
                    identifier=teacher.public_id,
                    password=plain_pass,
                )
                assert auth_by_pub_id is not None
                assert auth_by_pub_id.email == unique_email
        finally:
            await engine.dispose()

    asyncio.run(_test())


def test_create_student_login_pass():
    async def _test():
        try:
            async with async_session_maker() as db_session:
                result = await db_session.execute(select(User).where(User.role == UserRole.ADMIN))
                admin = result.scalars().first()
                if not admin:
                    admin = User(
                        public_id="USR-ADM-001",
                        email="admin.test@jmox.org",
                        password_hash=hash_password("AdminPass123!"),
                        role=UserRole.ADMIN,
                        status=UserStatus.ACTIVE,
                        institution_id=DEFAULT_INSTITUTION_ID,
                    )
                    db_session.add(admin)
                    await db_session.commit()

                unique_email = f"ramanujan.{uuid4().hex[:6]}@student.jmox.org"
                student, plain_pass = await create_student(
                    db=db_session,
                    full_name="Srinivasa Ramanujan",
                    date_of_birth=date(2010, 12, 22),
                    gender="Male",
                    photo_url=None,
                    phone=None,
                    email=unique_email,
                    guardian_data={"name": "Komal", "phone": "9876543210"},
                    class_id=None,
                    batch_id=None,
                    enrollment_date=None,
                    custom_fields=None,
                    institution_id=DEFAULT_INSTITUTION_ID,
                    created_by=admin.id,
                    create_login_pass=True,
                )

                assert student.full_name == "Srinivasa Ramanujan"
                assert plain_pass.startswith("STD-")
                assert student.user_id is not None

                # Verify authentication with generated password
                authenticated_user = await authenticate_user(
                    db=db_session,
                    identifier=unique_email,
                    password=plain_pass,
                )
                assert authenticated_user is not None
                assert authenticated_user.role == UserRole.STUDENT

                # Verify authentication with Public ID
                auth_by_pub_id = await authenticate_user(
                    db=db_session,
                    identifier=student.public_id,
                    password=plain_pass,
                )
                assert auth_by_pub_id is not None
        finally:
            await engine.dispose()

    asyncio.run(_test())
