// JMO Management System — Attendance Recording & Sync
import 'package:flutter/material.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({super.key});

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  bool _isOnline = true;
  int _queuedCount = 0;

  static const Color _emeraldColor = Color(0xFF10B981);

  final List<Map<String, dynamic>> _students = [
    {'id': 'std-1', 'public_id': 'STU-98214', 'name': 'Alex Mercer', 'status': 'present'},
    {'id': 'std-2', 'public_id': 'STU-98215', 'name': 'Priya Patel', 'status': 'present'},
    {'id': 'std-3', 'public_id': 'STU-98216', 'name': 'Rohan Sharma', 'status': 'absent'},
    {'id': 'std-4', 'public_id': 'STU-98217', 'name': 'David Kim', 'status': 'late'},
  ];

  void _markAllPresent() {
    setState(() {
      for (var s in _students) {
        s['status'] = 'present';
      }
      _queuedCount += _students.length;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0A0A0A),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Attendance Session', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                    Text('Batch Alpha — Session #12 (2026-09-19)', style: TextStyle(fontSize: 13, color: Colors.grey)),
                  ],
                ),
                Row(
                  children: [
                    // Network & Sync status pill
                    InkWell(
                      onTap: () => setState(() => _isOnline = !_isOnline),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: _isOnline ? _emeraldColor.withOpacity(0.15) : Colors.amber.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: _isOnline ? _emeraldColor : Colors.amber),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              _isOnline ? Icons.wifi : Icons.wifi_off,
                              size: 14,
                              color: _isOnline ? _emeraldColor : Colors.amber,
                            ),
                            const SizedBox(width: 6),
                            Text(
                              _isOnline ? 'Online (Synced)' : 'Offline ($_queuedCount Queued)',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: _isOnline ? _emeraldColor : Colors.amber,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: _markAllPresent,
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: Colors.black),
                      child: const Text('Mark All Present'),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),

            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF111111),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.white.withOpacity(0.08)),
                ),
                child: ListView.separated(
                  itemCount: _students.length,
                  separatorBuilder: (_, __) => const Divider(color: Color(0xFF222222), height: 1),
                  itemBuilder: (context, index) {
                    final s = _students[index];
                    return ListTile(
                      leading: CircleAvatar(
                        backgroundColor: Colors.white.withOpacity(0.08),
                        child: Text(s['name'][0], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      ),
                      title: Text(s['name'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                      subtitle: Text(s['public_id'], style: const TextStyle(color: Colors.grey, fontSize: 12)),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          _buildStatusChoice(s, 'present', 'Present', _emeraldColor),
                          const SizedBox(width: 6),
                          _buildStatusChoice(s, 'absent', 'Absent', Colors.red),
                          const SizedBox(width: 6),
                          _buildStatusChoice(s, 'late', 'Late', Colors.amber),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusChoice(Map<String, dynamic> student, String key, String label, Color color) {
    final isSelected = student['status'] == key;
    return ChoiceChip(
      label: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSelected ? Colors.black : color)),
      selected: isSelected,
      selectedColor: color,
      backgroundColor: Colors.transparent,
      side: BorderSide(color: color.withOpacity(0.4)),
      onSelected: (selected) {
        if (selected) {
          setState(() {
            student['status'] = key;
            _queuedCount++;
          });
        }
      },
    );
  }
}
