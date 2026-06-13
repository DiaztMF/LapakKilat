'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Cara Kerja', href: '#how-it-works' },
    { name: 'Fitur', href: '#features' },
    { name: 'Harga', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
]

interface HeroHeaderProps {
    session: any;
    onGetStarted: () => void;
}

export const HeroHeader = ({ session, onGetStarted }: HeroHeaderProps) => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full px-2 top-0 transition-all duration-300">
                <div className={cn(
                    'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', 
                    isScrolled ? 'bg-white/80 max-w-4xl rounded-2xl border border-gray-100 backdrop-blur-lg lg:px-5 shadow-sm' : 'bg-transparent border-transparent'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Tutup Menu' : 'Buka Menu'}
                                className="relative z-50 -m-2.5 -mr-4 flex cursor-pointer p-2.5 lg:hidden text-gray-700 hover:text-gray-900 active:scale-95 transition-all">
                                {menuState ? <X className="size-6 animate-in fade-in zoom-in duration-200" /> : <Menu className="size-6 animate-in fade-in zoom-in duration-200" />}
                            </Button>
                        </div>

                        {/* Desktop Menu */}
                        <div className="absolute inset-x-0 mx-auto hidden w-fit lg:block">
                            <ul className="flex gap-8 text-sm font-medium">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-600 hover:text-emerald-600 block transition-colors duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation Actions */}
                        <div className={cn(
                            "mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
                            menuState && "block absolute top-16 left-0 right-0 z-40"
                        )}>
                            <div className="lg:hidden w-full">
                                <ul className="space-y-6 text-base font-medium mb-6">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMenuState(false)}
                                                className="text-gray-600 hover:text-emerald-600 block transition-colors duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                {session ? (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            setMenuState(false);
                                            onGetStarted();
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95 transition-all duration-150 rounded-lg min-h-[44px] px-5 text-sm font-semibold"
                                    >
                                        Dashboard
                                    </Button>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setMenuState(false)}
                                            className="inline-flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-150 rounded-lg min-h-[44px] px-5 text-sm font-semibold border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Masuk
                                        </Link>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => {
                                                setMenuState(false);
                                                onGetStarted();
                                            }}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95 transition-all duration-150 rounded-lg min-h-[44px] px-5 text-sm font-semibold"
                                        >
                                            Daftar Gratis
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}