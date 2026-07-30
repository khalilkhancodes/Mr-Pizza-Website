'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function SignOutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)

    const supabase = createClient()
    await supabase.auth.signOut()

    router.push('/staff/login')
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="font-body text-[12px] uppercase tracking-[1px] text-[#888] hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
    >
      <svg
        className="w-[16px] h-[16px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      <span className="hidden sm:inline">{loading ? 'Signing Out...' : 'Sign Out'}</span>
    </button>
  )
}
