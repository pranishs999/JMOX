// JMO Management System — Login & Credential Reset Screen
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../services/auth_service.dart';
import '../../models/app_models.dart';
import '../../theme/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'admin@jmo.org');
  final _passwordController = TextEditingController(text: 'Mathforall@JMO369');
  UserRole _selectedRole = UserRole.admin;
  String? _errorText;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() async {
    setState(() => _errorText = null);
    final auth = Provider.of<AuthService>(context, listen: false);

    final success = await auth.login(
      _emailController.text.trim(),
      _passwordController.text.trim(),
      selectedRole: _selectedRole,
    );

    if (success && mounted) {
      context.go('/');
    }
  }

  void _showForgotPasswordModal() {
    final resetEmailCtrl = TextEditingController(text: _emailController.text);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Password Reset Request'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Enter your email or Public ID to receive reset credentials instructions.', style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 13)),
            const SizedBox(height: 16),
            TextField(
              controller: resetEmailCtrl,
              decoration: const InputDecoration(labelText: 'Email or Public ID'),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              final dialogContext = context;
              final auth = Provider.of<AuthService>(dialogContext, listen: false);
              await auth.requestPasswordReset(resetEmailCtrl.text.trim());
              if (dialogContext.mounted) {
                Navigator.pop(dialogContext);
                ScaffoldMessenger.of(dialogContext).showSnackBar(
                  const SnackBar(content: Text('Password reset instructions dispatched successfully.')),
                );
              }
            },
            child: const Text('Send Reset Link'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            width: 440,
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              color: AppColors.darkSurface,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.darkBorder),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.5),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Header Logo
                Center(
                  child: Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: const Icon(Icons.school, size: 32, color: AppColors.primaryNavy),
                  ),
                ),
                const SizedBox(height: 20),
                const Text(
                  'JMO Management System',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.darkTextPrimary),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Sign in to access your portal & dashboard',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 13, color: AppColors.darkTextSecondary),
                ),
                const SizedBox(height: 24),

                // Role selector tabs
                Row(
                  children: [
                    _buildRoleTab(UserRole.admin, 'Admin', Icons.admin_panel_settings),
                    const SizedBox(width: 6),
                    _buildRoleTab(UserRole.facilitator, 'Facilitator', Icons.psychology),
                    const SizedBox(width: 6),
                    _buildRoleTab(UserRole.student, 'Student', Icons.person),
                    const SizedBox(width: 6),
                    _buildRoleTab(UserRole.technician, 'Technician', Icons.build_circle),
                  ],
                ),
                const SizedBox(height: 24),

                if (_errorText != null)
                  Container(
                    padding: const EdgeInsets.all(12),
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: AppColors.accentCrimson.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.accentCrimson.withValues(alpha: 0.3)),
                    ),
                    child: Text(_errorText!, style: const TextStyle(color: AppColors.accentCrimson, fontSize: 12)),
                  ),

                // Form fields
                const Text('EMAIL / PUBLIC ID', style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
                const SizedBox(height: 6),
                TextField(
                  controller: _emailController,
                  style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14),
                  decoration: const InputDecoration(
                    hintText: 'Enter email or Public ID (e.g. STU-98214)',
                  ),
                ),
                const SizedBox(height: 16),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('PASSWORD', style: TextStyle(color: AppColors.darkTextSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
                    GestureDetector(
                      onTap: _showForgotPasswordModal,
                      child: const Text('Forgot Password?', style: TextStyle(color: AppColors.accentIndigo, fontSize: 11, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  style: const TextStyle(color: AppColors.darkTextPrimary, fontSize: 14),
                  decoration: const InputDecoration(
                    hintText: 'Enter password',
                  ),
                ),
                const SizedBox(height: 24),

                ElevatedButton(
                  onPressed: auth.isLoading ? null : _handleLogin,
                  child: auth.isLoading
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                      : Text('Sign In as ${_selectedRole.label.toUpperCase()}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRoleTab(UserRole role, String label, IconData icon) {
    final isSelected = _selectedRole == role;
    return Expanded(
      child: InkWell(
        onTap: () => setState(() => _selectedRole = role),
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: isSelected ? AppColors.darkTextPrimary : AppColors.darkCard,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: isSelected ? AppColors.darkTextPrimary : AppColors.darkBorder),
          ),
          child: Column(
            children: [
              Icon(icon, size: 16, color: isSelected ? Colors.black : AppColors.darkTextSecondary),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: isSelected ? Colors.black : AppColors.darkTextSecondary),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
