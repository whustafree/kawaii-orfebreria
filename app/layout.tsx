import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "✨ Kawaii Orfebrería — Joyas Artesanales Anime",
  description:
    "Orfebrería femenina con estilo anime y kawaii. Joyas artesanales hechas a mano en Chile. Anillos, collares, pulseras, aros y llaveros. Precios en CLP.",
  keywords: [
    "orfebrería",
    "joyas anime",
    "kawaii",
    "artesanía chilena",
    "plata 925",
    "anime jewelry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
