"""Add public_id_config table migration"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "002_add_public_id_config"
down_revision = "001"
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        "public_id_config",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("institution_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("entity_type", sa.String(length=50), nullable=False),
        sa.Column("prefix", sa.String(length=10), nullable=False, server_default="JMO"),
        sa.Column("year", sa.Integer, nullable=False),
        sa.Column("next_sequence", sa.Integer, nullable=False, server_default="1"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["institution_id"], ["institutions.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("institution_id", "entity_type", name="uq_public_id_config_inst_entity"),
        sa.Index("ix_public_id_config_entity", "entity_type"),
    )

def downgrade() -> None:
    op.drop_table("public_id_config")
