import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { School, Search, Plus, ChevronDown, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { api } from '@/api/client'

export default function ClassesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State
  const [classNameInput, setClassNameInput] = useState('')
  const [academicYearId, setAcademicYearId] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  // Fetch Academic Years
  const { data: yearsData } = useQuery({
    queryKey: ['academic-years-dropdown'],
    queryFn: async () => {
      try {
        const res = await api.get('/academic-years?page_size=50')
        return (res.data as any)?.data || []
      } catch {
        return []
      }
    },
  })

  // Fetch Classes List
  const { data, isLoading } = useQuery({
    queryKey: ['classes', search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: '1',
        page_size: '25',
        sort_by: 'name',
        sort_order: 'asc',
      })
      if (search) params.append('search', search)

      const response = await api.get(`/classes?${params.toString()}`)
      return (response.data as any)?.data || []
    },
  })

  // Add Class Mutation
  const addClassMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post('/classes', payload)
      return res.data
    },
    onSuccess: () => {
      setFormSuccess('Class created successfully!')
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      queryClient.invalidateQueries({ queryKey: ['classes-dropdown'] })
      setTimeout(() => {
        resetForm()
        setShowAddModal(false)
      }, 600)
    },
    onError: (err: any) => {
      setFormError(
        err.response?.data?.error?.message ||
        err.response?.data?.detail?.[0]?.msg ||
        'Failed to save class profile. Please verify class name.'
      )
    },
  })

  const resetForm = () => {
    setClassNameInput('')
    setAcademicYearId('')
    setFormError(null)
    setFormSuccess(null)
  }

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (!classNameInput.trim()) {
      setFormError('Class name is required.')
      return
    }

    const payload: any = {
      name: classNameInput.trim(),
    }
    if (academicYearId) {
      payload.academic_year_id = academicYearId
    }

    addClassMutation.mutate(payload)
  }


  const classes = data || []
  const yearsList = yearsData || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Classes & Academic Structure</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize grade levels, sections, and academic year mappings
          </p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowAddModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Class
        </button>
      </div>

      {/* Filter */}
      <div className="glass-card rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search class by name..."
            className="w-full bg-gray-950 border border-white/[0.08] text-white placeholder-gray-600 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
          />
        </div>
      </div>

      {/* Content Table / Empty */}
      {isLoading ? (
        <div className="glass-card rounded-xl p-6 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : classes.length > 0 ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Academic Year</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Batches</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {classes.map((c: any) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5 font-medium text-white">{c.name}</td>
                  <td className="px-4 py-3.5 text-gray-400">{c.academic_year || '2026'}</td>
                  <td className="px-4 py-3.5 text-gray-400">{c.batch_count || 0} batches</td>
                  <td className="px-4 py-3.5 text-gray-400">{c.student_count || 0} students</td>
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
            <School className="w-7 h-7 text-gray-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-300 mb-1">No classes created yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Define grade classes (e.g. Class 9, Class 10) to organize your Olympiad participants.
          </p>
          <button
            onClick={() => {
              resetForm()
              setShowAddModal(true)
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add First Class
          </button>
        </div>
      )}

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <School className="w-5 h-5 text-gray-400" />
              Create Class Profile
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

            <form onSubmit={handleSaveClass} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Class Name *</label>
                <input
                  type="text"
                  required
                  value={classNameInput}
                  onChange={(e) => setClassNameInput(e.target.value)}
                  className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                  placeholder="e.g. Class 10"
                />
              </div>

              {yearsList.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Academic Session</label>
                  <div className="relative">
                    <select
                      value={academicYearId}
                      onChange={(e) => setAcademicYearId(e.target.value)}
                      className="appearance-none w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3.5 pr-8 py-2.5 focus:outline-none focus:border-gray-500 transition-all cursor-pointer"
                    >
                      <option value="">Default Session</option>
                      {yearsList.map((y: any) => (
                        <option key={y.id} value={y.id}>{y.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-400 border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addClassMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {addClassMutation.isPending ? 'Saving...' : 'Save Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}