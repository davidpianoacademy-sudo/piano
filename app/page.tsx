import Image from "next/image";
import Link from "next/link";
import logo from "@/app/logo/logo.png";
import banner from "@/app/logo/banner.png";
import courses from "@/app/logo/courses.png";

export default function Home() {
  return (
    <main className="bg-white">
      {/* ═══════════ NAVBAR ═══════════ */}
      <nav className="bg-[#0A0E27] sticky top-0 z-50">
        <div className="mx-auto max-w-[1400px] px-8 h-[72px] flex items-center justify-between">
          <Link href="#accueil" className="flex items-center">
            <Image src={logo} alt="David Piano Academy" height={52} className="h-[52px] w-auto" />
          </Link>

          <ul className="hidden lg:flex items-center gap-10 text-white/90 text-[15px]">
            <li><Link href="#accueil" className="border-b-2 border-[#9D4EDD] pb-1">Accueil</Link></li>
            <li><Link href="#cours" className="hover:text-[#F5B942] transition">Cours</Link></li>
            <li><Link href="#a-propos" className="hover:text-[#F5B942] transition">À propos</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 rounded-full border border-[#F5B942] text-[#F5B942] px-5 py-2 text-sm font-medium hover:bg-[#F5B942]/10 transition"
            >
              <span className="text-base">👤</span> Se connecter
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] text-white px-5 py-2 text-sm font-medium hover:opacity-95 transition"
            >
              <span className="text-base">👤</span> S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="accueil" className="relative bg-[#0A0E27] overflow-hidden">
        <div className="relative mx-auto max-w-[1400px] min-h-[520px] grid lg:grid-cols-[1fr_1.15fr] items-center">
          {/* Texte à gauche */}
          <div className="relative z-10 px-8 lg:px-12 py-16 lg:py-20">
            <p className="text-[13px] font-semibold tracking-[4px] text-[#F5B942] mb-5">
              BIENVENUE À LA
            </p>
            <h1 className="font-serif text-[56px] lg:text-[72px] leading-[1.05] font-normal">
              <span className="text-white block">David Piano</span>
              <span className="bg-gradient-to-r from-[#F5B942] via-[#E8B84B] to-[#C77DDB] bg-clip-text text-transparent block">
                Academy
              </span>
            </h1>
            <p className="mt-6 text-white/90 text-[17px] leading-relaxed max-w-[420px]">
              Apprenez le piano, développez vos talents et découvrez la joie de
              jouer pour Dieu.
            </p>

            <Link
              href="/signup"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-7 py-3.5 text-white text-[15px] font-medium shadow-lg shadow-purple-900/40 hover:opacity-95 transition"
            >
              <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 text-[10px]">▶</span>
              Commencer maintenant →
            </Link>
          </div>

          {/* Image à droite */}
          <div className="relative h-[380px] lg:h-[520px]">
            <Image
              src={banner}
              alt="Pianiste jouant du piano"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#0A0E27]/40 to-transparent" />
          </div>

          {/* Citation manuscrite */}
          <p className="hidden lg:block absolute bottom-10 right-12 font-handwriting italic text-[#F5B942] text-[26px] leading-[1.2] text-right">
            La musique<br />
            est une prière<br />
            qui se joue.
          </p>
        </div>
      </section>

      {/* ═══════════ FEATURES (À propos) ═══════════ */}
      <section id="a-propos" className="bg-[#F5F3FA] py-12">
        <div className="mx-auto max-w-[1400px] px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "🎓", title: "Cours structurés", desc: "Des vidéos claires et progressives, du débutant à l'avancé." },
            { icon: "♡", title: "Une approche inspirante", desc: "Jouez avec un cœur qui adore et qui loue." },
            { icon: "🖥", title: "Accessible partout", desc: "Sur tous vos appareils (ordinateur, tablette, mobile)." },
            { icon: "👥", title: "Un accompagnement", desc: "Vous n'êtes pas seul(e), nous sommes là pour vous." },
          ].map((f) => (
            <div key={f.title} className="text-center lg:border-r lg:last:border-r-0 border-[#E0DAF0] px-4">
              <div className="mx-auto w-[70px] h-[70px] rounded-full bg-[#EDE7F6] grid place-items-center text-[28px] mb-4">
                {f.icon}
              </div>
              <h3 className="font-serif text-[19px] text-[#0A0E27] mb-2">{f.title}</h3>
              <p className="text-[14px] text-[#4A5568] leading-relaxed max-w-[230px] mx-auto">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ COURS ═══════════ */}
      <section id="cours" className="bg-[#F5F3FA] pt-4 pb-20">
        <div className="mx-auto max-w-[1400px] px-8 grid lg:grid-cols-[1.05fr_2fr] gap-12 items-center">
          {/* Texte gauche */}
          <div>
            <p className="text-[13px] font-semibold tracking-[4px] text-[#9D4EDD] mb-5">
              NOS COURS
            </p>
            <h2 className="font-serif text-[38px] lg:text-[42px] leading-[1.15] text-[#0A0E27]">
              Choisissez votre niveau<br />
              et commencez dès aujourd'hui
            </h2>
            <p className="mt-5 text-[#4A5568] text-[15px] leading-relaxed max-w-[380px]">
              Que vous soyez débutant ou déjà expérimenté, nos cours sont conçus
              pour vous faire progresser à votre rythme.
            </p>
            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-6 py-3 text-white text-[14px] font-medium shadow-lg shadow-purple-900/30 hover:opacity-95 transition"
            >
              Voir tous les cours →
            </Link>
          </div>

          {/* 3 cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Débutant", icon: "🌿", desc: "Les bases pour bien commencer et jouer vos premiers morceaux.", bg: "from-[#E8B84B] to-[#C99A2E]" },
              { title: "Intermédiaire", icon: "📊", desc: "Approfondissez vos compétences et explorez de nouveaux styles.", bg: "from-[#7B2CBF] to-[#5B21B6]" },
              { title: "Avancé", icon: "⭐", desc: "Maîtrisez votre jeu et atteignez un nouveau niveau d'expression.", bg: "from-[#8B3FE8] to-[#6D28D9]" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl overflow-hidden shadow-xl shadow-black/10 flex flex-col">
                <div className="relative w-full h-[140px]">
                  <Image
                    src={courses}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className={`bg-gradient-to-b ${c.bg} text-white p-4 flex-1 flex flex-col`}>
                  <div className="text-[20px] mb-1">{c.icon}</div>
                  <h3 className="font-serif text-[20px] mb-1">{c.title}</h3>
                  <p className="text-white/90 text-[13px] leading-snug flex-1">{c.desc}</p>
                  <Link href="/login" className="mt-4 inline-flex items-center gap-2 text-white text-[13px] font-medium border-b border-white/50 pb-1 w-fit">
                    Voir le cours →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="bg-[#F5F3FA] px-8 pb-16">
        <div className="relative mx-auto max-w-[1400px] rounded-2xl overflow-hidden h-[280px]">
          <Image src={banner} alt="" fill sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/90 via-[#0A0E27]/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-[600px]">
            <h2 className="font-serif text-[34px] text-[#F5B942]">Prêt à commencer ?</h2>
            <p className="mt-3 text-white/90 text-[16px] leading-relaxed">
              Rejoignez dès maintenant notre communauté et faites partie de cette
              aventure musicale.
            </p>
            <Link
              href="/signup"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#F5B942] px-6 py-3 text-[#0A0E27] text-[15px] font-semibold hover:bg-[#e6ac36] transition"
            >
              <span>👤</span> S'inscrire →
            </Link>
          </div>

          <p className="hidden lg:block absolute bottom-8 right-10 font-handwriting italic text-white text-[24px] leading-[1.2] text-right">
            Un instrument<br />
            entre vos mains,<br />
            une destinée<br />
            entre vos cœurs.
          </p>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-[#0A0E27] text-white py-10">
        <div className="mx-auto max-w-[1400px] px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <Image src={logo} alt="David Piano Academy" height={54} className="h-[54px] w-auto" />

          <ul className="flex flex-wrap justify-center gap-8 text-[15px] text-white/90">
            <li><Link href="#accueil" className="hover:text-[#F5B942] transition">Accueil</Link></li>
            <li><Link href="#cours" className="hover:text-[#F5B942] transition">Cours</Link></li>
            <li><Link href="#a-propos" className="hover:text-[#F5B942] transition">À propos</Link></li>
          </ul>

          <div className="flex items-center gap-4 text-white/80">
            <a href="#" className="hover:text-[#F5B942]">▶</a>
            <a href="#" className="hover:text-[#F5B942]">📷</a>
            <a href="#" className="hover:text-[#F5B942]">f</a>
            <a href="#" className="hover:text-[#F5B942]">♪</a>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-8 mt-8 pt-6 border-t border-white/15 text-center text-[13px] text-white/60">
          © 2025 David Piano Academy. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}