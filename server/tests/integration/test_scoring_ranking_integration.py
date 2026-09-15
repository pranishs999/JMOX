import pytest
from uuid import uuid4
from app.core.scoring import calculate_score, StudentAnswerData, QuestionConfig
from app.core.ranking import compute_rankings, RankingInput

def test_full_scoring_and_ranking_lifecycle():
    q1_id = uuid4()
    q2_id = uuid4()

    q1 = QuestionConfig(question_id=q1_id, marks=4, negative_marks=1, correct_option="A")
    q2 = QuestionConfig(question_id=q2_id, marks=4, negative_marks=1, correct_option="B")

    questions_dict = {q1_id: q1, q2_id: q2}
    answer_key = {q1_id: "A", q2_id: "B"}

    # Student 1: 2 correct (8 marks)
    ans1 = [StudentAnswerData(q1_id, "A"), StudentAnswerData(q2_id, "B")]
    res1 = calculate_score(ans1, answer_key, questions_dict)
    assert res1.total_score == 8

    # Student 2: 1 correct, 1 wrong (4 - 1 = 3 marks)
    ans2 = [StudentAnswerData(q1_id, "A"), StudentAnswerData(q2_id, "C")]
    res2 = calculate_score(ans2, answer_key, questions_dict)
    assert res2.total_score == 3

    # Student 3: 2 correct (8 marks) - Tied with Student 1
    ans3 = [StudentAnswerData(q1_id, "A"), StudentAnswerData(q2_id, "B")]
    res3 = calculate_score(ans3, answer_key, questions_dict)
    assert res3.total_score == 8

    s1_id = uuid4()
    s2_id = uuid4()
    s3_id = uuid4()
    c_id = uuid4()

    inputs = [
        RankingInput(
            student_id=s1_id,
            student_public_id="STU-001",
            student_name="Student 1",
            total_score=res1.total_score,
            max_possible_score=8,
            percentage=100.0,
            section_scores=res1.section_scores,
            class_id=c_id,
            class_name="Class 1",
        ),
        RankingInput(
            student_id=s2_id,
            student_public_id="STU-002",
            student_name="Student 2",
            total_score=res2.total_score,
            max_possible_score=8,
            percentage=37.5,
            section_scores=res2.section_scores,
            class_id=c_id,
            class_name="Class 1",
        ),
        RankingInput(
            student_id=s3_id,
            student_public_id="STU-003",
            student_name="Student 3",
            total_score=res3.total_score,
            max_possible_score=8,
            percentage=100.0,
            section_scores=res3.section_scores,
            class_id=c_id,
            class_name="Class 1",
        ),
    ]

    rankings = compute_rankings(inputs, scope="class")
    
    s1_rank = next(r for r in rankings if r.student_id == s1_id)
    s2_rank = next(r for r in rankings if r.student_id == s2_id)
    s3_rank = next(r for r in rankings if r.student_id == s3_id)

    # Standard competition 1-1-3 ranking
    assert s1_rank.rank == 1
    assert s3_rank.rank == 1
    assert s2_rank.rank == 3
