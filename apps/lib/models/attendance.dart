class LocalAttendanceRecord {
  final String id;
  final String studentId;
  final String studentName;
  final String sessionId;
  final String status; // present, absent, late, excused
  final bool isSynced;
  final String timestamp;

  LocalAttendanceRecord({
    required this.id,
    required this.studentId,
    required this.studentName,
    required this.sessionId,
    required this.status,
    this.isSynced = false,
    required this.timestamp,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'student_id': studentId,
      'student_name': studentName,
      'session_id': sessionId,
      'status': status,
      'is_synced': isSynced ? 1 : 0,
      'timestamp': timestamp,
    };
  }

  factory LocalAttendanceRecord.fromMap(Map<String, dynamic> map) {
    return LocalAttendanceRecord(
      id: map['id'],
      studentId: map['student_id'],
      studentName: map['student_name'],
      sessionId: map['session_id'],
      status: map['status'],
      isSynced: map['is_synced'] == 1,
      timestamp: map['timestamp'],
    );
  }
}
