import React, { useState } from 'react';
import {
  BookOpen,
  Grid,
  Clock,
  Plus,
  Layers,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { ClassModel, BatchModel, SubjectModel } from '../types';

interface AcademicsViewProps {
  classes: ClassModel[];
  batches: BatchModel[];
  subjects: SubjectModel[];
  onAddBatch: (batch: Omit<BatchModel, 'id'>) => void;
  onAddSubject: (subject: Omit<SubjectModel, 'id'>) => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({
  classes,
  batches,
  subjects,
  onAddBatch,
  onAddSubject,
}) => {
  const [showNewBatchModal, setShowNewBatchModal] = useState(false);
  const [showNewSubjectModal, setShowNewSubjectModal] = useState(false);

  // New Batch form
  const [batchName, setBatchName] = useState('');
  const [batchClassId, setBatchClassId] = useState('cls-2');
  const [batchSchedule, setBatchSchedule] = useState('Mon, Thu (16:30 - 18:30)');

  // New Subject form
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('MATH-');
  const [subjectClassId, setSubjectClassId] = useState('cls-2');
  const [subjectDesc, setSubjectDesc] = useState('');

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName.trim()) return;
    const selectedClass = classes.find((c) => c.id === batchClassId);
    onAddBatch({
      name: batchName.trim(),
      classId: batchClassId,
      className: selectedClass ? selectedClass.name : 'Class 8',
      status: 'active',
      scheduleDays: batchSchedule.trim(),
    });
    setBatchName('');
    setShowNewBatchModal(false);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) return;
    onAddSubject({
      name: subjectName.trim(),
      code: subjectCode.trim() || 'MATH-EXT',
      classId: subjectClassId,
      description: subjectDesc.trim() || 'Core Olympiad syllabus topic and non-routine problem sets.',
    });
    setSubjectName('');
    setSubjectDesc('');
    setShowNewSubjectModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Academic Hierarchy & Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Institutional lineage: Academic Years → Classes → Batches → Specialized Olympiad Disciplines
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewBatchModal(true)}
            id="btn-add-batch"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-colors"
          >
            <Plus size={14} />
            <span>Add Batch</span>
          </button>
          <button
            onClick={() => setShowNewSubjectModal(true)}
            id="btn-add-subject"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-sm"
          >
            <BookOpen size={14} />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* Institute Profile & Academic Year Card */}
      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">National Junior Mathematics Olympiad Institute (JMO-HQ)</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                Institute Active
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Accredited Olympiad Training Institute • Timezone: Asia/Kolkata (UTC+05:30)
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            Current: 2025-2026
          </span>
        </div>

        {/* Academic Years Section */}
        <div className="pt-3 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 uppercase tracking-wider">
            <Calendar size={14} className="text-amber-400" />
            <span>Academic Year Lifecycle Management</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-300">AY 2024-2025</div>
                <div className="text-[10px] text-neutral-500">Jul 1, 2024 – Jun 30, 2025</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                Archived
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>AY 2025-2026</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-amber-200/70">Jul 1, 2025 – Jun 30, 2026</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Current Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-300">AY 2026-2027</div>
                <div className="text-[10px] text-neutral-500">Jul 1, 2026 – Jun 30, 2027</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Academic Classes Lineage */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Academic Levels & Capacity
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classes.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 relative overflow-hidden space-y-3 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-white">{c.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {c.id}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
                <div>
                  <div className="text-[10px] text-neutral-400">Batches</div>
                  <div className="text-sm font-bold text-white">{c.batchCount} active</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">Candidates</div>
                  <div className="text-sm font-bold text-amber-300">{c.studentCount} enrolled</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Training Batches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid size={18} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Assigned Training Batches ({batches.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {batches.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{b.name}</h4>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {b.className}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold uppercase">
                  {b.status}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-950 border border-white/5 space-y-1 text-xs text-neutral-300">
                <div className="text-[10px] text-neutral-400 flex items-center gap-1 font-semibold">
                  <Calendar size={12} className="text-amber-400" />
                  Weekly Schedule:
                </div>
                <div className="font-mono text-[11px] text-neutral-200">
                  {b.scheduleDays}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Olympiad Subjects & Disciplines */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Specialized Olympiad Disciplines & Syllabus ({subjects.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-2 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{sub.name}</h4>
                  <span className="text-[11px] font-mono text-amber-400">
                    {sub.code}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                  Core Discipline
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {sub.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD BATCH */}
      {showNewBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Create Training Batch</h3>
              <button
                onClick={() => setShowNewBatchModal(false)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Batch Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch Delta (Advanced)"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Associated Academic Class
                </label>
                <select
                  value={batchClassId}
                  onChange={(e) => setBatchClassId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Schedule Days & Timings
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tue, Fri (17:00 - 19:00)"
                  value={batchSchedule}
                  onChange={(e) => setBatchSchedule(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewBatchModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SUBJECT */}
      {showNewSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add Curriculum Discipline</h3>
              <button
                onClick={() => setShowNewSubjectModal(false)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Functional Equations"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Discipline Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. MATH-FEQ"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Syllabus & Scope Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe non-routine topics, lemmas, and competition theorems covered..."
                  value={subjectDesc}
                  onChange={(e) => setSubjectDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewSubjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400"
                >
                  Save Discipline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
