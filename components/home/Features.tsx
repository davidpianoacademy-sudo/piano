const FEATURES = [
  {
    title: "Cours structurés",
    desc: "Des vidéos claires et progressives, du débutant à l'avancé.",
    icon: (
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Zm3 3.2v4.3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.3" />
    ),
  },
  {
    title: "Une approche inspirante",
    desc: "Jouez avec un cœur qui adore et qui loue.",
    icon: <path d="M12 20s-7-4.3-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.7 12 20 12 20Z" />,
  },
  {
    title: "Accessible partout",
    desc: "Sur tous vos appareils (ordinateur, tablette, mobile).",
    icon: (
      <>
        <rect x="3" y="4" width="13" height="10" rx="1.5" />
        <path d="M7 18h6M9 14v4" />
        <rect x="17" y="9" width="4.5" height="8" rx="1.2" />
      </>
    ),
  },
  {
    title: "Un accompagnement",
    desc: "Vous n'êtes pas seul(e), nous sommes là pour vous.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" />
        <circle cx="17.5" cy="9" r="2.3" />
        <path d="M15 19c0-2.6 1.4-4.5 3.5-4.5S22 16.4 22 19" />
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
      className="w-8 h-8"
    >
      {children}
    </svg>
  );
}

export default function Features() {
  return (
    <section className="bg-white px-6 py-16 border-b border-[#EDE9F5]">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 divide-y md:divide-y-0 md:divide-x divide-[#EDE9F5]">
        {FEATURES.map((f) => (
          <div key={f.title} className="px-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]">
              <Icon>{f.icon}</Icon>
            </div>
            <h3 className="font-serif text-[20px] font-semibold text-[#0A0E27] mb-2">
              {f.title}
            </h3>
            <p className="text-[#5A5A70] text-[14.5px] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}