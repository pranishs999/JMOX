// JMO Management System — Materials, Books, Audit Logs, and Diagnostics Screens
import 'package:flutter/material.dart';
import '../../services/supabase_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

// --- 1. MATERIALS SCREEN ---
class MaterialsScreen extends StatefulWidget {
  const MaterialsScreen({super.key});

  @override
  State<MaterialsScreen> createState() => _MaterialsScreenState();
}

class _MaterialsScreenState extends State<MaterialsScreen> {
  final SupabaseService _service = SupabaseService();
  late List<MaterialModel> _materials;

  @override
  void initState() {
    super.initState();
    _materials = _service.getMaterials();
  }

  void _showAddMaterialModal() {
    final titleCtrl = TextEditingController();
    final descCtrl = TextEditingController();
    final urlCtrl = TextEditingController(text: 'https://assets.jmo.org/docs/sample.pdf');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Learning Material'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Document Title')),
            const SizedBox(height: 12),
            TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description')),
            const SizedBox(height: 12),
            TextField(controller: urlCtrl, decoration: const InputDecoration(labelText: 'File URL / Download Link')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (titleCtrl.text.isNotEmpty) {
                final newMat = MaterialModel(
                  id: 'mat-${DateTime.now().millisecondsSinceEpoch}',
                  title: titleCtrl.text.trim(),
                  description: descCtrl.text.trim(),
                  fileUrl: urlCtrl.text.trim(),
                  createdAt: DateTime.now().toString().substring(0, 10),
                );
                _service.addMaterial(newMat);
                setState(() => _materials = _service.getMaterials());
                Navigator.pop(context);
              }
            },
            child: const Text('Save Material'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Learning Materials & Notes'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showAddMaterialModal,
            icon: const Icon(Icons.upload_file, size: 16),
            label: const Text('Upload Material'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Downloadable Worksheets & Study Guides', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Curated curriculum notes, problem sets, and lecture handouts', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: _materials.length,
                itemBuilder: (context, index) {
                  final m = _materials[index];
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
                                Text('Uploaded: ${m.createdAt}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 11)),
                              ],
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.download_rounded, color: AppColors.accentIndigo),
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Downloading ${m.title}...')),
                              );
                            },
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
}

// --- 2. BOOKS SCREEN ---
class BooksScreen extends StatefulWidget {
  const BooksScreen({super.key});

  @override
  State<BooksScreen> createState() => _BooksScreenState();
}

class _BooksScreenState extends State<BooksScreen> {
  final SupabaseService _service = SupabaseService();
  late List<BookModel> _books;

  @override
  void initState() {
    super.initState();
    _books = _service.getBooks();
  }

  void _showAddBookModal() {
    final titleCtrl = TextEditingController();
    final authorCtrl = TextEditingController();
    final descCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Recommended Book'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Book Title')),
            const SizedBox(height: 12),
            TextField(controller: authorCtrl, decoration: const InputDecoration(labelText: 'Author Name')),
            const SizedBox(height: 12),
            TextField(controller: descCtrl, decoration: const InputDecoration(labelText: 'Description')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              if (titleCtrl.text.isNotEmpty) {
                final newBook = BookModel(
                  id: 'bok-${DateTime.now().millisecondsSinceEpoch}',
                  title: titleCtrl.text.trim(),
                  author: authorCtrl.text.trim(),
                  description: descCtrl.text.trim(),
                );
                _service.addBook(newBook);
                setState(() => _books = _service.getBooks());
                Navigator.pop(context);
              }
            },
            child: const Text('Save Book'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Recommended Books Catalog'),
        actions: [
          ElevatedButton.icon(
            onPressed: _showAddBookModal,
            icon: const Icon(Icons.add, size: 16),
            label: const Text('Add Book'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Olympiad Textbook Recommendations', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Essential problem-solving textbooks for national & international competitions', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 340,
                  mainAxisExtent: 150,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: _books.length,
                itemBuilder: (context, index) {
                  final b = _books[index];
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          const Icon(Icons.book_outlined, color: AppColors.accentEmerald, size: 36),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(b.title, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13, fontWeight: FontWeight.bold), maxLines: 2, overflow: TextOverflow.ellipsis),
                                if (b.author != null) Text('by ${b.author}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 11)),
                                if (b.description != null) Text(b.description!, style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 10), maxLines: 2, overflow: TextOverflow.ellipsis),
                              ],
                            ),
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
}

// --- 3. AUDIT LOGS SCREEN ---
class AuditLogsScreen extends StatelessWidget {
  const AuditLogsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final logs = SupabaseService().getAuditLogs();

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Security Audit Trail & Conflicts'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Immutable System Operation Event Log', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
            const Text('Audit trail for role mutations, attendance corrections, and offline sync conflicts', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
            const SizedBox(height: 16),

            Expanded(
              child: Card(
                child: ListView.separated(
                  itemCount: logs.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final log = logs[index];
                    return ListTile(
                      leading: Icon(
                        log.isConflict ? Icons.warning_amber_rounded : Icons.shield_outlined,
                        color: log.isConflict ? AppColors.accentGold : AppColors.accentEmerald,
                      ),
                      title: Text(log.action, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14, fontWeight: FontWeight.bold)),
                      subtitle: Text('Actor: ${log.actorPublicId} • ${log.entityType} • ${log.createdAt}', style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 12)),
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: log.isConflict ? AppColors.accentGold.withValues(alpha: 0.15) : AppColors.accentEmerald.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          log.isConflict ? 'CONFLICT LOGGED' : 'AUDITED',
                          style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: log.isConflict ? AppColors.accentGold : AppColors.accentEmerald),
                        ),
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
