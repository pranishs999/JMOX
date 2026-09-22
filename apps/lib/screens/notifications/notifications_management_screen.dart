// JMO Management System — Notifications Lifecycle & Scheduling Engine
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class NotificationsManagementScreen extends StatefulWidget {
  const NotificationsManagementScreen({super.key});

  @override
  State<NotificationsManagementScreen> createState() => _NotificationsManagementScreenState();
}

class _NotificationsManagementScreenState extends State<NotificationsManagementScreen> {
  final SupabaseService _service = SupabaseService();
  late List<NotificationModel> _list;

  @override
  void initState() {
    super.initState();
    _list = _service.getNotifications();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Notifications & Announcements'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showCreateNotificationModal,
            icon: const Icon(Icons.send_rounded, size: 16),
            label: const Text('Create Broadcast'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('System Announcements & Scheduled Messages', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Audience targeting (Facilitators, Students, All) and full lifecycle delivery tracking', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: _list.length,
                itemBuilder: (context, index) {
                  final item = _list[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          const CircleAvatar(
                            backgroundColor: AppColors.darkCard,
                            child: Icon(Icons.notifications_active, color: AppColors.accentGold),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary, fontSize: 14)),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: AppColors.darkBorder, borderRadius: BorderRadius.circular(4)),
                                      child: Text(item.targetRole.toUpperCase(), style: const TextStyle(color: AppColors.accentIndigo, fontSize: 10, fontWeight: FontWeight.bold)),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(item.message, style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                                const SizedBox(height: 4),
                                Text('Created: ${item.createdAt}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 11)),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              _service.toggleNotificationStatus(item.id);
                              setState(() {
                                _list = _service.getNotifications();
                              });
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: item.status == 'Sent' ? AppColors.accentEmerald.withValues(alpha: 0.15) : AppColors.accentGold.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                item.status.toUpperCase(),
                                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: item.status == 'Sent' ? AppColors.accentEmerald : AppColors.accentGold),
                              ),
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: AppColors.accentCrimson, size: 20),
                            tooltip: 'Delete Notification',
                            onPressed: () => _showDeleteNotificationConfirmation(item),
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

  void _showCreateNotificationModal() {
    final titleCtrl = TextEditingController();
    final msgCtrl = TextEditingController();
    String targetRole = 'all';

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => AlertDialog(
          title: const Text('New Notification Broadcast'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Title')),
              const SizedBox(height: 12),
              TextField(controller: msgCtrl, decoration: const InputDecoration(labelText: 'Message Body'), maxLines: 3),
              const SizedBox(height: 16),
              Row(
                children: [
                  const Text('Target: ', style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
                  ChoiceChip(
                    label: const Text('All'),
                    selected: targetRole == 'all',
                    onSelected: (sel) => setModalState(() => targetRole = 'all'),
                  ),
                  const SizedBox(width: 8),
                  ChoiceChip(
                    label: const Text('Facilitators'),
                    selected: targetRole == 'facilitators',
                    onSelected: (sel) => setModalState(() => targetRole = 'facilitators'),
                  ),
                  const SizedBox(width: 8),
                  ChoiceChip(
                    label: const Text('Students'),
                    selected: targetRole == 'students',
                    onSelected: (sel) => setModalState(() => targetRole = 'students'),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
            ElevatedButton(
              onPressed: () {
                if (titleCtrl.text.isNotEmpty && msgCtrl.text.isNotEmpty) {
                  final notif = NotificationModel(
                    id: 'not-${DateTime.now().millisecondsSinceEpoch}',
                    title: titleCtrl.text.trim(),
                    message: msgCtrl.text.trim(),
                    targetRole: targetRole,
                    status: 'Sent',
                    createdAt: DateTime.now().toString().substring(0, 16),
                  );
                  _service.addNotification(notif);
                  setState(() {
                    _list = _service.getNotifications();
                  });
                  Navigator.pop(context);
                }
              },
              child: const Text('Send Broadcast'),
            ),
          ],
        ),
      ),
    );
  }

  void _showDeleteNotificationConfirmation(NotificationModel item) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Notification'),
        content: Text('Are you sure you want to delete broadcast "${item.title}"?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentCrimson),
            onPressed: () {
              _service.deleteNotification(item.id);
              setState(() {
                _list = _service.getNotifications();
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Notification deleted successfully.')),
              );
            },
            child: const Text('Delete Broadcast'),
          ),
        ],
      ),
    );
  }
}
