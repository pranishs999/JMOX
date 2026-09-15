# JMO Management System — Auth Schemas
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field
from app.models.core import UserRole, UserStatus


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    client_type: str = Field(pattern="^(web|android)$")


class LoginResponseWeb(BaseModel):
    user: "UserResponse"


class LoginResponseAndroid(BaseModel):
    user: "UserResponse"
    access_token: str
    refresh_token: str
    expires_in: int


class TokenRefreshRequest(BaseModel):
    refresh_token: str


class TokenRefreshResponse(BaseModel):
    access_token: str
    expires_in: int


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    password: str = Field(min_length=8, max_length=128)


class ActivateAccountRequest(BaseModel):
    token: str
    password: str = Field(min_length=8, max_length=128)


class UserResponse(BaseModel):
    id: UUID
    public_id: str
    email: EmailStr
    role: UserRole
    full_name: Optional[str] = None
    status: UserStatus

    class Config:
        from_attributes = True


class CurrentUserResponse(BaseModel):
    user: UserResponse

    class Config:
        from_attributes = True


# Forward references
LoginResponseWeb.model_rebuild()
LoginResponseAndroid.model_rebuild()