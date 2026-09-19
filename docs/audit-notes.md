# JMOX — Audit Notes

> **What changed and why.**
> This document records architecture decisions, divergences from [context.md](context.md), and the rationale behind each.
> Per §40 (Golden Rule): when a derived document conflicts with `context.md`, this file flags the conflict.

---

## 1. Architecture Divergence: Custom Backend vs. Supabase-Native

**context.md says (§24):** No custom backend server. Flutter talks directly to Supabase. Server-side logic runs in Supabase Edge Functions.

**What was built:** A **FastAPI (Python 3.14)** backend server with SQLAlchemy ORM, Alembic migrations, and a full REST API. The backend runs as an always-on process.

**Why:** A persistent server was needed for:
- Complex business logic (scoring, ranking with section-based tie-breaking, result lifecycle management) that exceeds Edge Function limits.
- OMR processing via an async worker with OpenCV (CPU-intensive, long-running).
- Connection pooling, session management, and centralized auth (Argon2id hashing, JWT issuance, CSRF cookies).
- Structured audit logging with before/after snapshots.
- Job queue management for background tasks.

Edge Functions have execution time limits, cold-start latency, and limited compute — none of which are compatible with OMR image processing or complex ranking algorithms.

**Impact:** The entire data access pattern changes. Instead of RLS-protected direct Supabase access, all data flows through the FastAPI REST API. Authorization is enforced in application code (role checks + batch assignment validation), not via Postgres RLS policies.

---

## 2. Architecture Divergence: React Web Frontend vs. Flutter Web

**context.md says (§24):** No React. No Vite. Single Flutter/Dart codebase for Android, iOS, and Web.

**What was built:** A **React + Vite TypeScript SPA** for the web frontend, separate from the Flutter mobile app.

**Why:** Flutter Web, at the time of implementation, had limitations for data-dense admin interfaces:
- Admin/teacher workflows are table-heavy (student rosters, attendance grids, result tables, ranking leaderboards) — React with TanStack Table and Recharts provides a more mature ecosystem for this.
- Flutter Web builds are significantly larger than equivalent React SPAs and have slower initial load times for data-centric applications.
- The development team had stronger React expertise for rapid web UI iteration.

**Impact:** Two frontend codebases to maintain (`apps/web/` for React, `apps/android/` for Flutter). API contracts are shared; both consume the same `/api/v1/` endpoints.

---

## 3. Role Naming: "Teacher" vs. "Facilitator/Mentor"

**context.md says (§2):** Use "Facilitator/Mentor" consistently. "Teacher" is a pre-v1.0 term.

**What was built:** The codebase uses **"Teacher"** everywhere — database models (`Teacher`, `TeacherBatch`), API endpoints (`/api/v1/teachers`), Pydantic schemas, React components, and UI labels.

**Why:** The "Teacher" naming was established before `context.md` was finalized and is deeply embedded across all layers. A rename would require changes to database tables (migration), all model files, all API routes, all schemas, all service code, all frontend components, and all tests.

**Resolution path:** If Facilitator/Mentor naming is required, this should be a dedicated refactoring task — not mixed into feature work. The UI labels can be changed independently of code identifiers if needed (display "Facilitator" while the code variable is still `teacher`).

---

## 4. Student Login: Added Post-v1.0 Baseline

**context.md says (§5):** Students have their own login (Phase 1).

**What was built initially:** v1.0 launched with two roles only (Admin, Teacher). **Student login was added later** — the `UserRole` enum now includes `STUDENT`, the `Student` model has a `user_id` FK to `User`, and login password generation endpoints exist for both teachers and students.

**Impact:** The `User` model supports three roles (`admin`, `teacher`, `student`). Students can authenticate via email/public_id. The auth service resolves login identifiers across `users`, `teachers`, and `students` tables via outer joins.

---

## 5. Database: Local PostgreSQL vs. Supabase Postgres

**context.md says (§24):** Supabase PostgreSQL with Supavisor connection pooling and RLS.

**What was built:** Local PostgreSQL via Docker Compose for development. The connection uses `asyncpg` through SQLAlchemy's async engine. No RLS policies — authorization is handled in application code.

**Why:** With a custom FastAPI backend, Supabase's managed Postgres is just another PostgreSQL host. The RLS approach was unnecessary since the API server enforces authorization. Docker Compose provides a simpler local development experience.

**Production path:** The `DATABASE_URL` in production can point to Supabase Postgres, a managed RDS instance, or any PostgreSQL host. The application is infrastructure-agnostic.

---

## 6. iOS: Not Yet Implemented

**context.md says (§22, §24):** iOS is in-scope for Phase 1, with the same offline capabilities as Android.

**What was built:** Android only. The Flutter project is under `apps/android/`.

**Why:** Development prioritization — Android was built first as the primary mobile platform. The Flutter codebase is architecturally ready for iOS (same Dart code), but iOS-specific setup (Xcode project, certificates, App Store configuration) has not been done.

---

## 7. Offline Sync & Realtime: Partially Implemented

**context.md says (§22–§23):** Full offline capability for Android/iOS with sync queue, automatic sync, conflict detection (server record wins).

**What was built:** The attendance sync endpoint (`POST /api/v1/attendance/sync`) implements server-wins conflict resolution. The Flutter app scaffolding includes offline attendance storage. Full offline support for all entities (drafts, OMR queue) is not yet implemented.

---

## 8. Missing Phase 1 Entities

The following entities from context.md §25 are **not yet implemented** in the database schema or API:

| Entity | context.md Section | Status |
|--------|-------------------|--------|
| Subject | §4 | Not implemented — exams/papers are scoped to Class, not Subject |
| FacilitatorAssignment | §4 | Implemented as `TeacherBatch` (batch-level, not subject-level) |
| LearningMaterial | §14 | Not implemented |
| Book / BookAccess | §15 | Not implemented |
| Notification | §13 | API route exists but entity model is minimal |

These are candidates for future implementation within Phase 1 scope.

---

## 9. OMR Processing: Server-Side vs. On-Device

**context.md says (§11.3):** OMR is processed on-device (Flutter app), not server-side.

**What was built:** OMR processing runs as a **server-side async worker** (`server/app/workers/omr_processor.py`) using OpenCV. Images are uploaded to storage, a job is enqueued, and the worker processes them on the server.

**Why:** Server-side processing was chosen for:
- Consistent processing quality regardless of device hardware.
- Easier debugging and reprocessing of failed scans.
- No dependency on native OpenCV bindings in Flutter (which have cross-platform compatibility issues).

The human-in-the-loop requirement from context.md §11.3 **is respected**: OMR results go through `needs_review` status and require teacher confirmation before becoming student answers.

---

## 10. Public ID Format

**context.md says (§26):** Format `{PREFIX}-{6-character random code}` (e.g., `STU-7F3K9Q`), non-sequential.

**What was built:** Format `{PREFIX}-{YEAR}-{SEQUENCE:04d}` (e.g., `JMO-2026-0001`), sequential per entity type per institution.

**Why:** The sequential format was implemented before context.md's non-sequential requirement was specified. The `PublicIDConfig` model manages prefix, year, and sequence counters per institution.

**Resolution path:** Migrating to the non-sequential format is a data migration task. The `public_id_listeners.py` auto-generation logic would need to be updated to use random codes instead of incrementing sequences.

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-09 | Initial audit notes created documenting all architecture divergences | System |
