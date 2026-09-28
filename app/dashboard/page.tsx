import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CourseTabs from './CourseTabs'
import LogoutButton from './LogoutButton'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/logo/logo.png'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Infos profil étudiant
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, created_at, role')
    .eq('id', user.id)
    .single()

  // Si c'est un admin, on le renvoie vers son espace
  if (profile?.role === 'admin') redirect('/admin/dashboard')

  // Cours publiés
  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, category, youtube_url')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const fullName = profile?.full_name || user.email?.split('@')[0] || 'Étudiant'
  const initiales = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const dateInscription = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const whatsappNumber = '243XXXXXXXXX' // ← mets ton numéro ici (format international sans +)
  const whatsappMsg = encodeURIComponent(
    `Bonjour, je suis ${fullName}, étudiant sur la plateforme.`
  )

  return (
    <div className="relative min-h-screen bg-[#0A0E27] text-white overflow-hidden">
      {/* ═══════════ ARRIÈRE-PLAN ÉTOILÉ ═══════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 140px 80px, #fff, transparent), radial-gradient(1px 1px at 280px 60px, #fff, transparent), radial-gradient(1px 1px at 420px 130px, #fff, transparent), radial-gradient(1px 1px at 90px 200px, #fff, transparent), radial-gradient(1px 1px at 340px 240px, #fff, transparent), radial-gradient(1px 1px at 500px 180px, #fff, transparent)',
            backgroundSize: '600px 320px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-[#7B2CBF]/25 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#9D4EDD]/15 blur-[120px]" />
      </div>

      {/* ═══════════ NAVBAR ═══════════ */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0A0E27]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Logo → lien accueil */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#F5B942]/60 transition group-hover:border-[#F5B942]">
              <Image
                src={logo}
                alt="David Piano Academy"
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <div className="leading-tight">
              <p className="font-serif text-[13px] text-white transition group-hover:text-[#F5B942]">
                DAVID PIANO ACADEMY
              </p>
              <p className="text-[10px] tracking-[0.2em] text-[#F5B942]/80">
                ESPACE ÉTUDIANT
              </p>
            </div>
          </Link>

          {/* Profil + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5B942]/15 text-[11px] font-semibold text-[#F5B942] ring-1 ring-[#F5B942]/40">
                {initiales}
              </div>
              <span className="text-sm font-medium text-white/80">
                {fullName}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* ═══════════ BIENVENUE ═══════════ */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1A1440]/80 to-[#0F0A2E]/80 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-md sm:p-8">
          {/* halo déco */}
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#7B2CBF]/30 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 right-16 h-48 w-48 rounded-full border border-[#F5B942]/20" />

          <div className="relative">
            <p className="text-[12px] font-semibold tracking-[0.25em] text-[#F5B942]">
              BON RETOUR 👋
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-white">
              {fullName}
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Retrouve tous tes cours vidéo classés par niveau. Bonne progression 🚀
            </p>
          </div>
        </section>

        {/* ═══════════ GRILLE PRINCIPALE ═══════════ */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* ─── Colonne gauche : profil + contact ─── */}
          <aside className="space-y-6">
            {/* Carte profil */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-[#F5B942]">
                MON PROFIL
              </h2>
              <div className="mt-4 space-y-3.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Nom complet</span>
                  <span className="truncate font-medium text-white">
                    {fullName}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Email</span>
                  <span className="truncate font-medium text-white">
                    {user.email}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Inscrit le</span>
                  <span className="font-medium text-white">
                    {dateInscription}
                  </span>
                </div>
              </div>
            </div>

            {/* Carte WhatsApp et e-mail */}
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .17 5.33.16 11.89c0 2.09.55 4.13 1.6 5.93L0 24l6.33-1.66a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.89-5.33 11.9-11.89a11.8 11.8 0 0 0-3.44-8.43ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.76.99 1-3.66-.24-.38a9.87 9.87 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.9c0 5.45-4.44 9.89-9.86 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-200">
                    Besoin d'aide ?
                  </p>
                  <p className="text-xs text-emerald-300/70">
                    Contacte l'admin sur WhatsApp ou par e-mail
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Écrire sur WhatsApp
              </a>

              <a
                href="mailto:davidpianoacademy@gmail.com"
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-emerald-500/30 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/10"
              >
                davidpianoacademy@gmail.com
              </a>
            </div>
          </aside>

          {/* ─── Colonne droite : cours vidéo ─── */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-white">Mes cours vidéo</h2>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60">
                {courses?.length ?? 0} cours
              </span>
            </div>

            {courses && courses.length > 0 ? (
              <CourseTabs courses={courses} />
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center backdrop-blur-sm">
                <p className="text-sm font-medium text-white/80">
                  Aucun cours disponible
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Les cours apparaîtront ici dès que l'admin les publiera.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ═══════════ CLAVIER DE PIANO DÉCO ═══════════ */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="relative h-[50px] rounded-xl overflow-hidden border-t border-[#F5B942]/40 bg-[#0A0E27]">
          <div className="absolute inset-0 flex">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="relative flex-1 border-r border-[#0A0E27]/80 bg-white"
              >
                {i % 7 !== 2 && i % 7 !== 6 && (
                  <div className="absolute top-0 right-[-15%] w-[60%] h-[60%] bg-[#0A0E27] rounded-b-sm border border-black/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ FOOTER (après le piano) ═══════════ */}
      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#F5B942]/50 transition group-hover:border-[#F5B942]">
              <Image
                src={logo}
                alt="David Piano Academy"
                height={18}
                className="h-4 w-auto"
              />
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
            <Link
              href="/mentions-legales"
              className="transition hover:text-[#F5B942]"
            >
              Mentions légales
            </Link>
            <span className="h-3 w-px bg-white/10" />
            <Link
              href="/confidentialite"
              className="transition hover:text-[#F5B942]"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}