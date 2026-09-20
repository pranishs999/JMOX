# JMOX Unified Cross-Platform App (`apps/`)

Unified Flutter client for the Junior Mathematics Olympiad Management System (JMOX), supporting **Web**, **Android**, and **iOS** from a single Dart codebase.

> Primary documentation and architecture specifications live at the repository root: [`../README.md`](../README.md) and [`../docs/`](../docs/).

---

## Workspace Structure

```text
apps/
├── lib/
│   ├── main.dart                  # Application entry point & theme configuration
│   ├── api/                       # API client interfaces
│   ├── models/                    # Data models (Student, Facilitator, Class, Batch, Olympiad, Result)
│   ├── router/                    # Declarative routing via GoRouter
│   ├── screens/                   # UI Screens organized by domain
│   │   ├── academics/             # Subject and curriculum management
│   │   ├── assessment/            # Results view & on-device OMR scanning
│   │   ├── attendance/            # Attendance session marking & sync
│   │   ├── auth/                  # Unified multi-role login
│   │   ├── dashboard/             # Role-aware dashboard & metrics
│   │   ├── resources/             # Learning materials, problem books, notices
│   │   └── students/              # Student directory & credentials
│   ├── services/                  # Business logic (Supabase, Auth, Offline sync)
│   └── widgets/                   # App shell, navigation drawer, reusable components
├── android/                       # Android native host configuration
├── ios/                           # iOS native host configuration
├── web/                           # Web static assets (manifest, favicon, index.html)
├── pubspec.yaml                   # Flutter dependencies & metadata
└── test/                          # Widget and unit tests
```

---

## Running Locally

Ensure Flutter SDK (>=3.16.0) is installed:

```bash
# Fetch dependencies
flutter pub get

# Run on Chrome (Web)
flutter run -d chrome

# Run on connected Android device / emulator
flutter run -d android

# Run with custom Supabase credentials
flutter run -d chrome \
  --dart-define=SUPABASE_URL=https://your-project.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=your-anon-key
```

## Building for Production

```bash
# Web static deployment bundle (outputs to build/web/)
flutter build web --release

# Android APK / App Bundle
flutter build apk --release
flutter build appbundle --release
```

## Running Tests

```bash
flutter test
```
