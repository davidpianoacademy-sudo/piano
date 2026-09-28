import { Eyebrow, Icon } from "./ui";

const FEATURES = [
  {
    title: "Cours structurés",
    desc: "Des vidéos claires et progressives, du débutant à l'avancé.",
    icon: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />,
  },
  {
    title: "Une approche inspirante",
    desc: "Jouez avec un cœur qui adore et qui loue.",
    icon: <path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.5 12 20 12 20Z" />,
  },
  {
    title: "Accessible partout",
    desc: "Sur tous vos appareils (ordinateur, tablette, mobile).",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    title: "Un accompagnement",
    desc: "Vous n'êtes pas seul(e), nous sommes là pour vous.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 19a6 6 0 0 1 12 0M15 19a5 5 0 0 1 6-4.9" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section id="apropos" className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {FEATURES.map((f) => (
          <div key={f.title} className="text-center px-2">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-purple/10 text-purple flex items-center justify-center">
              <Icon>{f.icon}</Icon>
            </div>
            <h3 className="font-serif text-[20px] font-semibold text-navy mb-2">
              {f.title}
            </h3>
            <p className="text-[#5A6376] text-[14.5px] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}