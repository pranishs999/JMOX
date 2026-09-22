// JMO Management System — Student Directory, Credential Generator, and QR View
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class StudentsScreen extends StatefulWidget {
  const StudentsScreen({super.key});

  @override
  State<StudentsScreen> createState() => _StudentsScreenState();
}

class _StudentsScreenState extends State<StudentsScreen> {
  final SupabaseService _service = SupabaseService();
  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final list = _service.getStudents().where((s) => s.fullName.toLowerCase().contains(_searchQuery) || s.publicId.toLowerCase().contains(_searchQuery)).toList();

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Student Directory'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showAddStudentModal,
            icon: const Icon(Icons.person_add, size: 16),
            label: const Text('Register Student'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Search Input
            TextField(
              onChanged: (val) => setState(() => _searchQuery = val.toLowerCase()),
              style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13),
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.search, color: AppColors.darkTextSecondary, size: 18),
                hintText: 'Search student by name or Public ID (e.g. STU-98214)...',
              ),
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: list.length,
                itemBuilder: (context, index) {
                  final s = list[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 20,
                            backgroundColor: AppColors.accentEmerald.withValues(alpha: 0.15),
                            child: Text(s.fullName.substring(0, 1), style: const TextStyle(color: AppColors.accentEmerald, fontWeight: FontWeight.bold)),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Text(s.fullName, style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold, fontSize: 15)),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: AppColors.darkBorder, borderRadius: BorderRadius.circular(4)),
                                      child: Text(s.publicId, style: const TextStyle(color: AppColors.accentGold, fontSize: 11, fontFamily: 'monospace', fontWeight: FontWeight.bold)),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text('${s.className ?? "Grade 8"} • ${s.batchName ?? "Batch Alpha"} • Guardian: ${s.guardianName ?? "N/A"} (${s.guardianPhone ?? "N/A"})', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                              ],
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.qr_code_2, color: AppColors.accentIndigo, size: 22),
                            tooltip: 'View Student QR Code',
                            onPressed: () => _showQrModal(s),
                          ),
                          IconButton(
                            icon: const Icon(Icons.key, color: AppColors.accentGold, size: 20),
                            tooltip: 'View Credentials & Reset Password',
                            onPressed: () => _showCredentialModal(s),
                          ),
                          IconButton(
                            icon: const Icon(Icons.edit, color: AppColors.darkTextSecondary, size: 20),
                            tooltip: 'Edit Profile',
                            onPressed: () => _showEditStudentModal(s),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: AppColors.accentCrimson, size: 20),
                            tooltip: 'Delete Student',
                            onPressed: () => _showDeleteStudentConfirmation(s),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showAddStudentModal() {
    final nameCtrl = TextEditingController();
    final emailCtrl = TextEditingController();
    final phoneCtrl = TextEditingController();
    final guardNameCtrl = TextEditingController();
    final guardPhoneCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Register Student Candidate'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Student Full Name')),
              const SizedBox(height: 12),
              TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email Address')),
              const SizedBox(height: 12),
              TextField(controller: phoneCtrl, decoration: const InputDecoration(labelText: 'Contact Phone')),
              const SizedBox(height: 12),
              TextField(controller: guardNameCtrl, decoration: const InputDecoration(labelText: 'Guardian Name')),
              const SizedBox(height: 12),
              TextField(controller: guardPhoneCtrl, decoration: const InputDecoration(labelText: 'Guardian Phone')),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                final newId = 'STU-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}';
                final newStudent = StudentModel(
                  id: 'std-${DateTime.now().millisecondsSinceEpoch}',
                  publicId: newId,
                  fullName: nameCtrl.text.trim(),
                  email: emailCtrl.text.trim().isNotEmpty ? emailCtrl.text.trim() : 'student@jmo.org',
                  phone: phoneCtrl.text.trim(),
                  className: 'Grade 8',
                  batchName: 'Batch Alpha',
                  guardianName: guardNameCtrl.text.trim(),
                  guardianPhone: guardPhoneCtrl.text.trim(),
                  generatedPassword: 'pass#$newId',
                );

                _service.addStudent(newStudent);
                setState(() {});
                Navigator.pop(context);
                _showCredentialModal(newStudent);
              }
            },
            child: const Text('Save & Generate Credentials'),
          ),
        ],
      ),
    );
  }

  void _showEditStudentModal(StudentModel s) {
    final nameCtrl = TextEditingController(text: s.fullName);
    final emailCtrl = TextEditingController(text: s.email);
    final phoneCtrl = TextEditingController(text: s.phone);
    final guardNameCtrl = TextEditingController(text: s.guardianName);
    final guardPhoneCtrl = TextEditingController(text: s.guardianPhone);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Student — ${s.publicId}'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Full Name')),
              const SizedBox(height: 12),
              TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email')),
              const SizedBox(height: 12),
              TextField(controller: phoneCtrl, decoration: const InputDecoration(labelText: 'Phone')),
              const SizedBox(height: 12),
              TextField(controller: guardNameCtrl, decoration: const InputDecoration(labelText: 'Guardian Name')),
              const SizedBox(height: 12),
              TextField(controller: guardPhoneCtrl, decoration: const InputDecoration(labelText: 'Guardian Phone')),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              final updated = StudentModel(
                id: s.id,
                publicId: s.publicId,
                fullName: nameCtrl.text.trim(),
                email: emailCtrl.text.trim(),
                phone: phoneCtrl.text.trim(),
                className: s.className,
                batchName: s.batchName,
                guardianName: guardNameCtrl.text.trim(),
                guardianPhone: guardPhoneCtrl.text.trim(),
                generatedPassword: s.generatedPassword,
              );
              _service.updateStudent(updated);
              setState(() {});
              Navigator.pop(context);
            },
            child: const Text('Save Changes'),
          ),
        ],
      ),
    );
  }

  void _showDeleteStudentConfirmation(StudentModel s) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Student Record'),
        content: Text('Are you sure you want to delete ${s.fullName} (${s.publicId})? This action cannot be undone.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteStudent(s.id);
              setState(() {});
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Student ${s.publicId} has been deleted.')),
              );
            },
            child: const Text('Delete Record'),
          ),
        ],
      ),
    );
  }

  void _showQrModal(StudentModel s) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Student Identification QR — ${s.publicId}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
              child: const Icon(Icons.qr_code_2, size: 160, color: Colors.black),
            ),
            const SizedBox(height: 12),
            Text(s.fullName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.darkTextPrimary)),
            Text(s.qrCodeData, style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12, fontFamily: 'monospace')),
          ],
        ),
        actions: [
          ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
        ],
      ),
    );
  }

  void _showCredentialModal(StudentModel s) {
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: Row(
          children: [
            const Icon(Icons.check_circle, color: AppColors.accentEmerald),
            const SizedBox(width: 8),
            Text('Credentials — ${s.publicId}'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Student Name: ${s.fullName}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
            const SizedBox(height: 16),
            const Text('Auto-Generated Login Password:', style: TextStyle(color: AppColors.accentGold, fontSize: 12, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.accentGold.withValues(alpha: 0.3)),
              ),
              child: SelectableText(
                s.generatedPassword ?? 'pass#${s.publicId}',
                style: const TextStyle(color: AppColors.accentGold, fontSize: 16, fontFamily: 'monospace', fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        actions: [
          OutlinedButton.icon(
            icon: const Icon(Icons.refresh, size: 16, color: AppColors.accentGold),
            label: const Text('Reset Password', style: TextStyle(color: AppColors.accentGold)),
            onPressed: () {
              final newPass = 'pass#${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}';
              _service.resetStudentPassword(s.id, newPass);
              setState(() {});
              Navigator.pop(dialogContext);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Password reset successfully for ${s.publicId}. New password: $newPass')),
              );
            },
          ),
          ElevatedButton(onPressed: () => Navigator.pop(dialogContext), child: const Text('Done')),
        ],
      ),
    );
  }
}
