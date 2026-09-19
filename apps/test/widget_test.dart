// JMO Management System — Basic Widget Test
import 'package:flutter_test/flutter_test.dart';
import 'package:jmox_app/main.dart';

void main() {
  testWidgets('App loads successfully', (WidgetTester tester) async {
    await tester.pumpWidget(const JmoxApp());
    expect(find.byType(JmoxApp), findsOneWidget);
  });
}
