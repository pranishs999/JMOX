// JMO Management System — User Settings & Change Password Screen
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/auth_service.dart';
import '../../theme/app_theme.dart';

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});

  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  String? _statusMessage;
  bool _isSuccess = false;

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _handleChangePassword() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _statusMessage = null;
      _isSuccess = false;
    });

    final auth = Provider.of<AuthService>(context, listen: false);
    final success = await auth.changePassword(
      _currentPasswordController.text,
      _newPasswordController.text,
    );

    if (mounted) {
      setState(() {
        if (success) {
          _isSuccess = true;
          _statusMessage = 'Password updated successfully! Next login requires new credentials.';
          _currentPasswordController.clear();
          _newPasswordController.clear();
          _confirmPasswordController.clear();
        } else {
          _isSuccess = false;
          _statusMessage = auth.authError ?? 'Password update failed. Please try again.';
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        title: const Text('Account Settings — Change Password'),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 500),
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              color: AppColors.darkSurface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.darkBorder),
            ),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.accentIndigo.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.lock_reset, color: AppColors.accentIndigo, size: 28),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Change Password',
                              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary),
                            ),
                            Text(
                              'Account: ${auth.currentUser?.email ?? "Active User"}',
                              style: const TextStyle(fontSize: 12, color: AppColors.darkTextSecondary),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  if (_statusMessage != null) ...[
                    Container(
                      padding: const EdgeInsets.all(12),
                      margin: const EdgeInsets.only(bottom: 20),
                      decoration: BoxDecoration(
                        color: (_isSuccess ? AppColors.accentEmerald : AppColors.accentCrimson).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: (_isSuccess ? AppColors.accentEmerald : AppColors.accentCrimson).withValues(alpha: 0.4)),
                      ),
                      child: Text(
                        _statusMessage!,
                        style: TextStyle(
                          color: _isSuccess ? AppColors.accentEmerald : AppColors.accentCrimson,
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],

                  const Text('CURRENT PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.darkTextSecondary)),
                  const SizedBox(height: 6),
                  TextFormField(
                    controller: _currentPasswordController,
                    obscureText: true,
                    style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14),
                    decoration: const InputDecoration(hintText: 'Enter current password'),
                    validator: (v) => (v == null || v.isEmpty) ? 'Current password is required' : null,
                  ),
                  const SizedBox(height: 16),

                  const Text('NEW PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.darkTextSecondary)),
                  const SizedBox(height: 6),
                  TextFormField(
                    controller: _newPasswordController,
                    obscureText: true,
                    style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14),
                    decoration: const InputDecoration(hintText: 'Minimum 6 characters'),
                    validator: (v) {
                      if (v == null || v.isEmpty) return 'New password is required';
                      if (v.length < 6) return 'Password must be at least 6 characters';
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),

                  const Text('CONFIRM NEW PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.darkTextSecondary)),
                  const SizedBox(height: 6),
                  TextFormField(
                    controller: _confirmPasswordController,
                    obscureText: true,
                    style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14),
                    decoration: const InputDecoration(hintText: 'Re-enter new password'),
                    validator: (v) {
                      if (v != _newPasswordController.text) return 'Passwords do not match';
                      return null;
                    },
                  ),
                  const SizedBox(height: 24),

                  ElevatedButton.icon(
                    onPressed: auth.isLoading ? null : _handleChangePassword,
                    icon: auth.isLoading
                        ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                        : const Icon(Icons.check),
                    label: const Text('Update Password Credentials'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
