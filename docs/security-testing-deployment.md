# JMO Management System — Security, Testing & Deployment

> Combined security specification, testing strategy, and deployment guide.
> Source of truth: [context.md](context.md) | Divergence Log: [audit-notes.md](audit-notes.md)

---

# Part 1: Security Specification

## 1.1 Authentication & Password Security

### Password Hashing Parameters
- **Algorithm**: Argon2id
- **Memory Cost**: 64 MB
- **Time Iterations**: 3
- **Parallelism**: 4
- **Salt**: 16-byte cryptographically secure random salt per user.

### Dual Provisioning & Generated Passwords
- When creating a Teacher or Student account with auto-generated credentials, passwords are created using Python's `secrets` module (8+ random alphanumeric characters).
- Generated passwords are hashed with Argon2id prior to database storage. Plaintext passwords are never logged or stored in database tables.

### Web SPA Authentication (Cookies)
- **Session Cookie**: `session_id` (`HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/`, `Max-Age=28800`).
- **CSRF Token**: `csrf_token` (`Secure`, `SameSite=Strict`, `Path=/`). Included in response headers and verified on state-changing requests (`X-CSRF-Token`).

### Mobile App Authentication (JWT)
- **Access Token**: Short-lived JWT (15-minute expiration) signed via HS256 algorithm.
- **Refresh Token**: Long-lived token (30-day expiration) stored securely in Android Keystore via `flutter_secure_storage`. Revokable by server upon account deactivation.

---

## 1.2 Authorization & RBAC

- **Server-Side Enforcement**: Permissions checked on every API route handler via FastAPI dependency injection (`get_current_active_user`, `require_admin`, `require_teacher_batch`).
- **Resource Scoping**: Teachers can only access attendance, student rosters, and OMR scores for batches explicitly assigned to them in `TeacherBatch`.

---

# Part 2: Testing Strategy

```mermaid
graph TD
    subgraph Backend Testing
        UT_BE[Pytest Unit Tests<br/>(Scoring, Tie-breaking, Dedup)]
        IT_BE[Pytest Integration Tests<br/>(FastAPI Endpoints + Async Postgres)]
    end

    subgraph Frontend Testing
        UT_FE[Vitest Component Tests<br/>(React UI Components)]
        E2E_FE[CORS & Auth Flow Verification]
    end

    subgraph Mobile Testing
        UT_MOB[Flutter Unit & Widget Tests<br/>(SQLite Sync & Screen Render)]
    end
```

## 2.1 Backend Tests (`server/tests`)
- **Unit Tests**: Test core scoring functions, section-based tie-breaking algorithms, and attendance conflict handlers in isolation without database IO.
- **Integration Tests**: Test FastAPI REST routes with a live PostgreSQL test database using `httpx.AsyncClient`.

```bash
# Execute backend test suite
cd server
pytest tests/
```

## 2.2 Web Application Tests (`apps/web`)
- **Component Tests**: Execute component unit tests using Vitest and React Testing Library.

```bash
# Execute web test suite
cd apps/web
npm run test
```

---

# Part 3: Deployment & Operations

## 3.1 Local Development Runner (`run.sh`)

The system provides a root `run.sh` runner script that automates local setup and service startup:

```bash
#!/usr/bin/env bash
# run.sh — One-click launcher for JMOX local environment

set -e

echo "Starting Postgres and Redis containers..."
docker-compose up -d

echo "Running Alembic migrations..."
cd server
source .venv/bin/activate
alembic upgrade head

echo "Seeding dummy data..."
python scripts/seed_dummy_data.py

echo "Launching FastAPI server..."
uvicorn app.main:app --reload --port 8000 &

echo "Launching React Web SPA..."
cd ../apps/web
npm run dev &

wait
```

## 3.2 Production Deployment Architecture

- **React Web SPA**: Deployed to Vercel CDN or Static Web Server.
- **FastAPI API Server**: Deployed as an always-on container service on Railway, Fly.io, or Render.
- **OMR Worker**: Deployed as a background worker process consuming OMR jobs from Redis.
- **PostgreSQL Database**: Deployed on Supabase or managed Cloud SQL instance with connection pooling enabled.

---

## 4. Document Cross-References

- System Requirements: [requirements.md](requirements.md)
- Architecture Divergences: [audit-notes.md](audit-notes.md)
- Complete Database Schema: [database-design.md](database-design.md)
- REST API Reference: [architecture-api.md](architecture-api.md)
- UI/UX Design Specification: [ui-ux-design.md](ui-ux-design.md)
