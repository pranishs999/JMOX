# JMOX — Project Context

> **Project:** JMOX — Institute Management & Olympiad Platform  
> **Specification:** v1.0 (Phase 1)  
> **Status:** Phase 1 spec stable — see §0 for the versioning convention and §39 for the phase roadmap  
> **Purpose:** Multi-role institute platform covering academics, attendance, examinations, OMR, Olympiads, rankings, notifications, learning materials, and books.

This is the source-of-truth document. Where anything elsewhere in the document set conflicts with this file, this file wins (§40, Golden Rule).

**Document set:** `context.md` (this file) · [requirements.md](requirements.md) (PRD/SRS) · [database-design.md](database-design.md) · [architecture-api.md](architecture-api.md) · [ui-ux-design.md](ui-ux-design.md) · [security-testing-deployment.md](security-testing-deployment.md) · [audit-notes.md](audit-notes.md) (what changed and why).

---

## 0. Versioning Convention

**Major version = phase number. Minor version = a revision within that phase.**

- Each phase's spec starts at `vX.0` when that phase's features are actually being specified/built — not before.
- Fixes, clarifications, and small scope adjustments *within* a phase bump the minor version: `vX.1`, `vX.2`, ...
- The next phase only begins (`v(X+1).0`) once work on that phase's features actually starts. Writing a roadmap entry for a future phase (§39) does not bump the version — planning isn't building.
- Every document in the set (this file, requirements.md, database-design.md, etc.) shares the same `vX.Y` label at any given time, so the whole set stays traceable to one phase/revision together — don't let individual docs drift to different version numbers.

This document is currently **v1.0** — the first stable cut of Phase 1. Phase 1 itself went through pre-history revisions before settling here (below); those aren't part of this numbering, since Phase 1 hadn't stabilized yet.

### Pre-v1.0 history (reference only — not part of the phase-based version line)
- An early draft scoped a narrower, single-institution Math Olympiad manager: React+Vite web, a separate Android app, two roles (Admin, Teacher), no student login. Fully superseded before Phase 1 was finalized.
- That draft was rebuilt around the real Phase 1 feature list: single Flutter/Dart codebase, three roles (Admin, Facilitator/Mentor, Student), multi-institute data isolation, Examinations alongside Olympiads, notifications, materials, books.
- The backend assumption was then corrected: no custom server — Supabase-native (Auth, Postgres, Storage, Realtime, Edge Functions), OMR moved on-device, Redis (Upstash) added narrowly for rate limiting/ranking cache.

That corrected, settled state is what **v1.0** formalizes. The next version bump (`v1.1`) is whatever the first post-v1.0 fix/clarification turns out to be; `v2.0` doesn't happen until Phase 2 (§39) work actually starts.

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

**Naming rule:** use "Facilitator/Mentor" (or "Facilitator" for brevity in code/UI labels) consistently — not "Teacher." "Teacher" is a pre-v1.0 term and must not reappear in this document set.

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
- **Subject**: a subject taught (e.g., Mathematics, Science) — new in this Phase 1 spec (added during the pre-v1.0 Flutter rebuild). Facilitators are assigned to subjects; students are associated with subjects via their batch/class; exams and materials are scoped by subject.
- **Academic-year history**: students, facilitators, and results all carry their academic-year context permanently, so past years remain queryable after a year is archived.

---

## 5. Student Management

- Student profile: personal info, public student ID (§36), academic year, batch, class, subjects, academic history, attendance history, examination history, Olympiad history, ranking history.
- Students have their own login (Phase 1 — this is new relative to the earlier pre-v1.0 draft) and see their own data via the Student Dashboard (§20) and app areas — not other students' data.
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
- Dedicated ESP32 hardware scanners and **RFID-based attendance** are **explicitly out of scope for Phase 1** — QR scanning (app camera) and manual entry are the two Phase 1 methods, full stop.

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

### 11.2 Evaluation Types
A question can be evaluated one of three ways; the paper/question record must carry which:
- **Multiple choice** — extracted/entered option compared directly against the answer key (`marks` if match, `−negative_marks` if not).
- **Numerical** — exact match, or a configurable tolerance range (e.g., expected `9.81`, accepted `9.80–9.82`). Tolerance is per-question, not global.
- **Short answer** — deferred auto-grading. AI-assisted evaluation may be added later, but **must never assign a final mark without a Facilitator/Mentor reviewing it first** — automated grading can be confidently wrong. Treat every AI-suggested short-answer mark as a draft suggestion, not a result, until a human confirms it.

### 11.3 OMR — On-Device Processing (not server-side)
Unlike earlier drafts of this document, OMR is processed **on the scanning device** (Android/iOS, via the Flutter app), not by a backend server — there is no persistent custom server process in this architecture (§24) to run it on, and Edge Functions aren't suited to sustained image-processing workloads.

**Pipeline:**
```text
Camera
  → Capture image
  → Detect OMR sheet
  → Find corner/reference markers
  → Perspective correction
  → Crop answer area
  → Grayscale
  → Threshold/binarization
  → Contour/bubble detection
  → Calculate filled-area / dark-pixel ratio per bubble
  → Determine selected option (highest fill ratio, above a configurable confidence threshold)
  → Generate extracted answers
  → Compare with answer key
  → Calculate score
  → Facilitator quick-confirms on-screen (see below)
  → Store result in Supabase
```

Bubble determination example: for a 4-option question, compare dark-pixel ratio across A/B/C/D and pick the highest, e.g. `A=8%, B=73%, C=11%, D=7% → B`. Thresholds are configurable and must be tuned against real printed/scanned sheets, not assumed.

**OMR sheet design:** purpose-built for computer vision, not arbitrary paper layout — includes an exam identifier, an encoded student ID region, corner/reference markers for boundary detection and perspective correction, and a fixed bubble grid. Do not attempt to recognize arbitrary/free-form answer sheets.

**Implementation approach (choose per platform maturity, don't over-decide upfront):**
- *Approach A — Flutter OpenCV package:* Dart calls into a Flutter package wrapping OpenCV. Simpler to build and maintain; adequate for early development and testing.
- *Approach B — Native OpenCV via platform channel/FFI:* Flutter owns UI, camera, exam/student selection, and Supabase communication; native Android/iOS code (via platform channel or FFI) owns the actual image processing (grayscale, threshold, contour detection, perspective correction, bubble detection). More robust and performant for production; the two aren't mutually exclusive — start with A, move hot paths to B if A's performance/accuracy isn't sufficient.

**Human-in-the-loop:** after on-device extraction, the Facilitator sees the detected answers on-screen and confirms before anything is stored as a result — OMR never silently auto-finalizes. Any bubble the on-device confidence threshold couldn't call cleanly is flagged for the Facilitator's specific attention rather than requiring a full manual re-check of every question.

**Submission states:** `pending → processing → needs_review → confirmed | failed`, with retry/manual-fallback on failure. `processing` now refers to on-device processing time, not a server queue.

**Offline:** a Facilitator can scan OMR sheets while offline; extraction still happens on-device (it doesn't need connectivity), and only the confirmed result queues for sync once reconnected (§23).

### 11.4 Results
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
- Leaderboard reads are cached (§24, Redis) — computed rankings don't need to be recalculated on every page view, only when results are republished.

---

## 13. Notification System

One-directional cascade — no upward messaging in Phase 1:

```text
Admin       → Facilitator/Mentor
Admin       → Student
Facilitator → Student
```

- Delivery: push notification (via **FCM — Firebase Cloud Messaging**, triggered from Supabase Edge Functions/DB triggers, §24) + in-app notification.
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

- Authentication security via **Supabase Auth** (hashed credentials, secure session/token handling — Supabase-managed, not custom).
- **RBAC + institute isolation are enforced by PostgreSQL Row-Level Security (RLS) policies**, since there's no custom backend layer to gate access in application code (§24). Every table with an `institution_id` and/or role-scoped access needs an explicit RLS policy — the Flutter client talks to Supabase directly, so RLS is the real authorization boundary, not a UI-level restriction.
- Anything that genuinely can't be expressed as an RLS policy (complex cross-table validation, privileged aggregate operations) runs in a Supabase Edge Function using the service-role key server-side — the service-role key must never reach the client (§29).
- Session management, rate limiting (Redis/Upstash on Edge Functions, §24), secure file access (Storage RLS/signed URLs).
- Audit logs (§20).
- Account disablement (Admin can disable any account in their institute).
- Institute-level data isolation (§3) enforced by RLS, not just by convention.
- Permission validation on every mutating request/Edge Function, not just RLS on reads.

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
- **iOS**: same offline capabilities as Android (new in this Phase 1 spec — iOS was explicitly future/out-of-scope in the earlier pre-v1.0 draft; it is in-scope now).
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

**One Flutter/Dart codebase, Supabase-native backend.** Both are hard constraints, confirmed as of v1.0, and not to be revisited without explicitly renegotiating this document:

```text
Flutter (single codebase)
├── Android   — offline-capable, native OMR processing
├── iOS       — offline-capable, native OMR processing
└── Web       — online only, static build

        ↓ talks directly to

Supabase
├── Auth              — all three roles (§2) authenticate here
├── PostgreSQL        — primary database
├── Storage           — files, books, materials, OMR images
├── Realtime          — live updates where useful (notification delivery, sync/queue status)
└── Edge Functions    — server-side logic that shouldn't run on-device or behind pure RLS
                         (ranking computation, cross-table validation, notification fan-out, webhooks)

FCM (Firebase Cloud Messaging) — push notifications, called from Edge Functions / triggers, separate from the Supabase stack itself
Redis (Upstash) — narrow, optional-but-included: rate limiting on Edge Functions, and caching computed leaderboards/rankings (§12) so they aren't recomputed on every read. Not used for sessions (Supabase Auth handles that) and not a general-purpose cache-everything layer.
```

- **No React. No Vite. No separate web frontend. No separate Android frontend. No separate iOS frontend.** (Supersedes the earlier pre-v1.0 draft's React+Vite web / separate Android app decision.)
- **No custom backend server** (no FastAPI, no Django, no persistent Python/Node process). This corrects an assumption carried forward during the pre-v1.0 Flutter rebuild. Server-side logic that can't live in direct RLS-protected Supabase access runs in **Supabase Edge Functions** instead of a always-on server.
- **OMR runs on-device**, not server-side — see §11.3. This follows directly from having no persistent server process.
- **Flutter Web**: built via `flutter build web --release`, producing a static `build/web/` output; hosted on Vercel or Cloudflare Pages (either is acceptable — pick one and stay consistent). It's a static deployment talking directly to Supabase, same as the mobile apps — there's no separate web backend to deploy.
- **Cost principle:** prefer free-tier-friendly, low-maintenance infrastructure over "best-in-class" if it adds cost/complexity without a concrete Phase 1 need (§28 rule 1 — don't invent infrastructure any more than features). Supabase's and Upstash's free tiers are assumed sufficient for Phase 1 institute scale; revisit if usage outgrows them.

---

## 25. Core Data Model (minimum entities)

```text
Institute

User            (all three roles authenticate through this — maps to Supabase `auth.users`; app-specific fields live in a linked `public.profiles`-style row, not duplicated into `auth.users`)
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

CustomField / CustomFieldValue   (carried forward from the earlier pre-v1.0 draft if per-institute custom fields are still wanted — confirm before building)
```

Every entity carries `institution_id` (NOT NULL FK to `Institute`) — see §3 and §37.

---

## 26. Public IDs

`Student`, `Facilitator`, and `Admin` each need an identifier safe to print/display/scan (the QR code in §7.1 encodes the student's). Carried forward from the earlier pre-v1.0 draft's fix: non-sequential, generated as `{PREFIX}-{6-character random code}` (e.g. `STU-7F3K9Q`), never a zero-padded counter — sequential-looking IDs defeat the purpose (enumeration resistance).

---

## 27. General Rules (carried forward, still apply)

These engineering practices, carried forward from the earlier pre-v1.0 draft, aren't contradicted by the new feature list, so they carry forward as-is:

1. **UUIDs as primary keys** everywhere; public IDs (§26) are a separate, non-sequential display identifier.
2. **Soft-delete, not hard-delete**, on core entities (`deleted_at` or status enums).
3. **Historical preservation**: enrollment, results, and audit logs are append-only or immutable once finalized; transfers/changes create new records rather than overwriting.
4. **Timestamps on every table** (`created_at`, `updated_at`), without exception, including junction tables — append-only tables (`AuditLog`, `Ranking`) may omit `updated_at` since rows are never mutated in place.
5. **Referential integrity at the DB level** — real foreign keys, not untyped string references.
6. **Versioning for immutable content** — Papers/AnswerKeys carry `version` and lock once results are published against them.
7. **Decimal-safe scoring** — marks/negative marks/totals are never integers (§11.1).

---

## 28. Development Rules

1. Do not invent requirements beyond this document and its derived docs. If a feature isn't listed, don't build it "for completeness" — flag it as a question instead.
2. Do not remove or narrow a feature that's explicitly listed without asking first.
3. Sections, subjects, class lists, and similar are configurable/admin-defined, not hard-coded (§4, §10).
4. Don't replace working code/specs unnecessarily — extend, don't rewrite from scratch, unless the change genuinely requires it.
5. When this document is ambiguous, pick the most reasonable interpretation, state the assumption in the derived doc, and proceed — don't block on it.
6. Prefer stable, cross-platform, low-maintenance, free-tier-friendly packages and infrastructure (§24) — avoid introducing a paid or complex dependency for something a simpler option already covers.

---

## 29. Environment Configuration

```text
# Flutter client (safe to ship in-app — Supabase anon key is public by design)
SUPABASE_URL
SUPABASE_ANON_KEY

# Supabase Edge Functions / server-side only — never shipped to the client
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET

# Storage
SUPABASE_STORAGE_BUCKET

# Push (FCM)
FCM_SERVER_KEY / FCM_PROJECT_ID          # Edge Function side, for triggering pushes
GOOGLE_SERVICES_JSON / GoogleService-Info.plist   # per-platform FCM client config, not an env var — ships in the app bundle

# Redis (Upstash) — rate limiting + ranking cache only, see §24
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

# Web hosting (Vercel / Cloudflare Pages) — platform-specific, set in the hosting dashboard, not app code
DEFAULT_INSTITUTION_ID       # only meaningful in a single-institute dev/staging seed; production has many
```

Rules: never commit secrets (the `SUPABASE_SERVICE_ROLE_KEY` in particular must never ship in the Flutter client — only the `anon` key does, with RLS enforcing access); separate dev/prod Supabase projects; no hard-coded hosts/paths; hosting providers should be swappable through configuration.

---

## 30. Development Priority (informational — sequencing, not scope)

Carried forward as guidance on build order, not a spec of what's in/out of Phase 1 (that's §1–§23). Don't start Phase 2 work (§39) while this list still has unfinished items:

1. Flutter project architecture (single codebase, §24)
2. Authentication (Supabase Auth, all 3 roles, §2)
3. Supabase integration (Postgres schema, Storage, RLS policies)
4. Institution/class/batch/subject/student/facilitator management (§3–§6)
5. Attendance (§7)
6. QR scanning (§7.1)
7. OMR sheet generation (§11.3)
8. OMR camera scanning (§11.3)
9. OpenCV processing, on-device (§11.3)
10. Automatic evaluation + Facilitator confirm step (§11.3)
11. Offline synchronization (§22–23)
12. Notifications (§13, FCM)
13. Flutter Web deployment (§24)

---

## 39. Roadmap — Phases 2–5 (not built now; do not start until each phase's version bump, §0)

Nothing below is Phase 1 scope. Don't build any of it "while we're in there" on a Phase 1 task — each phase starts only when its version bump (§0) actually happens.

### Phase 2 — Monetization & Parent Engagement → v2.0
The commercial reason an institute buys a platform like this; without it JMOX is an internal tool, not a sellable product.
- Fee management: fee structures per class/batch, collection, payment gateway (Razorpay/Stripe), receipts/invoices, due-date reminders
- Parent accounts (view-only): child's attendance, results, fees, notifications — the natural next role after Admin/Facilitator/Student (§2)
- SMS notifications alongside push (§13) — more reliable than app push for many parents, especially for fee/attendance alerts
- Certificate generation: auto-generated PDFs for Olympiad rank holders and top performers
- Basic timetable/scheduling: class and exam timetables, calendar view

### Phase 3 — Academic Depth → v3.0
Makes the platform stickier for day-to-day teaching, not just admin/reporting.
- Homework/assignments — lighter-weight than formal exams (§8), distinct assign/submit/track flow
- Question bank + auto paper generation — reuse questions across exams/Olympiads instead of authoring from scratch each time
- AI-assisted short-answer grading — flagged as deferred in §11.2; build it here, keeping the mandatory human-review gate
- Discussion/doubt forum — student ↔ facilitator, scoped like everything else (§2)
- Recorded lecture library — video content, reusing the Learning Materials access model (§14)

### Phase 4 — Platform Maturity & Scale → v4.0
Needed once JMOX runs multiple institutes for real, not just one.
- Cross-institute super-admin role (flagged as a gap in §3)
- Institute-level billing/subscription, if JMOX itself is sold as SaaS per institute
- Overall/cross-institute rankings (§12) — inter-institute Olympiad competitions
- Custom roles/permissions beyond the fixed Admin/Facilitator/Student set (e.g. Accountant, Front-desk, Exam Coordinator)
- Multi-language support (i18n)
- RFID/biometric attendance hardware (§7.1)

### Phase 5 — Expansion → v5.0 (longer-term, speculative — revisit scope before starting)
- Paid books/marketplace (§15)
- Alumni tracking
- Physical library inventory management
- Transport tracking
- Full staff HR (payroll, leave)

---

## 40. Golden Rule

If any derived document (requirements, database design, architecture/API, UI/UX, security/testing/deployment) conflicts with this file, **this file wins**. Flag the conflict in `audit-notes.md` rather than silently picking one side. Don't invent requirements; don't quietly drop ones that are here.
