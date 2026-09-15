
export interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = (status || '').toLowerCase()

  const getStyle = () => {
    switch (normalized) {
      case 'present':
      case 'published':
      case 'completed':
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'absent':
      case 'failed':
      case 'withdrawn':
      case 'disabled':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'late':
      case 'draft':
      case 'pending':
      case 'invited':
      case 'draft_result':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'excused':
      case 'reviewed':
      case 'processing':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'needs_review':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700'
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()} ${className}`}>
      {status}
    </span>
  )
}