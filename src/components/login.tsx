"use client";

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        await signIn.email({
            email,
            password,
            rememberMe,
            callbackURL: "/",
            fetchOptions: {
                onSuccess: () => {
                    router.push('/')
                },
                onError: (ctx) => {
                    let errMsg = 'Gagal masuk. Periksa kembali email dan kata sandi Anda.';
                    const message = ctx.error.message?.toLowerCase() || '';
                    if (message.includes('invalid email or password') || message.includes('invalid credentials') || message.includes('wrong password')) {
                        errMsg = 'Email atau kata sandi salah. Silakan coba lagi.';
                    } else if (message.includes('user not found') || message.includes('does not exist')) {
                        errMsg = 'Akun dengan email ini tidak ditemukan.';
                    } else if (ctx.error.message) {
                        errMsg = ctx.error.message;
                    }
                    setError(errMsg)
                    setIsLoading(false)
                }
            }
        })
    }

    const handleGoogleLogin = async () => {
        await signIn.social({
            provider: 'google',
            callbackURL: "/"
        })
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-8 md:py-16 dark:bg-transparent">
            <form
                onSubmit={handleSubmit}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-md border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px  border p-8 pb-6">
                    <div className="text-center">
                        <h1 className="mb-1 text-xl font-semibold">Masuk ke LapakKilat</h1>
                        <p className="text-sm text-gray-500">Selamat datang kembali! Masuk untuk melanjutkan</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                className="focus-visible:ring-emerald-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-sm font-medium">
                                    Kata Sandi
                                </Label>
                                <Link
                                    href="#"
                                    className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-4">
                                    Lupa Kata Sandi?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="focus-visible:ring-emerald-500"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                            />
                            <label
                                htmlFor="rememberMe"
                                className="text-sm font-medium leading-none text-gray-700 cursor-pointer select-none">
                                Ingat saya
                            </label>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <Button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors duration-150 active:scale-95 disabled:opacity-70">
                            {isLoading ? 'Memproses...' : 'Masuk'}
                        </Button>
                    </div>

                    <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed border-gray-200" />
                        <span className="text-muted-foreground text-xs text-gray-500">Atau masuk dengan</span>
                        <hr className="border-dashed border-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full font-medium hover:bg-gray-50 transition-colors duration-150 active:scale-95">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2em"
                                height="1.2em"
                                viewBox="0 0 256 262"
                                className="mr-2">
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span>Google</span>
                        </Button>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-gray-600 text-center text-sm">
                        Belum punya akun?
                        <Link
                            href="/sign-up"
                            className="px-2 text-emerald-600 hover:text-emerald-700 font-semibold hover:underline underline-offset-4">
                            Daftar
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}