// JMO Management System — Unified Cross-Platform App Shell & Navigation Layout
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';
import '../models/app_models.dart';
import '../theme/app_theme.dart';

class AppShell extends StatelessWidget {
  final Widget child;

  const AppShell({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final isDesktop = MediaQuery.of(context).size.width >= 900;
    final currentRoute = GoRouterState.of(context).uri.toString();

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.school, color: AppColors.primaryNavy, size: 20),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'JMO Portal',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary),
                ),
                Text(
                  'Institute Platform (${auth.role.label.toUpperCase()})',
                  style: const TextStyle(fontSize: 11, color: AppColors.darkTextSecondary),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Quick Role Switcher (Dev Review)
          PopupMenuButton<UserRole>(
            tooltip: 'Switch User Role',
            icon: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.darkCard,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppColors.darkBorder),
              ),
              child: Row(
                children: [
                  Icon(
                    auth.role == UserRole.admin
                        ? Icons.admin_panel_settings
                        : auth.role == UserRole.facilitator
                            ? Icons.psychology
                            : auth.role == UserRole.technician
                                ? Icons.build_circle
                                : Icons.person,
                    size: 16,
                    color: AppColors.accentGold,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    auth.role.label.toUpperCase(),
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.darkTextPrimary),
                  ),
                  const SizedBox(width: 4),
                  const Icon(Icons.arrow_drop_down, size: 16, color: AppColors.darkTextSecondary),
                ],
              ),
            ),
            onSelected: (role) => auth.switchRole(role),
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: UserRole.admin,
                child: Row(
                  children: [
                    Icon(Icons.admin_panel_settings, size: 18, color: AppColors.accentGold),
                    SizedBox(width: 8),
                    Text('Admin View'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: UserRole.facilitator,
                child: Row(
                  children: [
                    Icon(Icons.psychology, size: 18, color: AppColors.accentIndigo),
                    SizedBox(width: 8),
                    Text('Facilitator View'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: UserRole.student,
                child: Row(
                  children: [
                    Icon(Icons.person, size: 18, color: AppColors.accentEmerald),
                    SizedBox(width: 8),
                    Text('Student View'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: UserRole.technician,
                child: Row(
                  children: [
                    Icon(Icons.build_circle, size: 18, color: Colors.orange),
                    SizedBox(width: 8),
                    Text('Technician View (Diagnostics)'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.logout, color: AppColors.darkTextSecondary, size: 20),
            onPressed: () {
              auth.logout();
              context.go('/login');
            },
          ),
          const SizedBox(width: 12),
        ],
      ),
      drawer: isDesktop ? null : Drawer(child: _buildNavContent(context, auth, currentRoute)),
      body: Row(
        children: [
          if (isDesktop)
            Container(
              width: 250,
              decoration: const BoxDecoration(
                color: AppColors.darkSurface,
                border: Border(right: BorderSide(color: AppColors.darkBorder)),
              ),
              child: _buildNavContent(context, auth, currentRoute),
            ),
          Expanded(
            child: SelectionArea(
              child: child,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavContent(BuildContext context, AuthService auth, String currentRoute) {
    final navItems = _getNavItems(auth.role);

    return Material(
      color: AppColors.darkSurface,
      child: Column(
        children: [
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppColors.darkCard,
                  child: Text(
                    auth.currentUser?.email.substring(0, 1).toUpperCase() ?? 'U',
                    style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        auth.currentUser?.publicId ?? 'USR-000',
                        style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        auth.currentUser?.email ?? '',
                        style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 11),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(color: AppColors.darkBorder, height: 24),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              itemCount: navItems.length,
              itemBuilder: (context, index) {
                final item = navItems[index];
                final isActive = currentRoute == item['route'];

                return Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: ListTile(
                    dense: true,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    selected: isActive,
                    selectedTileColor: AppColors.darkTextPrimary,
                    leading: Icon(
                      item['icon'] as IconData,
                      size: 18,
                      color: isActive ? Colors.black : AppColors.darkTextSecondary,
                    ),
                    title: Text(
                      item['title'] as String,
                      style: TextStyle(
                        color: isActive ? Colors.black : AppColors.darkTextPrimary,
                        fontSize: 13,
                        fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
                      ),
                    ),
                    onTap: () {
                      if (Scaffold.of(context).isDrawerOpen) {
                        Navigator.pop(context);
                      }
                      context.go(item['route'] as String);
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  List<Map<String, dynamic>> _getNavItems(UserRole role) {
    final List<Map<String, dynamic>> baseItems = [
      {'title': 'Change Password', 'route': '/settings/change-password', 'icon': Icons.lock_reset_rounded},
    ];

    if (role == UserRole.admin) {
      return [
        {'title': 'Institute Overview', 'route': '/', 'icon': Icons.dashboard_rounded},
        {'title': 'Institute Structure', 'route': '/institutes', 'icon': Icons.school_rounded},
        {'title': 'Student Directory', 'route': '/students', 'icon': Icons.people_alt_rounded},
        {'title': 'Facilitator Directory', 'route': '/facilitators', 'icon': Icons.badge_rounded},
        {'title': 'Attendance Sessions', 'route': '/attendance', 'icon': Icons.fact_check_rounded},
        {'title': 'Problem Sets Builder', 'route': '/problem-sets', 'icon': Icons.assignment_rounded},
        {'title': 'Online Examinations', 'route': '/examinations/online', 'icon': Icons.laptop_chromebook_rounded},
        {'title': 'OMR Camera Scanner', 'route': '/examinations/omr', 'icon': Icons.camera_alt_rounded},
        {'title': 'Rankings & Leaderboards', 'route': '/examinations/results', 'icon': Icons.military_tech_rounded},
        {'title': 'Learning Materials', 'route': '/materials', 'icon': Icons.folder_zip_rounded},
        {'title': 'Recommended Books', 'route': '/books', 'icon': Icons.book_rounded},
        {'title': 'Notifications', 'route': '/notifications', 'icon': Icons.notifications_active_rounded},
        {'title': 'Security Audit Trail', 'route': '/audit-logs', 'icon': Icons.security_rounded},
        ...baseItems,
      ];
    } else if (role == UserRole.facilitator) {
      return [
        {'title': 'Facilitator Portal', 'route': '/', 'icon': Icons.dashboard_rounded},
        {'title': 'Assigned Batches & Students', 'route': '/students', 'icon': Icons.groups_rounded},
        {'title': 'Attendance Marking', 'route': '/attendance', 'icon': Icons.fact_check_rounded},
        {'title': 'OMR Camera Scanner', 'route': '/examinations/omr', 'icon': Icons.camera_alt_rounded},
        {'title': 'Online Tests', 'route': '/examinations/online', 'icon': Icons.laptop_chromebook_rounded},
        {'title': 'Olympiad Results', 'route': '/examinations/results', 'icon': Icons.military_tech_rounded},
        {'title': 'Learning Materials', 'route': '/materials', 'icon': Icons.folder_zip_rounded},
        {'title': 'Recommended Books', 'route': '/books', 'icon': Icons.book_rounded},
        ...baseItems,
      ];
    } else if (role == UserRole.technician) {
      return [
        {'title': 'Diagnostics Console', 'route': '/', 'icon': Icons.terminal_rounded},
        {'title': 'Scanner Device Test', 'route': '/examinations/omr', 'icon': Icons.camera_alt_rounded},
        {'title': 'Attendance Sync Queue', 'route': '/attendance', 'icon': Icons.sync_rounded},
        {'title': 'Security Audit Trail', 'route': '/audit-logs', 'icon': Icons.security_rounded},
        ...baseItems,
      ];
    } else {
      return [
        {'title': 'Student Dashboard', 'route': '/', 'icon': Icons.dashboard_rounded},
        {'title': 'My Results & Rank Cards', 'route': '/examinations/results', 'icon': Icons.emoji_events_rounded},
        {'title': 'Online Exams', 'route': '/examinations/online', 'icon': Icons.laptop_chromebook_rounded},
        {'title': 'My Attendance Record', 'route': '/attendance', 'icon': Icons.fact_check_rounded},
        {'title': 'Learning Materials', 'route': '/materials', 'icon': Icons.folder_zip_rounded},
        {'title': 'Recommended Books', 'route': '/books', 'icon': Icons.book_rounded},
        {'title': 'Institute Notices', 'route': '/notifications', 'icon': Icons.notifications_rounded},
        ...baseItems,
      ];
    }
  }
}
