# JMO Management System — Database Design

> Complete database design specification.
> Derived from: [requirements.md](requirements.md) · [context.md](context.md)

---

## 1. Design Principles

1. **UUIDs as primary keys** — all tables use `UUID` (v4) primary keys. No auto-incrementing integers exposed to clients.
2. **Public IDs** — entities exposed externally (Student, Teacher, User) get a separate `public_id` (short, human-readable, non-sequential) for display, URLs, and printed materials. Internal UUIDs remain the join/FK mechanism.
3. **Soft-delete everywhere** — no hard-deletes on core entities. Use `deleted_at` (nullable timestamp) or `status` enums. Orphaning historical references is a bug.
4. **Historical preservation** — enrollment history, assessment snapshots, and audit logs are append-only or immutable once published. Class/batch transfers create new junction records rather than updating existing ones.
5. **Timestamps on every table** — `created_at`, `updated_at` (auto-managed). Audit-sensitive tables add `deleted_at` or `locked_at` as appropriate.
6. **Multi-tenancy readiness** — every top-level entity includes an `institution_id` column (FK to a future `Institution` table). v1 uses a single institution; the column is present so the schema doesn't need a migration when multi-tenancy is added.
7. **Referential integrity at DB level** — all foreign keys enforced; no "soft" references via untyped string columns.
8. **Versioning for immutable data** — Papers and AnswerKeys carry `version` and `locked_at`. Once any linked result is Published, the record is locked and further changes require a new version.

---

## 2. Entity-Relationship Diagram

```mermaid
erDiagram
    User ||--o| Teacher : "has profile"
    User {
        uuid id PK
        string public_id UK
        string email UK
        string password_hash
        enum role "admin | teacher"
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
        timestamp created_at
        timestamp updated_at
    }

    Teacher ||--|{ TeacherBatch : "assigned to"
    TeacherBatch {
        uuid id PK
        uuid teacher_id FK
        uuid batch_id FK
        date assigned_date
        date removed_date "nullable"
        uuid institution_id FK
    }

    AcademicYear {
        uuid id PK
        string name
        date start_date
        date end_date
        boolean is_active
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Class {
        uuid id PK
        string name
        uuid academic_year_id FK
        int sort_order
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    AcademicYear ||--|{ Class : "contains"

    Batch {
        uuid id PK
        string name
        uuid class_id FK
        string schedule_days "e.g. Mon,Thu"
        enum status "active | completed | archived"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Class ||--|{ Batch : "contains"
    Batch ||--|{ TeacherBatch : "has"

    Guardian {
        uuid id PK
        string name
        string relationship
        string phone
        string email
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Student {
        uuid id PK
        string public_id UK
        string full_name
        date date_of_birth
        enum gender
        string photo_url
        string phone
        string email
        uuid guardian_id FK
        enum status "active | withdrawn"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at "nullable"
    }

    Guardian ||--|{ Student : "guardian of"

    Student ||--|{ StudentBatch : "enrolled in"
    StudentBatch {
        uuid id PK
        uuid student_id FK
        uuid batch_id FK
        uuid class_id FK
        date enrolled_date
        date removed_date "nullable"
        enum status "active | transferred | withdrawn"
        uuid institution_id FK
    }

    Batch ||--|{ StudentBatch : "has"

    Session {
        uuid id PK
        uuid batch_id FK
        date session_date
        int session_number
        enum status "scheduled | completed | cancelled"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Batch ||--|{ Session : "has"

    Attendance {
        uuid id PK
        uuid student_id FK
        uuid session_id FK
        enum status "present | absent | late | excused"
        uuid recorded_by FK "User"
        string sync_source "flutter"
        timestamp recorded_at
        uuid institution_id FK
    }

    Student ||--|{ Attendance : "has"
    Session ||--|{ Attendance : "has"

    Olympiad {
        uuid id PK
        string name
        string description
        date olympiad_date
        uuid academic_year_id FK
        enum status "draft | scheduled | in_progress | completed"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    AcademicYear ||--|{ Olympiad : "contains"

    OlympiadPaper {
        uuid id PK
        uuid olympiad_id FK
        uuid class_id FK
        int version
        int total_marks
        timestamp locked_at "nullable"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Olympiad ||--|{ OlympiadPaper : "has"
    Class ||--|{ OlympiadPaper : "targeted by"

    Section {
        uuid id PK
        uuid paper_id FK
        string name
        int sort_order
        int marks_per_question
        int negative_marks_per_question "default 0"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    OlympiadPaper ||--|{ Section : "contains"

    Question {
        uuid id PK
        uuid section_id FK
        int question_number
        string question_text
        int marks
        int negative_marks "default 0"
        int num_options "default 4"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Section ||--|{ Question : "contains"

    QuestionOption {
        uuid id PK
        uuid question_id FK
        string label "A, B, C, D"
        string option_text
        int sort_order
    }

    Question ||--|{ QuestionOption : "has"

    AnswerKey {
        uuid id PK
        uuid paper_id FK
        int version
        timestamp locked_at "nullable"
        uuid created_by FK "User"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    OlympiadPaper ||--|{ AnswerKey : "has versions"

    AnswerKeyEntry {
        uuid id PK
        uuid answer_key_id FK
        uuid question_id FK
        string correct_option "A, B, C, D"
    }

    AnswerKey ||--|{ AnswerKeyEntry : "contains"

    StudentAnswer {
        uuid id PK
        uuid student_id FK
        uuid question_id FK
        uuid paper_id FK
        uuid olympiad_id FK
        string selected_option "nullable if unanswered"
        enum entry_method "manual | omr"
        uuid entered_by FK "User"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Student ||--|{ StudentAnswer : "gives"
    Question ||--|{ StudentAnswer : "answered by"

    OMRSubmission {
        uuid id PK
        uuid batch_id FK
        uuid paper_id FK
        uuid uploaded_by FK "User"
        string image_storage_key
        enum status "pending | processing | needs_review | completed | failed"
        string job_id "external worker job ID"
        jsonb extracted_answers "raw OMR output"
        string error_message "nullable"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    AssessmentResult {
        uuid id PK
        uuid student_id FK
        uuid olympiad_id FK
        uuid paper_id FK
        uuid answer_key_id FK
        int paper_version
        uuid class_at_time_of_exam FK "Class"
        uuid batch_at_time_of_exam FK "Batch"
        int total_score
        int max_possible_score
        float percentage
        jsonb section_scores "per-section breakdown"
        int correct_count
        int incorrect_count
        int unanswered_count
        enum status "draft | reviewed | published"
        timestamp published_at "nullable"
        uuid published_by FK "nullable, User"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Student ||--|{ AssessmentResult : "has"
    Olympiad ||--|{ AssessmentResult : "for"
    OlympiadPaper ||--|{ AssessmentResult : "scored against"

    Ranking {
        uuid id PK
        uuid assessment_result_id FK
        uuid olympiad_id FK
        uuid class_id FK
        int rank
        enum rank_scope "class | cross_class"
        float percentile
        uuid institution_id FK
        timestamp created_at
    }

    AssessmentResult ||--o| Ranking : "ranked"

    Topic {
        uuid id PK
        string name
        uuid class_id FK "nullable"
        uuid institution_id FK
        timestamp created_at
    }

    Syllabus {
        uuid id PK
        uuid class_id FK
        uuid topic_id FK
        uuid academic_year_id FK
        int sort_order
        uuid institution_id FK
    }

    Award {
        uuid id PK
        uuid olympiad_id FK
        string name "e.g. Gold, Silver, Bronze"
        string criteria_description
        int min_rank "nullable"
        float min_percentage "nullable"
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Olympiad ||--|{ Award : "defines"

    Certificate {
        uuid id PK
        uuid student_id FK
        uuid award_id FK
        uuid olympiad_id FK
        uuid assessment_result_id FK
        string certificate_url "storage key"
        timestamp issued_at
        uuid issued_by FK "User"
        uuid institution_id FK
    }

    Student ||--|{ Certificate : "receives"
    Award ||--|{ Certificate : "grants"

    CustomField {
        uuid id PK
        string field_name
        enum field_type "text | number | date | dropdown"
        string dropdown_options "nullable, JSON"
        boolean is_required
        boolean is_active
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at "nullable, soft-delete"
    }

    CustomFieldValue {
        uuid id PK
        uuid custom_field_id FK
        uuid student_id FK
        string value
        uuid institution_id FK
        timestamp created_at
        timestamp updated_at
    }

    Student ||--|{ CustomFieldValue : "has"
    CustomField ||--|{ CustomFieldValue : "stores"

    AuditLog {
        uuid id PK
        uuid user_id FK "nullable for system actions"
        string action "create | update | delete | publish | unpublish"
        string entity_type
        uuid entity_id
        jsonb before_value "nullable"
        jsonb after_value "nullable"
        string ip_address
        string user_agent
        boolean is_conflict "offline sync conflict flag"
        uuid institution_id FK
        timestamp created_at
    }
```

---

## 3. Entity Details

### 3.1 User

The authentication entity. Every person who logs in has exactly one `User` record.

| Column          | Type        | Constraints                        | Notes                                |
|-----------------|-------------|------------------------------------|--------------------------------------|
| `id`            | UUID        | PK                                 |                                      |
| `public_id`     | VARCHAR(20) | UNIQUE, NOT NULL                   | Non-sequential, human-readable       |
| `email`         | VARCHAR     | UNIQUE, NOT NULL                   |                                      |
| `password_hash` | VARCHAR     | NOT NULL (except `invited` status) | bcrypt/argon2                        |
| `role`          | ENUM        | NOT NULL                           | `admin`, `teacher`                   |
| `status`        | ENUM        | NOT NULL, DEFAULT `invited`        | `invited`, `active`, `disabled`      |
| `institution_id`| UUID        | FK → Institution, NOT NULL         |                                      |
| `created_at`    | TIMESTAMPTZ | NOT NULL, DEFAULT now()            |                                      |
| `updated_at`    | TIMESTAMPTZ | NOT NULL, DEFAULT now()            |                                      |

**Indexes:**
- `UNIQUE(email)`
- `UNIQUE(public_id)`
- `INDEX(institution_id, role)` — for listing users by role
- `INDEX(status)` — for filtering active/invited

### 3.2 Teacher

Profile data for a user with `role = teacher`. 1:1 with User.

| Column          | Type        | Constraints                | Notes                         |
|-----------------|-------------|----------------------------|-------------------------------|
| `id`            | UUID        | PK                         |                               |
| `public_id`     | VARCHAR(20) | UNIQUE, NOT NULL           | Display on reports, OMR sheets|
| `user_id`       | UUID        | FK → User, UNIQUE, NOT NULL|                               |
| `full_name`     | VARCHAR     | NOT NULL                   |                               |
| `phone`         | VARCHAR     |                            |                               |
| `institution_id`| UUID        | FK, NOT NULL               |                               |
| `created_at`    | TIMESTAMPTZ | NOT NULL                   |                               |
| `updated_at`    | TIMESTAMPTZ | NOT NULL                   |                               |

### 3.3 Student

| Column          | Type        | Constraints                | Notes                         |
|-----------------|-------------|----------------------------|-------------------------------|
| `id`            | UUID        | PK                         |                               |
| `public_id`     | VARCHAR(20) | UNIQUE, NOT NULL           | Printed on OMR sheets, reports|
| `full_name`     | VARCHAR     | NOT NULL                   |                               |
| `date_of_birth` | DATE        |                            |                               |
| `gender`        | ENUM        |                            | `male`, `female`, `other`     |
| `photo_url`     | VARCHAR     |                            | Supabase Storage key          |
| `phone`         | VARCHAR     |                            |                               |
| `email`         | VARCHAR     |                            |                               |
| `guardian_id`   | UUID        | FK → Guardian              |                               |
| `status`        | ENUM        | NOT NULL, DEFAULT `active` | `active`, `withdrawn`         |
| `institution_id`| UUID        | FK, NOT NULL               |                               |
| `created_at`    | TIMESTAMPTZ | NOT NULL                   |                               |
| `updated_at`    | TIMESTAMPTZ | NOT NULL                   |                               |
| `deleted_at`    | TIMESTAMPTZ |                            | Soft-delete                   |

**Indexes:**
- `UNIQUE(public_id)`
- `INDEX(institution_id, status)` — active student listings
- `INDEX(full_name)` — search
- `INDEX(guardian_id)`

### 3.4 Guardian

| Column          | Type        | Constraints    | Notes                           |
|-----------------|-------------|----------------|---------------------------------|
| `id`            | UUID        | PK             |                                 |
| `name`          | VARCHAR     | NOT NULL       |                                 |
| `relationship`  | VARCHAR     |                | e.g., "Father", "Mother"        |
| `phone`         | VARCHAR     | NOT NULL       |                                 |
| `email`         | VARCHAR     |                |                                 |
| `institution_id`| UUID        | FK, NOT NULL   |                                 |
| `created_at`    | TIMESTAMPTZ | NOT NULL       |                                 |
| `updated_at`    | TIMESTAMPTZ | NOT NULL       |                                 |

### 3.5 AcademicYear

| Column          | Type        | Constraints    | Notes                           |
|-----------------|-------------|----------------|---------------------------------|
| `id`            | UUID        | PK             |                                 |
| `name`          | VARCHAR     | NOT NULL       | e.g., "2026-2027"               |
| `start_date`    | DATE        | NOT NULL       |                                 |
| `end_date`      | DATE        | NOT NULL       |                                 |
| `is_active`     | BOOLEAN     | NOT NULL       | Only one active per institution  |
| `institution_id`| UUID        | FK, NOT NULL   |                                 |
| `created_at`    | TIMESTAMPTZ | NOT NULL       |                                 |
| `updated_at`    | TIMESTAMPTZ | NOT NULL       |                                 |

**Constraint:** Partial unique index — `UNIQUE(institution_id) WHERE is_active = true` — ensures at most one active academic year per institution.

### 3.6 Class

| Column            | Type        | Constraints                    | Notes                    |
|-------------------|-------------|--------------------------------|--------------------------|
| `id`              | UUID        | PK                             |                          |
| `name`            | VARCHAR     | NOT NULL                       | e.g., "Class 1"         |
| `academic_year_id`| UUID        | FK → AcademicYear, NOT NULL    |                          |
| `sort_order`      | INT         | NOT NULL                       |                          |
| `institution_id`  | UUID        | FK, NOT NULL                   |                          |
| `created_at`      | TIMESTAMPTZ | NOT NULL                       |                          |
| `updated_at`      | TIMESTAMPTZ | NOT NULL                       |                          |

**Constraint:** `UNIQUE(institution_id, academic_year_id, name)` — no duplicate class names within an academic year.

### 3.7 Batch

| Column          | Type        | Constraints            | Notes                             |
|-----------------|-------------|------------------------|-----------------------------------|
| `id`            | UUID        | PK                     |                                   |
| `name`          | VARCHAR     | NOT NULL               | e.g., "Batch A"                   |
| `class_id`      | UUID        | FK → Class, NOT NULL   |                                   |
| `schedule_days` | VARCHAR     |                        | e.g., "Mon,Thu"                   |
| `status`        | ENUM        | NOT NULL, DEFAULT `active` | `active`, `completed`, `archived` |
| `institution_id`| UUID        | FK, NOT NULL           |                                   |
| `created_at`    | TIMESTAMPTZ | NOT NULL               |                                   |
| `updated_at`    | TIMESTAMPTZ | NOT NULL               |                                   |

**Constraint:** `UNIQUE(class_id, name)` — no duplicate batch names within a class.

### 3.8 StudentBatch (Junction — Enrollment History)

| Column          | Type        | Constraints                       | Notes                                |
|-----------------|-------------|-----------------------------------|--------------------------------------|
| `id`            | UUID        | PK                                |                                      |
| `student_id`    | UUID        | FK → Student, NOT NULL            |                                      |
| `batch_id`      | UUID        | FK → Batch, NOT NULL              |                                      |
| `class_id`      | UUID        | FK → Class, NOT NULL              | Denormalized for historical tracking |
| `enrolled_date` | DATE        | NOT NULL                          |                                      |
| `removed_date`  | DATE        |                                   | NULL = currently enrolled            |
| `status`        | ENUM        | NOT NULL, DEFAULT `active`        | `active`, `transferred`, `withdrawn` |
| `institution_id`| UUID        | FK, NOT NULL                      |                                      |

**Key rule:** Transferring a student sets the old record's `status = transferred` and `removed_date = today`, then creates a new `active` record. This preserves complete enrollment history.

**Index:** `INDEX(student_id, status)` — find current enrollment quickly.

### 3.9 TeacherBatch (Junction)

| Column          | Type   | Constraints                | Notes              |
|-----------------|--------|----------------------------|---------------------|
| `id`            | UUID   | PK                         |                     |
| `teacher_id`    | UUID   | FK → Teacher, NOT NULL     |                     |
| `batch_id`      | UUID   | FK → Batch, NOT NULL       |                     |
| `assigned_date` | DATE   | NOT NULL                   |                     |
| `removed_date`  | DATE   |                            | NULL = still active |
| `institution_id`| UUID   | FK, NOT NULL               |                     |

**Constraint:** `UNIQUE(teacher_id, batch_id) WHERE removed_date IS NULL` — one active assignment per teacher-batch pair.

### 3.10 Session

| Column          | Type        | Constraints             | Notes                                 |
|-----------------|-------------|-------------------------|---------------------------------------|
| `id`            | UUID        | PK                      |                                       |
| `batch_id`      | UUID        | FK → Batch, NOT NULL    |                                       |
| `session_date`  | DATE        | NOT NULL                |                                       |
| `session_number`| INT         | NOT NULL                | Within the week (1 or 2)              |
| `status`        | ENUM        | NOT NULL, DEFAULT `scheduled` | `scheduled`, `completed`, `cancelled` |
| `institution_id`| UUID        | FK, NOT NULL            |                                       |
| `created_at`    | TIMESTAMPTZ | NOT NULL                |                                       |
| `updated_at`    | TIMESTAMPTZ | NOT NULL                |                                       |

**Constraint:** `UNIQUE(batch_id, session_date, session_number)` — no duplicate sessions.

Sessions are auto-generated from the batch's `schedule_days` configuration, with manual override for holidays/cancellations.

### 3.11 Attendance

| Column          | Type        | Constraints                    | Notes                            |
|-----------------|-------------|--------------------------------|----------------------------------|
| `id`            | UUID        | PK                             |                                  |
| `student_id`    | UUID        | FK → Student, NOT NULL         |                                  |
| `session_id`    | UUID        | FK → Session, NOT NULL         |                                  |
| `status`        | ENUM        | NOT NULL                       | `present`, `absent`, `late`, `excused` |
| `recorded_by`   | UUID        | FK → User, NOT NULL            |                                  |
| `sync_source`   | VARCHAR     |                                | `flutter`                        |
| `recorded_at`   | TIMESTAMPTZ | NOT NULL                       |                                  |
| `institution_id`| UUID        | FK, NOT NULL                   |                                  |

**Constraint:** `UNIQUE(student_id, session_id)` — **no duplicate attendance**. This is the primary idempotency guarantee for offline sync.

**Conflict resolution:** On sync conflict (same student + session, different values from two sources), server timestamp wins. The losing write is logged to `AuditLog` with `is_conflict = true`.

### 3.12 Olympiad

| Column            | Type        | Constraints                   | Notes                     |
|-------------------|-------------|-------------------------------|---------------------------|
| `id`              | UUID        | PK                            |                           |
| `name`            | VARCHAR     | NOT NULL                      |                           |
| `description`     | TEXT        |                               |                           |
| `olympiad_date`   | DATE        |                               |                           |
| `academic_year_id`| UUID        | FK → AcademicYear, NOT NULL   |                           |
| `status`          | ENUM        | NOT NULL, DEFAULT `draft`     | `draft`, `scheduled`, `in_progress`, `completed` |
| `institution_id`  | UUID        | FK, NOT NULL                  |                           |
| `created_at`      | TIMESTAMPTZ | NOT NULL                      |                           |
| `updated_at`      | TIMESTAMPTZ | NOT NULL                      |                           |

### 3.13 OlympiadPaper

| Column          | Type        | Constraints                          | Notes                            |
|-----------------|-------------|--------------------------------------|----------------------------------|
| `id`            | UUID        | PK                                   |                                  |
| `olympiad_id`   | UUID        | FK → Olympiad, NOT NULL              |                                  |
| `class_id`      | UUID        | FK → Class, NOT NULL                 |                                  |
| `version`       | INT         | NOT NULL, DEFAULT 1                  | Incremented on new version       |
| `total_marks`   | INT         | NOT NULL                             | Computed from sections/questions  |
| `locked_at`     | TIMESTAMPTZ |                                      | Set when results are published   |
| `institution_id`| UUID        | FK, NOT NULL                         |                                  |
| `created_at`    | TIMESTAMPTZ | NOT NULL                             |                                  |
| `updated_at`    | TIMESTAMPTZ | NOT NULL                             |                                  |

**Immutability rule:** Once `locked_at` is set (triggered by any linked `AssessmentResult` reaching `published` status), the paper and all its sections/questions/answer-keys are frozen. Any further modification requires creating a new version (new `OlympiadPaper` row with incremented `version`).

**Constraint:** `UNIQUE(olympiad_id, class_id, version)`

### 3.14 Section

| Column                       | Type   | Constraints             | Notes                   |
|------------------------------|--------|-------------------------|-------------------------|
| `id`                         | UUID   | PK                      |                         |
| `paper_id`                   | UUID   | FK → OlympiadPaper, NOT NULL |                    |
| `name`                       | VARCHAR| NOT NULL                | e.g., "Section A"      |
| `sort_order`                 | INT    | NOT NULL                |                         |
| `marks_per_question`         | INT    | NOT NULL                |                         |
| `negative_marks_per_question`| INT    | NOT NULL, DEFAULT 0     |                         |
| `institution_id`             | UUID   | FK, NOT NULL            |                         |
| `created_at`                 | TIMESTAMPTZ | NOT NULL           |                         |
| `updated_at`                 | TIMESTAMPTZ | NOT NULL           |                         |

### 3.15 Question

| Column          | Type   | Constraints                 | Notes                            |
|-----------------|--------|-----------------------------|----------------------------------|
| `id`            | UUID   | PK                          |                                  |
| `section_id`    | UUID   | FK → Section, NOT NULL      |                                  |
| `question_number`| INT   | NOT NULL                    | Display order within section     |
| `question_text` | TEXT   |                             | Optional for OMR-only papers     |
| `marks`         | INT    | NOT NULL                    | Points for correct answer        |
| `negative_marks`| INT    | NOT NULL, DEFAULT 0         | Points deducted for wrong answer |
| `num_options`   | INT    | NOT NULL, DEFAULT 4         |                                  |
| `institution_id`| UUID   | FK, NOT NULL                |                                  |
| `created_at`    | TIMESTAMPTZ | NOT NULL               |                                  |
| `updated_at`    | TIMESTAMPTZ | NOT NULL               |                                  |

**Constraint:** `UNIQUE(section_id, question_number)`

### 3.16 QuestionOption

| Column       | Type    | Constraints                 | Notes              |
|--------------|---------|-----------------------------|---------------------|
| `id`         | UUID    | PK                          |                     |
| `question_id`| UUID    | FK → Question, NOT NULL     |                     |
| `label`      | CHAR(1) | NOT NULL                    | 'A', 'B', 'C', 'D' |
| `option_text`| TEXT    |                             |                     |
| `sort_order` | INT     | NOT NULL                    |                     |

**Constraint:** `UNIQUE(question_id, label)`

### 3.17 AnswerKey

| Column          | Type        | Constraints                    | Notes                         |
|-----------------|-------------|--------------------------------|-------------------------------|
| `id`            | UUID        | PK                             |                               |
| `paper_id`      | UUID        | FK → OlympiadPaper, NOT NULL   |                               |
| `version`       | INT         | NOT NULL, DEFAULT 1            |                               |
| `locked_at`     | TIMESTAMPTZ |                                | Locked when results published |
| `created_by`    | UUID        | FK → User, NOT NULL            |                               |
| `institution_id`| UUID        | FK, NOT NULL                   |                               |
| `created_at`    | TIMESTAMPTZ | NOT NULL                       |                               |
| `updated_at`    | TIMESTAMPTZ | NOT NULL                       |                               |

**Constraint:** `UNIQUE(paper_id, version)`

### 3.18 AnswerKeyEntry

| Column          | Type    | Constraints                   | Notes              |
|-----------------|---------|-------------------------------|---------------------|
| `id`            | UUID    | PK                            |                     |
| `answer_key_id` | UUID    | FK → AnswerKey, NOT NULL      |                     |
| `question_id`   | UUID    | FK → Question, NOT NULL       |                     |
| `correct_option`| CHAR(1) | NOT NULL                      | 'A', 'B', 'C', 'D' |

**Constraint:** `UNIQUE(answer_key_id, question_id)`

### 3.19 StudentAnswer

| Column          | Type        | Constraints                 | Notes                              |
|-----------------|-------------|-----------------------------|------------------------------------|
| `id`            | UUID        | PK                          |                                    |
| `student_id`    | UUID        | FK → Student, NOT NULL      |                                    |
| `question_id`   | UUID        | FK → Question, NOT NULL     |                                    |
| `paper_id`      | UUID        | FK → OlympiadPaper, NOT NULL|                                    |
| `olympiad_id`   | UUID        | FK → Olympiad, NOT NULL     |                                    |
| `selected_option`| CHAR(1)    |                             | NULL = unanswered                  |
| `entry_method`  | ENUM        | NOT NULL                    | `manual`, `omr`                    |
| `entered_by`    | UUID        | FK → User, NOT NULL         |                                    |
| `institution_id`| UUID        | FK, NOT NULL                |                                    |
| `created_at`    | TIMESTAMPTZ | NOT NULL                    |                                    |
| `updated_at`    | TIMESTAMPTZ | NOT NULL                    |                                    |

**Constraint:** `UNIQUE(student_id, question_id, paper_id)` — one answer per student per question per paper.

### 3.20 OMRSubmission

| Column              | Type        | Constraints                 | Notes                              |
|---------------------|-------------|-----------------------------|------------------------------------|
| `id`                | UUID        | PK                          |                                    |
| `batch_id`          | UUID        | FK → Batch, NOT NULL        |                                    |
| `paper_id`          | UUID        | FK → OlympiadPaper, NOT NULL|                                    |
| `uploaded_by`       | UUID        | FK → User, NOT NULL         |                                    |
| `image_storage_key` | VARCHAR     | NOT NULL                    | Supabase Storage key (not a path)  |
| `status`            | ENUM        | NOT NULL, DEFAULT `pending` | `pending`, `processing`, `needs_review`, `completed`, `failed` |
| `job_id`            | VARCHAR     |                             | External worker job ID             |
| `extracted_answers` | JSONB       |                             | Raw OMR output before review       |
| `error_message`     | TEXT        |                             |                                    |
| `institution_id`    | UUID        | FK, NOT NULL                |                                    |
| `created_at`        | TIMESTAMPTZ | NOT NULL                    |                                    |
| `updated_at`        | TIMESTAMPTZ | NOT NULL                    |                                    |

**Index:** `INDEX(status)` — for polling pending/processing jobs.

### 3.21 AssessmentResult

| Column                  | Type        | Constraints                    | Notes                                |
|-------------------------|-------------|--------------------------------|--------------------------------------|
| `id`                    | UUID        | PK                             |                                      |
| `student_id`            | UUID        | FK → Student, NOT NULL         |                                      |
| `olympiad_id`           | UUID        | FK → Olympiad, NOT NULL        |                                      |
| `paper_id`              | UUID        | FK → OlympiadPaper, NOT NULL   |                                      |
| `answer_key_id`         | UUID        | FK → AnswerKey, NOT NULL       |                                      |
| `paper_version`         | INT         | NOT NULL                       | Snapshot of paper version used       |
| `class_at_time_of_exam` | UUID        | FK → Class, NOT NULL           | **Snapshot — immutable after publish** |
| `batch_at_time_of_exam` | UUID        | FK → Batch, NOT NULL           | **Snapshot — immutable after publish** |
| `total_score`           | INT         | NOT NULL                       |                                      |
| `max_possible_score`    | INT         | NOT NULL                       |                                      |
| `percentage`            | DECIMAL(5,2)| NOT NULL                       |                                      |
| `section_scores`        | JSONB       | NOT NULL                       | `[{"section_id": "...", "score": 12, "max": 20}]` |
| `correct_count`         | INT         | NOT NULL                       |                                      |
| `incorrect_count`       | INT         | NOT NULL                       |                                      |
| `unanswered_count`      | INT         | NOT NULL                       |                                      |
| `status`                | ENUM        | NOT NULL, DEFAULT `draft`      | `draft`, `reviewed`, `published`     |
| `published_at`          | TIMESTAMPTZ |                                |                                      |
| `published_by`          | UUID        | FK → User                     |                                      |
| `institution_id`        | UUID        | FK, NOT NULL                   |                                      |
| `created_at`            | TIMESTAMPTZ | NOT NULL                       |                                      |
| `updated_at`            | TIMESTAMPTZ | NOT NULL                       |                                      |

**Constraint:** `UNIQUE(student_id, olympiad_id, paper_id)` — one result per student per paper.

**Key rule:** `class_at_time_of_exam` and `batch_at_time_of_exam` are set at result creation and never updated — even if the student transfers later. This guarantees historical results remain accurate per context audit item #4.

### 3.22 Ranking

| Column                | Type        | Constraints                       | Notes                        |
|-----------------------|-------------|-----------------------------------|------------------------------|
| `id`                  | UUID        | PK                                |                              |
| `assessment_result_id`| UUID        | FK → AssessmentResult, NOT NULL   |                              |
| `olympiad_id`         | UUID        | FK → Olympiad, NOT NULL           |                              |
| `class_id`            | UUID        | FK → Class, NOT NULL              |                              |
| `rank`                | INT         | NOT NULL                          |                              |
| `rank_scope`          | ENUM        | NOT NULL                          | `class`, `cross_class`       |
| `percentile`          | DECIMAL(5,2)|                                   |                              |
| `institution_id`      | UUID        | FK, NOT NULL                      |                              |
| `created_at`          | TIMESTAMPTZ | NOT NULL                          |                              |

**Ranking algorithm:** Standard competition ranking (1-2-2-4). Cross-class ranking uses percentage, not raw score. Tie-breaking: total percentage → section percentages in section order → same rank if still tied.

### 3.23 Topic & Syllabus

Used for categorizing questions and mapping performance to topic areas.

### 3.24 Award & Certificate

See ER diagram above. Awards are defined per olympiad with criteria (min rank or min percentage). Certificates are generated PDFs stored in Supabase Storage.

### 3.25 CustomField & CustomFieldValue

- Custom fields are **soft-deleted** (`deleted_at`), never hard-deleted.
- Type changes create a new field; the old field is deprecated.
- This preserves historical `CustomFieldValue` records for withdrawn/past students per context audit item #15.

### 3.26 AuditLog

Append-only. Never editable, never deletable.

| Field         | Notes                                                         |
|---------------|---------------------------------------------------------------|
| `is_conflict` | `true` when this log entry records an offline sync conflict    |
| `before_value`| JSONB snapshot of the entity before the change                |
| `after_value` | JSONB snapshot of the entity after the change                 |

**Index:** `INDEX(entity_type, entity_id)`, `INDEX(user_id)`, `INDEX(created_at)`, `INDEX(is_conflict) WHERE is_conflict = true`

---

## 4. Important Rules Summary

### 4.1 No Duplicate Attendance
`UNIQUE(student_id, session_id)` on `Attendance`. Offline sync uses upsert with server-timestamp-wins conflict resolution.

### 4.2 Historical Class/Batch Assignments
`StudentBatch` is an append-only history table. Transfers mark old records as `transferred` with `removed_date` and create new `active` records. Never update in place.

### 4.3 Versioned Papers and Answer Keys
`OlympiadPaper.version` and `AnswerKey.version` increment on new versions. `locked_at` is set when any linked result is published. Locked records cannot be modified.

### 4.4 Published Result Snapshots
`AssessmentResult` stores `class_at_time_of_exam`, `batch_at_time_of_exam`, and `paper_version` as immutable snapshots. Student transfers or paper edits after publication do not affect historical results.

### 4.5 Public IDs Separate from Internal IDs
`User.public_id`, `Student.public_id`, `Teacher.public_id` are non-sequential, human-readable identifiers used in URLs, printed materials, and API responses. Internal UUIDs are used for joins and foreign keys only.

### 4.6 Negative Marking Support
`Question.negative_marks` (default 0). Scoring formula: `Σ(correct × marks) − Σ(incorrect × negative_marks)`. Total score can be negative in theory; rankings handle this correctly.

### 4.7 Multi-Tenancy Readiness
Every entity has `institution_id`. v1 uses a single institution value. All queries should include `institution_id` in WHERE clauses to ensure seamless multi-tenancy migration.

---

## 5. Index Recommendations

| Table              | Index                                                    | Purpose                           |
|--------------------|----------------------------------------------------------|-----------------------------------|
| `User`             | `UNIQUE(email)`                                          | Login lookup                      |
| `User`             | `UNIQUE(public_id)`                                      | API/display lookup                |
| `Student`          | `INDEX(institution_id, status)`                          | Active student listings           |
| `Student`          | `INDEX(full_name)`                                       | Search                            |
| `StudentBatch`     | `INDEX(student_id, status)`                              | Current enrollment                |
| `StudentBatch`     | `INDEX(batch_id, status)`                                | Batch roster                      |
| `Attendance`       | `UNIQUE(student_id, session_id)`                         | Dedup guarantee                   |
| `Attendance`       | `INDEX(session_id)`                                      | Session attendance list           |
| `Session`          | `UNIQUE(batch_id, session_date, session_number)`         | Dedup guarantee                   |
| `OlympiadPaper`    | `UNIQUE(olympiad_id, class_id, version)`                 | Version lookup                    |
| `Question`         | `UNIQUE(section_id, question_number)`                    | Ordering guarantee                |
| `AnswerKey`        | `UNIQUE(paper_id, version)`                              | Version lookup                    |
| `AnswerKeyEntry`   | `UNIQUE(answer_key_id, question_id)`                     | One answer per question per key   |
| `StudentAnswer`    | `UNIQUE(student_id, question_id, paper_id)`              | One answer per student per Q      |
| `AssessmentResult` | `UNIQUE(student_id, olympiad_id, paper_id)`              | One result per student per paper  |
| `AssessmentResult` | `INDEX(olympiad_id, status)`                             | Result listing/publishing         |
| `OMRSubmission`    | `INDEX(status)`                                          | Job polling                       |
| `AuditLog`         | `INDEX(entity_type, entity_id)`                          | Entity history lookup             |
| `AuditLog`         | `INDEX(created_at)`                                      | Time-range queries                |

---

*Cross-references: [requirements.md](requirements.md) · [architecture-api.md](architecture-api.md) · [security-testing-deployment.md](security-testing-deployment.md)*
