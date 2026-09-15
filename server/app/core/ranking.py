# JMO Management System — Core Ranking Logic
from dataclasses import dataclass
from typing import Optional
from uuid import UUID


@dataclass(frozen=True)
class RankingInput:
    student_id: UUID
    student_public_id: str
    student_name: str
    total_score: int
    max_possible_score: int
    percentage: float
    section_scores: list[dict]
    class_id: UUID
    class_name: str


@dataclass(frozen=True)
class RankingResult:
    student_id: UUID
    student_public_id: str
    student_name: str
    rank: int
    total_score: int
    max_possible_score: int
    percentage: float
    section_scores: list[dict]
    class_id: UUID
    class_name: str
    is_tied: bool


def compute_rankings(
    students: list[RankingInput],
    scope: str = "class",
) -> list[RankingResult]:
    """
    Compute standard competition ranking (1-2-2-4).
    Cross-class ranking uses percentage; class ranking uses total score.
    Tie-breaking: total score/percentage → section scores in order → same rank if still tied.
    """
    if not students:
        return []

    # Sort by primary criteria
    if scope == "cross_class":
        # Cross-class: sort by percentage descending
        sorted_students = sorted(
            students,
            key=lambda s: (s.percentage, *[sec["score"] / sec["max"] * 100 if sec["max"] > 0 else 0 for sec in s.section_scores]),
            reverse=True,
        )
    else:
        # Per-class: sort by total score descending
        sorted_students = sorted(
            students,
            key=lambda s: (s.total_score, *[sec["score"] for sec in s.section_scores]),
            reverse=True,
        )

    results = []
    current_rank = 1
    previous_key = None

    for i, student in enumerate(sorted_students):
        # Build tie-break key
        if scope == "cross_class":
            key = (student.percentage,)
        else:
            key = (student.total_score,)

        # Add section scores to key
        for sec in student.section_scores:
            if scope == "cross_class" and sec["max"] > 0:
                key += (sec["score"] / sec["max"] * 100,)
            else:
                key += (sec["score"],)

        is_tied = False
        if previous_key is not None and key == previous_key:
            is_tied = True
            rank = current_rank
        else:
            rank = i + 1
            current_rank = rank

        results.append(
            RankingResult(
                student_id=student.student_id,
                student_public_id=student.student_public_id,
                student_name=student.student_name,
                rank=rank,
                total_score=student.total_score,
                max_possible_score=student.max_possible_score,
                percentage=student.percentage,
                section_scores=student.section_scores,
                class_id=student.class_id,
                class_name=student.class_name,
                is_tied=is_tied,
            )
        )
        previous_key = key

    return results