import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CourseForm from './CourseForm'
import CourseManager from './CourseManager'
import StudentManager from './StudentManager'
import LogoutButton from '@/app/dashboard/LogoutButton'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/logo/logo.png'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Vérifie le rôle admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  // Stats
  const { count: studentsCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student')

  const { count: coursesCount } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })

  // Données
  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, category, youtube_url, is_published, created_at')
    .order('created_at', { ascending: false })

  const { data: students } = await supabase
    .from('profiles')
    .select('id, full_name, email, created_at')
    .eq('role', 'student')
    .order('created_at', { ascending: false })

  const adminName = profile?.full_name || 'Admin'
  const initiales = adminName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const stats = [
    { label: 'Étudiants', value: studentsCount ?? 0, color: 'from-indigo-500 to-violet-600' },
    { label: 'Cours', value: coursesCount ?? 0, color: 'from-emerald-500 to-teal-600' },
    {
      label: 'Publiés',
      value: courses?.filter((c) => c.is_published).length ?? 0,
      color: 'from-amber-500 to-orange-600',
    },
  ]

  return (
    <div className="relative min-h-screen bg-[#0A0E27] text-white overflow-hidden">
      {/* ═══════════ ARRIÈRE-PLAN ÉTOILÉ ═══════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 140px 80px, #fff, transparent), radial-gradient(1px 1px at 280px 60px, #fff, transparent), radial-gradient(1px 1px at 420px 130px, #fff, transparent), radial-gradient(1px 1px at 90px 200px, #fff, transparent), radial-gradient(1px 1px at 340px 240px, #fff, transparent), radial-gradient(1px 1px at 500px 180px, #fff, transparent)",
            backgroundSize: "600px 320px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-[#7B2CBF]/25 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#9D4EDD]/15 blur-[120px]" />
      </div>

      {/* ═══════════ NAVBAR ═══════════ */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0A0E27]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#F5B942]/60 transition group-hover:border-[#F5B942]">
              <Image src={logo} alt="David Piano Academy" height={24} className="h-6 w-auto" />
            </div>
            <div className="leading-tight">
              <p className="font-serif text-[13px] text-white transition group-hover:text-[#F5B942]">
                DAVID PIANO ACADEMY
              </p>
              <p className="text-[10px] tracking-[0.2em] text-[#F5B942]/80">
                ESPACE ADMIN
              </p>
            </div>
          </Link>

          {/* Profil + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5B942]/15 text-[11px] font-semibold text-[#F5B942] ring-1 ring-[#F5B942]/40">
                {initiales}
              </div>
              <span className="text-sm font-medium text-white/80">{adminName}</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* ═══════════ BIENVENUE ═══════════ */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1A1440]/80 to-[#0F0A2E]/80 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-md sm:p-8">
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#7B2CBF]/30 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 right-16 h-48 w-48 rounded-full border border-[#F5B942]/20" />

          <div className="relative">
            <p className="text-[12px] font-semibold tracking-[0.25em] text-[#F5B942]">
              TABLEAU DE BORD
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-white">
              Bonjour {adminName} 👋
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Gérez vos cours et vos étudiants depuis cet espace.
            </p>
          </div>
        </section>

        {/* ═══════════ STATS ═══════════ */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-sm`}
              >
                <span className="text-sm font-bold">{s.value}</span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                {s.label}
              </p>
              <p className="mt-1 font-serif text-2xl text-white">{s.value}</p>
            </div>
          ))}
        </section>

        {/* ═══════════ CRÉER UN COURS ═══════════ */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="font-serif text-2xl text-white">Créer un cours</h2>
            <p className="mt-1 text-xs text-white/50">
              Collez le lien YouTube (non-répertorié) et choisissez la catégorie.
            </p>
          </div>
          <CourseForm />
        </section>

        {/* ═══════════ GESTION ═══════════ */}
        {/* ✅ text-[#0A0E27] force le texte en sombre uniquement dans les 2 cartes blanches */}
        <section className="grid gap-6 lg:grid-cols-2 text-[#0A0E27]">
          <CourseManager courses={courses ?? []} />
          <StudentManager students={students ?? []} />
        </section>
      </main>

      {/* ═══════════ CLAVIER DE PIANO DÉCO ═══════════ */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="relative h-[50px] rounded-xl overflow-hidden border-t border-[#F5B942]/40 bg-[#0A0E27]">
          <div className="absolute inset-0 flex">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="relative flex-1 border-r border-[#0A0E27]/80 bg-white">
                {i % 7 !== 2 && i % 7 !== 6 && (
                  <div className="absolute top-0 right-[-15%] w-[60%] h-[60%] bg-[#0A0E27] rounded-b-sm border border-black/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#F5B942]/50 transition group-hover:border-[#F5B942]">
              <Image src={logo} alt="David Piano Academy" height={18} className="h-4 w-auto" />
            </div>
            <div className="leading-tight">
              <p className="font-serif text-[12px] tracking-[0.15em] text-white/90 transition group-hover:text-[#F5B942]">
                DAVID PIANO ACADEMY
              </p>
              <p className="text-[10px] text-white/40">
                © {new Date().getFullYear()} — Tous droits réservés
              </p>
            </div>
          </Link>

          {/* Liens */}
          <nav className="flex items-center gap-4 text-[11px] text-white/50">
            <Link href="/" className="transition hover:text-[#F5B942]">
              Accueil
            </Link>
            <span className="h-3 w-px bg-white/10" />
            <Link href="/mentions-legales" className="transition hover:text-[#F5B942]">
              Mentions légales
            </Link>
            <span className="h-3 w-px bg-white/10" />
            <Link href="/confidentialite" className="transition hover:text-[#F5B942]">
              Confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}