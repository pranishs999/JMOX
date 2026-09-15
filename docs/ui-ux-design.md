# JMOX — Flutter UI/UX Specification

> UI/UX specification for the Flutter client.
> Derived from [requirements.md](requirements.md), [context.md](context.md), and [architecture-api.md](architecture-api.md).

## 1. Product experience

JMOX is an operational tool for Admins and Teachers. The interface must make frequent teacher actions fast while keeping permissions, sync state, and irreversible actions explicit.

### Principles

1. **Clear before decorative** — use Material components, readable typography, and restrained color.
2. **Touch-first** — controls must be comfortable on phones used while teaching.
3. **Adaptive** — phone layouts use bottom navigation; wider tablets may use a navigation rail or drawer.
4. **Role-aware** — Admin and Teacher navigation are built from the server-provided role; hiding a control never replaces server authorization.
5. **Offline-aware** — every locally queued change shows its state and can be retried.
6. **Consistent language** — use Student, Batch, Session, Olympiad, Paper, Section, Result, and Sync consistently.
7. **Accessible** — support text scaling, semantic labels, sufficient contrast, predictable focus, and minimum touch targets.

## 2. Flutter application shell

```text
MaterialApp
└── AuthGate
    ├── LoginScreen
    └── AuthenticatedShell
        ├── AppBar
        ├── SyncStatusBanner (when needed)
        ├── NavigationBar (phone)
        └── NavigationRail / NavigationDrawer (tablet)
```

### 2.1 Theme

- Use Material 3 with a stable JMOX color scheme.
- Use semantic colors consistently: green for confirmed/synced, amber for review/pending, red for failed/destructive, blue for active/in-progress.
- Do not communicate status by color alone; include text or an icon.
- Use one type scale across the application and honor the platform text-scale setting.
- Use `SafeArea` and platform insets on every top-level screen.
- Keep destructive actions visually distinct and require confirmation.

### 2.2 Navigation

Phone navigation has four destinations:

| Destination | Purpose |
|---|---|
| Dashboard | Today's sessions, pending reviews, quick actions |
| Batches | Assigned batches, rosters, student profiles |
| Assessment | Answer entry, OMR, results, rankings |
| Profile | Account, sync settings, help, logout |

Admin-only destinations are available from the dashboard overflow/drawer:

```text
Students · Teachers · Academic Years · Classes · Batches
Olympiads · Papers · Answer Keys · Reports · Awards
Users · Custom Fields · Settings · Audit Logs
```

Teacher navigation is restricted to assigned batches and permitted assessment data. Navigation state must not assume that a resource is authorized; every API request still receives server-side authorization.

## 3. Shared screen behavior

Every screen must define these states:

| State | Required behavior |
|---|---|
| Loading | Show a skeleton or progress indicator in the content area; keep app navigation available |
| Empty | Explain what is empty and show an authorized next action |
| Offline | Show cached data where safe and explain which actions are queued |
| Error | Give a human-readable message and a retry action |
| Forbidden | Explain that the account cannot access the resource; do not expose hidden data |
| Success | Confirm the saved action without blocking the next workflow |

Use `SnackBar` for transient feedback and an inline message for errors that affect a form or screen. Do not silently catch failed writes.

## 4. Screen specifications

### 4.1 Login

- Email and password fields with validation.
- Password visibility toggle.
- Forgot-password action.
- No registration link; accounts are Admin-created.
- On success, load `/auth/me` and route by role.
- Store the refresh token only through secure platform storage.
- Show distinct messages for invalid credentials and disabled accounts without leaking account existence during reset requests.

### 4.2 Dashboard

**Admin view**

- Active student, teacher, batch, and class counts.
- Upcoming Olympiad and latest result status.
- Today's attendance overview.
- Recent audit activity.
- Quick actions: Add Student, Create Olympiad, Generate Report.

**Teacher view**

- Today's sessions with a primary Mark Attendance action.
- Assigned batch cards with student counts.
- Pending OMR review count.
- Sync status and a Sync Now action.
- Quick actions: Mark Attendance, Enter Answers, Scan OMR.

### 4.3 Batches and students

- Show assigned batches as cards on phones and cards/list on tablets.
- Each batch shows class, schedule, student count, and status.
- Student lists support search, cached roster display, photo thumbnail, name, and public ID.
- Teachers can view only assigned students.
- Admin actions include create, edit, transfer, withdraw, and export where authorized.

Student profile sections:

```text
Overview · Enrollment History · Attendance · Results
Performance · Awards and Certificates
```

### 4.4 Attendance

Workflow:

```text
Dashboard → Session → Batch Roster → Mark Status → Review → Save
```

- Preload the roster before opening the marking screen.
- Provide Present, Absent, Late, and Excused controls.
- Provide Mark All Present, then allow individual adjustments.
- Show a session summary: present, absent, late, and excused.
- Save as one idempotent batch operation.
- When offline, save to SQLite with a client operation ID and show Pending Sync.
- When synchronized, show Synced. On conflict, show the server value and a review action.
- Past sessions remain editable only where the role allows it; edits are audit logged.

### 4.5 Olympiads, papers, and answer keys

Admin screens support:

- Olympiad creation and status changes.
- Class-specific paper configuration.
- Sections with order, question count, marks, and negative marks.
- Question text, options, images, topic, and difficulty.
- Answer-key versions and lock status.

Locked papers and answer keys must show a persistent explanation:

> This version is locked because a result uses it. Create a new version to make changes.

### 4.6 Manual answer entry

```text
Olympiad → Paper → Student or Batch → Answer Grid → Review → Submit
```

- Render answer choices as large, selectable chips or radio controls.
- Include an explicit Unanswered/Clear action.
- Show `answered / total` progress.
- Preserve draft state locally only when the user can identify it clearly.
- Confirm before submitting a complete batch.
- The server calculates scores; the Flutter client never becomes the source of scoring truth.

### 4.7 OMR capture and review

Capture flow:

```text
Select Batch + Paper → Request Camera Permission
→ Camera Alignment Guide → Capture → Crop/Rotate
→ Upload → Pending → Processing → Needs Review
```

- Ask for camera permission only when the capture screen is opened.
- Use an alignment guide and show a retake action.
- Preserve the selected batch and paper in the capture context.
- Show upload progress and retry failed uploads.
- Never auto-confirm uncertain detections.

Review screen:

- Show the scan with zoom and the extracted answer list.
- Mark confidence as Confident, Uncertain, or Failed with text and icon.
- Provide Show Only Uncertain.
- Allow per-question corrections.
- Confirm All requires an explicit confirmation sheet.
- Confirming creates answer records; it does not publish a result.

### 4.8 Results and rankings

- Show result status: Draft, Reviewed, Published, Locked.
- Teachers can view permitted results; only Admin can publish or unpublish.
- Published records show the publication timestamp and actor.
- Rankings support Overall, Class, and Batch scopes.
- Cross-class views use percentage, not raw score, when papers differ.
- Ties show the same rank and a clear tie indicator.

### 4.9 Reports, awards, settings, and audit logs

- Reports show filters before generation and a visible progress state during generation.
- Download actions use API-provided files or signed URLs; never expose storage credentials.
- Awards show criteria, assignment source, and publication context.
- Settings and user management are Admin-only.
- Audit logs show timestamp, actor, action, entity, and before/after summary. Conflict records have a visible conflict marker.

## 5. Reusable Flutter components

| Component | Responsibility |
|---|---|
| `AppShell` | Authenticated navigation and adaptive layout |
| `RoleGuard` | UI visibility based on the loaded role, never authorization |
| `StatusBadge` | Text + icon status indicator |
| `LoadingState` | Skeleton/progress presentation |
| `EmptyState` | Empty explanation and authorized CTA |
| `ErrorState` | Error message and retry |
| `BatchCard` | Batch summary |
| `StudentListItem` | Student photo, name, and public ID |
| `AttendanceToggle` | Four-state attendance control |
| `SyncIndicator` | Synced, pending, syncing, conflict, failed |
| `OfflineBanner` | Persistent connectivity/queue message |
| `AnswerChoiceChip` | MCQ option and clear state |
| `QuestionAnswerList` | Manual entry list with progress |
| `OmrCaptureFrame` | Camera alignment overlay |
| `OmrReviewRow` | Extracted answer, confidence, and correction |
| `MetricCard` | Dashboard statistic |
| `FilterSheet` | Mobile filter selection |
| `ConfirmSheet` | Consequence-aware confirmation |
| `AppFormField` | Label, input, validation, and semantics |

## 6. Accessibility and responsive rules

- Minimum touch target: 48 logical pixels.
- All icon-only buttons require a tooltip and semantic label.
- All form fields have visible labels and announced validation errors.
- Do not use gesture-only actions for attendance or answer selection.
- Support screen readers through Flutter semantics.
- Support large text without clipping or hiding essential actions.
- Use high-contrast status colors and text labels.
- Phone: single-column content, bottom navigation, modal filter sheets.
- Small tablet: navigation rail, two-column dashboards where useful.
- Large tablet: drawer/rail plus split list/detail layouts.
- Tables become cards or horizontally scrollable layouts with student identity pinned first.

## 7. Teacher workflow targets

### Attendance

1. Open app.
2. Tap today's session.
3. Mark all present.
4. Adjust exceptions.
5. Save or queue offline.

Target: under two minutes for a 30-student batch.

### OMR

1. Open Assessment.
2. Select batch and paper.
3. Capture and upload.
4. Receive processing state.
5. Review uncertain answers.
6. Confirm.

Target: under 30 seconds per student in the review step when the scan is clear.

### Manual answer entry

1. Select Olympiad, paper, and student.
2. Tap answer chips.
3. Review completion count.
4. Submit for server scoring.

Target: under three minutes for a 40-question paper per student.

---

*Cross-references: [requirements.md](requirements.md) · [architecture-api.md](architecture-api.md) · [database-design.md](database-design.md) · [security-testing-deployment.md](security-testing-deployment.md)*