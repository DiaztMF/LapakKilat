import React from 'react'
import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2 select-none", className)}>
            <div className="flex h-8 w-8 items-center justify-center shrink-0">
                <img src="/logoicon.svg" alt="LapakKilat Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-gray-900">
                Lapak<span className="text-emerald-600">Kilat</span>
            </span>
        </div>
    )
}
