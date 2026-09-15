"""Add student user link migration"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "003_add_student_user_link"
down_revision = "002_add_public_id_config"
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Add 'student' to user_role enum if it exists
    op.execute("ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'student'")
    # Add user_id column to students table
    op.add_column(
        "students",
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
            unique=True,
        ),
    )

def downgrade() -> None:
    op.drop_column("students", "user_id")
