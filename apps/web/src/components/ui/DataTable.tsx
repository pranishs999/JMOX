
export interface DataTableProps<T> {
  data: T[]
  columns: readonly string[]
  onRowAction?: (row: T) => void
  title?: string
  loading?: boolean
  emptyMessage?: string
  CTA?: { label: string; onClick: () => void }
}

export function DataTable({ data, columns, onRowAction, title, loading, emptyMessage, CTA }: DataTableProps<any>) {
  if (loading) {
    return (
      <div className="glass-card rounded-xl p-6 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="glass-card rounded-xl py-12 text-center">
        <p className="text-sm text-gray-500">{emptyMessage || 'No data found'}</p>
        {CTA && (
          <button
            onClick={CTA.onClick}
            className="mt-4 px-4 py-2 bg-white text-gray-950 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            {CTA.label}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {title && (
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
              {onRowAction && (
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                {columns.map((col) => {
                  const value = (row as any)[col]
                  return (
                    <td key={col} className="px-4 py-3.5 text-gray-300 text-sm">
                      {value !== undefined && value !== null ? String(value) : '—'}
                    </td>
                  )
                })}
                {onRowAction && (
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => onRowAction(row)}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      View
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}