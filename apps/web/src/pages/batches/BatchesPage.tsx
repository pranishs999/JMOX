import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Layers, Search, Plus, ChevronDown, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { StatusBadge } from '@/components/ui'
import { api } from '@/api/client'

export default function BatchesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State
  const [batchName, setBatchName] = useState('')
  const [selectedClassId, setSelectedClassId] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  // Fetch Classes for modal selector
  const { data: classesData } = useQuery({
    queryKey: ['classes-dropdown'],
    queryFn: async () => {
      const res = await api.get('/classes?page_size=100')
      return (res.data as any)?.data || []
    },
  })

  // Fetch Batches List
  const { data, isLoading } = useQuery({
    queryKey: ['batches', search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: '1',
        page_size: '25',
        sort_by: 'name',
        sort_order: 'asc',
      })
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)

      const response = await api.get(`/batches?${params.toString()}`)
      return (response.data as any)?.data || []
    },
  })

  // Add Batch Mutation
  const addBatchMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post('/batches', payload)
      return res.data
    },
    onSuccess: () => {
      setFormSuccess('Training batch created successfully!')
      queryClient.invalidateQueries({ queryKey: ['batches'] })
      queryClient.invalidateQueries({ queryKey: ['batches-dropdown'] })
      setTimeout(() => {
        resetForm()
        setShowAddModal(false)
      }, 600)
    },
    onError: (err: any) => {
      setFormError(
        err.response?.data?.error?.message ||
        err.response?.data?.detail?.[0]?.msg ||
        'Failed to create batch. Please select a class and name.'
      )
    },
  })

  const resetForm = () => {
    setBatchName('')
    setSelectedClassId('')
    setFormError(null)
    setFormSuccess(null)
  }

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (!batchName.trim()) {
      setFormError('Batch name is required.')
      return
    }
    if (!selectedClassId) {
      setFormError('Please select a class for this batch.')
      return
    }

    addBatchMutation.mutate({
      name: batchName.trim(),
      class_id: selectedClassId,
    })
  }

  const batches = data || []
  const classesList = classesData || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Batches & Groups</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage training batches, assigned teachers, and schedules
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
          Add Batch
        </button>
      </div>

      {/* Filter */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search batch by name..."
              className="w-full bg-gray-950 border border-white/[0.08] text-white placeholder-gray-600 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-gray-950 border border-white/[0.08] text-gray-400 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-gray-600 cursor-pointer transition-all min-w-[140px]"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content Table / Empty */}
      {isLoading ? (
        <div className="glass-card rounded-xl p-6 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : batches.length > 0 ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {batches.map((b: any) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5 font-medium text-white">{b.name}</td>
                  <td className="px-4 py-3.5 text-gray-400">{b.class_name || '—'}</td>
                  <td className="px-4 py-3.5 text-gray-400">{b.student_count || 0} students</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={b.status || 'active'} />
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                      View
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
            <Layers className="w-7 h-7 text-gray-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-300 mb-1">No batches configured yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Create learning batches to group students for sessions and track attendance.
          </p>
          <button
            onClick={() => {
              resetForm()
              setShowAddModal(true)
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create First Batch
          </button>
        </div>
      )}

      {/* Add Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-gray-400" />
              Create Training Batch
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

            <form onSubmit={handleSaveBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Batch Name *</label>
                <input
                  type="text"
                  required
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full bg-gray-950 border border-white/[0.08] text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-gray-500 transition-all"
                  placeholder="e.g. Batch A1 - Advanced Algebra"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Select Class *</label>
                <div className="relative">
                  <select
                    required
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="appearance-none w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3.5 pr-8 py-2.5 focus:outline-none focus:border-gray-500 transition-all cursor-pointer"
                  >
                    <option value="">Select target class</option>
                    {classesList.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
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
                  disabled={addBatchMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {addBatchMutation.isPending ? 'Saving...' : 'Save Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}