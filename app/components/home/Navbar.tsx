import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFCF]/60 bg-[#FBF8F2]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight text-[#0B1030]"
        >
          Piano<span className="text-[#A8873F]">.</span>
        </Link>

        {/* Liens desktop */}
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

        {/* Boutons auth — visibles sur TOUS les écrans */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-full border border-[#0B1030]/20 px-3 sm:px-5 py-2 text-[13px] sm:text-sm font-medium text-[#0B1030] transition-colors hover:border-[#0B1030] hover:text-[#A8873F]"
          >
            <span className="sm:hidden">Connexion</span>
            <span className="hidden sm:inline">Connexion</span>
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-[#0B1030] px-3 sm:px-5 py-2 text-[13px] sm:text-sm font-semibold text-white transition-colors hover:bg-[#1A2050]"
          >
            <span className="sm:hidden">Essai</span>
            <span className="hidden sm:inline">Essai gratuit</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}