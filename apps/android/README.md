# JMOX Flutter Client

The JMOX client is an Android-first Flutter application for Admin and Teacher workflows. It communicates with the FastAPI backend and supports offline attendance, secure authentication, camera-based OMR capture, manual answer entry, result review, and performance views.

## Local development

```bash
flutter pub get
flutter analyze
flutter test
flutter run
```

## Client architecture

```text
lib/
├── api/                 # HTTP client and API configuration
├── models/              # JSON/domain models
├── screens/             # Feature screens
├── services/            # Authentication, offline sync, device services
├── widgets/             # Shared Flutter widgets
└── main.dart            # Application entry point
```

The current client uses Provider for state coordination, `http` for REST calls, `flutter_secure_storage` for tokens, SQLite for offline attendance, and the camera/image picker packages for OMR capture. Keep scoring, authorization, and historical-data rules in the backend.

## Platform scope

Android is the v1 release target. Keep platform-specific code behind services so the same Flutter architecture can later support iOS, desktop, or web without changing the FastAPI contract.

For Flutter guidance, see the [official Flutter documentation](https://docs.flutter.dev/).
