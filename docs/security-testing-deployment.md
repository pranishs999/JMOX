# JMO Management System — Security, Testing & Deployment

> Combined security specification, testing strategy, and deployment guide.
> Derived from: [requirements.md](requirements.md) · [architecture-api.md](architecture-api.md) · [context.md](context.md)

---

# Part 1: Security

## 1.1 Authentication

### Password Hashing

| Parameter    | Value                                    |
|--------------|------------------------------------------|
| Algorithm    | Argon2id                                 |
| Memory cost  | 64 MB                                    |
| Iterations   | 3                                        |
| Parallelism  | 4                                        |
| Salt         | 16 bytes, randomly generated per password|

Never store plaintext passwords. Never log passwords. Never return password hashes in API responses.

### Flutter Authentication (JWT)

| Token          | Lifetime  | Storage                           |
|----------------|-----------|-----------------------------------|
| Access token   | 15 min    | In-memory only                    |
| Refresh token  | 30 days   | `flutter_secure_storage` backed by platform secure storage |

- Access token: JWT (HS256) containing `user_id`, `role`, `exp`, `iat`.
- Refresh token: opaque token, stored in DB, rotated on each use.
- On logout: revoke refresh token in DB.
- On account deactivation: revoke all refresh tokens.
- **Never** store access or refresh tokens in `SharedPreferences`.

### Account Activation Flow

1. Admin creates account → `User.status = invited`
2. System generates time-limited token (24 hours), sends email
3. Teacher clicks link → activation page
4. Teacher sets password → `User.status = active`
5. Expired tokens: teacher requests new invite via Admin

### Password Reset Flow

1. User submits email to `/auth/forgot-password`
2. If email exists, system generates time-limited token (1 hour), sends email
3. User clicks link → reset page → sets new password
4. Token is single-use — invalidated after use
5. Do not reveal whether email exists (same response regardless)

---

## 1.2 Transport and Request Protection

- The Flutter client sends the access token in the `Authorization: Bearer` header.
- The API rejects missing, expired, malformed, or revoked tokens.
- All traffic uses HTTPS in staging and production.
- Request timeouts and retry behavior are explicit; retries must not duplicate state-changing operations.
- CSRF is not required because the client does not authenticate with cookies.

---

## 1.3 Rate Limiting

| Endpoint Group    | Limit                  | Window | Store   |
|-------------------|------------------------|--------|---------|
| `/auth/login`     | 5 attempts             | 15 min | Redis   |
| `/auth/forgot-password` | 3 requests       | 1 hour | Redis   |
| General API       | 100 requests           | 1 min  | Redis   |
| File uploads      | 10 uploads             | 5 min  | Redis   |

- Rate limits keyed by IP + user_id (if authenticated).
- Return `429 Too Many Requests` with `Retry-After` header.
- Counters stored in Upstash Redis (not in application memory).

---

## 1.4 Input Validation

| Layer    | Mechanism                                                  |
|----------|------------------------------------------------------------|
| Client   | Flutter form validators and typed request models           |
| Server   | Pydantic v2 models on every endpoint                       |
| Database | Constraints, CHECK constraints, ENUM types                 |

**Rules:**
- All string inputs: trim whitespace, enforce max length.
- All IDs in URL params: validate UUID format before query.
- All date inputs: validate format, reject future dates where inappropriate.
- No raw SQL — always use parameterized queries via SQLAlchemy ORM.
- HTML/script in text fields: sanitize on output, not input (store raw, render escaped).

---

## 1.5 Server-Side Authorization

Authorization is enforced **server-side on every request**, not by hiding UI elements.

```python
# Example: Teacher can only access assigned batches
async def authorize_batch_access(
    batch_id: UUID,
    current_user: User,
    db: AsyncSession,
) -> Batch:
    batch = await db.get(Batch, batch_id)
    if not batch:
        raise HTTPException(404)
    if current_user.role == "admin":
        return batch
    # Teacher must be assigned to this batch
    assignment = await db.execute(
        select(TeacherBatch).where(
            TeacherBatch.teacher_id == current_user.teacher.id,
            TeacherBatch.batch_id == batch_id,
            TeacherBatch.removed_date.is_(None),
        )
    )
    if not assignment.scalar_one_or_none():
        raise HTTPException(403, "Not assigned to this batch")
    return batch
```

**Key rules:**
- Admin: full access to all resources within their institution.
- Teacher: read/write scoped to assigned batches only.
- All queries include `institution_id` filter (multi-tenancy readiness).
- Publishing/unpublishing results: Admin only.
- Creating/deactivating user accounts: Admin only.

---

## 1.6 Secure File Uploads

| Check              | Requirement                                           |
|--------------------|-------------------------------------------------------|
| File type          | Whitelist: JPEG, PNG, PDF, CSV, XLSX                  |
| MIME validation    | Validate magic bytes, not just extension               |
| Max file size      | Photos: 5 MB. OMR scans: 10 MB. CSV/Excel: 20 MB     |
| Filename           | Sanitize: strip path separators, replace with UUID     |
| Storage            | Supabase Storage (S3-compatible), never local filesystem|
| Access             | All access through API (signed URLs), never direct     |
| Virus scanning     | **Assumption:** Deferred to v2; not in v1 scope        |

---

## 1.7 HTTPS & Transport Security

- All traffic over HTTPS. HTTP redirects to HTTPS.
- HSTS header: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- API responses include: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`
- CORS: configure only if a future Flutter web target is enabled; Android traffic is controlled through HTTPS and bearer authentication.

---

## 1.8 Secret Management

| Secret                    | Storage                              |
|---------------------------|--------------------------------------|
| Database URL              | Environment variable (not in code)   |
| JWT signing key           | Environment variable                 |
| Session secret            | Environment variable                 |
| Supabase keys             | Environment variable                 |
| Email API key             | Environment variable                 |
| Redis URL                 | Environment variable                 |

- **Never** commit secrets to git. Use `.env` for local dev (in `.gitignore`), platform env vars for production.
- Provide `.env.example` with placeholder values.
- Rotate secrets if any are exposed.

---

## 1.9 Audit Logging

Every state-changing operation creates an `AuditLog` entry:

```json
{
  "user_id": "uuid",
  "action": "update",
  "entity_type": "Attendance",
  "entity_id": "uuid",
  "before_value": { "status": "present" },
  "after_value": { "status": "absent" },
  "ip_address": "203.0.113.42",
  "is_conflict": false,
  "created_at": "2026-08-26T10:15:00Z"
}
```

- Audit logs are **append-only**. No update or delete operations.
- Offline sync conflicts logged with `is_conflict = true`.
- Retained indefinitely (no automatic purge in v1).

---

# Part 2: Testing

## 2.1 Testing Stack

| Layer          | Tool                                           |
|----------------|-------------------------------------------------|
| Backend unit   | pytest                                          |
| Backend integration | pytest + httpx (async) + test database     |
| Flutter unit   | `flutter test`                                  |
| Flutter widget | `flutter test` with widget bindings             |
| Flutter integration | Flutter integration test                   |
| API testing    | pytest + httpx                                  |

## 2.2 Test Categories

### Unit Tests (Core Business Logic)

Test the `server/app/core/` pure functions with no database or HTTP involved.

| Module           | What to Test                                                   |
|------------------|----------------------------------------------------------------|
| `scoring.py`     | Correct scoring, negative marking, unanswered questions, edge cases (all wrong, all unanswered, negative total score) |
| `ranking.py`     | Standard competition ranking (1-2-2-4), tie-breaking by section scores, cross-class percentage ranking, single-student edge case |
| `attendance.py`  | Dedup logic, conflict resolution (server-timestamp wins), status transitions |
| `results.py`     | Result calculation from answers + key, snapshot immutability validation, status transitions |
| `permissions.py` | Role checks, batch assignment checks, resource ownership      |

**Coverage target:** ≥ 90% for `core/` modules.

### Integration Tests (API Endpoints)

Test full request → response cycles against a test database.

| Category        | What to Test                                                     |
|-----------------|------------------------------------------------------------------|
| Auth            | Login, logout, token refresh, activation, password reset, invalid credentials, disabled account |
| CRUD            | Create, read, update, soft-delete for each entity                |
| Authorization   | Admin-only endpoints reject teacher, teacher can't access unassigned batches, public endpoints work without auth |
| Pagination      | Page size, page navigation, sort order, total count              |
| Filtering       | Filter by each supported parameter, combined filters             |
| Validation      | Missing required fields, invalid types, too-long strings, invalid UUIDs |

### Permission Tests

Dedicated test suite verifying the authorization matrix from [architecture-api.md](architecture-api.md):

```python
# Example test structure
class TestTeacherAuthorization:
    async def test_teacher_can_read_assigned_batch_students(self):
        ...
    async def test_teacher_cannot_read_unassigned_batch_students(self):
        ...
    async def test_teacher_cannot_create_student(self):
        ...
    async def test_teacher_cannot_publish_results(self):
        ...
    async def test_teacher_cannot_access_audit_logs(self):
        ...
    async def test_teacher_cannot_create_teacher(self):
        ...
```

### Database Tests

| Test                           | Verification                                         |
|--------------------------------|------------------------------------------------------|
| Unique constraints             | Duplicate attendance → IntegrityError                |
| Foreign key constraints        | Orphan prevention on delete                          |
| Soft-delete behavior           | `deleted_at` set, record still queryable             |
| Historical preservation        | Student transfer creates new record, old preserved   |
| Paper locking                  | Published paper rejects updates                      |
| Cascade behavior               | Deleting class → cascades to batches (or blocked)    |

### Attendance Tests

| Test                                          | Expected Outcome                       |
|-----------------------------------------------|----------------------------------------|
| Record attendance for student in session      | Created successfully                   |
| Record duplicate attendance (same student+session) | Rejected (unique constraint)      |
| Edit existing attendance record               | Updated with audit log                 |
| Offline sync — no conflict                    | Records created                        |
| Offline sync — conflict (different status)    | Server wins, conflict logged           |
| Bulk attendance — all present                 | All records created                    |
| Attendance for withdrawn student              | Rejected                              |
| Attendance for cancelled session              | Rejected                              |

### Scoring Tests

| Test                                          | Expected Outcome                       |
|-----------------------------------------------|----------------------------------------|
| All correct, no negative marking              | Full marks                             |
| All correct, with negative marking            | Full marks (no penalty for correct)    |
| Mix of correct and incorrect, no negative     | Sum of correct marks only              |
| Mix with negative marking                     | `correct×marks − incorrect×neg_marks`  |
| All wrong with negative marking               | Negative total score                   |
| All unanswered                                | Zero score                             |
| Empty paper (no questions)                    | Zero score, zero max                   |
| Section-wise score breakdown                  | Each section scored independently      |
| Percentage calculation                        | `(total_score / max_possible) × 100`  |

### Ranking Tests

| Test                                              | Expected Outcome                   |
|---------------------------------------------------|------------------------------------|
| Simple ranking (no ties)                          | Sequential: 1, 2, 3, 4            |
| Two students tied                                 | 1, 2, 2, 4 (skip 3)               |
| Three students tied                               | 1, 2, 2, 2, 5 (skip 3, 4)        |
| All students tied                                 | All rank 1                         |
| Tie broken by section scores                      | Higher Section A score ranked first|
| Still tied after section scores                   | Same rank                          |
| Cross-class ranking by percentage                 | Ranked by %, not raw score         |
| Cross-class: same percentage, different max marks | Tied at same rank                  |
| Single student                                    | Rank 1                             |

### Tie-Breaking Tests

Detailed tests for the tie-breaking algorithm:

```
Given: Two students with same total score
  And: Student A has Section A: 18/20, Section B: 16/20
  And: Student B has Section A: 15/20, Section B: 19/20
  Then: Student A ranked higher (first section score breaks tie)

Given: Two students with same total AND same section scores
  Then: Both receive same rank, next rank skips
```

### OMR Tests

| Test                                   | Expected Outcome                        |
|----------------------------------------|-----------------------------------------|
| Upload valid OMR image                 | Submission created, status = pending    |
| Upload invalid file type               | Rejected (422)                          |
| Upload exceeds size limit              | Rejected (413)                          |
| Process submission (mock worker)       | Extracted answers stored, status = needs_review |
| Confirm reviewed answers               | StudentAnswer records created           |
| Retry failed submission                | Status reset to pending                 |

### Security Tests

| Test                                          | Expected Outcome                       |
|-----------------------------------------------|----------------------------------------|
| Login with invalid credentials                | 401, no session/token created          |
| Access protected endpoint without auth        | 401                                    |
| Teacher accesses admin-only endpoint          | 403                                    |
| Missing or expired bearer token              | 401                                    |
| Rate limit exceeded on login                  | 429 after 5 attempts                   |
| Expired JWT access token                      | 401                                    |
| Expired refresh token                         | 401, must re-login                     |
| Disabled account login attempt                | 401 with specific message              |
| SQL injection in search parameter             | No injection (parameterized queries)   |
| XSS in text fields                            | Stored raw, rendered escaped           |
| File upload with spoofed extension            | Rejected (magic byte validation)       |

### Flutter Client Tests

| Test                                   | Scope                                   |
|----------------------------------------|-----------------------------------------|
| Login flow                             | Email + password → JWT stored → dashboard |
| Offline attendance                     | Mark attendance offline → sync when online |
| OMR camera capture                     | Camera → capture → preview → upload     |
| Sync indicator                         | Shows pending count, updates on sync    |
| Student and result flows               | Load, filter, edit, and render API data |
| Role-based navigation                  | Admin sees all items, teacher sees subset|

---

## 2.3 Critical Test Checklist

Before any release, all of these must pass:

- [ ] Login works for both admin and teacher in the Flutter client
- [ ] Teacher cannot access resources outside assigned batches
- [ ] Teacher cannot publish results
- [ ] Attendance dedup enforced (same student + same session)
- [ ] Offline attendance syncs correctly with conflict logging
- [ ] Score calculation handles negative marking correctly
- [ ] Ranking uses standard competition ranking (1-2-2-4)
- [ ] Cross-class ranking uses percentage, not raw score
- [ ] Tie-breaking follows section-order precedence
- [ ] Published results are immutable (reject edits via API)
- [ ] Student transfer preserves `class_at_time_of_exam` on existing results
- [ ] Paper/answer key locked after result publication (reject edits)
- [ ] Audit log created for every state-changing operation
- [ ] Soft-deleted students still appear in historical results
- [ ] Bearer token validation and refresh work for state-changing requests
- [ ] Rate limiting active on auth endpoints
- [ ] File upload rejects invalid types and oversized files
- [ ] Disabled user account cannot log in
- [ ] Password reset flow works end-to-end

---

# Part 3: Deployment

## 3.1 Infrastructure

```mermaid
graph LR
    subgraph Flutter
        FLUTTER["Flutter Android Client<br/>(release build)"]
    end

    subgraph "Railway / Fly.io / Render"
        API["FastAPI Server"]
        WORKER["OMR Worker"]
    end

    subgraph Supabase
        DB["PostgreSQL<br/>(Supavisor pooling)"]
        STORE["Storage<br/>(S3-compatible)"]
    end

    subgraph Upstash
        REDIS["Redis<br/>(rate limiting, sessions)"]
    end

    subgraph Email
        SMTP["Resend / SendGrid"]
    end

    FLUTTER -->|HTTPS + JWT| API
    API --> DB
    API --> STORE
    API --> REDIS
    API --> SMTP
    API -->|enqueue| WORKER
    WORKER --> DB
    WORKER --> STORE
```

### Component Hosting

| Component        | Host                          | Notes                                |
|------------------|-------------------------------|--------------------------------------|
| Flutter client   | Android build/release pipeline | Build from `apps/android/`           |
| FastAPI Server   | Railway / Fly.io / Render     | Always-on, Docker container          |
| OMR Worker       | Same host or separate process | Can be same Docker image, different entrypoint |
| PostgreSQL       | Supabase                      | Managed, with Supavisor connection pooling |
| Object Storage   | Supabase Storage              | S3-compatible API                    |
| Redis            | Upstash                       | Serverless Redis, pay-per-request    |
| Email            | Resend or SendGrid            | Transactional email only             |

---

## 3.2 Environment Variables

### Backend (FastAPI)

```bash
# Application
APP_ENV=production                          # development | staging | production
APP_SECRET_KEY=<random-64-char-string>      # Application signing
APP_ALLOWED_ORIGINS=<configured-origins>    # Optional; used only if a browser client is enabled

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/dbname?sslmode=require
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=10

# Redis
REDIS_URL=rediss://default:token@host:6379

# Supabase Storage
SUPABASE_URL=https://project.supabase.co
SUPABASE_SERVICE_KEY=<service-role-key>
STORAGE_BUCKET=jmox-files

# JWT
JWT_SECRET_KEY=<random-64-char-string>
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
JWT_REFRESH_TOKEN_EXPIRE_DAYS=30

# Email
EMAIL_PROVIDER=resend                       # resend | sendgrid | smtp
EMAIL_API_KEY=<api-key>
EMAIL_FROM=noreply@example.com

# OMR Worker
OMR_STORAGE_PREFIX=omr-scans/
OMR_WORKER_CONCURRENCY=4

# Institution (v1 single-tenant)
DEFAULT_INSTITUTION_ID=<uuid>
```

### Flutter client

Configure the API base URL through the Flutter build/runtime configuration. Keep it free of secrets:

```bash
flutter build apk --dart-define=API_BASE_URL=https://api.example.com/api/v1
```

---

## 3.3 Environment Separation

| Setting                | Development           | Staging               | Production            |
|------------------------|-----------------------|-----------------------|-----------------------|
| `APP_ENV`              | `development`         | `staging`             | `production`          |
| Database               | Local Docker Postgres | Supabase (staging project) | Supabase (prod project) |
| Redis                  | Local Docker Redis    | Upstash (staging)     | Upstash (production)  |
| Email                  | Console/log output    | Sandbox/test mode     | Live delivery          |
| CORS origins           | Disabled unless needed | Configured if needed | Configured if needed   |
| Debug mode             | Enabled               | Enabled               | Disabled              |
| Detailed error messages| Yes                   | Yes                   | No (generic only)     |

---

## 3.4 Production Configuration

### Flutter client

1. Set the production API URL through `--dart-define` or the platform build configuration
2. Run `flutter analyze` and `flutter test`
3. Build the signed Android artifact with `flutter build appbundle`
4. Distribute through the institution's approved Android release channel
5. Never include database, storage, email, or signing secrets in the Flutter bundle

### Railway / Fly.io / Render (Backend)

1. Deploy from `server/` directory using `Dockerfile`
2. Set all environment variables
3. Configure health check: `GET /health`
4. Set minimum instances: 1 (always-on)
5. Configure custom domain for API
6. Enable HTTPS (automatic)

### Supabase (Database + Storage)

1. Create project in target region
2. Get connection string (pooled via Supavisor)
3. Run Alembic migrations: `alembic upgrade head`
4. Create storage bucket `jmox-files`
5. Configure bucket policies (private, API-only access)

### Upstash Redis

1. Create Redis database in same region as backend
2. Get connection URL (`rediss://...`)
3. Set max memory policy: `allkeys-lru`

---

## 3.5 Database Backups

| Type              | Frequency  | Retention  | Method                         |
|-------------------|------------|------------|--------------------------------|
| Automated backup  | Daily      | 7 days     | Supabase built-in (Pro plan)   |
| Point-in-time     | Continuous | 7 days     | Supabase WAL archiving         |
| Manual backup     | Per release| Indefinite | `pg_dump` before migrations    |

**Before every production migration:**
1. Take manual backup: `pg_dump`
2. Run migration on staging first
3. Verify staging
4. Run on production
5. Verify production
6. Keep backup for 30 days minimum

---

## 3.6 Monitoring & Logging

### Application Logging

| Log Level | Usage                                                    |
|-----------|----------------------------------------------------------|
| ERROR     | Unhandled exceptions, failed DB queries, external service failures |
| WARNING   | Rate limit hits, auth failures, validation rejections    |
| INFO      | Request/response (method, path, status, duration, user_id), background job completion |
| DEBUG     | Development only — query details, full request bodies    |

**Structured logging:** JSON format with `timestamp`, `level`, `message`, `request_id`, `user_id`, `path`.

### Monitoring

| What                  | Tool                              | Alert Threshold         |
|-----------------------|-----------------------------------|-------------------------|
| API uptime            | Render/Railway built-in or UptimeRobot | < 99.5% over 24h  |
| Response time (p95)   | Application metrics               | > 2 seconds             |
| Error rate (5xx)      | Log aggregation                   | > 1% of requests        |
| Database connections  | Supabase dashboard                | > 80% pool utilization  |
| Redis memory          | Upstash dashboard                 | > 80% of limit          |
| OMR job queue depth   | Application metrics               | > 50 pending jobs       |
| Failed OMR jobs       | Application metrics               | > 5 in 1 hour           |

---

## 3.7 Deployment Checklist

### Pre-Deployment

- [ ] All tests pass (`pytest`, `flutter analyze`, `flutter test`)
- [ ] Critical test checklist passes (see §2.3)
- [ ] No known critical or high bugs
- [ ] Database migration tested on staging
- [ ] Environment variables set for target environment
- [ ] Manual backup of production database taken
- [ ] `.env.example` updated if new env vars added
- [ ] API documentation updated if contracts changed

### Deployment

- [ ] Deploy database migration first (if any)
- [ ] Deploy backend
- [ ] Verify backend health check passes
- [ ] Build and distribute the Flutter client
- [ ] Verify the Flutter client authenticates and connects to API

### Post-Deployment

- [ ] Smoke test: login as admin and teacher
- [ ] Verify critical flows: attendance, answer entry, results
- [ ] Check error logs for unexpected errors
- [ ] Monitor response times for 30 minutes
- [ ] Verify OMR worker is processing jobs (if applicable)

### Rollback Plan

1. **Flutter client:** Distribute the previous signed Android artifact
2. **Backend:** Redeploy previous Docker image
3. **Database:** If migration is reversible, run `alembic downgrade -1`. If not, restore from backup.

---

*Cross-references: [requirements.md](requirements.md) · [architecture-api.md](architecture-api.md) · [database-design.md](database-design.md) · [ui-ux-design.md](ui-ux-design.md)*
