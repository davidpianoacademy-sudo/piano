import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E8DFCF] bg-[#FBF8F2]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 — Marque */}
          <div>
            <p className="text-lg font-semibold tracking-tight text-[#0B1030]">
              Piano<span className="text-[#A8873F]">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]">
              École de piano à taille humaine. Des cours sur mesure, pour tous
              les âges et tous les niveaux.
            </p>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0B1030]">
              Navigation
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#6B6B6B]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#0B1030]">
                  Accueil
                </Link>
              </li>
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
            </ul>
          </div>

          {/* Colonne 3 — Espace */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0B1030]">
              Espace élève
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#6B6B6B]">
              <li>
                <Link href="/login" className="transition-colors hover:text-[#0B1030]">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition-colors hover:text-[#0B1030]">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-[#0B1030]">
                  Mon espace
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0B1030]">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#6B6B6B]">
              <li>
                <a
                  href="mailto:contact@piano.fr"
                  className="transition-colors hover:text-[#0B1030]"
                >
                  contact@piano.fr
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="transition-colors hover:text-[#0B1030]">
                  01 23 45 67 89
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-[#8A8A8A]">
                  Lun – Sam · 9h – 20h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E8DFCF] pt-8 text-xs text-[#8A8A8A] sm:flex-row">
          <p>© {year} Piano. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-[#0B1030]">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-[#0B1030]">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}