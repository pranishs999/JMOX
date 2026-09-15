# JMO Management System — FastAPI App Factory
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.db.session import engine
from app.api.v1.router import router as api_router
from app.models.base import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    # Create tables if they don't exist (in development)
    if settings.APP_ENV == "development":
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await engine.dispose()


def create_app() -> FastAPI:
    app = FastAPI(
        title="JMO Management System API",
        version="1.0.0",
        description="Junior Mathematics Olympiad Management System",
        lifespan=lifespan,
        docs_url="/docs" if settings.APP_ENV != "production" else None,
        redoc_url="/redoc" if settings.APP_ENV != "production" else None,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Exception handlers
    @app.exception_handler(Exception)
    async def global_exception_handler(request, exc):
        if settings.APP_ENV == "development":
            import traceback
            traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "INTERNAL_ERROR",
                    "message": "An unexpected error occurred",
                    "details": [] if settings.APP_ENV == "production" else [str(exc)],
                }
            },
        )

    # Health check
    @app.get("/health")
    async def health_check():
        return {"status": "healthy", "version": "1.0.0"}

    # API routes
    app.include_router(api_router)

    return app


app = create_app()