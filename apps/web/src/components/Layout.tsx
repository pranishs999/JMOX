import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  Award,
  Trophy,
  LogOut,
  BookOpen,
  Bell,
  ChevronRight,
  Layers,
  School,
} from 'lucide-react'
import { api, endpoints } from '@/api/client'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Students', path: '/students', icon: GraduationCap },
    { label: 'Teachers', path: '/teachers', icon: Users },
    { label: 'Classes', path: '/classes', icon: School },
    { label: 'Batches', path: '/batches', icon: Layers },
    { label: 'Attendance', path: '/attendance', icon: ClipboardCheck },
    { label: 'Results & Scoring', path: '/results', icon: Award },
    { label: 'Rankings', path: '/rankings', icon: Trophy },
  ]

  const handleLogout = async () => {
    try {
      await api.post(endpoints.auth.logout)
    } catch {
      // Ignore
    } finally {
      document.cookie = 'session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = 'csrf_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-gray-100 font-sans selection:bg-white/20">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111111] border-r border-white/[0.06] flex flex-col shrink-0 relative z-20">
        {/* Brand */}
        <div className="h-14 px-5 flex items-center gap-3 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-950 shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm leading-none">JMO Portal</h1>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide">Management System</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="px-2 pb-3 text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em]">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-gray-950 shadow-sm'
                    : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-gray-600 group-hover:text-gray-400'}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-gray-500" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white font-semibold text-[11px] flex items-center justify-center shrink-0 border border-gray-700">
                AD
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-300 truncate">Administrator</p>
                <p className="text-[11px] text-gray-600 truncate">admin@jmox.org</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header */}
        <header className="h-14 bg-[#111111]/90 backdrop-blur-xl border-b border-white/[0.06] px-6 flex items-center justify-between sticky top-0 z-30">
          <h2 className="text-sm font-medium text-gray-400">
            Junior Mathematics Olympiad
          </h2>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white"></span>
            </button>
            <div className="h-5 w-px bg-white/[0.06]"></div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-800 text-gray-400 border border-gray-700">
              2026 Session
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
