"""Unit tests for core scoring logic."""
import pytest
from uuid import UUID, uuid4

from app.core.scoring import calculate_score, StudentAnswerData, QuestionConfig, ScoreResult


def test_score_all_correct():
    """Test scoring when all answers are correct."""
    qid = uuid4()
    questions = {
        qid: QuestionConfig(
            question_id=qid,
            marks=4,
            negative_marks=1,
            correct_option="A",
        )
    }
    answers = [
        StudentAnswerData(
            question_id=qid,
            selected_option="A",
        )
    ]
    
    result = calculate_score(answers, {qid: "A"}, questions)
    
    assert result.correct_count == 1
    assert result.incorrect_count == 0
    assert result.unanswered_count == 0
    assert result.total_score == 4


def test_score_all_incorrect():
    """Test scoring when all answers are incorrect."""
    qid = uuid4()
    questions = {
        qid: QuestionConfig(
            question_id=qid,
            marks=4,
            negative_marks=1,
            correct_option="A",
        )
    }
    answers = [
        StudentAnswerData(
            question_id=qid,
            selected_option="B",
        )
    ]
    
    result = calculate_score(answers, {qid: "A"}, questions)
    
    assert result.correct_count == 0
    assert result.incorrect_count == 1
    assert result.total_score == -1  # 0 - 1 (negative mark)


def test_score_all_unanswered():
    """Test scoring when all answers are unanswered."""
    qid = uuid4()
    questions = {
        qid: QuestionConfig(
            question_id=qid,
            marks=4,
            negative_marks=1,
            correct_option="A",
        )
    }
    answers = [
        StudentAnswerData(
            question_id=qid,
            selected_option=None,
        )
    ]
    
    result = calculate_score(answers, {qid: "A"}, questions)
    
    assert result.correct_count == 0
    assert result.incorrect_count == 0
    assert result.unanswered_count == 1
    assert result.total_score == 0


def test_score_mixed():
    """Test scoring with mix of correct, incorrect, and unanswered."""
    q1 = uuid4()
    q2 = uuid4()
    q3 = uuid4()
    
    questions = {
        q1: QuestionConfig(question_id=q1, marks=4, negative_marks=1, correct_option="A"),
        q2: QuestionConfig(question_id=q2, marks=4, negative_marks=1, correct_option="C"),
        q3: QuestionConfig(question_id=q3, marks=4, negative_marks=1, correct_option="B"),
    }
    answers = [
        StudentAnswerData(question_id=q1, selected_option="A"),  # correct
        StudentAnswerData(question_id=q2, selected_option="B"),  # incorrect
        StudentAnswerData(question_id=q3, selected_option=None),  # unanswered
    ]
    
    result = calculate_score(answers, {q1: "A", q2: "C", q3: "B"}, questions)
    
    assert result.correct_count == 1
    assert result.incorrect_count == 1
    assert result.unanswered_count == 1
    assert result.total_score == 3  # 4 - 1 + 0


def test_score_negative_total():
    """Test that total score can go negative with negative marking."""
    qid = uuid4()
    questions = {
        qid: QuestionConfig(question_id=qid, marks=2, negative_marks=1, correct_option="A"),
    }
    answers = [
        StudentAnswerData(question_id=qid, selected_option="B"),  # wrong
    ]
    
    result = calculate_score(answers, {qid: "A"}, questions)
    
    assert result.total_score == -1
    assert result.incorrect_count == 1