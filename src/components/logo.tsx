import React from 'react'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2 select-none", className)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shrink-0">
                <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
                Lapak<span className="text-emerald-600">Kilat</span>
            </span>
        </div>
    )
}
