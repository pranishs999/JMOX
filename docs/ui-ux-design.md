# JMO Management System — UI/UX Design Specification

> Detailed UI/UX specification for React Web application and Flutter Android application.
> Source of truth: [context.md](context.md) | Divergence Log: [audit-notes.md](audit-notes.md)

---

## 1. Design Principles

1. **Clean & Professional Aesthetics**: Dense, scannable data layouts, dark/light contrast options, clear visual typography hierarchy (Inter/Roboto font stack).
2. **Role-Aware Dashboards**: Dynamic sidebar and action surfaces tailored to Admin, Teacher (Facilitator), and Student permissions.
3. **Optimized Data Tables**: Dense tables with column sorting, quick search, multi-select filters, public ID badges, and pagination.
4. **Credential Visibility Flow**: Dedicated UI feedback modals when creating Teachers/Students showing auto-generated login credentials and public IDs.
5. **Mobile Field Work Efficiency**: Touch-friendly Flutter interface on Android, featuring offline sync banners, camera OMR scanning guides, and batch attendance toggles.

---

## 2. Web Application Structure (React + Vite)

### 2.1 Global Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Logo  |  Search...    [🔔 3]  [Public ID / Avatar ▼]        │
├──────────────┬──────────────────────────────────────────────┤
│ 📊 Dashboard │  Breadcrumbs: Dashboard > Students            │
│ 👨‍🎓 Students  ├──────────────────────────────────────────────┤
│ 👨‍🏫 Teachers  │  Students Directory                          │
│ 🏫 Classes   │  [Search Name/ID] [Filter Class ▼] [+ Add]    │
│ 📚 Subjects  │ ┌─────────┬──────────────┬───────┬─────────┐ │
│ 📝 Olympiads │ │ Public ID│ Name         │ Class │ Action  │ │
│ 📑 OMR Review│ ├─────────┼──────────────┼───────┼─────────┤ │
│ 📖 Materials │ │STU-98214│ Alex Mercer  │ Gr 8  │ [View]  │ │
│ 🔔 Notices   │ └─────────┴──────────────┴───────┴─────────┘ │
└──────────────┴──────────────────────────────────────────────┘
```

---

### 2.2 Navigation Maps by Role

#### Admin Portal Navigation
- **Overview**: Dashboard, Performance Analytics, System Audit Logs
- **People**: Student Directory, Teacher Directory, Guardian Records
- **Academic Structure**: Academic Years, Classes, Batches, Subjects
- **Attendance**: Attendance Sessions, Session Logs, Conflict Review
- **Assessment**: Olympiad Events, Question Papers, Answer Keys, OMR Verification, Results & Rankings
- **Resources**: Learning Materials, Recommended Books, System Notifications
- **Settings**: Custom Fields, Institute Profile, Role Configuration

#### Teacher Portal Navigation
- **Overview**: Teacher Dashboard
- **My Batches**: Assigned Batches, Student Lists, Class Rosters
- **Attendance**: Session Marking (Web/Mobile)
- **Evaluation**: Manual Answer Entry, OMR Scanning & Verification
- **Results**: Batch Rankings & Score Breakdown
- **Resources**: Learning Materials Uploader, Recommended Books

#### Student Portal Navigation
- **Overview**: Student Home Dashboard
- **Academics**: My Classes, Enrolled Subjects, Batch Schedule
- **Attendance**: My Attendance History & Monthly Percentage
- **Assessments**: Published Olympiad Results, Rank Cards, Certificates
- **Resources**: Download Notes & Material, Recommended Book Catalog
- **Notices**: Personal Notification Feed

---

### 2.3 Key Interface Screens & User Flows

#### 2.3.1 Entity Creation & Credential Generation Modal
When an Admin registers a new Student or Teacher, an interactive credential modal presents the generated credentials:

```
┌─────────────────────────────────────────────────────────┐
│  Teacher Account Created Successfully                   │
├─────────────────────────────────────────────────────────┤
│  Full Name:      Sarah Jenkins                          │
│  Public ID:      TCH-41029                              │
│  Email:          s.jenkins@jmo.org                      │
│                                                         │
│  Auto-Generated Login Password:                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  k9#M7xP2w                                  [📋] │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  [ ] Send login instructions via email                  │
│                                                         │
│  [ Print Credentials ]                  [ Done ]        │
└─────────────────────────────────────────────────────────┘
```

#### 2.3.2 OMR Verification Interface
Screen used by Admins and Teachers to review low-confidence OMR scans:

```
┌─────────────────────────────────────────────────────────┐
│ OMR Submission #8412 — Review & Verification           │
├────────────────────────────┬────────────────────────────┤
│ Scanned Sheet Image        │ Bubble Reading Matrix      │
│                            │                            │
│  ┌──────────────────────┐  │ Q1: [A] [B] (C) [D] ✓      │
│  │ (A) (B) (●) (D)      │  │ Q2: [A] [●] [C] [D] ✓      │
│  │                      │  │ Q3: [●] [B] [●] [D] ⚠️    │
│  │ ⚠️ Q3 double-marked  │  │     Low confidence!       │
│  │                      │  │     Select option: [C ▼]  │
│  └──────────────────────┘  │ Q4: [A] [B] [C] [●] ✓      │
│                            │                            │
│ [ Reject & Rescan ]        │ [ Confirm & Save Score ]   │
└────────────────────────────┴────────────────────────────┘
```

#### 2.3.3 Results & Ranking Leaderboard
Dynamic leaderboard view with section-level score breakdowns and export options:

| Rank | Student Name | Public ID | Class | Sec A (20) | Sec B (30) | Total Score | Award / Rank Card |
|------|--------------|-----------|-------|------------|------------|-------------|-------------------|
| 🥇 1 | Rohan Sharma | STU-10492 | Gr 8  | 20.0       | 28.0       | 48.0 / 50   | Gold Medal        |
| 🥈 2 | Priya Patel  | STU-10834 | Gr 8  | 18.0       | 27.0       | 45.0 / 50   | Silver Medal      |
| 🥉 3 | David Kim    | STU-11029 | Gr 8  | 19.0       | 25.0       | 44.0 / 50   | Bronze Medal      |

---

## 3. Mobile Application Structure (Flutter Android)

### 3.1 Mobile Screen Hierarchy
- **Login Screen**: Supports credentials login for Teachers & Students.
- **Home Dashboard**: Displays assigned batches, quick attendance button, upcoming sessions.
- **Attendance Screen**:
  - Offline indicator pill (`🟢 Online` / `🟠 Offline (3 items queued)`).
  - Quick student status toggle switches (`Present`, `Absent`, `Late`, `Excused`).
  - Batch "Mark All Present" button.
- **OMR Scanner**:
  - Live camera overlay with alignment box guides for positioning OMR sheets.
  - Auto-capture trigger on bounding box detection.
- **Results & Profile**: Student rank view and profile settings.

---

## 4. Design System Tokens

- **Primary Colors**:
  - Deep Navy (`#0F172A`) — Primary Navigation & Headers
  - Indigo Accent (`#4F46E5`) — Buttons, Active Toggles, Focus states
  - Success Emerald (`#059669`) — Present Attendance, Passed Results
  - Warning Amber (`#D97706`) — Pending Sync, Needs Review
  - Danger Rose (`#E11D48`) — Absent, Failed Verification
- **Typography**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`.
- **Iconography**: Lucide React Icons (Web) & Material Design Icons (Flutter).

---

## 5. Document Cross-References

- System Requirements: [requirements.md](requirements.md)
- Architecture Divergences: [audit-notes.md](audit-notes.md)
- Complete Database Schema: [database-design.md](database-design.md)
- System Architecture & API: [architecture-api.md](architecture-api.md)
