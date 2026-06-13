import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-16 md:py-32 bg-gray-50 border-y border-gray-100">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-4xl space-y-4 text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">
                        Dibuat untuk UMKM, Dicintai Ribuan Pedagang
                    </h2>
                    <p className="text-gray-600">
                        Dengarkan kisah bagaimana LapakKilat membantu warung, resto, dan olshop kecil go digital dalam hitungan menit.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="flex flex-col justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <CardHeader className="p-0 mb-4">
                            <Quote className="h-8 w-8 text-emerald-500 opacity-50" />
                        </CardHeader>
                        <CardContent className="p-0 flex-1 flex flex-col justify-between">
                            <blockquote className="space-y-6 flex-1 flex flex-col justify-between">
                                <p className="text-gray-600 italic leading-relaxed">
                                    "Sebelumnya saya bingung kalau mau kirim daftar menu makanan lewat WhatsApp, harus ketik satu-satu. Sekarang tinggal kirim link LapakKilat, pelanggan langsung pilih dan pesan. Sangat praktis dan menghemat waktu!"
                                </p>

                                <div className="flex items-center gap-3 mt-4">
                                    <Avatar className="h-10 w-10 border border-emerald-100">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
                                            alt="Bu Susi"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>BS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-semibold text-gray-900 not-italic block">Bu Susi</cite>
                                        <span className="text-xs text-gray-500 block">Pemilik Warung Nasi Sederhana</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <CardHeader className="p-0 mb-4">
                            <Quote className="h-8 w-8 text-emerald-500 opacity-50" />
                        </CardHeader>
                        <CardContent className="p-0 flex-1 flex flex-col justify-between">
                            <blockquote className="space-y-6 flex-1 flex flex-col justify-between">
                                <p className="text-gray-600 italic leading-relaxed">
                                    "Bikin katalog online di sini beneran gratis dan gampang banget. Saya gaptek masalah coding, tapi dalam 5 menit toko baju saya langsung punya web profesional. Fitur QR Code-nya saya cetak lalu pajang di toko offline."
                                </p>

                                <div className="flex items-center gap-3 mt-4">
                                    <Avatar className="h-10 w-10 border border-emerald-100">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                                            alt="Pak Joko"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>PJ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-semibold text-gray-900 not-italic block">Pak Joko</cite>
                                        <span className="text-xs text-gray-500 block">Pemilik Toko Pakaian Lariz</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-2xl sm:col-span-2 lg:col-span-1">
                        <CardHeader className="p-0 mb-4">
                            <Quote className="h-8 w-8 text-emerald-500 opacity-50" />
                        </CardHeader>
                        <CardContent className="p-0 flex-1 flex flex-col justify-between">
                            <blockquote className="space-y-6 flex-1 flex flex-col justify-between">
                                <p className="text-gray-600 italic leading-relaxed">
                                    "Fitur checkout langsung masuk ke WhatsApp itu yang paling juara. Pelanggan gak ribet bikin akun dulu, pesanan masuk rapi beserta total harga. Sangat memudahkan operasional bisnis kue rumahan saya."
                                </p>

                                <div className="flex items-center gap-3 mt-4">
                                    <Avatar className="h-10 w-10 border border-emerald-100">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                                            alt="Larasati"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>LR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-semibold text-gray-900 not-italic block">Larasati</cite>
                                        <span className="text-xs text-gray-500 block">Co-Founder SweetBakes</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
