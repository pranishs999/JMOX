# JMOX — Project Context

> **Project:** Junior Mathematics Olympiad (JMO) Management System  
> **Product name:** JMOX  
> **Specification:** v2.0  
> **Status:** Architecture and core requirements confirmed  
> **Purpose:** Institutional management system for Junior Mathematics Olympiad operations

---

## 1. Project Summary

JMOX is a Flutter-first management system for running the Junior Mathematics Olympiad. Android is the v1 release target, with the backend and client boundaries kept portable to future Flutter platforms.

The system manages:

- Students
- Teachers
- Classes
- Batches
- Academic years
- Sessions
- Attendance
- Monthly Mini Olympiads
- Annual Full Olympiad
- Olympiad papers
- Paper versions
- Sections
- Syllabus
- Topics
- Questions
- Question options
- Answer keys
- Student answers
- Manual evaluation
- OMR scanning and review
- Assessment results
- Rankings
- Student performance
- Academic history
- Awards
- Certificates
- Reports
- Exports
- User accounts
- Authentication
- Authorization
- Audit logs
- System settings
- Custom student fields

JMOX is intended for real institutional use. Data correctness, security, reliable assessment calculations, and historical preservation are more important than visual polish.

---

## 2. Product Principles

Priority order:

1. Data correctness
2. Security
3. Permission control
4. Reliable assessment calculations
5. Easy teacher workflows
6. Historical data preservation
7. API reliability
8. Mobile support
9. Performance
10. Visual polish

### Absolute rules

- Never sacrifice data integrity for UI convenience.
- Never trust client-side authorization.
- Important business logic must live on the backend.
- Historical academic and Olympiad records must be preserved.
- Published results must not silently change.
- Published-paper/answer-key history must be immutable.
- Do not use fake buttons or mock data in place of real functionality.
- Incomplete functionality must be explicitly marked as incomplete.
- Do not invent requirements.

---

# 3. Users and Roles

## 3.1 Admin

Admin has full system access.

Admin can manage:

- Students
- Teachers
- Classes
- Batches
- Teacher/student assignments
- Academic years
- Olympiads
- Papers
- Sections
- Questions
- Answer keys
- Evaluation
- Results
- Rankings
- Attendance
- Syllabus
- Topics
- Awards
- Certificates
- Reports
- Exports
- Users
- Custom fields
- Settings
- Audit logs

### Account provisioning

Admin is the sole authority for account creation.

There is no public registration.

---

## 3.2 Teacher

Teacher can:

- View assigned batches
- View students in permitted batches
- Record attendance
- View attendance history
- Enter student answers
- Upload OMR sheets
- Review OMR results
- Confirm evaluation
- View assigned Olympiad results
- View student performance
- Generate permitted reports

Teacher must never access or modify unrelated batches or administrative data.

The backend must enforce permissions. Hiding UI controls is not sufficient.

---

## 3.3 Student

### v1 rule

Students do **not** have accounts and do **not** log in.

---

# 4. Role Model

v1 has exactly two fixed application roles:

```text
admin
teacher
```

Do not build a configurable Role/Permission management system unless the specification is explicitly revised.

Permissions are enforced server-side in FastAPI.

---

# 5. Academic Structure

## 5.1 Classes

Initial classes:

- Class 1
- Class 2
- Class 3

Classes are data-driven and must not be hard-coded.

Admin must be able to create additional classes later.

---

## 5.2 Batches

A batch is a teacher-managed group of students.

The system must support:

- Multiple batches per teacher
- Different classes per teacher
- Multiple students per batch
- Teacher assignment
- Student assignment
- Historical batch assignments

Do not assume:

- one teacher = one batch
- one batch = one class

---

## 5.3 Academic Years

Academic years are first-class entities.

Student enrollment, class membership, batch membership, sessions, and attendance should preserve academic-year history.

---

# 6. JMO Schedule

Default JMO schedule:

- 2 classes per week
- 2 hours per class

Sessions belong to JMO teaching sessions, not to a generic school timetable.

Default model:

```text
Week N
  ├── Session 1
  └── Session 2
```

Sessions are auto-generated per batch from the weekly schedule.

Manual overrides must support holidays and cancellations.

---

# 7. Attendance

## 7.1 Attendance states

Allowed states:

- Present
- Absent
- Late
- Excused

## 7.2 Teacher workflow

```text
Login
→ My Batches
→ Select Batch
→ Select Session/Date
→ Mark Students
→ Save
```

## 7.3 Rules

- Prevent duplicate attendance for the same student + session.
- Attendance is historical.
- Attendance is auditable.
- Student profile must show attendance totals and percentage.

Student attendance summary:

- Present count
- Absent count
- Late count
- Excused count
- Attendance percentage

---

# 8. Student Records

## 8.1 Personal information

Student fields:

- public student ID
- first name
- middle name
- last name
- date of birth
- gender
- photo
- phone
- email
- address

## 8.2 Guardian information

- name
- relationship
- phone
- email
- address

## 8.3 JMO information

- class
- batch
- enrollment date
- status
- teacher
- academic history

Allowed student statuses:

```text
Active
Inactive
Graduated
Withdrawn
```

## 8.4 Performance

Student profile must support:

- Attendance
- Olympiad participation
- Scores
- Percentages
- Rankings
- Section performance
- Topic performance
- Awards
- Certificates
- Academic history
- Improvement over time

---

# 9. Student Custom Fields

Admin must be able to create flexible custom student fields.

Examples:

- School Name
- Previous Olympiad
- Special Notes
- Emergency Contact
- Custom Identifier

Do not hard-code every future student field into the Student table.

### Custom field rules

- Fields are soft-deleted/deprecated.
- Never hard-delete fields that may have historical values.
- Changing a custom field's type creates a new field rather than mutating the existing field.
- Historical CustomFieldValue records must remain valid.

---

# 10. Historical Data Preservation

Historical data is a core requirement.

When a student changes:

- class
- batch
- teacher
- academic year

the previous information remains accessible.

Historical Olympiad results must remain tied to the student's state at the time of the exam.

A later class/batch change must never rewrite a published historical result.

---

# 11. Olympiad Types

JMOX supports two assessment types:

## Monthly Mini Olympiad

Recurring monthly assessment.

## Annual Full Olympiad

Yearly major assessment.

Both must use the same flexible assessment architecture.

---

# 12. Olympiad Paper

Each Olympiad may have different papers for different classes.

Paper configuration includes:

- name
- class
- Olympiad
- time limit
- total marks
- sections
- questions
- syllabus
- answer key

Papers are versioned.

Important fields include:

- version
- locked_at

### Immutability rule

Once any linked result is published:

- paper becomes immutable
- answer key becomes immutable
- future edits require a new version
- historical results continue using the old version

Never modify a published paper in-place.

---

# 13. Paper Sections

Sections are configurable.

A section may contain:

- name
- description
- number of questions
- marks per question
- total marks
- topics
- question types

Do not hard-code section names.

Possible examples:

- Logical Reasoning
- Mathematical Reasoning
- Everyday Mathematics
- Achievers Section

These are examples, not fixed system sections.

---

# 14. Example Class 1 Paper

Reference example only:

```text
Logical Reasoning       10 questions × 1 = 10
Mathematical Reasoning  10 questions × 1 = 10
Everyday Mathematics    10 questions × 1 = 10
Achievers Section        5 questions × 2 = 10

Total: 35 questions
Total: 40 marks
Time: 1 hour
```

Different classes may use different paper structures and different total marks.

---

# 15. Question Bank

Questions support:

- question text
- options
- correct answer
- marks
- negative marks
- section
- topic
- difficulty
- explanation
- image
- diagram

Question images are stored in Supabase Storage.

The system must support:

- text-only questions
- image questions
- diagram questions

---

# 16. Question Types

v1 priority:

- Multiple Choice Question
- OMR-compatible question

The assessment engine should be extensible so additional question types can be added later without rewriting the scoring system.

---

# 17. Negative Marking

Each question may define:

```text
negative_marks
```

Default:

```text
0
```

Never assume all questions are worth one mark.

Scoring must read the configured:

- positive marks
- negative marks

from question configuration.

Example:

```text
Correct    = +2
Incorrect  = -0.5
Unanswered = 0
```

The example is illustrative only.

---

# 18. Syllabus and Topics

Syllabus is data-driven.

Syllabus must be configurable per class.

Topics can be associated with questions.

This enables:

- topic-level analysis
- topic mastery later
- long-term performance tracking

---

# 19. Assessment Format

v1 examinations are paper-based.

Students do not take the examination online.

Supported evaluation modes:

1. Manual answer entry
2. OMR scanning

---

# 20. Manual Answer Entry

Teacher enters student answers.

The system compares answers against the answer key.

System calculates:

- correct
- incorrect
- unanswered
- section score
- total score
- percentage
- rank

Scoring must use each question's configured marks and negative marks.

---

# 21. OMR Processing

OMR must run through the FastAPI backend.

Technology:

- OpenCV
- Python
- FastAPI background processing

Do not tightly couple OMR processing to the Flutter UI.

The same processing pipeline should support:

- Flutter camera capture
- Flutter image selection
- future scanning tools

---

# 22. OMR Submission States

Use explicit processing states:

```text
pending
processing
needs_review
failed
confirmed
```

The UI must reflect the actual processing state.

OMR failures must be recoverable.

Uncertain detections must be flagged per question for human review.

### Critical OMR rule

The system must never silently guess an uncertain answer.

OMR processing must never auto-publish results.

---

# 23. Flutter OMR Workflow

```text
Open Camera
→ Capture OMR
→ Detect Paper
→ Detect Answers
→ Upload/Process
→ Review
→ Confirm
```

Request camera permission only when required.

---

# 24. Student Answers

Every student answer belongs to:

- Student
- Olympiad
- Paper
- Question

The evaluation engine compares:

```text
student_answer
vs
correct_answer
```

Evaluation states:

- Correct
- Incorrect
- Unanswered

---

# 25. Section Performance

For each student and assessment, calculate section performance.

Example:

```text
Logical Reasoning       8/10
Mathematical Reasoning  7/10
```

Values may be stored or reproducibly derived.

---

# 26. Topic Performance

For each topic calculate:

- attempted
- correct
- incorrect
- score
- percentage

Topic performance supports long-term student analysis.

---

# 27. Results

Result lifecycle:

```text
Draft
→ Evaluated
→ Reviewed
→ Published
→ Locked
```

### Result rules

- OMR processing does not finalize a result.
- Teacher/Admin must confirm the result.
- Ordinary teachers cannot modify locked results.
- Admin can unlock.
- Unlocking and modifications are audited.

---

# 28. Published Result Snapshots

When a result is published, snapshot:

```text
class_at_time_of_exam
batch_at_time_of_exam
paper_version_id
```

These values are immutable after publication.

This guarantees that:

- later class changes do not alter history
- later batch changes do not alter history
- new paper versions do not alter old results

---

# 29. Rankings

Required ranking scopes:

- Overall
- Class-wise
- Batch-wise

## 29.1 Cross-class normalization

Different papers/classes may have different total marks.

Therefore cross-class ranking must use:

```text
percentage = score / total_marks × 100
```

Overall ranking is percentage-normalized.

Raw-score ranking may only be used within a single compatible paper/class scope.

---

# 30. Tie-Breaking

Tie-break sequence:

1. Higher Achievers Section score
2. Higher Mathematical Reasoning score
3. Higher Logical Reasoning score
4. If still tied, same rank

Ranking convention:

```text
1, 2, 2, 4
```

This is standard competition ranking.

Ranking must be deterministic and reproducible.

---

# 31. Student Performance

The student performance view should show the history across Mini and Full Olympiads.

Include:

- score
- percentage
- overall rank
- class rank
- batch rank
- section performance
- topic performance
- attendance
- improvement over time

---

# 32. Awards and Certificates

Student records support:

- awards
- certificates
- positions
- Olympiad achievements
- special recognition

Admin can add custom achievement records.

Certificate generation is a later/future enhancement unless explicitly implemented.

---

# 33. Reports

Required report types:

- Student Report
- Olympiad Report
- Attendance Report
- Class Report

Reports must respect user permissions.

---

# 34. Export

Supported exports:

- CSV
- Excel
- PDF

Export permissions must match the user's normal access permissions.

---

# 35. Dashboards

## Admin Dashboard

Display:

- total students
- total teachers
- total batches
- total classes
- upcoming Olympiad
- latest Mini Olympiad
- average attendance
- latest results
- recent activity

## Teacher Dashboard

Display:

- my batches
- my students
- today's attendance
- upcoming assessments
- recent results

Never expose unrelated data.

---

# 36. Global Search

Global search must cover:

- students
- teachers
- batches
- classes
- Olympiads
- assessments

Search results must always be filtered by the requesting user's permissions.

A search endpoint is not an authorization mechanism.

---

# 37. Flutter Application

Technology:

```text
Flutter 3.16+
Dart 3+
```

Deployment:

```text
Android v1
Future Flutter platforms
```

Application type:

- Touch-first and adaptive
- Phone and tablet layouts
- Permission-aware navigation
- REST API client

## Main navigation

```text
Dashboard

Batches

Assessment

Profile
  ├── Students
  ├── Attendance
  ├── Olympiads
  ├── Mini Olympiads
  ├── Full Olympiads
  ├── Papers
  ├── Questions
  ├── OMR Evaluation
  ├── Results
  └── Rankings

Classes & Batches

Teachers

Syllabus & Topics

Reports

Awards

Administration
  ├── Users
  ├── Custom Fields
  ├── Settings
  └── Audit Logs
```

---

# 38. Flutter Client Screens

Technology:

```text
Flutter 3.16+ / Dart 3+
```

Targets:

- Admin
- Teacher

Students have no login in v1.

## Core screens

- Login
- Dashboard
- My Batches
- Student List
- Attendance
- Student Profile
- OMR Camera
- Manual Answer Entry
- Result Review
- Student Performance
- Admin configuration screens

Administrative configuration is available in the Flutter client and remains protected by Admin-only server permissions.

---

# 39. Flutter Attendance

Attendance UI should be touch optimized.

Required controls:

- Student roster
- Present/Absent/Late toggles
- Mark All Present
- Save Attendance

---

# 40. Offline Support

Flutter should cache at minimum:

- assigned batches
- student lists
- relevant Olympiad data

Attendance should support offline operation where practical.

Flow:

```text
Record offline
→ Store locally
→ Connection returns
→ Synchronize
→ Server confirms
```

Synchronization must be idempotent.

Duplicate records must not be created.

---

# 41. Offline Conflict Policy

When the same record is changed offline and online before synchronization:

**Server timestamp wins.**

The losing offline change must:

- not be silently discarded
- be logged in AuditLog
- be flagged for manual review

---

# 42. Authentication

Authentication is owned entirely by FastAPI.

Do not use Supabase Auth as the source of identity.

There is one `User` table controlled by the backend.

---

# 43. Flutter Authentication

Flutter uses:

- short-lived JWT access token
- refresh token
- platform secure storage through `flutter_secure_storage`
- explicit token refresh and logout handling

The Flutter client and backend use the same authorization layer.

A user's access must be consistent across future Flutter targets.

---

# 45. Teacher Invite Flow

Admin creates an account shell containing:

- name
- email

Admin does not set the teacher's password.

Flow:

```text
Admin creates account
→ Time-limited email invite
→ Teacher opens invite
→ Teacher sets password
→ User becomes active
```

User status begins as:

```text
invited
```

then becomes:

```text
active
```

---

# 46. Password Reset

Password reset uses:

- email reset link
- time-limited token

There is no self-registration flow.

---

# 47. Account Deactivation

When a teacher leaves:

```text
User.status = disabled
```

Do not hard-delete the user.

Historical references must remain valid.

---

# 48. API Architecture

The API is versioned.

Base pattern:

```text
/api/v1/
```

Core route groups:

```text
/api/v1/auth
/api/v1/students
/api/v1/teachers
/api/v1/classes
/api/v1/batches
/api/v1/attendance
/api/v1/olympiads
/api/v1/papers
/api/v1/sections
/api/v1/questions
/api/v1/answers
/api/v1/omr
/api/v1/results
/api/v1/rankings
/api/v1/reports
/api/v1/awards
```

The API must be independent of the Flutter client.

---

# 49. Core Data Model

Minimum entities:

```text
User
Teacher
Student
Guardian

Class
Batch
TeacherBatch
StudentBatch

AcademicYear
Session
Attendance

Olympiad
OlympiadPaper
Section
Question
QuestionOption
AnswerKey

StudentAnswer
OMRSubmission
AssessmentResult
Ranking

Topic
Syllabus

Award
Certificate

CustomField
CustomFieldValue

AuditLog
```

---

# 50. Public IDs

`Student.public_id` and `Teacher.public_id` must be different from the internal database primary key.

Never expose sequential internal IDs externally.

Reason:

- prevents identifier enumeration
- improves security
- separates public identity from database implementation

Public IDs are generated when records are created.

---

# 51. Core Data Rules

The system must enforce:

- unique student IDs
- unique user accounts
- server-side permission checks
- historical enrollment records
- historical batch assignments
- no duplicate attendance
- questions belong to sections
- sections belong to papers
- papers belong to Olympiads
- student answers belong to an Olympiad/paper
- results are calculated from stored answers
- configured marks determine scoring
- configured negative marks determine penalties
- cross-class rankings are percentage-normalized
- published results cannot silently change
- published papers/answer keys cannot be mutated
- historical results remain available indefinitely

---

# 52. Security Requirements

Required controls:

- Secure password hashing
- JWT access/refresh tokens for Flutter
- Platform secure storage through `flutter_secure_storage`
- Session expiration
- Rate limiting
- Input validation
- Server-side authorization
- Role-based access control
- Audit logging
- Secure file uploads
- OMR file validation
- File size limits
- Path traversal protection
- HTTPS in production
- Public IDs instead of internal sequential IDs

Every protected endpoint must validate:

1. Who is the user?
2. What role do they have?
3. What resource are they accessing?
4. Are they allowed to read or modify it?

---

# 53. Audit Log

Audit important changes including:

- student changes
- teacher assignments
- batch assignments
- attendance changes
- question changes
- answer-key changes
- answer-key version creation
- OMR uploads
- OMR corrections
- result changes
- result publication
- result unlocking
- ranking changes
- user changes
- invite sent
- account activated
- account disabled
- permission-relevant changes

Audit record structure:

```text
User
Action
Entity
Entity ID
Timestamp
Previous Value
New Value
```

Audit logs cannot be edited by ordinary users.

For binary files, log the storage reference rather than raw bytes.

---

# 54. File Storage

Production file storage uses:

```text
Supabase Storage
```

Required file categories:

- student photos
- OMR scans
- certificates
- question images

Do not rely on local filesystem persistence in production.

Store file metadata/object references in Postgres.

---

# 55. Infrastructure

## Flutter client

```text
Flutter 3.16+ / Dart 3+
Android-first release
```

## Backend

```text
FastAPI + Python
```

Persistent host:

- Railway
- Fly.io
- Render

Do not deploy the FastAPI backend as a serverless function.

Reason:

- OMR processing may require longer execution
- background processing is needed
- persistent process behavior is preferred

## Database

```text
Supabase PostgreSQL
```

Always use Supabase connection pooling through Supavisor.

## Storage

```text
Supabase Storage
```

## OMR

```text
OpenCV
inside FastAPI
```

---

# 56. Environment Configuration

Use environment variables.

Example:

```text
APP_ENV
API_BASE_URL
PUBLIC_BASE_URL
DATABASE_URL
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET
JWT_SECRET
SESSION_SECRET
SMTP_*
```

Rules:

- Never commit secrets.
- Use separate development and production credentials/projects.
- Do not hard-code hostnames, IP addresses, ports, or filesystem paths.
- The Flutter client must never receive backend-only secrets.
- Hosting providers should be replaceable through configuration.

---

# 57. Codebase Architecture

Use a monorepo.

Business logic must be separated from framework code.

Preferred concept:

```text
core/
  database access
  validation
  scoring
  ranking
  domain rules

backend/
  FastAPI routes
  authentication
  HTTP adapters
  background tasks

apps/android/
  Flutter client
  api/
  models/
  screens/
  services/
  widgets/
```

Important:

Do not place critical business logic only in API route handlers.

The core layer should be reusable by future clients/services.

---

# 58. Reusable Flutter Components

Required reusable components include:

```text
AppShell
NavigationBar
NavigationRail
AppBar

SearchBar
FilterBar

StudentProfile
StudentForm
StudentCard

BatchSelector

AttendanceTable
AttendanceCalendar

OlympiadCard
PaperBuilder
SectionBuilder

QuestionEditor
QuestionImageUploader
AnswerKeyEditor

OMRUploader
OMRReview
AnswerEntry

ResultTable
RankingTable
PerformanceChart

ReportViewer
ExportDialog

ConfirmDialog
AuditLogTable

LoadingState
EmptyState
ErrorState
SnackBar
SyncIndicator
OfflineBanner
```

---

# 59. UI/UX Principles

The application must be:

- clean
- professional
- fast
- practical
- accessible
- responsive
- teacher-friendly

Avoid:

- excessive animation
- marketing-style hero sections
- excessive gradients
- excessive cards
- meaningless charts
- complicated navigation

Teacher workflows should require minimal interaction.

---

# 60. Primary Workflows

## Teacher Attendance

```text
Login
→ My Batches
→ Select Batch
→ Select Session
→ Mark Attendance
→ Save
```

## Teacher Olympiad

```text
Login
→ My Olympiads
→ Select Olympiad
→ Select Student
→ Upload OMR OR Enter Answers
→ Evaluate
→ Review
→ Confirm
```

## Admin

```text
Login
→ Create Academic Year
→ Create Classes
→ Create Batches
→ Create Teachers
→ Send Invites
→ Assign Teachers
→ Register Students
→ Assign Students
→ Create Olympiad
→ Create Paper
→ Configure Sections
→ Add Questions
→ Set Answer Key
→ Conduct Exam
→ Evaluate OMR
→ Review Results
→ Publish Rankings
```

---

# 61. Development Rules

Before modifying the project:

1. Read this file.
2. Inspect the existing implementation.
3. Understand current architecture.
4. Do not replace working code unnecessarily.
5. Do not invent requirements.
6. Keep business logic framework-independent where possible.
7. Validate all data server-side.
8. Reuse components.
9. Preserve historical records.
10. Keep API platform-independent.
11. Separate production and development configuration.
12. Never commit secrets.
13. Do not substitute mock data for required functionality.
14. Do not create fake buttons.
15. Mark incomplete features clearly.

---

# 62. Development Priority

## Phase 0 — Infrastructure

- Choose persistent FastAPI host
- Set up Supabase
- Set up pooled Postgres
- Set up Storage
- Verify pooled DB under concurrent load
- Create monorepo
- Create reusable core package

## Phase 1 — Foundation

- database
- authentication
- invite flow
- Flutter JWT client + token refresh
- users
- roles
- API
- classes
- batches

## Phase 2 — Students

- registration
- profiles
- guardians
- custom fields
- enrollment history
- batch assignment

## Phase 3 — Attendance

- sessions
- automatic session generation
- attendance
- history
- teacher workflow
- reports

## Phase 4 — Olympiad

- Olympiad management
- versioned papers
- sections
- topics
- questions
- negative marking
- answer keys

## Phase 5 — Evaluation

- manual answer entry
- automatic scoring
- negative marking
- OMR upload
- OMR recognition
- OMR review
- result confirmation
- result snapshots
- publish/lock

## Phase 6 — Ranking

- overall ranking
- class ranking
- batch ranking
- percentage normalization
- tie-breaking
- ranking publication

## Phase 7 — Performance

- performance dashboards
- topic analysis
- section analysis
- historical trends
- awards
- certificates

## Phase 8 — Reports

- student reports
- attendance reports
- Olympiad reports
- class reports
- CSV
- Excel
- PDF

## Phase 9 — Flutter Client

- authentication
- dashboard
- teacher batches
- students
- attendance
- manual answers
- OMR camera
- results

## Phase 10 — Production Hardening

- monitoring
- backups
- custom domains
- HTTPS
- production reliability

---

# 63. Flutter Technology Decision

Flutter is the confirmed client technology, with Android as the v1 target.

Reason:

- backend is API-first
- business logic is shared through the backend/core layer
- Flutter leaves a path to iOS, desktop, and web without replacing backend architecture

Do not replace Flutter with another client framework without revising the project decision.

---

# 64. Future Features

These are explicitly future features and should not be implemented unless requested:

- Student accounts
- Parent accounts
- Online examinations
- iOS application
- Desktop application
- Better OMR recognition
- Automated certificate generation
- Advanced analytics
- Topic mastery
- SMS notifications
- Email notifications
- Additional competition types
- Additional classes
- Multiple institutions

### Multi-tenancy readiness

Add a nullable:

```text
institution_id
```

to core tables now if the implementation follows the multi-institution-ready design.

Default it to the current single institution.

---

# 65. v1 Non-Goals

Do not build these in v1:

- Student login
- Parent portal
- Online student examination
- Online payments
- Chat
- Social feed
- Video classes
- School fee management
- Payroll
- Full school ERP

---

# 66. Definition of Done

JMOX v1 is considered complete when the production system supports:

- Admin workflows
- Teacher workflows
- Student CRUD
- Class/batch management
- Attendance
- Olympiad management
- Paper configuration
- Paper versioning
- Sections
- Questions
- Answer keys
- Manual evaluation
- OMR evaluation
- OMR review
- Scoring
- Negative marking
- Ranking
- Tie-breaking
- Result review
- Result publication
- Result locking
- Historical student records
- Performance analysis
- Reports
- Export
- Server-side permissions
- Audit logs
- Persistent storage
- Flutter client
- Android v1 release using the production API

---

# 67. Final System Model

```text
Students
   │
   ├── Classes
   │      └── Batches
   │             └── Teachers
   │                    └── Attendance
   │
   └── Olympiad
          │
          └── Paper
                │
                ├── Sections
                │      └── Topics
                │
                ├── Questions
                │      └── Answer Key
                │
                └── Student Answers
                        │
                        ├── Manual Evaluation
                        │
                        └── OMR Processing
                               │
                               └── Review
                                      │
                                      └── Confirm
                                             │
                                             └── Results
                                                    │
                                                    ├── Section Analysis
                                                    ├── Topic Analysis
                                                    ├── Ranking
                                                    └── Student History
                                                           │
                                                           ├── Performance
                                                           ├── Awards
                                                           ├── Certificates
                                                           └── Reports
```

---

# 68. Confirmed v1 Summary

```text
Users:
  Admin, Teachers

Account provisioning:
  Admin only

JMO:
  Junior Mathematics Olympiad

Initial classes:
  Class 1, Class 2, Class 3

Schedule:
  2 classes/week
  2 hours/class

Attendance:
  Teacher-recorded
  Per assigned batch

Assessments:
  Monthly Mini Olympiad
  Annual Full Olympiad

Exam format:
  Paper-based
  OMR-compatible

Evaluation:
  Manual answer entry
  OMR scanning
  Human review required

Questions:
  MCQ/OMR-compatible
  Text + images
  Negative marking supported

Papers:
  Class-specific
  Configurable
  Versioned

Rankings:
  Overall by normalized percentage
  Class-wise
  Batch-wise

Tie-breaking:
  Achievers
  Mathematical Reasoning
  Logical Reasoning
  Same rank if still tied
  Competition ranking: 1-2-2-4

Students:
  Full profile
  Guardians
  Attendance
  Assessments
  Rankings
  Academic history
  Awards/certificates
  Custom fields

Client:
  Flutter 3.16+ / Dart 3+
  Android-first

Backend:
  FastAPI
  Persistent hosting

Database:
  Supabase Postgres
  Supavisor pooling

Storage:
  Supabase Storage

OMR:
  OpenCV
  In-process FastAPI background processing

Architecture:
  Flutter client + FastAPI API
  Versioned REST API
  Platform-independent business logic

Student login:
  Not in v1

Parent portal:
  Not in v1
```

---

# 69. Golden Rule for AI Coding Agents

Treat this document as the project's authoritative product context.

When requirements conflict with implementation convenience:

**follow this document.**

When the existing code conflicts with this document:

1. Inspect the existing implementation.
2. Preserve working behavior where possible.
3. Identify the exact conflict.
4. Change the smallest necessary surface.
5. Preserve data and historical records.
6. Do not silently invent a new product requirement.

The backend/API/database are the authoritative system of record.

Flutter is the client.

Do not put business rules exclusively in the client.

Do not let UI behavior define authorization.

Do not let paper/class changes rewrite historical results.

Do not let OMR automatically publish unreviewed results.

Do not lose historical data.

Do not expose internal sequential database IDs.
