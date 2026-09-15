# JMOX Management System

Junior Mathematics Olympiad (JMO) Management System — a Flutter application backed by FastAPI for managing students, teachers, classes, batches, attendance, olympiad assessments, OMR-based and manual evaluation, results, rankings, awards, and reporting.

## Architecture

- **Client**: Flutter (Android-first; structured for future Flutter platforms)
- **Backend**: FastAPI (Python) on Railway/Fly.io/Render
- **Database**: PostgreSQL via Supabase (with Supavisor connection pooling)
- **Object Storage**: Supabase Storage (S3-compatible)
- **Cache/Queue**: Upstash Redis (rate limiting, sessions, job queue)
- **Email**: Resend / SendGrid

## Monorepo Structure

```
jmox/
├── apps/
│   └── android/                # Flutter application (Android-first)
├── server/                     # FastAPI backend
│   ├── app/
│   │   ├── api/v1/             # API routes
│   │   ├── core/               # Framework-independent business logic
│   │   ├── models/             # SQLAlchemy ORM models
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   ├── services/           # Application services
│   │   ├── auth/               # JWT authentication and token lifecycle
│   │   ├── workers/            # Background job definitions
│   │   └── db/                 # Database session + migrations
│   └── tests/                  # Unit and integration tests
├── docs/                       # Documentation (source of truth)
├── docker-compose.yml          # Local development services
├── .env.example                # Environment variable template
└── README.md
```

## Quick Start (Development)

### Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for backend)
- Flutter 3.16+ and Dart 3+

### 1. Start Local Infrastructure

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)

### 2. Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env  # Edit with local values
alembic upgrade head
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 3. Flutter Client Setup

```bash
cd apps/android
flutter pub get
flutter analyze
flutter test
flutter run
```

The Flutter client uses the FastAPI base URL configured in the app's runtime configuration. Do not put backend secrets in the Flutter bundle.

## Documentation

All requirements, architecture, database design, UI/UX, and security specifications are in the [`docs/`](./docs) directory:

- [`requirements.md`](./docs/requirements.md) — Product requirements and functional specs
- [`architecture-api.md`](./docs/architecture-api.md) — System architecture and API specification
- [`database-design.md`](./docs/database-design.md) — Complete database schema
- [`ui-ux-design.md`](./docs/ui-ux-design.md) — Flutter UI/UX and interaction specification
- [`security-testing-deployment.md`](./docs/security-testing-deployment.md) — Security, testing, and deployment guide
- [`context.md`](./docs/context.md) — Context audit with critical fixes and decisions

## Key Features

- Student & teacher management with Admin-only account creation
- Class/batch/academic year management with enrollment history
- Offline-capable Flutter attendance with deterministic conflict resolution
- Olympiad paper creation with sections, questions, answer keys, and versioning
- Manual and OMR-based evaluation (async worker)
- Automated scoring with negative marking support
- Rankings with standard competition ranking (1-2-2-4) and percentage-based cross-class ranking
- Published results are immutable with historical snapshots
- Audit logging for all state changes
- Reports and exports (PDF, Excel)
- Awards and certificate generation

## License

Internal use only.