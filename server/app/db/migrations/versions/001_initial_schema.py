# JMO Management System — Initial Schema Migration
"""Initial schema

Revision ID: 001
Revises: 
Create Date: 2026-08-26 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:


    # Institutions table (for multi-tenancy readiness)
    op.create_table(
        'institutions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )

    # Users
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('public_id', sa.String(20), nullable=False, unique=True),
        sa.Column('email', sa.String(255), nullable=False, unique=True),
        sa.Column('password_hash', sa.String(255), nullable=True),
        sa.Column('role', sa.Enum('admin', 'teacher', name='user_role', create_type=False), nullable=False),
        sa.Column('status', sa.Enum('invited', 'active', 'disabled', name='user_status', create_type=False), nullable=False, server_default='invited'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index('ix_users_institution_role', 'users', ['institution_id', 'role'])
    op.create_index('ix_users_status', 'users', ['status'])

    # Teachers
    op.create_table(
        'teachers',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('public_id', sa.String(20), nullable=False, unique=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True),
        sa.Column('full_name', sa.String(255), nullable=False),
        sa.Column('phone', sa.String(50), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )

    # Guardians
    op.create_table(
        'guardians',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('relationship', sa.String(50), nullable=True),
        sa.Column('phone', sa.String(50), nullable=False),
        sa.Column('email', sa.String(255), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )

    # Students
    op.create_table(
        'students',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('public_id', sa.String(20), nullable=False, unique=True),
        sa.Column('full_name', sa.String(255), nullable=False),
        sa.Column('date_of_birth', sa.Date, nullable=True),
        sa.Column('gender', sa.String(20), nullable=True),
        sa.Column('photo_url', sa.String(500), nullable=True),
        sa.Column('phone', sa.String(50), nullable=True),
        sa.Column('email', sa.String(255), nullable=True),
        sa.Column('guardian_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('guardians.id', ondelete='SET NULL'), nullable=True),
        sa.Column('status', sa.Enum('active', 'withdrawn', name='student_status', create_type=False), nullable=False, server_default='active'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('ix_students_institution_status', 'students', ['institution_id', 'status'])
    op.create_index('ix_students_full_name', 'students', ['full_name'])
    op.create_index('ix_students_guardian_id', 'students', ['guardian_id'])

    # Academic Years
    op.create_table(
        'academic_years',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('start_date', sa.Date, nullable=False),
        sa.Column('end_date', sa.Date, nullable=False),
        sa.Column('is_active', sa.Boolean, nullable=False, server_default='false'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index('ix_academic_years_institution_active', 'academic_years', ['institution_id', 'is_active'])

    # Classes
    op.create_table(
        'classes',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('academic_year_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('academic_years.id', ondelete='CASCADE'), nullable=False),
        sa.Column('sort_order', sa.Integer, nullable=False, server_default='0'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_class_inst_year_name', 'classes', ['institution_id', 'academic_year_id', 'name'])
    op.create_index('ix_classes_academic_year', 'classes', ['academic_year_id'])

    # Batches
    op.create_table(
        'batches',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('class_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('classes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('schedule_days', sa.String(100), nullable=True),
        sa.Column('status', sa.Enum('active', 'completed', 'archived', name='batch_status', create_type=False), nullable=False, server_default='active'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_batch_class_name', 'batches', ['class_id', 'name'])
    op.create_index('ix_batches_class_status', 'batches', ['class_id', 'status'])

    # Student Batches (Enrollment History)
    op.create_table(
        'student_batches',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('students.id', ondelete='CASCADE'), nullable=False),
        sa.Column('batch_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('batches.id', ondelete='CASCADE'), nullable=False),
        sa.Column('class_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('classes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('enrolled_date', sa.Date, nullable=False),
        sa.Column('removed_date', sa.Date, nullable=True),
        sa.Column('status', sa.Enum('active', 'transferred', 'withdrawn', name='student_batch_status', create_type=False), nullable=False, server_default='active'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
    )
    op.create_index('ix_student_batches_student_status', 'student_batches', ['student_id', 'status'])
    op.create_index('ix_student_batches_batch_status', 'student_batches', ['batch_id', 'status'])

    # Teacher Batches
    op.create_table(
        'teacher_batches',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('teacher_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('teachers.id', ondelete='CASCADE'), nullable=False),
        sa.Column('batch_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('batches.id', ondelete='CASCADE'), nullable=False),
        sa.Column('assigned_date', sa.Date, nullable=False),
        sa.Column('removed_date', sa.Date, nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
    )
    op.create_index('ix_teacher_batches_teacher_active', 'teacher_batches', ['teacher_id', 'removed_date'])
    op.create_index('ix_teacher_batches_batch_active', 'teacher_batches', ['batch_id', 'removed_date'])

    # Sessions
    op.create_table(
        'sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('batch_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('batches.id', ondelete='CASCADE'), nullable=False),
        sa.Column('session_date', sa.Date, nullable=False),
        sa.Column('session_number', sa.Integer, nullable=False),
        sa.Column('status', sa.Enum('scheduled', 'completed', 'cancelled', name='session_status', create_type=False), nullable=False, server_default='scheduled'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_session_batch_date_num', 'sessions', ['batch_id', 'session_date', 'session_number'])
    op.create_index('ix_sessions_batch_date', 'sessions', ['batch_id', 'session_date'])

    # Attendance
    op.create_table(
        'attendance',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('students.id', ondelete='CASCADE'), nullable=False),
        sa.Column('session_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sessions.id', ondelete='CASCADE'), nullable=False),
        sa.Column('status', sa.Enum('present', 'absent', 'late', 'excused', name='attendance_status', create_type=False), nullable=False),
        sa.Column('recorded_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('sync_source', sa.String(20), nullable=True),
        sa.Column('recorded_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
    )
    op.create_unique_constraint('uq_attendance_student_session', 'attendance', ['student_id', 'session_id'])
    op.create_index('ix_attendance_session', 'attendance', ['session_id'])
    op.create_index('ix_attendance_student', 'attendance', ['student_id'])

    # Olympiads
    op.create_table(
        'olympiads',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('description', sa.Text, nullable=True),
        sa.Column('olympiad_date', sa.Date, nullable=True),
        sa.Column('academic_year_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('academic_years.id', ondelete='CASCADE'), nullable=False),
        sa.Column('status', sa.Enum('draft', 'scheduled', 'in_progress', 'completed', name='olympiad_status', create_type=False), nullable=False, server_default='draft'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )

    # Olympiad Papers
    op.create_table(
        'olympiad_papers',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('olympiad_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiads.id', ondelete='CASCADE'), nullable=False),
        sa.Column('class_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('classes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('version', sa.Integer, nullable=False, server_default='1'),
        sa.Column('total_marks', sa.Integer, nullable=False, server_default='0'),
        sa.Column('locked_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_paper_olympiad_class_version', 'olympiad_papers', ['olympiad_id', 'class_id', 'version'])
    op.create_index('ix_papers_olympiad_class', 'olympiad_papers', ['olympiad_id', 'class_id'])

    # Sections
    op.create_table(
        'sections',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('paper_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiad_papers.id', ondelete='CASCADE'), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('sort_order', sa.Integer, nullable=False),
        sa.Column('marks_per_question', sa.Integer, nullable=False),
        sa.Column('negative_marks_per_question', sa.Integer, nullable=False, server_default='0'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_section_paper_order', 'sections', ['paper_id', 'sort_order'])
    op.create_index('ix_sections_paper', 'sections', ['paper_id'])

    # Questions
    op.create_table(
        'questions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('section_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sections.id', ondelete='CASCADE'), nullable=False),
        sa.Column('question_number', sa.Integer, nullable=False),
        sa.Column('question_text', sa.Text, nullable=True),
        sa.Column('marks', sa.Integer, nullable=False),
        sa.Column('negative_marks', sa.Integer, nullable=False, server_default='0'),
        sa.Column('num_options', sa.Integer, nullable=False, server_default='4'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_question_section_number', 'questions', ['section_id', 'question_number'])
    op.create_index('ix_questions_section', 'questions', ['section_id'])

    # Question Options
    op.create_table(
        'question_options',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('question_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('questions.id', ondelete='CASCADE'), nullable=False),
        sa.Column('label', sa.String(1), nullable=False),
        sa.Column('option_text', sa.Text, nullable=True),
        sa.Column('sort_order', sa.Integer, nullable=False),
    )
    op.create_unique_constraint('uq_option_question_label', 'question_options', ['question_id', 'label'])
    op.create_index('ix_question_options_question', 'question_options', ['question_id'])

    # Answer Keys
    op.create_table(
        'answer_keys',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('paper_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiad_papers.id', ondelete='CASCADE'), nullable=False),
        sa.Column('version', sa.Integer, nullable=False, server_default='1'),
        sa.Column('locked_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_answer_key_paper_version', 'answer_keys', ['paper_id', 'version'])
    op.create_index('ix_answer_keys_paper', 'answer_keys', ['paper_id'])

    # Answer Key Entries
    op.create_table(
        'answer_key_entries',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('answer_key_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('answer_keys.id', ondelete='CASCADE'), nullable=False),
        sa.Column('question_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('questions.id', ondelete='CASCADE'), nullable=False),
        sa.Column('correct_option', sa.String(1), nullable=False),
    )
    op.create_unique_constraint('uq_answer_key_entry_key_question', 'answer_key_entries', ['answer_key_id', 'question_id'])
    op.create_index('ix_answer_key_entries_key', 'answer_key_entries', ['answer_key_id'])

    # Student Answers
    op.create_table(
        'student_answers',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('students.id', ondelete='CASCADE'), nullable=False),
        sa.Column('question_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('questions.id', ondelete='CASCADE'), nullable=False),
        sa.Column('paper_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiad_papers.id', ondelete='CASCADE'), nullable=False),
        sa.Column('olympiad_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiads.id', ondelete='CASCADE'), nullable=False),
        sa.Column('selected_option', sa.String(1), nullable=True),
        sa.Column('entry_method', sa.Enum('manual', 'omr', name='answer_entry_method', create_type=False), nullable=False),
        sa.Column('entered_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_student_answer_student_question_paper', 'student_answers', ['student_id', 'question_id', 'paper_id'])
    op.create_index('ix_student_answers_student_paper', 'student_answers', ['student_id', 'paper_id'])

    # Assessment Results
    op.create_table(
        'assessment_results',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('students.id', ondelete='CASCADE'), nullable=False),
        sa.Column('olympiad_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiads.id', ondelete='CASCADE'), nullable=False),
        sa.Column('paper_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiad_papers.id', ondelete='CASCADE'), nullable=False),
        sa.Column('answer_key_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('answer_keys.id', ondelete='CASCADE'), nullable=False),
        sa.Column('paper_version', sa.Integer, nullable=False),
        sa.Column('class_at_time_of_exam', postgresql.UUID(as_uuid=True), sa.ForeignKey('classes.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('batch_at_time_of_exam', postgresql.UUID(as_uuid=True), sa.ForeignKey('batches.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('total_score', sa.Integer, nullable=False, server_default='0'),
        sa.Column('max_possible_score', sa.Integer, nullable=False, server_default='0'),
        sa.Column('percentage', sa.Numeric(5, 2), nullable=False, server_default='0.0'),
        sa.Column('section_scores', postgresql.JSONB, nullable=False, server_default='[]'),
        sa.Column('correct_count', sa.Integer, nullable=False, server_default='0'),
        sa.Column('incorrect_count', sa.Integer, nullable=False, server_default='0'),
        sa.Column('unanswered_count', sa.Integer, nullable=False, server_default='0'),
        sa.Column('status', sa.Enum('draft', 'reviewed', 'published', name='result_status', create_type=False), nullable=False, server_default='draft'),
        sa.Column('published_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('published_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_result_student_olympiad_paper', 'assessment_results', ['student_id', 'olympiad_id', 'paper_id'])
    op.create_index('ix_results_olympiad_status', 'assessment_results', ['olympiad_id', 'status'])
    op.create_index('ix_results_student', 'assessment_results', ['student_id'])

    # Rankings
    op.create_table(
        'rankings',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('assessment_result_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('assessment_results.id', ondelete='CASCADE'), nullable=False),
        sa.Column('olympiad_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiads.id', ondelete='CASCADE'), nullable=False),
        sa.Column('class_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('classes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('rank', sa.Integer, nullable=False),
        sa.Column('rank_scope', sa.Enum('class', 'cross_class', name='rank_scope', create_type=False), nullable=False),
        sa.Column('percentile', sa.Numeric(5, 2), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index('ix_rankings_olympiad_scope', 'rankings', ['olympiad_id', 'rank_scope'])
    op.create_index('ix_rankings_olympiad_class', 'rankings', ['olympiad_id', 'class_id'])

    # OMR Submissions
    op.create_table(
        'omr_submissions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('batch_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('batches.id', ondelete='CASCADE'), nullable=False),
        sa.Column('paper_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiad_papers.id', ondelete='CASCADE'), nullable=False),
        sa.Column('uploaded_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('image_storage_key', sa.String(500), nullable=False),
        sa.Column('status', sa.Enum('pending', 'processing', 'needs_review', 'completed', 'failed', name='omr_status', create_type=False), nullable=False, server_default='pending'),
        sa.Column('job_id', sa.String(100), nullable=True),
        sa.Column('extracted_answers', postgresql.JSONB, nullable=True),
        sa.Column('error_message', sa.String(1000), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index('ix_omr_status', 'omr_submissions', ['status'])
    op.create_index('ix_omr_batch', 'omr_submissions', ['batch_id'])

    # Awards
    op.create_table(
        'awards',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('olympiad_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiads.id', ondelete='CASCADE'), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('criteria_description', sa.Text, nullable=True),
        sa.Column('min_rank', sa.Integer, nullable=True),
        sa.Column('min_percentage', sa.Numeric(5, 2), nullable=True),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_index('ix_awards_olympiad', 'awards', ['olympiad_id'])

    # Certificates
    op.create_table(
        'certificates',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('students.id', ondelete='CASCADE'), nullable=False),
        sa.Column('award_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('awards.id', ondelete='CASCADE'), nullable=False),
        sa.Column('olympiad_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('olympiads.id', ondelete='CASCADE'), nullable=False),
        sa.Column('assessment_result_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('assessment_results.id', ondelete='CASCADE'), nullable=False),
        sa.Column('certificate_url', sa.String(500), nullable=False),
        sa.Column('issued_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('issued_by', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='RESTRICT'), nullable=False),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
    )
    op.create_index('ix_certificates_student', 'certificates', ['student_id'])
    op.create_index('ix_certificates_olympiad', 'certificates', ['olympiad_id'])

    # Custom Fields
    op.create_table(
        'custom_fields',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('field_name', sa.String(100), nullable=False),
        sa.Column('field_type', sa.Enum('text', 'number', 'date', 'dropdown', name='custom_field_type', create_type=False), nullable=False),
        sa.Column('dropdown_options', postgresql.JSONB, nullable=True),
        sa.Column('is_required', sa.Boolean, nullable=False, server_default='false'),
        sa.Column('is_active', sa.Boolean, nullable=False, server_default='true'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('ix_custom_fields_institution_active', 'custom_fields', ['institution_id', 'is_active'])

    # Custom Field Values
    op.create_table(
        'custom_field_values',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('custom_field_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('custom_fields.id', ondelete='CASCADE'), nullable=False),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('students.id', ondelete='CASCADE'), nullable=False),
        sa.Column('value', sa.Text, nullable=False),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )
    op.create_unique_constraint('uq_custom_field_value_field_student', 'custom_field_values', ['custom_field_id', 'student_id'])
    op.create_index('ix_custom_field_values_student', 'custom_field_values', ['student_id'])

    # Audit Logs
    op.create_table(
        'audit_logs',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=sa.text('gen_random_uuid()')),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('action', sa.Enum('create', 'update', 'delete', 'publish', 'unpublish', 'activate', 'deactivate', 'transfer', 'withdraw', 'sync_conflict', name='audit_action', create_type=False), nullable=False),
        sa.Column('entity_type', sa.String(100), nullable=False),
        sa.Column('entity_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('before_value', postgresql.JSONB, nullable=True),
        sa.Column('after_value', postgresql.JSONB, nullable=True),
        sa.Column('ip_address', sa.String(45), nullable=True),
        sa.Column('user_agent', sa.String(500), nullable=True),
        sa.Column('is_conflict', sa.Boolean, nullable=False, server_default='false'),
        sa.Column('institution_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('institutions.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index('ix_audit_logs_entity', 'audit_logs', ['entity_type', 'entity_id'])
    op.create_index('ix_audit_logs_user', 'audit_logs', ['user_id'])
    op.create_index('ix_audit_logs_created', 'audit_logs', ['created_at'])
    op.execute("CREATE INDEX ix_audit_logs_conflict ON audit_logs (is_conflict) WHERE is_conflict = true")

    # Insert default institution
    op.execute("""
        INSERT INTO institutions (id, name, created_at, updated_at)
        VALUES ('00000000-0000-0000-0000-000000000001', 'Default Institution', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
    """)


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_table('audit_logs')
    op.drop_table('custom_field_values')
    op.drop_table('custom_fields')
    op.drop_table('certificates')
    op.drop_table('awards')
    op.drop_table('omr_submissions')
    op.drop_table('rankings')
    op.drop_table('assessment_results')
    op.drop_table('student_answers')
    op.drop_table('answer_key_entries')
    op.drop_table('answer_keys')
    op.drop_table('question_options')
    op.drop_table('questions')
    op.drop_table('sections')
    op.drop_table('olympiad_papers')
    op.drop_table('olympiads')
    op.drop_table('attendance')
    op.drop_table('sessions')
    op.drop_table('teacher_batches')
    op.drop_table('student_batches')
    op.drop_table('batches')
    op.drop_table('classes')
    op.drop_table('academic_years')
    op.drop_table('students')
    op.drop_table('guardians')
    op.drop_table('teachers')
    op.drop_table('users')
    op.drop_table('institutions')

    # Drop enum types
    op.execute("DROP TYPE IF EXISTS audit_action")
    op.execute("DROP TYPE IF EXISTS custom_field_type")
    op.execute("DROP TYPE IF EXISTS answer_entry_method")
    op.execute("DROP TYPE IF EXISTS omr_status")
    op.execute("DROP TYPE IF EXISTS rank_scope")
    op.execute("DROP TYPE IF EXISTS result_status")
    op.execute("DROP TYPE IF EXISTS olympiad_status")
    op.execute("DROP TYPE IF EXISTS attendance_status")
    op.execute("DROP TYPE IF EXISTS session_status")
    op.execute("DROP TYPE IF EXISTS batch_status")
    op.execute("DROP TYPE IF EXISTS student_batch_status")
    op.execute("DROP TYPE IF EXISTS student_status")
    op.execute("DROP TYPE IF EXISTS user_status")
    op.execute("DROP TYPE IF EXISTS user_role")