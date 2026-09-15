import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost'
  size?: 'default' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

export function Button({
  children,
  type = 'button',
  onClick,
  disabled,
  className = '',
  variant = 'primary',
  size = 'default',
  isLoading = false,
  icon,
  ...props
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    default: 'bg-gray-800 text-gray-200 hover:bg-gray-700',
    primary: 'bg-white text-gray-950 hover:bg-gray-200 shadow-sm',
    secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700',
    outline: 'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-500 shadow-sm',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm',
    ghost: 'text-gray-400 hover:bg-gray-800 hover:text-white',
  }

  const sizeClasses: Record<string, string> = {
    default: 'px-4 py-2 text-sm gap-2',
    sm: 'text-xs py-1.5 px-3 gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'text-base py-2.5 px-5 gap-2.5',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.default} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}