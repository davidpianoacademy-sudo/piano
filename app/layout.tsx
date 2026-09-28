import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "David Piano Academy",
  description:
    "Apprenez le piano, développez vos talents et découvrez la joie de jouer pour Dieu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="font-sans bg-[#F6F3FC]">{children}</body>
    </html>
  );
}