# SQLAlchemy event listeners for automatic public_id generation
"""
This module provides a function ``register_public_id_listeners`` that lazily imports the core
models (User, Teacher, Student) and registers ``before_insert`` listeners for each of them.
The listeners call :func:`generate_public_id` to compute a unique public identifier.

The function is imported and called from ``app.models.core`` *after* the model classes are
defined, breaking the circular import that previously occurred when the listeners were
registered at module import time.
"""

from sqlalchemy import event
from sqlalchemy.orm import Session
# Removed import to avoid circular dependency; generate_public_id will be loaded lazily within register_public_id_listeners


_generate_public_id = None


def _get_generate_public_id():
    global _generate_public_id
    if _generate_public_id is None:
        import importlib.util
        import pathlib

        service_path = (
            pathlib.Path(__file__).parents[1] / "services" / "public_id_service.py"
        )
        spec = importlib.util.spec_from_file_location(
            "public_id_service", service_path
        )
        public_id_mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(public_id_mod)  # type: ignore
        _generate_public_id = public_id_mod.generate_public_id
    return _generate_public_id


def _assign_public_id(mapper, connection, target, entity_type: str) -> None:
    """Assign a public_id to *target* using the configured ``PublicIDConfig``.

    The function creates a temporary ``Session`` bound to the raw DB‑API connection.
    Because ``generate_public_id`` performs ``SELECT ... FOR UPDATE`` on the config row
    and then increments the sequence, the operation is safe under concurrent inserts.
    """
    if getattr(target, "public_id", None):
        return
    session = Session(bind=connection)
    gen_func = _get_generate_public_id()
    target.public_id = gen_func(session, target.institution_id, entity_type)
    session.flush()


def register_public_id_listeners(user_cls, teacher_cls, student_cls) -> None:
    """Import core models lazily and attach ``before_insert`` listeners.

    Importing the models inside this function ensures that the classes are already
    defined (``app.models.core`` imports this function but does not execute it until
    after the class definitions). This eliminates the circular import error.
    """
    @event.listens_for(user_cls, "before_insert")
    def _user_before_insert(mapper, connection, target):  # type: ignore
        _assign_public_id(mapper, connection, target, "user")

    @event.listens_for(teacher_cls, "before_insert")
    def _teacher_before_insert(mapper, connection, target):  # type: ignore
        _assign_public_id(mapper, connection, target, "teacher")

    @event.listens_for(student_cls, "before_insert")
    def _student_before_insert(mapper, connection, target):  # type: ignore
        _assign_public_id(mapper, connection, target, "student")

