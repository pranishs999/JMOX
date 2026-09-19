// JMO Management System — Supabase Service & Client Integration
import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/app_models.dart';

class SupabaseService {
  static final SupabaseService _instance = SupabaseService._internal();
  factory SupabaseService() => _instance;
  SupabaseService._internal();

  SupabaseClient get client => Supabase.instance.client;

  static const String supabaseUrl = 'https://demo-jmox.supabase.co';
  static const String supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-key';

  static Future<void> initialize() async {
    try {
      await Supabase.initialize(
        url: supabaseUrl,
        anonKey: supabaseAnonKey,
      );
    } catch (e) {
      debugPrint('Supabase init notice (local demo mode): $e');
    }
  }

  // --- Mock Data Generators for Standalone / Demo Mode ---

  List<StudentModel> getMockStudents() {
    return [
      StudentModel(
        id: 'std-1',
        publicId: 'STU-98214',
        fullName: 'Alex Mercer',
        email: 'alex.m@jmo.org',
        className: 'Class 8',
        batchName: 'Batch Alpha',
        generatedPassword: 'pass#STU98214',
      ),
      StudentModel(
        id: 'std-2',
        publicId: 'STU-98215',
        fullName: 'Priya Patel',
        email: 'priya.p@jmo.org',
        className: 'Class 8',
        batchName: 'Batch Alpha',
        generatedPassword: 'pass#STU98215',
      ),
      StudentModel(
        id: 'std-3',
        publicId: 'STU-98216',
        fullName: 'Rohan Sharma',
        email: 'rohan.s@jmo.org',
        className: 'Class 9',
        batchName: 'Batch Beta',
        generatedPassword: 'pass#STU98216',
      ),
    ];
  }

  List<FacilitatorModel> getMockFacilitators() {
    return [
      FacilitatorModel(
        id: 'tch-1',
        publicId: 'TCH-41029',
        fullName: 'Sarah Jenkins',
        email: 's.jenkins@jmo.org',
        phone: '+1 555-0192',
        assignedBatches: ['Batch Alpha', 'Batch Beta'],
        generatedPassword: 'pass#TCH41029',
      ),
      FacilitatorModel(
        id: 'tch-2',
        publicId: 'TCH-41030',
        fullName: 'Dr. Robert Vance',
        email: 'r.vance@jmo.org',
        phone: '+1 555-0193',
        assignedBatches: ['Batch Gamma'],
        generatedPassword: 'pass#TCH41030',
      ),
    ];
  }

  List<ClassModel> getMockClasses() {
    return [
      ClassModel(id: 'cls-1', name: 'Class 7', batchCount: 2, studentCount: 45),
      ClassModel(id: 'cls-2', name: 'Class 8', batchCount: 3, studentCount: 60),
      ClassModel(id: 'cls-3', name: 'Class 9', batchCount: 2, studentCount: 40),
    ];
  }

  List<BatchModel> getMockBatches() {
    return [
      BatchModel(id: 'bat-1', name: 'Batch Alpha', classId: 'cls-2', className: 'Class 8', scheduleDays: 'Mon, Wed, Fri'),
      BatchModel(id: 'bat-2', name: 'Batch Beta', classId: 'cls-3', className: 'Class 9', scheduleDays: 'Tue, Thu, Sat'),
    ];
  }

  List<SubjectModel> getMockSubjects() {
    return [
      SubjectModel(id: 'sub-1', name: 'Olympiad Algebra', code: 'MATH-ALG', classId: 'cls-2', description: 'Advanced inequalities, functional equations, and polynomials.'),
      SubjectModel(id: 'sub-2', name: 'Number Theory', code: 'MATH-NUM', classId: 'cls-2', description: 'Modular arithmetic, Fermat theorem, and Diophantine equations.'),
      SubjectModel(id: 'sub-3', name: 'Euclidean Geometry', code: 'MATH-GEO', classId: 'cls-3', description: 'Cyclic quadrilaterals, power of a point, and inversion.'),
    ];
  }

  List<OlympiadModel> getMockOlympiads() {
    return [
      OlympiadModel(id: 'oly-1', name: 'JMO Stage 1 Qualifier', eventDate: '2026-10-15', status: 'published'),
      OlympiadModel(id: 'oly-2', name: 'JMO National Finals', eventDate: '2026-11-20', status: 'scheduled'),
    ];
  }

  List<ResultModel> getMockResults() {
    return [
      ResultModel(id: 'res-1', studentName: 'Rohan Sharma', studentPublicId: 'STU-98216', olympiadName: 'JMO Stage 1 Qualifier', totalScore: 48.0, overallRank: 1, award: 'Gold Medalist'),
      ResultModel(id: 'res-2', studentName: 'Priya Patel', studentPublicId: 'STU-98215', olympiadName: 'JMO Stage 1 Qualifier', totalScore: 45.0, overallRank: 2, award: 'Silver Medalist'),
      ResultModel(id: 'res-3', studentName: 'Alex Mercer', studentPublicId: 'STU-98214', olympiadName: 'JMO Stage 1 Qualifier', totalScore: 41.5, overallRank: 3, award: 'Bronze Medalist'),
    ];
  }

  List<MaterialModel> getMockMaterials() {
    return [
      MaterialModel(id: 'mat-1', title: 'Modular Arithmetic & Diophantine Equations', fileUrl: 'https://assets.jmo.org/docs/number_theory.pdf', description: 'Comprehensive guide and problem set.', createdAt: '2026-09-15'),
      MaterialModel(id: 'mat-2', title: 'Algebraic Inequalities Practice Set', fileUrl: 'https://assets.jmo.org/docs/inequalities.pdf', description: 'AM-GM, Cauchy-Schwarz, and Muirhead.', createdAt: '2026-09-18'),
    ];
  }

  List<BookModel> getMockBooks() {
    return [
      BookModel(id: 'bok-1', title: 'Problem-Solving Strategies', author: 'Arthur Engel', coverImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', linkUrl: 'https://link.springer.com', description: 'Classic textbook with over 1300 problems for competitions.'),
      BookModel(id: 'bok-2', title: 'Challenge and Thrill of Pre-College Mathematics', author: 'V. Krishnamurthy', coverImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', linkUrl: 'https://amazon.com', description: 'Fundamental preparation for National Olympiads.'),
    ];
  }

  List<NotificationModel> getMockNotifications() {
    return [
      NotificationModel(id: 'not-1', title: 'Welcome to JMOX Unified Portal', message: 'The unified Flutter application is now active across Web, Android, and iOS.', targetRole: 'all', createdAt: '2026-09-19 22:30'),
      NotificationModel(id: 'not-2', title: 'Olympiad Stage 1 Scorecard Released', message: 'Result cards and section breakdowns are available in the Student Portal.', targetRole: 'students', createdAt: '2026-09-19 20:00'),
    ];
  }

  List<AuditLogModel> getMockAuditLogs() {
    return [
      AuditLogModel(id: 'aud-1', action: 'create_student', entityType: 'Student', isConflict: false, createdAt: '2026-09-19 21:00'),
      AuditLogModel(id: 'aud-2', action: 'sync_attendance_conflict', entityType: 'AttendanceSession', isConflict: true, createdAt: '2026-09-19 21:15'),
    ];
  }
}
