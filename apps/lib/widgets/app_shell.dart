// JMO Management System — Unified Cross-Platform App Shell Layout
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';
import '../models/app_models.dart';

class AppShell extends StatelessWidget {
  final Widget child;

  const AppShell({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final isDesktop = MediaQuery.of(context).size.width >= 900;
    final currentRoute = GoRouterState.of(context).uri.toString();

    return Scaffold(
      backgroundColor: const Color(0xFF0A0A0A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF111111),
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
              child: const Icon(Icons.school, color: Color(0xFF0A0A0A), size: 20),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'JMO Portal',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                Text(
                  'Unified System (${auth.role.value.toUpperCase()})',
                  style: const TextStyle(fontSize: 11, color: Colors.grey),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Role Quick Switcher for Demo & Testing
          PopupMenuButton<UserRole>(
            tooltip: 'Switch User Role',
            icon: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.08),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: Colors.white.withOpacity(0.12)),
              ),
              child: Row(
                children: [
                  Icon(
                    auth.role == UserRole.admin
                        ? Icons.admin_panel_settings
                        : auth.role == UserRole.teacher
                            ? Icons.psychology
                            : Icons.person,
                    size: 16,
                    color: Colors.amber,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    auth.role.value.toUpperCase(),
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.white),
                  ),
                  const SizedBox(width: 4),
                  const Icon(Icons.arrow_drop_down, size: 16, color: Colors.grey),
                ],
              ),
            ),
            onSelected: (role) => auth.switchRole(role),
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: UserRole.admin,
                child: Row(
                  children: [
                    Icon(Icons.admin_panel_settings, size: 18, color: Colors.amber),
                    SizedBox(width: 8),
                    Text('Admin View'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: UserRole.teacher,
                child: Row(
                  children: [
                    Icon(Icons.psychology, size: 18, color: Colors.blue),
                    SizedBox(width: 8),
                    Text('Facilitator / Mentor View'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: UserRole.student,
                child: Row(
                  children: [
                    Icon(Icons.person, size: 18, color: Color(0xFF10B981)),
                    SizedBox(width: 8),
                    Text('Student View'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.grey, size: 20),
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
              width: 240,
              decoration: const BoxDecoration(
                color: Color(0xFF111111),
                border: Border(right: BorderSide(color: Color(0xFF222222))),
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

    return Container(
      color: const Color(0xFF111111),
      child: Column(
        children: [
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: Colors.white.withOpacity(0.1),
                  child: Text(
                    auth.currentUser?.email.substring(0, 1).toUpperCase() ?? 'U',
                    style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        auth.currentUser?.publicId ?? 'USR-000',
                        style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        auth.currentUser?.email ?? '',
                        style: const TextStyle(color: Colors.grey, fontSize: 11),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(color: Color(0xFF222222), height: 24),
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
                    selectedTileColor: Colors.white,
                    leading: Icon(
                      item['icon'] as IconData,
                      size: 20,
                      color: isActive ? Colors.black : Colors.grey,
                    ),
                    title: Text(
                      item['title'] as String,
                      style: TextStyle(
                        color: isActive ? Colors.black : Colors.grey[300],
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
    if (role == UserRole.admin) {
      return [
        {'title': 'Dashboard', 'route': '/', 'icon': Icons.dashboard_rounded},
        {'title': 'Students Directory', 'route': '/students', 'icon': Icons.people_alt_rounded},
        {'title': 'Facilitators / Teachers', 'route': '/teachers', 'icon': Icons.badge_rounded},
        {'title': 'Classes', 'route': '/classes', 'icon': Icons.school_rounded},
        {'title': 'Batches', 'route': '/batches', 'icon': Icons.grid_view_rounded},
        {'title': 'Subjects', 'route': '/subjects', 'icon': Icons.menu_book_rounded},
        {'title': 'Attendance', 'route': '/attendance', 'icon': Icons.fact_check_rounded},
        {'title': 'Olympiads', 'route': '/olympiads', 'icon': Icons.emoji_events_rounded},
        {'title': 'Results & Ranks', 'route': '/results', 'icon': Icons.military_tech_rounded},
        {'title': 'Learning Materials', 'route': '/materials', 'icon': Icons.folder_zip_rounded},
        {'title': 'Recommended Books', 'route': '/books', 'icon': Icons.book_rounded},
        {'title': 'Notifications', 'route': '/notifications', 'icon': Icons.notifications_active_rounded},
        {'title': 'Audit Logs', 'route': '/audit-logs', 'icon': Icons.security_rounded},
      ];
    } else if (role == UserRole.teacher) {
      return [
        {'title': 'Dashboard', 'route': '/', 'icon': Icons.dashboard_rounded},
        {'title': 'My Batches & Students', 'route': '/students', 'icon': Icons.groups_rounded},
        {'title': 'Attendance Marking', 'route': '/attendance', 'icon': Icons.fact_check_rounded},
        {'title': 'OMR Camera Scanner', 'route': '/omr-scanner', 'icon': Icons.camera_alt_rounded},
        {'title': 'Results', 'route': '/results', 'icon': Icons.military_tech_rounded},
        {'title': 'Learning Materials', 'route': '/materials', 'icon': Icons.folder_zip_rounded},
        {'title': 'Books Catalog', 'route': '/books', 'icon': Icons.book_rounded},
      ];
    } else {
      // Student role
      return [
        {'title': 'My Dashboard', 'route': '/', 'icon': Icons.dashboard_rounded},
        {'title': 'My Results & Rank Cards', 'route': '/results', 'icon': Icons.emoji_events_rounded},
        {'title': 'My Attendance', 'route': '/attendance', 'icon': Icons.fact_check_rounded},
        {'title': 'Study Materials', 'route': '/materials', 'icon': Icons.folder_zip_rounded},
        {'title': 'Recommended Books', 'route': '/books', 'icon': Icons.book_rounded},
        {'title': 'Announcements', 'route': '/notifications', 'icon': Icons.notifications_rounded},
      ];
    }
  }
}
