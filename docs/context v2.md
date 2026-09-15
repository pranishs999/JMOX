# JMOX Project Context v2

This file is retained as a compatibility link for references that still use the
older filename. The authoritative project context is now:

- [Project Context](context.md)
- [Requirements](requirements.md)
- [Architecture & API](architecture-api.md)
- [Flutter UI/UX](ui-ux-design.md)
- [Database Design](database-design.md)
- [Security, Testing & Deployment](security-testing-deployment.md)

The current product uses a single Flutter client, with Android as the v1
release target, backed by FastAPI, PostgreSQL, Supabase Storage, and Redis.
Any change to the client framework or authentication model requires revising
the project decision in `context.md`.