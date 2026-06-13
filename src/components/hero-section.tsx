import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
    onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-36 md:pb-24">
            {/* Background mesh glow effects */}
            <div
                aria-hidden
                className="absolute inset-0 isolate hidden opacity-50 contain-strict lg:blockpointer-events-none">
                <div className="absolute left-1/4 top-0 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100 blur-3xl opacity-60" />
                <div className="absolute right-1/4 top-1/4 w-80 h-80 rounded-full bg-teal-50 blur-3xl opacity-50" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 text-center">
                {/* Announcement Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Platform No-Code UMKM Indonesia
                </div>

                {/* Main Heading */}
                <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                    Buat Toko Online Anda{' '}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        dalam 5 Menit
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-gray-600 sm:text-lg md:text-xl leading-relaxed">
                    Katalog online profesional untuk pedagang, warung, resto, dan UMKM. Gratis selamanya, tanpa coding, langsung checkout via WhatsApp.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        onClick={onGetStarted}
                        className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-100 transition-all duration-150 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 active:scale-95 cursor-pointer w-full sm:w-auto"
                    >
                        Daftar Gratis Sekarang
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <a 
                        href="#how-it-works"
                        className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex items-center justify-center gap-2 rounded-xl px-6 py-6 text-base font-semibold text-gray-700 hover:bg-gray-50 border border-gray-100 transition-all duration-150 active:scale-95 w-full sm:w-auto")}
                    >
                        Pelajari Fitur
                    </a>
                </div>

                {/* Product/App Mockup Showcase */}
                <div className="relative mx-auto max-w-4xl mt-16 sm:mt-20">
                    <div className="relative rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl shadow-gray-200/60 ring-1 ring-gray-100">
                        <div className="overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                            <Image
                                className="w-full h-auto max-h-[500px] object-cover object-top hover:scale-[1.01] transition-transform duration-300"
                                src="/lapakkilat_mobile_mockup.png"
                                alt="LapakKilat Storefront Mockup"
                                width={1600}
                                height={1000}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
