import React from 'react'

const steps = [
    {
        step: "1",
        title: "Masuk dengan Google",
        description: "Login cepat satu klik menggunakan akun Google Anda untuk memulai tanpa registrasi berbelit.",
        illustration: (
            <div className="relative h-32 w-44 mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-center items-center p-4">
                {/* Mini Card Header */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-emerald-700">LK</span>
                    </div>
                    <div className="h-1.5 w-12 bg-gray-200 rounded"></div>
                </div>
                {/* Google Login Button Mockup */}
                <div className="w-full py-1.5 px-3 border border-gray-200 rounded-lg flex items-center justify-center gap-2 bg-gray-50/50">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span className="text-[9px] font-semibold text-gray-650">Masuk dengan Google</span>
                </div>
            </div>
        )
    },
    {
        step: "2",
        title: "Setup Toko & Produk",
        description: "Isi profil nama toko, alamat dasar, dan tambahkan beberapa produk unggulan Anda.",
        illustration: (
            <div className="relative h-32 w-44 mx-auto flex items-center justify-center">
                {/* Card 1 (Back Left) */}
                <div className="absolute w-24 h-24 bg-white border border-gray-100 rounded-xl shadow-xs -rotate-12 -translate-x-6 scale-90 p-2 flex flex-col justify-between opacity-50">
                    <div className="h-10 bg-gray-100 rounded"></div>
                    <div className="h-1.5 w-10 bg-gray-300 rounded"></div>
                    <div className="h-2 w-6 bg-emerald-500 rounded"></div>
                </div>
                {/* Card 2 (Back Right) */}
                <div className="absolute w-24 h-24 bg-white border border-gray-100 rounded-xl shadow-xs rotate-12 translate-x-6 scale-90 p-2 flex flex-col justify-between opacity-50">
                    <div className="h-10 bg-gray-100 rounded"></div>
                    <div className="h-1.5 w-10 bg-gray-300 rounded"></div>
                    <div className="h-2 w-6 bg-emerald-500 rounded"></div>
                </div>
                {/* Card 3 (Center Front) */}
                <div className="absolute w-28 h-26 bg-white border border-gray-100 rounded-xl shadow-md z-10 p-2 flex flex-col justify-between">
                    <div className="h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <span className="text-[18px]">☕</span>
                    </div>
                    <div className="space-y-1">
                        <div className="h-2 w-14 bg-gray-700 rounded"></div>
                        <div className="h-1.5 w-8 bg-gray-400 rounded"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-emerald-600">Rp 15.000</span>
                        <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1 rounded font-semibold">Toko</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        step: "3",
        title: "Bagikan & Jual",
        description: "Bagikan link toko atau pasang QR Code di etalase Anda untuk mulai menerima orderan langsung ke WhatsApp.",
        illustration: (
            <div className="relative h-32 w-44 mx-auto flex items-center justify-center gap-3">
                {/* Card 1: Share Link */}
                <div className="w-20 h-28 bg-white border border-gray-100 rounded-xl shadow-sm p-2 flex flex-col justify-between">
                    <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600 font-semibold text-xs">
                        🔗
                    </div>
                    <div className="space-y-1">
                        <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                        <div className="h-1.5 w-10 bg-gray-200 rounded mx-auto"></div>
                    </div>
                    <div className="h-4 w-full bg-emerald-600 text-white rounded-md flex items-center justify-center text-[7px] font-semibold">
                        Bagikan Link
                    </div>
                </div>
                {/* Card 2: QR Code Print */}
                <div className="w-20 h-28 bg-white border border-gray-100 rounded-xl shadow-sm p-2 flex flex-col justify-between">
                    <div className="h-7 w-7 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 font-semibold text-xs">
                        📱
                    </div>
                    <div className="space-y-1">
                        <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                        <div className="h-1.5 w-10 bg-gray-200 rounded mx-auto"></div>
                    </div>
                    <div className="h-4 w-full bg-emerald-500 text-white rounded-md flex items-center justify-center text-[7px] font-semibold">
                        Terima Order
                    </div>
                </div>
            </div>
        )
    }
]

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-30 bg-gray-50 border-b border-gray-100">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mx-auto max-w-3xl space-y-4">
                    <h2 className="text-3xl font-bold lg:text-4xl text-gray-900 tracking-tight">
                        Semudah 3 Langkah Praktis
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">
                        Dari nol sampai punya toko online instan, hanya butuh waktu kurang dari 5 menit.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
                    {steps.map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center space-y-6">
                            {/* Step Badge */}
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                                {item.step}
                            </div>

                            {/* Custom Illustration Container */}
                            <div className="h-36 flex items-center justify-center w-full">
                                {item.illustration}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2 max-w-xs">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {item.description}
                                </p>
                            </div>

                            {/* Arrow Indicator Connector (shown on Desktop only) */}
                            {index < 2 && (
                                <div className="hidden md:flex absolute top-[6.5rem] right-[-1.5rem] z-20 text-gray-300 pointer-events-none">
                                    <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
