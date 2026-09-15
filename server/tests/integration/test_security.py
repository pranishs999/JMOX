import pytest
from uuid import uuid4
from app.auth.service import hash_password, verify_password
from app.models.extras import AuditLog, AuditAction

def test_argon2id_security_parameters():
    raw_password = "SuperSecretPassword123!"
    hashed = hash_password(raw_password)
    
    # Hash must use argon2id algorithm
    assert hashed.startswith("$argon2id$")
    assert verify_password(raw_password, hashed) is True
    assert verify_password("InvalidPassword", hashed) is False

def test_audit_log_structure():
    user_id = uuid4()
    log = AuditLog(
        institution_id=uuid4(),
        user_id=user_id,
        action=AuditAction.LOGIN,
        entity_type="User",
        entity_id=user_id,
        ip_address="127.0.0.1",
    )
    assert log.action == AuditAction.LOGIN
    assert log.entity_type == "User"
    assert log.ip_address == "127.0.0.1"

def test_uuid_validation_helper():
    from uuid import UUID
    valid_uuid_str = str(uuid4())
    invalid_uuid_str = "not-a-valid-uuid"

    assert UUID(valid_uuid_str)
    with pytest.raises(ValueError):
        UUID(invalid_uuid_str)
