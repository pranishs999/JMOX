// JMO Management System — Mobile OMR Camera Scanner & Alignment
import 'package:flutter/material.dart';

class OmrScannerScreen extends StatefulWidget {
  const OmrScannerScreen({super.key});

  @override
  State<OmrScannerScreen> createState() => _OmrScannerScreenState();
}

class _OmrScannerScreenState extends State<OmrScannerScreen> {
  bool _isProcessing = false;
  String? _scanResult;

  static const Color _emeraldColor = Color(0xFF10B981);

  void _triggerScan() async {
    setState(() {
      _isProcessing = true;
      _scanResult = null;
    });

    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isProcessing = false;
      _scanResult = 'Sheet Scanned: STU-98216 | Total Score: 48.0 / 50 | Confidence: 99.4%';
    });
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
            const Text('OMR Camera Scanner', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
            const Text('Align the OMR answer sheet within the target bounding frame', style: TextStyle(fontSize: 13, color: Colors.grey)),
            const SizedBox(height: 20),

            Expanded(
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: const Color(0xFF111111),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.amber.withOpacity(0.4), width: 2),
                ),
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
                          color: _isProcessing ? Colors.amber : Colors.grey,
                        ),
                        const SizedBox(height: 12),
                        Text(
                          _isProcessing ? 'Processing OMR Bubbles...' : 'Position OMR Sheet Here',
                          style: const TextStyle(color: Colors.grey, fontSize: 14),
                        ),
                      ],
                    ),

                    // Bounding Box Guide Overlay
                    Container(
                      margin: const EdgeInsets.all(32),
                      decoration: BoxDecoration(
                        border: Border.all(color: _emeraldColor, width: 2),
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
                            color: _emeraldColor.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: _emeraldColor),
                          ),
                          child: Row(
                            children: [
                              const Icon(Icons.check_circle, color: _emeraldColor),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Text(_scanResult!, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            Center(
              child: ElevatedButton.icon(
                onPressed: _isProcessing ? null : _triggerScan,
                icon: const Icon(Icons.camera),
                label: const Text('Capture & Process OMR Sheet'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
