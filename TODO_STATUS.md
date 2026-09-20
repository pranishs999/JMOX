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
| **Flutter Application Shell** | 100% | `COMPLETED` | Unified Material 3 dark-themed shell with GoRouter navigation and role-aware drawer |
| **Authentication Flow** | 90% | `ACTIVE` | Supabase Auth provider integration with role detection and local mock fallback mode |
| **Dashboard & Metric Panels** | 95% | `COMPLETED` | Metric cards (students, facilitators, batches, olympiads), quick actions, audit activity feed |
| **Student Roster & Credentials** | 90% | `ACTIVE` | Student directory with public ID formatting (`STU-XXXXX`), class/batch assignment, login password generator |
| **Academic Hierarchy** | 90% | `ACTIVE` | Academic Years, Classes, Batches, and Subjects with Facilitator assignment UI |
| **Attendance & Offline Sync** | 85% | `ACTIVE` | Batch attendance toggles, offline SQLite storage service, and conflict resolution |
| **Olympiads & Examinations** | 80% | `ACTIVE` | Examination paper structure, question marks, negative marking, answer key locking |
| **On-Device OMR Scanner** | 75% | `ACTIVE` | Camera scanner screen scaffolded with guide overlay, bubble detection pipeline in progress |
| **Results & Rankings Engine** | 85% | `ACTIVE` | 1-2-2-4 competition ranking display, cross-class percentage scoring, section tie-breaking |
| **Resources & Book Library** | 100% | `COMPLETED` | Downloadable study materials, Olympiad problem-solving books, and external resources |
| **Notifications & Notices** | 90% | `COMPLETED` | Role-targeted announcement feed (All, Facilitators, Students) |

---

## Active Roadmap (from `docs/context.md`)

- [ ] Connect production Supabase PostgreSQL tables and verify Row-Level Security (RLS) policies.
- [ ] Implement production on-device OpenCV contour and bubble-grid detection for OMR scanning.
- [ ] Configure Supabase Edge Functions for automated leaderboard calculation and ranking snapshots.
- [ ] Integrate Firebase Cloud Messaging (FCM) via Edge Function triggers for broadcast notifications.
- [ ] Implement CSV and PDF export for student rosters, attendance logs, and result cards.
- [ ] Configure automated CI/CD pipeline for static Flutter Web deployment to Vercel / Cloudflare Pages.
