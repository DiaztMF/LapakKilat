import { getShopByUser, toggleShopPublishStatus } from "@/app/actions/shop";
import { getProducts } from "@/app/actions/product";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  Package, 
  ExternalLink, 
  Store, 
  ArrowRight, 
  Share2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { QuickShareButton } from "./_components/quick-share-button";
import { PublishToggleButton } from "./_components/publish-toggle-button";

export default async function DashboardPage() {
  const shop = await getShopByUser();
  if (!shop) {
    redirect("/");
  }

  const products = await getProducts();
  const productCount = products.length;

  const views = shop.views || 0;
  const whatsappClicks = shop.whatsappClicks || 0;
  const conversionRate = views > 0 ? ((whatsappClicks / views) * 100).toFixed(1) : "0";

  // Checklist logic
  const isProfileComplete = !!(shop.profileImage && shop.whatsapp && shop.slogan);
  const isProductAdded = productCount > 0;
  const isShopPublished = shop.isPublished;

  const steps = [
    {
      id: "profile",
      title: "Lengkapi Profil Toko",
      desc: "Tambahkan foto profil, slogan, dan nomor WhatsApp agar pembeli bisa menghubungi.",
      done: isProfileComplete,
      href: "/dashboard/profil"
    },
    {
      id: "product",
      title: "Tambah Produk Pertama",
      desc: "Masukkan minimal 1 produk beserta foto dan harga untuk mulai berjualan.",
      done: isProductAdded,
      href: "/dashboard/produk"
    },
    {
      id: "publish",
      title: "Publikasikan Tokomu",
      desc: "Aktifkan status publikasi agar katalog online bisa diakses oleh pelanggan.",
      done: isShopPublished,
      actionable: true
    }
  ];

  const completedStepsCount = steps.filter(s => s.done).length;
  const progressPercent = Math.round((completedStepsCount / steps.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome & Publish Status */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Halo, {shop.name} <span className="animate-pulse">👋</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Berikut adalah ringkasan performa katalog tokomu hari ini.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <PublishToggleButton initialPublished={shop.isPublished} />
          
          <a
            href={`/${shop.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat Toko
          </a>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card Views */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-emerald-500/10 to-teal-500/5 shadow-sm ring-1 ring-emerald-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Total Pengunjung
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Eye className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{views}</div>
            <p className="mt-1 text-xs text-gray-500">Total tayangan halaman toko</p>
          </CardContent>
        </Card>

        {/* Card Clicks */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-500/10 to-indigo-500/5 shadow-sm ring-1 ring-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
              Klik WhatsApp
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <MousePointerClick className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{whatsappClicks}</div>
            <p className="mt-1 text-xs text-gray-500">Pelanggan mengklik tombol WA</p>
          </CardContent>
        </Card>

        {/* Card Conversion */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-amber-500/10 to-orange-500/5 shadow-sm ring-1 ring-amber-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Tingkat Konversi
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{conversionRate}%</div>
            <p className="mt-1 text-xs text-gray-500">Persentase klik dibanding pengunjung</p>
          </CardContent>
        </Card>

        {/* Card Products */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-purple-500/10 to-pink-500/5 shadow-sm ring-1 ring-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-purple-800 uppercase tracking-wider">
              Total Produk
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{productCount}/20</div>
            <p className="mt-1 text-xs text-gray-500">Batas maksimal katalog gratis</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column: Chart & Quick Actions */}
        <div className="space-y-8 lg:col-span-2">
          {/* Visual SVG Chart Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Tren Kunjungan</CardTitle>
                  <CardDescription>Visualisasi aktivitas toko 7 hari terakhir (Ilustrasi)</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 font-medium">
                  Metrik Gabungan
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative h-48 w-full">
                {/* SVG Graph */}
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
                  
                  {/* Area */}
                  <path
                    d="M 0 100 L 0 75 Q 15 50 30 65 T 60 40 T 90 25 L 100 20 L 100 100 Z"
                    fill="url(#chartGradient)"
                  />
                  
                  {/* Line */}
                  <path
                    d="M 0 75 Q 15 50 30 65 T 60 40 T 90 25 L 100 20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Chart Points */}
                  <circle cx="30" cy="65" r="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
                  <circle cx="60" cy="40" r="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
                  <circle cx="90" cy="25" r="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
                </svg>
              </div>
              
              {/* X Axis labels */}
              <div className="mt-2 flex justify-between text-[10px] font-medium text-gray-400 px-1">
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
                <span>Ahd</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Pintasan Cepat</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/dashboard/produk"
                className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all hover:bg-emerald-50 hover:border-emerald-200"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform">
                  <Package className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-gray-900">Kelola Produk</span>
                <span className="mt-1 text-xs text-gray-500">Tambah atau edit katalog</span>
              </Link>

              <Link
                href="/dashboard/profil"
                className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all hover:bg-blue-50 hover:border-blue-200"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                  <Store className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-gray-900">Atur Tampilan</span>
                <span className="mt-1 text-xs text-gray-500">Ganti tema & info toko</span>
              </Link>

              <QuickShareButton storeUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/${shop.slug}`} />
            </CardContent>
          </Card>
        </div>

        {/* Right column: Checklist Setup */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg font-bold">Panduan Langkah Awal</CardTitle>
              </div>
              <CardDescription>
                Selesaikan langkah ini untuk mengoptimalkan penjualanmu.
              </CardDescription>
              
              {/* Progress bar */}
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Progres Setup</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-500 transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={cn(
                    "relative flex gap-3 rounded-lg border p-3.5 transition-colors",
                    step.done 
                      ? "border-emerald-100 bg-emerald-50/30" 
                      : "border-gray-100 bg-white"
                  )}
                >
                  <div className="shrink-0 mt-0.5">
                    {step.done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className={cn(
                      "text-sm font-semibold", 
                      step.done ? "text-emerald-900 line-through opacity-75" : "text-gray-900"
                    )}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                    
                    {!step.done && step.href && (
                      <Link 
                        href={step.href} 
                        className="mt-2 inline-flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Selesaikan Sekarang
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
