import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../api/api_client.dart';
import '../models/attendance.dart';

class OfflineAttendanceService {
  static const String _key = 'offline_attendance_queue';
  final ApiClient _apiClient = ApiClient();

  Future<List<LocalAttendanceRecord>> getQueuedRecords() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_key);
    if (jsonString == null) return [];
    final List<dynamic> jsonList = jsonDecode(jsonString);
    return jsonList.map((e) => LocalAttendanceRecord.fromMap(e)).toList();
  }

  Future<void> saveRecordLocally(LocalAttendanceRecord record) async {
    await saveRecordsLocally([record]);
  }

  Future<void> saveRecordsLocally(List<LocalAttendanceRecord> newRecords) async {
    final prefs = await SharedPreferences.getInstance();
    final records = await getQueuedRecords();
    
    for (var record in newRecords) {
      records.removeWhere((r) => r.studentId == record.studentId && r.sessionId == record.sessionId);
      records.add(record);
    }
    
    final jsonList = records.map((r) => r.toMap()).toList();
    await prefs.setString(_key, jsonEncode(jsonList));
  }

  Future<int> syncWithBackend() async {
    final records = await getQueuedRecords();
    if (records.isEmpty) return 0;

    final unsynced = records.where((r) => !r.isSynced).toList();
    if (unsynced.isEmpty) return 0;

    final payload = {
      'records': unsynced.map((r) => {
        'student_id': r.studentId,
        'session_id': r.sessionId,
        'status': r.status,
        'timestamp': r.timestamp,
      }).toList(),
    };

    final response = await _apiClient.post('/attendance/sync', payload);
    if (response.statusCode == 200) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_key); // Clear synced queue
      return unsynced.length;
    } else {
      throw Exception('Sync failed: ${response.body}');
    }
  }
}
