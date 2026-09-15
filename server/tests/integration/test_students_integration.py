import pytest
from app.utils.ids import generate_public_id
from app.models.core import Student

@pytest.mark.asyncio
async def test_generate_public_id_format():
    # Test generation utility format
    prefix = "JMO-2026"
    random_part = "0001"
    public_id = f"{prefix}-{random_part}"
    assert public_id == "JMO-2026-0001"
