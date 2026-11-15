import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mnemosine — O Palácio da Memória",
  description:
    "Dashboard grego clássico para centralizar serviços, hospedagens e infraestruturas de projetos.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a090d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${cormorant.variable} ${geist.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#0a090d] text-stone-100 font-sans flex flex-col selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
        {children}
      </body>
    </html>
  );
}
