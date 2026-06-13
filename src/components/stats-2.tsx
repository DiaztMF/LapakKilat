export default function StatsSection() {
    return (
        <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-100">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-2xl space-y-4 text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl text-gray-900">LapakKilat dalam Angka</h2>
                    <p className="text-gray-600">
                        Kami berkomitmen membantu usaha kecil tumbuh dan bersaing di era digital dengan solusi no-code yang praktis, cepat, dan gratis.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-white border border-gray-100 rounded-2xl space-y-2 py-10 text-center shadow-sm">
                        <div className="text-4xl font-extrabold text-emerald-600 sm:text-5xl">+1.500</div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">UMKM Terdaftar</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl space-y-2 py-10 text-center shadow-sm">
                        <div className="text-4xl font-extrabold text-emerald-600 sm:text-5xl">&lt; 5 Menit</div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Setup Toko Online</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl space-y-2 py-10 text-center shadow-sm">
                        <div className="text-4xl font-extrabold text-emerald-600 sm:text-5xl">100%</div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Bebas Komisi</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
