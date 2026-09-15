# JMO Management System — Requirements

> Combined Product Requirements Document (PRD) and Software Requirements Specification (SRS).
> Source of truth: [context.md](context.md)

---

## 1. Project Overview

The Junior Mathematics Olympiad (JMO) Management System is a Flutter application for managing students, teachers, classes, batches, attendance, olympiad assessments, OMR-based and manual evaluation, results, rankings, awards, and reporting for a mathematics coaching institution.

The system serves a single institution (with multi-tenancy readiness via `institution_id`) and uses one Flutter client consuming the same FastAPI backend. Android is the v1 release target; the client architecture remains portable to other Flutter platforms.

### 1.1 Key Facts

| Attribute           | Value                                                      |
|---------------------|------------------------------------------------------------|
| Client              | Flutter (Android-first, v1)                                |
| Backend             | FastAPI (Python)                                           |
| Database            | PostgreSQL via Supabase                                    |
| Object storage      | Supabase Storage                                           |
| Client distribution | Android build/release pipeline                             |
| Hosting (backend)   | Railway / Fly.io / Render (always-on)                      |
| OMR processing      | Async worker on a separate always-on service               |
| Auth                | Short-lived access token + refresh token (JWT)             |

> [!IMPORTANT]
> The FastAPI backend and OMR worker run on an always-on service (Railway/Fly.io/Render). Flutter is a compiled client and must never contain backend-only secrets. This keeps OMR processing, background jobs, and database access on the server.

---

## 2. Goals

1. **Centralize student and teacher management** — single system of record for enrollment, class/batch assignments, contact info, and custom fields.
2. **Streamline olympiad assessment** — paper creation, answer-key versioning, manual and OMR-based evaluation, automated scoring.
3. **Produce accurate, auditable results** — ranking with defined tie-breaking, historical snapshot preservation, immutable published results.
4. **Support offline-capable attendance** — Flutter records attendance offline, syncs without duplicates, and resolves conflicts deterministically.
5. **Enforce data integrity and security** — RBAC, audit logging, bearer-token validation, no silent data mutation after publication.
6. **Provide actionable reporting** — student performance analytics, batch reports, exports (PDF/Excel), awards and certificates.

---

## 3. Users and Roles

### 3.1 Admin

Full system control. Single admin account (or a small number). Capabilities:

- Create, edit, deactivate teacher accounts (sole authority — no self-registration)
- Manage classes, batches, academic years
- Create and configure olympiads, papers, sections, questions, answer keys
- Publish/unpublish results
- View all data across all batches
- Manage custom fields
- Access audit logs
- Generate reports and exports
- Manage system settings

### 3.2 Teacher

Scoped to assigned batches. Capabilities:

- View assigned batches and their students
- Record and edit attendance in Flutter
- Enter student answers manually
- Perform OMR scanning and review using the Flutter camera flow
- View results and rankings for assigned batches
- View student performance analytics
- Cannot create other accounts, manage classes/batches structure, or publish results

### 3.3 Account Lifecycle

| State      | Description                                                        |
|------------|--------------------------------------------------------------------|
| `invited`  | Admin created the account; activation email sent; password not set  |
| `active`   | Teacher activated via time-limited link; can log in normally        |
| `disabled` | Admin deactivated; cannot log in; historical records preserved      |

- No hard-delete of user accounts. Deactivation only.
- Self-service password reset via emailed time-limited token.

> **Assumption (RBAC Option A):** v1 uses two fixed roles (`admin`, `teacher`) enforced server-side via a `role` enum on `User`. No dynamic `Role`/`Permission` entities. "Manage permissions" is deferred to a future version.

---

## 4. Functional Requirements

### 4.1 Student Management

| ID     | Requirement                                                                                   |
|--------|-----------------------------------------------------------------------------------------------|
| STU-01 | Register a student with: name, date of birth, gender, photo, guardian info, contact details    |
| STU-02 | Assign student to one class and one or more batches                                           |
| STU-03 | Transfer student between classes/batches; historical assignments preserved                     |
| STU-04 | Withdraw a student (soft-delete); withdrawn students retain all historical data               |
| STU-05 | Search and filter students by name, class, batch, enrollment status                           |
| STU-06 | Bulk import students via CSV/Excel                                                            |
| STU-07 | Export student lists (PDF, Excel)                                                             |
| STU-08 | Each student has a system-generated `public_id` (non-sequential), separate from internal PK   |
| STU-09 | Support Admin-defined custom fields per student (text, number, date, dropdown)                 |
| STU-10 | View student profile with personal info, enrollment history, attendance, results, performance  |

### 4.2 Teacher Management

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| TCH-01 | Admin creates teacher account (name, email only); system sends activation email           |
| TCH-02 | Teacher activates via time-limited link, sets own password                                |
| TCH-03 | Assign teacher to one or more batches                                                    |
| TCH-04 | Deactivate teacher (soft-disable); historical records preserved                          |
| TCH-05 | Each teacher has a system-generated `public_id`, separate from internal PK               |
| TCH-06 | Self-service password reset via emailed link                                             |

### 4.3 Classes and Batches

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| CLS-01 | Admin creates classes (e.g., Class 1, Class 2, Class 3)                                  |
| CLS-02 | Each class belongs to an academic year                                                   |
| CLS-03 | Admin creates batches within classes (e.g., Class 1 — Batch A, Batch B)                  |
| BAT-01 | Each batch has a weekly schedule (default: 2 sessions/week)                               |
| BAT-02 | Assign students to batches; track enrollment date                                        |
| BAT-03 | Assign teachers to batches; a teacher can manage multiple batches                        |
| BAT-04 | Batch has a status: `active`, `completed`, `archived`                                    |

### 4.4 Academic Year

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| AY-01  | Admin creates academic years with start and end dates                                    |
| AY-02  | One academic year is active at a time                                                    |
| AY-03  | Classes, batches, olympiads are scoped to an academic year                               |
| AY-04  | Academic year rollover does not delete previous year's data                               |

### 4.5 Attendance

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| ATT-01 | Sessions auto-generated from batch weekly schedule, with manual override for holidays     |
| ATT-02 | Teacher records attendance per student per session: Present, Absent, Late, Excused        |
| ATT-03 | No duplicate attendance records (unique on student + session)                             |
| ATT-04 | Attendance editable after recording, with audit trail                                    |
| ATT-05 | Flutter offline attendance: queued locally, synced when online                             |
| ATT-06 | Offline sync conflict resolution: server timestamp wins; losing offline write logged to AuditLog, flagged for manual review |
| ATT-07 | Attendance statistics: per student, per batch, per session                                |
| ATT-08 | Bulk attendance marking (mark all present, then adjust)                                  |

### 4.6 Olympiads

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| OLY-01 | Admin creates olympiads with name, description, date, academic year                      |
| OLY-02 | Each olympiad targets one or more classes                                                |
| OLY-03 | Each class in an olympiad gets its own paper (different papers can have different max marks)|
| OLY-04 | Olympiad lifecycle: `draft` → `scheduled` → `in_progress` → `completed`                 |

### 4.7 Papers, Sections, and Questions

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| PAP-01 | A paper belongs to an olympiad + class combination                                       |
| PAP-02 | A paper contains one or more sections (e.g., Section A, Section B)                       |
| PAP-03 | Each section has a configurable number of questions and marks-per-question                |
| PAP-04 | Questions are MCQ with configurable number of options (typically 4)                       |
| PAP-05 | Each question has: question text, options, correct answer, marks, optional negative marks |
| PAP-06 | `negative_marks` field per question (default 0) — supports olympiad-style penalty scoring|
| PAP-07 | Papers and questions become **immutable** once any linked result is Published             |
| PAP-08 | Post-publication changes require creating a new paper version, never in-place edit        |
| PAP-09 | Papers have `version` and `locked_at` fields                                             |

### 4.8 Answer Keys and Versioning

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| ANS-01 | Each paper has an answer key mapping question → correct option                           |
| ANS-02 | Answer keys have `version` and `locked_at` fields                                       |
| ANS-03 | Answer keys become immutable once linked results are Published                           |
| ANS-04 | Changing an answer key after publication requires creating a new version                  |
| ANS-05 | Historical answer key versions are preserved, never overwritten                          |

### 4.9 Manual Evaluation

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| MAN-01 | Teacher enters student answers manually per question in Flutter                           |
| MAN-02 | System auto-scores against the answer key                                                |
| MAN-03 | Supports entering answers for individual students or batch-at-a-time                     |
| MAN-04 | Teacher can review and correct entered answers before result publication                 |

### 4.10 OMR Evaluation

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| OMR-01 | Teacher scans OMR sheets via the Flutter camera or selects an existing image              |
| OMR-02 | OMR processing is **asynchronous**: upload → job queued → processing → review             |
| OMR-03 | OMR runs on a **separate always-on worker** (not inside the main API server)             |
| OMR-04 | `OMRSubmission` tracks: `status` (pending/processing/needs_review/completed/failed), `job_id` |
| OMR-05 | Teacher reviews OMR results, corrects misreads, confirms before scoring                  |
| OMR-06 | Bulk OMR upload (entire batch's sheets at once)                                          |
| OMR-07 | OMR images stored in Supabase Storage with key prefix, not local filesystem              |

### 4.11 Results and Result Lifecycle

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| RES-01 | Results calculated from student answers + answer key: total score, section scores         |
| RES-02 | Scoring formula: `correct × marks` + `incorrect × (−negative_marks)` + `unanswered × 0` |
| RES-03 | Result lifecycle: `draft` → `reviewed` → `published`                                    |
| RES-04 | Only Admin can publish results                                                           |
| RES-05 | **Published results are immutable** — cannot be silently changed                         |
| RES-06 | `AssessmentResult` snapshots at time of publication: `class_at_time_of_exam`, `batch_at_time_of_exam`, `paper_version_id` |
| RES-07 | Student class/batch transfers after publication do not affect historical results          |
| RES-08 | Unpublishing requires explicit Admin action with audit log entry                         |

### 4.12 Rankings and Tie-Breaking

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| RNK-01 | Rankings computed per olympiad, per class                                                 |
| RNK-02 | Cross-class ranking uses **percentage** (not raw score) when papers have different max marks |
| RNK-03 | **Standard competition ranking (1-2-2-4):** tied students share the lower rank number; next distinct score skips |
| RNK-04 | Tie-breaking order: total score → section-wise scores (in section order) → same rank if still tied |
| RNK-05 | If classes differ in marks-per-question, tie-breaking operates on normalized (percentage) section scores |
| RNK-06 | Rankings recalculated when results are republished; previous ranking snapshots preserved  |

### 4.13 Student Performance

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| PRF-01 | Per-student performance dashboard: scores across olympiads, trend over time               |
| PRF-02 | Section-wise breakdown per olympiad                                                      |
| PRF-03 | Comparison against batch/class averages                                                  |
| PRF-04 | Attendance correlation                                                                   |
| PRF-05 | Strengths and weaknesses by topic/section                                                |

### 4.14 Awards and Certificates

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| AWD-01 | Admin defines award criteria per olympiad (e.g., top 3, score thresholds)                |
| AWD-02 | System auto-assigns awards based on published rankings                                   |
| AWD-03 | Admin can manually assign/revoke awards                                                  |
| AWD-04 | Generate printable certificates (PDF)                                                    |
| AWD-05 | Certificate includes: student name, olympiad, rank, score, date                          |

### 4.15 Reports and Exports

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| RPT-01 | Batch attendance report (aggregate and per-session)                                      |
| RPT-02 | Olympiad results report per class/batch                                                  |
| RPT-03 | Student progress report across olympiads                                                 |
| RPT-04 | Export formats: PDF, Excel                                                               |
| RPT-05 | Admin can generate all reports; teacher can generate for assigned batches only            |

### 4.16 Audit Logs

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| AUD-01 | All state-changing operations logged: who, what, when, before/after values               |
| AUD-02 | Audit logs are append-only, never editable or deletable                                  |
| AUD-03 | Searchable by entity type, entity ID, user, date range, action type                      |
| AUD-04 | Offline sync conflicts logged with flag for manual review                                |

---

## 5. Non-Functional Requirements

| Category         | Requirement                                                                        |
|------------------|------------------------------------------------------------------------------------|
| Performance      | API responses < 500ms for typical CRUD; < 2s for report generation                 |
| Scalability      | Support up to 5,000 students, 50 teachers, 20 concurrent users                    |
| Availability     | 99.5% uptime target for the API and background worker                              |
| Data integrity   | No silent mutation of published results; referential integrity enforced at DB level |
| Security         | See [security-testing-deployment.md](security-testing-deployment.md) §1            |
| Offline support  | Flutter attendance works offline; syncs on reconnection                            |
| Flutter support  | Flutter 3.16+ with Android 8.0 (API 26) and above                                 |
| Accessibility    | Material accessibility semantics, scalable text, contrast, and touch targets      |
| Data privacy     | Student data (minors): access scoped to assigned teachers + admin; retention policy defined per institution |

---

## 6. Flutter Client Requirements

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| FLT-01 | Login with JWT; refresh token in platform secure storage                                  |
| FLT-02 | Dashboard: assigned batches, quick actions                                               |
| FLT-03 | Attendance: offline-capable with local queue; sync indicator                              |
| FLT-04 | OMR camera: capture OMR sheet, crop, upload for processing                               |
| FLT-05 | OMR review: correct misreads, confirm before scoring                                     |
| FLT-06 | Manual answer entry for individual students                                              |
| FLT-07 | View results and student performance for assigned batches                                 |
| FLT-08 | Push or in-app notifications for sync status and OMR processing completion                |

---

## 7. Flutter Client Requirements (continued)

| ID     | Requirement                                                                              |
|--------|------------------------------------------------------------------------------------------|
| FLT-09 | Login with JWT access and refresh tokens; refresh token stored in platform secure storage |
| FLT-10 | Admin dashboard with system-wide overview                                                |
| FLT-11 | Teacher dashboard scoped to assigned batches                                             |
| FLT-12 | Admin CRUD flows for supported entities                                                  |
| FLT-13 | OMR image capture/selection with processing status                                       |
| FLT-14 | Results review and publication workflow for authorized roles                             |
| FLT-15 | Report generation and file export through API                                             |
| FLT-16 | Adaptive layouts for phone and tablet                                                     |
| FLT-17 | Clear offline, syncing, success, and failure states                                       |

---

## 8. Future Features (Not in v1 Scope)

- Dynamic role/permission management (RBAC Option B)
- Parent/guardian portal
- SMS notifications
- Additional Flutter platforms (iOS, desktop, web)
- Multi-institution SaaS
- Online/live olympiad mode
- Question bank with tagging and reuse
- Advanced analytics and predictive scoring
- Student self-service portal

---

## 9. Non-Goals

- No public-facing website or marketing pages
- No student or parent login in v1
- No self-registration for any role
- No real-time/live exam taking through the app
- No payment or fee management
- No chat or messaging features

---

## 10. Definition of Done

A feature is considered done when:

1. All functional requirements for the feature are implemented
2. Server-side authorization enforced (not just UI hiding)
3. Input validation on both client and server
4. Audit log entries created for state-changing operations
5. Unit tests pass with ≥ 80% coverage for business logic
6. Integration tests pass for API endpoints
7. No known critical or high-severity bugs
8. Works on the supported Flutter target (Android in v1)
9. Reviewed and approved via pull request
10. Documentation updated if API contracts changed

---

*Cross-references: [database-design.md](database-design.md) · [ui-ux-design.md](ui-ux-design.md) · [architecture-api.md](architecture-api.md) · [security-testing-deployment.md](security-testing-deployment.md)*
