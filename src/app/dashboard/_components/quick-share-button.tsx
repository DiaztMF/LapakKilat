"use client";

import { useState, useRef } from "react";
import { Share2, Check, Copy, Download, Printer } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function QuickShareButton({ storeUrl }: { storeUrl: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = storeUrl.startsWith("/") ? `${baseUrl}${storeUrl}` : storeUrl;

  // Callback ref to ensure we draw the QR Code as soon as the canvas mounts in the DOM
  const setCanvasRef = (node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    if (node) {
      QRCode.toCanvas(node, fullUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#064e3b",
          light: "#ffffff",
        },
      }, (error) => {
        if (error) console.error("Error generating QR code:", error);
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Tautan toko berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin tautan.");
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) {
      toast.error("QR Code belum siap.");
      return;
    }
    try {
      const link = document.createElement("a");
      link.download = `qrcode-toko.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
      toast.success("QR Code berhasil diunduh!");
    } catch {
      toast.error("Gagal mengunduh QR Code.");
    }
  };

  const handlePrint = () => {
    if (!canvasRef.current) {
      toast.error("QR Code belum siap.");
      return;
    }
    try {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const windowContent = `
        <html>
          <head>
            <title>Cetak QR Code Toko</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: #1f2937;
              }
              .container {
                text-align: center;
                border: 1px solid #e5e7eb;
                padding: 30px;
                border-radius: 16px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
              }
              h1 {
                font-size: 20px;
                margin-bottom: 20px;
              }
              img {
                width: 250px;
                height: 250px;
              }
              p {
                margin-top: 20px;
                font-size: 14px;
                color: #4b5563;
                word-break: break-all;
                max-width: 300px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>QR Code Toko Anda</h1>
              <img src="${dataUrl}" />
              <p>${fullUrl}</p>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => {
                  window.close();
                }, 500);
              }
            </script>
          </body>
        </html>
      `;
      const printWindow = window.open("", "_blank", "width=600,height=600");
      if (printWindow) {
        printWindow.document.write(windowContent);
        printWindow.document.close();
      } else {
        toast.error("Gagal membuka jendela cetak. Pastikan pop-up diperbolehkan.");
      }
    } catch {
      toast.error("Gagal mencetak QR Code.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center transition-all hover:bg-purple-50 hover:border-purple-200 w-full cursor-pointer"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
              <Share2 className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Bagikan Toko</span>
            <span className="mt-1 text-xs text-gray-500">Salin link & QR Code</span>
          </button>
        }
      />
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bagikan Toko Anda</DialogTitle>
          <DialogDescription>
            Gunakan QR Code atau salin tautan di bawah ini untuk mempromosikan tokomu kepada pelanggan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-5 py-2">
          {/* QR Code Container */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-5 shadow-sm ring-1 ring-indigo-500/10">
            <canvas ref={setCanvasRef} className="mx-auto block bg-white rounded-lg p-2 shadow-inner" />
          </div>

          {/* Download & Print Buttons */}
          <div className="flex w-full gap-3">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex-1 gap-2 cursor-pointer h-10"
            >
              <Download className="h-4 w-4" />
              Unduh QR
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 gap-2 cursor-pointer h-10"
            >
              <Printer className="h-4 w-4" />
              Cetak QR
            </Button>
          </div>

          {/* URL Copy Input */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/70 p-2.5 shadow-inner">
            <span className="flex-1 break-all px-2 text-xs font-mono text-gray-600 select-all leading-normal">
              {fullUrl}
            </span>
            <Button
              onClick={handleCopy}
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-lg shrink-0 cursor-pointer"
              title="Salin Tautan"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

