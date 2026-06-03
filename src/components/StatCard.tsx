import { TrendingUp } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  variant?: 'glass' | 'solid'
}

export default function StatCard({ label, value, icon, trend, variant = 'glass' }: StatCardProps) {
  if (variant === 'solid') {
    return (
      <div className="bg-primary p-8 rounded-[32px] editorial-shadow text-white">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <p className="font-label text-sm uppercase tracking-wider text-white/50">{label}</p>
        <h4 className="text-5xl font-headline font-bold mt-1">{value}</h4>
      </div>
    )
  }

  return (
    <div className="glass-card p-8 rounded-[32px] editorial-shadow border border-white/20">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
          {icon}
        </div>
        {trend && (
          <span className="text-on-tertiary-container font-semibold text-sm flex items-center gap-1">
            {trend} <TrendingUp size={14} />
          </span>
        )}
      </div>
      <p className="font-label text-sm uppercase tracking-wider text-on-surface-variant/60">{label}</p>
      <h4 className="text-5xl font-headline font-bold text-primary mt-1">{value}</h4>
    </div>
  )
}
