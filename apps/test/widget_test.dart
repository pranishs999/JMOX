// JMO Management System — Basic Widget Test
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:jmox_app/main.dart';
import 'package:jmox_app/services/auth_service.dart';

void main() {
  testWidgets('App loads successfully', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AuthService()),
        ],
        child: const JmoxApp(),
      ),
    );
    expect(find.byType(JmoxApp), findsOneWidget);
  });
}
