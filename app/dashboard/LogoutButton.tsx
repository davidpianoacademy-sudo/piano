'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      aria-label="Se déconnecter"
      className="group inline-flex items-center gap-2 rounded-full border border-[#F5B942]/40 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-white/85 backdrop-blur-sm transition-all duration-200 hover:border-[#F5B942] hover:bg-[#F5B942]/10 hover:text-[#F5B942] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B942]/60 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {/* Icône porte de sortie */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      <span className="hidden sm:inline">
        {loading ? 'Déconnexion…' : 'Déconnexion'}
      </span>
    </button>
  )
}