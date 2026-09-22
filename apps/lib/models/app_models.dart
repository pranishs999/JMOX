// JMO Management System — Unified Domain Models & Role Architecture

enum UserRole { admin, facilitator, student, technician }

extension UserRoleExtension on UserRole {
  String get value {
    switch (this) {
      case UserRole.admin:
        return 'admin';
      case UserRole.facilitator:
        return 'facilitator';
      case UserRole.student:
        return 'student';
      case UserRole.technician:
        return 'technician';
    }
  }

  String get label {
    switch (this) {
      case UserRole.admin:
        return 'Admin';
      case UserRole.facilitator:
        return 'Facilitator';
      case UserRole.student:
        return 'Student';
      case UserRole.technician:
        return 'Technician';
    }
  }

  bool get canPerformAcademicMutations => this != UserRole.technician && this != UserRole.student;
  bool get canEditMarks => this == UserRole.admin || this == UserRole.facilitator;
  bool get canEditAttendance => this == UserRole.admin || this == UserRole.facilitator;
  bool get canChangeResults => this == UserRole.admin;
  bool get canAccessTechnicianDiagnostics => this == UserRole.technician || this == UserRole.admin;

  static UserRole fromString(String roleStr) {
    switch (roleStr.toLowerCase()) {
      case 'admin':
        return UserRole.admin;
      case 'facilitator':
      case 'mentor':
      case 'teacher': // Backward compatibility alias
        return UserRole.facilitator;
      case 'technician':
        return UserRole.technician;
      case 'student':
        return UserRole.student;
      default:
        return UserRole.student;
    }
  }
}


class InstituteModel {
  final String id;
  final String name;
  final String code;
  final String activeAcademicYear;
  final String timezone;
  final String contactEmail;
  final String status;

  InstituteModel({
    required this.id,
    required this.name,
    required this.code,
    required this.activeAcademicYear,
    required this.timezone,
    required this.contactEmail,
    this.status = 'active',
  });

  factory InstituteModel.fromJson(Map<String, dynamic> json) {
    return InstituteModel(
      id: json['id'] as String,
      name: json['name'] as String,
      code: json['code'] as String,
      activeAcademicYear: json['active_academic_year'] ?? '2025-2026',
      timezone: json['timezone'] ?? 'UTC',
      contactEmail: json['contact_email'] ?? 'admin@jmo.org',
      status: json['status'] ?? 'active',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'code': code,
    'active_academic_year': activeAcademicYear,
    'timezone': timezone,
    'contact_email': contactEmail,
    'status': status,
  };
}

class AcademicYearModel {
  final String id;
  final String name;
  final String startDate;
  final String endDate;
  final String status; // active, archived, upcoming
  final bool isActive;

  AcademicYearModel({
    required this.id,
    required this.name,
    required this.startDate,
    required this.endDate,
    required this.status,
    this.isActive = true,
  });

  factory AcademicYearModel.fromJson(Map<String, dynamic> json) {
    return AcademicYearModel(
      id: json['id'] as String,
      name: json['name'] as String,
      startDate: json['start_date'] as String,
      endDate: json['end_date'] as String,
      status: json['status'] ?? 'active',
      isActive: json['is_active'] ?? true,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'start_date': startDate,
    'end_date': endDate,
    'status': status,
    'is_active': isActive,
  };
}

class ClassModel {
  final String id;
  final String name;
  final String academicYearId;
  final int sortOrder;
  final String status;

  ClassModel({
    required this.id,
    required this.name,
    required this.academicYearId,
    this.sortOrder = 0,
    this.status = 'active',
  });

  factory ClassModel.fromJson(Map<String, dynamic> json) {
    return ClassModel(
      id: json['id'] as String,
      name: json['name'] as String,
      academicYearId: json['academic_year_id'] ?? 'ay-1',
      sortOrder: json['sort_order'] ?? 0,
      status: json['status'] ?? 'active',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'academic_year_id': academicYearId,
    'sort_order': sortOrder,
    'status': status,
  };
}

class BatchModel {
  final String id;
  final String name;
  final String classId;
  final String? className;
  final String status; // active, completed, archived
  final String? scheduleDays;

  BatchModel({
    required this.id,
    required this.name,
    required this.classId,
    this.className,
    this.status = 'active',
    this.scheduleDays,
  });

  factory BatchModel.fromJson(Map<String, dynamic> json) {
    return BatchModel(
      id: json['id'] as String,
      name: json['name'] as String,
      classId: json['class_id'] as String,
      className: json['class_name'] ?? json['class']?['name'],
      status: json['status'] ?? 'active',
      scheduleDays: json['schedule_days'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'class_id': classId,
    'class_name': className,
    'status': status,
    'schedule_days': scheduleDays,
  };
}

class SubjectModel {
  final String id;
  final String name;
  final String code;
  final String classId;
  final String? description;
  final String status;

  SubjectModel({
    required this.id,
    required this.name,
    required this.code,
    required this.classId,
    this.description,
    this.status = 'active',
  });

  factory SubjectModel.fromJson(Map<String, dynamic> json) {
    return SubjectModel(
      id: json['id'] as String,
      name: json['name'] as String,
      code: json['code'] as String,
      classId: json['class_id'] as String,
      description: json['description'],
      status: json['status'] ?? 'active',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'code': code,
    'class_id': classId,
    'description': description,
    'status': status,
  };
}

class UserModel {
  final String id;
  final String publicId;
  final String email;
  final UserRole role;
  final String status; // active, disabled, invited
  final String? generatedPassword;

  UserModel({
    required this.id,
    required this.publicId,
    required this.email,
    required this.role,
    required this.status,
    this.generatedPassword,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      publicId: json['public_id'] ?? 'USR-000',
      email: json['email'] as String,
      role: UserRoleExtension.fromString(json['role'] ?? 'student'),
      status: json['status'] ?? 'active',
      generatedPassword: json['generated_password'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'public_id': publicId,
    'email': email,
    'role': role.value,
    'status': status,
    'generated_password': generatedPassword,
  };
}

class StudentModel {
  final String id;
  final String publicId;
  final String fullName;
  final String? email;
  final String? phone;
  final String? className;
  final String? batchName;
  final String? guardianName;
  final String? guardianPhone;
  final String status; // active, disabled, archived
  final String? generatedPassword;
  final String qrCodeData;

  StudentModel({
    required this.id,
    required this.publicId,
    required this.fullName,
    this.email,
    this.phone,
    this.className,
    this.batchName,
    this.guardianName,
    this.guardianPhone,
    this.status = 'active',
    this.generatedPassword,
    String? qrCodeData,
  }) : qrCodeData = qrCodeData ?? 'JMO-STD:$publicId:$fullName';

  factory StudentModel.fromJson(Map<String, dynamic> json) {
    final pubId = json['public_id'] ?? 'STU-000';
    final name = json['full_name'] as String;
    return StudentModel(
      id: json['id'] as String,
      publicId: pubId,
      fullName: name,
      email: json['email'],
      phone: json['phone'],
      className: json['class_name'] ?? json['class']?['name'],
      batchName: json['batch_name'] ?? json['batch']?['name'],
      guardianName: json['guardian_name'],
      guardianPhone: json['guardian_phone'],
      status: json['status'] ?? 'active',
      generatedPassword: json['login_password'],
      qrCodeData: json['qr_code_data'] ?? 'JMO-STD:$pubId:$name',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'public_id': publicId,
    'full_name': fullName,
    'email': email,
    'phone': phone,
    'class_name': className,
    'batch_name': batchName,
    'guardian_name': guardianName,
    'guardian_phone': guardianPhone,
    'status': status,
    'login_password': generatedPassword,
    'qr_code_data': qrCodeData,
  };
}

class FacilitatorModel {
  final String id;
  final String publicId;
  final String fullName;
  final String? email;
  final String? phone;
  final UserRole role; // facilitator or mentor
  final List<String> assignedBatches;
  final List<String> assignedSubjects;
  final String status; // active, disabled, archived
  final String? generatedPassword;

  FacilitatorModel({
    required this.id,
    required this.publicId,
    required this.fullName,
    this.email,
    this.phone,
    this.role = UserRole.facilitator,
    this.assignedBatches = const [],
    this.assignedSubjects = const [],
    this.status = 'active',
    this.generatedPassword,
  });

  factory FacilitatorModel.fromJson(Map<String, dynamic> json) {
    return FacilitatorModel(
      id: json['id'] as String,
      publicId: json['public_id'] ?? 'FAC-000',
      fullName: json['full_name'] as String,
      email: json['email'],
      phone: json['phone'],
      role: UserRoleExtension.fromString(json['role'] ?? 'facilitator'),
      assignedBatches: (json['assigned_batches'] as List?)?.map((e) => e.toString()).toList() ?? [],
      assignedSubjects: (json['assigned_subjects'] as List?)?.map((e) => e.toString()).toList() ?? [],
      status: json['status'] ?? 'active',
      generatedPassword: json['login_password'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'public_id': publicId,
    'full_name': fullName,
    'email': email,
    'phone': phone,
    'role': role.value,
    'assigned_batches': assignedBatches,
    'assigned_subjects': assignedSubjects,
    'status': status,
    'login_password': generatedPassword,
  };
}

class TechnicianModel {
  final String id;
  final String publicId;
  final String fullName;
  final String email;
  final String assignedZone;
  final String status;
  final bool hasAcademicControl; // Strictly false per specification

  TechnicianModel({
    required this.id,
    required this.publicId,
    required this.fullName,
    required this.email,
    required this.assignedZone,
    this.status = 'active',
    this.hasAcademicControl = false,
  });

  factory TechnicianModel.fromJson(Map<String, dynamic> json) {
    return TechnicianModel(
      id: json['id'] as String,
      publicId: json['public_id'] ?? 'TECH-000',
      fullName: json['full_name'] as String,
      email: json['email'] as String,
      assignedZone: json['assigned_zone'] ?? 'Diagnostics & Hardware',
      status: json['status'] ?? 'active',
      hasAcademicControl: false,
    );
  }
}

class AttendanceModel {
  final String id;
  final String studentId;
  final String studentPublicId;
  final String studentName;
  final String sessionDate;
  final String batchName;
  final String status; // present, absent, late, excused
  final bool isSynced;

  AttendanceModel({
    required this.id,
    required this.studentId,
    required this.studentPublicId,
    required this.studentName,
    required this.sessionDate,
    required this.batchName,
    required this.status,
    this.isSynced = true,
  });

  factory AttendanceModel.fromJson(Map<String, dynamic> json) {
    return AttendanceModel(
      id: json['id'] as String,
      studentId: json['student_id'] as String,
      studentPublicId: json['student_public_id'] ?? 'STU-000',
      studentName: json['student_name'] ?? 'Student',
      sessionDate: json['session_date'] ?? '',
      batchName: json['batch_name'] ?? 'Batch Alpha',
      status: json['status'] ?? 'present',
      isSynced: json['is_synced'] ?? true,
    );
  }
}

enum QuestionType {
  mcqSingle,
  mcqMultiple,
  numerical,
  textAnswer,
  trueFalse,
  imageChoice,
  pattern,
  diagram,
  maze,
  sudoku,
  findDifference,
  visualPuzzle,
}

class QuestionModel {
  final String id;
  final int questionNumber;
  final String questionText;
  final QuestionType type;
  final List<String> options;
  final String correctAnswer;
  final double positiveMarks;
  final double negativeMarks;
  final String? questionImageUrl;
  final String? solutionImageUrl;
  final String? blockId; // Nullable for Section B direct questions

  QuestionModel({
    required this.id,
    required this.questionNumber,
    required this.questionText,
    this.type = QuestionType.mcqSingle,
    this.options = const ['A', 'B', 'C', 'D'],
    required this.correctAnswer,
    this.positiveMarks = 4.0,
    this.negativeMarks = 1.0,
    this.questionImageUrl,
    this.solutionImageUrl,
    this.blockId,
  });
}

class OlympiadBlockModel {
  final String id;
  final String name; // e.g. Block 1 — Everyday Mathematics
  final String sectionId;
  final List<QuestionModel> questions;

  OlympiadBlockModel({
    required this.id,
    required this.name,
    required this.sectionId,
    this.questions = const [],
  });
}

class OlympiadSectionModel {
  final String id;
  final String name; // Section A, Section B, Section C
  final List<OlympiadBlockModel> blocks; // Can be empty if questions exist directly
  final List<QuestionModel> directQuestions; // For Section B direct questions

  OlympiadSectionModel({
    required this.id,
    required this.name,
    this.blocks = const [],
    this.directQuestions = const [],
  });
}

class OlympiadModel {
  final String id;
  final String name;
  final String eventDate;
  final String status; // draft, scheduled, in_progress, evaluated, published
  final int totalMarks; // Default 50
  final List<OlympiadSectionModel> sections;

  OlympiadModel({
    required this.id,
    required this.name,
    required this.eventDate,
    required this.status,
    this.totalMarks = 50,
    this.sections = const [],
  });
}

class OnlineExamModel {
  final String id;
  final String title;
  final String classId;
  final String className;
  final String startTime;
  final String endTime;
  final int durationMinutes;
  final String status; // Draft, Scheduled, Published, Live, Paused, Completed, Closed, Archived
  final int totalMarks;
  final int totalQuestions;

  OnlineExamModel({
    required this.id,
    required this.title,
    required this.classId,
    required this.className,
    required this.startTime,
    required this.endTime,
    required this.durationMinutes,
    required this.status,
    this.totalMarks = 50,
    this.totalQuestions = 15,
  });
}

class ResultModel {
  final String id;
  final String studentName;
  final String studentPublicId;
  final String olympiadName;
  final double totalScore;
  final int overallRank; // Standard Competition Ranking 1, 2, 2, 4
  final String award;
  final Map<String, double> sectionScores;

  ResultModel({
    required this.id,
    required this.studentName,
    required this.studentPublicId,
    required this.olympiadName,
    required this.totalScore,
    required this.overallRank,
    required this.award,
    this.sectionScores = const {},
  });
}

class MaterialModel {
  final String id;
  final String title;
  final String fileUrl;
  final String? description;
  final String createdAt;
  final String status; // active, archived

  MaterialModel({
    required this.id,
    required this.title,
    required this.fileUrl,
    this.description,
    required this.createdAt,
    this.status = 'active',
  });
}

class BookModel {
  final String id;
  final String title;
  final String? author;
  final String? coverImageUrl;
  final String? linkUrl;
  final String? description;
  final String status; // active, archived

  BookModel({
    required this.id,
    required this.title,
    this.author,
    this.coverImageUrl,
    this.linkUrl,
    this.description,
    this.status = 'active',
  });
}

class NotificationModel {
  final String id;
  final String title;
  final String message;
  final String targetRole; // all, facilitators, students
  final String? targetBatchId;
  final String status; // Draft, Scheduled, Sending, Sent, Failed, Cancelled, Archived
  final String createdAt;
  final String? scheduledAt;

  NotificationModel({
    required this.id,
    required this.title,
    required this.message,
    required this.targetRole,
    this.targetBatchId,
    this.status = 'Sent',
    required this.createdAt,
    this.scheduledAt,
  });
}

class AuditLogModel {
  final String id;
  final String actorPublicId;
  final String action;
  final String entityType;
  final bool isConflict;
  final String createdAt;

  AuditLogModel({
    required this.id,
    this.actorPublicId = 'USR-SA-001',
    required this.action,
    required this.entityType,
    required this.isConflict,
    required this.createdAt,
  });
}

// Domain Model Aliases
typedef Student = StudentModel;
typedef Facilitator = FacilitatorModel;
typedef Institute = InstituteModel;
typedef AcademicYear = AcademicYearModel;
typedef ClassItem = ClassModel;
typedef Batch = BatchModel;
typedef Subject = SubjectModel;
typedef QuestionItem = QuestionModel;
typedef OlympiadBlock = OlympiadBlockModel;
typedef OlympiadSection = OlympiadSectionModel;
typedef Olympiad = OlympiadModel;
typedef OnlineExam = OnlineExamModel;
typedef Result = ResultModel;
typedef MaterialItem = MaterialModel;
typedef Book = BookModel;
typedef NotificationItem = NotificationModel;
typedef AuditLog = AuditLogModel;

