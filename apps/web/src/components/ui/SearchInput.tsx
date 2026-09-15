
import { Search } from 'lucide-react'

export interface SearchInputProps {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
}

export function SearchInput({ placeholder, value, onChange, disabled, className = '' }: SearchInputProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-gray-950 border border-white/[0.08] text-white placeholder-gray-600 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all disabled:opacity-50"
      />
    </div>
  )
}