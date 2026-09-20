// JMO Management System — Unified Domain Models
import 'package:flutter/foundation.dart';

enum UserRole { admin, facilitator, mentor, student, technician }

extension UserRoleExtension on UserRole {
  String get value {
    switch (this) {
      case UserRole.admin:
        return 'admin';
      case UserRole.facilitator:
        return 'facilitator';
      case UserRole.mentor:
        return 'mentor';
      case UserRole.student:
        return 'student';
      case UserRole.technician:
        return 'technician';
    }
  }

  static UserRole fromString(String roleStr) {
    switch (roleStr.toLowerCase()) {
      case 'admin':
        return UserRole.admin;
      case 'facilitator':
        return UserRole.facilitator;
      case 'mentor':
        return UserRole.mentor;
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
}

class AcademicYearModel {
  final String id;
  final String name;
  final String startDate;
  final String endDate;
  final String status; // active, archived, upcoming
  final int batchesCount;
  final int studentsCount;

  AcademicYearModel({
    required this.id,
    required this.name,
    required this.startDate,
    required this.endDate,
    required this.status,
    this.batchesCount = 0,
    this.studentsCount = 0,
  });

  factory AcademicYearModel.fromJson(Map<String, dynamic> json) {
    return AcademicYearModel(
      id: json['id'] as String,
      name: json['name'] as String,
      startDate: json['start_date'] as String,
      endDate: json['end_date'] as String,
      status: json['status'] ?? 'active',
      batchesCount: json['batches_count'] ?? 0,
      studentsCount: json['students_count'] ?? 0,
    );
  }
}

class TechnicianModel {
  final String id;
  final String publicId;
  final String fullName;
  final String email;
  final String assignedZone;
  final String status;
  final bool hasAcademicControl; // Strictly false by default per specification

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
      assignedZone: json['assigned_zone'] ?? 'Hardware & Labs',
      status: json['status'] ?? 'active',
      hasAcademicControl: false,
    );
  }
}

class UserModel {
  final String id;
  final String publicId;
  final String email;
  final UserRole role;
  final String status;
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
}

class StudentModel {
  final String id;
  final String publicId;
  final String fullName;
  final String? email;
  final String? phone;
  final String? className;
  final String? batchName;
  final String status;
  final String? generatedPassword;

  StudentModel({
    required this.id,
    required this.publicId,
    required this.fullName,
    this.email,
    this.phone,
    this.className,
    this.batchName,
    this.status = 'active',
    this.generatedPassword,
  });

  factory StudentModel.fromJson(Map<String, dynamic> json) {
    return StudentModel(
      id: json['id'] as String,
      publicId: json['public_id'] ?? 'STU-000',
      fullName: json['full_name'] as String,
      email: json['email'],
      phone: json['phone'],
      className: json['class_name'] ?? json['class']?['name'],
      batchName: json['batch_name'] ?? json['batch']?['name'],
      status: json['status'] ?? 'active',
      generatedPassword: json['login_password'],
    );
  }
}

class FacilitatorModel {
  final String id;
  final String publicId;
  final String fullName;
  final String? email;
  final String? phone;
  final List<String> assignedBatches;
  final String? generatedPassword;

  FacilitatorModel({
    required this.id,
    required this.publicId,
    required this.fullName,
    this.email,
    this.phone,
    this.assignedBatches = const [],
    this.generatedPassword,
  });

  factory FacilitatorModel.fromJson(Map<String, dynamic> json) {
    return FacilitatorModel(
      id: json['id'] as String,
      publicId: json['public_id'] ?? 'TCH-000',
      fullName: json['full_name'] as String,
      email: json['email'],
      phone: json['phone'],
      assignedBatches: (json['assigned_batches'] as List?)?.map((e) => e.toString()).toList() ?? [],
      generatedPassword: json['login_password'],
    );
  }
}

class ClassModel {
  final String id;
  final String name;
  final int batchCount;
  final int studentCount;

  ClassModel({
    required this.id,
    required this.name,
    this.batchCount = 0,
    this.studentCount = 0,
  });

  factory ClassModel.fromJson(Map<String, dynamic> json) {
    return ClassModel(
      id: json['id'] as String,
      name: json['name'] as String,
      batchCount: json['batch_count'] ?? 0,
      studentCount: json['student_count'] ?? 0,
    );
  }
}

class BatchModel {
  final String id;
  final String name;
  final String classId;
  final String? className;
  final String status;
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
}

class SubjectModel {
  final String id;
  final String name;
  final String code;
  final String classId;
  final String? description;

  SubjectModel({
    required this.id,
    required this.name,
    required this.code,
    required this.classId,
    this.description,
  });

  factory SubjectModel.fromJson(Map<String, dynamic> json) {
    return SubjectModel(
      id: json['id'] as String,
      name: json['name'] as String,
      code: json['code'] as String,
      classId: json['class_id'] as String,
      description: json['description'],
    );
  }
}

class AttendanceModel {
  final String id;
  final String studentId;
  final String studentName;
  final String sessionDate;
  final String status; // present, absent, late, excused
  final bool isSynced;

  AttendanceModel({
    required this.id,
    required this.studentId,
    required this.studentName,
    required this.sessionDate,
    required this.status,
    this.isSynced = true,
  });

  factory AttendanceModel.fromJson(Map<String, dynamic> json) {
    return AttendanceModel(
      id: json['id'] as String,
      studentId: json['student_id'] as String,
      studentName: json['student_name'] ?? 'Student',
      sessionDate: json['session_date'] ?? '',
      status: json['status'] ?? 'present',
      isSynced: json['is_synced'] ?? true,
    );
  }
}

class OlympiadModel {
  final String id;
  final String name;
  final String eventDate;
  final String status; // draft, in_progress, published

  OlympiadModel({
    required this.id,
    required this.name,
    required this.eventDate,
    required this.status,
  });

  factory OlympiadModel.fromJson(Map<String, dynamic> json) {
    return OlympiadModel(
      id: json['id'] as String,
      name: json['name'] as String,
      eventDate: json['event_date'] ?? '',
      status: json['status'] ?? 'draft',
    );
  }
}

class ResultModel {
  final String id;
  final String studentName;
  final String studentPublicId;
  final String olympiadName;
  final double totalScore;
  final int overallRank;
  final String award;

  ResultModel({
    required this.id,
    required this.studentName,
    required this.studentPublicId,
    required this.olympiadName,
    required this.totalScore,
    required this.overallRank,
    required this.award,
  });

  factory ResultModel.fromJson(Map<String, dynamic> json) {
    return ResultModel(
      id: json['id'] as String,
      studentName: json['student_name'] ?? json['student']?['full_name'] ?? 'Candidate',
      studentPublicId: json['student_public_id'] ?? json['student']?['public_id'] ?? 'STU-000',
      olympiadName: json['olympiad_name'] ?? 'Olympiad Assessment',
      totalScore: (json['total_score'] as num?)?.toDouble() ?? 0.0,
      overallRank: json['overall_rank'] ?? 1,
      award: json['award'] ?? 'Participation Certificate',
    );
  }
}

class MaterialModel {
  final String id;
  final String title;
  final String fileUrl;
  final String? description;
  final String createdAt;

  MaterialModel({
    required this.id,
    required this.title,
    required this.fileUrl,
    this.description,
    required this.createdAt,
  });

  factory MaterialModel.fromJson(Map<String, dynamic> json) {
    return MaterialModel(
      id: json['id'] as String,
      title: json['title'] as String,
      fileUrl: json['file_url'] as String,
      description: json['description'],
      createdAt: json['created_at'] ?? '',
    );
  }
}

class BookModel {
  final String id;
  final String title;
  final String? author;
  final String? coverImageUrl;
  final String? linkUrl;
  final String? description;

  BookModel({
    required this.id,
    required this.title,
    this.author,
    this.coverImageUrl,
    this.linkUrl,
    this.description,
  });

  factory BookModel.fromJson(Map<String, dynamic> json) {
    return BookModel(
      id: json['id'] as String,
      title: json['title'] as String,
      author: json['author'],
      coverImageUrl: json['cover_image_url'],
      linkUrl: json['link_url'],
      description: json['description'],
    );
  }
}

class NotificationModel {
  final String id;
  final String title;
  final String message;
  final String targetRole;
  final String createdAt;

  NotificationModel({
    required this.id,
    required this.title,
    required this.message,
    required this.targetRole,
    required this.createdAt,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      id: json['id'] as String,
      title: json['title'] as String,
      message: json['message'] as String,
      targetRole: json['target_role'] ?? 'all',
      createdAt: json['created_at'] ?? '',
    );
  }
}

class AuditLogModel {
  final String id;
  final String action;
  final String entityType;
  final bool isConflict;
  final String createdAt;

  AuditLogModel({
    required this.id,
    required this.action,
    required this.entityType,
    required this.isConflict,
    required this.createdAt,
  });

  factory AuditLogModel.fromJson(Map<String, dynamic> json) {
    return AuditLogModel(
      id: json['id'] as String,
      action: json['action'] as String,
      entityType: json['entity_type'] ?? 'general',
      isConflict: json['is_conflict'] ?? false,
      createdAt: json['created_at'] ?? '',
    );
  }
}
