import { Card } from '@/components/ui/card'
import {
  Sparkles,
  QrCode,
  Smartphone,
  MessageCircle,
  Store,
  CreditCard,
} from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-30 border-b border-gray-100">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative z-10 mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">
            Fitur yang Kamu Butuhkan
          </h2>
          <p className="text-gray-650 max-w-xl mx-auto">
            Semua yang diperlukan UMKM untuk go digital, tanpa ribet.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {/* Card 1: Tanpa Coding */}
          <Card
            variant="outline"
            className="row-span-2 grid grid-rows-subgrid border border-gray-100 p-6 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50/50 transition-all duration-300 group"
          >
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold text-lg group-hover:text-emerald-700 transition-colors">
                Tanpa Coding
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Isi form sederhana, pilih desain, dan katalog online langsung jadi. Semudah mengisi biodata.
              </p>
            </div>
            <div
              aria-hidden
              className="flex h-44 flex-col justify-between pt-8"
            >
              {/* Row 1 */}
              <div className="relative flex h-10 items-center justify-between px-6">
                <div className="bg-gray-100 absolute inset-x-6 my-auto h-px"></div>

                <div className="bg-white border border-gray-100 relative flex h-8 items-center gap-1.5 rounded-full px-2.5 shadow-sm">
                  <Store className="size-3.5 text-emerald-600" />
                  <span className="text-[10px] font-semibold text-gray-500">1. Buat Toko</span>
                </div>
                <div className="bg-white border border-gray-100 relative flex h-8 items-center gap-1.5 rounded-full px-2.5 shadow-sm">
                  <Smartphone className="size-3.5 text-emerald-650" />
                  <span className="text-[10px] font-semibold text-gray-500">2. Katalog HP</span>
                </div>
              </div>
              {/* Row 2 */}
              <div className="relative flex h-10 items-center justify-between pl-12 pr-6">
                <div className="bg-gray-100 absolute inset-x-6 my-auto h-px"></div>

                <div className="bg-white border border-gray-100 relative flex h-8 items-center gap-1.5 rounded-full px-2.5 shadow-sm">
                  <QrCode className="size-3.5 text-emerald-600" />
                  <span className="text-[10px] font-semibold text-gray-500">3. Cetak QR</span>
                </div>
                <div className="bg-white border border-gray-100 relative flex h-8 items-center gap-1.5 rounded-full px-2.5 shadow-sm">
                  <MessageCircle className="size-3.5 text-emerald-650" />
                  <span className="text-[10px] font-semibold text-gray-500">4. Pesanan WA</span>
                </div>
              </div>
              {/* Row 3 */}
              <div className="relative flex h-10 items-center justify-between px-8">
                <div className="bg-gray-100 absolute inset-x-8 my-auto h-px"></div>

                <div className="bg-white border border-gray-100 relative flex h-8 items-center gap-1.5 rounded-full px-2.5 shadow-sm">
                  <CreditCard className="size-3.5 text-emerald-600" />
                  <span className="text-[10px] font-semibold text-gray-500">Bebas Komisi</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 relative flex h-8 items-center gap-1.5 rounded-full px-2.5 shadow-sm">
                  <Sparkles className="size-3.5 text-emerald-650 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700">Go Digital!</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: QR Code Otomatis */}
          <Card
            variant="outline"
            className="row-span-2 grid grid-rows-subgrid overflow-hidden border border-gray-100 p-6 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50/50 transition-all duration-300 group"
          >
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold text-lg group-hover:text-emerald-700 transition-colors">
                QR Code Otomatis
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dapatkan QR Code unik yang bisa dicetak dan ditempel di etalase toko atau gerobak.
              </p>
            </div>
            <div
              aria-hidden
              className="relative h-44 translate-y-6"
            >
              <div className="bg-gray-100 absolute inset-0 mx-auto w-px"></div>
              <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border border-gray-50"></div>
              <div className="border-emerald-500/10 absolute -inset-x-16 top-6 aspect-square rounded-full border"></div>
              <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border border-gray-50"></div>
              <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border border-emerald-500/20"></div>

              {/* Central QR Code Container */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white ring-8 ring-emerald-50/50 p-3 rounded-2xl shadow-md border border-emerald-100 flex items-center justify-center">
                <QrCode className="size-10 text-emerald-600" />
              </div>
            </div>
          </Card>

          {/* Card 3: Tampilan Mobile-First */}
          <Card
            variant="outline"
            className="row-span-2 grid grid-rows-subgrid overflow-hidden border border-gray-100 p-6 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50/50 transition-all duration-300 group"
          >
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold text-lg group-hover:text-emerald-700 transition-colors">
                Tampilan Mobile-First
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Katalog dioptimalkan untuk HP pelanggan. Cepat dibuka, mudah digunakan.
              </p>
            </div>
            <div
              aria-hidden
              className="relative h-44 overflow-hidden mt-4 flex items-end justify-center"
            >
              {/* Phone container */}
              <div className="w-44 h-56 rounded-t-2xl border-t-8 border-x-8 border-gray-900 bg-gray-50 p-2 shadow-lg relative translate-y-6 transition-transform duration-300 hover:translate-y-3">
                {/* Speaker notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-900 rounded-full"></div>

                {/* Content mockup */}
                <div className="space-y-2.5 mt-2.5">
                  {/* Header */}
                  <div className="flex justify-between items-center px-1">
                    <div className="h-2.5 w-12 bg-emerald-200 rounded"></div>
                    <div className="h-3.5 w-3.5 bg-emerald-500 rounded-full"></div>
                  </div>

                  {/* Promo Banner */}
                  <div className="h-10 bg-emerald-100/50 rounded-lg flex items-center justify-center px-2">
                    <div className="h-1.5 w-full bg-emerald-500/20 rounded"></div>
                  </div>

                  {/* Grid Products */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                      <div className="h-10 bg-gray-100 rounded"></div>
                      <div className="h-1 w-8 bg-gray-400 rounded mt-1"></div>
                      <div className="h-1.5 w-5 bg-emerald-600 rounded mt-0.5"></div>
                    </div>
                    <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                      <div className="h-10 bg-gray-100 rounded"></div>
                      <div className="h-1 w-8 bg-gray-400 rounded mt-1"></div>
                      <div className="h-1.5 w-5 bg-emerald-600 rounded mt-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 4: Checkout via WhatsApp */}
          <Card
            variant="outline"
            className="row-span-2 grid grid-rows-subgrid overflow-hidden border border-gray-100 p-6 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50/50 transition-all duration-300 group"
          >
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold text-lg group-hover:text-emerald-700 transition-colors">
                Checkout via WhatsApp
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pelanggan langsung pesan lewat WhatsApp. Tidak perlu sistem pembayaran yang rumit.
              </p>
            </div>
            <div
              aria-hidden
              className="relative flex flex-col gap-2 p-3 bg-emerald-50/20 rounded-2xl border border-emerald-100/30 h-44 overflow-hidden mt-4"
            >
              {/* Chat 1: Customer */}
              <div className="self-start max-w-[85%] bg-white rounded-2xl rounded-tl-none p-2.5 text-xs text-gray-700 shadow-sm border border-gray-100">
                <p className="font-semibold text-emerald-600 mb-0.5 flex items-center gap-1">
                  <MessageCircle className="size-3 text-emerald-600 fill-emerald-600/10" />
                  Pelanggan
                </p>
                Kak, saya mau pesan Kopi Susu Gula Aren 2 cup ya. Kirim ke Jl. Sudirman No. 10.
              </div>
              {/* Chat 2: Automated response / Seller */}
              <div className="self-end max-w-[85%] bg-emerald-600 text-white rounded-2xl rounded-tr-none p-2.5 text-xs shadow-sm">
                <p className="font-semibold text-emerald-100 mb-0.5 flex items-center gap-1">
                  <Store className="size-3 text-emerald-100" />
                  Toko Anda
                </p>
                Baik Kak! Totalnya Rp 30.000. Pesanan sudah masuk ke WhatsApp dan sedang kami proses ya!
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
