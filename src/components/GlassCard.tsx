interface GlassCardProps {
  children: React.ReactNode
  className?: string
  maxWidth?: string
}

export default function GlassCard({ children, className = '', maxWidth = '540px' }: GlassCardProps) {
  return (
    <div
      className={`glass-panel rounded-[2.5rem] shadow-[0_40px_100px_rgba(6,51,37,0.15)] border border-white/60 p-10 md:p-16 ${className}`}
      style={{ maxWidth }}
    >
      {children}
    </div>
  )
}
