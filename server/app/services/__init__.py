# JMO Management System — Application Services
from datetime import date, datetime, timezone, timedelta
from typing import Optional, List
from uuid import UUID
from sqlalchemy import select, func, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.core import (
    User, UserRole, UserStatus, Teacher, Guardian, Student, StudentStatus,
    StudentBatch, StudentBatchStatus
)
from app.models.academic import AcademicYear, Class, Batch, BatchStatus, Session, SessionStatus, TeacherBatch
from app.models.attendance import Attendance, AttendanceStatus
from app.models.olympiad import (
    Olympiad, OlympiadStatus, OlympiadPaper, Section, Question, QuestionOption,
    AnswerKey, AnswerKeyEntry
)
from app.models.results import (
    AssessmentResult, ResultStatus, Ranking, RankScope, OMRSubmission, OMRStatus,
    StudentAnswer, AnswerEntryMethod
)
from app.models.extras import Award, Certificate, CustomField, CustomFieldValue, AuditLog, AuditAction
from app.core.scoring import calculate_score, calculate_section_scores, QuestionConfig, StudentAnswerData
from app.core.ranking import compute_rankings, RankingInput
from app.core.results import calculate_assessment_result, validate_paper_locked
from app.auth.service import hash_password, log_audit, generate_activation_token
from app.utils.ids import generate_public_id


import secrets

def generate_random_password(prefix: str = "JMO") -> str:
    """Generate a readable, secure random login password."""
    random_str = secrets.token_hex(4).upper()
    return f"{prefix}-{random_str}"


# =============================================================================
# User/Teacher Services
# =============================================================================

async def create_teacher(
    db: AsyncSession,
    full_name: str,
    email: str,
    phone: Optional[str],
    institution_id: UUID,
    created_by: UUID,
    password: Optional[str] = None,
) -> tuple[Teacher, str]:
    """Create a teacher account and login pass."""
    plain_password = password or generate_random_password("TCH")

    # Check existing user
    existing_res = await db.execute(select(User).options(selectinload(User.teacher)).where(User.email == email))
    user = existing_res.scalar_one_or_none()

    if not user:
        user = User(
            public_id=await generate_public_id(db, "TCH", User),
            email=email,
            password_hash=hash_password(plain_password),
            role=UserRole.TEACHER,
            status=UserStatus.ACTIVE,
            institution_id=institution_id,
        )
        db.add(user)
        await db.flush()
    else:
        user.password_hash = hash_password(plain_password)
        user.status = UserStatus.ACTIVE

    if user.teacher:
        teacher = user.teacher
        teacher.full_name = full_name
        if phone:
            teacher.phone = phone
    else:
        teacher = Teacher(
            public_id=await generate_public_id(db, "TCH", Teacher),
            user_id=user.id,
            full_name=full_name,
            phone=phone,
            institution_id=institution_id,
        )
        db.add(teacher)
        await db.flush()

    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Teacher", teacher.id, after_value={"email": email, "full_name": full_name})

    return teacher, plain_password




async def activate_teacher(db: AsyncSession, user_id: UUID, password: str) -> User:
    """Activate a teacher account."""
    user = await db.get(User, user_id)
    if not user or user.role != UserRole.TEACHER:
        raise ValueError("Invalid user")

    user.password_hash = hash_password(password)
    user.status = UserStatus.ACTIVE
    await db.commit()
    await log_audit(db, user_id, AuditAction.ACTIVATE, "User", user_id)
    return user


async def deactivate_teacher(db: AsyncSession, user_id: UUID, deactivated_by: UUID) -> User:
    """Deactivate a teacher account."""
    user = await db.get(User, user_id)
    if not user:
        raise ValueError("User not found")

    old_status = user.status
    user.status = UserStatus.DISABLED
    await db.commit()
    await log_audit(db, deactivated_by, AuditAction.DEACTIVATE, "User", user_id,
                    before_value={"status": old_status.value}, after_value={"status": UserStatus.DISABLED.value})
    return user


async def assign_teacher_batches(
    db: AsyncSession,
    teacher_id: UUID,
    batch_ids: List[UUID],
    assigned_by: UUID,
) -> List[TeacherBatch]:
    """Assign teacher to batches."""
    # Remove existing active assignments not in new list
    await db.execute(
        update(TeacherBatch)
        .where(
            TeacherBatch.teacher_id == teacher_id,
            TeacherBatch.removed_date.is_(None),
            TeacherBatch.batch_id.not_in(batch_ids),
        )
        .values(removed_date=date.today())
    )

    # Add new assignments
    assignments = []
    for batch_id in batch_ids:
        existing = await db.execute(
            select(TeacherBatch).where(
                TeacherBatch.teacher_id == teacher_id,
                TeacherBatch.batch_id == batch_id,
            )
        )
        assignment = existing.scalar_one_or_none()
        if assignment:
            if assignment.removed_date:
                assignment.removed_date = None
                assignment.assigned_date = date.today()
        else:
            assignment = TeacherBatch(
                teacher_id=teacher_id,
                batch_id=batch_id,
                assigned_date=date.today(),
                institution_id=batch_id,  # Will be overwritten by batch's institution
            )
            db.add(assignment)
        assignments.append(assignment)

    await db.commit()
    await log_audit(db, assigned_by, AuditAction.UPDATE, "TeacherBatch", teacher_id,
                    after_value={"batch_ids": [str(b) for b in batch_ids]})
    return assignments


# =============================================================================
# Academic Services
# =============================================================================

async def create_academic_year(
    db: AsyncSession,
    name: str,
    start_date: date,
    end_date: date,
    institution_id: UUID,
    set_active: bool = False,
    created_by: UUID = None,
) -> AcademicYear:
    if set_active:
        # Deactivate current active year
        await db.execute(
            update(AcademicYear)
            .where(AcademicYear.institution_id == institution_id, AcademicYear.is_active == True)
            .values(is_active=False)
        )

    ay = AcademicYear(
        name=name,
        start_date=start_date,
        end_date=end_date,
        is_active=set_active,
        institution_id=institution_id,
    )
    db.add(ay)
    await db.commit()
    if created_by:
        await log_audit(db, created_by, AuditAction.CREATE, "AcademicYear", ay.id)
    return ay


async def create_class(
    db: AsyncSession,
    name: str,
    academic_year_id: UUID,
    sort_order: int,
    institution_id: UUID,
    created_by: UUID,
) -> Class:
    cls = Class(
        name=name,
        academic_year_id=academic_year_id,
        sort_order=sort_order,
        institution_id=institution_id,
    )
    db.add(cls)
    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Class", cls.id)
    return cls


async def create_batch(
    db: AsyncSession,
    name: str,
    class_id: UUID,
    schedule_days: Optional[str],
    institution_id: UUID,
    created_by: UUID,
) -> Batch:
    batch = Batch(
        name=name,
        class_id=class_id,
        schedule_days=schedule_days,
        institution_id=institution_id,
    )
    db.add(batch)
    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Batch", batch.id)
    return batch


async def generate_sessions(
    db: AsyncSession,
    batch_id: UUID,
    start_date: date,
    end_date: date,
    created_by: UUID,
) -> List[Session]:
    """Auto-generate sessions from batch schedule."""
    batch = await db.get(Batch, batch_id)
    if not batch:
        raise ValueError("Batch not found")

    if not batch.schedule_days:
        raise ValueError("Batch has no schedule")

    # Parse schedule days (e.g., "Mon,Thu" -> [0, 3])
    day_map = {"Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4, "Sat": 5, "Sun": 6}
    schedule_days = [day_map[d.strip()] for d in batch.schedule_days.split(",") if d.strip() in day_map]

    sessions = []
    current = start_date
    session_number = 1

    while current <= end_date:
        if current.weekday() in schedule_days:
            # Check if session already exists
            existing = await db.execute(
                select(Session).where(
                    Session.batch_id == batch_id,
                    Session.session_date == current,
                    Session.session_number == session_number,
                )
            )
            if not existing.scalar_one_or_none():
                session = Session(
                    batch_id=batch_id,
                    session_date=current,
                    session_number=session_number,
                    institution_id=batch.institution_id,
                )
                db.add(session)
                sessions.append(session)
            session_number = 2 if session_number == 1 else 1
        current = current + timedelta(days=1)

    await db.commit()
    if created_by:
        await log_audit(db, created_by, AuditAction.CREATE, "Session", batch_id,
                        after_value={"count": len(sessions)})
    return sessions


# =============================================================================
# Student Services
# =============================================================================

async def create_student(
    db: AsyncSession,
    full_name: str,
    date_of_birth: Optional[date],
    gender: Optional[str],
    photo_url: Optional[str],
    phone: Optional[str],
    email: Optional[str],
    guardian_data: Optional[dict],
    class_id: Optional[UUID],
    batch_id: Optional[UUID],
    enrollment_date: Optional[date],
    custom_fields: Optional[dict],
    institution_id: UUID,
    created_by: UUID,
    password: Optional[str] = None,
    create_login_pass: bool = True,
) -> tuple[Student, Optional[str]]:
    guardian = None
    if guardian_data:
        g_dict = guardian_data.copy()
        if "relationship" in g_dict:
            g_dict["relationship_type"] = g_dict.pop("relationship")
        guardian = Guardian(**g_dict, institution_id=institution_id)
        db.add(guardian)
        await db.flush()

    student_pub_id = await generate_public_id(db, "STU", Student)

    plain_password = None
    user_id = None

    if create_login_pass:
        plain_password = password or generate_random_password("STD")
        user_email = email or f"{student_pub_id.lower().replace('-', '')}@student.jmox.org"

        # Check if user account already exists
        existing_res = await db.execute(select(User).options(selectinload(User.student)).where(User.email == user_email))
        user = existing_res.scalar_one_or_none()

        if not user:
            user = User(
                public_id=await generate_public_id(db, "USR", User),
                email=user_email,
                password_hash=hash_password(plain_password),
                role=UserRole.STUDENT,
                status=UserStatus.ACTIVE,
                institution_id=institution_id,
            )
            db.add(user)
            await db.flush()
        elif not user.student:
            user.password_hash = hash_password(plain_password)
            user.status = UserStatus.ACTIVE
        else:
            user_email = f"{student_pub_id.lower().replace('-', '')}@student.jmox.org"
            user = User(
                public_id=await generate_public_id(db, "USR", User),
                email=user_email,
                password_hash=hash_password(plain_password),
                role=UserRole.STUDENT,
                status=UserStatus.ACTIVE,
                institution_id=institution_id,
            )
            db.add(user)
            await db.flush()

        user_id = user.id



    student = Student(
        public_id=student_pub_id,
        user_id=user_id,
        full_name=full_name,
        date_of_birth=date_of_birth,
        gender=gender,
        photo_url=photo_url,
        phone=phone,
        email=email,
        guardian_id=guardian.id if guardian else None,
        institution_id=institution_id,
    )
    db.add(student)
    await db.flush()

    if class_id and batch_id:
        enrollment = StudentBatch(
            student_id=student.id,
            batch_id=batch_id,
            class_id=class_id,
            enrolled_date=enrollment_date or date.today(),
            status=StudentBatchStatus.ACTIVE,
            institution_id=institution_id,
        )
        db.add(enrollment)

    if custom_fields:
        for field_id, value in custom_fields.items():
            cfv = CustomFieldValue(
                custom_field_id=UUID(field_id),
                student_id=student.id,
                value=str(value),
                institution_id=institution_id,
            )
            db.add(cfv)

    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Student", student.id)
    return student, plain_password



async def transfer_student(
    db: AsyncSession,
    student_id: UUID,
    new_class_id: UUID,
    new_batch_id: UUID,
    transfer_date: date,
    transferred_by: UUID,
) -> StudentBatch:
    # End current enrollment
    await db.execute(
        update(StudentBatch)
        .where(StudentBatch.student_id == student_id, StudentBatch.status == StudentBatchStatus.ACTIVE)
        .values(status=StudentBatchStatus.TRANSFERRED, removed_date=transfer_date)
    )

    # Create new enrollment
    enrollment = StudentBatch(
        student_id=student_id,
        batch_id=new_batch_id,
        class_id=new_class_id,
        enrolled_date=transfer_date,
        status=StudentBatchStatus.ACTIVE,
        institution_id=new_batch_id,  # Will be overwritten
    )
    db.add(enrollment)
    await db.commit()
    await log_audit(db, transferred_by, AuditAction.TRANSFER, "StudentBatch", enrollment.id)
    return enrollment


async def withdraw_student(
    db: AsyncSession,
    student_id: UUID,
    withdrawal_date: date,
    withdrawn_by: UUID,
) -> Student:
    student = await db.get(Student, student_id)
    if not student:
        raise ValueError("Student not found")

    # End current enrollment
    await db.execute(
        update(StudentBatch)
        .where(StudentBatch.student_id == student_id, StudentBatch.status == StudentBatchStatus.ACTIVE)
        .values(status=StudentBatchStatus.WITHDRAWN, removed_date=withdrawal_date)
    )

    student.status = StudentStatus.WITHDRAWN
    student.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    await log_audit(db, withdrawn_by, AuditAction.WITHDRAW, "Student", student_id)
    return student


# =============================================================================
# Attendance Services
# =============================================================================

async def record_attendance_bulk(
    db: AsyncSession,
    session_id: UUID,
    records: List[dict],
    recorded_by: UUID,
    sync_source: str = "web",
) -> List[Attendance]:
    """Record bulk attendance for a session."""
    session = await db.get(Session, session_id)
    if not session:
        raise ValueError("Session not found")

    attendances = []
    for record in records:
        attendance = Attendance(
            student_id=record["student_id"],
            session_id=session_id,
            status=AttendanceStatus(record["status"]),
            recorded_by=recorded_by,
            sync_source=sync_source,
            institution_id=session.institution_id,
        )
        db.add(attendance)
        attendances.append(attendance)

    session.status = SessionStatus.COMPLETED
    await db.commit()
    return attendances


async def sync_attendance_offline(
    db: AsyncSession,
    records: List[dict],
    synced_by: UUID,
) -> dict:
    """Sync offline attendance records with conflict resolution."""
    from app.core.attendance import deduplicate_attendance, AttendanceRecord

    # Convert to core format
    core_records = [
        AttendanceRecord(
            student_id=r["student_id"],
            session_id=r["session_id"],
            status=r["status"],
            recorded_at=r["recorded_at"],
            recorded_by=synced_by,
            sync_source="android",
            client_id=r.get("client_id"),
        )
        for r in records
    ]

    # Deduplicate
    deduplicated, conflicts = deduplicate_attendance(core_records)

    # Save deduplicated records
    saved = 0
    for record in deduplicated:
        # Check if exists
        existing = await db.execute(
            select(Attendance).where(
                Attendance.student_id == record.student_id,
                Attendance.session_id == record.session_id,
            )
        )
        if not existing.scalar_one_or_none():
            attendance = Attendance(
                student_id=record.student_id,
                session_id=record.session_id,
                status=AttendanceStatus(record.status),
                recorded_by=record.recorded_by,
                sync_source=record.sync_source,
                recorded_at=record.recorded_at,
                institution_id=record.institution_id,
            )
            db.add(attendance)
            saved += 1

    await db.commit()

    # Log conflicts
    for conflict in conflicts:
        await log_audit(
            db, synced_by, AuditAction.SYNC_CONFLICT, "Attendance", conflict.client_id,
            before_value={"status": conflict.server_status},
            after_value={"status": conflict.client_status},
            is_conflict=True,
        )

    return {"synced": saved, "conflicts": len(conflicts)}


# =============================================================================
# Olympiad & Paper Services
# =============================================================================

async def create_olympiad(
    db: AsyncSession,
    name: str,
    description: Optional[str],
    olympiad_date: Optional[date],
    academic_year_id: UUID,
    target_class_ids: List[UUID],
    institution_id: UUID,
    created_by: UUID,
) -> Olympiad:
    olympiad = Olympiad(
        name=name,
        description=description,
        olympiad_date=olympiad_date,
        academic_year_id=academic_year_id,
        institution_id=institution_id,
    )
    db.add(olympiad)
    await db.flush()

    # Create papers for each target class
    for class_id in target_class_ids:
        paper = OlympiadPaper(
            olympiad_id=olympiad.id,
            class_id=class_id,
            version=1,
            institution_id=institution_id,
        )
        db.add(paper)

    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Olympiad", olympiad.id)
    return olympiad


async def create_paper_section(
    db: AsyncSession,
    paper_id: UUID,
    name: str,
    sort_order: int,
    marks_per_question: int,
    negative_marks_per_question: int,
    institution_id: UUID,
    created_by: UUID,
) -> Section:
    paper = await db.get(OlympiadPaper, paper_id)
    if not paper or paper.is_locked:
        raise ValueError("Paper not found or locked")

    section = Section(
        paper_id=paper_id,
        name=name,
        sort_order=sort_order,
        marks_per_question=marks_per_question,
        negative_marks_per_question=negative_marks_per_question,
        institution_id=institution_id,
    )
    db.add(section)
    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Section", section.id)
    return section


async def create_question(
    db: AsyncSession,
    section_id: UUID,
    question_number: int,
    question_text: Optional[str],
    marks: int,
    negative_marks: int,
    num_options: int,
    options: List[dict],
    institution_id: UUID,
    created_by: UUID,
) -> Question:
    section = await db.get(Section, section_id)
    if not section:
        raise ValueError("Section not found")

    paper = await db.get(OlympiadPaper, section.paper_id)
    if paper.is_locked:
        raise ValueError("Paper is locked")

    question = Question(
        section_id=section_id,
        question_number=question_number,
        question_text=question_text,
        marks=marks,
        negative_marks=negative_marks,
        num_options=num_options,
        institution_id=institution_id,
    )
    db.add(question)
    await db.flush()

    for opt in options:
        option = QuestionOption(
            question_id=question.id,
            label=opt["label"],
            option_text=opt.get("option_text"),
            sort_order=opt["sort_order"],
        )
        db.add(option)

    # Update paper total marks
    paper.total_marks += marks
    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "Question", question.id)
    return question


async def create_answer_key(
    db: AsyncSession,
    paper_id: UUID,
    entries: List[dict],
    created_by: UUID,
) -> AnswerKey:
    paper = await db.get(OlympiadPaper, paper_id)
    if not paper or paper.is_locked:
        raise ValueError("Paper not found or locked")

    # Get latest version
    result = await db.execute(
        select(func.max(AnswerKey.version)).where(AnswerKey.paper_id == paper_id)
    )
    max_version = result.scalar() or 0
    new_version = max_version + 1

    answer_key = AnswerKey(
        paper_id=paper_id,
        version=new_version,
        created_by=created_by,
        institution_id=paper.institution_id,
    )
    db.add(answer_key)
    await db.flush()

    for entry in entries:
        ake = AnswerKeyEntry(
            answer_key_id=answer_key.id,
            question_id=entry["question_id"],
            correct_option=entry["correct_option"],
        )
        db.add(ake)

    await db.commit()
    await log_audit(db, created_by, AuditAction.CREATE, "AnswerKey", answer_key.id)
    return answer_key


# =============================================================================
# Results & Ranking Services
# =============================================================================

async def calculate_results(
    db: AsyncSession,
    olympiad_id: UUID,
    paper_id: UUID,
    answer_key_id: UUID,
    calculated_by: UUID,
) -> List[AssessmentResult]:
    """Calculate results for all students who answered this paper."""
    paper = await db.get(OlympiadPaper, paper_id)
    if not paper:
        raise ValueError("Paper not found")

    answer_key = await db.get(AnswerKey, answer_key_id)
    if not answer_key:
        raise ValueError("Answer key not found")

    # Get all student answers for this paper
    answers_result = await db.execute(
        select(StudentAnswer).where(StudentAnswer.paper_id == paper_id)
    )
    student_answers = answers_result.scalars().all()

    # Group by student
    from collections import defaultdict
    answers_by_student = defaultdict(list)
    for ans in student_answers:
        answers_by_student[ans.student_id].append(ans)

    # Get questions and answer key
    questions_result = await db.execute(
        select(Question).join(Section).where(Section.paper_id == paper_id)
    )
    questions = {q.id: q for q in questions_result.scalars().all()}

    answer_key_entries = await db.execute(
        select(AnswerKeyEntry).where(AnswerKeyEntry.answer_key_id == answer_key_id)
    )
    answer_key_map = {e.question_id: e.correct_option for e in answer_key_entries.scalars().all()}

    # Get sections for section scoring
    sections_result = await db.execute(
        select(Section).where(Section.paper_id == paper_id)
    )
    sections = {s.id: {"id": s.id, "name": s.name} for s in sections_result.scalars().all()}

    results = []
    for student_id, answers in answers_by_student.items():
        # Get student's current class/batch at time of exam
        enrollment = await db.execute(
            select(StudentBatch).where(
                StudentBatch.student_id == student_id,
                StudentBatch.status == StudentBatchStatus.ACTIVE,
            )
        )
        enrollment = enrollment.scalar_one_or_none()

        # Calculate score
        score_data = calculate_assessment_result(
            ResultCalculationInput(
                student_id=student_id,
                olympiad_id=olympiad_id,
                paper_id=paper_id,
                answer_key_id=answer_key_id,
                paper_version=paper.version,
                class_at_time_of_exam=enrollment.class_id if enrollment else paper.class_id,
                batch_at_time_of_exam=enrollment.batch_id if enrollment else None,
                answers=answers,
                answer_key=answer_key_map,
                questions={q_id: QuestionConfig(
                    question_id=q_id,
                    marks=q.marks,
                    negative_marks=q.negative_marks,
                    correct_option=answer_key_map.get(q_id, ""),
                    section_id=q.section_id,
                ) for q_id, q in questions.items()},
                sections=sections,
            )
        )

        # Create or update result
        existing = await db.execute(
            select(AssessmentResult).where(
                AssessmentResult.student_id == student_id,
                AssessmentResult.olympiad_id == olympiad_id,
                AssessmentResult.paper_id == paper_id,
            )
        )
        result = existing.scalar_one_or_none()
        if result:
            result.total_score = score_data.total_score
            result.max_possible_score = score_data.max_possible_score
            result.percentage = score_data.percentage
            result.section_scores = score_data.section_scores
            result.correct_count = score_data.correct_count
            result.incorrect_count = score_data.incorrect_count
            result.unanswered_count = score_data.unanswered_count
            result.status = ResultStatus.DRAFT
        else:
            result = AssessmentResult(
                student_id=student_id,
                olympiad_id=olympiad_id,
                paper_id=paper_id,
                answer_key_id=answer_key_id,
                paper_version=paper.version,
                class_at_time_of_exam=enrollment.class_id if enrollment else paper.class_id,
                batch_at_time_of_exam=enrollment.batch_id if enrollment else paper.class_id,
                total_score=score_data.total_score,
                max_possible_score=score_data.max_possible_score,
                percentage=score_data.percentage,
                section_scores=score_data.section_scores,
                correct_count=score_data.correct_count,
                incorrect_count=score_data.incorrect_count,
                unanswered_count=score_data.unanswered_count,
                status=ResultStatus.DRAFT,
                institution_id=paper.institution_id,
            )
            db.add(result)

        results.append(result)

    await db.commit()
    await log_audit(db, calculated_by, AuditAction.CREATE, "AssessmentResult", olympiad_id,
                    after_value={"paper_id": str(paper_id), "count": len(results)})
    return results


async def publish_results(
    db: AsyncSession,
    olympiad_id: UUID,
    paper_id: UUID,
    published_by: UUID,
) -> int:
    """Publish results for an olympiad paper."""
    # Lock paper and answer key
    await db.execute(
        update(OlympiadPaper)
        .where(OlympiadPaper.id == paper_id)
        .values(locked_at=datetime.now(timezone.utc))
    )

    answer_key_result = await db.execute(
        select(AnswerKey).where(AnswerKey.paper_id == paper_id).order_by(AnswerKey.version.desc()).limit(1)
    )
    latest_key = answer_key_result.scalar_one_or_none()
    if latest_key:
        await db.execute(
            update(AnswerKey)
            .where(AnswerKey.id == latest_key.id)
            .values(locked_at=datetime.now(timezone.utc))
        )

    # Update results to published
    result = await db.execute(
        update(AssessmentResult)
        .where(
            AssessmentResult.olympiad_id == olympiad_id,
            AssessmentResult.paper_id == paper_id,
            AssessmentResult.status == ResultStatus.DRAFT,
        )
        .values(
            status=ResultStatus.PUBLISHED,
            published_at=datetime.now(timezone.utc),
            published_by=published_by,
        )
        .returning(AssessmentResult.id)
    )
    published_ids = result.scalars().all()

    # Calculate rankings
    await calculate_rankings(db, olympiad_id, paper_id)

    await db.commit()
    await log_audit(db, published_by, AuditAction.PUBLISH, "AssessmentResult", olympiad_id,
                    after_value={"paper_id": str(paper_id), "published_count": len(published_ids)})
    return len(published_ids)


async def calculate_rankings(
    db: AsyncSession,
    olympiad_id: UUID,
    paper_id: UUID,
) -> List[Ranking]:
    """Calculate and store rankings for an olympiad paper."""
    # Get published results
    results_result = await db.execute(
        select(AssessmentResult)
        .where(
            AssessmentResult.olympiad_id == olympiad_id,
            AssessmentResult.paper_id == paper_id,
            AssessmentResult.status == ResultStatus.PUBLISHED,
        )
        .options(selectinload(AssessmentResult.student))
    )
    results = results_result.scalars().all()

    if not results:
        return []

    # Group by class
    from collections import defaultdict
    by_class = defaultdict(list)
    for r in results:
        by_class[r.class_at_time_of_exam].append(r)

    rankings = []
    for class_id, class_results in by_class.items():
        class_obj = await db.get(Class, class_id)

        # Per-class ranking
        inputs = [
            RankingInput(
                student_id=r.student_id,
                student_public_id=r.student.public_id,
                student_name=r.student.full_name,
                total_score=r.total_score,
                max_possible_score=r.max_possible_score,
                percentage=r.percentage,
                section_scores=r.section_scores,
                class_id=class_id,
                class_name=class_obj.name if class_obj else "Unknown",
            )
            for r in class_results
        ]

        ranked = compute_rankings(inputs, scope="class")
        for rank_result in ranked:
            ranking = Ranking(
                assessment_result_id=next(r.id for r in class_results if r.student_id == rank_result.student_id),
                olympiad_id=olympiad_id,
                class_id=class_id,
                rank=rank_result.rank,
                rank_scope=RankScope.CLASS,
                institution_id=class_obj.institution_id if class_obj else rank_result.class_id,
            )
            db.add(ranking)
            rankings.append(ranking)

    # Cross-class ranking
    all_inputs = [
        RankingInput(
            student_id=r.student_id,
            student_public_id=r.student.public_id,
            student_name=r.student.full_name,
            total_score=r.total_score,
            max_possible_score=r.max_possible_score,
            percentage=r.percentage,
            section_scores=r.section_scores,
            class_id=r.class_at_time_of_exam,
            class_name=(await db.get(Class, r.class_at_time_of_exam)).name if r.class_at_time_of_exam else "Unknown",
        )
        for r in results
    ]

    cross_ranked = compute_rankings(all_inputs, scope="cross_class")
    for rank_result in cross_ranked:
        ranking = Ranking(
            assessment_result_id=next(r.id for r in results if r.student_id == rank_result.student_id),
            olympiad_id=olympiad_id,
            class_id=rank_result.class_id,
            rank=rank_result.rank,
            rank_scope=RankScope.CROSS_CLASS,
            institution_id=(await db.get(Class, rank_result.class_id)).institution_id,
        )
        db.add(ranking)
        rankings.append(ranking)

    await db.commit()
    return rankings


# =============================================================================
# OMR Services
# =============================================================================

async def create_omr_submission(
    db: AsyncSession,
    batch_id: UUID,
    paper_id: UUID,
    image_storage_key: str,
    uploaded_by: UUID,
) -> OMRSubmission:
    submission = OMRSubmission(
        batch_id=batch_id,
        paper_id=paper_id,
        uploaded_by=uploaded_by,
        image_storage_key=image_storage_key,
        status=OMRStatus.PENDING,
        institution_id=(await db.get(Batch, batch_id)).institution_id,
    )
    db.add(submission)
    await db.commit()
    await log_audit(db, uploaded_by, AuditAction.CREATE, "OMRSubmission", submission.id)
    return submission


async def confirm_omr_review(
    db: AsyncSession,
    submission_id: UUID,
    reviewed_answers: List[dict],
    confirmed_by: UUID,
) -> OMRSubmission:
    submission = await db.get(OMRSubmission, submission_id)
    if not submission:
        raise ValueError("Submission not found")

    if submission.status != OMRStatus.NEEDS_REVIEW:
        raise ValueError("Submission not in review state")

    # Create StudentAnswer records from reviewed answers
    for ans in reviewed_answers:
        # In real implementation, you'd map each OMR sheet to a student
        # This is simplified
        student_answer = StudentAnswer(
            student_id=ans.get("student_id"),  # Would need mapping
            question_id=UUID(ans["question_id"]),
            paper_id=submission.paper_id,
            olympiad_id=(await db.get(OlympiadPaper, submission.paper_id)).olympiad_id,
            selected_option=ans.get("selected_option"),
            entry_method=AnswerEntryMethod.OMR,
            entered_by=confirmed_by,
            institution_id=submission.institution_id,
        )
        db.add(student_answer)

    submission.status = OMRStatus.COMPLETED
    await db.commit()
    await log_audit(db, confirmed_by, AuditAction.UPDATE, "OMRSubmission", submission_id)
    return submission


