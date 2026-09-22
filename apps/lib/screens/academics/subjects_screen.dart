// JMO Management System — Academic Subjects Screen
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class SubjectsScreen extends StatefulWidget {
  const SubjectsScreen({super.key});

  @override
  State<SubjectsScreen> createState() => _SubjectsScreenState();
}

class _SubjectsScreenState extends State<SubjectsScreen> {
  final SupabaseService _service = SupabaseService();
  late List<SubjectModel> _subjects;

  @override
  void initState() {
    super.initState();
    _subjects = _service.getSubjects();
  }

  void _showAddSubjectModal() {
    final nameCtrl = TextEditingController();
    final codeCtrl = TextEditingController();
    final descCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Subject Module'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Subject Name')),
            const SizedBox(height: 12),
            TextField(controller: codeCtrl, decoration: const InputDecoration(labelText: 'Subject Code (e.g. MATH-ALG)')),
            const SizedBox(height: 12),
            TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty && codeCtrl.text.isNotEmpty) {
                final newSub = SubjectModel(
                  id: 'sub-${DateTime.now().millisecondsSinceEpoch}',
                  name: nameCtrl.text.trim(),
                  code: codeCtrl.text.trim(),
                  classId: 'cls-2',
                  description: descCtrl.text.trim(),
                );
                _service.addSubject(newSub);
                setState(() => _subjects = _service.getSubjects());
                Navigator.pop(context);
              }
            },
            child: const Text('Save Subject'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Academic Subjects'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showAddSubjectModal,
            icon: const Icon(Icons.add, size: 16),
            label: const Text('Add Subject'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Curriculum Modules & Subject Codes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Managed subjects mapped across academic classes', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: _subjects.length,
                itemBuilder: (context, index) {
                  final s = _subjects[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          const CircleAvatar(
                            backgroundColor: AppColors.darkCard,
                            child: Icon(Icons.menu_book, color: AppColors.accentIndigo, size: 20),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Text(s.name, style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold, fontSize: 15)),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: AppColors.darkBorder, borderRadius: BorderRadius.circular(4)),
                                      child: Text(s.code, style: const TextStyle(color: AppColors.accentGold, fontSize: 11, fontFamily: 'monospace')),
                                    ),
                                  ],
                                ),
                                if (s.description != null) ...[
                                  const SizedBox(height: 4),
                                  Text(s.description!, style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                                ],
                              ],
                            ),
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
}
