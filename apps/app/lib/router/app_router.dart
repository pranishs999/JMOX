// JMO Management System — Declarative App Router
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/app_shell.dart';
import '../screens/auth/login_screen.dart';
import '../screens/dashboard/home_dashboard.dart';
import '../screens/students/students_screen.dart';
import '../screens/academics/subjects_screen.dart';
import '../screens/attendance/attendance_screen.dart';
import '../screens/assessment/omr_scanner_screen.dart';
import '../screens/assessment/results_screen.dart';
import '../screens/resources/resources_screens.dart';

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
          path: '/students',
          builder: (context, state) => const StudentsScreen(),
        ),
        GoRoute(
          path: '/teachers',
          builder: (context, state) => const StudentsScreen(), // Reuses student/facilitator directory layout
        ),
        GoRoute(
          path: '/classes',
          builder: (context, state) => const SubjectsScreen(),
        ),
        GoRoute(
          path: '/batches',
          builder: (context, state) => const SubjectsScreen(),
        ),
        GoRoute(
          path: '/subjects',
          builder: (context, state) => const SubjectsScreen(),
        ),
        GoRoute(
          path: '/attendance',
          builder: (context, state) => const AttendanceScreen(),
        ),
        GoRoute(
          path: '/olympiads',
          builder: (context, state) => const ResultsScreen(),
        ),
        GoRoute(
          path: '/results',
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
          builder: (context, state) => const NotificationsScreen(),
        ),
        GoRoute(
          path: '/audit-logs',
          builder: (context, state) => const AuditLogsScreen(),
        ),
        GoRoute(
          path: '/omr-scanner',
          builder: (context, state) => const OmrScannerScreen(),
        ),
      ],
    ),
  ],
);
