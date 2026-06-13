"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface QrCodeSectionProps {
  slug: string;
  isPublished: boolean;
}

export function QrCodeSection({ slug, isPublished }: QrCodeSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const storeUrl = `${baseUrl}/${slug}`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, storeUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#064e3b",
          light: "#ffffff",
        },
      });
    }
  }, [storeUrl]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `qr-${slug}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("QR Code berhasil diunduh!");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      toast.success("URL berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin URL.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">QR Code Toko</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {/* QR Canvas */}
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <canvas ref={canvasRef} />
        </div>

        {/* Store URL */}
        <div className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-3">
          <code className="flex-1 truncate text-sm text-gray-700">
            {storeUrl}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 h-8 w-8"
            title="Salin URL"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-2">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            Unduh QR Code
          </Button>

          {isPublished && (
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100")}
            >
              <ExternalLink className="h-4 w-4" />
              Lihat Toko
            </a>
          )}
        </div>

        {!isPublished && (
          <p className="text-center text-xs text-amber-600">
            Simpan profil toko terlebih dahulu untuk mengaktifkan katalog.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
