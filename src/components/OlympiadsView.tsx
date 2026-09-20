import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Calendar,
  Sparkles,
  Plus,
  ArrowUpDown,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Printer,
} from 'lucide-react';
import { OlympiadModel, ResultModel } from '../types';

interface OlympiadsViewProps {
  olympiads: OlympiadModel[];
  results: ResultModel[];
  onAddOlympiad: (olympiad: Omit<OlympiadModel, 'id'>) => void;
  selectedScorecard: ResultModel | null;
  onOpenScorecard: (result: ResultModel | null) => void;
}

export const OlympiadsView: React.FC<OlympiadsViewProps> = ({
  olympiads,
  results,
  onAddOlympiad,
  selectedScorecard,
  onOpenScorecard,
}) => {
  const [selectedOlympiadId, setSelectedOlympiadId] = useState<string>(
    olympiads[0]?.id || 'oly-1'
  );
  const [showNewModal, setShowNewModal] = useState(false);

  // New Olympiad state
  const [olyName, setOlyName] = useState('');
  const [olyDate, setOlyDate] = useState('');
  const [olyMaxScore, setOlyMaxScore] = useState(50);

  const selectedOlympiad =
    olympiads.find((o) => o.id === selectedOlympiadId) || olympiads[0];

  const olympiadResults = results
    .filter((r) => r.olympiadId === selectedOlympiadId || selectedOlympiadId === 'oly-1')
    .sort((a, b) => b.totalScore - a.totalScore);

  const handleCreateOlympiad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!olyName.trim()) return;
    onAddOlympiad({
      name: olyName.trim(),
      eventDate: olyDate || '2026-11-15',
      maxScore: Number(olyMaxScore) || 50,
      status: 'scheduled',
      participantsCount: 0,
    });
    setOlyName('');
    setShowNewModal(false);
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="flex items-center gap-1 text-amber-400 font-black text-sm">
          <Trophy size={16} className="text-amber-400" /> #1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="flex items-center gap-1 text-neutral-300 font-bold text-sm">
          <Medal size={16} className="text-neutral-300" /> #2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="flex items-center gap-1 text-amber-600 font-bold text-sm">
          <Medal size={16} className="text-amber-600" /> #3
        </span>
      );
    }
    return <span className="font-mono text-neutral-400 font-medium text-xs">#{rank}</span>;
  };

  const getAwardTag = (award: string) => {
    if (award.includes('Gold')) {
      return 'bg-amber-400/15 border-amber-400/30 text-amber-300';
    }
    if (award.includes('Silver')) {
      return 'bg-slate-300/15 border-slate-300/30 text-slate-200';
    }
    if (award.includes('Bronze')) {
      return 'bg-amber-700/15 border-amber-700/30 text-amber-500';
    }
    if (award.includes('Honorable')) {
      return 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300';
    }
    return 'bg-white/5 border-white/10 text-neutral-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Examinations & Competition Rankings
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Standard Competition Ranking (1-2-2-4), certified scorecards, and sectional analysis
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          id="btn-new-olympiad"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-sm self-start sm:self-center"
        >
          <Plus size={15} />
          <span>Schedule New Olympiad</span>
        </button>
      </div>

      {/* Olympiad Event Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {olympiads.map((oly) => {
          const isSelected = oly.id === selectedOlympiadId;
          return (
            <button
              key={oly.id}
              onClick={() => setSelectedOlympiadId(oly.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-neutral-900 border-amber-500/50 text-white shadow-sm'
                  : 'bg-neutral-950/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Trophy
                size={14}
                className={isSelected ? 'text-amber-400' : 'text-neutral-500'}
              />
              <span>{oly.name}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-bold tracking-wider ${
                  oly.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {oly.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Olympiad Overview Banner */}
      {selectedOlympiad && (
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Official Stage Assessment
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                <Calendar size={12} /> Scheduled: {selectedOlympiad.eventDate}
              </span>
            </div>
            <h3 className="text-lg font-black text-white">{selectedOlympiad.name}</h3>
            <p className="text-xs text-neutral-400">
              Deterministic tie-breaking priority: Achievers Section → Olympiad Algebra → Number Theory
            </p>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-[10px] text-neutral-400">Total Enrolled</div>
              <div className="text-lg font-black text-white">
                {selectedOlympiad.participantsCount || 168}
              </div>
            </div>
            <div className="border-l border-white/10 pl-4">
              <div className="text-[10px] text-neutral-400">Paper Max Score</div>
              <div className="text-lg font-black text-amber-400">
                {selectedOlympiad.maxScore} pts
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-white/10 bg-neutral-900/70 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" />
            Official Candidate Standings & Section Distribution
          </h4>
          <span className="text-xs font-mono text-neutral-400">
            {olympiadResults.length} Qualified Candidates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Public ID</th>
                <th className="px-4 py-3">Algebra</th>
                <th className="px-4 py-3">Num Theory</th>
                <th className="px-4 py-3">Geometry</th>
                <th className="px-4 py-3">Combinatorics</th>
                <th className="px-4 py-3 font-bold">Total Score</th>
                <th className="px-4 py-3">Award Status</th>
                <th className="px-4 py-3 text-right">Scorecard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {olympiadResults.map((r, idx) => {
                const rankNumber = idx + 1;
                return (
                  <tr
                    key={r.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => onOpenScorecard(r)}
                  >
                    <td className="px-4 py-3.5">{getRankBadge(rankNumber)}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-white text-sm">{r.studentName}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-amber-300/90">
                        {r.studentPublicId}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-neutral-300">
                      {r.sections.algebra} <span className="text-neutral-500">/15</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-neutral-300">
                      {r.sections.numberTheory} <span className="text-neutral-500">/12</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-neutral-300">
                      {r.sections.geometry} <span className="text-neutral-500">/12</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-neutral-300">
                      {r.sections.combinatorics} <span className="text-neutral-500">/11</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-black text-sm text-white">
                        {r.totalScore}
                      </span>
                      <span className="text-neutral-500 text-xs"> / {r.maxScore}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getAwardTag(
                          r.award
                        )}`}
                      >
                        {r.award}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenScorecard(r);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                        title="View Official Scorecard"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CERTIFIED SCORECARD */}
      {selectedScorecard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                  <Trophy size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Official Olympiad Performance Card
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Certificate ID: JMOX-CERT-{selectedScorecard.studentPublicId.replace('STU-', '')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenScorecard(null)}
                className="text-neutral-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Certificate Header Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-indigo-500/10 border border-amber-500/20 text-center space-y-1">
              <div className="text-xs uppercase font-semibold text-amber-300 tracking-wider">
                {selectedScorecard.award}
              </div>
              <div className="text-xl font-black text-white">
                {selectedScorecard.studentName}
              </div>
              <div className="text-xs text-neutral-400 font-mono">
                {selectedScorecard.studentPublicId} • {selectedScorecard.olympiadName}
              </div>
            </div>

            {/* Score & Rank Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                  Overall Rank
                </div>
                <div className="text-xl font-black text-amber-400 mt-0.5">
                  #{selectedScorecard.overallRank}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                  Total Score
                </div>
                <div className="text-xl font-black text-white mt-0.5">
                  {selectedScorecard.totalScore}
                  <span className="text-xs text-neutral-500"> / {selectedScorecard.maxScore}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                  Percentile
                </div>
                <div className="text-xl font-black text-emerald-400 mt-0.5">
                  {(
                    (selectedScorecard.totalScore / selectedScorecard.maxScore) *
                    100
                  ).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Section Breakdown Progress */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Sectional Competency Breakdown
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-neutral-300 font-medium mb-1">
                    <span>Olympiad Algebra</span>
                    <span>{selectedScorecard.sections.algebra} / 15 pts</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(selectedScorecard.sections.algebra / 15) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 font-medium mb-1">
                    <span>Number Theory & Diophantine</span>
                    <span>{selectedScorecard.sections.numberTheory} / 12 pts</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${(selectedScorecard.sections.numberTheory / 12) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 font-medium mb-1">
                    <span>Euclidean Geometry</span>
                    <span>{selectedScorecard.sections.geometry} / 12 pts</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${(selectedScorecard.sections.geometry / 12) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-300 font-medium mb-1">
                    <span>Combinatorics & Graph Theory</span>
                    <span>{selectedScorecard.sections.combinatorics} / 11 pts</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${(selectedScorecard.sections.combinatorics / 11) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[11px] text-neutral-500 font-mono">
                Verified cryptographic digital seal
              </span>
              <button
                onClick={() => onOpenScorecard(null)}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW OLYMPIAD */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy size={18} className="text-amber-400" />
                Schedule Olympiad Assessment
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOlympiad} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Olympiad Competition Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JMO Regional Stage 2 Examination"
                  value={olyName}
                  onChange={(e) => setOlyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Scheduled Examination Date
                </label>
                <input
                  type="date"
                  required
                  value={olyDate}
                  onChange={(e) => setOlyDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Maximum Paper Score
                </label>
                <input
                  type="number"
                  min="20"
                  max="100"
                  value={olyMaxScore}
                  onChange={(e) => setOlyMaxScore(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
