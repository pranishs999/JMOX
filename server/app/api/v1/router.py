# JMO Management System — API Router Aggregation
from fastapi import APIRouter

from app.api.v1.routes import (
    auth,
    teachers,
    academic,
    students,
    attendance,
    olympiads,
    papers,
    sections,
    questions,
    answers,
    results,
    rankings,
    omr,
    awards,
    reports,
    audit_logs,
    custom_fields,
)

from app.api.v1.routes.academic import router as academic_router, classes_router, batches_router

router = APIRouter(prefix="/api/v1")

router.include_router(auth.router)
router.include_router(teachers.router)
router.include_router(academic_router)
router.include_router(classes_router)
router.include_router(batches_router)
router.include_router(students.router)
router.include_router(attendance.router)
router.include_router(olympiads.router)
router.include_router(papers.router)
router.include_router(sections.router)
router.include_router(questions.router)
router.include_router(answers.router)
router.include_router(results.router)
router.include_router(rankings.router)
router.include_router(omr.router)
router.include_router(awards.router)
router.include_router(reports.router)
router.include_router(audit_logs.router)
router.include_router(custom_fields.router)