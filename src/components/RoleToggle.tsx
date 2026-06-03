'use client'

interface RoleToggleProps {
  activeRole: 'patient' | 'doctor'
  onRoleChange: (role: 'patient' | 'doctor') => void
}

export default function RoleToggle({ activeRole, onRoleChange }: RoleToggleProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="bg-surface-container-low/50 p-1.5 rounded-full flex w-full relative shadow-inner">
        <button
          type="button"
          onClick={() => onRoleChange('patient')}
          className={`
            flex-1 py-3 px-6 rounded-full text-sm font-medium
            transition-all duration-300 z-10
            ${activeRole === 'patient'
              ? 'bg-primary text-on-primary shadow-lg'
              : 'text-on-surface-variant hover:text-on-surface'
            }
          `}
        >
          Patient
        </button>
        <button
          type="button"
          onClick={() => onRoleChange('doctor')}
          className={`
            flex-1 py-3 px-6 rounded-full text-sm font-medium
            transition-all duration-300 z-10
            ${activeRole === 'doctor'
              ? 'bg-primary text-on-primary shadow-lg'
              : 'text-on-surface-variant hover:text-on-surface'
            }
          `}
        >
          Doctor
        </button>
      </div>
    </div>
  )
}
