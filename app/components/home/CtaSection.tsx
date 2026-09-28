import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="bg-[#0B1030] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#A8873F]">
          Prêt à commencer ?
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Réservez votre premier cours d'essai
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          Une séance découverte gratuite de 30 minutes pour faire connaissance,
          définir vos objectifs et trouver le cours qui vous correspond.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="w-full rounded-full bg-[#A8873F] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8F7033] sm:w-auto"
          >
            Cours d'essai gratuit
          </Link>

          <Link
            href="#cours"
            className="w-full rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Voir les tarifs
          </Link>
        </div>
      </div>
    </section>
  );
}