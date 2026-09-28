import Link from "next/link";

const courses = [
  {
    level: "Débutant",
    title: "Éveil & Premiers Pas",
    duration: "45 min / semaine",
    price: "à partir de 25 €",
    description:
      "Découverte du clavier, posture, premières mélodies. Pour les enfants dès 5 ans et les adultes grands débutants.",
    highlights: ["Lecture de notes", "Rythme & écoute", "Petits morceaux"],
  },
  {
    level: "Intermédiaire",
    title: "Consolidation & Répertoire",
    duration: "1 h / semaine",
    price: "à partir de 35 €",
    description:
      "Développement de la technique, du déchiffrage et du jeu en nuance. Répertoire classique et moderne.",
    highlights: ["Gammes & arpèges", "Interprétation", "Théorie appliquée"],
  },
  {
    level: "Avancé",
    title: "Perfectionnement & Scène",
    duration: "1 h 30 / semaine",
    price: "à partir de 50 €",
    description:
      "Préparation aux examens, concours et auditions. Travail approfondi du style et de l'expressivité.",
    highlights: ["Examens & auditions", "Analyse musicale", "Conservatoire"],
  },
];

export default function CoursesSection() {
  return (
    <section id="cours" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#A8873F]">
            Nos cours
          </p>
          <h2 className="serif text-4xl text-[#0B1030] md:text-5xl">
            Un parcours pour chaque pianiste
          </h2>
          <p className="mt-4 text-[#5B5B5B]">
            Du premier contact avec le clavier au perfectionnement scénique,
            nous vous accompagnons à chaque étape.
          </p>
        </div>

        {/* Cartes */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group relative flex flex-col rounded-2xl border border-[#E8DFCF] bg-[#FAF7F2] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A961] hover:shadow-[0_20px_50px_-20px_rgba(11,16,48,0.25)]"
            >
              <span className="mb-4 inline-block w-fit rounded-full bg-[#C9A961]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#A8873F]">
                {course.level}
              </span>

              <h3 className="serif text-2xl text-[#0B1030]">{course.title}</h3>

              <p className="mt-3 text-sm text-[#5B5B5B]">
                {course.description}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-[#1A1A1A]">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="text-[#C9A961]">♪</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end justify-between border-t border-[#E8DFCF] pt-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8A8A8A]">
                    {course.duration}
                  </p>
                  <p className="mt-1 font-semibold text-[#0B1030]">
                    {course.price}
                  </p>
                </div>

                <Link
                  href="/signup"
                  className="rounded-full bg-[#0B1030] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#141B3E]"
                >
                  S'inscrire
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}