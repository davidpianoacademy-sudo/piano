import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const COURS = [
  {
    title: "Débutant",
    desc: "Les bases pour bien commencer et jouer vos premiers morceaux.",
    image: "/images/course-debutant.jpg",
    badge: "#E8B923", // or
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm2 2v11a1 1 0 0 0 1 1h9V7a1 1 0 0 0-1-1H7Z" />
        <path d="M9 10h6M9 13h4" stroke="white" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Intermédiaire",
    desc: "Approfondissez vos compétences et explorez de nouveaux styles.",
    image: "/images/course-intermediaire.jpg",
    badge: "#7C3AED", // violet
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <rect x="4" y="14" width="3" height="6" rx="0.8" />
        <rect x="10.5" y="10" width="3" height="10" rx="0.8" />
        <rect x="17" y="6" width="3" height="14" rx="0.8" />
      </svg>
    ),
  },
  {
    title: "Avancé",
    desc: "Maîtrisez votre jeu et atteignez un nouveau niveau d'expression.",
    image: "/images/course-avance.jpg",
    badge: "#7C3AED",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 3 2.6 5.7 6.2.7-4.6 4.2 1.2 6.1L12 16.8 6.6 19.7l1.2-6.1L3.2 9.4l6.2-.7L12 3Z" />
      </svg>
    ),
  },
];

function ArrowSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function CoursesSection() {
  return (
    <section id="cours" className="bg-[#F6F3FC] px-6 py-24">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Colonne gauche */}
        <div>
          <p className="text-[#E8B923] text-[12px] font-bold tracking-[5px] uppercase mb-5">
            Nos cours
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.15] font-semibold text-[#0A0E27] mb-6">
            Choisissez votre niveau et commencez dès aujourd'hui
          </h2>
          <p className="text-[#5A5A70] text-[15px] leading-relaxed max-w-md mb-9">
            Que vous soyez débutant ou déjà expérimenté, nos cours sont conçus
            pour vous faire progresser à votre rythme.
          </p>
          <Link
            href={ROUTES.signup}
            className="inline-flex items-center gap-2 bg-[#7C3AED] text-white px-6 py-3.5 rounded-full text-[15px] font-medium hover:bg-[#8B5CF6] transition shadow-[0_8px_24px_rgba(124,58,237,0.35)]"
          >
            Voir tous les cours
            <ArrowSmall />
          </Link>
        </div>

        {/* Colonne droite : 3 cartes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURS.map((c) => (
            <article
              key={c.title}
              className="group relative overflow-hidden rounded-2xl shadow-[0_15px_40px_rgba(10,14,39,0.15)]"
            >
              {/* Image */}
              <div className="relative h-44 w-full">
                <Image src={c.image} alt={c.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Contenu coloré */}
              <div
                className="px-5 py-6 text-white"
                style={{
                  background:
                    c.badge === "#E8B923"
                      ? "linear-gradient(180deg,#E8B923 0%,#C89B14 100%)"
                      : "linear-gradient(180deg,#7C3AED 0%,#5B21B6 100%)",
                }}
              >
                <div className="mb-3">{c.icon}</div>
                <h3 className="font-serif text-[22px] font-semibold mb-2">
                  {c.title}
                </h3>
                <p className="text-white/90 text-[13.5px] leading-relaxed mb-5">
                  {c.desc}
                </p>
                <Link
                  href={ROUTES.signup}
                  className="inline-flex items-center gap-2 text-white text-[14px] font-medium border-b border-white/40 pb-1 hover:gap-3 transition-all"
                >
                  Voir le cours
                  <ArrowSmall />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}