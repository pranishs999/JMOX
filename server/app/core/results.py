# JMO Management System — Core Results Logic
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from uuid import UUID
from app.core.scoring import calculate_score, calculate_section_scores, ScoreResult
from app.core.ranking import compute_rankings, RankingInput, RankingResult


@dataclass(frozen=True)
class ResultCalculationInput:
    student_id: UUID
    olympiad_id: UUID
    paper_id: UUID
    answer_key_id: UUID
    paper_version: int
    class_at_time_of_exam: UUID
    batch_at_time_of_exam: UUID
    answers: list
    answer_key: dict[UUID, str]
    questions: dict
    sections: dict


@dataclass(frozen=True)
class ResultCalculationOutput:
    total_score: int
    max_possible_score: int
    percentage: float
    section_scores: list[dict]
    correct_count: int
    incorrect_count: int
    unanswered_count: int


def calculate_assessment_result(
    input_data: ResultCalculationInput,
) -> ResultCalculationOutput:
    """Calculate complete assessment result from student answers."""
    # Convert answers to scoring format
    from app.core.scoring import StudentAnswerData, QuestionConfig

    answers = [
        StudentAnswerData(question_id=a.question_id, selected_option=a.selected_option)
        for a in input_data.answers
    ]

    questions_config = {
        q_id: QuestionConfig(
            question_id=q_id,
            marks=q.marks,
            negative_marks=q.negative_marks,
            correct_option=input_data.answer_key.get(q_id, ""),
        )
        for q_id, q in input_data.questions.items()
    }

    # Calculate overall score
    score_result = calculate_score(answers, input_data.answer_key, questions_config)

    # Calculate section scores
    section_scores = calculate_section_scores(
        answers, input_data.answer_key, questions_config, input_data.sections
    )

    return ResultCalculationOutput(
        total_score=score_result.total_score,
        max_possible_score=score_result.max_possible_score,
        percentage=score_result.percentage,
        section_scores=section_scores,
        correct_count=score_result.correct_count,
        incorrect_count=score_result.incorrect_count,
        unanswered_count=score_result.unanswered_count,
    )


def validate_result_immutability(result_status: str) -> bool:
    """Check if result can be modified (only draft/reviewed)."""
    return result_status in ("draft", "reviewed")


def validate_paper_locked(paper_locked_at: Optional[datetime]) -> bool:
    """Check if paper is locked (results published)."""
    return paper_locked_at is not None


def validate_answer_key_locked(answer_key_locked_at: Optional[datetime]) -> bool:
    """Check if answer key is locked (results published)."""
    return answer_key_locked_at is not None