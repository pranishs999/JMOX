// JMO Management System — Pure Flutter Application Entrypoint
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'services/auth_service.dart';
import 'router/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Supabase Client with fallback local credentials
  try {
    await Supabase.initialize(
      url: const String.fromEnvironment('SUPABASE_URL', defaultValue: 'https://demo-jmox.supabase.co'),
      anonKey: const String.fromEnvironment('SUPABASE_ANON_KEY', defaultValue: 'demo-anon-key-jmox-2026'),
    );
  } catch (e) {
    debugPrint('Supabase init notice: Running with local mock fallback mode.');
  }

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthService()),
      ],
      child: const JmoxApp(),
    ),
  );
}

class JmoxApp extends StatelessWidget {
  const JmoxApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'JMO Management System',
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0A0A0A),
        colorScheme: const ColorScheme.dark(
          primary: Colors.white,
          secondary: Colors.amber,
          surface: Color(0xFF111111),
          background: Color(0xFF0A0A0A),
        ),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
    );
  }
}
