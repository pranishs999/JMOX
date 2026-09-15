export * from './Button'


/* ═══════════════════════════════════════════════════════════════════════════
   I N P U T
   ═══════════════════════════════════════════════════════════════════════════ */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ label, error, helperText, className = '', id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`block w-full rounded-lg border text-sm px-3.5 py-2.5 text-white bg-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-gray-500 transition-all ${
          error ? 'border-red-500/60' : 'border-gray-700'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {!error && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   S E L E C T
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
}

export function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`block w-full rounded-lg border text-sm px-3.5 py-2.5 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-gray-500 transition-all ${
          error ? 'border-red-500/60' : 'border-gray-700'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   B A D G E
   ═══════════════════════════════════════════════════════════════════════════ */

export function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}) {
  const variants: Record<string, string> = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   C A R D
   ═══════════════════════════════════════════════════════════════════════════ */

export function Card({
  title,
  subtitle,
  action,
  children,
  className = '',
}: {
  title?: React.ReactNode
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`glass-card rounded-xl ${className}`}>
      {(title || action) && (
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            {typeof title === 'string' ? (
              <h3 className="text-sm font-semibold text-white">{title}</h3>
            ) : (
              title
            )}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   M O D A L
   ═══════════════════════════════════════════════════════════════════════════ */

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white rounded-lg p-1 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Re-exports from sub-component files
   ═══════════════════════════════════════════════════════════════════════════ */

export * from './DataTable'
export * from './FilterBar'
export * from './SearchInput'
export * from './StatusBadge'