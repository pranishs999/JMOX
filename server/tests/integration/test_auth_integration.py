import pytest
from app.auth.service import hash_password, verify_password

def test_password_hashing_and_verification():
    password = "Mathforall@JMO369"
    hashed = hash_password(password)
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("WrongPassword", hashed) is False

def test_user_roles():
    from app.models.core import UserRole
    assert UserRole.ADMIN.value == "admin"
    assert UserRole.TEACHER.value == "teacher"
