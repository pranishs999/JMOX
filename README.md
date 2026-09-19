# JMO Management System (JMOX)

> Junior Mathematics Olympiad Management System — a full-stack platform for managing students, teachers, classes, batches, attendance, olympiad assessments, OMR-based and manual evaluation, automated scoring, rankings, awards, and reporting.

---

## Architecture

```
┌──────────────────┐     HTTPS     ┌──────────────────────┐
│   React + Vite   │ ◄───────────► │   FastAPI (Python)    │
│   Web SPA        │               │   REST API Server     │
└──────────────────┘               ├──────────────────────┤
                                   │  OMR Worker (async)   │
┌──────────────────┐     HTTPS     │  OpenCV processing    │
│  Flutter Android │ ◄───────────► └──────────┬───────────┘
│  Mobile App      │                          │
└──────────────────┘               ┌──────────┼───────────┐
                                   │          ▼           │
                                ┌──┴────┐  ┌──────┐  ┌───┴──┐
                                │Postgres│  │Redis │  │Store │
                                └───────┘  └──────┘  └──────┘
```

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Web Frontend | React + Vite (TypeScript) | Admin/teacher SPA — dashboards, student/teacher management, attendance, results, rankings |
| Mobile App | Flutter (Android) | Teacher app — attendance, answer entry, OMR camera capture |
| Backend API | FastAPI (Python 3.14) | REST API, business logic, auth, background jobs |
| Database | PostgreSQL (asyncpg + SQLAlchemy) | Primary data store with Alembic migrations |
| Cache/Sessions | Redis | Rate limiting, session store, job queue |
| Object Storage | Supabase Storage (S3-compatible) | OMR scans, student photos, exports |
| Email | Resend / SendGrid / SMTP | Account invitations, password resets |

> **Vision document:** [`docs/context.md`](docs/context.md) describes the long-term product vision. Architecture divergences from that vision are tracked in [`docs/audit-notes.md`](docs/audit-notes.md).

---

## Monorepo Structure

```
JMOX/
├── apps/
│   ├── web/                        # React + Vite SPA
│   └── android/                    # Flutter Android app
├── server/                         # FastAPI backend
│   ├── app/
│   │   ├── api/v1/routes/          # REST endpoints (17 route modules)
│   │   ├── auth/                   # Authentication (Argon2id + cookies/JWT)
│   │   ├── core/                   # Business logic (scoring, ranking, permissions)
│   │   ├── models/                 # SQLAlchemy ORM models (10 model modules)
│   │   ├── schemas/                # Pydantic request/response schemas
│   │   ├── services/               # Application services (CRUD, public ID generation)
│   │   ├── workers/                # Background jobs (OMR processor)
│   │   ├── db/                     # Database session, Alembic migrations
│   │   └── utils/                  # Shared utilities
│   ├── tests/                      # pytest (unit + integration)
│   ├── flush_and_seed.py           # Database seed script (Super Admin)
│   └── requirements.txt            # Python dependencies
├── docs/                           # Project documentation (source of truth)
├── docker-compose.yml              # Local PostgreSQL + Redis
├── run.sh                          # One-click development startup
├── .env.example                    # Environment variable template
├── TODO_STATUS.md                  # Implementation status tracker
└── README.md
```

---

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Node.js 18+ (for web frontend)
- Flutter 3.16+ (for Android app)

### One-Command Startup

```bash
./run.sh
```

This script:
1. Checks prerequisites (Docker, Python, Node.js)
2. Starts PostgreSQL (port 5432) and Redis (port 6379) via Docker Compose
3. Creates/activates the Python virtual environment
4. Installs backend dependencies
5. Runs database migrations (`alembic upgrade head`)
6. Seeds the Super Admin account
7. Starts the FastAPI server with hot-reload

### Manual Setup

**1. Start infrastructure:**
```bash
docker-compose up -d    # PostgreSQL + Redis
```

**2. Backend:**
```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env     # Edit with local values
alembic upgrade head
python flush_and_seed.py    # Create Super Admin
uvicorn app.main:app --reload
```

- API server: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

**3. Web frontend:**
```bash
cd apps/web
npm install
npm run dev
```

- Web app: `http://localhost:5173`

**4. Android app:**
```bash
cd apps/android
flutter pub get
flutter run
```

### Default Super Admin

| Field | Value |
|-------|-------|
| Email | `jms.hric@gmail.com` |
| Password | `Mathforall@JMO369` |

---

## Key Features

### People Management
- Admin-only account creation (no self-registration)
- Student and teacher records with auto-generated public IDs (`JMO-YYYY-XXXX`)
- Login password generation for teachers and students on creation
- Guardian management linked to students
- Multi-identifier login (email, user public ID, teacher/student public ID)

### Academic Structure
- Academic years with active-year management
- Classes within academic years
- Batches within classes with schedule configuration
- Teacher-to-batch assignments with historical tracking
- Student enrollment with transfer and withdrawal support

### Attendance
- Batch-level session management (scheduled, completed, cancelled)
- Per-student attendance (present, absent, late, excused)
- Bulk "Mark All Present" with individual overrides
- Offline sync with server-wins conflict resolution
- Attendance rate statistics and reports

### Olympiad Assessment
- Olympiad lifecycle: Draft → Scheduled → In Progress → Completed
- Class-specific papers with sections and questions
- Multiple-choice questions (A/B/C/D) with per-question marks and negative marking
- Versioned answer keys with lock-on-publish
- Manual answer entry and OMR-based evaluation
- Human review required for OMR results (no auto-publishing)

### Scoring & Rankings
- Automated scoring with negative marking support
- Standard competition ranking (1-2-2-4 skip convention)
- Cross-class ranking by percentage (not raw score)
- Section-based tie-breaking (ordered by section priority)
- Published results are immutable — `class_at_time_of_exam` preserved in snapshots

### Reporting & Awards
- PDF and Excel report generation
- Batch attendance reports, student progress reports, olympiad result summaries
- Award criteria management (rank-based, percentage-based)
- Certificate generation

### Security & Audit
- Argon2id password hashing
- Dual auth: HTTP-only cookies (web) + JWT Bearer tokens (mobile)
- CSRF protection for web state-changing requests
- Redis-backed rate limiting on auth endpoints
- Comprehensive audit logging (append-only, before/after snapshots)
- Role-based access control: Admin (full), Teacher (assigned batches only)

---

## API Overview

All endpoints are under `/api/v1/`. Full specification in [`docs/architecture-api.md`](docs/architecture-api.md).

| Module | Prefix | Key Endpoints |
|--------|--------|--------------|
| Auth | `/auth` | login, logout, refresh, me, forgot-password, reset-password, activate |
| Students | `/students` | CRUD, transfer, withdraw, login-password generation |
| Teachers | `/teachers` | CRUD, deactivate, reactivate, resend-invite, login-password generation |
| Academic | `/academic-years`, `/classes`, `/batches` | CRUD with relationships |
| Attendance | `/attendance` | Batch marking, offline sync |
| Olympiads | `/olympiads` | CRUD with lifecycle management |
| Papers | `/papers`, `/sections`, `/questions` | Paper structure management |
| Answers | `/answers` | Manual answer entry |
| Results | `/results` | Calculate, publish, unpublish |
| Rankings | `/rankings` | Per-class, cross-class |
| OMR | `/omr` | Upload, review, confirm |
| Awards | `/awards` | Award criteria and assignment |
| Reports | `/reports` | PDF/Excel generation |
| Audit Logs | `/audit-logs` | Query audit trail |
| Custom Fields | `/custom-fields` | Dynamic field management |

---

## Documentation

| Document | Description |
|----------|-------------|
| [context.md](docs/context.md) | Long-term product vision and feature specifications |
| [requirements.md](docs/requirements.md) | Functional and non-functional requirements |
| [database-design.md](docs/database-design.md) | Complete database schema and entity relationships |
| [architecture-api.md](docs/architecture-api.md) | System architecture and REST API specification |
| [ui-ux-design.md](docs/ui-ux-design.md) | UI/UX design for web and Android |
| [security-testing-deployment.md](docs/security-testing-deployment.md) | Security, testing strategy, and deployment guide |
| [audit-notes.md](docs/audit-notes.md) | Architecture decisions and divergences from context.md |

---

## Testing

```bash
cd server
source .venv/bin/activate

# Run all tests
pytest

# Unit tests only (scoring, ranking, permissions, attendance)
pytest tests/unit/

# Integration tests (API endpoints, auth, database)
pytest tests/integration/
```

---

## License

Internal use only.