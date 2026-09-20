import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  Trophy,
  ScanLine,
  Library,
  History,
  FileSpreadsheet,
} from 'lucide-react';
import { UserRole } from '../types';

export type ActiveTab =
  | 'dashboard'
  | 'students'
  | 'academics'
  | 'attendance'
  | 'assessments'
  | 'olympiads'
  | 'omr'
  | 'resources'
  | 'audit';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentRole: UserRole;
  pendingSyncCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
  pendingSyncCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'facilitator', 'mentor', 'student', 'technician'],
    },
    {
      id: 'students' as ActiveTab,
      label: 'Directory',
      icon: Users,
      roles: ['admin', 'facilitator', 'mentor'],
    },
    {
      id: 'academics' as ActiveTab,
      label: 'Academics',
      icon: BookOpen,
      roles: ['admin', 'facilitator', 'mentor', 'student'],
    },
    {
      id: 'attendance' as ActiveTab,
      label: 'Attendance',
      icon: CalendarCheck,
      badge: pendingSyncCount > 0 ? `${pendingSyncCount} pending` : undefined,
      roles: ['admin', 'facilitator', 'mentor', 'student', 'technician'],
    },
    {
      id: 'assessments' as ActiveTab,
      label: 'Problem Sets & Worksheets',
      icon: FileSpreadsheet,
      roles: ['admin', 'facilitator', 'mentor', 'student'],
    },
    {
      id: 'olympiads' as ActiveTab,
      label: 'Olympiads & Results',
      icon: Trophy,
      roles: ['admin', 'facilitator', 'mentor', 'student'],
    },
    {
      id: 'omr' as ActiveTab,
      label: 'OMR Scanner',
      icon: ScanLine,
      roles: ['admin', 'facilitator', 'mentor', 'technician'],
    },
    {
      id: 'resources' as ActiveTab,
      label: 'Resources & Books',
      icon: Library,
      roles: ['admin', 'facilitator', 'mentor', 'student'],
    },
    {
      id: 'audit' as ActiveTab,
      label: 'Audit & Notices',
      icon: History,
      roles: ['admin', 'facilitator', 'mentor', 'student', 'technician'],
    },
  ];

  const visibleItems = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <nav className="border-b border-white/10 bg-neutral-900/60 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-1 sm:space-x-2 py-1.5 min-w-max">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={15} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
