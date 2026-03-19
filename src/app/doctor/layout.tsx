'use client'

import { usePathname } from 'next/navigation'

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}