import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: "#0B1030", deep: "#060B1F", soft: "#141B3E" },
        purple:  { DEFAULT: "#7C3AED", deep: "#6D28D9", soft: "#A855F7" },
        gold:    { DEFAULT: "#C9A24B", soft: "#D4AF37" },
        cream:   "#FAF7F2",
        lilac:   "#F3F0FA",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 35px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;