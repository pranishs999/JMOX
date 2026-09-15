# JMO Management System — Schemas Package
from app.schemas.common import *
from app.schemas.students import *

__all__ = [
    # Common
    "PaginationParams",
    "PaginatedResponse",
    "ErrorDetail",
    "ErrorResponse",
    "SuccessResponse",
    # Student
    "GuardianBase",
    "GuardianCreate",
    "GuardianResponse",
    "StudentBase",
    "StudentCreate",
    "StudentUpdate",
    "StudentResponse",
    # Teacher
    "TeacherBase",
    "TeacherCreate",
    "TeacherUpdate",
    "TeacherResponse",
    # Class
    "ClassBase",
    "ClassCreate",
    "ClassUpdate",
    "ClassResponse",
    # Batch
    "BatchBase",
    "BatchCreate",
    "BatchUpdate",
    "BatchResponse",
    # Olympiad
    "OlympiadBase",
    "OlympiadCreate",
    "OlympiadUpdate",
    "OlympiadResponse",
    # Paper
    "SectionCreate",
    "SectionResponse",
    "PaperCreate",
    "PaperUpdate",
    "PaperResponse",
    # Question
    "QuestionOptionBase",
    "QuestionOptionCreate",
    "QuestionOptionResponse",
    "QuestionBase",
    "QuestionCreate",
    "QuestionUpdate",
    "QuestionResponse",
    # Answer Key
    "AnswerKeyEntryCreate",
    "AnswerKeyCreate",
    "AnswerKeyResponse",
    # Attendance
    "AttendanceRecord",
    "BulkAttendanceRequest",
    "AttendanceSyncRecord",
    "AttendanceSyncRequest",
    "AttendanceResponse",
    # Result
    "StudentAnswerEntry",
    "StudentAnswersCreate",
    "ResultCalculateRequest",
    "ResultResponse",
    # Ranking
    "RankingQueryParams",
    "RankingItemResponse",
    # OMR
    "OMRUploadRequest",
    "OMRSubmissionResponse",
    # Report
    "ReportGenerateRequest",
    # Award
    "AwardCreate",
    "AwardResponse",
    # Custom Field
    "CustomFieldCreate",
    "CustomFieldUpdate",
    "CustomFieldResponse",
]