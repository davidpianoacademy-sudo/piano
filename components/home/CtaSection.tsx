import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const FEATURES = [
  "Accès à tous les cours et exercices",
  "Suivi personnalisé de votre progression",
  "Apprenez quand vous voulez, où vous voulez",
];

export default function CtaSection() {
  return (
    <section id="inscription" className="bg-[#dfe9f5] px-6 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="serif text-[32px] md:text-[42px] leading-tight font-semibold mb-5 text-[#000923]">
            Commencez votre <br />
            aventure musicale
          </h2>
          <p className="text-[#334766] text-lg leading-relaxed mb-8 max-w-md">
            Inscrivez-vous dès maintenant pour accéder à votre espace
            d'apprentissage.
          </p>
          <Link
            href={ROUTES.signup}
            className="inline-block bg-[#000923] text-white px-8 py-3.5 rounded-md text-[15px] font-medium hover:bg-[#0a2c5a] transition"
          >
            Créer mon compte
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_12px_35px_rgba(0,9,35,0.12)] px-7 py-8">
          <div className="text-[#000923] text-3xl mb-3">♫</div>
          <p className="serif text-[22px] font-semibold mb-5 text-[#000923]">
            Votre espace étudiant
          </p>
          <ul className="space-y-3 text-[#55657e] text-[15px]">
            {FEATURES.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-[#000923] font-bold">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="text-[#55657e] text-sm mt-6">
            Déjà un compte ?{" "}
            <Link href={ROUTES.login} className="text-[#000923] underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}