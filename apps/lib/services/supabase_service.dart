// JMO Management System — Supabase Service & Data Store Repository
import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/app_models.dart';

class SupabaseService {
  static final SupabaseService _instance = SupabaseService._internal();
  factory SupabaseService() => _instance;
  SupabaseService._internal() {
    _initMockRepositories();
  }

  SupabaseClient? get client {
    try {
      return Supabase.instance.client;
    } catch (_) {
      return null;
    }
  }

  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://amqawozipvfjgrojpvar.supabase.co',
  );
  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: '',
  );

  static Future<void> initialize() async {
    if (supabaseAnonKey.isEmpty) {
      debugPrint('Supabase notice: anonKey is empty. Running with local mock fallback mode.');
      return;
    }
    try {
      await Supabase.initialize(
        url: supabaseUrl,
        publishableKey: supabaseAnonKey,
      );
    } catch (e) {
      debugPrint('Supabase init notice (local demo mode): $e');
    }
  }

  // --- In-Memory State Repositories ---
  late List<InstituteModel> _institutes;
  late List<AcademicYearModel> _academicYears;
  late List<ClassModel> _classes;
  late List<BatchModel> _batches;
  late List<SubjectModel> _subjects;
  late List<StudentModel> _students;
  late List<FacilitatorModel> _facilitators;
  late List<AttendanceModel> _attendanceRecords;
  late List<OlympiadModel> _olympiads;
  late List<OnlineExamModel> _onlineExams;
  late List<ResultModel> _results;
  late List<MaterialModel> _materials;
  late List<BookModel> _books;
  late List<NotificationModel> _notifications;
  late List<AuditLogModel> _auditLogs;

  void _initMockRepositories() {
    _institutes = [
      InstituteModel(
        id: 'inst-1',
        name: 'Junior Mathematics Olympiad Institute',
        code: 'JMO-MAIN',
        activeAcademicYear: '2025-2026',
        timezone: 'Asia/Kathmandu',
        contactEmail: 'admin@jmo.org',
      ),
    ];

    _academicYears = [
      AcademicYearModel(
        id: 'ay-1',
        name: '2025-2026 Academic Session',
        startDate: '2025-04-01',
        endDate: '2026-03-31',
        status: 'active',
        isActive: true,
      ),
      AcademicYearModel(
        id: 'ay-2',
        name: '2024-2025 Academic Session',
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        status: 'archived',
        isActive: false,
      ),
    ];

    _classes = [
      ClassModel(id: 'cls-1', name: 'Grade 7', academicYearId: 'ay-1', sortOrder: 1),
      ClassModel(id: 'cls-2', name: 'Grade 8', academicYearId: 'ay-1', sortOrder: 2),
      ClassModel(id: 'cls-3', name: 'Grade 9', academicYearId: 'ay-1', sortOrder: 3),
    ];

    _batches = [
      BatchModel(id: 'bat-1', name: 'Batch Alpha', classId: 'cls-2', className: 'Grade 8', scheduleDays: 'Mon, Wed, Fri'),
      BatchModel(id: 'bat-2', name: 'Batch Beta', classId: 'cls-3', className: 'Grade 9', scheduleDays: 'Tue, Thu, Sat'),
      BatchModel(id: 'bat-3', name: 'Batch Gamma', classId: 'cls-1', className: 'Grade 7', scheduleDays: 'Mon, Thu'),
    ];

    _subjects = [
      SubjectModel(id: 'sub-1', name: 'Olympiad Algebra', code: 'MATH-ALG', classId: 'cls-2', description: 'Advanced inequalities, functional equations, and polynomials.'),
      SubjectModel(id: 'sub-2', name: 'Number Theory', code: 'MATH-NUM', classId: 'cls-2', description: 'Modular arithmetic, Fermat theorem, and Diophantine equations.'),
      SubjectModel(id: 'sub-3', name: 'Euclidean Geometry', code: 'MATH-GEO', classId: 'cls-3', description: 'Cyclic quadrilaterals, power of a point, and inversion.'),
      SubjectModel(id: 'sub-4', name: 'Combinatorics & Logic', code: 'MATH-COMB', classId: 'cls-1', description: 'Pigeonhole principle, graph theory, and visual puzzles.'),
    ];

    _students = [
      StudentModel(
        id: 'std-1',
        publicId: 'STU-98214',
        fullName: 'Alex Mercer',
        email: 'alex.m@jmo.org',
        phone: '+1 555-0181',
        className: 'Grade 8',
        batchName: 'Batch Alpha',
        guardianName: 'Robert Mercer',
        guardianPhone: '+1 555-0189',
        status: 'active',
        generatedPassword: 'pass#STU98214',
      ),
      StudentModel(
        id: 'std-2',
        publicId: 'STU-98215',
        fullName: 'Priya Patel',
        email: 'priya.p@jmo.org',
        phone: '+1 555-0182',
        className: 'Grade 8',
        batchName: 'Batch Alpha',
        guardianName: 'Suresh Patel',
        guardianPhone: '+1 555-0190',
        status: 'active',
        generatedPassword: 'pass#STU98215',
      ),
      StudentModel(
        id: 'std-3',
        publicId: 'STU-98216',
        fullName: 'Rohan Sharma',
        email: 'rohan.s@jmo.org',
        phone: '+1 555-0183',
        className: 'Grade 9',
        batchName: 'Batch Beta',
        guardianName: 'Anita Sharma',
        guardianPhone: '+1 555-0191',
        status: 'active',
        generatedPassword: 'pass#STU98216',
      ),
      StudentModel(
        id: 'std-4',
        publicId: 'STU-98217',
        fullName: 'David Kim',
        email: 'david.k@jmo.org',
        phone: '+1 555-0184',
        className: 'Grade 7',
        batchName: 'Batch Gamma',
        guardianName: 'Min-soo Kim',
        guardianPhone: '+1 555-0192',
        status: 'active',
        generatedPassword: 'pass#STU98217',
      ),
    ];

    _facilitators = [
      FacilitatorModel(
        id: 'fac-1',
        publicId: 'FAC-41029',
        fullName: 'Sarah Jenkins',
        email: 's.jenkins@jmo.org',
        phone: '+1 555-0192',
        role: UserRole.facilitator,
        assignedBatches: ['Batch Alpha', 'Batch Beta'],
        assignedSubjects: ['Olympiad Algebra', 'Number Theory'],
        status: 'active',
        generatedPassword: 'pass#FAC41029',
      ),
      FacilitatorModel(
        id: 'fac-2',
        publicId: 'MNT-32018',
        fullName: 'Dr. Robert Vance',
        email: 'r.vance@jmo.org',
        phone: '+1 555-0193',
        role: UserRole.facilitator,
        assignedBatches: ['Batch Gamma'],
        assignedSubjects: ['Euclidean Geometry'],
        status: 'active',
        generatedPassword: 'pass#MNT32018',
      ),
    ];

    _attendanceRecords = [
      AttendanceModel(id: 'att-1', studentId: 'std-1', studentPublicId: 'STU-98214', studentName: 'Alex Mercer', sessionDate: '2026-09-19', batchName: 'Batch Alpha', status: 'present'),
      AttendanceModel(id: 'att-2', studentId: 'std-2', studentPublicId: 'STU-98215', studentName: 'Priya Patel', sessionDate: '2026-09-19', batchName: 'Batch Alpha', status: 'present'),
      AttendanceModel(id: 'att-3', studentId: 'std-3', studentPublicId: 'STU-98216', studentName: 'Rohan Sharma', sessionDate: '2026-09-19', batchName: 'Batch Beta', status: 'absent'),
    ];

    _olympiads = [
      OlympiadModel(
        id: 'oly-1',
        name: 'JMO Stage 1 Qualifier Assessment',
        eventDate: '2026-10-15',
        status: 'published',
        totalMarks: 50,
        sections: [
          OlympiadSectionModel(
            id: 'sec-a',
            name: 'SECTION A — EVERYDAY MATHEMATICS',
            blocks: [
              OlympiadBlockModel(
                id: 'blk-1',
                name: 'BLOCK 1 — EVERYDAY MATHEMATICS',
                sectionId: 'sec-a',
                questions: [
                  QuestionModel(
                    id: 'q-1',
                    questionNumber: 1,
                    questionText: 'A train travels at 60 km/h. How many meters does it travel in 12 seconds?',
                    type: QuestionType.numerical,
                    correctAnswer: '200',
                    positiveMarks: 3.0,
                    negativeMarks: 0.0,
                  ),
                ],
              ),
              OlympiadBlockModel(
                id: 'blk-2',
                name: 'BLOCK 2 — MATHEMATICAL REASONING',
                sectionId: 'sec-a',
                questions: [
                  QuestionModel(
                    id: 'q-2',
                    questionNumber: 2,
                    questionText: 'If 3x + 5 = 20, what is the value of 6x - 2?',
                    type: QuestionType.mcqSingle,
                    options: ['28', '30', '32', '34'],
                    correctAnswer: '28',
                    positiveMarks: 3.0,
                    negativeMarks: 1.0,
                  ),
                ],
              ),
            ],
          ),
          OlympiadSectionModel(
            id: 'sec-b',
            name: 'SECTION B — LOGICAL SECTION',
            blocks: [], // Direct questions without block wrapper
            directQuestions: [
              QuestionModel(
                id: 'q-3',
                questionNumber: 3,
                questionText: 'Find the next figure in the logical spatial pattern sequence.',
                type: QuestionType.pattern,
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option B',
                positiveMarks: 4.0,
                negativeMarks: 1.0,
              ),
            ],
          ),
          OlympiadSectionModel(
            id: 'sec-c',
            name: 'SECTION C — ACHIEVERS SECTION',
            blocks: [
              OlympiadBlockModel(
                id: 'blk-3',
                name: 'BLOCK 3 — ACHIEVEMENT CORNER',
                sectionId: 'sec-c',
                questions: [
                  QuestionModel(
                    id: 'q-4',
                    questionNumber: 4,
                    questionText: 'Determine the number of positive integer solutions to x + y + z = 10.',
                    type: QuestionType.numerical,
                    correctAnswer: '36',
                    positiveMarks: 5.0,
                    negativeMarks: 0.0,
                  ),
                ],
              ),
              OlympiadBlockModel(
                id: 'blk-4',
                name: 'BLOCK 4 — PUZZLE CORNER',
                sectionId: 'sec-c',
                questions: [
                  QuestionModel(
                    id: 'q-5',
                    questionNumber: 5,
                    questionText: 'Solve the 4x4 Sudoku grid logic puzzle below.',
                    type: QuestionType.sudoku,
                    correctAnswer: 'Grid Solved',
                    positiveMarks: 5.0,
                    negativeMarks: 0.0,
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ];

    _onlineExams = [
      OnlineExamModel(
        id: 'exam-1',
        title: 'Monthly Algebra & Number Theory Online Test',
        classId: 'cls-2',
        className: 'Grade 8',
        startTime: '2026-09-25 09:00',
        endTime: '2026-09-25 10:00',
        durationMinutes: 60,
        status: 'Published',
        totalMarks: 50,
        totalQuestions: 15,
      ),
      OnlineExamModel(
        id: 'exam-2',
        title: 'Geometry Qualifier Mock Exam',
        classId: 'cls-3',
        className: 'Grade 9',
        startTime: '2026-10-01 14:00',
        endTime: '2026-10-01 15:30',
        durationMinutes: 90,
        status: 'Scheduled',
        totalMarks: 50,
        totalQuestions: 20,
      ),
    ];

    _results = [
      ResultModel(
        id: 'res-1',
        studentName: 'Alex Mercer',
        studentPublicId: 'STU-98214',
        olympiadName: 'JMO Stage 1 Qualifier Assessment',
        totalScore: 48.0,
        overallRank: 1,
        award: 'Gold Medalist',
        sectionScores: {'Section A': 20.0, 'Section B': 15.0, 'Section C': 13.0},
      ),
      ResultModel(
        id: 'res-2',
        studentName: 'Priya Patel',
        studentPublicId: 'STU-98215',
        olympiadName: 'JMO Stage 1 Qualifier Assessment',
        totalScore: 45.0,
        overallRank: 2, // Standard Competition Ranking: 1, 2, 2, 4
        award: 'Silver Medalist',
        sectionScores: {'Section A': 18.0, 'Section B': 14.0, 'Section C': 13.0},
      ),
      ResultModel(
        id: 'res-3',
        studentName: 'Rohan Sharma',
        studentPublicId: 'STU-98216',
        olympiadName: 'JMO Stage 1 Qualifier Assessment',
        totalScore: 45.0,
        overallRank: 2, // Tied 2nd rank
        award: 'Silver Medalist',
        sectionScores: {'Section A': 19.0, 'Section B': 13.0, 'Section C': 13.0},
      ),
      ResultModel(
        id: 'res-4',
        studentName: 'David Kim',
        studentPublicId: 'STU-98217',
        olympiadName: 'JMO Stage 1 Qualifier Assessment',
        totalScore: 41.5,
        overallRank: 4, // 4th rank (1, 2, 2, 4 standard competition ranking)
        award: 'Bronze Medalist',
        sectionScores: {'Section A': 16.0, 'Section B': 12.5, 'Section C': 13.0},
      ),
    ];

    _materials = [
      MaterialModel(id: 'mat-1', title: 'Modular Arithmetic & Diophantine Equations Notes', fileUrl: 'https://assets.jmo.org/docs/number_theory.pdf', description: 'Comprehensive guide and problem set.', createdAt: '2026-09-15', status: 'active'),
      MaterialModel(id: 'mat-2', title: 'Algebraic Inequalities Practice Set', fileUrl: 'https://assets.jmo.org/docs/inequalities.pdf', description: 'AM-GM, Cauchy-Schwarz, and Muirhead.', createdAt: '2026-09-18', status: 'active'),
    ];

    _books = [
      BookModel(id: 'bok-1', title: 'Problem-Solving Strategies', author: 'Arthur Engel', coverImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', linkUrl: 'https://link.springer.com', description: 'Classic textbook with over 1300 competition problems.', status: 'active'),
      BookModel(id: 'bok-2', title: 'Challenge and Thrill of Pre-College Mathematics', author: 'V. Krishnamurthy', coverImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', linkUrl: 'https://amazon.com', description: 'Fundamental preparation for National Olympiads.', status: 'active'),
    ];

    _notifications = [
      NotificationModel(id: 'not-1', title: 'JMO Unified Platform Active', message: 'The unified Flutter application is active across Web, Android, and iOS.', targetRole: 'all', status: 'Sent', createdAt: '2026-09-19 22:30'),
      NotificationModel(id: 'not-2', title: 'Olympiad Stage 1 Scorecard Released', message: 'Result cards and section breakdowns are available in the Student Portal.', targetRole: 'students', status: 'Sent', createdAt: '2026-09-19 20:00'),
    ];

    _auditLogs = [
      AuditLogModel(id: 'aud-1', actorPublicId: 'USR-SA-001', action: 'create_student', entityType: 'Student', isConflict: false, createdAt: '2026-09-19 21:00'),
      AuditLogModel(id: 'aud-2', actorPublicId: 'FAC-41029', action: 'sync_attendance_conflict', entityType: 'AttendanceSession', isConflict: true, createdAt: '2026-09-19 21:15'),
    ];
  }

  // --- CRUD Getters & Mutation API Methods ---

  List<InstituteModel> getInstitutes() => List.unmodifiable(_institutes);
  List<AcademicYearModel> getAcademicYears() => List.unmodifiable(_academicYears);
  List<ClassModel> getClasses() => List.unmodifiable(_classes.where((c) => c.status != 'archived'));
  List<BatchModel> getBatches() => List.unmodifiable(_batches.where((b) => b.status != 'archived'));
  List<SubjectModel> getSubjects() => List.unmodifiable(_subjects.where((s) => s.status != 'archived'));
  List<StudentModel> getStudents() => List.unmodifiable(_students.where((s) => s.status != 'archived'));
  List<FacilitatorModel> getFacilitators() => List.unmodifiable(_facilitators.where((f) => f.status != 'archived'));
  List<AttendanceModel> getAttendanceRecords() => List.unmodifiable(_attendanceRecords);
  List<OlympiadModel> getOlympiads() => List.unmodifiable(_olympiads);
  List<OnlineExamModel> getOnlineExams() => List.unmodifiable(_onlineExams);
  List<ResultModel> getResults() => List.unmodifiable(_results);
  List<MaterialModel> getMaterials() => List.unmodifiable(_materials.where((m) => m.status != 'archived'));
  List<BookModel> getBooks() => List.unmodifiable(_books.where((b) => b.status != 'archived'));
  List<NotificationModel> getNotifications() => List.unmodifiable(_notifications);
  List<AuditLogModel> getAuditLogs() => List.unmodifiable(_auditLogs);

  // --- Mutations ---

  void addStudent(StudentModel student) {
    _students.add(student);
    _auditLogs.insert(0, AuditLogModel(
      id: 'aud-${_auditLogs.length + 1}',
      actorPublicId: 'USR-SA-001',
      action: 'create_student',
      entityType: 'Student (${student.publicId})',
      isConflict: false,
      createdAt: DateTime.now().toString().substring(0, 16),
    ));
  }

  void updateStudent(StudentModel updatedStudent) {
    final idx = _students.indexWhere((s) => s.id == updatedStudent.id);
    if (idx != -1) {
      _students[idx] = updatedStudent;
    }
  }

  void archiveStudent(String studentId) {
    final idx = _students.indexWhere((s) => s.id == studentId);
    if (idx != -1) {
      _students[idx] = StudentModel(
        id: _students[idx].id,
        publicId: _students[idx].publicId,
        fullName: _students[idx].fullName,
        email: _students[idx].email,
        phone: _students[idx].phone,
        className: _students[idx].className,
        batchName: _students[idx].batchName,
        guardianName: _students[idx].guardianName,
        guardianPhone: _students[idx].guardianPhone,
        status: 'archived',
        generatedPassword: _students[idx].generatedPassword,
      );
    }
  }

  void deleteStudent(String studentId) {
    _students.removeWhere((s) => s.id == studentId);
  }

  void resetStudentPassword(String studentId, String newPassword) {
    final idx = _students.indexWhere((s) => s.id == studentId);
    if (idx != -1) {
      final s = _students[idx];
      _students[idx] = StudentModel(
        id: s.id,
        publicId: s.publicId,
        fullName: s.fullName,
        email: s.email,
        phone: s.phone,
        className: s.className,
        batchName: s.batchName,
        guardianName: s.guardianName,
        guardianPhone: s.guardianPhone,
        status: s.status,
        generatedPassword: newPassword,
      );
    }
  }

  void addFacilitator(FacilitatorModel facilitator) {
    _facilitators.add(facilitator);
  }

  void updateFacilitator(FacilitatorModel updated) {
    final idx = _facilitators.indexWhere((f) => f.id == updated.id);
    if (idx != -1) {
      _facilitators[idx] = updated;
    }
  }

  void deleteFacilitator(String id) {
    _facilitators.removeWhere((f) => f.id == id);
  }

  void resetFacilitatorPassword(String id, String newPassword) {
    final idx = _facilitators.indexWhere((f) => f.id == id);
    if (idx != -1) {
      final f = _facilitators[idx];
      _facilitators[idx] = FacilitatorModel(
        id: f.id,
        publicId: f.publicId,
        fullName: f.fullName,
        email: f.email,
        phone: f.phone,
        role: f.role,
        assignedBatches: f.assignedBatches,
        assignedSubjects: f.assignedSubjects,
        status: f.status,
        generatedPassword: newPassword,
      );
    }
  }

  void updateInstitute(InstituteModel updated) {
    if (_institutes.isNotEmpty) {
      _institutes[0] = updated;
    }
  }

  void addAcademicYear(AcademicYearModel ay) => _academicYears.add(ay);
  void updateAcademicYear(AcademicYearModel ay) {
    final idx = _academicYears.indexWhere((item) => item.id == ay.id);
    if (idx != -1) {
      _academicYears[idx] = ay;
    }
  }
  void deleteAcademicYear(String id) => _academicYears.removeWhere((item) => item.id == id);

  void addClass(ClassModel cls) => _classes.add(cls);
  void updateClass(ClassModel cls) {
    final idx = _classes.indexWhere((item) => item.id == cls.id);
    if (idx != -1) {
      _classes[idx] = cls;
    }
  }
  void deleteClass(String id) => _classes.removeWhere((item) => item.id == id);

  void addBatch(BatchModel batch) => _batches.add(batch);
  void updateBatch(BatchModel batch) {
    final idx = _batches.indexWhere((item) => item.id == batch.id);
    if (idx != -1) {
      _batches[idx] = batch;
    }
  }
  void deleteBatch(String id) => _batches.removeWhere((item) => item.id == id);

  void addSubject(SubjectModel subject) => _subjects.add(subject);
  void updateSubject(SubjectModel subject) {
    final idx = _subjects.indexWhere((item) => item.id == subject.id);
    if (idx != -1) {
      _subjects[idx] = subject;
    }
  }
  void deleteSubject(String id) => _subjects.removeWhere((item) => item.id == id);

  void addBook(BookModel book) => _books.add(book);
  void addMaterial(MaterialModel material) => _materials.add(material);
  void addNotification(NotificationModel notification) => _notifications.insert(0, notification);
  void deleteNotification(String id) => _notifications.removeWhere((n) => n.id == id);
  void toggleNotificationStatus(String id) {
    final idx = _notifications.indexWhere((n) => n.id == id);
    if (idx != -1) {
      final old = _notifications[idx];
      _notifications[idx] = NotificationModel(
        id: old.id,
        title: old.title,
        message: old.message,
        targetRole: old.targetRole,
        status: old.status == 'Sent' ? 'Scheduled' : 'Sent',
        createdAt: old.createdAt,
      );
    }
  }
  void addOnlineExam(OnlineExamModel exam) => _onlineExams.insert(0, exam);
}
