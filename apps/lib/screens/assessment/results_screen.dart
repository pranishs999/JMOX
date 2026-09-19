// JMO Management System — Olympiad Results & Leaderboard Rankings
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key});

  @override
  State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  late List<ResultModel> _results;

  @override
  void initState() {
    super.initState();
    _results = SupabaseService().getMockResults();
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
            const Text('Olympiad Results & Leaderboard', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
            const Text('Section score breakdown, tie-breaking ranks, and award certificates', style: TextStyle(fontSize: 13, color: Colors.grey)),
            const SizedBox(height: 20),

            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF111111),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.white.withOpacity(0.08)),
                ),
                child: ListView.separated(
                  itemCount: _results.length,
                  separatorBuilder: (_, __) => const Divider(color: Color(0xFF222222), height: 1),
                  itemBuilder: (context, index) {
                    final r = _results[index];
                    return ListTile(
                      leading: CircleAvatar(
                        backgroundColor: index == 0
                            ? Colors.amber.withOpacity(0.2)
                            : index == 1
                                ? Colors.grey.withOpacity(0.2)
                                : Colors.brown.withOpacity(0.2),
                        child: Text(
                          '#${r.overallRank}',
                          style: TextStyle(
                            color: index == 0
                                ? Colors.amber
                                : index == 1
                                    ? Colors.grey
                                    : Colors.orangeAccent,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      title: Text(r.studentName, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                      subtitle: Text('${r.studentPublicId} • ${r.olympiadName}', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                      trailing: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('${r.totalScore} / 50', style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 14)),
                          Text(r.award, style: const TextStyle(color: Colors.amber, fontSize: 11)),
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
}
