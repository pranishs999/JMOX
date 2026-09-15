import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ClipboardCheck, Search, Plus, ChevronDown, CheckCircle2, XCircle, Clock, AlertCircle, ShieldAlert } from 'lucide-react'
import { StatusBadge } from '@/components/ui'
import { api } from '@/api/client'

export default function AttendancePage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showMarkModal, setShowMarkModal] = useState(false)

  // Form State
  const [selectedBatchId, setSelectedBatchId] = useState('')
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedStatus, setSelectedStatus] = useState<'present' | 'absent' | 'late' | 'excused'>('present')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  // Fetch Batches for dropdown
  const { data: batchesData } = useQuery({
    queryKey: ['batches-dropdown'],
    queryFn: async () => {
      const res = await api.get('/batches?page_size=100')
      return (res.data as any)?.data || []
    },
  })

  // Fetch Attendance Records
  const { data, isLoading } = useQuery({
    queryKey: ['attendance', search, batchFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: '1',
        page_size: '25',
        sort_by: 'recorded_at',
        sort_order: 'desc',
      })
      if (search) params.append('search', search)
      if (batchFilter) params.append('batch_id', batchFilter)
      if (statusFilter) params.append('status', statusFilter)

      const response = await api.get(`/attendance?${params.toString()}`)
      return (response.data as any)?.data || []
    },
  })

  // Save Attendance Mutation
  const saveAttendanceMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post('/attendance/batch', payload)
      return res.data
    },
    onSuccess: () => {
      setFormSuccess('Attendance saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      setTimeout(() => {
        resetForm()
        setShowMarkModal(false)
      }, 600)
    },
    onError: (err: any) => {
      setFormError(
        err.response?.data?.error?.message ||
        err.response?.data?.detail?.[0]?.msg ||
        'Failed to save attendance. Please select a batch.'
      )
    },
  })

  const resetForm = () => {
    setSelectedBatchId('')
    setSessionDate(new Date().toISOString().split('T')[0])
    setSelectedStatus('present')
    setFormError(null)
    setFormSuccess(null)
  }

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (!selectedBatchId) {
      setFormError('Please select a batch to mark attendance.')
      return
    }

    saveAttendanceMutation.mutate({
      batch_id: selectedBatchId,
      session_date: sessionDate,
      default_status: selectedStatus,
    })
  }

  const attendanceRecords = data || []
  const batchesList = batchesData || []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Attendance Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and verify daily session attendance across student batches
          </p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowMarkModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Mark Attendance
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name or session..."
              className="w-full bg-gray-950 border border-white/[0.08] text-white placeholder-gray-600 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all min-w-[130px]"
              >
                <option value="">All Batches</option>
                {batchesList.map((b: any) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all min-w-[130px]"
              >
                <option value="">All Statuses</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="excused">Excused</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table / State */}
      {isLoading ? (
        <div className="glass-card rounded-xl p-6 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : attendanceRecords.length > 0 ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Session</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recorded By</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recorded At</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {attendanceRecords.map((r: any) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5 font-medium text-white">{r.student_name || '—'}</td>
                  <td className="px-4 py-3.5 text-gray-400">{r.session_title || '—'}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={r.status || 'present'} />
                  </td>
                  <td className="px-4 py-3.5 text-gray-400">{r.recorded_by_name || 'System'}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{r.recorded_at || '—'}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-card rounded-xl py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
            <ClipboardCheck className="w-7 h-7 text-gray-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-300 mb-1">No attendance records logged</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Log session attendance for student batches to maintain accurate participation metrics.
          </p>
          <button
            onClick={() => {
              resetForm()
              setShowMarkModal(true)
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Mark Attendance Now
          </button>
        </div>
      )}

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowMarkModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-gray-400" />
              Mark Session Attendance
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-950/30 border border-red-500/20 rounded-lg flex items-start gap-2 text-red-400 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mb-4 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveAttendance} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Select Batch *</label>
                <div className="relative">
                  <select
                    required
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                    className="appearance-none w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3.5 pr-8 py-2.5 focus:outline-none focus:border-gray-500 transition-all cursor-pointer"
                  >
                    <option value="">Select target batch</option>
                    {batchesList.map((b: any) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Session Date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Default Status</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('present')}
                    className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      selectedStatus === 'present' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 opacity-60'
                    } border`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Present
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('absent')}
                    className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      selectedStatus === 'absent' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-red-500/10 border-red-500/20 text-red-400 opacity-60'
                    } border`}
                  >
                    <XCircle className="w-4 h-4" /> Absent
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('late')}
                    className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      selectedStatus === 'late' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-400 opacity-60'
                    } border`}
                  >
                    <Clock className="w-4 h-4" /> Late
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('excused')}
                    className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      selectedStatus === 'excused' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 opacity-60'
                    } border`}
                  >
                    <AlertCircle className="w-4 h-4" /> Excused
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-400 border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveAttendanceMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {saveAttendanceMutation.isPending ? 'Saving...' : 'Save Records'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}