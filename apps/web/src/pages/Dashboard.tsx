import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  Trophy,
  ClipboardCheck,
  Award,
  Calendar,
  ArrowUpRight,
  Activity,
  TrendingUp,
  BookOpen,
  Loader2,
} from 'lucide-react'
import { api, endpoints } from '@/api/client'

interface DashboardStats {
  totalStudents: number | null
  activeTeachers: number | null
  olympiadPapers: number | null
  publishedResults: number | null
  loaded: boolean
}

interface ActivityItem {
  action: string
  entity_type: string
  time: string
  type: string
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return 'Just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString()
}

function formatAction(log: any): string {
  const action = log.action || ''
  const entity = log.entity_type || ''
  const name = log.after_value?.full_name || log.after_value?.name || log.after_value?.title || ''
  const verb =
    action === 'create' ? 'Created' :
    action === 'update' ? 'Updated' :
    action === 'delete' ? 'Deleted' :
    action === 'publish' ? 'Published' :
    action === 'transfer' ? 'Transferred' :
    action === 'withdraw' ? 'Withdrew' :
    action === 'activate' ? 'Activated' :
    action === 'deactivate' ? 'Deactivated' :
    action.charAt(0).toUpperCase() + action.slice(1)
  return name ? `${verb} ${entity}: ${name}` : `${verb} ${entity}`
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: null,
    activeTeachers: null,
    olympiadPapers: null,
    publishedResults: null,
    loaded: false,
  })
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [activitiesLoading, setActivitiesLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const hasSession = document.cookie.includes('csrf_token=')
    if (!hasSession && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }

    // Fetch all stats in parallel
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes, papersRes, resultsRes] = await Promise.allSettled([
          api.get<any>(endpoints.students.list + '?page_size=1'),
          api.get<any>(endpoints.teachers.list + '?page_size=1'),
          api.get<any>(endpoints.papers.list + '?page_size=1'),
          api.get<any>(endpoints.results.list + '?page_size=1&status=published'),
        ])
        setStats({
          totalStudents:
            studentsRes.status === 'fulfilled'
              ? studentsRes.value.data?.pagination?.total_count ?? 0
              : 0,
          activeTeachers:
            teachersRes.status === 'fulfilled'
              ? teachersRes.value.data?.pagination?.total_count ?? 0
              : 0,
          olympiadPapers:
            papersRes.status === 'fulfilled'
              ? papersRes.value.data?.pagination?.total_count ?? 0
              : 0,
          publishedResults:
            resultsRes.status === 'fulfilled'
              ? resultsRes.value.data?.pagination?.total_count ?? 0
              : 0,
          loaded: true,
        })
      } catch {
        setStats(prev => ({ ...prev, loaded: true }))
      }
    }

    // Fetch recent audit log activity
    const fetchActivity = async () => {
      try {
        const res = await api.get<any>('/audit-logs?page_size=10')
        const logs = res.data?.data || []
        const items: ActivityItem[] = logs.map((log: any) => ({
          action: formatAction(log),
          entity_type: log.entity_type || '',
          time: log.created_at ? timeAgo(log.created_at) : '',
          type: log.action || 'system',
        }))
        setActivities(items)
      } catch {
        // Audit logs endpoint may not have data yet
      } finally {
        setActivitiesLoading(false)
      }
    }

    fetchStats()
    fetchActivity()
  }, [])

  const displayStat = (val: number | null): string | number => {
    if (val === null) return '—'
    return val
  }

  const statCards = [
    {
      label: 'Total Students',
      value: displayStat(stats.totalStudents),
      icon: GraduationCap,
      href: '/students',
      accent: 'bg-white/[0.06]',
    },
    {
      label: 'Active Teachers',
      value: displayStat(stats.activeTeachers),
      icon: Users,
      href: '/teachers',
      accent: 'bg-white/[0.06]',
    },
    {
      label: 'Olympiad Papers',
      value: displayStat(stats.olympiadPapers),
      icon: BookOpen,
      href: '/results',
      accent: 'bg-white/[0.06]',
    },
    {
      label: 'Published Results',
      value: displayStat(stats.publishedResults),
      icon: Award,
      href: '/rankings',
      accent: 'bg-white/[0.06]',
    },
  ]

  const quickActions = [
    { label: 'Enroll Student', href: '/students', icon: GraduationCap },
    { label: 'Mark Attendance', href: '/attendance', icon: ClipboardCheck },
    { label: 'Upload OMR Scan', href: '/results', icon: TrendingUp },
    { label: 'View Rankings', href: '/rankings', icon: Trophy },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of the Olympiad management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              to={card.href}
              className="glass-card glass-card-hover rounded-xl p-5 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg ${card.accent} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
              </div>
              {!stats.loaded ? (
                <div className="h-8 w-12 bg-white/[0.04] rounded animate-pulse" />
              ) : (
                <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
              )}
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
                {card.label}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-medium">
                    {action.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-400 ml-auto transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Recent Activity
          </h2>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="divide-y divide-white/[0.04]">
              {activitiesLoading ? (
                <div className="px-4 py-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading activity...
                </div>
              ) : activities.length > 0 ? (
                activities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                    <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                      <Activity className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300">{item.action}</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">{item.time}</p>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600 bg-white/[0.04] px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-xs text-gray-600">
                    No activity yet — actions like enrolling students and creating classes will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Current Session Info */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-300">Current Academic Session</p>
            <p className="text-xs text-gray-600 mt-0.5">
              2026 — Configure academic years, classes, and batches to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}