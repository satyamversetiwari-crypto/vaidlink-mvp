'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface FormInputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
  id?: string
  required?: boolean
  minLength?: number
}

export default function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  id,
  required,
  minLength,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[11px] uppercase tracking-widest font-bold text-primary ml-1"
      >
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          className={`
            w-full ${icon ? 'pl-12' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} py-4
            bg-white/60 border border-white/40 rounded-2xl
            focus:ring-4 focus:ring-primary/10 focus:border-primary
            outline-none transition-all
            placeholder:text-on-surface-variant/40
            text-on-surface font-medium font-body
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 flex items-center text-on-surface-variant hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}
