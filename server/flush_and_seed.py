# JMO Management System — Database Flush & Seed Script
import asyncio
from uuid import UUID
from sqlalchemy import text
from app.db.session import async_session_maker, engine
from app.models.base import Base
from app.models import (
    User, UserRole, UserStatus, Teacher, Guardian, Student, StudentBatch,
    AcademicYear, Class, Batch, Session, TeacherBatch, Attendance,
    Olympiad, OlympiadPaper, Section, Question, QuestionOption, AnswerKey, AnswerKeyEntry,
    AssessmentResult, Ranking, OMRSubmission, StudentAnswer, Award, Certificate, CustomField, CustomFieldValue, AuditLog
)
from app.auth.service import hash_password
from app.config import settings

DEFAULT_INSTITUTION_ID = UUID(settings.DEFAULT_INSTITUTION_ID)

SA_EMAIL = "jms.hric@gmail.com"
SA_PASSWORD = "Mathforall@JMO369"

async def flush_and_seed():
    print("Flushing database tables...")
    async with engine.begin() as conn:
        # Drop all tables in public schema cascade
        await conn.execute(text("DROP SCHEMA public CASCADE;"))
        await conn.execute(text("CREATE SCHEMA public;"))
        await conn.execute(text("GRANT ALL ON SCHEMA public TO jmox;"))
        await conn.execute(text("GRANT ALL ON SCHEMA public TO public;"))
        # Re-create all tables
        await conn.run_sync(Base.metadata.create_all)
    print("Database schema flushed and recreated successfully!")

    async with async_session_maker() as session:
        print(f"Creating Super Admin user: {SA_EMAIL}...")
        sa_user = User(
            institution_id=DEFAULT_INSTITUTION_ID,
            public_id="USR-SA-001",
            email=SA_EMAIL,
            password_hash=hash_password(SA_PASSWORD),
            role=UserRole.ADMIN,
            status=UserStatus.ACTIVE,
        )
        session.add(sa_user)
        await session.commit()
        print(f"Super Admin user created successfully: {SA_EMAIL}")

if __name__ == "__main__":
    asyncio.run(flush_and_seed())
