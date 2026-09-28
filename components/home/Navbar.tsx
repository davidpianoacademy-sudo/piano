import Image from "next/image";
import Link from "next/link";
import logo from "@/app/logo/logo.png";
import { ROUTES } from "@/lib/routes";

const NAV = [
  { label: "Accueil", href: ROUTES.accueil, active: true },
  { label: "Cours", href: ROUTES.cours },
  { label: "À propos", href: ROUTES.apropos },
  { label: "Tarifs", href: ROUTES.tarifs },
  { label: "FAQ", href: ROUTES.faq },
];

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function SignupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20c0-3.6 3-6 6.5-6 1.6 0 3 .4 4.2 1.1V20H3.5Z" />
      <path d="M18 12V9h2v3h3v2h-3v3h-2v-3h-3v-2h3Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0E27] border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 h-20">
        <Link href={ROUTES.home} className="flex items-center shrink-0">
          <Image
            src={logo}
            alt="David Piano Academy"
            height={70}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9 text-[15px] text-white/80">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative py-2 transition hover:text-white ${
                item.active
                  ? "text-white font-medium after:absolute after:left-0 after:right-0 after:-bottom-[22px] after:h-[3px] after:rounded-full after:bg-[#8B5CF6]"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.login}
            className="hidden sm:flex items-center gap-2 text-[14px] font-medium text-[#F5E6C8] border border-[#F5E6C8]/60 rounded-full px-5 py-2.5 hover:bg-[#F5E6C8] hover:text-[#0A0E27] transition"
          >
            <UserIcon />
            Se connecter
          </Link>
          <Link
            href={ROUTES.signup}
            className="flex items-center gap-2 text-[14px] font-medium text-white bg-[#7C3AED] rounded-full px-5 py-2.5 hover:bg-[#8B5CF6] transition shadow-[0_4px_16px_rgba(124,58,237,0.5)]"
          >
            <SignupIcon />
            S'inscrire
          </Link>
        </div>
      </div>
    </header>
  );
}