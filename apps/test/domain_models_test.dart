import 'package:flutter_test/flutter_test.dart';
import 'package:jmox_app/models/app_models.dart';
import 'package:jmox_app/services/supabase_service.dart';

void main() {
  group('JMOX Domain Models & Logic Tests', () {
    test('Student public ID and QR generation', () {
      final student = Student(
        id: 'stu-1',
        publicId: 'STU-10023',
        fullName: 'John Doe',
        email: 'john@example.com',
        className: 'Class 10',
        batchName: 'Batch Alpha',
        qrCodeData: 'JMOX:STUDENT:STU-10023:inst-1',
      );

      expect(student.publicId, startsWith('STU-'));
      expect(student.qrCodeData, contains('JMOX:STUDENT:'));
    });

    test('Olympiad section and block hierarchy supports null block_id for Section B', () {
      final sectionA = OlympiadSection(
        id: 'sec-a',
        name: 'SECTION A — EVERYDAY MATHEMATICS',
        blocks: [
          OlympiadBlock(id: 'blk-1', name: 'BLOCK 1 — EVERYDAY MATHEMATICS', sectionId: 'sec-a'),
          OlympiadBlock(id: 'blk-2', name: 'BLOCK 2 — MATHEMATICAL REASONING', sectionId: 'sec-a'),
        ],
      );

      final sectionB = OlympiadSection(
        id: 'sec-b',
        name: 'SECTION B — LOGICAL SECTION',
        blocks: [], // Direct questions under section
      );

      final sectionC = OlympiadSection(
        id: 'sec-c',
        name: 'SECTION C — ACHIEVERS SECTION',
        blocks: [
          OlympiadBlock(id: 'blk-3', name: 'BLOCK 3 — ACHIEVEMENT CORNER', sectionId: 'sec-c'),
          OlympiadBlock(id: 'blk-4', name: 'BLOCK 4 — PUZZLE CORNER', sectionId: 'sec-c'),
        ],
      );

      final questionInSecB = QuestionItem(
        id: 'q-standalone',
        questionNumber: 1,
        questionText: 'Logical Question',
        type: QuestionType.mcqSingle,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        blockId: null, // block_id is nullable for Section B
      );

      expect(questionInSecB.blockId, isNull);
      expect(sectionA.blocks.length, equals(2));
      expect(sectionB.blocks, isEmpty);
      expect(sectionC.blocks.length, equals(2));
    });

    test('Technician role strictly lacks academic mutation privileges', () {
      const role = UserRole.technician;
      
      expect(role.canPerformAcademicMutations, isFalse);
      expect(role.canEditMarks, isFalse);
      expect(role.canEditAttendance, isFalse);
      expect(role.canChangeResults, isFalse);
      expect(role.canAccessTechnicianDiagnostics, isTrue);
    });

    test('Standard Competition Ranking outputs 1, 2, 2, 4 pattern for tied scores', () {
      final scores = [
        {'id': 's1', 'score': 95.0},
        {'id': 's2', 'score': 90.0},
        {'id': 's3', 'score': 90.0},
        {'id': 's4', 'score': 85.0},
      ];

      // Sort descending
      scores.sort((a, b) => (b['score'] as double).compareTo(a['score'] as double));

      final ranks = <String, int>{};
      for (int i = 0; i < scores.length; i++) {
        if (i > 0 && scores[i]['score'] == scores[i - 1]['score']) {
          ranks[scores[i]['id'] as String] = ranks[scores[i - 1]['id'] as String]!;
        } else {
          ranks[scores[i]['id'] as String] = i + 1;
        }
      }

      expect(ranks['s1'], equals(1));
      expect(ranks['s2'], equals(2));
      expect(ranks['s3'], equals(2));
      expect(ranks['s4'], equals(4)); // Standard competition ranking skipped rank 3
    });

    test('SupabaseService supports deleting records and resetting passwords', () {
      final student = StudentModel(
        id: 'test-stu-100',
        publicId: 'STU-99001',
        fullName: 'Test Student',
        email: 'test@student.com',
        phone: '1234567890',
      );

      final facilitator = FacilitatorModel(
        id: 'test-fac-100',
        publicId: 'FAC-99001',
        fullName: 'Test Facilitator',
        email: 'test@facilitator.com',
        role: UserRole.facilitator,
      );

      final notification = NotificationModel(
        id: 'test-not-100',
        title: 'Test Notification',
        message: 'Broadcast content',
        targetRole: 'all',
        status: 'Scheduled',
        createdAt: '2026-09-22 08:00',
      );

      final service = SupabaseService();
      service.addStudent(student);
      service.addFacilitator(facilitator);
      service.addNotification(notification);

      expect(service.getStudents().any((s) => s.id == 'test-stu-100'), isTrue);
      expect(service.getFacilitators().any((f) => f.id == 'test-fac-100'), isTrue);
      expect(service.getNotifications().any((n) => n.id == 'test-not-100'), isTrue);

      // Password Reset
      service.resetStudentPassword('test-stu-100', 'newpass#123');
      final updatedStu = service.getStudents().firstWhere((s) => s.id == 'test-stu-100');
      expect(updatedStu.generatedPassword, equals('newpass#123'));

      service.resetFacilitatorPassword('test-fac-100', 'newpass#456');
      final updatedFac = service.getFacilitators().firstWhere((f) => f.id == 'test-fac-100');
      expect(updatedFac.generatedPassword, equals('newpass#456'));

      // Status toggle
      service.toggleNotificationStatus('test-not-100');
      final updatedNotif = service.getNotifications().firstWhere((n) => n.id == 'test-not-100');
      expect(updatedNotif.status, equals('Sent'));

      // Delete operations
      service.deleteStudent('test-stu-100');
      service.deleteFacilitator('test-fac-100');
      service.deleteNotification('test-not-100');

      expect(service.getStudents().any((s) => s.id == 'test-stu-100'), isFalse);
      expect(service.getFacilitators().any((f) => f.id == 'test-fac-100'), isFalse);
      expect(service.getNotifications().any((n) => n.id == 'test-not-100'), isFalse);
    });

    test('SupabaseService supports full Academic Structure CRUD operations', () {
      final service = SupabaseService();

      // 1. Institute CRUD
      final inst = service.getInstitutes().first;
      final updatedInst = InstituteModel(
        id: inst.id,
        name: 'Updated JMO Academy',
        code: inst.code,
        activeAcademicYear: inst.activeAcademicYear,
        timezone: 'UTC+5:45',
        contactEmail: 'contact@jmo.org',
        status: inst.status,
      );
      service.updateInstitute(updatedInst);
      expect(service.getInstitutes().first.name, equals('Updated JMO Academy'));

      // 2. Academic Year CRUD
      final newAy = AcademicYearModel(id: 'ay-test-1', name: '2027-2028', startDate: '2027-04-01', endDate: '2028-03-31', status: 'active', isActive: true);
      service.addAcademicYear(newAy);
      expect(service.getAcademicYears().any((ay) => ay.id == 'ay-test-1'), isTrue);

      final updatedAy = AcademicYearModel(id: 'ay-test-1', name: '2027-2028 Extended', startDate: '2027-04-01', endDate: '2028-04-30', status: 'active', isActive: true);
      service.updateAcademicYear(updatedAy);
      expect(service.getAcademicYears().firstWhere((ay) => ay.id == 'ay-test-1').name, equals('2027-2028 Extended'));

      service.deleteAcademicYear('ay-test-1');
      expect(service.getAcademicYears().any((ay) => ay.id == 'ay-test-1'), isFalse);

      // 3. Class CRUD
      final newClass = ClassModel(id: 'cls-test-1', name: 'Grade 12', academicYearId: 'ay-1', sortOrder: 5);
      service.addClass(newClass);
      expect(service.getClasses().any((c) => c.id == 'cls-test-1'), isTrue);

      final updatedClass = ClassModel(id: 'cls-test-1', name: 'Grade 12 Advanced', academicYearId: 'ay-1', sortOrder: 5);
      service.updateClass(updatedClass);
      expect(service.getClasses().firstWhere((c) => c.id == 'cls-test-1').name, equals('Grade 12 Advanced'));

      service.deleteClass('cls-test-1');
      expect(service.getClasses().any((c) => c.id == 'cls-test-1'), isFalse);

      // 4. Batch CRUD
      final newBatch = BatchModel(id: 'bat-test-1', name: 'Batch Epsilon', classId: 'cls-1', className: 'Grade 12', scheduleDays: 'Tue, Thu');
      service.addBatch(newBatch);
      expect(service.getBatches().any((b) => b.id == 'bat-test-1'), isTrue);

      final updatedBatch = BatchModel(id: 'bat-test-1', name: 'Batch Epsilon Prime', classId: 'cls-1', className: 'Grade 12', scheduleDays: 'Daily');
      service.updateBatch(updatedBatch);
      expect(service.getBatches().firstWhere((b) => b.id == 'bat-test-1').name, equals('Batch Epsilon Prime'));

      service.deleteBatch('bat-test-1');
      expect(service.getBatches().any((b) => b.id == 'bat-test-1'), isFalse);

      // 5. Subject CRUD
      final newSubject = SubjectModel(id: 'sub-test-1', name: 'Combinatorics', code: 'MATH-COMB', classId: 'cls-1', description: 'Advanced Counting');
      service.addSubject(newSubject);
      expect(service.getSubjects().any((s) => s.id == 'sub-test-1'), isTrue);

      final updatedSubject = SubjectModel(id: 'sub-test-1', name: 'Advanced Combinatorics', code: 'MATH-COMB2', classId: 'cls-1', description: 'Advanced Counting II');
      service.updateSubject(updatedSubject);
      expect(service.getSubjects().firstWhere((s) => s.id == 'sub-test-1').name, equals('Advanced Combinatorics'));

      service.deleteSubject('sub-test-1');
      expect(service.getSubjects().any((s) => s.id == 'sub-test-1'), isFalse);
    });

    test('RBAC privilege matrix strictly isolates Admin, Facilitator, Student, and Technician permissions', () {
      expect(UserRole.admin.canPerformAcademicMutations, isTrue);
      expect(UserRole.admin.canEditMarks, isTrue);
      expect(UserRole.admin.canEditAttendance, isTrue);
      expect(UserRole.admin.canChangeResults, isTrue);
      expect(UserRole.admin.canAccessTechnicianDiagnostics, isTrue);

      expect(UserRole.facilitator.canPerformAcademicMutations, isTrue);
      expect(UserRole.facilitator.canEditMarks, isTrue);
      expect(UserRole.facilitator.canEditAttendance, isTrue);
      expect(UserRole.facilitator.canChangeResults, isFalse);
      expect(UserRole.facilitator.canAccessTechnicianDiagnostics, isFalse);

      expect(UserRole.student.canPerformAcademicMutations, isFalse);
      expect(UserRole.student.canEditMarks, isFalse);
      expect(UserRole.student.canEditAttendance, isFalse);
      expect(UserRole.student.canChangeResults, isFalse);
      expect(UserRole.student.canAccessTechnicianDiagnostics, isFalse);

      expect(UserRole.technician.canPerformAcademicMutations, isFalse);
      expect(UserRole.technician.canEditMarks, isFalse);
      expect(UserRole.technician.canEditAttendance, isFalse);
      expect(UserRole.technician.canChangeResults, isFalse);
      expect(UserRole.technician.canAccessTechnicianDiagnostics, isTrue);
    });
  });
}
