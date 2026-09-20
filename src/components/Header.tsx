import React from 'react';
import {
  Shield,
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  Wifi,
  WifiOff,
  Bell,
  RefreshCw,
  Wrench,
  BookOpen,
  FileSpreadsheet,
} from 'lucide-react';
import { UserRole, UserModel } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentUser: UserModel;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  pendingSyncCount: number;
  onSyncNow: () => void;
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenMatrixModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  currentUser,
  isOfflineMode,
  onToggleOffline,
  pendingSyncCount,
  onSyncNow,
  unreadNotificationCount,
  onOpenNotifications,
  onOpenMatrixModal,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/90 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-xl tracking-tight shadow-sm">
          ∑
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-wide">JMOX</h1>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
              Olympiad Institute
            </span>
            <button
              onClick={onOpenMatrixModal}
              id="btn-header-spec-matrix"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-colors"
              title="View Phase 1 Implementation Matrix"
            >
              <FileSpreadsheet size={12} />
              <span>Phase 1 Spec Matrix</span>
            </button>
          </div>
          <p className="text-xs text-neutral-400 hidden sm:block">
            National Junior Mathematics Olympiad Institute Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Spec Matrix Button on Mobile */}
        <button
          onClick={onOpenMatrixModal}
          id="btn-header-spec-matrix-mobile"
          className="sm:hidden p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300"
          title="Phase 1 Implementation Matrix"
        >
          <FileSpreadsheet size={16} />
        </button>

        {/* Offline / Online state toggle */}
        <button
          onClick={onToggleOffline}
          id="btn-toggle-offline"
          title="Click to toggle offline mode simulation"
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
            isOfflineMode
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
          }`}
        >
          {isOfflineMode ? <WifiOff size={14} /> : <Wifi size={14} />}
          <span className="hidden md:inline">
            {isOfflineMode ? 'Offline Mode' : 'Connected'}
          </span>
          {pendingSyncCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
              {pendingSyncCount}
            </span>
          )}
        </button>

        {/* Sync button if pending items */}
        {pendingSyncCount > 0 && (
          <button
            onClick={onSyncNow}
            id="btn-sync-now"
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            <RefreshCw size={13} className="animate-spin" />
            <span className="hidden sm:inline">Sync ({pendingSyncCount})</span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          id="btn-notifications"
          className="relative p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          title="Notifications"
        >
          <Bell size={18} />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-neutral-950" />
          )}
        </button>

        {/* Role Selector Pill */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-white/10">
          <button
            onClick={() => onRoleChange('admin')}
            id="role-switch-admin"
            title="Administrator Role (Full academic & management authority)"
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
              currentRole === 'admin'
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Shield size={13} />
            <span className="hidden sm:inline">Admin</span>
          </button>

          <button
            onClick={() => onRoleChange('facilitator')}
            id="role-switch-facilitator"
            title="Facilitator Role (Curriculum & attendance management)"
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
              currentRole === 'facilitator'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Users size={13} />
            <span className="hidden sm:inline">Facilitator</span>
          </button>

          <button
            onClick={() => onRoleChange('mentor')}
            id="role-switch-mentor"
            title="Mentor Role (Olympiad problem coaching)"
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
              currentRole === 'mentor'
                ? 'bg-cyan-400 text-black shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Mentor</span>
          </button>

          <button
            onClick={() => onRoleChange('technician')}
            id="role-switch-technician"
            title="Technician Role (Hardware/Scanner diagnostics only - NO academic write access)"
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
              currentRole === 'technician'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Wrench size={13} />
            <span className="hidden sm:inline">Technician</span>
          </button>

          <button
            onClick={() => onRoleChange('student')}
            id="role-switch-student"
            title="Student Role (Personal scorecards, attendance & resources)"
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
              currentRole === 'student'
                ? 'bg-indigo-400 text-black shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <GraduationCap size={13} />
            <span className="hidden sm:inline">Student</span>
          </button>
        </div>

        {/* User Identity Chip */}
        <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold text-amber-300">
            {currentUser.publicId.slice(-3)}
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-neutral-400 uppercase font-mono">
              {currentUser.publicId}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
