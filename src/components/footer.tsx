import Link from 'next/link'
import { Logo } from '@/components/logo'

const links = [
    {
        title: 'Cara Kerja',
        href: '#how-it-works',
    },
    {
        title: 'Fitur',
        href: '#features',
    },
    {
        title: 'Harga',
        href: '#pricing',
    },
    {
        title: 'FAQ',
        href: '#faq',
    },
]

export default function FooterSection() {
    return (
        <footer className="border-t border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-3 order-last md:order-first">
                        <span className="text-gray-500 text-xs">
                            © 2026 LapakKilat. Hak Cipta Dilindungi.
                        </span>
                    </div>

                    {/* Right: Section Links */}
                    <div className="order-first md:order-last flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-gray-500 hover:text-emerald-600 font-medium duration-150 transition-colors">
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}