'use client'

import { signup } from './actions'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/logo/logo.png'

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, null)

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
        {/* Logo + marque → lien vers l'accueil */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-[60px] h-[60px] rounded-full border border-[#F5B942]/60 grid place-items-center transition group-hover:border-[#F5B942]">
            <Image src={logo} alt="David Piano Academy" height={40} className="h-10 w-auto" />
          </div>
          <div className="leading-tight">
            <p className="font-serif text-[22px] text-white transition group-hover:text-[#F5B942]">DAVID</p>
            <p className="text-[13px] tracking-[0.25em] text-[#F5B942]">PIANO ACADEMY</p>
            <p className="text-[10px] tracking-[0.2em] text-white/50 mt-0.5">
              Online · ÉCOLE DE MUSIQUE
            </p>
          </div>
        </Link>

        {/* Déjà membre ? */}
        <div className="hidden sm:flex items-center gap-6 pt-2">
          <span className="text-[12px] tracking-[0.2em] text-white/60">DÉJÀ MEMBRE ?</span>
          <Link
            href="/login"
            className="text-[12px] tracking-[0.2em] text-white border-b border-white/40 pb-1 hover:text-[#F5B942] hover:border-[#F5B942] transition"
          >
            SE CONNECTER
          </Link>
        </div>
      </header>

      {/* ═══════════ CONTENU ═══════════ */}
      <div className="relative z-10 mx-auto max-w-[1500px] px-8 py-12 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center min-h-[calc(100vh-100px)]">
        {/* ─── Colonne gauche : présentation ─── */}
        <div className="relative">
          <p className="text-[13px] font-semibold tracking-[4px] text-[#F5B942] mb-5">
            VOTRE MUSIQUE,
          </p>
          <h1 className="font-serif text-[56px] lg:text-[72px] leading-[1.05] text-white">
            commence
            <br />
            <span className="italic">ici.</span>
          </h1>
          <p className="mt-6 text-white/70 text-[15px] leading-relaxed max-w-[420px]">
            Rejoignez un espace pensé pour apprendre, pratiquer et faire résonner chaque note.
          </p>

          <div className="mt-10 space-y-5 max-w-[440px]">
            {[
              { n: "01", title: "Cours sur mesure", desc: "À votre rythme, avec passion." },
              { n: "02", title: "Une communauté", desc: "Des progrès partagés, ensemble." },
              { n: "03", title: "Un suivi personnalisé", desc: "Votre parcours, guidé pas à pas." },
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

        {/* ─── Colonne droite : carte formulaire ─── */}
        <div className="relative w-full max-w-[560px] mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-[#1A1440]/80 to-[#0F0A2E]/80 border border-white/10 shadow-2xl shadow-purple-900/40 backdrop-blur-md p-8 sm:p-10">
            <h2 className="font-serif text-[38px] leading-[1.1] text-white">
              Créer votre
              <br />
              <span className="text-[#F5B942]">compte</span>
            </h2>
            <p className="mt-3 text-white/60 text-[14px]">
              Commencez votre parcours musical
            </p>

            {state?.error && (
              <div className="mt-6 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 p-3 text-[13px]">
                {state.error}
              </div>
            )}

            <form action={formAction} className="mt-7 space-y-5">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#F5B942] mb-2">
                  PRÉNOM ET NOM
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  placeholder="Votre nom"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 px-4 py-3 text-[15px] outline-none focus:border-[#F5B942]/70 focus:bg-white/[0.06] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#F5B942] mb-2">
                  ADRESSE E-MAIL
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="vous@exemple.fr"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 px-4 py-3 text-[15px] outline-none focus:border-[#F5B942]/70 focus:bg-white/[0.06] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#F5B942] mb-2">
                  MOT DE PASSE
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 px-4 py-3 text-[15px] outline-none focus:border-[#F5B942]/70 focus:bg-white/[0.06] transition"
                />
              </div>

              <SubmitButton />
            </form>
          </div>
        </div>
      </div>

      {/* ═══════════ CLAVIER DE PIANO DÉCO ═══════════ */}
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

/* ─────────────────────────── Bouton ─────────────────────────── */
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-[#F5B942] text-[#0A0E27] py-3.5 text-[14px] font-semibold tracking-[0.15em] uppercase
                 hover:bg-[#e6ac36] disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-[#F5B942]/20"
    >
      {pending ? 'Création du compte...' : "S'inscrire"}
    </button>
  )
}