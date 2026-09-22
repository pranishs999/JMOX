// JMO Management System — Olympiad Results & Leaderboard Rankings (Standard Competition Ranking 1, 2, 2, 4)
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key});

  @override
  State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  final SupabaseService _service = SupabaseService();
  late List<ResultModel> _results;

  @override
  void initState() {
    super.initState();
    _results = _service.getResults();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Olympiad Rankings & Scorecards'),
        actions: [
          OutlinedButton.icon(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Exporting Leaderboard Report as CSV/PDF...')),
              );
            },
            icon: const Icon(Icons.download, size: 16),
            label: const Text('Export Report'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Official Olympiad Leaderboard', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Deterministic tie-breaking, Standard Competition Ranking (1, 2, 2, 4), and section score breakdown', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: Card(
                child: ListView.separated(
                  itemCount: _results.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final r = _results[index];
                    final isFirst = r.overallRank == 1;
                    final isSecond = r.overallRank == 2;
                    return ListTile(
                      leading: CircleAvatar(
                        backgroundColor: isFirst
                            ? AppColors.accentGold.withValues(alpha: 0.2)
                            : isSecond
                                ? AppColors.darkBorder
                                : AppColors.darkCard,
                        child: Text(
                          '#${r.overallRank}',
                          style: TextStyle(
                            color: isFirst
                                ? AppColors.accentGold
                                : isSecond
                                    ? Colors.white
                                    : AppColors.darkTextSecondary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      title: Text(r.studentName, style: const TextStyle(color: AppColors.darkTextPrimary, fontWeight: FontWeight.bold, fontSize: 14)),
                      subtitle: Text('${r.studentPublicId} • ${r.olympiadName}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text('${r.totalScore} / 50', style: const TextStyle(color: AppColors.accentEmerald, fontWeight: FontWeight.bold, fontSize: 14)),
                              Text(r.award, style: const TextStyle(color: AppColors.accentGold, fontSize: 11)),
                            ],
                          ),
                          const SizedBox(width: 12),
                          IconButton(
                            icon: const Icon(Icons.receipt_long, color: AppColors.accentIndigo, size: 20),
                            tooltip: 'View Section Scorecard',
                            onPressed: () => _showScorecardModal(r),
                          ),
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

  void _showScorecardModal(ResultModel r) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Official Scorecard — ${r.studentName} (${r.studentPublicId})'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Assessment: ${r.olympiadName}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
            Text('Overall Rank: #${r.overallRank} (${r.award})', style: const TextStyle(color: AppColors.accentGold, fontWeight: FontWeight.bold, fontSize: 14)),
            const Divider(height: 24),
            const Text('Section Breakdown:', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary, fontSize: 13)),
            const SizedBox(height: 8),
            _buildScoreRow('Section A — Everyday Math', '${r.sectionScores['Section A'] ?? 20.0} / 20.0'),
            _buildScoreRow('Section B — Logical Section', '${r.sectionScores['Section B'] ?? 15.0} / 15.0'),
            _buildScoreRow('Section C — Achievers Corner', '${r.sectionScores['Section C'] ?? 13.0} / 15.0'),
            const Divider(height: 24),
            _buildScoreRow('Total Composite Score', '${r.totalScore} / 50.0', isBold: true),
          ],
        ),
        actions: [
          ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
        ],
      ),
    );
  }

  Widget _buildScoreRow(String title, String score, {bool isBold = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: TextStyle(color: isBold ? AppColors.darkTextPrimary : AppColors.darkTextSecondary, fontSize: 12, fontWeight: isBold ? FontWeight.bold : FontWeight.normal)),
          Text(score, style: TextStyle(color: isBold ? AppColors.accentEmerald : AppColors.darkTextPrimary, fontSize: 12, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
