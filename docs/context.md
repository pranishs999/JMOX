# JMOX — Project Context

> **Project:** JMOX — Institute Management & Olympiad Platform  
> **Specification:** v3.0  
> **Status:** Phase 1 scope confirmed (supersedes v2.1 — see §0)  
> **Purpose:** Multi-role institute platform covering academics, attendance, examinations, OMR, Olympiads, rankings, notifications, learning materials, and books.

This is the source-of-truth document. Where anything elsewhere in the document set conflicts with this file, this file wins (§40, Golden Rule).

**Document set:** `context.md` (this file) · [requirements.md](requirements.md) (PRD/SRS) · [database-design.md](database-design.md) · [architecture-api.md](architecture-api.md) · [ui-ux-design.md](ui-ux-design.md) · [security-testing-deployment.md](security-testing-deployment.md) · [audit-notes.md](audit-notes.md) (what changed and why).

---

## 0. Version History

- **v1.0/v2.0/v2.1** — An earlier, narrower scope: single-institution Junior Math Olympiad manager, React+Vite web + separate Android app, two roles (Admin, Teacher), no student login, notifications/materials/books explicitly deferred.
- **v3.0 (this version)** — Rebuilt around the Phase 1 Feature List: a single Flutter/Dart codebase (Android + iOS + Web), three roles including Student login, multi-institute data isolation, a general Examination system alongside Olympiads, notifications, learning materials, and a books library, all as Phase 1 (not future) scope.

This is a scope expansion, not a patch. Treat earlier decisions as superseded wherever they conflict with this document; where they don't conflict (e.g., data-integrity practices in §37), they're carried forward.

---

## 1. Project Summary

JMOX is a platform institutes use to run their academic operations end to end: enrolling students, tracking attendance, running examinations and Olympiads, scoring via OMR or manual entry, computing rankings, and distributing learning materials — with role-appropriate dashboards for Admins, Facilitators/Mentors, and Students.

Phase 1 delivers the complete core platform. Phase 2+ is intentionally undefined (§39).

---

## 2. Roles

Exactly three roles in Phase 1:

- **Admin** — full control within their institute.
- **Facilitator/Mentor** — manages assigned classes/batches/subjects: attendance, exams, marks, OMR, results, materials, olympiads (for their scope), and messaging down to students.
- **Student** — has a login, sees their own academic data, materials, books, and results; cannot manage other students' data.

Role-based access control (RBAC) applies to every resource and every client (Android, iOS, Web) identically — the same permission rules, not per-platform variants.

**Naming rule:** use "Facilitator/Mentor" (or "Facilitator" for brevity in code/UI labels) consistently — not "Teacher." "Teacher" is a v2.1 term and must not reappear in this document set.

---

## 3. Institutes & Multi-Tenancy

Institute is a first-class, managed entity in Phase 1 — not a "readiness" placeholder for later.

- Every Admin, Facilitator, Student, and every academic/operational record belongs to exactly one Institute.
- **Institute-level data isolation is enforced now**: no query may return another institute's data, no file may be reachable across institutes, no search/report may leak across the boundary.
- An Institute has: profile (name, logo, contact details, address) and settings (academic-year conventions, notification preferences, default ranking scopes, etc. — extend as needed, don't invent beyond what's requested).
- **Assumption (flag if wrong):** each institute has its own Admin(s); Phase 1 does not include a cross-institute "platform super-admin" role that manages multiple institutes at once. If that's needed, it's a Phase 2 decision.

---

## 4. Academic Structure

Hierarchy: **Institute → Academic Year → Batch → Class → Subject**, with Facilitators and Students attached at the Batch/Class level.

- **Academic Year**: has a date range, an active flag (one active year per institute at a time), and can be archived. Archiving preserves history — it does not delete data (§37).
- **Batch**: a group of students taught together, scoped to a Class and Academic Year.
- **Class**: a grade/level grouping (data-driven, admin-creatable — do not hard-code a fixed list).
- **Subject**: a subject taught (e.g., Mathematics, Science) — new in v3.0. Facilitators are assigned to subjects; students are associated with subjects via their batch/class; exams and materials are scoped by subject.
- **Academic-year history**: students, facilitators, and results all carry their academic-year context permanently, so past years remain queryable after a year is archived.

---

## 5. Student Management

- Student profile: personal info, public student ID (§36), academic year, batch, class, subjects, academic history, attendance history, examination history, Olympiad history, ranking history.
- Students have their own login (Phase 1 — this is new relative to v2.1) and see their own data via the Student Dashboard (§20) and app areas — not other students' data.
- Admin assigns students to batches/classes; changes preserve history (§37) rather than overwriting it.

---

## 6. Facilitator/Mentor Management

- Facilitator profile: assigned batches, classes, subjects, and the resulting student lists.
- A Facilitator's permissions are scoped to their assignments: they manage attendance, exams, marks entry, results, OMR, and material uploads only for batches/classes/subjects they're assigned to (§2).
- A Facilitator can message (notify) only students within their own assigned scope (§21).

---

## 7. Attendance

Two entry methods, one record model:

### 7.1 QR Attendance
- Every student has a unique QR code (their public student ID, encoded).
- Facilitator scans it via the JMOX mobile app; the system auto-identifies the student and validates batch/class/session match before recording.
- Duplicate scans for the same student+session are rejected (idempotent), not recorded twice.
- Dedicated ESP32 hardware scanners are **explicitly out of scope for Phase 1** — QR scanning is app-camera-based only.

### 7.2 Manual Attendance
- Facilitator marks Present/Absent/Late directly.
- Attendance is editable after recording, with an audit trail (who recorded it, who last changed it, when — §37 timestamp rule applies).

### 7.3 Records & Sync
- Daily and monthly attendance views, attendance percentage, per-student/batch/class history, exportable reports.
- Attendance can be recorded offline (Android/iOS) and synced later (§23). Conflict rule: if a server record already exists for a given (student, session), it wins; the incoming offline write is rejected and logged for review, not silently discarded and not resolved by comparing client-supplied timestamps (client clocks aren't trustworthy for that).

---

## 8. Examination System

General, subject-based exams — distinct from Olympiads (§9), but sharing the same underlying content/scoring machinery (§10, §11) so the two aren't built twice.

- Admin/Facilitator creates and edits exams, assigns them to specific batches/classes, and picks the subject.
- Each exam has questions (built via the shared Question/Section/Paper model, §10), marks configuration (marks + negative marks per question, decimal-safe — see the marking rule in §11), and a schedule.
- Marks entry: manual or via OMR (§11).
- Results and result history are visible per student, per exam, with exportable result reports.

---

## 9. Olympiad System

Two recurring Olympiad types, both built on the same content/scoring machinery as Exams:

- **Monthly Olympiad**: created per month; has its own question set, participant list, scoring, results, and **Monthly ranking**.
- **Yearly Olympiad**: created per academic year; same structure, with its own **Yearly ranking**.

Monthly and Yearly Olympiads are tracked as separate entities with separate results and separate rankings — a student's Monthly Olympiad standing does not roll up automatically into the Yearly one (Yearly is its own competition, not a sum of Monthly results, unless a future phase explicitly says otherwise).

---

## 10. Shared Content Model (Papers, Sections, Questions)

Both Exams and Olympiads are built from the same primitives, so the platform doesn't maintain two parallel authoring systems:

- **Paper** — belongs to either an Exam or an Olympiad (one or the other, not both), targets a Class, has a version and a lock state.
- **Section** — groups questions within a paper, has a sort order (which also drives tie-break precedence, §11).
- **Question** — belongs to a section; has text, options, marks, and negative marks.
- **AnswerKey** — versioned alongside its paper; locked once results are published against it.

Sections and marking schemes are configurable per paper/subject — never hard-code a fixed set of section names or a fixed subject list.

---

## 11. Scoring, OMR, and Results

### 11.1 Marking
- Each question carries its own `marks` (points if correct) and `negative_marks` (points deducted if incorrect, default 0). Both must support **fractional values** (e.g., +2 / −0.5) — never store these as integers.
- Unanswered questions score 0 (no penalty).
- A paper's total score is the sum across all its questions; can be negative in theory.

### 11.2 OMR
- OMR scanning/upload → processing (server-side, async — never client-side, never blocking) → answer detection → automatic marking → **mandatory manual verification by a Facilitator before it counts as a result** (OMR never auto-finalizes a result).
- Submission states: `pending → processing → needs_review → confirmed | failed`, with clear error handling on failure (retry or manual fallback).
- Offline OMR queue: a Facilitator can queue an OMR scan while offline; it uploads and processes once reconnected (§23).

### 11.3 Results
- Lifecycle: `draft → reviewed → published`. `draft` is the scored-but-unconfirmed state (this is where OMR/manual evaluation lands); `reviewed` means a Facilitator/Admin checked it; `published` is final and visible to the student, and locks the paper/answer key.
- Unpublishing (Admin only) moves a result back to `reviewed`, requires a reason, and is audited. A paper/answer-key stays locked as long as any of its results remain `published`.
- Result reports and result history are available per exam/olympiad, per student, per batch/class.

---

## 12. Ranking System

Two independent ranking axes, applied separately to Monthly Olympiad results and Yearly Olympiad results (§9) — Exams (§8) are scored/reported but are not described as producing "rankings" in Phase 1 scope, so don't add ranking UI for plain exams unless asked:

- **Batch ranking** and **Class ranking** — the two population scopes explicitly in scope. (Do not add an "overall/cross-institute" scope; it isn't in the Phase 1 feature list — flag it as a future idea if it comes up, don't build it silently.)
- Standard competition ranking (1-2-2-4: tied students share a rank, the next distinct score skips accordingly).
- Tie-break: total score → each section's score in the paper's configured section order → same rank if still tied. Sections aren't hard-coded (§10), so this must read the paper's actual section order, not a fixed name list.
- Percentage-normalized comparison is used wherever papers being compared don't share the same maximum marks.
- Rankings recompute when results are republished; prior ranking snapshots are preserved, not overwritten.
- Leaderboards and rank history are visible per the role's scope (§2): a Student sees their own rank history; a Facilitator sees their assigned batches/classes; Admin sees everything in their institute.

---

## 13. Notification System

One-directional cascade — no upward messaging in Phase 1:

```text
Admin       → Facilitator/Mentor
Admin       → Student
Facilitator → Student
```

- Delivery: push notification + in-app notification.
- Notification center per user: read/unread status, history.
- Delivery status tracked "where applicable" (i.e., don't block on guaranteed push delivery receipts if the underlying push provider doesn't support them — track what's available).
- A Facilitator may only notify students within their own assigned scope (§6).

---

## 14. Learning Materials

- Upload types: PDF, documents, images, notes.
- Associated with Subject, Batch, Class, and Academic Year (any combination — a material can be broad or narrow).
- View/download, with role-based access matching §2 scoping (a Facilitator only manages materials for their own scope; a Student only sees materials for their own batch/class/subjects).

---

## 15. Books

Institute-provided, free/basic resources — **no paid or marketplace functionality in Phase 1.**

- Upload with metadata, associated with Subject and Batch/Class.
- Student library: browse, view, access.
- Book management (Admin/Facilitator, scoped as usual).

---

## 16. Dashboards

Three role-specific dashboards, each surfacing only what that role can act on (§2):

- **Admin**: institute-wide overview across students, facilitators, academic years, batches, classes, subjects, attendance, exams, results, OMR, Olympiads, rankings, notifications, materials, books.
- **Facilitator/Mentor**: their assigned classes/batches/students, attendance, exams, marks, results, OMR, materials, Olympiads (within scope), notifications.
- **Student**: their own profile, academic year/batch/class/subjects, attendance, exams, results, Olympiad results, rankings, materials, books, notifications.

---

## 17. Reports, Search, Filtering & Sorting, Import/Export

- **Reports**: student, attendance, exam, result, OMR, Monthly Olympiad, Yearly Olympiad, Monthly ranking, Yearly ranking, batch, class — all exportable.
- **Search**: global/contextual across students, facilitators, books, materials, exams, olympiads — always filtered by the searching user's role/permissions (§2); never a bypass around scoping.
- **Filtering**: by academic year, batch, class, subject, attendance status, exam, olympiad, ranking.
- **Sorting**: by name, date, score, percentage, rank, attendance percentage, and other relevant fields per list.
- **Import**: student data (and basic institute data where applicable), CSV.
- **Export**: student, attendance, examination, result, ranking data, and reports — CSV.

---

## 18. File & Storage Management

- Covers: student files, learning materials, books, OMR scans, result documents, institute files.
- Secure, role-based access; files are organized (not a flat bucket); **institute-level file isolation** is enforced the same way data isolation is (§3) — a file belonging to one institute must never be reachable by another institute's users, even by a guessed URL.

---

## 19. Security

- Authentication security (hashed credentials, secure session/token handling).
- RBAC + API-level authorization on every endpoint, not just UI-level hiding.
- Session management, rate limiting, secure file access.
- Audit logs (§20).
- Account disablement (Admin can disable any account in their institute).
- Institute-level data isolation (§3) enforced at the query/authorization layer, not just by convention.
- Permission validation on every mutating request.

---

## 20. Audit & Activity History

Track administrative actions: who performed it, what action, which record, when, and the resulting status. Examples explicitly called out by the feature list: student created/updated/disabled, attendance corrected, marks changed, exam created, book uploaded, material uploaded, account changed. Treat this as illustrative, not exhaustive — any state-changing administrative action should be audited.

---

## 21. Operation Status & Error Handling

Standard status vocabulary for any non-instant operation (mobile sync, OMR processing, imports, etc.), used consistently across the whole platform rather than each feature inventing its own:

```text
loading → pending → processing → (success/completed) | failed | conflict
```

Retry is always offered where a failure is retryable. This vocabulary is especially load-bearing for mobile sync (§22–23) and OMR (§11.2) — use these exact states, don't invent parallel ones per feature.

---

## 22. Mobile Offline System

- **Android**: fully offline-capable — local storage of previously synced data, offline attendance, offline drafts, offline OMR queue, sync queue, automatic sync, retry-on-failure, conflict handling, sync status.
- **iOS**: same offline capabilities as Android (new in v3.0 — iOS was explicitly future/out-of-scope in v2.1; it is in-scope now).
- **Web**: online-only, no offline mode — this is a deliberate simplification, not an oversight. Do not build offline support into the web target.

---

## 23. Data Synchronization

For Android and iOS:

```text
Online
  → Synchronize data
  → Local database
  → Offline changes
  → Sync queue
  → Connection restored
  → Upload changes
  → Server validation
  → Success / Conflict / Retry
```

Requirements: automatic sync, manual retry where needed, failed-sync retry, conflict detection and resolution (§7.3's "existing server record wins" rule is the general pattern — apply it consistently to any syncable entity, not just attendance), sync status visible to the user, and data consistency as the non-negotiable outcome (never silently drop a conflicting write — log it, surface it).

---

## 24. Platform & Tech Stack

**One Flutter/Dart codebase.** This is a hard constraint, confirmed, and not to be revisited without explicitly renegotiating this document:

```text
JMOX (single Flutter/Dart codebase)
├── Android   — offline-capable
├── iOS       — offline-capable
└── Web       — online only
```

- **No React. No Vite. No separate web frontend. No separate Android frontend. No separate iOS frontend.** (This explicitly supersedes v2.1's React+Vite web / separate Android app decision.)
- Backend and infrastructure choice is **not specified** by the Phase 1 feature list, which only constrains the client side. Carried forward from v2.1 as a reasonable, non-conflicting default (flag if this should change):
  - **Backend**: FastAPI (Python), always-on host (Railway/Fly.io/Render) — not serverless, since OMR processing and background sync validation need a persistent process.
  - **Database**: PostgreSQL via Supabase (connection pooling via Supavisor).
  - **File storage**: Supabase Storage (S3-compatible), with institute-scoped access rules (§18).
  - **OMR**: OpenCV, run server-side via a background worker (same backend codebase; may be a separate process from the same deployable).

---

## 25. Core Data Model (minimum entities)

```text
Institute

User            (all three roles authenticate through this)
Admin            (profile fields for role=admin)
Facilitator      (profile fields for role=facilitator)
Student          (profile fields for role=student)

AcademicYear
Batch
Class
Subject
FacilitatorAssignment   (facilitator × batch/class/subject)
StudentEnrollment       (student × batch/class, historical)

Session
Attendance

Exam
Olympiad                (type: monthly | yearly)
Paper
Section
Question
QuestionOption
AnswerKey

StudentAnswer
OMRSubmission
AssessmentResult
Ranking                 (scope: batch | class; competition: exam-linked | monthly-olympiad | yearly-olympiad)

LearningMaterial
Book
BookAccess              (student ↔ book, if access needs to be tracked individually)

Notification

AuditLog

CustomField / CustomFieldValue   (carried forward from v2.1 if per-institute custom fields are still wanted — confirm before building)
```

Every entity carries `institution_id` (NOT NULL FK to `Institute`) — see §3 and §37.

---

## 26. Public IDs

`Student`, `Facilitator`, and `Admin` each need an identifier safe to print/display/scan (the QR code in §7.1 encodes the student's). Carried forward from v2.1's fix: non-sequential, generated as `{PREFIX}-{6-character random code}` (e.g. `STU-7F3K9Q`), never a zero-padded counter — sequential-looking IDs defeat the purpose (enumeration resistance