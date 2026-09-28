import Image from "next/image";
import Link from "next/link";
import logo from "@/app/logo/logo.png";
import { ROUTES } from "@/lib/routes";

const NAV = [
  { label: "Accueil", href: ROUTES.accueil },
  { label: "Cours", href: ROUTES.cours },
  { label: "À propos", href: ROUTES.apropos },
  { label: "Tarifs", href: ROUTES.tarifs },
  { label: "FAQ", href: ROUTES.faq },
];

const SOCIALS = [
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <path d="M23 12s0-3.5-.5-5.2a2.7 2.7 0 0 0-1.9-1.9C18.9 4.4 12 4.4 12 4.4s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 6.8C1 8.5 1 12 1 12s0 3.5.5 5.2c.3 1 .9 1.6 1.9 1.9 1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-5.2.5-5.2ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" strokeWidth="2" stroke="currentColor" />
        <circle cx="12" cy="12" r="4" fill="none" strokeWidth="2" stroke="currentColor" />
        <circle cx="17.3" cy="6.7" r="1.2" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M13.5 21v-7h2.7l.5-3.2h-3.2V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2C16.5 4.1 15.4 4 14.2 4c-2.4 0-4 1.5-4 4.2v2.6H7.5V14h2.7v7h3.3Z" />
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3c-1.5 0-2.9-.5-4-1.3v6.5a5.7 5.7 0 1 1-5.7-5.7c.4 0 .8 0 1.2.1v3.1a2.6 2.6 0 1 0 1.8 2.5V3h2.7Z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0E27] text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 items-center gap-8">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex items-center">
          <Image
            src={logo}
            alt="David Piano Academy"
            height={70}
            className="h-14 w-auto"
          />
        </Link>

        {/* Liens */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[14px]">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="hover:text-white transition">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex justify-start md:justify-end gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#F5E6C8] hover:text-white hover:bg-white/10 transition"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Séparateur + copyright */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-gradient-to-r from-[#7C3AED] via-[#E8B923]/60 to-[#7C3AED] opacity-50" />
        <p className="text-center text-[13px] text-white/60 py-6">
          © 2025 David Piano Academy. Tous droits réservés.
        </p>
      </div>

      {/* Vague décorative */}
      <svg
        className="absolute bottom-0 right-0 h-24 w-1/2 pointer-events-none"
        viewBox="0 0 720 100"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C180,10 360,80 540,40 C620,25 680,60 720,40"
          stroke="#7C3AED"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
        <path
          d="M0,80 C180,30 360,100 540,60 C620,45 680,80 720,60"
          stroke="#E8B923"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </svg>
    </footer>
  );
}