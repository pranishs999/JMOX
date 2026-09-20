import React from 'react';
import {
  Users,
  Award,
  Grid,
  Trophy,
  CalendarCheck,
  ScanLine,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  Building,
  Calendar,
  FileSpreadsheet,
  Wrench,
  ShieldAlert,
  Server,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import {
  UserRole,
  StudentModel,
  FacilitatorModel,
  BatchModel,
  OlympiadModel,
  ResultModel,
  MaterialModel,
  TechnicianModel,
} from '../types';
import { ActiveTab } from './Navigation';

interface DashboardViewProps {
  currentRole: UserRole;
  students: StudentModel[];
  facilitators: FacilitatorModel[];
  batches: BatchModel[];
  olympiads: OlympiadModel[];
  results: ResultModel[];
  materials: MaterialModel[];
  technicians?: TechnicianModel[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenScorecard: (result: ResultModel) => void;
  onOpenEnrollModal: () => void;
  onOpenMatrixModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  students,
  facilitators,
  batches,
  olympiads,
  results,
  materials,
  technicians = [],
  onNavigate,
  onOpenScorecard,
  onOpenEnrollModal,
  onOpenMatrixModal,
}) => {
  // 1. ADMIN DASHBOARD
  if (currentRole === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Directorate Command Overview
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                JMO-HQ • 2025-2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              National Junior Mathematics Olympiad Institute — System metrics & academic controls
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onOpenMatrixModal && (
              <button
                onClick={onOpenMatrixModal}
                id="btn-admin-view-matrix"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors shadow-sm"
              >
                <FileSpreadsheet size={14} />
                <span>Phase 1 Spec Matrix</span>
              </button>
            )}
            <button
              onClick={onOpenEnrollModal}
              id="btn-admin-enroll"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Users size={14} />
              <span>Enroll Student</span>
            </button>
            <button
              onClick={() => onNavigate('olympiads')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-semibold transition-colors"
            >
              <Trophy size={14} className="text-amber-400" />
              <span>Manage Olympiads</span>
            </button>
          </div>
        </div>

        {/* Institute Banner Card */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Building size={22} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">National Junior Mathematics Olympiad Institute</div>
              <div className="text-xs text-neutral-400 flex items-center gap-3 mt-0.5">
                <span>Code: <strong className="text-neutral-200">JMO-HQ</strong></span>
                <span>•</span>
                <span>Active Year: <strong className="text-amber-300">2025-2026</strong></span>
                <span>•</span>
                <span>Timezone: <strong className="text-neutral-200">UTC+05:30 (IST)</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('academics')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Academic Years</span>
            </button>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Users size={13} />
              <span>Staff & Students</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Users size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{students.length}</div>
              <div className="text-xs text-neutral-400 font-medium">Active Students</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Award size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{facilitators.length}</div>
              <div className="text-xs text-neutral-400 font-medium">Facilitators</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Grid size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{batches.length}</div>
              <div className="text-xs text-neutral-400 font-medium">Active Batches</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Trophy size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{olympiads.length}</div>
              <div className="text-xs text-neutral-400 font-medium">Olympiad Events</div>
            </div>
          </div>
        </div>

        {/* Middle split: Olympiad assessments & Batches */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Trophy size={16} className="text-amber-400" />
                  Upcoming & Published Olympiad Competitions
                </h3>
                <p className="text-xs text-neutral-400">
                  Lifecycle state machine: Draft → Scheduled → In Progress → Published
                </p>
              </div>
              <button
                onClick={() => onNavigate('olympiads')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                View all <ArrowRight size={13} />
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {olympiads.map((oly) => (
                <div
                  key={oly.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] rounded-xl px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 font-bold text-xs">
                      ∑
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {oly.name}
                      </div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                        <span>Event: {oly.eventDate}</span>
                        <span>•</span>
                        <span>{oly.participantsCount} enrolled</span>
                        <span>•</span>
                        <span>Max Score: {oly.maxScore}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      oly.status === 'published'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : oly.status === 'scheduled'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                    }`}
                  >
                    {oly.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Grid size={16} className="text-blue-400" />
                Active Batches
              </h3>
              <button
                onClick={() => onNavigate('academics')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Manage
              </button>
            </div>

            <div className="space-y-2.5">
              {batches.map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-white/5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{b.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {b.className}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Clock size={12} />
                    {b.scheduleDays}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() => onNavigate('omr')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-colors"
              >
                <ScanLine size={15} />
                Launch OMR Bubble Sheet Scanner
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FACILITATOR & MENTOR DASHBOARD
  if (currentRole === 'facilitator' || currentRole === 'mentor') {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentRole === 'mentor' ? 'Olympiad Mentor Portal' : 'Facilitator Academic Portal'}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              Academic Year 2025-2026
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Manage assigned training batches, offline attendance, and mobile OMR evaluation
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => onNavigate('attendance')}
            className="group cursor-pointer p-5 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CalendarCheck size={22} />
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                Open Session <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Record Attendance</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fast bulk student logging with offline SQLite caching and conflict resolution.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('omr')}
            className="group cursor-pointer p-5 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-amber-500/40 hover:bg-amber-950/20 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ScanLine size={22} />
              </div>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                Camera View <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">OMR Camera Scanner</h3>
              <p className="text-xs text-neutral-400 mt-1">
                On-device optical mark recognition scanner with fiducial alignment and review queue.
              </p>
            </div>
          </div>
        </div>

        {/* Assigned Batches List */}
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Assigned Competition Batches</h3>
              <p className="text-xs text-neutral-400">
                Directly assigned mentor batches and training schedules
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {batches.length} Batches Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {batches.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-white">{b.name}</div>
                  <div className="text-[11px] text-neutral-400">{b.className}</div>
                  <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                    <Clock size={12} className="text-amber-400" />
                    {b.scheduleDays}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('attendance')}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-neutral-200 hover:text-black text-xs font-semibold transition-colors"
                >
                  Take Attendance
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. TECHNICIAN DASHBOARD (Diagnostics & Hardware Console Only)
  if (currentRole === 'technician') {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hardware & Systems Diagnostics Console
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              Technician Zone
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Hardware node monitoring, camera scanner calibration, and sync queue diagnostics
          </p>
        </div>

        {/* Strict Security Policy Notice */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
          <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={20} />
          <div>
            <div className="text-xs font-bold text-amber-300">
              Technician Role Security Policy (Strict Enactment)
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              Technician accounts are restricted to hardware calibration, optical scanner testing, and diagnostic logging.
              Academic controls, syllabus changes, batch assignment, and grade modification are strictly denied and audited in the immutable security log.
            </p>
          </div>
        </div>

        {/* Diagnostics Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Cpu size={20} />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <CheckCircle2 size={13} /> Operational
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">OMR Scanner Node 1</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                Central Computer Lab • 99.4% Optical Confidence
              </div>
            </div>
            <button
              onClick={() => onNavigate('omr')}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Run Optical Calibration Test
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Server size={20} />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <CheckCircle2 size={13} /> Synced
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Offline Buffer & Sync Engine</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                SQLite buffer healthy • Server Precedence Active
              </div>
            </div>
            <button
              onClick={() => onNavigate('attendance')}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Inspect Sync Queue
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Wrench size={20} />
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Audited
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Security & Hardware Audit</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                6 Verified Audit Trail Records • Zero Violations
              </div>
            </div>
            <button
              onClick={() => onNavigate('audit')}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              View Audit Trail
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. STUDENT DASHBOARD
  const topResult = results[0] || null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Student Olympiad Portal
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
          Access your Olympiad rankings, certified scorecards, and competition literature
        </p>
      </div>

      {/* Featured Trophy Card */}
      {topResult && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-neutral-900 to-neutral-950 border border-indigo-500/30 p-6 sm:p-7 space-y-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
                <Trophy size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {topResult.award}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {topResult.olympiadName}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  Overall Rank #{topResult.overallRank} (Top 1%)
                </h3>
                <p className="text-xs text-indigo-200/80">
                  Total Score: <strong className="text-white">{topResult.totalScore}</strong> / {topResult.maxScore} pts (96.0% Percentile)
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenScorecard(topResult)}
              id="btn-view-scorecard"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-sm self-start sm:self-center"
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>View Full Scorecard</span>
            </button>
          </div>

          {/* Sectional Breakdown Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-neutral-400 font-medium">Algebra</div>
              <div className="text-sm font-bold text-white">
                {topResult.sections.algebra} <span className="text-neutral-500 text-xs">/ 15</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-neutral-400 font-medium">Number Theory</div>
              <div className="text-sm font-bold text-white">
                {topResult.sections.numberTheory} <span className="text-neutral-500 text-xs">/ 12</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-neutral-400 font-medium">Geometry</div>
              <div className="text-sm font-bold text-white">
                {topResult.sections.geometry} <span className="text-neutral-500 text-xs">/ 12</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] text-neutral-400 font-medium">Combinatorics</div>
              <div className="text-sm font-bold text-white">
                {topResult.sections.combinatorics} <span className="text-neutral-500 text-xs">/ 11</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Materials and Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-red-400" />
              Latest Problem Sets & Solutions
            </h3>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              Browse all
            </button>
          </div>

          <div className="space-y-2.5">
            {materials.slice(0, 3).map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between gap-3 hover:border-white/20 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white line-clamp-1">{m.title}</div>
                  <div className="text-[11px] text-neutral-400">
                    {m.category} • {m.fileSize}
                  </div>
                </div>
                <span className="text-[11px] text-amber-400 font-semibold px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  PDF
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400" />
              Recommended Competition Literature
            </h3>
            <button
              onClick={() => onNavigate('resources')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              View library
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-12 rounded bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-400 shrink-0">
                PSS
              </div>
              <div>
                <div className="text-xs font-bold text-white">Problem-Solving Strategies</div>
                <div className="text-[11px] text-neutral-400">Arthur Engel • Springer</div>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5">National Olympiad Level</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-12 rounded bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-400 shrink-0">
                CTM
              </div>
              <div>
                <div className="text-xs font-bold text-white">Challenge and Thrill of Pre-College Math</div>
                <div className="text-[11px] text-neutral-400">V. Krishnamurthy • Foundation</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Stage 1 & 2 Focus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
