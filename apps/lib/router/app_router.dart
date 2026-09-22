// JMO Management System — Declarative App Router
import 'package:go_router/go_router.dart';
import '../widgets/app_shell.dart';
import '../screens/auth/login_screen.dart';
import '../screens/dashboard/home_dashboard.dart';
import '../screens/admin/institute_crud_screens.dart';
import '../screens/students/students_screen.dart';
import '../screens/facilitators/facilitators_screen.dart';
import '../screens/attendance/attendance_screen.dart';
import '../screens/assessment/omr_scanner_screen.dart';
import '../screens/assessment/results_screen.dart';
import '../screens/assessment/problem_sets_screen.dart';
import '../screens/assessment/online_exams_screen.dart';
import '../screens/resources/resources_screens.dart';
import '../screens/notifications/notifications_management_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    ShellRoute(
      builder: (context, state, child) => AppShell(child: child),
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const HomeDashboard(),
        ),
        GoRoute(
          path: '/institutes',
          builder: (context, state) => const InstituteCrudScreen(),
        ),
        GoRoute(
          path: '/students',
          builder: (context, state) => const StudentsScreen(),
        ),
        GoRoute(
          path: '/facilitators',
          builder: (context, state) => const FacilitatorsScreen(),
        ),
        GoRoute(
          path: '/attendance',
          builder: (context, state) => const AttendanceScreen(),
        ),
        GoRoute(
          path: '/problem-sets',
          builder: (context, state) => const ProblemSetsScreen(),
        ),
        GoRoute(
          path: '/examinations/online',
          builder: (context, state) => const OnlineExamsScreen(),
        ),
        GoRoute(
          path: '/examinations/omr',
          builder: (context, state) => const OmrScannerScreen(),
        ),
        GoRoute(
          path: '/examinations/results',
          builder: (context, state) => const ResultsScreen(),
        ),
        GoRoute(
          path: '/materials',
          builder: (context, state) => const MaterialsScreen(),
        ),
        GoRoute(
          path: '/books',
          builder: (context, state) => const BooksScreen(),
        ),
        GoRoute(
          path: '/notifications',
          builder: (context, state) => const NotificationsManagementScreen(),
        ),
        GoRoute(
          path: '/audit-logs',
          builder: (context, state) => const AuditLogsScreen(),
        ),
      ],
    ),
  ],
);
