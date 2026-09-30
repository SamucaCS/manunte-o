import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// Linguagem visual da DICE: título condensado e pesado (Foggy na DICE; aqui Anton, gratuita)
// e texto numa grotesca limpa (Favorit na DICE; aqui Inter, gratuita).
const display = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Site em Manutenção",
  description:
    "Nossa página está em manutenção. Estamos construindo algo novo — volte em alguns instantes.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
