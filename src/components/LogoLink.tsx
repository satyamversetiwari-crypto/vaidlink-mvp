'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface LogoLinkProps {
  theme?: 'light' | 'dark'
  className?: string
  linkClassName?: string
}

export default function LogoLink({ theme = 'light', className = 'h-[60px] w-auto', linkClassName = '' }: LogoLinkProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        if (session.user.email === 'admin@vaidlink.in') {
          router.push('/admin')
        } else {
          router.push('/doctor')
        }
      } else {
        router.push('/')
      }
    } catch (error) {
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const filename = theme === 'light' ? 'web_vaidlink_light_logo.svg' : 'web_vaidlink_dark_logo.svg'

  return (
    <a 
      href="/" 
      onClick={handleClick}
      className={`inline-block transition-transform hover:scale-[1.02] active:scale-95 ${linkClassName}`}
    >
      <img src={`/${filename}`} alt="Vaidlink" className={className} />
    </a>
  )
}
