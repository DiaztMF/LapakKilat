"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { toast } from "sonner";

export function QuickShareButton({ storeUrl }: { storeUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      toast.success("Tautan toko berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin tautan.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all hover:bg-purple-50 hover:border-purple-200 w-full"
    >
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
        {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Share2 className="h-5 w-5" />}
      </div>
      <span className="text-sm font-semibold text-gray-900">Bagikan Toko</span>
      <span className="mt-1 text-xs text-gray-500">Salin link untuk promosi</span>
    </button>
  );
}
