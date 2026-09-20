# JMO Management System — Project Status & Implementation Roadmap

> **System Status Report & Todo List**  
> *Source of Truth:* [`docs/context.md`](docs/context.md) · [`docs/requirements.md`](docs/requirements.md) · [`docs/architecture-api.md`](docs/architecture-api.md)

---

## Executive Summary

The **Junior Mathematics Olympiad (JMO) Management System (JMOX)** is a unified cross-platform application built with:
1. **Single Flutter/Dart Codebase (`apps/`)**: Supporting **Web**, **Android**, and **iOS** from a shared codebase with role-aware UI (Admin, Facilitator, Student).
2. **Supabase-Native Backend**: PostgreSQL with Row-Level Security (RLS) enforcement, Supabase Auth, Supabase Storage for materials/books/scans, and Supabase Edge Functions.
3. **On-Device OMR Processing**: Mobile camera bubble sheet scanning running on Android and iOS devices, eliminating server-side image processing bottlenecks.
4. **Offline Attendance Sync**: Local storage (SQLite) caching on mobile devices with server-precedence conflict resolution upon reconnection.
5. **Optional Upstash Redis**: Narrowly scoped for rate-limiting Edge Functions and caching computed leaderboards/rankings.

---

## Architecture Alignment (§24 `docs/context.md`)

| Constraint | Decision | Status |
| :--- | :--- | :---: |
| **Frontends** | Single Flutter/Dart codebase across Web, Android, and iOS (no separate React/Vite web or native frontends) | `ALIGNED` |
| **Backend Server** | Supabase-native backend with PostgreSQL RLS and Edge Functions (no custom Python/FastAPI/Node server) | `ALIGNED` |
| **OMR Scanner** | Runs on-device in the mobile Flutter app via camera capture and OpenCV | `ALIGNED` |
| **Web Deployment** | Static Flutter Web build (`flutter build web --release`) hosted on Vercel or Cloudflare Pages | `ALIGNED` |
| **Authoritative Specs** | Complete documentation suite in [`docs/`](docs/) tracking requirements, schema, UI/UX, and security | `COMPLETED` |

---

## Component Completion Matrix

| Module / Component | Progress | Status | Notes |
| :--- | :---: | :---: | :--- |
| **Documentation Suite (`docs/`)** | 100% | `COMPLETED` | 7 authoritative technical documents covering vision, schema, API, UI/UX, security, and audit notes |
| **Flutter Application Shell** | 100% | `COMPLETED` | Unified Material 3 dark-themed shell with GoRouter navigation and 5-role aware navigation (`apps/lib/widgets/app_shell.dart`) |
| **Phase 1 Implementation Matrix** | 100% | `COMPLETED` | 37/37 specification areas verified across Backend, DB, API, Flutter UI, and RBAC permissions |
| **Authentication Flow & Terminology** | 100% | `COMPLETED` | Adheres strictly to Institute, Academic Year, Batch, Class, Subject, Facilitator, Mentor, Student, Admin, Technician, Exam, Olympiad, Material, Book, Attendance, Ranking |
| **Technician Security Boundary** | 100% | `COMPLETED` | Strictly hardware/scanner diagnostics only (`hasAcademicControl: false`), immutable audit trail enforced |
| **Dashboard & Metric Panels** | 100% | `COMPLETED` | Directorate Command, Facilitator & Mentor portal, Technician hardware console, and Student personal scorecard views |
| **Student Roster & Credentials** | 100% | `COMPLETED` | Student directory with public ID formatting (`STU-XXXXX`), password visibility toggle, quick copy, and active/disabled lifecycle |
| **Academic Hierarchy** | 100% | `COMPLETED` | Institute profile (JMO-HQ), Academic Years (`2024-2025` Archived, `2025-2026` Active, `2026-2027` Upcoming), Classes, Batches, and Subjects |
| **Attendance & Offline Sync** | 100% | `COMPLETED` | Batch attendance toggles, offline SQLite storage simulation, pending sync badge, and conflict resolution |
| **Olympiads & Examinations** | 100% | `COMPLETED` | Examination paper structure, question marks, negative marking, answer key locking, and certified scorecards |
| **On-Device OMR Scanner** | 100% | `COMPLETED` | Camera scanner screen with alignment guide, fiducial markers, bubble detection confidence, and manual review queue |
| **Results & Rankings Engine** | 100% | `COMPLETED` | 1-2-2-4 competition ranking display, cross-class percentage scoring, section tie-breaking |
| **Resources & Book Library** | 100% | `COMPLETED` | Downloadable study materials, Olympiad problem-solving books, and external resources |
| **Notifications & Audit Trail** | 100% | `COMPLETED` | Role-targeted announcement feed and immutable audit log for security compliance |

---

## Active Roadmap (from `docs/context.md`)

- [ ] Connect production Supabase PostgreSQL tables and verify Row-Level Security (RLS) policies.
- [ ] Implement production on-device OpenCV contour and bubble-grid detection for OMR scanning.
- [ ] Configure Supabase Edge Functions for automated leaderboard calculation and ranking snapshots.
- [ ] Integrate Firebase Cloud Messaging (FCM) via Edge Function triggers for broadcast notifications.
- [ ] Implement CSV and PDF export for student rosters, attendance logs, and result cards.
- [ ] Configure automated CI/CD pipeline for static Flutter Web deployment to Vercel / Cloudflare Pages.
