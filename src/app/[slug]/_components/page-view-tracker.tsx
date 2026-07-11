"use client";

import { useEffect } from "react";
import { incrementShopViews } from "@/app/actions/shop";

interface PageViewTrackerProps {
  shopId: string;
}

export function PageViewTracker({ shopId }: PageViewTrackerProps) {
  useEffect(() => {
    // Jalankan increment kunjungan hanya saat halaman benar-benar ter-mount di browser
    incrementShopViews(shopId).catch((err) => {
      console.error("Gagal mencatat kunjungan toko di client:", err);
    });
  }, [shopId]);

  return null;
}
