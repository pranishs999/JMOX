import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const JmoxMobileApp());
}

class JmoxMobileApp extends StatelessWidget {
  const JmoxMobileApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'JMO Management System',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.purple,
        scaffoldBackgroundColor: const Color(0xFF0A0A0A),
        colorScheme: const ColorScheme.dark(
          primary: Colors.purpleAccent,
          secondary: Colors.purple,
          surface: Color(0xFF161616),
          background: Color(0xFF0A0A0A),
        ),
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}
