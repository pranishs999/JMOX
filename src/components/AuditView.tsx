import React, { useState } from 'react';
import {
  Bell,
  History,
  ShieldAlert,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
} from 'lucide-react';
import { NotificationModel, AuditLogModel, UserRole } from '../types';

interface AuditViewProps {
  notifications: NotificationModel[];
  auditLogs: AuditLogModel[];
  currentRole: UserRole;
  onMarkAllNotificationsRead: () => void;
}

export const AuditView: React.FC<AuditViewProps> = ({
  notifications,
  auditLogs,
  currentRole,
  onMarkAllNotificationsRead,
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'audit'>('notifications');
  const [auditFilter, setAuditFilter] = useState<'all' | 'conflicts'>('all');

  const visibleNotifications = notifications.filter(
    (n) => n.targetRole === 'all' || n.targetRole === currentRole
  );

  const filteredLogs = auditLogs.filter((log) => {
    if (auditFilter === 'conflicts') return log.isConflict;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Institutional Audit Trail & Notices
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Cryptographic lineage logs, conflict alerts, and system-wide role broadcasts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-neutral-900 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Notifications ({visibleNotifications.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'audit'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              System Audit Logs ({auditLogs.length})
            </button>
          </div>
        </div>
      </div>

      {/* 1. Notifications Center */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Bell size={14} className="text-amber-400" />
              Role Broadcasts & Alerts
            </h3>
            <button
              onClick={onMarkAllNotificationsRead}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              <CheckCheck size={14} />
              <span>Mark all read</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {visibleNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all ${
                  n.read
                    ? 'bg-neutral-900/50 border-white/5 opacity-80'
                    : 'bg-neutral-900/90 border-amber-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Bell size={15} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{n.title}</span>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {n.createdAt}
                    </span>
                    <div className="mt-1">
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                        {n.targetRole}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. System Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <History size={14} className="text-blue-400" />
              Append-Only Verification Registry
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuditFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  auditFilter === 'all'
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white bg-white/5'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setAuditFilter('conflicts')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  auditFilter === 'conflicts'
                    ? 'bg-red-500 text-white'
                    : 'text-neutral-400 hover:text-white bg-white/5'
                }`}
              >
                Conflicts Only
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.02] text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Action Code</th>
                    <th className="px-4 py-3">Target Entity</th>
                    <th className="px-4 py-3">Status / Integrity</th>
                    <th className="px-4 py-3">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3.5 font-mono text-[11px] text-neutral-400">
                        {log.createdAt}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-amber-300 text-xs">
                        {log.action}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-neutral-200">
                        {log.entityType}
                      </td>
                      <td className="px-4 py-3.5">
                        {log.isConflict ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400">
                            <AlertTriangle size={11} /> Reconciled Conflict
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <CheckCircle2 size={11} /> Verified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-neutral-300 text-xs">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
