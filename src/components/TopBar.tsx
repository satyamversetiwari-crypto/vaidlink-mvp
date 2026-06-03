'use client'

import { Bell, Calendar, Search } from 'lucide-react'

interface TopBarProps {
  userEmail?: string
  userPhotoUrl?: string
}

export default function TopBar({ userEmail, userPhotoUrl }: TopBarProps) {
  const initial = userEmail ? userEmail[0].toUpperCase() : 'D'

  return (
    <header className="fixed top-0 right-0 left-64 h-20 flex items-center justify-between px-12 bg-surface/70 backdrop-blur-xl z-30 shadow-[0_40px_60px_-15px_rgba(27,28,26,0.05)]">
      {/* Search */}
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            placeholder="Search patient or record..."
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary/20 text-sm font-body"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-primary">
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-on-tertiary-container rounded-full border-2 border-white" />
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <Calendar size={20} />
          </button>
        </div>

        {/* Avatar */}
        {userPhotoUrl ? (
          <img
            src={userPhotoUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
            {initial}
          </div>
        )}
      </div>
    </header>
  )
}
