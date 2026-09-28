import Link from "next/link";
import { Eyebrow } from "./ui";

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-navy text-white">
      {/* halo lumineux */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-purple/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* image de fond (à déposer dans public/hero.jpg) */}
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center px-6 pt-20 pb-28">
        <div>
          <Eyebrow className="text-gold">Bienvenue à la</Eyebrow>
          <h1 className="font-serif text-[44px] md:text-[68px] leading-[1.05] font-semibold mb-7">
            David Piano
            <br />
            <span className="bg-gradient-to-r from-gold via-purple-soft to-gold bg-clip-text text-transparent">
              Academy
            </span>
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-md mb-10">
            Apprenez le piano, développez vos talents et découvrez la joie
            de jouer pour Dieu.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 bg-purple hover:bg-purple-deep transition text-white px-8 py-4 rounded-full text-[15px] font-medium shadow-[0_10px_30px_rgba(124,58,237,0.45)]"
            >
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Commencer maintenant
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* citation décorative */}
          <div className="mt-14 hidden lg:block">
            <p className="font-serif italic text-white/70 text-[15px] leading-relaxed max-w-[220px] border-l border-gold/40 pl-4">
              « La musique est une prière qui se joue. »
              <span className="block text-gold/80 not-italic text-[12px] tracking-[2px] mt-2">
                — DAVID PIANO ACADEMY
              </span>
            </p>
          </div>
        </div>

        {/* espace réservé pour l'image du pianiste */}
        <div className="hidden lg:block h-[520px]" aria-hidden />
      </div>

      {/* note de musique décorative */}
      <div className="pointer-events-none absolute bottom-6 left-1/3 text-gold/60 text-3xl" aria-hidden>
        ♪
      </div>
    </section>
  );
}