import React, { useState, useEffect } from 'react';
import {
  ProblemSetModel,
  UserRole,
  StudentModel,
} from '../types';
import { ProblemSetHeaderView } from './ProblemSetHeaderView';
import { DiagramRenderer } from './DiagramRenderer';
import { ProblemSetBuilderModal } from './ProblemSetBuilderModal';
import { PrintableWorksheetModal } from './PrintableWorksheetModal';
import {
  FileSpreadsheet,
  Layers,
  Plus,
  Printer,
  Edit3,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  Check,
  ChevronRight,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

interface ProblemSetsViewProps {
  problemSets: ProblemSetModel[];
  onAddProblemSet: (set: ProblemSetModel) => void;
  onUpdateProblemSet: (set: ProblemSetModel) => void;
  currentRole: UserRole;
  students: StudentModel[];
  selectedProblemSetId?: string;
}

export const ProblemSetsView: React.FC<ProblemSetsViewProps> = ({
  problemSets,
  onAddProblemSet,
  onUpdateProblemSet,
  currentRole,
  students,
  selectedProblemSetId,
}) => {
  const [activeSetId, setActiveSetId] = useState<string>(
    selectedProblemSetId || problemSets[0]?.id || 'ps-001'
  );

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(0);

  // Student Test Mode State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(60 * 60); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Modals
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [editingProblemSet, setEditingProblemSet] = useState<ProblemSetModel | null>(null);

  // Sync if selectedProblemSetId prop changes
  useEffect(() => {
    if (selectedProblemSetId && problemSets.some((p) => p.id === selectedProblemSetId)) {
      setActiveSetId(selectedProblemSetId);
      setActiveBlockIndex(0);
      setUserAnswers({});
      setIsSubmitted(false);
    }
  }, [selectedProblemSetId, problemSets]);

  const activeProblemSet =
    problemSets.find((p) => p.id === activeSetId) || problemSets[0];

  // Initialize timer on active set change
  useEffect(() => {
    if (activeProblemSet) {
      setTimeRemaining(activeProblemSet.header.durationMinutes * 60);
      setIsTimerRunning(true);
      setUserAnswers({});
      setIsSubmitted(false);
      setActiveBlockIndex(0);
    }
  }, [activeSetId]);

  // Countdown timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeRemaining > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, isSubmitted]);

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleResetAnswers = () => {
    if (confirm('Are you sure you want to reset your answers and restart the timer?')) {
      setUserAnswers({});
      setIsSubmitted(false);
      setTimeRemaining(activeProblemSet.header.durationMinutes * 60);
      setIsTimerRunning(true);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
  };

  // Grade calculation
  const allQuestions = activeProblemSet.blocks.flatMap((b) => b.questions);
  const answeredCount = Object.keys(userAnswers).length;

  let computedScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  const blockStats = activeProblemSet.blocks.map((block) => {
    let blockScored = 0;
    let blockTotal = 0;
    let blockCorrect = 0;

    block.questions.forEach((q) => {
      blockTotal += q.positiveMarks;
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        if (ans.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
          blockScored += q.positiveMarks;
          blockCorrect++;
          computedScore += q.positiveMarks;
          correctCount++;
        } else {
          if (q.negativeMarks) {
            blockScored -= q.negativeMarks;
            computedScore -= q.negativeMarks;
          }
          incorrectCount++;
        }
      }
    });

    return {
      blockId: block.id,
      title: block.title,
      scored: Math.max(0, +blockScored.toFixed(1)),
      total: +blockTotal.toFixed(1),
      correctCount: blockCorrect,
      questionCount: block.questions.length,
    };
  });

  const totalMaxMarks = activeProblemSet.blocks.reduce(
    (sum, b) => sum + b.questions.reduce((qSum, q) => qSum + q.positiveMarks, 0),
    0
  );

  const percentage = totalMaxMarks > 0 ? ((computedScore / totalMaxMarks) * 100).toFixed(1) : '0';

  const filteredProblemSets = problemSets.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const activeBlock = activeProblemSet.blocks[activeBlockIndex] || activeProblemSet.blocks[0];

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase">
              Assessment Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Problem Sets & Worksheets
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Configurable blocks, visual puzzles, Olympiad paper printing, and interactive student scoring
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Print Paper Button */}
          <button
            onClick={() => setIsPrintModalOpen(true)}
            id="btn-open-print-paper"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold border border-white/10 transition-colors shadow-sm"
            title="Open printable test paper layout"
          >
            <Printer size={15} className="text-amber-400" />
            <span>Print Paper</span>
          </button>

          {/* Builder / Edit Button for Facilitator / Admin */}
          {(currentRole === 'admin' || currentRole === 'facilitator' || currentRole === 'mentor') && (
            <>
              <button
                onClick={() => {
                  setEditingProblemSet(activeProblemSet);
                  setIsBuilderOpen(true);
                }}
                id="btn-edit-current-set"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold border border-white/10 transition-colors shadow-sm"
              >
                <Edit3 size={15} className="text-blue-400" />
                <span>Edit Blocks</span>
              </button>

              <button
                onClick={() => {
                  setEditingProblemSet(null);
                  setIsBuilderOpen(true);
                }}
                id="btn-create-new-problem-set"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-sm"
              >
                <Plus size={15} />
                <span>New Problem Set</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Category Pills & Problem Set Selector Carousel */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {['All', 'Monthly Olympiad', 'Weekly Worksheet', 'Diagnostic Test', 'Practice Problem Set'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-white/15 text-white font-semibold border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Problem Set Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProblemSets.map((pset) => {
            const isSelected = pset.id === activeSetId;
            const pMarks = pset.blocks.reduce(
              (sum, b) => sum + b.questions.reduce((qSum, q) => qSum + q.positiveMarks, 0),
              0
            );

            return (
              <div
                key={pset.id}
                onClick={() => setActiveSetId(pset.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-neutral-900/90 border-amber-500/70 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-neutral-950/60 border-white/10 hover:border-white/20 hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    {pset.code}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 font-bold">
                    {pMarks} Marks
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-1.5 line-clamp-1">
                  {pset.header.assessmentTitle}
                </h4>

                <div className="mt-2 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>{pset.blocks.length} Blocks • {pset.blocks.reduce((s, b) => s + b.questions.length, 0)} Qs</span>
                  <span className="text-amber-400/90">{pset.header.durationMinutes}m duration</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Assessment Header Representation */}
      <ProblemSetHeaderView
        header={activeProblemSet.header}
        category={activeProblemSet.category}
        code={activeProblemSet.code}
        totalBlocks={activeProblemSet.blocks.length}
        totalQuestions={allQuestions.length}
      />

      {/* Floating Exam Controls & Timer Strip */}
      <div className="bg-neutral-900/90 p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-white/5">
            <Clock size={16} className={timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-amber-400'} />
            <span className="text-neutral-400">Time Left:</span>
            <span className={`font-bold text-sm ${timeRemaining < 300 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-neutral-400">Progress:</span>
            <span className="text-amber-300 font-bold">
              {answeredCount} of {allQuestions.length} Answered ({((answeredCount / (allQuestions.length || 1)) * 100).toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isSubmitted ? (
            <>
              <button
                onClick={handleResetAnswers}
                className="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white text-xs flex items-center gap-1 hover:bg-white/5 transition-colors"
                title="Clear entered answers"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>

              <button
                onClick={handleSubmit}
                id="btn-submit-assessment"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md"
              >
                <CheckCircle2 size={15} />
                <span>Submit & Auto-Grade</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                Score: {computedScore} / {totalMaxMarks} ({percentage}%)
              </span>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setUserAnswers({});
                  setTimeRemaining(activeProblemSet.header.durationMinutes * 60);
                  setIsTimerRunning(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-semibold hover:text-white"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Graded Performance Card (When Submitted) */}
      {isSubmitted && (
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 p-5 rounded-2xl border-2 border-amber-500/40 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Official Result Card & Assessment Scorecard
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Performance Evaluation: {computedScore >= 45 ? 'Gold Medalist Standard' : computedScore >= 40 ? 'Silver Medalist Standard' : computedScore >= 35 ? 'Bronze Medalist Standard' : 'Honorable Mention Standard'}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-amber-400 font-mono">
                {computedScore} <span className="text-base text-neutral-400 font-normal">/ {totalMaxMarks} Marks</span>
              </div>
              <div className="text-xs text-neutral-300 font-mono">
                Accuracy: {percentage}% • {correctCount} Correct • {incorrectCount} Incorrect
              </div>
            </div>
          </div>

          {/* Sectional Breakdown Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <BarChart3 size={14} className="text-amber-400" />
              <span>Sectional Performance by Named Blocks</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {blockStats.map((stat, idx) => (
                <div key={stat.blockId} className="bg-neutral-950/80 p-3 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {stat.title}
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-lg font-black text-amber-400 font-mono">
                      {stat.scored} <span className="text-xs text-neutral-400">/ {stat.total}</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {stat.correctCount}/{stat.questionCount} Qs
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${stat.total > 0 ? (stat.scored / stat.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Configurable Blocks Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {activeProblemSet.blocks.map((block, idx) => {
            const isActive = activeBlockIndex === idx;
            const blockAnswered = block.questions.filter((q) => userAnswers[q.id] !== undefined).length;
            const blockMarks = block.questions.reduce((s, q) => s + q.positiveMarks, 0);

            return (
              <button
                key={block.id}
                onClick={() => setActiveBlockIndex(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                    : 'bg-neutral-900/80 border-white/10 text-neutral-300 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{block.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-black/20 text-black font-extrabold'
                      : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {blockAnswered}/{block.questions.length} • {blockMarks}m
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Block Header & Questions */}
        {activeBlock && (
          <div className="bg-neutral-900/60 rounded-2xl border border-white/10 p-4 sm:p-6 space-y-6">
            {/* Block Descriptor */}
            <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Layers size={18} className="text-amber-400" />
                  <span>{activeBlock.title}</span>
                </h3>
                {activeBlock.description && (
                  <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                    {activeBlock.description}
                  </p>
                )}
              </div>

              {activeBlock.instructions && (
                <div className="text-[11px] font-mono px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 self-start sm:self-center">
                  {activeBlock.instructions}
                </div>
              )}
            </div>

            {/* Questions in Active Block */}
            <div className="space-y-6">
              {activeBlock.questions.map((q) => {
                const selectedAnswer = userAnswers[q.id];
                const isCorrect =
                  isSubmitted &&
                  selectedAnswer !== undefined &&
                  selectedAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                const isWrong =
                  isSubmitted &&
                  selectedAnswer !== undefined &&
                  selectedAnswer.trim().toLowerCase() !== q.correctAnswer.trim().toLowerCase();

                return (
                  <div
                    key={q.id}
                    id={`question-card-${q.id}`}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : isWrong
                          ? 'bg-red-950/20 border-red-500/40'
                          : 'bg-neutral-950/60 border-white/10'
                        : selectedAnswer !== undefined
                        ? 'bg-neutral-950/90 border-amber-500/40'
                        : 'bg-neutral-950/60 border-white/10'
                    }`}
                  >
                    {/* Question Header Bar */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-black text-xs">
                          {q.questionNumber}
                        </span>
                        {q.tag && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 font-bold">
                            {q.tag}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          [{q.type.replace('_', ' ')}]
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs font-bold">
                        <span className="text-amber-400">+{q.positiveMarks} Marks</span>
                        {q.negativeMarks ? (
                          <span className="text-red-400 text-[11px]">(-{q.negativeMarks} Neg.)</span>
                        ) : null}

                        {isSubmitted && (
                          <span className="ml-2">
                            {isCorrect ? (
                              <span className="flex items-center gap-1 text-emerald-400 font-sans text-xs">
                                <CheckCircle2 size={15} /> Correct
                              </span>
                            ) : isWrong ? (
                              <span className="flex items-center gap-1 text-red-400 font-sans text-xs">
                                <XCircle size={15} /> Incorrect
                              </span>
                            ) : (
                              <span className="text-neutral-500 text-xs font-sans">Unanswered</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Statement */}
                    <p className="text-sm sm:text-base text-neutral-100 font-medium leading-relaxed mt-2 font-serif">
                      {q.text}
                    </p>

                    {/* Render Visual Mathematical Diagram if present */}
                    {q.diagram && q.diagram.type !== 'none' && (
                      <DiagramRenderer diagram={q.diagram} />
                    )}

                    {/* Options (MCQ / Visual Puzzle) */}
                    {q.options && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                        {q.options.map((opt) => {
                          const isOptionSelected = selectedAnswer === opt.id;
                          const isOptionCorrect = isSubmitted && opt.id === q.correctAnswer;
                          const isOptionWrongSelection =
                            isSubmitted && isOptionSelected && opt.id !== q.correctAnswer;

                          let btnClasses =
                            'bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/20 hover:text-white';

                          if (isOptionSelected && !isSubmitted) {
                            btnClasses =
                              'bg-amber-500/20 border-amber-500 text-white font-bold shadow-sm';
                          } else if (isOptionCorrect) {
                            btnClasses =
                              'bg-emerald-500/25 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isOptionWrongSelection) {
                            btnClasses =
                              'bg-red-500/25 border-red-500 text-red-200 font-bold';
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectAnswer(q.id, opt.id)}
                              disabled={isSubmitted}
                              className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${btnClasses}`}
                            >
                              <span
                                className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                                  isOptionSelected
                                    ? 'bg-amber-500 text-black border-amber-400'
                                    : 'border-white/20 text-neutral-400'
                                }`}
                              >
                                {opt.id}
                              </span>
                              <span className="text-xs sm:text-sm font-sans pt-0.5 leading-snug">
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Numerical Input Question */}
                    {q.type === 'numerical' && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <label className="text-xs text-neutral-400 font-mono">
                          Enter Calculated Value:
                        </label>
                        <input
                          type="text"
                          value={selectedAnswer || ''}
                          onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                          disabled={isSubmitted}
                          placeholder="e.g. 42"
                          className="bg-neutral-900 border border-white/20 rounded-lg px-3 py-1.5 text-white font-mono text-sm w-36 focus:outline-none focus:border-amber-400"
                        />
                        {isSubmitted && (
                          <span className="text-xs font-mono text-neutral-400">
                            (Key: <strong className="text-amber-300">{q.correctAnswer}</strong>)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Step-by-Step Solution (Shown after Submission) */}
                    {isSubmitted && (
                      <div className="mt-4 p-3.5 bg-neutral-900/90 rounded-xl border border-amber-500/30 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                          <Sparkles size={14} />
                          <span>Official Solution & Proof Steps (Key: {q.correctAnswer})</span>
                        </div>
                        <p className="text-neutral-300 leading-relaxed font-serif text-xs sm:text-sm">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Builder Modal */}
      <ProblemSetBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => {
          setIsBuilderOpen(false);
          setEditingProblemSet(null);
        }}
        onSaveProblemSet={(newOrUpdatedSet) => {
          if (problemSets.some((p) => p.id === newOrUpdatedSet.id)) {
            onUpdateProblemSet(newOrUpdatedSet);
          } else {
            onAddProblemSet(newOrUpdatedSet);
          }
          setActiveSetId(newOrUpdatedSet.id);
        }}
        initialProblemSet={editingProblemSet}
      />

      {/* Printable Exam Paper Modal */}
      <PrintableWorksheetModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        problemSet={activeProblemSet}
      />
    </div>
  );
};
