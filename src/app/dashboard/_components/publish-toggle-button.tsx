"use client";

import { useState } from "react";
import { toggleShopPublishStatus } from "@/app/actions/shop";
import { toast } from "sonner";
import { Loader2, Globe, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function PublishToggleButton({ 
  initialPublished 
}: { 
  initialPublished: boolean 
}) {
  const [published, setPublished] = useState(initialPublished);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const result = await toggleShopPublishStatus();
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        setPublished(!!result.isPublished);
        toast.success(
          result.isPublished 
            ? "Toko berhasil dipublikasikan! Tokomu sekarang aktif secara publik." 
            : "Toko berhasil diubah menjadi Draft. Tokomu sekarang tidak aktif secara publik."
        );
      }
    } catch {
      toast.error("Gagal memperbarui status publikasi toko.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        published 
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80" 
          : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : published ? (
        <Globe className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
      {published ? "Toko Aktif" : "Aktifkan Toko"}
    </button>
  );
}
