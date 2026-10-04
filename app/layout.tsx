import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Shell } from "@/components/shell";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SigaWatch · Monitoreo de Sigatoka Negra",
  description:
    "Prototipo navegable del sistema de registro y control epidemiológico de Sigatoka Negra en Urabá. Ingeniería de Software II — Sebastián Gil Villalobos.",
};

export const viewport: Viewport = {
  themeColor: "#2e7d32",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
