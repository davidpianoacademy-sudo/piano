'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/logo/logo.png'

export default function LoginPage() {
  const supabase = createClient() // ✅ ICI (dans le composant), pas dehors
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 1. Connexion
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      setError(
        error.message === 'Email not confirmed'
          ? "Ton adresse n'est pas encore confirmée. Vérifie ta boîte mail."
          : error.message
      )
      setLoading(false)
      return
    }

    // 2. Lecture du rôle
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle()

    if (profileError) {
      setError('Lecture du profil impossible : ' + profileError.message)
      setLoading(false)
      return
    }

    // 3. Redirection selon le rôle
    const destination = profile?.role === 'admin' ? '/admin' : '/dashboard'
    window.location.href = destination
  }

  return (
    <div className="relative min-h-screen bg-[#0A0E27] text-white overflow-hidden">
      {/* ═══════════ ÉTOILES EN ARRIÈRE-PLAN ═══════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 140px 80px, #fff, transparent), radial-gradient(1px 1px at 280px 60px, #fff, transparent), radial-gradient(1px 1px at 420px 130px, #fff, transparent), radial-gradient(1px 1px at 90px 200px, #fff, transparent), radial-gradient(1px 1px at 340px 240px, #fff, transparent), radial-gradient(1px 1px at 500px 180px, #fff, transparent)",
            backgroundSize: "600px 320px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-[#7B2CBF]/30 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#9D4EDD]/20 blur-[120px]" />
        <svg className="absolute top-0 right-1/3 h-full w-[400px] opacity-30" viewBox="0 0 400 800" fill="none">
          <path d="M200 0 Q250 400 400 800" stroke="#F5B942" strokeWidth="1" />
          <path d="M150 0 Q180 400 250 800" stroke="#F5B942" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ═══════════ HEADER ═══════════ */}
      <header className="relative z-10 mx-auto max-w-[1500px] px-8 pt-8 flex items-start justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative w-[60px] h-[60px] rounded-full border border-[#F5B942]/60 grid place-items-center">
            <Image src={logo} alt="David Piano Academy" height={40} className="h-10 w-auto" />
          </div>
          <div className="leading-tight">
            <p className="font-serif text-[22px] text-white">DAVID</p>
            <p className="text-[13px] tracking-[0.25em] text-[#F5B942]">PIANO ACADEMY</p>
            <p className="text-[10px] tracking-[0.2em] text-white/50 mt-0.5">
              PARIS · ÉCOLE DE MUSIQUE
            </p>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-6 pt-2">
          <span className="text-[12px] tracking-[0.2em] text-white/60">PAS ENCORE MEMBRE ?</span>
          <Link
            href="/signup"
            className="text-[12px] tracking-[0.2em] text-white border-b border-white/40 pb-1 hover:text-[#F5B942] hover:border-[#F5B942] transition"
          >
            S'INSCRIRE
          </Link>
        </div>
      </header>

      {/* ═══════════ CONTENU ═══════════ */}
      <div className="relative z-10 mx-auto max-w-[1500px] px-8 py-12 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center min-h-[calc(100vh-100px)]">
        <div className="relative">
          <p className="text-[13px] font-semibold tracking-[4px] text-[#F5B942] mb-5">
            HEUREUX DE VOUS REVOIR,
          </p>
          <h1 className="font-serif text-[56px] lg:text-[72px] leading-[1.05] text-white">
            reprenez
            <br />
            <span className="italic">votre mélodie.</span>
          </h1>
          <p className="mt-6 text-white/70 text-[15px] leading-relaxed max-w-[420px]">
            Retrouvez vos cours, vos progressions et votre communauté musicale.
          </p>

          <div className="mt-10 space-y-5 max-w-[440px]">
            {[
              { n: "01", title: "Vos cours, partout", desc: "Reprenez là où vous vous étiez arrêté." },
              { n: "02", title: "Votre progression", desc: "Suivez vos progrès semaine après semaine." },
              { n: "03", title: "Votre communauté", desc: "Échangez avec les autres élèves." },
            ].map((f) => (
              <div key={f.n} className="flex gap-4 items-start">
                <span className="text-[12px] tracking-[0.2em] text-[#F5B942] font-semibold pt-1">
                  {f.n}
                </span>
                <div>
                  <p className="text-white font-medium text-[15px]">{f.title}</p>
                  <p className="text-white/50 text-[13px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute -left-20 top-20 w-[380px] h-[380px] rounded-full border border-[#F5B942]/30 hidden lg:block" />
          <div className="pointer-events-none absolute -left-10 top-32 w-[300px] h-[300px] rounded-full border border-[#F5B942]/15 hidden lg:block" />
        </div>

        <div className="relative w-full max-w-[560px] mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-[#1A1440]/80 to-[#0F0A2E]/80 border border-white/10 shadow-2xl shadow-purple-900/40 backdrop-blur-md p-8 sm:p-10">
            <h2 className="font-serif text-[38px] leading-[1.1] text-white">
              Bon retour
              <br />
              <span className="text-[#F5B942]">parmi nous.</span>
            </h2>
            <p className="mt-3 text-white/60 text-[14px]">
              Connectez-vous pour accéder à votre espace
            </p>

            {error && (
              <div className="mt-6 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 p-3 text-[13px]">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-7 space-y-5">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#F5B942] mb-2">
                  ADRESSE E-MAIL
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.fr"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 px-4 py-3 text-[15px] outline-none focus:border-[#F5B942]/70 focus:bg-white/[0.06] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#F5B942] mb-2">
                  MOT DE PASSE
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 px-4 py-3 pr-12 text-[15px] outline-none focus:border-[#F5B942]/70 focus:bg-white/[0.06] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#F5B942] transition"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-[12px] text-white/50 hover:text-[#F5B942] transition"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <SubmitButton loading={loading} />
            </form>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-8 pb-6">
        <div className="relative h-[70px] rounded-xl overflow-hidden border-t border-[#F5B942]/40 bg-[#0A0E27]">
          <div className="absolute inset-0 flex">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="relative flex-1 border-r border-[#0A0E27]/80 bg-white">
                {![2, 6, 9, 13, 16, 20, 23, 27].includes(i % 7) && i % 7 !== 2 && i % 7 !== 6 && (
                  <div className="absolute top-0 right-[-15%] w-[60%] h-[60%] bg-[#0A0E27] rounded-b-sm border border-black/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-[#F5B942] text-[#0A0E27] py-3.5 text-[14px] font-semibold tracking-[0.15em] uppercase
                 hover:bg-[#e6ac36] disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-[#F5B942]/20"
    >
      {loading ? 'Connexion...' : 'Se connecter'}
    </button>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.4 18.4 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}