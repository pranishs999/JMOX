
export interface FilterChipProps {
  label: string
  onSelect: () => void
  active: boolean
}

export function FilterChip({ label, onSelect, active }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-xs font-medium 
        ${active ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-100'}
        ${!active ? 'hover:bg-gray-100' : ''}
      `}
    >
      {label}
    </button>
  )
}

export interface FilterBarProps<T> {
  filters: Partial<T>
  onFilterChange: (filters: Partial<T>) => void
  reset: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FilterBar({ filters: _filters, onFilterChange: _onFilterChange, reset }: FilterBarProps<any>) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Filter chips would be rendered here dynamically based on the filter schema */}
      <button
        type="button"
        onClick={reset}
        className="text-xs text-gray-500 hover:text-primary transition-colors"
      >
        Reset
      </button>
    </div>
  )
}