# JMO Management System — Requirements

> Combined Product Requirements Document (PRD) and Software Requirements Specification (SRS).
> Source of truth: [context.md](context.md) | Divergence Log: [audit-notes.md](audit-notes.md)

---

## 1. Project Overview

The Junior Mathematics Olympiad (JMO) Management System is a comprehensive management platform designed for mathematics coaching institutions and olympiad organizers. It centralizes student and teacher administration, batch scheduling, offline-first attendance tracking, academic examinations, olympiad paper setup, answer key versioning, manual and OMR-based evaluation, automated multi-tier scoring and section-based ranking, learning material distribution, and notifications.

The system serves a single institution (with multi-tenancy readiness via `institution_id`) across two client platforms:
1. **React + Vite Web Application**: Primary portal for Admins, Teachers, and Students.
2. **Flutter Android Mobile Application**: Field app for Teachers (attendance, manual scoring, mobile OMR camera capture).

Both client platforms interact with a centralized **FastAPI (Python 3.14)** REST API server backed by **PostgreSQL** and an **async OMR worker service**.

### 1.1 Key Facts

| Attribute           | Value                                                      |
|---------------------|------------------------------------------------------------|
| Web frontend        | React + Vite SPA (TypeScript)                              |
| Mobile frontend     | Flutter (Android field app)                                |
| Backend API         | FastAPI (Python 3.14 + SQLAlchemy asyncpg)                 |
| Database            | PostgreSQL (via Supabase / Docker)                         |
| Object storage      | Supabase Storage / Local S3-compatible                     |
| Hosting (frontend)  | Vercel / Netlify / Static Web Server                       |
| Hosting (backend)   | Railway / Fly.io / Docker / Render (always-on service)     |
| OMR processing      | Async worker process (OpenCV + Celery/Redis)              |
| Auth (web)          | Argon2id hashing + HTTP-only, Secure, SameSite Cookie      |
| Auth (Android)      | Access JWT + Refresh Token                                 |

---

## 2. Platform Goals

1. **Centralize Student and Teacher Administration**: Maintain a single, immutable system of record for enrollment, batch assignments, custom fields, and system login credentials.
2. **Streamline Olympiad & Examination Workflow**: Support complex paper creation (sections, MCQs, custom mark/penalty allocations), answer key versioning, and dual-mode (manual + OMR) evaluation.
3. **Deterministic & Auditable Scoring**: Auto-score papers, enforce strict section-level tie-breaking rules, preserve result snapshots, and prevent mutation of published results.
4. **Offline-Capable Field App**: Enable teachers to record attendance offline on mobile devices, with conflict resolution governed by server timestamps and audit logging.
5. **Role-Based Login & Credentials**: Provide secure logins for Admins, Teachers, and Students, supporting auto-generated initial passwords and credentials management upon entity creation.
6. **Academic Resource & Notification Distribution**: Publish subjects, learning materials, recommended books, and targeted system notifications to students and teachers.

---

## 3. Users, Roles & Credentials

### 3.1 Roles

| Role | Target Users | Description & Privileges |
|------|--------------|--------------------------|
| **Admin** | System administrators, institute directors | Full system access. Creates teacher and student accounts, assigns batches, manages classes/subjects/olympiads, publishes results, configures custom fields, and views audit logs. |
| **Teacher** (Facilitator) | Instructors, evaluators, proctors | Batch-scoped access. Marks attendance (web/Android), enters manual student answers, performs OMR scanning/review, uploads learning materials, and views analytics for assigned batches. |
| **Student** | Enrolled candidates | Student portal access. Views enrolled subjects/batches, attendance history, published olympiad/exam results, rank cards, certificates, learning materials, and books. |

### 3.2 Account Provisioning & Password Generation

When creating a new Teacher or Student entity, the system supports dual provisioning modes:

1. **Auto-Generated Password Credentials**:
   - System automatically generates a secure, randomized password (e.g., 8-character alphanumeric string) during entity creation.
   - The generated password and public ID are displayed to the Admin and optionally sent via email.
   - The user can log in immediately with their email/username and generated password.
2. **Invite Link / Activation Email**:
   - Account is created in `invited` status.
   - An activation email containing a time-limited token link is sent to set a custom password.

### 3.3 Account Lifecycle

| State      | Description                                                        |
|------------|--------------------------------------------------------------------|
| `invited`  | Account created; activation link pending; password not finalized. |
| `active`   | User activated account; can log in and access authorized features. |
| `disabled` | Admin deactivated account; login blocked; historical data preserved. |

> [!NOTE]
> Accounts are soft-disabled rather than hard-deleted to preserve historical audit trails, attendance logs, and examination records.

---

## 4. Functional Requirements

### 4.1 Student Management

| ID     | Requirement |
|--------|-------------|
| STU-01 | Create student profile with: name, DOB, gender, photo, guardian details, contact info, email. |
| STU-02 | Auto-generate initial student login password during creation (or generate login credentials on demand). |
| STU-03 | Assign student to an academic class and one or more active batches. |
| STU-04 | Track class/batch transfer history without overwriting historical records. |
| STU-05 | Soft-withdraw student (retaining past attendance, submission, and result records). |
| STU-06 | Assign non-sequential system-wide `public_id` (e.g. `STU-98234`) upon registration. |
| STU-07 | Define and store Admin-configured custom fields per student (text, number, date, select). |
| STU-08 | Bulk import students via CSV/Excel template with auto-login generation. |
| STU-09 | Export student rosters and profile summaries (PDF, CSV, Excel). |
| STU-10 | Student Portal access allowing candidates to log in and view personal records. |

### 4.2 Teacher Management

| ID     | Requirement |
|--------|-------------|
| TCH-01 | Register teacher with: full name, email, phone, bio/designation, status. |
| TCH-02 | Auto-generate teacher login password on creation or send activation email. |
| TCH-03 | Assign teacher to manage one or multiple batches across subjects. |
| TCH-04 | Assign unique non-sequential `public_id` (e.g. `TCH-41029`) to each teacher. |
| TCH-05 | Soft-deactivate teacher accounts to revoke access while keeping historical records intact. |
| TCH-06 | Allow teachers to update their profile details and change login password. |

### 4.3 Academic Structure (Classes, Batches, Subjects)

| ID     | Requirement |
|--------|-------------|
| CLS-01 | Manage Academic Classes (e.g., Grade 7, Grade 8, Advanced Olympiad). |
| CLS-02 | Scope classes and batches to an active Academic Year. |
| BAT-01 | Create Batches under classes (e.g., Batch Alpha, Weekend Batch). |
| BAT-02 | Configure weekly schedule per batch (e.g. Mon/Wed/Fri 4:00 PM). |
| BAT-03 | Batch status transitions: `active` → `completed` → `archived`. |
| SUB-01 | Manage Subjects (e.g., Algebra, Combinatorics, Geometry, Number Theory). |
| SUB-02 | Link subjects to classes, learning materials, and examination modules. |

### 4.4 Attendance Management

| ID     | Requirement |
|--------|-------------|
| ATT-01 | Auto-generate attendance sessions based on batch weekly schedules. |
| ATT-02 | Support manual session creation and override for holiday/extra classes. |
| ATT-03 | Mark student attendance per session: `Present`, `Absent`, `Late`, `Excused`. |
| ATT-04 | Record attendance via React Web or Flutter Android field app. |
| ATT-05 | Offline attendance capture on Android: store locally in SQLite/Hive, queue sync operations. |
| ATT-06 | Deterministic offline sync conflict resolution: latest server timestamp wins; losing write logged to `AuditLog`. |
| ATT-07 | Generate attendance reports and calculate attendance percentage per student/batch. |

### 4.5 Olympiads & Examinations

| ID     | Requirement |
|--------|-------------|
| OLY-01 | Create Olympiads and Examinations with: title, description, date, academic year, target classes. |
| OLY-02 | Link paper definitions per target class (different classes can have distinct papers/max marks). |
| OLY-03 | Olympiad lifecycle states: `draft` → `scheduled` → `in_progress` → `completed` → `evaluated` → `published`. |
| OLY-04 | Configure scoring parameters: total marks, pass threshold, section weightages, tie-breaking sequence. |

### 4.6 Papers, Sections, and Questions

| ID     | Requirement |
|--------|-------------|
| PAP-01 | Paper contains one or more sections (e.g., Section A - Basic, Section B - Advanced). |
| PAP-02 | Each section contains multiple Multiple-Choice Questions (MCQs) or numerical answer questions. |
| PAP-03 | Question schema: text, image attachments, options (A, B, C, D), correct option, positive marks, negative marks. |
| PAP-04 | Support section-level custom weightage and tie-breaking priority. |
| PAP-05 | Paper immutability: papers and answer keys become **locked** (`locked_at`) once linked results are Published. |
| PAP-06 | Modifying a paper/answer key after publication creates a new paper version (`version = v2`). |

### 4.7 Answer Keys & Versioning

| ID     | Requirement |
|--------|-------------|
| ANS-01 | Define canonical answer key mapping question ID → correct answer. |
| ANS-02 | Track answer key versioning (`version`, `created_by`, `locked_at`). |
| ANS-03 | Preserve full version history for re-evaluation and regrading audits. |

### 4.8 Evaluation & OMR Processing

| ID     | Requirement |
|--------|-------------|
| EVA-01 | Manual evaluation mode: Teachers/Admins enter student answers question-by-question or grid-by-grid. |
| EVA-02 | OMR scanning mode: Capture sheet image via Android camera or upload image batch via Web. |
| EVA-03 | Async OMR processing: Image queued → OpenCV worker processes sheet → extracts answers & confidence score. |
| EVA-04 | OMR verification UI: Review low-confidence misreads, flag anomalies, and confirm final student response matrix. |
| EVA-05 | Automated re-scoring triggered upon answer key version change. |

### 4.9 Automated Scoring, Tie-Breaking & Rankings

| ID     | Requirement |
|--------|-------------|
| SCO-01 | Compute total score = sum(correct marks) - sum(negative marks). |
| SCO-02 | Enforce multi-tier tie-breaking rules:
  1. Higher total marks
  2. Higher marks in higher-priority sections (e.g. Section B > Section A)
  3. Lower number of incorrect answers
  4. Alphabetical by student name / public ID |
| SCO-03 | Generate ranks (Overall, Class-wise, Batch-wise). |
| SCO-04 | Publish results: generate result snapshot, lock underlying paper/answer key. |

### 4.10 Learning Materials & Recommended Books

| ID     | Requirement |
|--------|-------------|
| MAT-01 | Upload and categorize Learning Materials (PDF notes, worksheets, problem sets) by Subject and Class. |
| MAT-02 | Assign visibility to specific batches or classes. |
| BOK-01 | Maintain Recommended Books directory (title, author, cover image, link, description, subject). |
| BOK-02 | Students and teachers browse and download assigned materials and book lists. |

### 4.11 Notification System

| ID     | Requirement |
|--------|-------------|
| NOT-01 | Send system notifications (announcements, result publications, schedule updates). |
| NOT-02 | Target notifications by role (`all`, `teachers`, `students`, `batch_id`). |
| NOT-03 | Display unread notification count badge in Web and Mobile navigation. |

---

## 5. Non-Functional Requirements

### 5.1 Performance & Scalability
- **API Response Time**: P95 response time under 150ms for standard CRUD queries.
- **OMR Processing**: OMR sheet scan and bubble extraction completed within 3 seconds per image.
- **Concurrent Users**: Support 500 simultaneous web sessions and 100 mobile sync streams.

### 5.2 Security & Data Protection
- **Password Security**: Argon2id hashing algorithm with standard salt/cost parameters.
- **Session Management**: HTTP-only, Secure, SameSite=Strict cookies for Web SPA; JWT access/refresh pairs for Flutter Android.
- **Authorization**: Strict server-side RBAC checks on every route.
- **Audit Logging**: Record sensitive mutations (user creation, password reset, score overrides, result publication) in `AuditLog` with before/after payloads.

### 5.3 Reliability & Offline Resilience
- **Offline Storage**: Mobile SQLite store with idempotent sync endpoint (`POST /api/v1/sync/attendance`).
- **Data Integrity**: Soft-deletes for all primary entities (`is_deleted` or `status='disabled'`).

---

## 6. Document Cross-References

- Architectural Divergences: [audit-notes.md](audit-notes.md)
- Complete Database Schema: [database-design.md](database-design.md)
- REST API & System Architecture: [architecture-api.md](architecture-api.md)
- Design Guidelines & Mockups: [ui-ux-design.md](ui-ux-design.md)
- Infrastructure & Deployment: [security-testing-deployment.md](security-testing-deployment.md)
