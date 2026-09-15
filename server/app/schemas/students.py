# JMO Management System — Student Schemas
from datetime import date, datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field
from app.models.core import StudentStatus


from app.schemas.common import LoginPassResponse


class GuardianSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    relationship: Optional[str] = Field(None, max_length=50)
    phone: str = Field(..., min_length=1, max_length=50)
    email: Optional[EmailStr] = None


class StudentCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=255)
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=20)
    photo_url: Optional[str] = Field(None, max_length=500)
    phone: Optional[str] = Field(None, max_length=50)
    email: Optional[EmailStr] = None
    guardian: Optional[GuardianSchema] = None
    class_id: Optional[UUID] = None
    batch_id: Optional[UUID] = None
    enrollment_date: Optional[date] = None
    custom_fields: Optional[dict] = None
    password: Optional[str] = Field(None, min_length=4, max_length=100)
    create_login_pass: bool = True


class StudentUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=1, max_length=255)
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=20)
    photo_url: Optional[str] = Field(None, max_length=500)
    phone: Optional[str] = Field(None, max_length=50)
    email: Optional[EmailStr] = None
    guardian: Optional[GuardianSchema] = None
    custom_fields: Optional[dict] = None


class GuardianResponse(BaseModel):
    id: UUID
    name: str
    relationship: Optional[str] = Field(None, validation_alias="relationship_type")
    phone: str
    email: Optional[str]

    class Config:
        from_attributes = True
        populate_by_name = True


class ClassRef(BaseModel):
    id: UUID
    name: str

    class Config:
        from_attributes = True


class BatchRef(BaseModel):
    id: UUID
    name: str

    class Config:
        from_attributes = True


class StudentResponse(BaseModel):
    id: UUID
    public_id: str
    full_name: str
    date_of_birth: Optional[date]
    gender: Optional[str]
    photo_url: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    guardian: Optional[GuardianResponse]
    current_class: Optional[ClassRef]
    current_batch: Optional[BatchRef]
    status: StudentStatus
    custom_fields: list = []
    login_pass: Optional[LoginPassResponse] = None
    created_at: datetime

    class Config:
        from_attributes = True



class StudentListResponse(BaseModel):
    data: list[StudentResponse]
    pagination: dict


class StudentTransferRequest(BaseModel):
    new_class_id: UUID
    new_batch_id: UUID
    transfer_date: date


class StudentWithdrawRequest(BaseModel):
    withdrawal_date: date
    reason: Optional[str] = None


class StudentImportRequest(BaseModel):
    file_base64: str
    file_type: str = Field(pattern="^(csv|xlsx)$")