import React from 'react'
import { Zap } from 'lucide-react'

export const Logo = () => {
    return (
        <div className="flex items-center gap-2 select-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
                Lapak<span className="text-emerald-600">Kilat</span>
            </span>
        </div>
    )
}
