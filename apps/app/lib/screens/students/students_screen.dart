// JMO Management System — Students Directory & Credential Generation
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';

class StudentsScreen extends StatefulWidget {
  const StudentsScreen({super.key});

  @override
  State<StudentsScreen> createState() => _StudentsScreenState();
}

class _StudentsScreenState extends State<StudentsScreen> {
  late List<StudentModel> _students;

  @override
  void initState() {
    super.initState();
    _students = SupabaseService().getMockStudents();
  }

  void _showAddStudentModal() {
    final nameCtrl = TextEditingController();
    final emailCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF111111),
        title: const Text('Register New Student', style: TextStyle(color: Colors.white, fontSize: 16)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameCtrl,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(labelText: 'Full Name', labelStyle: TextStyle(color: Colors.grey)),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: emailCtrl,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(labelText: 'Email Address', labelStyle: TextStyle(color: Colors.grey)),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel', style: TextStyle(color: Colors.grey)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: Colors.black),
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                final newId = 'STU-982${_students.length + 17}';
                final genPass = 'pass#$newId';
                final newStudent = StudentModel(
                  id: 'std-${_students.length + 1}',
                  publicId: newId,
                  fullName: nameCtrl.text.trim(),
                  email: emailCtrl.text.trim().isNotEmpty ? emailCtrl.text.trim() : 'student@jmo.org',
                  className: 'Class 8',
                  batchName: 'Batch Alpha',
                  generatedPassword: genPass,
                );

                setState(() => _students.add(newStudent));
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

  void _showCredentialModal(StudentModel student) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF111111),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.check_circle, color: Color(0xFF10B981)),
            SizedBox(width: 8),
            Text('Student Created Successfully', style: TextStyle(color: Colors.white, fontSize: 16)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Student Name: ${student.fullName}', style: const TextStyle(color: Colors.grey, fontSize: 13)),
            const SizedBox(height: 4),
            Text('Public ID: ${student.publicId}', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 16),
            const Text('Auto-Generated Login Password:', style: TextStyle(color: Colors.amber, fontSize: 12, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.amber.withOpacity(0.3)),
              ),
              child: SelectableText(
                student.generatedPassword ?? 'pass#STU98214',
                style: const TextStyle(color: Colors.amber, fontSize: 16, fontFamily: 'monospace', fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: Colors.black),
            onPressed: () => Navigator.pop(context),
            child: const Text('Done'),
          ),
        ],
      ),
    );
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
                    Text('Student Directory', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                    Text('Manage student profiles, enrollments, and login passwords', style: TextStyle(fontSize: 13, color: Colors.grey)),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: _showAddStudentModal,
                  icon: const Icon(Icons.add, size: 18),
                  label: const Text('Add Student'),
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: Colors.black),
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
                        child: Text(s.fullName.substring(0, 1), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      ),
                      title: Text(s.fullName, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                      subtitle: Text('${s.publicId} • ${s.className ?? "Class 8"} (${s.batchName ?? "Batch Alpha"})', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                      trailing: IconButton(
                        icon: const Icon(Icons.key, color: Colors.amber, size: 20),
                        tooltip: 'View Login Credentials',
                        onPressed: () => _showCredentialModal(s),
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
}
