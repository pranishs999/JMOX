// JMO Management System — Unified Multi-Role Dashboard
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../services/auth_service.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class HomeDashboard extends StatelessWidget {
  const HomeDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);

    if (auth.role == UserRole.admin) {
      return _buildAdminDashboard(context);
    } else if (auth.role == UserRole.facilitator) {
      return _buildFacilitatorDashboard(context);
    } else if (auth.role == UserRole.technician) {
      return _buildTechnicianDashboard(context);
    } else {
      return _buildStudentDashboard(context);
    }
  }

  // --- 1. ADMIN DASHBOARD ---
  Widget _buildAdminDashboard(BuildContext context) {
    final service = SupabaseService();
    final students = service.getStudents();
    final facilitators = service.getFacilitators();
    final batches = service.getBatches();
    final olympiads = service.getOlympiads();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Institute Overview', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const Text('System metrics, batch performance, and administrative controls', style: TextStyle(fontSize: 13, color: AppColors.darkTextSecondary)),
          const SizedBox(height: 20),

          // Stat Cards Grid
          LayoutBuilder(builder: (context, constraints) {
            final isWide = constraints.maxWidth > 700;
            return GridView.count(
              crossAxisCount: isWide ? 4 : 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              shrinkWrap: true,
              childAspectRatio: 1.8,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildStatCard('Active Students', '${students.length}', Icons.people_alt, AppColors.accentIndigo),
                _buildStatCard('Facilitators', '${facilitators.length}', Icons.badge, AppColors.accentGold),
                _buildStatCard('Active Batches', '${batches.length}', Icons.grid_view, AppColors.accentEmerald),
                _buildStatCard('Olympiads', '${olympiads.length}', Icons.emoji_events, AppColors.accentPurple),
              ],
            );
          }),

          const SizedBox(height: 28),

          // Recent Olympiad Assessments
          const Text('Upcoming & Published Olympiads', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const SizedBox(height: 12),
          Card(
            child: ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: olympiads.length,
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final o = olympiads[index];
                return ListTile(
                  leading: const CircleAvatar(backgroundColor: AppColors.darkCard, child: Icon(Icons.emoji_events, color: AppColors.accentGold, size: 20)),
                  title: Text(o.name, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14, fontWeight: FontWeight.bold)),
                  subtitle: Text('Scheduled: ${o.eventDate} • Target Marks: 50.0', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: o.status == 'published' ? AppColors.accentEmerald.withValues(alpha: 0.15) : AppColors.accentIndigo.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      o.status.toUpperCase(),
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: o.status == 'published' ? AppColors.accentEmerald : AppColors.accentIndigo),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  // --- 2. FACILITATOR DASHBOARD ---
  Widget _buildFacilitatorDashboard(BuildContext context) {
    final service = SupabaseService();
    final batches = service.getBatches();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Facilitator Portal', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const Text('Manage assigned batches, attendance sessions, and mobile OMR evaluation', style: TextStyle(fontSize: 13, color: AppColors.darkTextSecondary)),
          const SizedBox(height: 20),

          // Quick Action Cards
          Row(
            children: [
              Expanded(
                child: _buildActionTile(
                  context,
                  'Mark Attendance',
                  'Record student attendance offline or online',
                  Icons.fact_check,
                  AppColors.accentEmerald,
                  () => context.go('/attendance'),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildActionTile(
                  context,
                  'OMR Camera Scanner',
                  'Scan optical mark reader sheets via camera',
                  Icons.camera_alt,
                  AppColors.accentGold,
                  () => context.go('/examinations/omr'),
                ),
              ),
            ],
          ),

          const SizedBox(height: 28),
          const Text('My Assigned Batches', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const SizedBox(height: 12),

          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: batches.length,
            itemBuilder: (context, index) {
              final b = batches[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      const Icon(Icons.groups, color: AppColors.accentIndigo, size: 28),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(b.name, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 15, fontWeight: FontWeight.bold)),
                            Text('${b.className} • Schedule: ${b.scheduleDays}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () => context.go('/attendance'),
                        child: const Text('Sessions', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  // --- 3. STUDENT DASHBOARD ---
  Widget _buildStudentDashboard(BuildContext context) {
    final service = SupabaseService();
    final materials = service.getMaterials();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Student Portal', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const Text('View your Olympiad rank cards, study materials, and score history', style: TextStyle(fontSize: 13, color: AppColors.darkTextSecondary)),
          const SizedBox(height: 20),

          // Highlight Rank Card
          Card(
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.darkSurface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.accentGold.withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.military_tech, color: AppColors.accentGold, size: 48),
                  const SizedBox(width: 16),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('JMO Stage 1 Qualifier Assessment', style: TextStyle(color: AppColors.darkTextPrimary, fontSize: 16, fontWeight: FontWeight.bold)),
                        SizedBox(height: 4),
                        Text('Rank #1 Overall • Gold Medalist • Score: 48.0/50', style: TextStyle(color: AppColors.accentGold, fontSize: 13, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () => context.go('/examinations/results'),
                    child: const Text('View Rank Card', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 28),
          const Text('Recent Study Materials & Notes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const SizedBox(height: 12),

          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: materials.length,
            itemBuilder: (context, index) {
              final m = materials[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      const Icon(Icons.picture_as_pdf, color: AppColors.accentCrimson, size: 28),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(m.title, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14, fontWeight: FontWeight.bold)),
                            Text(m.description ?? '', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                          ],
                        ),
                      ),
                      const Icon(Icons.download_rounded, color: AppColors.accentIndigo),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  // --- 4. TECHNICIAN DIAGNOSTICS DASHBOARD ---
  Widget _buildTechnicianDashboard(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.build_circle, color: Colors.orange, size: 28),
              const SizedBox(width: 10),
              const Text('Technician Diagnostics Console', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            ],
          ),
          const Text('System infrastructure status, sync queue length, and hardware diagnostics (Read-Only Academic Access)', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
          const SizedBox(height: 20),

          // System Health Cards
          GridView.count(
            crossAxisCount: 4,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            shrinkWrap: true,
            childAspectRatio: 1.8,
            physics: const NeverScrollableScrollPhysics(),
            children: [
              _buildStatCard('Supabase Postgres', 'Connected (0.4ms)', Icons.storage, AppColors.accentEmerald),
              _buildStatCard('Upstash Redis', 'Active (Cache/Queue)', Icons.bolt, AppColors.accentGold),
              _buildStatCard('Offline Sync Queue', '0 Pending Items', Icons.sync, AppColors.accentIndigo),
              _buildStatCard('OMR Worker Status', 'Idle (Ready)', Icons.camera, AppColors.accentPurple),
            ],
          ),

          const SizedBox(height: 28),
          const Text('System Diagnostic Logs', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildLogLine('[07:15:02] INFO: Supabase client initialized cleanly.'),
                  _buildLogLine('[07:15:05] INFO: Upstash Redis token verified (Server-side environment).'),
                  _buildLogLine('[07:15:10] INFO: Mobile scanner camera driver status: OK.'),
                  _buildLogLine('[07:15:15] WARN: Academic mutation restricted for Technician role.'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLogLine(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Text(text, style: const TextStyle(color: AppColors.accentEmerald, fontFamily: 'monospace', fontSize: 12)),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color accentColor) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: accentColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: accentColor, size: 24),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(value, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                  Text(title, style: const TextStyle(fontSize: 11, color: AppColors.darkTextSecondary), overflow: TextOverflow.ellipsis),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionTile(BuildContext context, String title, String subtitle, IconData icon, Color color, VoidCallback onTap) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              CircleAvatar(backgroundColor: color.withValues(alpha: 0.15), child: Icon(icon, color: color)),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 15, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 2),
                    Text(subtitle, style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 11)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
