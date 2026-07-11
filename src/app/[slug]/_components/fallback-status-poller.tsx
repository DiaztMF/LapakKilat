"use client";

import { useEffect } from "react";

interface FallbackStatusPollerProps {
  shopSlug: string;
}

export function FallbackStatusPoller({ shopSlug }: FallbackStatusPollerProps) {
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/shop/${shopSlug}/status?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          // Jika toko sudah dipublikasikan kembali, pemicu reload halaman
          if (data.isPublished) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("Gagal memeriksa status toko secara berkala:", error);
      }
    };

    // Polling setiap 5 detik
    const intervalId = setInterval(checkStatus, 5000);

    // Ambil data instan jika user memfokuskan tab kembali
    const handleFocus = () => {
      checkStatus();
    };
    window.addEventListener("focus", handleFocus);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkStatus();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shopSlug]);

  return null;
}
