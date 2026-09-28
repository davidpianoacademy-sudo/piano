import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFCF]/60 bg-[#FBF8F2]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[#0B1030]"
        >
          Piano<span className="text-[#A8873F]">.</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-[#4A4A4A] md:flex">
          <li>
            <Link href="#cours" className="transition-colors hover:text-[#0B1030]">
              Nos cours
            </Link>
          </li>
          <li>
            <Link href="#tarifs" className="transition-colors hover:text-[#0B1030]">
              Tarifs
            </Link>
          </li>
          <li>
            <Link href="#apropos" className="transition-colors hover:text-[#0B1030]">
              À propos
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-[#0B1030] transition-colors hover:text-[#A8873F] sm:block"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#0B1030] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1A2050]"
          >
            Essai gratuit
          </Link>
        </div>
      </nav>
    </header>
  );
}