import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Award, Search, Plus, ChevronDown, Upload, FileCheck, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { StatusBadge } from '@/components/ui'
import { api } from '@/api/client'

export default function ResultsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [olympiadFilter, setOlympiadFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Form State
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('100')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  // Fetch Students for dropdown
  const { data: studentsData } = useQuery({
    queryKey: ['students-dropdown'],
    queryFn: async () => {
      const res = await api.get('/students?page_size=100')
      return (res.data as any)?.data || []
    },
  })

  // Fetch Results List
  const { data, isLoading } = useQuery({
    queryKey: ['results', search, olympiadFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: '1',
        page_size: '25',
        sort_by: 'published_at',
        sort_order: 'desc',
      })
      if (search) params.append('search', search)
      if (olympiadFilter) params.append('olympiad_id', olympiadFilter)
      if (statusFilter) params.append('status', statusFilter)

      const response = await api.get(`/results?${params.toString()}`)
      return (response.data as any)?.data || []
    },
  })

  // Save Result Mutation
  const saveResultMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post('/results', payload)
      return res.data
    },
    onSuccess: () => {
      setFormSuccess('Result score saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['results'] })
      setTimeout(() => {
        resetForm()
        setShowUploadModal(false)
      }, 600)
    },
    onError: (err: any) => {
      setFormError(
        err.response?.data?.error?.message ||
        err.response?.data?.detail?.[0]?.msg ||
        'Failed to save score. Please verify score inputs.'
      )
    },
  })

  const resetForm = () => {
    setSelectedStudentId('')
    setScore('')
    setMaxScore('100')
    setFormError(null)
    setFormSuccess(null)
  }

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (!score || isNaN(Number(score))) {
      setFormError('Please enter a valid numeric score.')
      return
    }

    saveResultMutation.mutate({
      student_id: selectedStudentId || undefined,
      score: Number(score),
      max_score: Number(maxScore) || 100,
      status: 'published',
    })
  }

  const results = data || []
  const studentsList = studentsData || []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Results & Scoring</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review exam evaluations, OMR sheet scans, and publish scores
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              resetForm()
              setShowUploadModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-white text-sm font-medium rounded-lg hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload OMR Scan
          </button>
          <button
            onClick={() => {
              resetForm()
              setShowUploadModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Score
          </button>
        </div>
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
              placeholder="Search by student name or roll number..."
              className="w-full bg-gray-950 border border-white/[0.08] text-white placeholder-gray-600 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <select
                value={olympiadFilter}
                onChange={(e) => setOlympiadFilter(e.target.value)}
                className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all min-w-[140px]"
              >
                <option value="">All Olympiads</option>
                <option value="jmo-2026-pre">JMO 2026 Preliminary</option>
                <option value="jmo-2026-final">JMO 2026 Final</option>
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
                <option value="draft">Draft</option>
                <option value="reviewed">Reviewed</option>
                <option value="published">Published</option>
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
      ) : results.length > 0 ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Olympiad Paper</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {results.map((r: any) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5 font-medium text-white">{r.student_name}</td>
                  <td className="px-4 py-3.5 text-gray-400">{r.paper_title || 'Paper 1'}</td>
                  <td className="px-4 py-3.5 font-semibold text-white">{r.score} / {r.max_score || 100}</td>
                  <td className="px-4 py-3.5 text-gray-300">{r.percentage}%</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={r.status || 'published'} />
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                      View OMR
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
            <Award className="w-7 h-7 text-gray-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-300 mb-1">No results uploaded yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Upload scanned OMR answer sheets or enter evaluation scores manually.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                resetForm()
                setShowUploadModal(true)
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Upload OMR Sheets
            </button>
          </div>
        </div>
      )}

      {/* Upload/Add Score Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowUploadModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-gray-400" />
              Enter Score / Upload OMR
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

            <form onSubmit={handleSaveResult} className="space-y-4">
              {studentsList.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Select Student</label>
                  <div className="relative">
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="appearance-none w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3.5 pr-8 py-2.5 focus:outline-none focus:border-gray-500 transition-all cursor-pointer"
                    >
                      <option value="">Select student</option>
                      {studentsList.map((s: any) => (
                        <option key={s.id} value={s.id}>{s.full_name} ({s.public_id})</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Score Obtained *</label>
                  <input
                    type="number"
                    required
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                    placeholder="e.g. 85"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Max Possible</label>
                  <input
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-400 border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveResultMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {saveResultMutation.isPending ? 'Saving...' : 'Save Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}