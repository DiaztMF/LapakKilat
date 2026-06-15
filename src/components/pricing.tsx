import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface PricingProps {
    onGetStarted: () => void;
}

export default function Pricing({ onGetStarted }: PricingProps) {
    return (
        <section id="pricing" className="py-16 md:py-32 bg-white">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-4 text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">Pilihan Paket Transparan</h2>
                    <p className="text-gray-600">Mulai buat katalog online secara gratis. Tingkatkan fitur toko Anda saat bisnis Anda semakin bertumbuh.</p>
                </div>

                <div className="mt-8 grid gap-8 md:mt-20 md:grid-cols-3">
                    {/* Free Plan */}
                    <Card className="flex flex-col justify-between border border-gray-100 shadow-sm rounded-2xl p-6 bg-white">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="font-semibold text-xl text-gray-900">Gratis Selamanya</CardTitle>
                            <span className="my-3 block text-3xl font-bold text-gray-900">Rp 0 <span className="text-sm font-normal text-gray-500">/ bulan</span></span>
                            <CardDescription className="text-sm text-gray-500">Cocok untuk pedagang kecil, gerobak, dan pemula.</CardDescription>
                            <Button 
                                variant="outline"
                                onClick={onGetStarted}
                                className="mt-6 w-full cursor-pointer"
                            >
                                Mulai Gratis
                            </Button>
                        </CardHeader>

                        <CardContent className="p-0 flex-1">
                            <hr className="border-dashed border-gray-100 my-6" />
                            <ul className="list-outside space-y-3 text-sm text-gray-600">
                                {[
                                    '1 Katalog Online Aktif',
                                    'Maksimal 20 Produk Aktif',
                                    'Batas Upload Gambar 2MB',
                                    'Checkout WhatsApp Langsung',
                                    'QR Code Toko Otomatis',
                                    '3 Pilihan Desain Preset'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
 
                    {/* Pro Plan */}
                    <Card className="relative flex flex-col justify-between border border-emerald-500 shadow-md rounded-2xl p-6 bg-white ring-1 ring-emerald-500">
                        <span className="absolute inset-x-0 -top-3.5 mx-auto flex h-7 w-fit items-center rounded-full bg-emerald-600 px-4 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                            Paling Populer
                        </span>
 
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="font-semibold text-xl text-gray-900 flex items-center justify-between">
                                <span>Paket Pro</span>
                                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-normal normal-case leading-none">Segera Hadir</span>
                            </CardTitle>
                            <span className="my-3 block text-3xl font-bold text-gray-900">Rp 50.000 <span className="text-sm font-normal text-gray-500">/ bulan</span></span>
                            <CardDescription className="text-sm text-gray-500">Untuk bisnis berkembang yang ingin terlihat profesional.</CardDescription>
                            <Button 
                                variant="default"
                                onClick={onGetStarted}
                                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                            >
                                Daftar Sekarang
                            </Button>
                        </CardHeader>
 
                        <CardContent className="p-0 flex-1">
                            <hr className="border-dashed border-gray-100 my-6" />
                            <ul className="list-outside space-y-3 text-sm text-gray-600">
                                {[
                                    'Semua fitur di paket Gratis',
                                    'Custom Domain (.com / .id / .store)',
                                    'Hapus Watermark LapakKilat',
                                    'Statistik Pengunjung Toko',
                                    'Template Katalog Premium',
                                    'Dukungan WA Prioritas'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
 
                    {/* Enterprise Plan */}
                    <Card className="flex flex-col justify-between border border-gray-100 shadow-sm rounded-2xl p-6 bg-white">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="font-semibold text-xl text-gray-900 flex items-center justify-between">
                                <span>Kustom / Agen</span>
                                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-normal normal-case leading-none">Segera Hadir</span>
                            </CardTitle>
                            <span className="my-3 block text-3xl font-bold text-gray-900">Hubungi Kami</span>
                            <CardDescription className="text-sm text-gray-500">Untuk kemitraan UMKM binaan atau multi-cabang.</CardDescription>
                            <Button 
                                variant="outline"
                                onClick={onGetStarted}
                                className="mt-6 w-full cursor-pointer"
                            >
                                Hubungi Tim
                            </Button>
                        </CardHeader>

                        <CardContent className="p-0 flex-1">
                            <hr className="border-dashed border-gray-100 my-6" />
                            <ul className="list-outside space-y-3 text-sm text-gray-600">
                                {[
                                    'Semua fitur di paket Pro',
                                    'Multi-Admin WhatsApp Checkout',
                                    'Manajemen Inventori & Stok',
                                    'Sistem Kasir POS Sederhana',
                                    'Pendampingan Onboarding Toko',
                                    'Pelatihan Bisnis Digital UMKM'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-4 text-emerald-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
