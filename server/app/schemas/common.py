# JMO Management System — Common Schemas
from datetime import date, datetime
from typing import Optional, List, Any
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field


class PaginationParams(BaseModel):
    page: int = Field(1, ge=1)
    page_size: int = Field(25, ge=1, le=100)
    sort_by: Optional[str] = None
    sort_order: str = Field("asc", pattern="^(asc|desc)$")


class PaginatedResponse(BaseModel):
    data: List[Any]
    pagination: dict


class ErrorDetail(BaseModel):
    field: str
    message: str


class ErrorResponse(BaseModel):
    error: dict


class SuccessResponse(BaseModel):
    message: str


# Academic Year schemas
class AcademicYearBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    start_date: date
    end_date: date


class AcademicYearCreate(AcademicYearBase):
    is_active: bool = False


class AcademicYearUpdate(AcademicYearBase):
    is_active: Optional[bool] = None


class AcademicYearResponse(AcademicYearBase):
    id: UUID
    is_active: bool
    class_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# Class schemas
class ClassBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    sort_order: int = 0


class ClassCreate(ClassBase):
    academic_year_id: Optional[UUID] = None


class ClassUpdate(ClassBase):
    academic_year_id: Optional[UUID] = None


class ClassResponse(ClassBase):
    id: UUID
    academic_year_id: UUID
    batch_count: int = 0
    student_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# Batch schemas
class BatchBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    schedule_days: Optional[str] = Field(None, max_length=100)
    status: str = "active"


class BatchCreate(BatchBase):
    class_id: UUID


class BatchUpdate(BatchBase):
    class_id: Optional[UUID] = None


class BatchResponse(BatchBase):
    id: UUID
    class_id: UUID
    class_name: Optional[str] = None
    teacher_count: int = 0
    student_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# Student schemas
class GuardianBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    relationship: Optional[str] = Field(None, max_length=50)
    phone: str = Field(..., min_length=1, max_length=50)
    email: Optional[EmailStr] = None


class GuardianCreate(GuardianBase):
    pass


class GuardianResponse(GuardianBase):
    id: UUID

    class Config:
        from_attributes = True


class LoginPassResponse(BaseModel):
    public_id: str
    full_name: str
    email_or_username: str
    password: Optional[str] = None
    role: str
    status: str


class StudentBase(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=255)
    date_of_birth: Optional[date] = None
    gender: Optional[str] = Field(None, max_length=20)
    photo_url: Optional[str] = Field(None, max_length=500)
    phone: Optional[str] = Field(None, max_length=50)
    email: Optional[EmailStr] = None


class StudentCreate(StudentBase):
    guardian: Optional[GuardianCreate] = None
    class_id: Optional[UUID] = None
    batch_id: Optional[UUID] = None
    enrollment_date: Optional[date] = None
    custom_fields: Optional[dict] = None
    password: Optional[str] = Field(None, min_length=4, max_length=100)
    create_login_pass: bool = True


class StudentUpdate(StudentBase):
    guardian: Optional[GuardianCreate] = None
    custom_fields: Optional[dict] = None


class StudentResponse(StudentBase):
    id: UUID
    public_id: str
    guardian: Optional[GuardianResponse] = None
    current_class: Optional[dict] = None
    current_batch: Optional[dict] = None
    status: str
    custom_fields: List[dict] = []
    login_pass: Optional[LoginPassResponse] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Teacher schemas
class TeacherBase(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)


class TeacherCreate(TeacherBase):
    password: Optional[str] = Field(None, min_length=4, max_length=100)


class TeacherUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=1, max_length=255)
    phone: Optional[str] = Field(None, max_length=50)


class TeacherResponse(BaseModel):
    id: UUID
    public_id: str
    full_name: str
    email: EmailStr
    phone: Optional[str]
    status: str
    assigned_batches: List[dict] = []
    login_pass: Optional[LoginPassResponse] = None
    created_at: datetime

    class Config:
        from_attributes = True



# Class schemas
class ClassBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    sort_order: int = 0


class ClassCreate(ClassBase):
    academic_year_id: Optional[UUID] = None


class ClassUpdate(ClassBase):
    academic_year_id: Optional[UUID] = None


class ClassResponse(ClassBase):
    id: UUID
    academic_year_id: UUID
    batch_count: int = 0
    student_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# Batch schemas
class BatchBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    schedule_days: Optional[str] = Field(None, max_length=100)
    status: str = "active"


class BatchCreate(BatchBase):
    class_id: UUID


class BatchUpdate(BatchBase):
    class_id: Optional[UUID] = None


class BatchResponse(BatchBase):
    id: UUID
    class_id: UUID
    class_name: Optional[str] = None
    teacher_count: int = 0
    student_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# Olympiad schemas
class OlympiadBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    olympiad_date: Optional[date] = None


class OlympiadCreate(OlympiadBase):
    academic_year_id: UUID
    target_class_ids: List[UUID] = []


class OlympiadUpdate(OlympiadBase):
    academic_year_id: Optional[UUID] = None
    status: Optional[str] = None


class OlympiadResponse(OlympiadBase):
    id: UUID
    academic_year_id: UUID
    status: str
    paper_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# Paper schemas
class SectionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    sort_order: int
    marks_per_question: int = Field(..., gt=0)
    negative_marks_per_question: int = 0


class SectionResponse(SectionCreate):
    id: UUID
    question_count: int = 0

    class Config:
        from_attributes = True


class PaperCreate(BaseModel):
    olympiad_id: UUID
    class_id: UUID


class PaperUpdate(BaseModel):
    name: Optional[str] = None


class PaperResponse(BaseModel):
    id: UUID
    olympiad_id: UUID
    class_id: UUID
    version: int
    total_marks: int
    locked_at: Optional[datetime]
    sections: List[SectionResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True


# Question schemas
class QuestionOptionBase(BaseModel):
    label: str = Field(..., min_length=1, max_length=1)
    option_text: Optional[str] = None
    sort_order: int


class QuestionOptionCreate(QuestionOptionBase):
    pass


class QuestionOptionResponse(QuestionOptionBase):
    id: UUID

    class Config:
        from_attributes = True


class QuestionBase(BaseModel):
    question_number: int
    question_text: Optional[str] = None
    marks: int = Field(..., gt=0)
    negative_marks: int = 0
    num_options: int = 4


class QuestionCreate(QuestionBase):
    section_id: UUID
    options: List[QuestionOptionCreate] = []


class QuestionUpdate(QuestionBase):
    options: Optional[List[QuestionOptionCreate]] = None


class QuestionResponse(QuestionBase):
    id: UUID
    section_id: UUID
    options: List[QuestionOptionResponse] = []

    class Config:
        from_attributes = True


# Answer Key schemas
class AnswerKeyEntryCreate(BaseModel):
    question_id: UUID
    correct_option: str = Field(..., min_length=1, max_length=1)


class AnswerKeyCreate(BaseModel):
    paper_id: UUID
    entries: List[AnswerKeyEntryCreate]


class AnswerKeyResponse(BaseModel):
    id: UUID
    paper_id: UUID
    version: int
    locked_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


# Attendance schemas
class AttendanceRecord(BaseModel):
    student_id: UUID
    status: str = Field(..., pattern="^(present|absent|late|excused)$")


class BulkAttendanceRequest(BaseModel):
    session_id: UUID
    records: List[AttendanceRecord]


class AttendanceSyncRecord(BaseModel):
    session_id: UUID
    student_id: UUID
    status: str = Field(..., pattern="^(present|absent|late|excused)$")
    recorded_at: datetime
    client_id: UUID


class AttendanceSyncRequest(BaseModel):
    records: List[AttendanceSyncRecord]


class AttendanceResponse(BaseModel):
    id: UUID
    student_id: UUID
    session_id: UUID
    status: str
    recorded_by: UUID
    sync_source: Optional[str]
    recorded_at: datetime

    class Config:
        from_attributes = True


# Result schemas
class StudentAnswerEntry(BaseModel):
    question_id: UUID
    selected_option: Optional[str] = Field(None, max_length=1)


class StudentAnswersCreate(BaseModel):
    student_id: UUID
    paper_id: UUID
    olympiad_id: UUID
    answers: List[StudentAnswerEntry]
    entry_method: str = "manual"


class ResultCalculateRequest(BaseModel):
    olympiad_id: UUID
    paper_id: UUID
    answer_key_id: UUID


class ResultResponse(BaseModel):
    id: UUID
    student: dict
    olympiad: dict
    total_score: int
    max_possible_score: int
    percentage: float
    section_scores: List[dict]
    correct_count: int
    incorrect_count: int
    unanswered_count: int
    status: str
    class_at_time_of_exam: dict
    batch_at_time_of_exam: dict
    published_at: Optional[datetime]

    class Config:
        from_attributes = True


# Ranking schemas
class RankingQueryParams(BaseModel):
    olympiad_id: UUID
    class_id: Optional[UUID] = None
    scope: str = Field("class", pattern="^(class|cross_class)$")


class RankingItemResponse(BaseModel):
    rank: int
    student: dict
    total_score: int
    max_possible_score: int
    percentage: float
    section_scores: List[dict]
    is_tied: bool
    class_info: dict

    class Config:
        from_attributes = True


# OMR schemas
class OMRUploadRequest(BaseModel):
    batch_id: UUID
    paper_id: UUID
    image_base64: str
    filename: str


class OMRSubmissionResponse(BaseModel):
    id: UUID
    batch_id: UUID
    paper_id: UUID
    uploaded_by: UUID
    status: str
    job_id: Optional[str]
    extracted_answers: Optional[dict]
    error_message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# Report schemas
class ReportGenerateRequest(BaseModel):
    report_type: str = Field(..., pattern="^(attendance|results|student_progress)$")
    filters: dict


# Award schemas
class AwardCreate(BaseModel):
    olympiad_id: UUID
    name: str = Field(..., min_length=1, max_length=100)
    criteria_description: Optional[str] = None
    min_rank: Optional[int] = None
    min_percentage: Optional[float] = None


class AwardResponse(BaseModel):
    id: UUID
    olympiad_id: UUID
    name: str
    criteria_description: Optional[str]
    min_rank: Optional[int]
    min_percentage: Optional[float]
    created_at: datetime

    class Config:
        from_attributes = True


# Custom Field schemas
class CustomFieldCreate(BaseModel):
    field_name: str = Field(..., min_length=1, max_length=100)
    field_type: str = Field(..., pattern="^(text|number|date|dropdown)$")
    dropdown_options: Optional[List[str]] = None
    is_required: bool = False


class CustomFieldUpdate(BaseModel):
    field_name: Optional[str] = Field(None, min_length=1, max_length=100)
    is_required: Optional[bool] = None
    is_active: Optional[bool] = None


class CustomFieldResponse(BaseModel):
    id: UUID
    field_name: str
    field_type: str
    dropdown_options: Optional[List[str]]
    is_required: bool
    is_active: bool
    deleted_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True