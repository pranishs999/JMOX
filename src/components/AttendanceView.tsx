import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Save,
  RefreshCw,
  WifiOff,
  Wifi,
  Users,
  AlertCircle,
} from 'lucide-react';
import {
  StudentModel,
  BatchModel,
  AttendanceRecord,
  AttendanceStatus,
} from '../types';

interface AttendanceViewProps {
  students: StudentModel[];
  batches: BatchModel[];
  attendanceRecords: AttendanceRecord[];
  isOfflineMode: boolean;
  onSaveAttendance: (records: AttendanceRecord[]) => void;
  onSyncNow: () => void;
  pendingSyncCount: number;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  batches,
  attendanceRecords,
  isOfflineMode,
  onSaveAttendance,
  onSyncNow,
  pendingSyncCount,
}) => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>(
    batches[0]?.id || 'bat-1'
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Filter students belonging to the selected batch
  const selectedBatch = batches.find((b) => b.id === selectedBatchId);
  const batchStudents = students.filter(
    (s) => s.batchName === selectedBatch?.name
  );

  // Local working state of attendance status for each student in current session
  const [currentStatuses, setCurrentStatuses] = useState<
    Record<string, AttendanceStatus>
  >(() => {
    const initial: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      // Find existing record for this date & student, or default to present
      const existing = attendanceRecords.find(
        (r) => r.studentId === s.id && r.sessionDate === selectedDate
      );
      initial[s.id] = existing ? existing.status : 'present';
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setCurrentStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    setCurrentStatuses((prev) => {
      const updated = { ...prev };
      batchStudents.forEach((s) => {
        updated[s.id] = status;
      });
      return updated;
    });
  };

  const handleSaveRoster = () => {
    const updatedRecords: AttendanceRecord[] = batchStudents.map((s) => {
      return {
        id: `att-${s.id}-${selectedDate}`,
        studentId: s.id,
        studentName: s.fullName,
        studentPublicId: s.publicId,
        batchId: selectedBatchId,
        sessionDate: selectedDate,
        status: currentStatuses[s.id] || 'present',
        isSynced: !isOfflineMode,
        notes: sessionNotes || undefined,
      };
    });

    onSaveAttendance(updatedRecords);

    setSaveBanner(
      isOfflineMode
        ? `Session saved to local device cache (${batchStudents.length} records pending sync to PostgreSQL)`
        : `Attendance session successfully logged and synchronized with cloud database`
    );

    setTimeout(() => {
      setSaveBanner(null);
    }, 4000);
  };

  // Metrics
  const totalInBatch = batchStudents.length;
  const presentCount = batchStudents.filter(
    (s) => currentStatuses[s.id] === 'present'
  ).length;
  const absentCount = batchStudents.filter(
    (s) => currentStatuses[s.id] === 'absent'
  ).length;
  const lateCount = batchStudents.filter(
    (s) => currentStatuses[s.id] === 'late'
  ).length;
  const excusedCount = batchStudents.filter(
    (s) => currentStatuses[s.id] === 'excused'
  ).length;

  const attendancePercent =
    totalInBatch > 0
      ? Math.round(((presentCount + lateCount) / totalInBatch) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Attendance Logging & Offline Sync
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Field attendance with local SQLite buffering and deterministic server-timestamp reconciliation
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingSyncCount > 0 && (
            <button
              onClick={onSyncNow}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <RefreshCw size={14} />
              <span>Sync {pendingSyncCount} Pending</span>
            </button>
          )}

          <button
            onClick={handleSaveRoster}
            id="btn-save-attendance"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-sm"
          >
            <Save size={15} />
            <span>Save Session Roster</span>
          </button>
        </div>
      </div>

      {/* Save Notification Banner */}
      {saveBanner && (
        <div
          className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
            isOfflineMode
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
              : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {isOfflineMode ? <WifiOff size={16} /> : <CheckCircle2 size={16} />}
            <span>{saveBanner}</span>
          </div>
          {isOfflineMode && pendingSyncCount > 0 && (
            <button
              onClick={onSyncNow}
              className="px-2.5 py-1 rounded bg-amber-500 text-black font-bold text-[11px]"
            >
              Sync Now
            </button>
          )}
        </div>
      )}

      {/* Filter and Session Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-900/70 border border-white/10">
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1">
            Training Batch
          </label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.className})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1">
            Session Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1">
            Offline Mode Status
          </label>
          <div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-neutral-950 border border-white/10 text-xs">
            {isOfflineMode ? (
              <>
                <WifiOff size={14} className="text-amber-400" />
                <span className="text-amber-300 font-semibold">
                  Offline Buffer Active
                </span>
              </>
            ) : (
              <>
                <Wifi size={14} className="text-emerald-400" />
                <span className="text-emerald-300 font-semibold">
                  Online Direct Sync
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Metric Counters & Bulk Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/10 text-center">
          <div className="text-xs text-neutral-400">Turnout Rate</div>
          <div className="text-xl font-black text-white mt-0.5">
            {attendancePercent}%
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-center">
          <div className="text-xs text-emerald-400 font-medium">Present</div>
          <div className="text-xl font-black text-emerald-300 mt-0.5">
            {presentCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/20 text-center">
          <div className="text-xs text-red-400 font-medium">Absent</div>
          <div className="text-xl font-black text-red-300 mt-0.5">
            {absentCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-center">
          <div className="text-xs text-amber-400 font-medium">Late</div>
          <div className="text-xl font-black text-amber-300 mt-0.5">
            {lateCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-center">
          <div className="text-xs text-purple-400 font-medium">Excused</div>
          <div className="text-xl font-black text-purple-300 mt-0.5">
            {excusedCount}
          </div>
        </div>
      </div>

      {/* Bulk Roster Operations */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-neutral-900/40 border border-white/5">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Users size={14} />
          <span>Roster for {selectedBatch?.name}: <strong>{totalInBatch} Candidates</strong></span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleMarkAll('present')}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold"
          >
            Mark All Present
          </button>
          <button
            onClick={() => handleMarkAll('absent')}
            className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-bold"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Roster Cards List */}
      <div className="space-y-2">
        {batchStudents.length === 0 ? (
          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5 text-center text-neutral-500 text-xs">
            No candidates enrolled in {selectedBatch?.name}. Switch batch or enroll candidates.
          </div>
        ) : (
          batchStudents.map((s) => {
            const currentStatus = currentStatuses[s.id] || 'present';

            return (
              <div
                key={s.id}
                className="p-4 rounded-xl bg-neutral-900/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                    {s.publicId.slice(-3)}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {s.fullName}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {s.publicId} • {s.className}
                    </div>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-white/5 self-end sm:self-center">
                  <button
                    onClick={() => handleStatusChange(s.id, 'present')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      currentStatus === 'present'
                        ? 'bg-emerald-500 text-black shadow'
                        : 'text-neutral-400 hover:text-emerald-400'
                    }`}
                  >
                    <CheckCircle2 size={13} />
                    <span>Present</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(s.id, 'late')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      currentStatus === 'late'
                        ? 'bg-amber-500 text-black shadow'
                        : 'text-neutral-400 hover:text-amber-400'
                    }`}
                  >
                    <Clock size={13} />
                    <span>Late</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(s.id, 'absent')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      currentStatus === 'absent'
                        ? 'bg-red-500 text-white shadow'
                        : 'text-neutral-400 hover:text-red-400'
                    }`}
                  >
                    <XCircle size={13} />
                    <span>Absent</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(s.id, 'excused')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      currentStatus === 'excused'
                        ? 'bg-purple-500 text-white shadow'
                        : 'text-neutral-400 hover:text-purple-400'
                    }`}
                  >
                    <HelpCircle size={13} />
                    <span>Excused</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
