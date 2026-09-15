import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../api/api_client.dart';

class OmrCameraScreen extends StatefulWidget {
  const OmrCameraScreen({Key? key}) : super(key: key);

  @override
  State<OmrCameraScreen> createState() => _OmrCameraScreenState();
}

class _OmrCameraScreenState extends State<OmrCameraScreen> {
  final ImagePicker _picker = ImagePicker();
  final ApiClient _apiClient = ApiClient();
  XFile? _selectedImage;
  bool _isUploading = false;
  String? _uploadStatus;

  Future<void> _captureOmrSheet() async {
    try {
      final XFile? photo = await _picker.pickImage(source: ImageSource.camera);
      if (photo != null) {
        setState(() {
          _selectedImage = photo;
          _uploadStatus = null;
        });
      }
    } catch (e) {
      setState(() {
        _uploadStatus = 'Camera error: $e';
      });
    }
  }

  Future<void> _uploadOmrSheet() async {
    if (_selectedImage == null) return;

    setState(() {
      _isUploading = true;
      _uploadStatus = null;
    });

    try {
      final bytes = await _selectedImage!.readAsBytes();
      final base64Image = base64Encode(bytes);

      final response = await _apiClient.post('/omr/upload', {
        'paper_id': 'paper-001',
        'image_base64': base64Image,
        'filename': _selectedImage!.name,
      });

      if (response.statusCode == 200 || response.statusCode == 201) {
        setState(() {
          _uploadStatus = 'OMR Sheet uploaded successfully! Pending review.';
          _selectedImage = null;
        });
      } else {
        final data = jsonDecode(response.body);
        setState(() {
          _uploadStatus = 'Upload failed: ${data['detail'] ?? 'Unknown error'}';
        });
      }
    } catch (e) {
      setState(() {
        _uploadStatus = 'Network error during OMR upload.';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isUploading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0A0A0A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF111111),
        title: const Text('Camera OMR Scan'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'OMR Sheet Capture',
              style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Align the four corner fiducial markers of the OMR paper within the frame before capturing.',
              style: TextStyle(color: Colors.grey, fontSize: 14),
            ),
            const SizedBox(height: 24),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF161616),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.purpleAccent.withOpacity(0.5)),
                ),
                child: _selectedImage != null
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            Image.file(
                              File(_selectedImage!.path),
                              fit: BoxFit.contain,
                            ),
                            Positioned(
                              bottom: 8,
                              left: 8,
                              right: 8,
                              child: Container(
                                padding: const EdgeInsets.all(4),
                                decoration: BoxDecoration(
                                  color: Colors.black54,
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  _selectedImage!.name,
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(color: Colors.white, fontSize: 10),
                                ),
                              ),
                            ),
                          ],
                        ),
                      )
                    : Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Icon(Icons.camera, size: 64, color: Colors.grey),
                            SizedBox(height: 16),
                            Text('No image captured yet', style: TextStyle(color: Colors.grey)),
                          ],
                        ),
                      ),
              ),
            ),
            const SizedBox(height: 16),
            if (_uploadStatus != null) ...[
              Text(
                _uploadStatus!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: _uploadStatus!.contains('successfully') ? Colors.greenAccent : Colors.redAccent,
                ),
              ),
              const SizedBox(height: 16),
            ],
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _captureOmrSheet,
                    icon: const Icon(Icons.camera_alt, color: Colors.purpleAccent),
                    label: const Text('Capture Paper', style: TextStyle(color: Colors.white)),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Colors.purpleAccent),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: (_selectedImage == null || _isUploading) ? null : _uploadOmrSheet,
                    icon: _isUploading
                        ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                        : const Icon(Icons.cloud_upload, color: Colors.white),
                    label: const Text('Upload OMR', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.purpleAccent,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
