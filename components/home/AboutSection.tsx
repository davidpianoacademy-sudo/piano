const INFO = [
  {
    title: "Apprentissage simple",
    desc: "Des explications claires et faciles à comprendre.",
    icon: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />,
  },
  {
    title: "Progression rapide",
    desc: "Des exercices adaptés à votre niveau.",
    icon: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />,
  },
  {
    title: "À votre rythme",
    desc: "Apprenez quand vous voulez et où vous voulez.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v5l3 2" />
      </>
    ),
  },
];

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      {children}
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="apropos" className="bg-white px-6 py-24">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#000923] text-[13px] font-bold tracking-[3px] uppercase mb-4">
          À propos
        </p>
        <h2 className="serif text-[32px] md:text-[40px] font-semibold mb-5 text-[#000923]">
          Une méthode pensée pour vous
        </h2>
        <p className="text-[#55657e] text-lg leading-relaxed max-w-2xl mx-auto mb-14">
          David Piano Academy vous accompagne dans votre apprentissage du
          piano, que vous soyez débutant ou déjà musicien, à votre rythme.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {INFO.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-[10px] shadow-[0_5px_20px_rgba(0,9,35,0.08)] px-6 py-7 border border-[#e2eaf5]"
            >
              <div className="text-[#000923] mb-4">
                <Icon>{c.icon}</Icon>
              </div>
              <h3 className="serif text-[21px] font-semibold text-[#000923] mb-2">
                {c.title}
              </h3>
              <p className="text-[#55657e] text-[15px] leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}