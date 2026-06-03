'use client'

import { ArrowRight, Loader2 } from 'lucide-react'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  showArrow?: boolean
  type?: 'button' | 'submit'
  className?: string
  variant?: 'primary' | 'outline'
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  showArrow = true,
  type = 'button',
  className = '',
  variant = 'primary',
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  if (variant === 'outline') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`
          w-full group relative overflow-hidden
          py-3.5 rounded-[14px] font-semibold
          border border-primary/20 text-primary
          hover:bg-primary hover:text-white
          transition-all active:scale-[0.98] duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          font-body text-sm
          ${className}
        `}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full group relative overflow-hidden
        bg-primary text-on-primary py-5 rounded-2xl
        font-semibold
        shadow-[0_20px_40px_rgba(6,51,37,0.2)]
        hover:shadow-[0_25px_50px_rgba(6,51,37,0.3)]
        transition-all active:scale-[0.98] duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        font-body
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          children
        )}
        {showArrow && !loading && <ArrowRight size={18} />}
      </span>
    </button>
  )
}
