import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  static const String baseUrl = 'http://10.0.2.2:8000/api/v1'; // Android emulator localhost alias
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Future<String?> getAccessToken() async {
    return await _storage.read(key: 'access_token');
  }

  Future<String?> getRefreshToken() async {
    return await _storage.read(key: 'refresh_token');
  }

  Future<void> saveTokens(String accessToken, String refreshToken) async {
    await _storage.write(key: 'access_token', value: accessToken);
    await _storage.write(key: 'refresh_token', value: refreshToken);
  }

  Future<void> clearTokens() async {
    await _storage.delete(key: 'access_token');
    await _storage.delete(key: 'refresh_token');
  }

  Future<Map<String, String>> _getHeaders() async {
    final token = await getAccessToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<http.Response> post(String endpoint, Map<String, dynamic> body) async {
    final headers = await _getHeaders();
    var response = await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
      body: jsonEncode(body),
    );

    if (response.statusCode == 401) {
      final success = await refreshToken();
      if (success) {
        final newHeaders = await _getHeaders();
        response = await http.post(
          Uri.parse('$baseUrl$endpoint'),
          headers: newHeaders,
          body: jsonEncode(body),
        );
      }
    }
    return response;
  }

  Future<http.Response> get(String endpoint) async {
    final headers = await _getHeaders();
    var response = await http.get(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
    );

    if (response.statusCode == 401) {
      final success = await refreshToken();
      if (success) {
        final newHeaders = await _getHeaders();
        response = await http.get(
          Uri.parse('$baseUrl$endpoint'),
          headers: newHeaders,
        );
      }
    }
    return response;
  }

  Future<bool> refreshToken() async {
    final refresh = await getRefreshToken();
    if (refresh == null) return false;

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/refresh'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'refresh_token': refresh}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await saveTokens(data['access_token'], data['refresh_token'] ?? refresh);
        return true;
      }
    } catch (_) {}
    return false;
  }
}
