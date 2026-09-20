# Junior Mathematics Olympiad Management System (JMOX)

> **JMOX** is a unified, cross-platform management platform designed for regional and national mathematics olympiad programs, academic institutions, and training academies. Built with a **single Flutter/Dart codebase** for Web, Android, and iOS, backed by a **Supabase-native cloud architecture**.

---

## Architecture Overview

Per the authoritative specification in [`docs/context.md`](docs/context.md) (§24), JMOX is engineered with a strict **single-codebase, Supabase-native** topology:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                       Unified Flutter Application                      │
│                  (Single Dart Codebase in apps/)                       │
├─────────────────────┬───────────────────────────┬──────────────────────┤
│     Web Client      │       Android Client      │      iOS Client      │
│  (Static Web SPA)   │  (Offline SQLite + OMR)   │ (Offline SQLite+OMR) │
└──────────┬──────────┴─────────────┬─────────────┴──────────┬───────────┘
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    │ Direct Client Connection
                                    ▼ (Enforced by PostgreSQL RLS)
┌────────────────────────────────────────────────────────────────────────┐
│                        Supabase Cloud Platform                         │
├──────────────────────┬──────────────────────────┬──────────────────────┤
│    Supabase Auth     │  PostgreSQL with RLS     │   Supabase Storage   │
│  - Admin             │  - Multi-tenant data     │  - Books & Materials │
│  - Facilitator       │  - Historical lineage    │  - OMR Scan captures │
│  - Student           │  - Append-only audit     │  - Exported reports  │
├──────────────────────┴──────────────────────────┴──────────────────────┤
│                       Supabase Edge Functions                         │
│  - Leaderboard calculation & ranking snapshots                         │
│  - Cross-table validations & notification dispatch (FCM)               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
               ┌───────────────────┐ ┌───────────────────┐
               │   Upstash Redis   │ │   Firebase FCM    │
               │  (Rate limit &    │ │(Push Notification │
               │  ranking cache)   │ │    Delivery)      │
               └───────────────────┘ └───────────────────┘
```

### Architectural Guarantees

1. **Single Client Codebase**: No separate web or native repos. All platforms (Web, Android, iOS) are compiled from [`apps/`](apps/).
2. **No Custom Backend Server**: No persistent Python/FastAPI or Node daemon. Client connects directly to Supabase with authorization enforced by **PostgreSQL Row-Level Security (RLS)** policies. Server-side compute runs in serverless **Supabase Edge Functions**.
3. **On-Device OMR Processing**: Optical Mark Recognition (bubble sheet scanning) is executed directly on mobile devices using camera capture and OpenCV, avoiding heavy server-side image processing bottlenecks.
4. **Offline-First Attendance**: Field attendance logging operates offline via local SQLite cache and automatically reconciles changes upon reconnection using server-precedence conflict resolution.
5. **Static Web Deployment**: Web build outputs static assets (`flutter build web --release`) deployable to CDNs (Vercel, Cloudflare Pages).

---

## Repository Structure

```text
JMOX/
├── apps/                           # Unified Flutter cross-platform codebase
│   ├── lib/
│   │   ├── main.dart               # Entry point, Material 3 Dark theme, Supabase init
│   │   ├── api/                    # API client abstraction
│   │   ├── models/                 # Strong data models (Users, Students, Exams, Results)
│   │   ├── router/                 # GoRouter navigation & route guards
│   │   ├── screens/                # UI feature modules:
│   │   │   ├── academics/          # Subjects & curriculum management
│   │   │   ├── assessment/         # Results & on-device OMR camera scanner
│   │   │   ├── attendance/         # Session attendance grid & offline sync
│   │   │   ├── auth/               # Multi-role authentication & credentials
│   │   │   ├── dashboard/          # Role-aware dashboards & metrics
│   │   │   ├── resources/          # Books library & study materials
│   │   │   └── students/           # Student directory, enrollments, credentials
│   │   ├── services/               # Supabase service, Auth, Offline sync provider
│   │   └── widgets/                # AppShell, adaptive drawer, reusable components
│   ├── android/                    # Android host project & Gradle configuration
│   ├── ios/                        # iOS host project & Xcode configuration
│   ├── web/                        # Web host assets (index.html, manifest, icons)
│   ├── pubspec.yaml                # Flutter dependencies & assets manifest
│   └── test/                       # Unit and widget test suite
├── docs/                           # Authoritative system documentation
│   ├── context.md                  # Master product vision & architectural constraints
│   ├── requirements.md             # Functional & non-functional requirements
│   ├── database-design.md          # Complete ER diagrams, schemas, and RLS rules
│   ├── architecture-api.md         # System topology, API specs, and Edge Functions
│   ├── ui-ux-design.md             # Multiplatform UI/UX specs and screen flows
│   ├── security-testing-deployment.md # Security matrix, testing, and deployment guide
│   └── audit-notes.md              # Architectural decisions & divergence log
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore rules for Flutter, Dart, and environments
├── TODO_STATUS.md                  # Implementation roadmap & status tracking
└── README.md                       # Main project documentation
```

---

## Core Capabilities

### 1. Multi-Role Access Control (RBAC)
- **Admin**: Complete institutional management, academic configuration, facilitator hiring, student admission, examination publishing, and audit visibility.
- **Facilitator / Mentor**: Scoped to assigned subjects, classes, and batches. Manages session attendance, manual answer entry, OMR scanning, and student guidance.
- **Student**: Accesses personal performance scorecards, exam answer keys, class schedules, downloadable study materials, and competition problem books.

### 2. Academic Structure & Lineage
- Multi-tier academic hierarchy: **Academic Years** $\rightarrow$ **Classes** $\rightarrow$ **Batches** $\rightarrow$ **Subjects**.
- Facilitator-to-subject assignments and student enrollments.
- Immutable historical lineage: student transfers create new enrollment records rather than destructively updating historical rows.

### 3. Attendance Logging & Offline Sync
- Touch-friendly attendance interface for fast bulk logging (`Mark All Present`, individual exceptions: `Absent`, `Late`, `Excused`).
- **Offline Mode**: Operates seamlessly in environments without network connectivity using local SQLite storage.
- **Conflict Resolution**: Deterministic server-timestamp precedence when synchronizing buffered logs back to PostgreSQL.

### 4. Examinations & Olympiads
- Lifecycle state machine: `Draft` $\rightarrow$ `Scheduled` $\rightarrow$ `In Progress` $\rightarrow$ `Under Review` $\rightarrow$ `Published`.
- Multi-section examination papers with customizable positive marks and negative penalty scoring.
- Immutable published answer keys with locked versioning (`v1`, `v2`).

### 5. On-Device OMR Scanning
- High-efficiency mobile camera scanner utilizing corner fiducial marker alignment.
- Local contour detection and bubble intensity analysis for rapid evaluation.
- **Human-in-the-Loop Review**: Scanned answer cards populate a verification queue before scores are officially published.

### 6. Automated Scoring & Competition Rankings
- Automated grading engine accounting for negative marks and unanswered items.
- **Standard Competition Ranking (1-2-2-4)**: Consistent skip convention for tied competitors.
- **Cross-Class Normalization**: Relative ranking computed by percentage rather than raw points.
- **Deterministic Tie-Breaking**: Ordered section prioritization (e.g., Achievers Section $\rightarrow$ Mathematical Reasoning $\rightarrow$ Logical Reasoning).

### 7. Resource Library & Notices
- Curated competition literature (e.g., *Problem-Solving Strategies*, *Pre-College Mathematics*).
- Downloadable study materials and problem sets categorized by subject and class.
- Role-targeted announcement feed (broadcast to All, Facilitators, or Students).

---

## Environment Configuration

Copy [`.env.example`](.env.example) to configure environment variables. Refer to [`docs/context.md`](docs/context.md) §29:

```bash
cp .env.example .env
```

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Client (Public) | Supabase project URL |
| `SUPABASE_ANON_KEY` | Client (Public) | Supabase public anonymous API key (safe in client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server / Edge | Secret administrative key for Edge Functions (**never ship in app**) |
| `SUPABASE_JWT_SECRET` | Server / Edge | Secret key for JWT signature validation |
| `SUPABASE_STORAGE_BUCKET` | Storage | Storage bucket name for materials and scans (`jmox-files`) |
| `UPSTASH_REDIS_REST_URL` | Edge Functions | Upstash Redis REST endpoint for leaderboard cache & rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Edge Functions | Upstash Redis REST bearer token |
| `FCM_PROJECT_ID` | Notifications | Firebase Cloud Messaging project identifier |
| `FCM_SERVER_KEY` | Notifications | FCM server key for push notification dispatch |

---

## Getting Started

### Prerequisites

- **Flutter SDK**: `^3.16.0` or later ([Install Flutter](https://docs.flutter.dev/get-started/install))
- **Dart SDK**: `^3.0.0` or later
- **Target Environments**:
  - **Web**: Google Chrome / Chromium
  - **Android**: Android Studio & Android SDK (API Level 24+)
  - **iOS**: macOS with Xcode 15+ and CocoaPods

### 1. Install Dependencies

```bash
cd apps
flutter pub get
```

### 2. Run Application Locally

#### Run in Chrome (Web)
```bash
cd apps
flutter run -d chrome
```

#### Run on Android Device / Emulator
```bash
cd apps
flutter run -d android
```

#### Run with Custom Supabase Credentials
```bash
cd apps
flutter run -d chrome \
  --dart-define=SUPABASE_URL=https://your-project.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Automated Tests

```bash
cd apps
flutter test
```

### 4. Build for Production

#### Build Static Web Bundle
```bash
cd apps
flutter build web --release
# Production build is generated in apps/build/web/
```

#### Build Android APK / App Bundle
```bash
cd apps
flutter build apk --release
flutter build appbundle --release
```

---

## Documentation Index

The [`docs/`](docs/) directory is the authoritative source of truth for all requirements, data schemas, UI designs, and security policies:

| Document | Purpose & Key Topics |
| :--- | :--- |
| [**`context.md`**](docs/context.md) | **Authoritative Master Vision**: 30 core rules, architectural principles (§24), domain models, and constraints. |
| [**`requirements.md`**](docs/requirements.md) | **Product Requirements Document**: Role specifications, functional modules, and non-functional requirements. |
| [**`database-design.md`**](docs/database-design.md) | **Data Schema & Security**: Complete entity definitions, UUID keys, multi-tenancy columns, and RLS policies. |
| [**`architecture-api.md`**](docs/architecture-api.md) | **Technical Architecture**: Client-Supabase topology, Edge Functions interface, and offline sync mechanics. |
| [**`ui-ux-design.md`**](docs/ui-ux-design.md) | **UI/UX Guidelines**: Material 3 dark design tokens, screen hierarchy, and responsive layouts for Web and Mobile. |
| [**`security-testing-deployment.md`**](docs/security-testing-deployment.md) | **Security & Operations**: Encryption standards, RLS verification, testing matrix, and CDN deployment workflows. |
| [**`audit-notes.md`**](docs/audit-notes.md) | **Divergence & Decision Log**: Historical record of architectural evolutions and implementation notes. |

---

## License

Internal and institutional use only. All rights reserved.