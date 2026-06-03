'use client'

interface AuthBackgroundProps {
  children: React.ReactNode
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Fluid Background — organic blob shapes from Stitch login */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#fbf9f6] via-[#f0f4f2] to-[#e8f0eb]" />
        
        {/* Green blob — top-left */}
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary-fixed-dim organic-shape" />
        
        {/* Muted green blob — bottom-right */}
        <div className="absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-secondary-fixed organic-shape" />
        
        {/* Amber blob — top-right */}
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-tertiary-fixed organic-shape" />
        
        {/* Deep green subtle blob — bottom-left */}
        <div className="absolute bottom-[10%] left-[15%] w-[25vw] h-[25vw] rounded-full bg-primary organic-shape opacity-10" />
      </div>

      {/* Content above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
