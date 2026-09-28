import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

function PlayIcon() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7L8 5Z" />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="accueil" className="relative bg-[#0A0E27] text-white overflow-hidden">
      {/* Image de fond (homme au piano) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-piano.jpg"
          alt=""
          fill
          priority
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#0A0E27]/85 to-[#0A0E27]/30" />
      </div>

      {/* Vague violette décorative */}
      <svg
        className="absolute left-0 right-0 bottom-0 h-[140px] w-full pointer-events-none"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-20,100 C300,20 500,130 780,60 C1000,10 1250,90 1460,30"
          stroke="#7C3AED"
          strokeOpacity="0.55"
          strokeWidth="2.5"
        />
        <path
          d="M-20,120 C300,50 500,150 780,90 C1000,45 1250,120 1460,60"
          stroke="#E8B923"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-[#E8B923] text-[13px] font-bold tracking-[5px] uppercase mb-6">
            Bienvenue à la
          </p>

          <h1 className="font-serif text-[52px] md:text-[76px] leading-[1.02] font-semibold mb-7">
            David Piano
            <br />
            <span className="bg-gradient-to-r from-[#E8B923] via-[#F0C15A] to-[#A855F7] bg-clip-text text-transparent">
              Academy
            </span>
          </h1>

          <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
            Apprenez le piano, développez vos talents et découvrez la joie de
            jouer pour Dieu.
          </p>

          <Link
            href={ROUTES.signup}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white px-7 py-4 rounded-full text-[15px] font-medium hover:shadow-[0_10px_30px_rgba(124,58,237,0.6)] transition"
          >
            <PlayIcon />
            Commencer maintenant
            <ArrowIcon />
          </Link>
        </div>

        {/* Citation manuscrite */}
        <div className="hidden md:block absolute right-8 bottom-16 max-w-[220px] text-right">
          <p
            className="text-[#F5E6C8] text-[22px] leading-snug"
            style={{ fontFamily: "var(--font-handwriting, 'caveat', cursive)" }}
          >
            La musique est une prière qui se joue.
          </p>
          <span className="block h-[2px] w-24 bg-[#E8B923] ml-auto my-2" />
          <p className="text-[#F5E6C8]/80 text-sm italic">David Piano Academy</p>
        </div>

        {/* Notes musicales */}
        <span className="hidden md:block absolute left-[42%] bottom-20 text-[#A855F7] text-3xl">♪</span>
        <span className="hidden md:block absolute left-[48%] bottom-10 text-[#E8B923] text-2xl">♫</span>
      </div>
    </section>
  );
}