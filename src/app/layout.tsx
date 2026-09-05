import type { Metadata } from "next";
import {
  Syne,
  Plus_Jakarta_Sans,
  Barlow_Condensed,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Solo para la pantalla de bienvenida. El resto de la app sigue con
// Syne + Jakarta hasta que se decida extender el cambio.
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Aura Gastronomique | Haute Couture WebAR Dining",
  description:
    "Plataforma de alta costura culinaria con visualización inmersiva 3D y WebAR a escala 1:1 para comensales en mesa.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#08090A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${plusJakartaSans.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090A] text-[#F4F4F5] selection:bg-[#E5C378] selection:text-[#08090A]">
        {children}
      </body>
    </html>
  );
}
