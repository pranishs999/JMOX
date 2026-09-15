# JMO Management System — Backend Configuration
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Application
    APP_ENV: str = "development"
    APP_SECRET_KEY: str = Field(..., min_length=32)
    APP_ALLOWED_ORIGINS: str = "http://localhost:5173"

    # Database
    DATABASE_URL: str = Field(..., description="PostgreSQL async connection URL")
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 5

    # Redis
    REDIS_URL: str = Field(..., description="Redis connection URL")

    # Supabase Storage
    SUPABASE_URL: str = Field(...)
    SUPABASE_SERVICE_KEY: str = Field(...)
    STORAGE_BUCKET: str = "jmox-files"

    # JWT
    JWT_SECRET_KEY: str = Field(..., min_length=32)
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Email
    EMAIL_PROVIDER: str = "console"
    EMAIL_API_KEY: str = ""
    EMAIL_FROM: str = "noreply@localhost"
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    # OMR Worker
    OMR_STORAGE_PREFIX: str = "omr-scans/"
    OMR_WORKER_CONCURRENCY: int = 2

    # Institution (v1 single-tenant)
    DEFAULT_INSTITUTION_ID: str = Field(...)

    @property
    def allowed_origins_list(self) -> List[str]:
        return [o.strip() for o in self.APP_ALLOWED_ORIGINS.split(",")]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()