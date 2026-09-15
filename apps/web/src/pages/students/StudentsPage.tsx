import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GraduationCap, Search, Plus, ChevronDown, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { api } from '@/api/client'

export default function StudentsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State
  const [fullName, setFullName] = useState('')
  const [selectedClassId, setSelectedClassId] = useState('')
  const [selectedBatchId, setSelectedBatchId] = useState('')
  const [guardianPhone, setGuardianPhone] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  // Fetch Classes for dropdowns
  const { data: classesData } = useQuery({
    queryKey: ['classes-dropdown'],
    queryFn: async () => {
      const res = await api.get('/classes?page_size=100')
      return (res.data as any)?.data || []
    },
  })

  // Fetch Batches for dropdowns
  const { data: batchesData } = useQuery({
    queryKey: ['batches-dropdown', selectedClassId],
    queryFn: async () => {
      const params = new URLSearchParams({ page_size: '100' })
      if (selectedClassId) params.append('class_id', selectedClassId)
      const res = await api.get(`/batches?${params.toString()}`)
      return (res.data as any)?.data || []
    },
  })

  // Fetch Students List
  const { data, isLoading } = useQuery({
    queryKey: ['students', search, classFilter, batchFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({ page: '1', page_size: '25', sort_by: 'full_name', sort_order: 'asc' })
      if (search) params.append('search', search)
      if (classFilter) params.append('class_id', classFilter)
      if (batchFilter) params.append('batch_id', batchFilter)
      if (statusFilter) params.append('status', statusFilter)
      const res = await api.get(`/students?${params.toString()}`)
      return (res.data as any)
    },
  })

  // Add Student Mutation
  const addStudentMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post('/students', payload)
      return res.data
    },
    onSuccess: () => {
      setFormSuccess('Student enrolled successfully!')
      queryClient.invalidateQueries({ queryKey: ['students'] })
      setTimeout(() => {
        resetForm()
        setShowAddModal(false)
      }, 600)
    },
    onError: (err: any) => {
      setFormError(
        err.response?.data?.error?.message ||
        err.response?.data?.detail?.[0]?.msg ||
        'Failed to save student. Please verify the input fields.'
      )
    },
  })

  const resetForm = () => {
    setFullName('')
    setSelectedClassId('')
    setSelectedBatchId('')
    setGuardianPhone('')
    setGuardianName('')
    setFormError(null)
    setFormSuccess(null)
  }

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (!fullName.trim()) {
      setFormError('Student full name is required.')
      return
    }

    const payload: any = {
      full_name: fullName.trim(),
    }

    if (selectedClassId) payload.class_id = selectedClassId
    if (selectedBatchId) payload.batch_id = selectedBatchId
    if (guardianPhone.trim() || guardianName.trim()) {
      payload.guardian = {
        name: guardianName.trim() || 'Parent/Guardian',
        phone: guardianPhone.trim() || 'N/A',
      }
    }

    addStudentMutation.mutate(payload)
  }

  const students = data?.data || []
  const totalCount = data?.pagination?.total_count || 0
  const classesList = classesData || []
  const batchesList = batchesData || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Students</h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalCount > 0 ? `${totalCount} students enrolled` : 'Manage student enrollment and records'}
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
          Add Student
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or public ID..."
              className="w-full bg-gray-950 border border-white/[0.08] text-white placeholder-gray-600 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
            />
          </div>

          {/* Filter Selects */}
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all"
              >
                <option value="">All Classes</option>
                {classesList.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all"
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
                className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Table or Empty State */}
      {isLoading ? (
        <div className="glass-card rounded-xl p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : students.length > 0 ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Public ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {students.map((s: any) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{s.public_id}</td>
                  <td className="px-4 py-3 font-medium text-white">{s.full_name}</td>
                  <td className="px-4 py-3 text-gray-400">{s.current_class?.name || s.class_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{s.current_batch?.name || s.batch_name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      s.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-gray-500 hover:text-white transition-colors mr-3 cursor-pointer">Transfer</button>
                    <button className="text-xs text-gray-500 hover:text-red-400 transition-colors cursor-pointer">Withdraw</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card rounded-xl py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="w-7 h-7 text-gray-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-300 mb-1">No students enrolled yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Get started by adding your first student to the system.
          </p>
          <button
            onClick={() => {
              resetForm()
              setShowAddModal(true)
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add First Student
          </button>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4">Add New Student</h2>

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

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                  placeholder="Enter student full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Class</label>
                  <div className="relative">
                    <select
                      value={selectedClassId}
                      onChange={(e) => setSelectedClassId(e.target.value)}
                      className="appearance-none w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3 pr-8 py-2.5 focus:outline-none focus:border-gray-500 transition-all cursor-pointer"
                    >
                      <option value="">Select class</option>
                      {classesList.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Batch</label>
                  <div className="relative">
                    <select
                      value={selectedBatchId}
                      onChange={(e) => setSelectedBatchId(e.target.value)}
                      className="appearance-none w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3 pr-8 py-2.5 focus:outline-none focus:border-gray-500 transition-all cursor-pointer"
                    >
                      <option value="">Select batch</option>
                      {batchesList.map((b: any) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Guardian Name</label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                  placeholder="Parent or Guardian name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Guardian Phone</label>
                <input
                  type="text"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                  placeholder="+977 XXXXXXXXXX"
                />
              </div>

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
                  disabled={addStudentMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {addStudentMutation.isPending ? 'Saving...' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}