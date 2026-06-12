"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Zap,
  QrCode,
  MessageCircle,
  Smartphone,
  ArrowRight,
  Store,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Store,
    title: "Tanpa Coding",
    description:
      "Isi form sederhana, pilih desain, dan katalog online langsung jadi. Semudah mengisi biodata.",
  },
  {
    icon: QrCode,
    title: "QR Code Otomatis",
    description:
      "Dapatkan QR Code unik yang bisa dicetak dan ditempel di etalase toko atau gerobak.",
  },
  {
    icon: MessageCircle,
    title: "Checkout via WhatsApp",
    description:
      "Pelanggan langsung pesan lewat WhatsApp. Tidak perlu sistem pembayaran yang rumit.",
  },
  {
    icon: Smartphone,
    title: "Tampilan Mobile-First",
    description:
      "Katalog dioptimalkan untuk HP pelanggan. Cepat dibuka, mudah digunakan.",
  },
];

const steps = [
  { step: "1", text: "Masuk dengan akun Google" },
  { step: "2", text: "Isi profil toko & tambahkan produk" },
  { step: "3", text: "Bagikan link atau QR Code ke pelanggan" },
];

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = async () => {
    if (session) {
      router.push("/dashboard");
    } else {
      await signIn.social({ provider: "google", callbackURL: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Lapak<span className="text-emerald-600">Kilat</span>
            </span>
          </div>

          <button
            onClick={handleGetStarted}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-emerald-700 active:scale-95"
          >
            {session ? "Dashboard" : "Mulai Gratis"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 text-center sm:pt-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <Zap className="h-3.5 w-3.5" />
            Platform No-Code untuk UMKM
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Buat Toko Online{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              dalam 5 Menit
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Katalog online profesional untuk UMKM dan PKL. Gratis, tanpa
            coding, langsung checkout via WhatsApp.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleGetStarted}
              className="group flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-150 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 active:scale-95"
            >
              {session ? "Buka Dashboard" : "Mulai Gratis dengan Google"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            {["Gratis selamanya", "Tanpa kartu kredit", "Setup 5 menit"].map(
              (badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Semudah 1, 2, 3
            </h2>
            <p className="mt-3 text-gray-600">
              Dari nol sampai punya toko online, hanya butuh 3 langkah.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
                  {item.step}
                </div>
                <p className="text-base font-medium text-gray-900">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Fitur yang Kamu Butuhkan
            </h2>
            <p className="mt-3 text-gray-600">
              Semua yang diperlukan UMKM untuk go digital, tanpa ribet.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "group rounded-2xl border border-gray-100 p-6 transition-all duration-150",
                  "hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50"
                )}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Siap Go Digital?
          </h2>
          <p className="mt-3 text-gray-600">
            Bergabung dengan ribuan UMKM yang sudah menggunakan LapakKilat.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-150 hover:bg-emerald-700 active:scale-95"
          >
            Buat Toko Gratis Sekarang
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              LapakKilat
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            © 2026 LapakKilat. Dibuat untuk INF TECH FESTIVAL 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
