import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

function SignupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20c0-3.6 3-6 6.5-6 1.6 0 3 .4 4.2 1.1V20H3.5Z" />
      <path d="M18 12V9h2v3h3v2h-3v3h-2v-3h-3v-2h3Z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function CtaBanner() {
  return (
    <section id="inscription" className="px-6 py-20 bg-[#F6F3FC]">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Image de fond sunset */}
        <Image
          src="/images/cta-sunset.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/85 via-[#0A0E27]/60 to-[#0A0E27]/30" />

        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center px-10 md:px-16 py-16">
          <div>
            <h2 className="font-serif text-[36px] md:text-[46px] font-semibold leading-tight mb-4">
              <span className="bg-gradient-to-r from-[#F0C15A] to-[#E8B923] bg-clip-text text-transparent">
                Prêt à commencer ?
              </span>
            </h2>
            <p className="text-white/85 text-[17px] leading-relaxed max-w-lg mb-9">
              Rejoignez dès maintenant notre communauté et faites partie de
              cette aventure musicale.
            </p>
            <Link
              href={ROUTES.signup}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F0C15A] to-[#E8B923] text-[#0A0E27] px-7 py-3.5 rounded-full text-[15px] font-semibold hover:shadow-[0_10px_30px_rgba(232,185,35,0.5)] transition"
            >
              <SignupIcon />
              S'inscrire
              <ArrowRight />
            </Link>
          </div>

          {/* Citation manuscrite à droite */}
          <div className="text-right">
            <p
              className="text-white text-[24px] leading-snug"
              style={{ fontFamily: "var(--font-handwriting, 'caveat', cursive)" }}
            >
              Un instrument entre vos mains,
              <br />
              une destinée entre vos Cœurs.
            </p>
            <span className="inline-block h-[2px] w-28 bg-[#E8B923] mt-3" />
          </div>
        </div>
      </div>
    </section>
  );
}