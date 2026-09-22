// JMO Management System — Problem Sets & Monthly Olympiad Assessment Builder
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class ProblemSetsScreen extends StatefulWidget {
  const ProblemSetsScreen({super.key});

  @override
  State<ProblemSetsScreen> createState() => _ProblemSetsScreenState();
}

class _ProblemSetsScreenState extends State<ProblemSetsScreen> {
  final SupabaseService _service = SupabaseService();
  late List<OlympiadModel> _olympiads;

  @override
  void initState() {
    super.initState();
    _olympiads = _service.getOlympiads();
  }

  @override
  Widget build(BuildContext context) {
    final activeOlympiad = _olympiads.isNotEmpty ? _olympiads.first : null;

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Problem Sets & Olympiad Builder'),
        actions: [
          ElevatedButton.icon(
            onPressed: () => _showAddAssessmentModal(context),
            icon: const Icon(Icons.add, size: 16),
            label: const Text('New Assessment'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: activeOlympiad == null
          ? const Center(child: Text('No active Olympiad assessment', style: TextStyle(color: AppColors.darkTextSecondary)))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Assessment Summary Banner
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(activeOlympiad.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                              const SizedBox(height: 4),
                              Text('Scheduled: ${activeOlympiad.eventDate} • Target Marks: 50.0 (Sum of Questions)', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: AppColors.accentEmerald.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              activeOlympiad.status.toUpperCase(),
                              style: const TextStyle(color: AppColors.accentEmerald, fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text('Olympiad Hierarchy & Question Sections', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                  const SizedBox(height: 12),

                  // Section Tree Render
                  ...activeOlympiad.sections.map((section) => _buildSectionWidget(section)),
                ],
              ),
            ),
    );
  }

  Widget _buildSectionWidget(OlympiadSectionModel section) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: ExpansionTile(
        initiallyExpanded: true,
        iconColor: AppColors.accentGold,
        collapsedIconColor: AppColors.darkTextSecondary,
        title: Text(section.name, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary, fontSize: 14)),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Render Blocks if present
                if (section.blocks.isNotEmpty)
                  ...section.blocks.map((block) => _buildBlockWidget(block)),

                // Render Direct Questions for Section B (where block_id == null)
                if (section.directQuestions.isNotEmpty) ...[
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 8),
                    child: Text('Direct Section Questions (Standalone)', style: TextStyle(color: AppColors.accentGold, fontSize: 12, fontWeight: FontWeight.bold)),
                  ),
                  ...section.directQuestions.map((q) => _buildQuestionWidget(q)),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBlockWidget(OlympiadBlockModel block) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.darkCard,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.darkBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(block.name, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.accentGold, fontSize: 13)),
              TextButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.add, size: 14),
                label: const Text('Add Question', style: TextStyle(fontSize: 11)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ...block.questions.map((q) => _buildQuestionWidget(q)),
        ],
      ),
    );
  }

  Widget _buildQuestionWidget(QuestionModel q) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.darkSurface,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.darkBorder),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 14,
            backgroundColor: AppColors.darkBorder,
            child: Text('${q.questionNumber}', style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 12, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(q.questionText, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13)),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(color: AppColors.darkCard, borderRadius: BorderRadius.circular(4)),
                      child: Text(q.type.name.toUpperCase(), style: const TextStyle(color: AppColors.accentIndigo, fontSize: 10, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(width: 8),
                    Text('+${q.positiveMarks} / -${q.negativeMarks} marks', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 11)),
                  ],
                ),
              ],
            ),
          ),
          IconButton(icon: const Icon(Icons.edit, size: 16, color: AppColors.darkTextSecondary), onPressed: () {}),
        ],
      ),
    );
  }

  void _showAddAssessmentModal(BuildContext context) {
    final nameCtrl = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Create Olympiad Assessment'),
        content: TextField(
          controller: nameCtrl,
          decoration: const InputDecoration(labelText: 'Olympiad Assessment Name'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (nameCtrl.text.isNotEmpty) {
                Navigator.pop(context);
              }
            },
            child: const Text('Create Template'),
          ),
        ],
      ),
    );
  }
}
