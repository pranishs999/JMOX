// JMO Management System — Institute, Academic Year, Class, Batch & Subject Management
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class InstituteCrudScreen extends StatefulWidget {
  const InstituteCrudScreen({super.key});

  @override
  State<InstituteCrudScreen> createState() => _InstituteCrudScreenState();
}

class _InstituteCrudScreenState extends State<InstituteCrudScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final SupabaseService _service = SupabaseService();
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Institute & Academic Structure'),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: AppColors.accentGold,
          labelColor: AppColors.accentGold,
          unselectedLabelColor: AppColors.darkTextSecondary,
          tabs: const [
            Tab(text: 'Institute Profile'),
            Tab(text: 'Academic Years'),
            Tab(text: 'Classes'),
            Tab(text: 'Batches'),
            Tab(text: 'Subjects'),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Search & Filter Header
            Row(
              children: [
                Expanded(
                  child: TextField(
                    onChanged: (val) => setState(() => _searchQuery = val.toLowerCase()),
                    style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13),
                    decoration: const InputDecoration(
                      prefixIcon: Icon(Icons.search, color: AppColors.darkTextSecondary, size: 18),
                      hintText: 'Search entities...',
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildInstituteTab(),
                  _buildAcademicYearsTab(),
                  _buildClassesTab(),
                  _buildBatchesTab(),
                  _buildSubjectsTab(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInstituteTab() {
    final inst = _service.getInstitutes().first;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(inst.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                    Text('Code: ${inst.code} • Timezone: ${inst.timezone}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: () => _showEditInstituteModal(inst),
                  icon: const Icon(Icons.edit, size: 16),
                  label: const Text('Edit Institute Profile'),
                ),
              ],
            ),
            const Divider(height: 32),
            _buildDetailRow('Active Academic Year', inst.activeAcademicYear),
            _buildDetailRow('Contact Email', inst.contactEmail),
            _buildDetailRow('Status', inst.status.toUpperCase()),
          ],
        ),
      ),
    );
  }

  Widget _buildAcademicYearsTab() {
    final list = _service.getAcademicYears().where((ay) => ay.name.toLowerCase().contains(_searchQuery)).toList();
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            ElevatedButton.icon(
              onPressed: _showAddAcademicYearModal,
              icon: const Icon(Icons.add, size: 16),
              label: const Text('Add Academic Year'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.builder(
            itemCount: list.length,
            itemBuilder: (context, index) {
              final item = list[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: const Icon(Icons.calendar_today, color: AppColors.accentGold),
                  title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                  subtitle: Text('${item.startDate} to ${item.endDate}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        margin: const EdgeInsets.only(right: 8),
                        decoration: BoxDecoration(
                          color: item.isActive ? AppColors.accentEmerald.withValues(alpha: 0.15) : AppColors.darkBorder,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          item.status.toUpperCase(),
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: item.isActive ? AppColors.accentEmerald : AppColors.darkTextSecondary),
                        ),
                      ),
                      IconButton(icon: const Icon(Icons.edit, size: 18, color: AppColors.darkTextSecondary), onPressed: () => _showEditAcademicYearModal(item)),
                      IconButton(icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.accentCrimson), onPressed: () => _showDeleteAcademicYearConfirmation(item)),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildClassesTab() {
    final list = _service.getClasses().where((c) => c.name.toLowerCase().contains(_searchQuery)).toList();
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            ElevatedButton.icon(
              onPressed: _showAddClassModal,
              icon: const Icon(Icons.add, size: 16),
              label: const Text('Add Class'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.builder(
            itemCount: list.length,
            itemBuilder: (context, index) {
              final item = list[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: const Icon(Icons.school, color: AppColors.accentIndigo),
                  title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                  subtitle: Text('Sort Order: ${item.sortOrder}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(icon: const Icon(Icons.edit, size: 18, color: AppColors.darkTextSecondary), onPressed: () => _showEditClassModal(item)),
                      IconButton(icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.accentCrimson), onPressed: () => _showDeleteClassConfirmation(item)),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildBatchesTab() {
    final list = _service.getBatches().where((b) => b.name.toLowerCase().contains(_searchQuery)).toList();
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            ElevatedButton.icon(
              onPressed: _showAddBatchModal,
              icon: const Icon(Icons.add, size: 16),
              label: const Text('Add Batch'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.builder(
            itemCount: list.length,
            itemBuilder: (context, index) {
              final item = list[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: const Icon(Icons.grid_view, color: AppColors.accentEmerald),
                  title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                  subtitle: Text('${item.className ?? "Grade 8"} • Schedule: ${item.scheduleDays ?? "Mon, Wed, Fri"}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(icon: const Icon(Icons.edit, size: 18, color: AppColors.darkTextSecondary), onPressed: () => _showEditBatchModal(item)),
                      IconButton(icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.accentCrimson), onPressed: () => _showDeleteBatchConfirmation(item)),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSubjectsTab() {
    final list = _service.getSubjects().where((s) => s.name.toLowerCase().contains(_searchQuery) || s.code.toLowerCase().contains(_searchQuery)).toList();
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            ElevatedButton.icon(
              onPressed: _showAddSubjectModal,
              icon: const Icon(Icons.add, size: 16),
              label: const Text('Add Subject'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.builder(
            itemCount: list.length,
            itemBuilder: (context, index) {
              final item = list[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: const Icon(Icons.menu_book, color: AppColors.accentPurple),
                  title: Row(
                    children: [
                      Text(item.name, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.darkBorder, borderRadius: BorderRadius.circular(4)),
                        child: Text(item.code, style: const TextStyle(color: AppColors.accentGold, fontSize: 11, fontFamily: 'monospace')),
                      ),
                    ],
                  ),
                  subtitle: Text(item.description ?? ''),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(icon: const Icon(Icons.edit, size: 18, color: AppColors.darkTextSecondary), onPressed: () => _showEditSubjectModal(item)),
                      IconButton(icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.accentCrimson), onPressed: () => _showDeleteSubjectConfirmation(item)),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  void _showEditInstituteModal(InstituteModel inst) {
    final nameCtrl = TextEditingController(text: inst.name);
    final codeCtrl = TextEditingController(text: inst.code);
    final emailCtrl = TextEditingController(text: inst.contactEmail);
    final tzCtrl = TextEditingController(text: inst.timezone);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit Institute Profile'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Institute Name')),
              const SizedBox(height: 12),
              TextField(controller: codeCtrl, decoration: const InputDecoration(labelText: 'Institute Code')),
              const SizedBox(height: 12),
              TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Contact Email')),
              const SizedBox(height: 12),
              TextField(controller: tzCtrl, decoration: const InputDecoration(labelText: 'Timezone')),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                final updated = InstituteModel(
                  id: inst.id,
                  name: nameCtrl.text.trim(),
                  code: codeCtrl.text.trim(),
                  activeAcademicYear: inst.activeAcademicYear,
                  timezone: tzCtrl.text.trim(),
                  contactEmail: emailCtrl.text.trim(),
                  status: inst.status,
                );
                _service.updateInstitute(updated);
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save Changes'),
          ),
        ],
      ),
    );
  }

  void _showAddAcademicYearModal() {
    final nameCtrl = TextEditingController(text: '2026-2027');
    final startCtrl = TextEditingController(text: '2026-04-01');
    final endCtrl = TextEditingController(text: '2027-03-31');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Academic Year'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Academic Year Name')),
            const SizedBox(height: 12),
            TextField(controller: startCtrl, decoration: const InputDecoration(labelText: 'Start Date')),
            const SizedBox(height: 12),
            TextField(controller: endCtrl, decoration: const InputDecoration(labelText: 'End Date')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                final newAy = AcademicYearModel(
                  id: 'ay-${DateTime.now().millisecondsSinceEpoch}',
                  name: nameCtrl.text.trim(),
                  startDate: startCtrl.text.trim(),
                  endDate: endCtrl.text.trim(),
                  status: 'active',
                  isActive: true,
                );
                _service.addAcademicYear(newAy);
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showEditAcademicYearModal(AcademicYearModel item) {
    final nameCtrl = TextEditingController(text: item.name);
    final startCtrl = TextEditingController(text: item.startDate);
    final endCtrl = TextEditingController(text: item.endDate);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Academic Year — ${item.name}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Name')),
            const SizedBox(height: 12),
            TextField(controller: startCtrl, decoration: const InputDecoration(labelText: 'Start Date')),
            const SizedBox(height: 12),
            TextField(controller: endCtrl, decoration: const InputDecoration(labelText: 'End Date')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                final updated = AcademicYearModel(
                  id: item.id,
                  name: nameCtrl.text.trim(),
                  startDate: startCtrl.text.trim(),
                  endDate: endCtrl.text.trim(),
                  status: item.status,
                  isActive: item.isActive,
                );
                _service.updateAcademicYear(updated);
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showDeleteAcademicYearConfirmation(AcademicYearModel item) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Academic Year'),
        content: Text('Are you sure you want to delete ${item.name}?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteAcademicYear(item.id);
              setState(() {});
              Navigator.pop(context);
            },
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  void _showAddClassModal() {
    final nameCtrl = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Academic Class'),
        content: TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Class Name (e.g. Grade 10)')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                _service.addClass(ClassModel(id: 'cls-${DateTime.now().millisecondsSinceEpoch}', name: nameCtrl.text.trim(), academicYearId: 'ay-1'));
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showEditClassModal(ClassModel item) {
    final nameCtrl = TextEditingController(text: item.name);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Class — ${item.name}'),
        content: TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Class Name')),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                _service.updateClass(ClassModel(id: item.id, name: nameCtrl.text.trim(), academicYearId: item.academicYearId, sortOrder: item.sortOrder));
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showDeleteClassConfirmation(ClassModel item) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Class'),
        content: Text('Are you sure you want to delete ${item.name}?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteClass(item.id);
              setState(() {});
              Navigator.pop(context);
            },
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  void _showAddBatchModal() {
    final nameCtrl = TextEditingController();
    final schedCtrl = TextEditingController(text: 'Mon, Wed, Fri');
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Batch'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Batch Name (e.g. Batch Delta)')),
            const SizedBox(height: 12),
            TextField(controller: schedCtrl, decoration: const InputDecoration(labelText: 'Schedule Days')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                _service.addBatch(BatchModel(id: 'bat-${DateTime.now().millisecondsSinceEpoch}', name: nameCtrl.text.trim(), classId: 'cls-2', className: 'Grade 8', scheduleDays: schedCtrl.text.trim()));
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showEditBatchModal(BatchModel item) {
    final nameCtrl = TextEditingController(text: item.name);
    final schedCtrl = TextEditingController(text: item.scheduleDays ?? 'Mon, Wed, Fri');
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Batch — ${item.name}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Batch Name')),
            const SizedBox(height: 12),
            TextField(controller: schedCtrl, decoration: const InputDecoration(labelText: 'Schedule Days')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                _service.updateBatch(BatchModel(id: item.id, name: nameCtrl.text.trim(), classId: item.classId, className: item.className, scheduleDays: schedCtrl.text.trim()));
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showDeleteBatchConfirmation(BatchModel item) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Batch'),
        content: Text('Are you sure you want to delete ${item.name}?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteBatch(item.id);
              setState(() {});
              Navigator.pop(context);
            },
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  void _showAddSubjectModal() {
    final nameCtrl = TextEditingController();
    final codeCtrl = TextEditingController();
    final descCtrl = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Academic Subject'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Subject Name')),
            const SizedBox(height: 12),
            TextField(controller: codeCtrl, decoration: const InputDecoration(labelText: 'Subject Code (e.g. MATH-GEO)')),
            const SizedBox(height: 12),
            TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty && codeCtrl.text.isNotEmpty) {
                _service.addSubject(SubjectModel(id: 'sub-${DateTime.now().millisecondsSinceEpoch}', name: nameCtrl.text.trim(), code: codeCtrl.text.trim(), classId: 'cls-2', description: descCtrl.text.trim()));
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showEditSubjectModal(SubjectModel item) {
    final nameCtrl = TextEditingController(text: item.name);
    final codeCtrl = TextEditingController(text: item.code);
    final descCtrl = TextEditingController(text: item.description ?? '');
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Subject — ${item.name}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Subject Name')),
            const SizedBox(height: 12),
            TextField(controller: codeCtrl, decoration: const InputDecoration(labelText: 'Subject Code')),
            const SizedBox(height: 12),
            TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty && codeCtrl.text.isNotEmpty) {
                _service.updateSubject(SubjectModel(id: item.id, name: nameCtrl.text.trim(), code: codeCtrl.text.trim(), classId: item.classId, description: descCtrl.text.trim()));
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showDeleteSubjectConfirmation(SubjectModel item) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Subject'),
        content: Text('Are you sure you want to delete ${item.name}?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteSubject(item.id);
              setState(() {});
              Navigator.pop(context);
            },
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailRow(String title, String val) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
          Text(val, style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold, fontSize: 13)),
        ],
      ),
    );
  }
}
