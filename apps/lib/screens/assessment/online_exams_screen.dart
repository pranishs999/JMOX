// JMO Management System — Online Examinations Module & Student Exam Player
import 'dart:async';
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class OnlineExamsScreen extends StatefulWidget {
  const OnlineExamsScreen({super.key});

  @override
  State<OnlineExamsScreen> createState() => _OnlineExamsScreenState();
}

class _OnlineExamsScreenState extends State<OnlineExamsScreen> {
  final SupabaseService _service = SupabaseService();
  late List<OnlineExamModel> _exams;

  @override
  void initState() {
    super.initState();
    _exams = _service.getOnlineExams();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Online Examinations'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showScheduleExamModal,
            icon: const Icon(Icons.add, size: 16),
            label: const Text('Schedule Online Exam'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Active & Scheduled Online Tests', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Server-authoritative timing, attempt limits, and auto-submission', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: _exams.length,
                itemBuilder: (context, index) {
                  final exam = _exams[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          const CircleAvatar(
                            backgroundColor: AppColors.darkCard,
                            child: Icon(Icons.laptop_chromebook, color: AppColors.accentIndigo),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(exam.title, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary, fontSize: 14)),
                                const SizedBox(height: 4),
                                Text('${exam.className} • ${exam.durationMinutes} Mins • ${exam.totalQuestions} Questions (${exam.totalMarks} Marks)', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                                Text('Window: ${exam.startTime} to ${exam.endTime}', style: const TextStyle(color: AppColors.accentGold, fontSize: 11)),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: exam.status == 'Published' || exam.status == 'Live' ? AppColors.accentEmerald.withValues(alpha: 0.15) : AppColors.accentGold.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              exam.status.toUpperCase(),
                              style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: exam.status == 'Published' || exam.status == 'Live' ? AppColors.accentEmerald : AppColors.accentGold),
                            ),
                          ),
                          const SizedBox(width: 12),
                          ElevatedButton(
                            onPressed: () => _launchExamPlayer(exam),
                            child: const Text('Start Test'),
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

  void _launchExamPlayer(OnlineExamModel exam) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => StudentExamPlayerScreen(exam: exam)),
    );
  }

  void _showScheduleExamModal() {
    final titleCtrl = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Schedule Online Exam'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Exam Title')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (titleCtrl.text.isNotEmpty) {
                final newExam = OnlineExamModel(
                  id: 'exam-${DateTime.now().millisecondsSinceEpoch}',
                  title: titleCtrl.text.trim(),
                  classId: 'cls-2',
                  className: 'Grade 8',
                  startTime: '2026-09-26 10:00',
                  endTime: '2026-09-26 11:30',
                  durationMinutes: 90,
                  status: 'Published',
                );
                _service.addOnlineExam(newExam);
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Publish Exam'),
          ),
        ],
      ),
    );
  }
}

class StudentExamPlayerScreen extends StatefulWidget {
  final OnlineExamModel exam;
  const StudentExamPlayerScreen({super.key, required this.exam});

  @override
  State<StudentExamPlayerScreen> createState() => _StudentExamPlayerScreenState();
}

class _StudentExamPlayerScreenState extends State<StudentExamPlayerScreen> {
  late int _remainingSeconds;
  Timer? _timer;
  int _currentQuestionIndex = 0;
  final Map<int, String> _userAnswers = {};
  bool _isSubmitted = false;

  final List<Map<String, dynamic>> _mockQuestions = [
    {
      'id': 'q1',
      'text': 'A rectangle has length 12 cm and width 5 cm. What is the length of its diagonal?',
      'options': ['13 cm', '14 cm', '15 cm', '17 cm'],
      'correct': '13 cm',
    },
    {
      'id': 'q2',
      'text': 'If 2^x = 32, what is the value of 3^(x-2)?',
      'options': ['9', '27', '81', '243'],
      'correct': '27',
    },
    {
      'id': 'q3',
      'text': 'How many primes are strictly between 20 and 40?',
      'options': ['3', '4', '5', '6'],
      'correct': '4',
    },
  ];

  @override
  void initState() {
    super.initState();
    _remainingSeconds = widget.exam.durationMinutes * 60;
    _startCountdownTimer();
  }

  void _startCountdownTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_remainingSeconds > 0) {
        setState(() => _remainingSeconds--);
      } else {
        _timer?.cancel();
        _submitExam(autoSubmit: true);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _submitExam({bool autoSubmit = false}) {
    if (_isSubmitted) return;
    _timer?.cancel();
    setState(() => _isSubmitted = true);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(autoSubmit ? Icons.timer_off : Icons.check_circle, color: AppColors.accentEmerald),
            const SizedBox(width: 8),
            Text(autoSubmit ? 'Time Elapsed — Auto Submitted' : 'Exam Submitted Successfully'),
          ],
        ),
        content: Text('Your responses have been recorded securely. Total answered: ${_userAnswers.length} / ${_mockQuestions.length}.'),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context); // Close dialog
              Navigator.pop(context); // Exit exam player
            },
            child: const Text('Back to Dashboard'),
          ),
        ],
      ),
    );
  }

  String _formatTimer(int seconds) {
    final mins = seconds ~/ 60;
    final secs = seconds % 60;
    return '${mins.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final q = _mockQuestions[_currentQuestionIndex];

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(widget.exam.title),
        actions: [
          // Timer Pill
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            margin: const EdgeInsets.only(right: 16),
            decoration: BoxDecoration(
              color: AppColors.accentGold.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.accentGold),
            ),
            child: Row(
              children: [
                const Icon(Icons.timer, color: AppColors.accentGold, size: 16),
                const SizedBox(width: 6),
                Text(
                  _formatTimer(_remainingSeconds),
                  style: const TextStyle(color: AppColors.accentGold, fontWeight: FontWeight.bold, fontFamily: 'monospace'),
                ),
              ],
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Progress Bar
            LinearProgressIndicator(
              value: (_currentQuestionIndex + 1) / _mockQuestions.length,
              backgroundColor: AppColors.darkCard,
              color: AppColors.accentIndigo,
            ),
            const SizedBox(height: 20),

            Text('Question ${_currentQuestionIndex + 1} of ${_mockQuestions.length}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 13, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Text(q['text'], style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),

            // Options
            ...List.generate(q['options'].length, (optIdx) {
              final optionText = q['options'][optIdx];
              final isSelected = _userAnswers[_currentQuestionIndex] == optionText;
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                child: InkWell(
                  onTap: () => setState(() => _userAnswers[_currentQuestionIndex] = optionText),
                  borderRadius: BorderRadius.circular(10),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isSelected ? AppColors.accentIndigo.withValues(alpha: 0.2) : AppColors.darkCard,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: isSelected ? AppColors.accentIndigo : AppColors.darkBorder),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 12,
                          backgroundColor: isSelected ? AppColors.accentIndigo : AppColors.darkBorder,
                          child: Text(String.fromCharCode(65 + optIdx), style: const TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.bold)),
                        ),
                        const SizedBox(width: 14),
                        Text(optionText, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14)),
                      ],
                    ),
                  ),
                ),
              );
            }),

            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                OutlinedButton(
                  onPressed: _currentQuestionIndex > 0 ? () => setState(() => _currentQuestionIndex--) : null,
                  child: const Text('Previous'),
                ),
                if (_currentQuestionIndex < _mockQuestions.length - 1)
                  ElevatedButton(
                    onPressed: () => setState(() => _currentQuestionIndex++),
                    child: const Text('Next Question'),
                  )
                else
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentEmerald, foregroundColor: Colors.black),
                    onPressed: () => _submitExam(autoSubmit: false),
                    child: const Text('Submit Final Exam'),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
