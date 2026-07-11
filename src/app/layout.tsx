import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
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
        <NextTopLoader
          color="#059669"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #059669,0 0 5px #059669"
        />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
