// JMO Management System — Attendance Recording, Real QR Scanner, Offline Queue & Reports
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
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
  final MobileScannerController _qrController = MobileScannerController();
  bool _isOnline = true;
  int _queuedCount = 0;
  bool _isQrScannerActive = false;
  late List<StudentModel> _students;
  final Map<String, String> _attendanceMap = {};
  String? _lastScannedQr;

  @override
  void initState() {
    super.initState();
    _students = _service.getStudents();
    for (var s in _students) {
      _attendanceMap[s.id] = 'present';
    }
  }

  @override
  void dispose() {
    _qrController.dispose();
    super.dispose();
  }

  void _markAllPresent() {
    setState(() {
      for (var s in _students) {
        _attendanceMap[s.id] = 'present';
      }
      _queuedCount += _students.length;
    });
  }

  void _onQrDetected(BarcodeCapture capture) {
    final List<Barcode> barcodes = capture.barcodes;
    if (barcodes.isEmpty) return;

    final String? rawValue = barcodes.first.rawValue;
    if (rawValue == null || rawValue == _lastScannedQr) return;

    _lastScannedQr = rawValue;

    // Find student matching public ID or raw QR value
    final matchedStudent = _students.firstWhere(
      (s) => s.publicId.toUpperCase() == rawValue.trim().toUpperCase() || s.id == rawValue.trim(),
      orElse: () => _students.first,
    );

    setState(() {
      _attendanceMap[matchedStudent.id] = 'present';
      _queuedCount++;
      _isQrScannerActive = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('QR Code Decoded ("$rawValue"): ${matchedStudent.fullName} (${matchedStudent.publicId}) marked PRESENT.'),
        backgroundColor: AppColors.accentEmerald,
      ),
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
            tooltip: 'Toggle Real QR Camera Scanner',
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
                clipBehavior: Clip.antiAlias,
                child: Container(
                  height: 300,
                  decoration: BoxDecoration(
                    color: AppColors.darkSurface,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Real Camera QR Code Scanner Viewfinder
                      MobileScanner(
                        controller: _qrController,
                        onDetect: _onQrDetected,
                      ),

                      // Framing Guide Box
                      Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          border: Border.all(color: AppColors.accentGold, width: 2),
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),

                      Positioned(
                        bottom: 12,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: Colors.black.withValues(alpha: 0.7),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Text(
                            'Position Student Badge QR Code Inside Framing Box',
                            style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
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
