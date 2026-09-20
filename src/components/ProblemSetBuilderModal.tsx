import React, { useState } from 'react';
import {
  ProblemSetModel,
  ProblemSetBlock,
  ProblemQuestion,
  QuestionType,
  DiagramType,
} from '../types';
import {
  X,
  Plus,
  Trash2,
  Save,
  Layers,
  HelpCircle,
  Award,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface ProblemSetBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProblemSet: (problemSet: ProblemSetModel) => void;
  initialProblemSet?: ProblemSetModel | null;
}

export const ProblemSetBuilderModal: React.FC<ProblemSetBuilderModalProps> = ({
  isOpen,
  onClose,
  onSaveProblemSet,
  initialProblemSet,
}) => {
  if (!isOpen) return null;

  // Header State
  const [instituteName, setInstituteName] = useState(
    initialProblemSet?.header.instituteName || 'JMS BRANCH – HRIC'
  );
  const [divisionName, setDivisionName] = useState(
    initialProblemSet?.header.divisionName ||
      'HETAUDA RESEARCH & INNOVATION CENTER\nACADEMIC MATHEMATICS DIVISION'
  );
  const [assessmentTitle, setAssessmentTitle] = useState(
    initialProblemSet?.header.assessmentTitle || 'Monthly Olympiad (Stage 1)'
  );
  const [category, setCategory] = useState<
    'Monthly Olympiad' | 'Weekly Worksheet' | 'Diagnostic Test' | 'Practice Problem Set'
  >(initialProblemSet?.category || 'Monthly Olympiad');
  const [academicYear, setAcademicYear] = useState(
    initialProblemSet?.header.academicYear || '2025-2026'
  );
  const [className, setClassName] = useState(
    initialProblemSet?.header.className || 'Class 8 & 9'
  );
  const [batchName, setBatchName] = useState(
    initialProblemSet?.header.batchName || 'Batch Alpha'
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initialProblemSet?.header.durationMinutes || 60
  );
  const [instructionsText, setInstructionsText] = useState(
    initialProblemSet?.header.instructions.join('\n') ||
      'The assessment consists of multiple named mathematical blocks.\nAll questions are compulsory.\nNo external mathematical calculators are allowed.'
  );

  // Blocks State
  const [blocks, setBlocks] = useState<ProblemSetBlock[]>(
    initialProblemSet?.blocks || [
      {
        id: 'blk-new-1',
        blockNumber: 1,
        title: 'Block 1 — Everyday Mathematics',
        description: 'Applied arithmetic, rates, and practical problems.',
        instructions: 'Each question carries 2.5 marks.',
        questions: [],
      },
      {
        id: 'blk-new-2',
        blockNumber: 2,
        title: 'Block 2 — Mathematical Reasoning',
        description: 'Formal logic, algebraic expressions, and geometric reasoning.',
        instructions: 'Each question carries 3.0 marks.',
        questions: [],
      },
    ]
  );

  // Active Block Tab for editing
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);

  // New Question Form state
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [qType, setQType] = useState<QuestionType>('mcq');
  const [qText, setQText] = useState('');
  const [qMarks, setQMarks] = useState(2.5);
  const [qNegMarks, setQNegMarks] = useState(0);
  const [qCorrectAnswer, setQCorrectAnswer] = useState('A');
  const [qExplanation, setQExplanation] = useState('');
  const [qTag, setQTag] = useState('Everyday Math');
  const [qDiagramType, setQDiagramType] = useState<DiagramType>('none');
  const [qDiagramTitle, setQDiagramTitle] = useState('');
  const [qOptions, setQOptions] = useState([
    { id: 'A', text: '' },
    { id: 'B', text: '' },
    { id: 'C', text: '' },
    { id: 'D', text: '' },
  ]);

  // Compute total questions and total marks dynamically
  const totalQuestions = blocks.reduce(
    (sum, b) => sum + b.questions.length,
    0
  );
  const totalMarks = blocks.reduce(
    (sum, b) =>
      sum + b.questions.reduce((qSum, q) => qSum + Number(q.positiveMarks || 0), 0),
    0
  );

  const handleAddBlock = () => {
    const newNum = blocks.length + 1;
    const newBlock: ProblemSetBlock = {
      id: `blk-${Date.now()}`,
      blockNumber: newNum,
      title: `Block ${newNum} — Custom Problem Section`,
      description: 'Sectional problems and domain reasoning.',
      instructions: 'Each question carries specified marks.',
      questions: [],
    };
    setBlocks([...blocks, newBlock]);
    setActiveBlockIndex(blocks.length);
  };

  const handleDeleteBlock = (index: number) => {
    if (blocks.length <= 1) {
      alert('A problem set must have at least one block.');
      return;
    }
    const updated = blocks.filter((_, i) => i !== index);
    setBlocks(updated);
    setActiveBlockIndex(Math.max(0, index - 1));
  };

  const handleUpdateBlockTitle = (index: number, newTitle: string) => {
    const updated = [...blocks];
    updated[index].title = newTitle;
    setBlocks(updated);
  };

  const handleUpdateBlockDesc = (index: number, newDesc: string) => {
    const updated = [...blocks];
    updated[index].description = newDesc;
    setBlocks(updated);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;

    const currentBlock = blocks[activeBlockIndex];
    if (!currentBlock) return;

    const newQuestion: ProblemQuestion = {
      id: `q-${Date.now()}`,
      questionNumber: totalQuestions + 1,
      type: qType,
      text: qText.trim(),
      positiveMarks: Number(qMarks) || 2.5,
      negativeMarks: Number(qNegMarks) || 0,
      correctAnswer: qCorrectAnswer.trim(),
      explanation: qExplanation.trim(),
      tag: qTag,
      diagram:
        qDiagramType !== 'none'
          ? {
              type: qDiagramType,
              title: qDiagramTitle.trim() || undefined,
            }
          : undefined,
      options:
        qType === 'mcq' || qType === 'visual_puzzle'
          ? qOptions.map((opt) => ({
              id: opt.id,
              text: opt.text.trim() || `Option ${opt.id}`,
            }))
          : undefined,
    };

    const updatedBlocks = [...blocks];
    updatedBlocks[activeBlockIndex].questions.push(newQuestion);
    setBlocks(updatedBlocks);

    // Reset Form
    setQText('');
    setQExplanation('');
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (blockIndex: number, questionId: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[blockIndex].questions = updatedBlocks[
      blockIndex
    ].questions.filter((q) => q.id !== questionId);
    setBlocks(updatedBlocks);
  };

  const handleSave = () => {
    if (!assessmentTitle.trim()) {
      alert('Please provide an assessment title.');
      return;
    }

    const instructions = instructionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedModel: ProblemSetModel = {
      id: initialProblemSet?.id || `ps-${Date.now()}`,
      code:
        initialProblemSet?.code ||
        `JMOX-${category.slice(0, 2).toUpperCase()}-${new Date()
          .toISOString()
          .slice(0, 10)}`,
      category,
      status: initialProblemSet?.status || 'published',
      header: {
        instituteName: instituteName.trim(),
        divisionName: divisionName.trim(),
        assessmentTitle: assessmentTitle.trim(),
        academicYear: academicYear.trim(),
        className: className.trim(),
        batchName: batchName.trim(),
        date: new Date().toISOString().slice(0, 10),
        durationMinutes: Number(durationMinutes) || 60,
        totalMarks: totalMarks > 0 ? totalMarks : 50,
        instructions:
          instructions.length > 0
            ? instructions
            : ['All questions are compulsory.'],
      },
      blocks,
      createdAt: initialProblemSet?.createdAt || new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    onSaveProblemSet(updatedModel);
    onClose();
  };

  const currentBlock = blocks[activeBlockIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex justify-center p-3 sm:p-6">
      <div className="bg-neutral-900 border border-white/20 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="text-amber-400" size={20} />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {initialProblemSet ? 'Edit Problem Set / Assessment' : 'New Problem Set & Worksheet Builder'}
              </h3>
              <p className="text-xs text-neutral-400">
                Define configurable blocks, questions, visual diagrams, and auto-computed marks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              id="btn-save-problem-set"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow"
            >
              <Save size={15} />
              <span>Save Problem Set</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Section 1: Header Configuration */}
          <div className="bg-neutral-950/80 p-4 rounded-xl border border-white/10 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Award size={14} />
              <span>1. Problem Set Header Specifications</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Institute / Branch Name</label>
                <input
                  type="text"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Assessment Title</label>
                <input
                  type="text"
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 font-semibold"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Monthly Olympiad">Monthly Olympiad</option>
                  <option value="Weekly Worksheet">Weekly Worksheet</option>
                  <option value="Diagnostic Test">Diagnostic Test</option>
                  <option value="Practice Problem Set">Practice Problem Set</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1">Division / Department</label>
                <input
                  type="text"
                  value={divisionName}
                  onChange={(e) => setDivisionName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Target Class</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Batch / Cohort</label>
                <input
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-neutral-400 mb-1">General Instructions (one per line)</label>
                <textarea
                  rows={2}
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Configurable Blocks Navigation */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  2. Assessment Blocks & Sections ({blocks.length} Configured • {totalMarks} Total Marks)
                </h4>
              </div>

              <button
                onClick={handleAddBlock}
                id="btn-add-block"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
              >
                <Plus size={14} />
                <span>Add New Block / Section</span>
              </button>
            </div>

            {/* Block Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {blocks.map((block, idx) => {
                const isActive = activeBlockIndex === idx;
                const blockMarks = block.questions.reduce((s, q) => s + q.positiveMarks, 0);

                return (
                  <button
                    key={block.id}
                    onClick={() => setActiveBlockIndex(idx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-500 text-black border-amber-400 font-bold shadow'
                        : 'bg-neutral-950 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{block.title.split('—')[0] || `Block ${idx + 1}`}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-300'
                    }`}>
                      {block.questions.length} Qs • {blockMarks}m
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Block Inspector */}
            {currentBlock && (
              <div className="bg-neutral-950/80 p-4 rounded-xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-0.5 font-mono">Block Title</label>
                      <input
                        type="text"
                        value={currentBlock.title}
                        onChange={(e) => handleUpdateBlockTitle(activeBlockIndex, e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-0.5 font-mono">Block Description / Topic Scope</label>
                      <input
                        type="text"
                        value={currentBlock.description || ''}
                        onChange={(e) => handleUpdateBlockDesc(activeBlockIndex, e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-neutral-300 text-xs focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Applied arithmetic, rate problems, and percentages"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => setShowAddQuestion(true)}
                      id="btn-add-question-to-block"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-semibold hover:bg-amber-500/25 transition-all"
                    >
                      <Plus size={14} />
                      <span>Add Question to Block</span>
                    </button>

                    {blocks.length > 1 && (
                      <button
                        onClick={() => handleDeleteBlock(activeBlockIndex)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20"
                        title="Delete this block"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Questions List in Active Block */}
                <div className="space-y-3">
                  <h5 className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                    <HelpCircle size={14} className="text-amber-400" />
                    <span>Questions in {currentBlock.title} ({currentBlock.questions.length})</span>
                  </h5>

                  {currentBlock.questions.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-xl text-neutral-500 text-xs">
                      No questions in this block yet. Click &quot;Add Question to Block&quot; to build questions.
                    </div>
                  ) : (
                    currentBlock.questions.map((q, qIdx) => (
                      <div
                        key={q.id}
                        className="p-3 bg-neutral-900/90 rounded-xl border border-white/10 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-400 font-mono">
                              Q.{q.questionNumber || qIdx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 uppercase font-mono">
                              {q.type}
                            </span>
                            {q.tag && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono">
                                {q.tag}
                              </span>
                            )}
                            <span className="text-neutral-400 text-[11px] font-mono">
                              +{q.positiveMarks} m {q.negativeMarks ? `(-${q.negativeMarks})` : ''}
                            </span>
                            {q.diagram && q.diagram.type !== 'none' && (
                              <span className="text-[10px] text-blue-400 font-mono border border-blue-500/30 px-1.5 py-0.5 rounded bg-blue-500/10">
                                Diagram: {q.diagram.type}
                              </span>
                            )}
                          </div>
                          <p className="text-neutral-200 leading-relaxed font-sans">{q.text}</p>
                          <div className="text-[11px] text-neutral-400">
                            <strong>Key:</strong> {q.correctAnswer} • <strong>Sol:</strong> {q.explanation}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteQuestion(activeBlockIndex, q.id)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                          title="Remove question"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Question Sub-Form */}
                {showAddQuestion && (
                  <form onSubmit={handleCreateQuestion} className="bg-neutral-900 p-4 rounded-xl border border-amber-500/30 space-y-3 mt-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-amber-300">
                        Add Question to {currentBlock.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowAddQuestion(false)}
                        className="text-neutral-400 hover:text-white"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Question Type</label>
                        <select
                          value={qType}
                          onChange={(e) => setQType(e.target.value as any)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white"
                        >
                          <option value="mcq">Multiple Choice (MCQ)</option>
                          <option value="numerical">Numerical / Integer</option>
                          <option value="visual_puzzle">Visual Puzzle / Pattern</option>
                          <option value="short_answer">Short Answer / Proof</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">Marks (+ / -)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.5"
                            value={qMarks}
                            onChange={(e) => setQMarks(Number(e.target.value))}
                            placeholder="Marks"
                            className="w-1/2 bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs"
                          />
                          <input
                            type="number"
                            step="0.5"
                            value={qNegMarks}
                            onChange={(e) => setQNegMarks(Number(e.target.value))}
                            placeholder="Neg"
                            className="w-1/2 bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">Domain Tag</label>
                        <select
                          value={qTag}
                          onChange={(e) => setQTag(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white"
                        >
                          <option value="Everyday Math">Everyday Math</option>
                          <option value="Number Theory">Number Theory</option>
                          <option value="Geometry">Geometry</option>
                          <option value="Algebra">Algebra</option>
                          <option value="Combinatorics">Combinatorics</option>
                          <option value="Logic">Logic & Reasoning</option>
                          <option value="Puzzle">Puzzle Corner</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-neutral-400 mb-1">Question Statement / Problem</label>
                        <textarea
                          rows={2}
                          required
                          value={qText}
                          onChange={(e) => setQText(e.target.value)}
                          placeholder="State the mathematical problem or challenge clearly..."
                          className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs focus:border-amber-400"
                        />
                      </div>

                      {/* Visual Diagram Selector */}
                      <div>
                        <label className="block text-neutral-400 mb-1">Visual Diagram / Figure</label>
                        <select
                          value={qDiagramType}
                          onChange={(e) => setQDiagramType(e.target.value as any)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs"
                        >
                          <option value="none">No Diagram</option>
                          <option value="geometry_triangle_circle">Geometry: Incircle in Right Triangle</option>
                          <option value="geometry_trapezoid">Geometry: Trapezoid Diagonals</option>
                          <option value="pattern_matrix">Visual: 3×3 Logic Matrix</option>
                          <option value="sudoku_grid">Visual: 4×4 Mini-Sudoku Grid</option>
                          <option value="clock_angle">Logic: Analog Chronometer</option>
                          <option value="maze_graph">Graph: Planar Network</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-neutral-400 mb-1">Diagram Caption</label>
                        <input
                          type="text"
                          value={qDiagramTitle}
                          onChange={(e) => setQDiagramTitle(e.target.value)}
                          placeholder="e.g. Figure: Inscribed circle tangent to right triangle ABC"
                          className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs"
                        />
                      </div>

                      {/* Options for MCQ */}
                      {(qType === 'mcq' || qType === 'visual_puzzle') && (
                        <div className="sm:col-span-3 space-y-2">
                          <label className="block text-neutral-400 text-xs">Options & Answer Key</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {qOptions.map((opt, i) => (
                              <div key={opt.id} className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-lg border border-white/5">
                                <span className="w-6 h-6 rounded bg-white/10 font-bold font-mono text-center leading-6 text-xs text-amber-400">
                                  {opt.id}
                                </span>
                                <input
                                  type="text"
                                  placeholder={`Option ${opt.id} text`}
                                  value={opt.text}
                                  onChange={(e) => {
                                    const copy = [...qOptions];
                                    copy[i].text = e.target.value;
                                    setQOptions(copy);
                                  }}
                                  className="flex-1 bg-transparent text-white text-xs outline-none"
                                />
                                <input
                                  type="radio"
                                  name="correctOption"
                                  checked={qCorrectAnswer === opt.id}
                                  onChange={() => setQCorrectAnswer(opt.id)}
                                  title="Mark as correct answer"
                                  className="accent-amber-400"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {qType === 'numerical' && (
                        <div>
                          <label className="block text-neutral-400 mb-1">Correct Numerical Value</label>
                          <input
                            type="text"
                            value={qCorrectAnswer}
                            onChange={(e) => setQCorrectAnswer(e.target.value)}
                            placeholder="e.g. 42"
                            className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs font-mono"
                          />
                        </div>
                      )}

                      <div className="sm:col-span-3">
                        <label className="block text-neutral-400 mb-1">Step-by-Step Explanation & Solution</label>
                        <textarea
                          rows={2}
                          value={qExplanation}
                          onChange={(e) => setQExplanation(e.target.value)}
                          placeholder="Detailed mathematical proof or calculation steps..."
                          className="w-full bg-neutral-950 border border-white/10 rounded-lg p-2 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddQuestion(false)}
                        className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                      >
                        Save Question
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
