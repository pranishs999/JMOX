# JMO Management System — Database Design

> Complete database design specification.
> Source of truth: [context.md](context.md) | Divergence Log: [audit-notes.md](audit-notes.md)

---

## 1. Design Principles

1. **UUIDs as Primary Keys**: All database tables use 128-bit UUID (v4) primary keys. No auto-incrementing integer IDs are exposed via APIs or stored as primary identifiers.
2. **Public IDs (`public_id`)**: Client-facing entities (Students, Teachers, Users) feature a unique, short, non-sequential `public_id` (e.g., `STU-98234`, `TCH-41029`) generated via database triggers/listeners (`PublicIdConfig`). Internal UUIDs remain the foreign key join mechanism.
3. **Soft-Delete Mechanics**: Critical domain records (Students, CustomFields, Papers) use `deleted_at` timestamps or status enums (`withdrawn`, `archived`, `disabled`) to preserve historical lineage and prevent broken foreign key references.
4. **Historical Lineage & Append-Only Log**: Class/batch transfers generate new `StudentBatch` records rather than overwriting historical rows. Assessment results produce immutable `ResultSnapshot` payloads upon publication.
5. **Multi-Tenancy Readiness**: Every primary table incorporates an `institution_id` column for multi-institute isolation.
6. **Immutable Published Papers & Answer Keys**: Papers and answer keys feature `version` counters and `locked_at` timestamps. Post-publication changes spawn a new `version` record (`v2`).
7. **Role & Login Association**: `User` accounts link 1-to-1 with `Teacher` or `Student` records via `user_id` foreign keys, enabling unified auth with support for auto-generated login passwords.

---

## 2. Entity-Relationship Diagram

```mermaid
erDiagram
    User ||--o| Teacher : "has profile"
    User ||--o| Student : "has profile"
    User {
        uuid id PK
        string public_id UK
        string email UK
        string password_hash
        enum role "admin | teacher | student"
        enum status "invited | active | disabled"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Teacher {
        uuid id PK
        string public_id UK
        uuid user_id FK
        string full_name
        string phone
        uuid institution_id FK
    }

    Student {
        uuid id PK
        string public_id UK
        uuid user_id FK "nullable"
        string full_name
        date date_of_birth
        string gender
        string photo_url
        string phone
        string email
        uuid guardian_id FK "nullable"
        enum status "active | withdrawn"
        uuid institution_id FK
        timestamp deleted_at "nullable"
    }

    Guardian {
        uuid id PK
        string name
        string relationship
        string phone
        string email
    }

    Guardian ||--o{ Student : "guardian of"

    AcademicYear ||--|{ Class : "contains"
    Class ||--|{ Batch : "contains"
    Class ||--o{ Subject : "has subjects"

    AcademicYear {
        uuid id PK
        string name
        date start_date
        date end_date
        boolean is_active
    }

    Class {
        uuid id PK
        string name
        uuid academic_year_id FK
        int sort_order
    }

    Batch {
        uuid id PK
        string name
        uuid class_id FK
        string schedule_days
        enum status "active | completed | archived"
    }

    Subject {
        uuid id PK
        string name
        string code
        uuid class_id FK
    }

    Teacher ||--|{ TeacherBatch : "assigned to"
    Batch ||--|{ TeacherBatch : "managed by"
    TeacherBatch {
        uuid id PK
        uuid teacher_id FK
        uuid batch_id FK
        date assigned_date
        date removed_date "nullable"
    }

    Student ||--|{ StudentBatch : "enrolled in"
    Batch ||--|{ StudentBatch : "has students"
    StudentBatch {
        uuid id PK
        uuid student_id FK
        uuid batch_id FK
        uuid class_id FK
        date enrolled_date
        date removed_date "nullable"
        enum status "active | transferred | withdrawn"
    }

    Batch ||--|{ Session : "schedules"
    Session {
        uuid id PK
        uuid batch_id FK
        date session_date
        int session_number
        enum status "scheduled | completed | cancelled"
    }

    Session ||--|{ Attendance : "records"
    Student ||--|{ Attendance : "attended by"
    Attendance {
        uuid id PK
        uuid session_date_id FK
        uuid student_id FK
        enum status "present | absent | late | excused"
        timestamp recorded_at
        uuid recorded_by FK
    }

    Olympiad ||--|{ Paper : "defines"
    Olympiad {
        uuid id PK
        string name
        text description
        date event_date
        uuid academic_year_id FK
        enum status "draft | scheduled | in_progress | completed | evaluated | published"
    }

    Paper ||--|{ Section : "contains"
    Paper ||--|{ AnswerKey : "has keys"
    Paper {
        uuid id PK
        string title
        uuid olympiad_id FK
        uuid class_id FK
        int total_marks
        int duration_minutes
        int version
        timestamp locked_at "nullable"
    }

    Section ||--|{ Question : "contains"
    Section {
        uuid id PK
        uuid paper_id FK
        string name
        int total_questions
        int marks_per_question
        int sort_order
    }

    Question {
        uuid id PK
        uuid section_id FK
        int question_number
        text question_text
        json options
        string correct_option
        numeric positive_marks
        numeric negative_marks
    }

    AnswerKey ||--|{ AnswerKeyVersion : "tracks versions"
    AnswerKey {
        uuid id PK
        uuid paper_id FK
        int current_version
        timestamp locked_at "nullable"
    }

    AnswerKeyVersion {
        uuid id PK
        uuid answer_key_id FK
        int version
        json key_data
        uuid created_by FK
        timestamp created_at
    }

    Olympiad ||--|{ AssessmentResult : "produces"
    Student ||--|{ AssessmentResult : "awarded to"
    AssessmentResult {
        uuid id PK
        uuid olympiad_id FK
        uuid student_id FK
        uuid paper_id FK
        numeric total_score
        int overall_rank
        int class_rank
        int batch_rank
        json section_scores
        timestamp evaluated_at
    }

    Subject ||--o{ LearningMaterial : "has notes"
    LearningMaterial {
        uuid id PK
        string title
        text description
        string file_url
        uuid subject_id FK
        uuid class_id FK
        uuid batch_id FK "nullable"
    }

    Subject ||--o{ Book : "recommends"
    Book {
        uuid id PK
        string title
        string author
        string cover_image_url
        string link_url
        uuid subject_id FK
        uuid class_id FK
    }

    Notification {
        uuid id PK
        string title
        text message
        enum target_role "all | teachers | students"
        uuid target_batch_id FK "nullable"
        timestamp created_at
    }

    AuditLog {
        uuid id PK
        uuid user_id FK "nullable"
        string action
        string entity_type
        uuid entity_id
        json before_value
        json after_value
        boolean is_conflict
        timestamp created_at
    }
```

---

## 3. Detailed Table Specifications

### 3.1 Core Authentication & User Tables

#### `users`
Central user directory for authentication and RBAC.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, default `uuid4()` | Internal unique identifier |
| `public_id` | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable non-sequential ID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Login email address |
| `password_hash` | VARCHAR(255) | NULLABLE | Argon2id password hash |
| `role` | VARCHAR(20) | NOT NULL | Enum: `admin`, `teacher`, `student` |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT `'invited'` | Enum: `invited`, `active`, `disabled` |
| `institution_id` | UUID | NOT NULL | Foreign key for multi-tenancy |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Last modification timestamp |

#### `teachers`
Teacher and instructor profiles linked to `users`.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, default `uuid4()` | Internal teacher ID |
| `public_id` | VARCHAR(20) | UNIQUE, NOT NULL | Teacher public ID (e.g. `TCH-10294`) |
| `user_id` | UUID | FK -> `users(id)`, UNIQUE, NOT NULL | Linked login user account |
| `full_name` | VARCHAR(255) | NOT NULL | Full name |
| `phone` | VARCHAR(50) | NULLABLE | Contact telephone |
| `institution_id` | UUID | NOT NULL | Multi-tenant institution FK |

#### `students`
Student candidate directory linked optional `users` for student login.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, default `uuid4()` | Internal student ID |
| `public_id` | VARCHAR(20) | UNIQUE, NOT NULL | Student public ID (e.g. `STU-84920`) |
| `user_id` | UUID | FK -> `users(id)`, UNIQUE, NULLABLE | Optional linked student login account |
| `full_name` | VARCHAR(255) | NOT NULL | Student full name |
| `date_of_birth` | DATE | NULLABLE | Date of birth |
| `gender` | VARCHAR(20) | NULLABLE | Gender |
| `photo_url` | VARCHAR(500) | NULLABLE | Avatar / picture URL |
| `phone` | VARCHAR(50) | NULLABLE | Contact phone |
| `email` | VARCHAR(255) | NULLABLE | Student contact email |
| `guardian_id` | UUID | FK -> `guardians(id)`, NULLABLE | Parent/guardian record |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT `'active'` | Enum: `active`, `withdrawn` |
| `institution_id` | UUID | NOT NULL | Multi-tenant institution FK |
| `deleted_at` | TIMESTAMPTZ | NULLABLE | Soft-delete timestamp |

---

### 3.2 Academic Structure Tables

#### `academic_years`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Academic year ID |
| `name` | VARCHAR(100) | NOT NULL | Year name (e.g. "2025-2026") |
| `start_date` | DATE | NOT NULL | Start date |
| `end_date` | DATE | NOT NULL | End date |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT `false` | Active year flag |

#### `classes`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Class ID |
| `name` | VARCHAR(100) | NOT NULL | Class name (e.g. "Grade 8") |
| `academic_year_id` | UUID | FK -> `academic_years(id)` | Parent academic year |
| `sort_order` | INT | NOT NULL, DEFAULT `0` | Display sorting order |

#### `batches`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Batch ID |
| `name` | VARCHAR(100) | NOT NULL | Batch name (e.g. "Batch A") |
| `class_id` | UUID | FK -> `classes(id)` | Parent class |
| `schedule_days` | VARCHAR(100) | NULLABLE | Weekly days (e.g. "Mon,Wed") |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT `'active'` | `active`, `completed`, `archived` |

#### `subjects`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Subject ID |
| `name` | VARCHAR(100) | NOT NULL | Subject name (e.g. "Geometry") |
| `code` | VARCHAR(20) | NOT NULL | Code (e.g. "MATH-GEO") |
| `class_id` | UUID | FK -> `classes(id)` | Parent class |

---

### 3.3 Assessment & OMR Processing Tables

#### `olympiads`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Olympiad event ID |
| `name` | VARCHAR(255) | NOT NULL | Event title |
| `description` | TEXT | NULLABLE | Description & instructions |
| `event_date` | DATE | NOT NULL | Scheduled exam date |
| `academic_year_id` | UUID | FK -> `academic_years(id)` | Scoped academic year |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT `'draft'` | Event lifecycle state |

#### `papers`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Question paper ID |
| `title` | VARCHAR(255) | NOT NULL | Paper title |
| `olympiad_id` | UUID | FK -> `olympiads(id)` | Parent olympiad |
| `class_id` | UUID | FK -> `classes(id)` | Target academic class |
| `total_marks` | INT | NOT NULL, DEFAULT `0` | Maximum marks |
| `duration_minutes` | INT | NOT NULL, DEFAULT `60` | Time limit in minutes |
| `version` | INT | NOT NULL, DEFAULT `1` | Paper version number |
| `locked_at` | TIMESTAMPTZ | NULLABLE | Immutability lock timestamp |

#### `questions`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Question ID |
| `section_id` | UUID | FK -> `sections(id)` | Parent section |
| `question_number` | INT | NOT NULL | Question number (1, 2, 3...) |
| `question_text` | TEXT | NOT NULL | Question stem/text |
| `options` | JSONB | NOT NULL | Options array `["A","B","C","D"]` |
| `correct_option` | VARCHAR(10) | NOT NULL | Answer key value |
| `positive_marks` | NUMERIC(5,2) | NOT NULL, DEFAULT `4.0` | Marks awarded for correct |
| `negative_marks` | NUMERIC(5,2) | NOT NULL, DEFAULT `0.0` | Penalty deducted for wrong |

#### `omr_submissions`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Submission ID |
| `olympiad_id` | UUID | FK -> `olympiads(id)` | Associated olympiad |
| `paper_id` | UUID | FK -> `papers(id)` | Scanned paper |
| `student_id` | UUID | FK -> `students(id)`, NULLABLE | Identified student |
| `image_url` | VARCHAR(500) | NOT NULL | Raw image storage URL |
| `processed_data` | JSONB | NULLABLE | Worker extraction JSON payload |
| `confidence_score` | NUMERIC(5,2) | NULLABLE | Average bubble reading confidence |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT `'pending'` | `pending`, `processing`, `needs_review`, `completed`, `failed` |

---

### 3.4 Resources & System Tables

#### `learning_materials`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Material ID |
| `title` | VARCHAR(255) | NOT NULL | Document title |
| `description` | TEXT | NULLABLE | Summary |
| `file_url` | VARCHAR(500) | NOT NULL | Downloadable PDF/asset URL |
| `subject_id` | UUID | FK -> `subjects(id)` | Scoped subject |
| `class_id` | UUID | FK -> `classes(id)` | Target class |
| `batch_id` | UUID | FK -> `batches(id)`, NULLABLE | Optional target batch |

#### `books`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Book ID |
| `title` | VARCHAR(255) | NOT NULL | Book title |
| `author` | VARCHAR(255) | NULLABLE | Author name |
| `cover_image_url` | VARCHAR(500) | NULLABLE | Cover image thumbnail URL |
| `link_url` | VARCHAR(500) | NULLABLE | Purchase / download link |
| `subject_id` | UUID | FK -> `subjects(id)` | Subject category |

#### `audit_logs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Audit record ID |
| `user_id` | UUID | FK -> `users(id)`, NULLABLE | Actor user account |
| `action` | VARCHAR(50) | NOT NULL | Action string (`create`, `update`, `publish`...) |
| `entity_type` | VARCHAR(100) | NOT NULL | Target table name |
| `entity_id` | UUID | NOT NULL | Target record UUID |
| `before_value` | JSONB | NULLABLE | Pre-mutation JSON snapshot |
| `after_value` | JSONB | NULLABLE | Post-mutation JSON snapshot |
| `is_conflict` | BOOLEAN | NOT NULL, DEFAULT `false` | Sync conflict flag |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Log timestamp |

---

## 4. Key Database Indexes & Constraints

1. **User Indexes**:
   - `ix_users_institution_role`: `(institution_id, role)`
   - `ix_users_status`: `(status)`
2. **Student & Teacher Indexes**:
   - `uq_students_public_id`: Unique index on `public_id`
   - `uq_teachers_public_id`: Unique index on `public_id`
   - `ix_students_user_id`: Index on `user_id`
3. **Attendance Constraints**:
   - `uq_attendance_session_student`: Unique constraint on `(session_id, student_id)` to prevent duplicate marking.
4. **Audit Log Index**:
   - `ix_audit_logs_conflict`: Partial index on `(is_conflict, created_at)` where `is_conflict = true`.

---

## 5. Document Cross-References

- System Requirements: [requirements.md](requirements.md)
- Divergence Log: [audit-notes.md](audit-notes.md)
- REST API Reference: [architecture-api.md](architecture-api.md)
