'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Apakah membuat toko online di LapakKilat benar-benar gratis?',
            answer: 'Ya, 100% gratis selamanya untuk fitur dasar. Anda bisa membuat katalog online, memasukkan produk sebanyak yang Anda inginkan, mengunduh QR Code toko, dan langsung menerima checkout pesanan via WhatsApp tanpa biaya sepeser pun.',
        },
        {
            id: 'item-2',
            question: 'Bagaimana sistem pembayaran di LapakKilat?',
            answer: 'LapakKilat menggunakan metode "Checkout WhatsApp". Ketika pembeli menyelesaikan belanja, pesanan mereka dikirimkan otomatis dalam format teks rapi langsung ke nomor WhatsApp toko Anda. Anda dan pembeli dapat menyepakati metode pembayaran (Transfer bank, QRIS, e-wallet, atau Cash on Delivery) secara langsung tanpa perantara.',
        },
        {
            id: 'item-3',
            question: 'Apakah pelanggan saya harus mengunduh aplikasi LapakKilat?',
            answer: 'Tidak perlu. Katalog toko Anda berbasis web (cloud) yang sangat ringan dan ramah mobile. Pelanggan cukup mengetuk tautan katalog Anda (misal: lapakkilat.com/tokomu) atau memindai QR Code toko Anda untuk langsung mulai berbelanja melalui browser bawaan ponsel mereka.',
        },
        {
            id: 'item-4',
            question: 'Berapa banyak produk yang bisa saya unggah ke katalog?',
            answer: 'Bahkan di paket gratis sekalipun, Anda dibebaskan untuk menambahkan produk tanpa batasan jumlah (unlimited). Kami ingin memastikan setiap UMKM bisa memajang seluruh dagangannya tanpa khawatir batasan slot produk.',
        },
        {
            id: 'item-5',
            question: 'Bagaimana cara membagikan QR Code toko saya?',
            answer: 'Setelah toko Anda terbuat, sistem akan membuatkan QR Code unik secara otomatis. Anda dapat langsung mengunduhnya dari dashboard, lalu mencetaknya untuk ditempel di etalase, meja makan, gerobak, kemasan produk, atau dibagikan ke media sosial.',
        },
    ]

    return (
        <section id="faq" className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl text-gray-900">Pertanyaan yang Sering Diajukan</h2>
                    <p className="text-gray-600 mt-4 text-balance">Temukan jawaban cepat seputar cara kerja katalog WhatsApp LapakKilat.</p>
                </div>

                <div className="mx-auto mt-12 max-w-2xl">
                    <Accordion
                        className="bg-white ring-gray-100 w-full rounded-2xl border border-gray-100 px-8 py-3 shadow-sm ring-4">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed border-gray-100 py-2">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    <p className="text-sm leading-relaxed">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-gray-500 mt-6 text-center text-sm">
                        Masih punya pertanyaan lain? Hubungi{' '}
                        <Link
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            className="text-emerald-600 font-semibold hover:underline">
                            Layanan Pelanggan kami
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
