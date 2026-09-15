"""Unit tests for core ranking logic."""
import pytest
from uuid import UUID, uuid4

from app.core.ranking import compute_rankings, RankingInput


def test_simple_ranking():
    """Test simple ranking with no ties."""
    students = [
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-001",
            student_name="Alice",
            total_score=95,
            max_possible_score=100,
            percentage=95.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-002",
            student_name="Bob",
            total_score=85,
            max_possible_score=100,
            percentage=85.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-003",
            student_name="Charlie",
            total_score=75,
            max_possible_score=100,
            percentage=75.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
    ]
    
    results = compute_rankings(students, scope="class")
    
    assert results[0].rank == 1  # Alice
    assert results[1].rank == 2  # Bob
    assert results[2].rank == 3  # Charlie


def test_two_way_tie():
    """Test standard competition ranking with two-way tie (1-1-3-4 convention)."""
    students = [
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-001",
            student_name="Alice",
            total_score=90,
            max_possible_score=100,
            percentage=90.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-002",
            student_name="Bob",
            total_score=90,
            max_possible_score=100,
            percentage=90.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-003",
            student_name="Charlie",
            total_score=80,
            max_possible_score=100,
            percentage=80.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-004",
            student_name="David",
            total_score=70,
            max_possible_score=100,
            percentage=70.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
    ]
    
    results = compute_rankings(students, scope="class")
    
    # Standard competition ranking: 1-1-3-4
    assert results[0].rank == 1  # Alice
    assert results[1].rank == 1  # Bob (tied with Alice for 1st)
    assert results[2].rank == 3  # Charlie
    assert results[3].rank == 4  # David


def test_three_way_tie():
    """Test three-way tie ranking."""
    students = [
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-001",
            student_name="Alice",
            total_score=90,
            max_possible_score=100,
            percentage=90.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-002",
            student_name="Bob",
            total_score=90,
            max_possible_score=100,
            percentage=90.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-003",
            student_name="Charlie",
            total_score=90,
            max_possible_score=100,
            percentage=90.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
        RankingInput(
            student_id=uuid4(),
            student_public_id="STU-004",
            student_name="David",
            total_score=80,
            max_possible_score=100,
            percentage=80.0,
            section_scores=[],
            class_id=uuid4(),
            class_name="Class A",
        ),
    ]
    
    results = compute_rankings(students, scope="class")
    
    # All three tied at rank 1, next is rank 4
    assert results[0].rank == 1
    assert results[1].rank == 1
    assert results[2].rank == 1
    assert results[3].rank == 4