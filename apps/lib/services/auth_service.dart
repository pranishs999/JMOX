// JMO Management System — Authentication & Role State Manager
import 'package:flutter/foundation.dart';
import '../models/app_models.dart';

class AuthService extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = false;

  UserModel? get currentUser => _currentUser;
  bool get isAuthenticated => _currentUser != null;
  bool get isLoading => _isLoading;
  UserRole get role => _currentUser?.role ?? UserRole.student;

  AuthService() {
    // Default logged in as Super Admin for instant dev review
    _currentUser = UserModel(
      id: 'usr-admin-1',
      publicId: 'USR-SA-001',
      email: 'jms.hric@gmail.com',
      role: UserRole.admin,
      status: 'active',
    );
  }

  Future<bool> login(String email, String password, {UserRole selectedRole = UserRole.admin}) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 600));

    // Demo authentication handling
    String publicId = 'USR-SA-001';
    switch (selectedRole) {
      case UserRole.admin:
        publicId = 'USR-SA-001';
        break;
      case UserRole.facilitator:
        publicId = 'FAC-41029';
        break;
      case UserRole.mentor:
        publicId = 'MNT-32018';
        break;
      case UserRole.technician:
        publicId = 'TECH-7701';
        break;
      case UserRole.student:
        publicId = 'STU-98214';
        break;
    }

    _currentUser = UserModel(
      id: 'usr-demo-1',
      publicId: publicId,
      email: email.isNotEmpty ? email : 'admin@jmo.org',
      role: selectedRole,
      status: 'active',
    );

    _isLoading = false;
    notifyListeners();
    return true;
  }

  void switchRole(UserRole newRole) {
    if (_currentUser == null) return;
    String publicId = 'USR-SA-001';
    switch (newRole) {
      case UserRole.admin:
        publicId = 'USR-SA-001';
        break;
      case UserRole.facilitator:
        publicId = 'FAC-41029';
        break;
      case UserRole.mentor:
        publicId = 'MNT-32018';
        break;
      case UserRole.technician:
        publicId = 'TECH-7701';
        break;
      case UserRole.student:
        publicId = 'STU-98214';
        break;
    }

    _currentUser = UserModel(
      id: _currentUser!.id,
      publicId: publicId,
      email: _currentUser!.email,
      role: newRole,
      status: 'active',
    );
    notifyListeners();
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }
}
