"""Utility service for configurable public ID generation.

Provides functions to retrieve or create a :class:`PublicIDConfig` and to generate
public IDs in a transaction‑safe manner.
"""

from uuid import UUID

from sqlalchemy.orm import Session

from app.models.public_id_config import PublicIDConfig


def get_config(session: Session, institution_id: UUID, entity_type: str) -> PublicIDConfig:
    """Return the :class:`PublicIDConfig` for the given institution/entity.

    Raises a ``ValueError`` if no configuration exists – callers may create a
    default row beforehand (e.g., in the seed script).
    """
    cfg = (
        session.query(PublicIDConfig)
        .filter_by(institution_id=institution_id, entity_type=entity_type)
        .with_for_update()
        .one_or_none()
    )
    if cfg is None:
        raise ValueError(
            f"PublicIDConfig missing for institution {institution_id} / {entity_type}"
        )
    return cfg


def generate_public_id(session: Session, institution_id: UUID, entity_type: str) -> str:
    """Generate the next public ID for *entity_type* within *institution_id*.

    The format is ``{prefix}-{year}-{sequence:04d}`` where ``sequence`` is a
    monotonically increasing integer stored in the ``next_sequence`` column.
    The function updates ``next_sequence`` atomically and returns the formatted
    identifier.
    """
    cfg = get_config(session, institution_id, entity_type)
    seq = cfg.next_sequence
    cfg.next_sequence = seq + 1
    session.flush()
    return f"{cfg.prefix}-{cfg.year}-{seq:04d}"
