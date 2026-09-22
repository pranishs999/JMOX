// JMO Management System — Facilitators & Mentors Directory & Assignments
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class FacilitatorsScreen extends StatefulWidget {
  const FacilitatorsScreen({super.key});

  @override
  State<FacilitatorsScreen> createState() => _FacilitatorsScreenState();
}

class _FacilitatorsScreenState extends State<FacilitatorsScreen> {
  final SupabaseService _service = SupabaseService();
  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final list = _service.getFacilitators().where((f) => f.fullName.toLowerCase().contains(_searchQuery) || f.publicId.toLowerCase().contains(_searchQuery)).toList();

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Facilitator Directory'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showAddFacilitatorModal,
            icon: const Icon(Icons.add, size: 16),
            label: const Text('Add Facilitator'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Input
            TextField(
              onChanged: (val) => setState(() => _searchQuery = val.toLowerCase()),
              style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13),
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.search, color: AppColors.darkTextSecondary, size: 18),
                hintText: 'Search by name or Public ID (e.g. FAC-41029)...',
              ),
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: list.length,
                itemBuilder: (context, index) {
                  final f = list[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          const CircleAvatar(
                            radius: 20,
                            backgroundColor: AppColors.darkCard,
                            child: Icon(
                              Icons.psychology,
                              color: AppColors.accentIndigo,
                              size: 20,
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Text(f.fullName, style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold, fontSize: 15)),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: AppColors.darkBorder, borderRadius: BorderRadius.circular(4)),
                                      child: Text(f.publicId, style: const TextStyle(color: AppColors.accentGold, fontSize: 11, fontFamily: 'monospace', fontWeight: FontWeight.bold)),
                                    ),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: AppColors.accentIndigo.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
                                      child: Text(f.role.label.toUpperCase(), style: const TextStyle(color: AppColors.accentIndigo, fontSize: 10, fontWeight: FontWeight.bold)),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text('Email: ${f.email ?? "N/A"} • Phone: ${f.phone ?? "N/A"}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                                const SizedBox(height: 6),
                                Wrap(
                                  spacing: 6,
                                  children: f.assignedBatches.map((b) => Chip(
                                    label: Text(b, style: const TextStyle(fontSize: 10, color: AppColors.darkTextPrimary)),
                                    backgroundColor: AppColors.darkCard,
                                    padding: EdgeInsets.zero,
                                    visualDensity: VisualDensity.compact,
                                  )).toList(),
                                ),
                              ],
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.key, color: AppColors.accentGold, size: 20),
                            tooltip: 'View Credentials & Reset Password',
                            onPressed: () => _showCredentialModal(f),
                          ),
                          IconButton(
                            icon: const Icon(Icons.edit, color: AppColors.darkTextSecondary, size: 20),
                            tooltip: 'Edit Profile',
                            onPressed: () => _showEditFacilitatorModal(f),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: AppColors.accentCrimson, size: 20),
                            tooltip: 'Delete Facilitator',
                            onPressed: () => _showDeleteFacilitatorConfirmation(f),
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

  void _showAddFacilitatorModal() {
    final nameCtrl = TextEditingController();
    final emailCtrl = TextEditingController();
    final phoneCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Facilitator'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Full Name')),
            const SizedBox(height: 12),
            TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email Address')),
            const SizedBox(height: 12),
            TextField(controller: phoneCtrl, decoration: const InputDecoration(labelText: 'Phone Number')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                final newId = 'FAC-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}';
                final newFac = FacilitatorModel(
                  id: 'fac-${DateTime.now().millisecondsSinceEpoch}',
                  publicId: newId,
                  fullName: nameCtrl.text.trim(),
                  email: emailCtrl.text.trim().isNotEmpty ? emailCtrl.text.trim() : 'facilitator@jmo.org',
                  phone: phoneCtrl.text.trim(),
                  role: UserRole.facilitator,
                  assignedBatches: ['Batch Alpha'],
                  generatedPassword: 'pass#$newId',
                );
                _service.addFacilitator(newFac);
                setState(() {});
                Navigator.pop(context);
                _showCredentialModal(newFac);
              }
            },
            child: const Text('Save & Generate Credentials'),
          ),
        ],
      ),
    );
  }

  void _showEditFacilitatorModal(FacilitatorModel f) {
    final nameCtrl = TextEditingController(text: f.fullName);
    final emailCtrl = TextEditingController(text: f.email);
    final phoneCtrl = TextEditingController(text: f.phone);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Profile — ${f.publicId}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Full Name')),
            const SizedBox(height: 12),
            TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email')),
            const SizedBox(height: 12),
            TextField(controller: phoneCtrl, decoration: const InputDecoration(labelText: 'Phone')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              final updated = FacilitatorModel(
                id: f.id,
                publicId: f.publicId,
                fullName: nameCtrl.text.trim(),
                email: emailCtrl.text.trim(),
                phone: phoneCtrl.text.trim(),
                role: f.role,
                assignedBatches: f.assignedBatches,
                assignedSubjects: f.assignedSubjects,
                generatedPassword: f.generatedPassword,
              );
              _service.updateFacilitator(updated);
              setState(() {});
              Navigator.pop(context);
            },
            child: const Text('Save Changes'),
          ),
        ],
      ),
    );
  }

  void _showDeleteFacilitatorConfirmation(FacilitatorModel f) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Facilitator Record'),
        content: Text('Are you sure you want to delete ${f.fullName} (${f.publicId})? This action cannot be undone.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteFacilitator(f.id);
              setState(() {});
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Facilitator ${f.publicId} has been deleted.')),
              );
            },
            child: const Text('Delete Record'),
          ),
        ],
      ),
    );
  }

  void _showCredentialModal(FacilitatorModel f) {
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: Row(
          children: [
            const Icon(Icons.security, color: AppColors.accentGold),
            const SizedBox(width: 8),
            Text('Credentials — ${f.publicId}'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Full Name: ${f.fullName}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
            Text('Role: ${f.role.label}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
            const SizedBox(height: 16),
            const Text('Auto-Generated Password:', style: TextStyle(color: AppColors.accentGold, fontSize: 12, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.accentGold.withValues(alpha: 0.3)),
              ),
              child: SelectableText(
                f.generatedPassword ?? 'pass#${f.publicId}',
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
              _service.resetFacilitatorPassword(f.id, newPass);
              setState(() {});
              Navigator.pop(dialogContext);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Password reset successfully for ${f.publicId}. New password: $newPass')),
              );
            },
          ),
          ElevatedButton(onPressed: () => Navigator.pop(dialogContext), child: const Text('Done')),
        ],
      ),
    );
  }
}
