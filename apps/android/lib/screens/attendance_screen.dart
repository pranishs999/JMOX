import 'package:flutter/material.dart';
import '../models/attendance.dart';
import '../services/offline_attendance_service.dart';
import 'omr_camera_screen.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({Key? key}) : super(key: key);

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  final _offlineService = OfflineAttendanceService();
  bool _isSyncing = false;
  int _queuedCount = 0;

  // Demo student list for batch marking
  final List<Map<String, String>> _students = [
    {'id': 'JMO-2026-0001', 'name': 'John Doe'},
    {'id': 'JMO-2026-0002', 'name': 'Alice Smith'},
    {'id': 'JMO-2026-0003', 'name': 'Bob Johnson'},
  ];

  final Map<String, String> _statuses = {};

  @override
  void initState() {
    super.initState();
    for (var s in _students) {
      _statuses[s['id']!] = 'present';
    }
    _loadQueuedCount();
  }

  Future<void> _loadQueuedCount() async {
    final records = await _offlineService.getQueuedRecords();
    setState(() {
      _queuedCount = records.length;
    });
  }

  Future<void> _saveLocalAttendance() async {
    final now = DateTime.now();
    final timestamp = now.toIso8601String();
    final dateStr = "${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}";
    final sessionId = "session_$dateStr";

    final List<LocalAttendanceRecord> records = [];
    for (var s in _students) {
      final record = LocalAttendanceRecord(
        id: '${s['id']}_$sessionId',
        studentId: s['id']!,
        studentName: s['name']!,
        sessionId: sessionId,
        status: _statuses[s['id']!] ?? 'present',
        timestamp: timestamp,
      );
      records.add(record);
    }
    
    await _offlineService.saveRecordsLocally(records);
    await _loadQueuedCount();
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Attendance saved locally!')),
      );
    }
  }

  Future<void> _syncData() async {
    setState(() {
      _isSyncing = true;
    });
    try {
      final synced = await _offlineService.syncWithBackend();
      await _loadQueuedCount();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Synced $synced records with server!')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Sync failed: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isSyncing = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0A0A0A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF111111),
        title: const Text('Attendance Logging'),
        actions: [
          IconButton(
            icon: const Icon(Icons.camera_alt, color: Colors.purpleAccent),
            tooltip: 'Camera OMR Scan',
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const OmrCameraScreen()),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            color: const Color(0xFF161616),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Offline Queue:', style: TextStyle(color: Colors.grey, fontSize: 12)),
                    Text(
                      '$_queuedCount records pending',
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: _isSyncing ? null : _syncData,
                  icon: _isSyncing
                      ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.sync, size: 18),
                  label: const Text('Sync Now'),
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.purpleAccent),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _students.length,
              itemBuilder: (context, index) {
                final student = _students[index];
                final studentId = student['id']!;
                final currentStatus = _statuses[studentId] ?? 'present';

                return Card(
                  color: const Color(0xFF161616),
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    title: Text(student['name']!, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    subtitle: Text(studentId, style: const TextStyle(color: Colors.grey)),
                    trailing: DropdownButton<String>(
                      value: currentStatus,
                      dropdownColor: const Color(0xFF222222),
                      style: const TextStyle(color: Colors.white),
                      items: const [
                        DropdownMenuItem(value: 'present', child: Text('Present', style: TextStyle(color: Colors.greenAccent))),
                        DropdownMenuItem(value: 'absent', child: Text('Absent', style: TextStyle(color: Colors.redAccent))),
                        DropdownMenuItem(value: 'late', child: Text('Late', style: TextStyle(color: Colors.amberAccent))),
                        DropdownMenuItem(value: 'excused', child: Text('Excused', style: TextStyle(color: Colors.blueAccent))),
                      ],
                      onChanged: (val) {
                        if (val != null) {
                          setState(() {
                            _statuses[studentId] = val;
                          });
                        }
                      },
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _saveLocalAttendance,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.purpleAccent,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text('Save Local Attendance', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
