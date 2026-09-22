// JMO Management System — Mobile OMR Camera Scanner, PDF & Image Evaluation
import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';

class OmrScannerScreen extends StatefulWidget {
  const OmrScannerScreen({super.key});

  @override
  State<OmrScannerScreen> createState() => _OmrScannerScreenState();
}

class _OmrScannerScreenState extends State<OmrScannerScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isProcessing = false;
  String? _scanResult;
  String _currentStatus = 'Pending'; // Pending, Processing, Needs Review, Completed, Failed

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _triggerScan() async {
    setState(() {
      _isProcessing = true;
      _currentStatus = 'Processing';
      _scanResult = null;
    });

    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isProcessing = false;
      _currentStatus = 'Needs Review';
      _scanResult = 'Sheet Scanned: STU-98216 | Calculated Score: 45.0 / 50 | Confidence: 99.4%';
    });
  }

  void _verifyAndConfirm() {
    setState(() {
      _currentStatus = 'Completed';
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('OMR evaluation confirmed and posted to student rank card.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('OMR Evaluation & Camera Scanner'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.accentGold,
          labelColor: AppColors.accentGold,
          unselectedLabelColor: AppColors.darkTextSecondary,
          tabs: const [
            Tab(text: 'Mobile Camera Capture'),
            Tab(text: 'PDF Document Batch'),
            Tab(text: 'Image File Upload'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildCameraTab(),
          _buildPdfTab(),
          _buildImageUploadTab(),
        ],
      ),
    );
  }

  Widget _buildCameraTab() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('OMR Camera Capture & Bounding Alignment', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
                  Text('Align answer sheet inside green frame overlay', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: _currentStatus == 'Completed' ? AppColors.accentEmerald.withValues(alpha: 0.15) : AppColors.accentGold.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text('STATUS: $_currentStatus', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: _currentStatus == 'Completed' ? AppColors.accentEmerald : AppColors.accentGold)),
              ),
            ],
          ),
          const SizedBox(height: 16),

          Expanded(
            child: Card(
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Simulated camera view background
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        _isProcessing ? Icons.hourglass_top : Icons.qr_code_scanner,
                        size: 64,
                        color: _isProcessing ? AppColors.accentGold : AppColors.darkTextSecondary,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        _isProcessing ? 'Detecting & Scoring OMR Bubbles...' : 'Position OMR Sheet Within Camera Grid',
                        style: const TextStyle(color: AppColors.darkTextSecondary, fontSize: 14),
                      ),
                    ],
                  ),

                  // Bounding Box Guide Overlay
                  Container(
                    margin: const EdgeInsets.all(32),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppColors.accentEmerald, width: 2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),

                  // Scan Result Banner
                  if (_scanResult != null)
                    Positioned(
                      bottom: 24,
                      left: 24,
                      right: 24,
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: AppColors.darkSurface,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.accentEmerald),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.check_circle, color: AppColors.accentEmerald),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Text(_scanResult!, style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 13, fontWeight: FontWeight.bold)),
                                ),
                              ],
                            ),
                            if (_currentStatus == 'Needs Review') ...[
                              const SizedBox(height: 12),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  OutlinedButton(onPressed: () => setState(() => _scanResult = null), child: const Text('Retake')),
                                  const SizedBox(width: 12),
                                  ElevatedButton(onPressed: _verifyAndConfirm, child: const Text('Confirm & Verify Score')),
                                ],
                              ),
                            ],
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          Center(
            child: ElevatedButton.icon(
              onPressed: _isProcessing ? null : _triggerScan,
              icon: const Icon(Icons.camera),
              label: const Text('Capture & Process OMR Sheet'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPdfTab() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.picture_as_pdf, size: 64, color: AppColors.accentCrimson),
              const SizedBox(height: 16),
              const Text('Batch PDF OMR Processing', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
              const Text('Upload multi-page scanned PDF files for automated page extraction and evaluation', textAlign: TextAlign.center, style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _triggerScan,
                icon: const Icon(Icons.upload_file),
                label: const Text('Upload PDF Answer Sheets'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildImageUploadTab() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.image, size: 64, color: AppColors.accentIndigo),
              const SizedBox(height: 16),
              const Text('Image File Upload (PNG / JPG)', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary)),
              const Text('Upload high-resolution OMR sheet photographs for bubble matrix reading', textAlign: TextAlign.center, style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _triggerScan,
                icon: const Icon(Icons.file_present),
                label: const Text('Select Image File'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
