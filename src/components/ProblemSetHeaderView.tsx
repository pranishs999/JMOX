import React, { useState } from 'react';
import { ProblemSetHeader } from '../types';
import { Clock, Award, Info, ChevronDown, ChevronUp, Calendar, School, BookOpen } from 'lucide-react';

interface ProblemSetHeaderViewProps {
  header: ProblemSetHeader;
  category: string;
  code: string;
  totalBlocks: number;
  totalQuestions: number;
}

export const ProblemSetHeaderView: React.FC<ProblemSetHeaderViewProps> = ({
  header,
  category,
  code,
  totalBlocks,
  totalQuestions,
}) => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);

  return (
    <div className="bg-neutral-900/90 border-2 border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Subtle background crest accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

      {/* Top Institute Header Banner */}
      <div className="text-center border-b border-white/10 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
          <span>{header.instituteName || 'JMS BRANCH – HRIC'}</span>
          <span>•</span>
          <span>{code}</span>
        </div>

        <h1 className="text-lg sm:text-2xl font-black text-white tracking-wide uppercase font-serif">
          {header.divisionName.split('\n')[0] || 'HETAUDA RESEARCH & INNOVATION CENTER'}
        </h1>
        {header.divisionName.split('\n')[1] && (
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-300 uppercase mt-0.5">
            {header.divisionName.split('\n')[1]}
          </p>
        )}

        <div className="mt-3 inline-block px-4 py-1.5 bg-neutral-950/80 border border-white/15 rounded-xl">
          <span className="text-base sm:text-xl font-bold text-amber-400 tracking-tight">
            {header.assessmentTitle}
          </span>
          <span className="ml-2.5 text-xs text-neutral-400 font-mono">
            [{category}]
          </span>
        </div>
      </div>

      {/* Meta Specifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs border-b border-white/10">
        <div className="bg-neutral-950/50 p-2.5 rounded-xl border border-white/5 flex items-center gap-2.5">
          <School size={16} className="text-neutral-400 shrink-0" />
          <div>
            <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">Class / Cohort</span>
            <span className="font-semibold text-neutral-200">{header.className} {header.batchName ? `(${header.batchName})` : ''}</span>
          </div>
        </div>

        <div className="bg-neutral-950/50 p-2.5 rounded-xl border border-white/5 flex items-center gap-2.5">
          <Calendar size={16} className="text-neutral-400 shrink-0" />
          <div>
            <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">Date / Session</span>
            <span className="font-semibold text-neutral-200">{header.date} ({header.academicYear})</span>
          </div>
        </div>

        <div className="bg-neutral-950/50 p-2.5 rounded-xl border border-white/5 flex items-center gap-2.5">
          <Clock size={16} className="text-amber-400 shrink-0" />
          <div>
            <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">Duration</span>
            <span className="font-bold text-amber-300">{header.durationMinutes} Minutes</span>
          </div>
        </div>

        <div className="bg-neutral-950/50 p-2.5 rounded-xl border border-amber-500/20 flex items-center gap-2.5">
          <Award size={16} className="text-amber-400 shrink-0" />
          <div>
            <span className="block text-[10px] text-amber-400/80 uppercase tracking-wider">Total Marks</span>
            <span className="font-black text-amber-300 text-sm">{header.totalMarks} Marks ({totalBlocks} Blocks • {totalQuestions} Qs)</span>
          </div>
        </div>
      </div>

      {/* Collapsible General Instructions Box */}
      <div className="mt-3">
        <button
          onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
          className="w-full flex items-center justify-between text-xs text-neutral-400 hover:text-neutral-200 transition-colors py-1"
        >
          <div className="flex items-center gap-2 font-semibold">
            <Info size={14} className="text-amber-400" />
            <span>Official Examination Instructions & Candidate Guidelines</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-500">
            <span>{isInstructionsOpen ? 'Collapse' : 'Show Instructions'}</span>
            {isInstructionsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </button>

        {isInstructionsOpen && (
          <div className="mt-2 p-3.5 bg-neutral-950/80 rounded-xl border border-white/10 text-xs text-neutral-300 space-y-1.5 font-sans">
            {header.instructions.map((inst, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="font-mono text-amber-400 text-[11px] shrink-0 font-bold">
                  {index + 1}.
                </span>
                <span className="leading-relaxed">{inst}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
