'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LogoLink from '@/components/LogoLink'
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'

interface SideNavProps {
  onSignOut: () => void
}

const navItems = [
  { href: '/doctor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/doctor/patients', label: 'Patient Registry', icon: Users },
  { href: '/doctor/notes', label: 'Clinical Notes', icon: FileText },
  { href: '/doctor/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/doctor/settings', label: 'Settings', icon: Settings },
]

export default function SideNav({ onSignOut }: SideNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-surface-container-low flex flex-col py-8 px-6 overflow-y-auto z-40">
      {/* Brand */}
      <div className="mb-12">
        <LogoLink theme="light" className="h-[60px] w-auto" />
        <p className="font-label text-[10px] font-medium tracking-widest uppercase text-on-surface/50 mt-1">
          Doctor Portal
        </p>
      </div>

      {/* Nav Items */}
      <div className="flex-1 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-lg
                transition-all duration-150 active:scale-95
                ${isActive
                  ? 'text-primary font-bold border-r-4 border-on-tertiary-container bg-surface-container-highest'
                  : 'text-on-surface/50 hover:translate-x-1 hover:text-primary'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-label text-sm font-medium tracking-wide uppercase">
                {label}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Bottom */}
      <div className="mt-auto pt-8 border-t border-outline-variant/10 space-y-2">
        <Link
          href="/help"
          className="flex items-center gap-4 px-4 py-3 text-on-surface/50 hover:text-primary transition-colors"
        >
          <HelpCircle size={20} />
          <span className="font-label text-sm font-medium tracking-wide uppercase">Help</span>
        </Link>
        <button
          onClick={onSignOut}
          className="flex items-center gap-4 px-4 py-3 text-on-surface/50 hover:text-error transition-colors w-full text-left"
        >
          <LogOut size={20} />
          <span className="font-label text-sm font-medium tracking-wide uppercase">Logout</span>
        </button>
      </div>
    </nav>
  )
}
