// JMO Management System — Attendance Recording, QR Scanner, Offline Queue & Reports
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({super.key});

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  final SupabaseService _service = SupabaseService();
  bool _isOnline = true;
  int _queuedCount = 0;
  bool _isQrScannerActive = false;
  late List<StudentModel> _students;
  final Map<String, String> _attendanceMap = {};

  @override
  void initState() {
    super.initState();
    _students = _service.getStudents();
    for (var s in _students) {
      _attendanceMap[s.id] = 'present';
    }
  }

  void _markAllPresent() {
    setState(() {
      for (var s in _students) {
        _attendanceMap[s.id] = 'present';
      }
      _queuedCount += _students.length;
    });
  }

  void _simulateQrScan() {
    final s = _students.first;
    setState(() {
      _attendanceMap[s.id] = 'present';
      _queuedCount++;
      _isQrScannerActive = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('QR Verified: ${s.fullName} (${s.publicId}) marked PRESENT.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Attendance Session'),
        actions: [
          IconButton(
            icon: Icon(_isQrScannerActive ? Icons.camera : Icons.qr_code_scanner, color: AppColors.accentGold),
            tooltip: 'Toggle QR Scanner',
            onPressed: () => setState(() => _isQrScannerActive = !_isQrScannerActive),
          ),
          const SizedBox(width: 8),
          // Network & Sync status pill
          InkWell(
            onTap: () => setState(() => _isOnline = !_isOnline),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              margin: const EdgeInsets.symmetric(vertical: 10),
              decoration: BoxDecoration(
                color: _isOnline ? AppColors.accentEmerald.withValues(alpha: 0.15) : AppColors.accentGold.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: _isOnline ? AppColors.accentEmerald : AppColors.accentGold),
              ),
              child: Row(
                children: [
                  Icon(
                    _isOnline ? Icons.wifi : Icons.wifi_off,
                    size: 14,
                    color: _isOnline ? AppColors.accentEmerald : AppColors.accentGold,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    _isOnline ? 'Online (Synced)' : 'Offline ($_queuedCount Queued)',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: _isOnline ? AppColors.accentEmerald : AppColors.accentGold,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(width: 12),
          ElevatedButton(
            onPressed: _markAllPresent,
            child: const Text('Mark All Present'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            if (_isQrScannerActive) ...[
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      const Icon(Icons.qr_code_scanner, size: 64, color: AppColors.accentGold),
                      const SizedBox(height: 12),
                      const Text('Scan Student Identification QR Code', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.darkTextPrimary)),
                      const Text('Position the student badge within camera viewfinder', style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                      const SizedBox(height: 16),
                      ElevatedButton.icon(
                        onPressed: _simulateQrScan,
                        icon: const Icon(Icons.camera_alt, size: 16),
                        label: const Text('Simulate Camera QR Detection'),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Student Attendance Matrix
            Expanded(
              child: Card(
                child: ListView.separated(
                  itemCount: _students.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final s = _students[index];
                    return ListTile(
                      leading: CircleAvatar(
                        backgroundColor: AppColors.darkCard,
                        child: Text(s.fullName[0], style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold)),
                      ),
                      title: Text(s.fullName, style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold, fontSize: 14)),
                      subtitle: Text('${s.publicId} • ${s.className ?? "Grade 8"} (${s.batchName ?? "Batch Alpha"})', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          _buildStatusChip(s.id, 'present', 'Present', AppColors.accentEmerald),
                          const SizedBox(width: 6),
                          _buildStatusChip(s.id, 'absent', 'Absent', AppColors.accentCrimson),
                          const SizedBox(width: 6),
                          _buildStatusChip(s.id, 'late', 'Late', AppColors.accentGold),
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

  Widget _buildStatusChip(String studentId, String key, String label, Color color) {
    final isSelected = _attendanceMap[studentId] == key;
    return ChoiceChip(
      label: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSelected ? Colors.black : color)),
      selected: isSelected,
      selectedColor: color,
      backgroundColor: Colors.transparent,
      side: BorderSide(color: color.withValues(alpha: 0.4)),
      onSelected: (selected) {
        if (selected) {
          setState(() {
            _attendanceMap[studentId] = key;
            _queuedCount++;
          });
        }
      },
    );
  }
}
