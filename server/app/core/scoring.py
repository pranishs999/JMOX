# JMO Management System — Core Scoring Logic
from dataclasses import dataclass
from typing import Optional
from uuid import UUID


@dataclass(frozen=True)
class QuestionConfig:
    question_id: UUID
    marks: int
    negative_marks: int
    correct_option: str


@dataclass(frozen=True)
class StudentAnswerData:
    question_id: UUID
    selected_option: Optional[str]


@dataclass(frozen=True)
class ScoreResult:
    total_score: int
    max_possible_score: int
    percentage: float
    correct_count: int
    incorrect_count: int
    unanswered_count: int
    section_scores: list[dict]


def calculate_score(
    answers: list[StudentAnswerData],
    answer_key: dict[UUID, str],
    questions: dict[UUID, QuestionConfig],
) -> ScoreResult:
    """Pure function: answers + key + config → score. No DB, no HTTP."""
    correct = incorrect = unanswered = 0
    total_score = 0
    max_possible = 0
    section_scores: dict[UUID, dict] = {}

    # Initialize section scores
    for q in questions.values():
        max_possible += q.marks

    for answer in answers:
        q = questions.get(answer.question_id)
        if not q:
            continue

        correct_option = answer_key.get(answer.question_id)
        if not correct_option:
            continue

        if answer.selected_option is None:
            unanswered += 1
        elif answer.selected_option == correct_option:
            correct += 1
            total_score += q.marks
        else:
            incorrect += 1
            total_score -= q.negative_marks

    percentage = (total_score / max_possible * 100) if max_possible > 0 else 0.0

    return ScoreResult(
        total_score=total_score,
        max_possible_score=max_possible,
        percentage=round(percentage, 2),
        correct_count=correct,
        incorrect_count=incorrect,
        unanswered_count=unanswered,
        section_scores=[],
    )


def calculate_section_scores(
    answers: list[StudentAnswerData],
    answer_key: dict[UUID, str],
    questions: dict[UUID, QuestionConfig],
    sections: dict[UUID, dict],
) -> list[dict]:
    """Calculate per-section scores."""
    section_results: dict[UUID, dict] = {}

    for section_id, section_info in sections.items():
        section_results[section_id] = {
            "section_id": str(section_id),
            "section_name": section_info["name"],
            "score": 0,
            "max": 0,
            "correct": 0,
            "incorrect": 0,
            "unanswered": 0,
        }

    for answer in answers:
        q = questions.get(answer.question_id)
        if not q:
            continue

        correct_option = answer_key.get(answer.question_id)
        if not correct_option:
            continue

        section_id = q.section_id
        if section_id not in section_results:
            continue

        section_results[section_id]["max"] += q.marks

        if answer.selected_option is None:
            section_results[section_id]["unanswered"] += 1
        elif answer.selected_option == correct_option:
            section_results[section_id]["correct"] += 1
            section_results[section_id]["score"] += q.marks
        else:
            section_results[section_id]["incorrect"] += 1
            section_results[section_id]["score"] -= q.negative_marks

    return list(section_results.values())