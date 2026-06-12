import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LapakKilat — Toko Online Instan untuk UMKM",
  description:
    "Buat katalog online profesional dalam 5 menit. Gratis, tanpa coding, langsung checkout via WhatsApp.",
  keywords: ["UMKM", "toko online", "katalog", "WhatsApp", "no-code"],
  openGraph: {
    title: "LapakKilat — Toko Online Instan untuk UMKM",
    description:
      "Buat katalog online profesional dalam 5 menit. Gratis, tanpa coding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
