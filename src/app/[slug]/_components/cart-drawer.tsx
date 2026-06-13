"use client";

import { useState, useEffect } from "react";
import { cn, formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { compileWhatsAppCheckout } from "@/lib/whatsapp";
import type { TemplateTokens, TemplatePreset } from "@/lib/template-presets";
import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { incrementWhatsAppClicks } from "@/app/actions/shop";

interface CartDrawerProps {
  shopId: string;
  shopName: string;
  shopWhatsapp: string;
  tokens: TemplateTokens;
  preset: TemplatePreset;
}

export function CartDrawer({
  shopId,
  shopName,
  shopWhatsapp,
  tokens,
  preset,
}: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const buyerName = useCartStore((state) => state.buyerName);
  const setBuyerName = useCartStore((state) => state.setBuyerName);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Listen for open-cart-drawer event from FloatingCart
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-cart-drawer", handleOpen);
    return () => window.removeEventListener("open-cart-drawer", handleOpen);
  }, []);

  const handleCheckout = () => {
    if (!buyerName.trim()) {
      alert("Silakan masukkan nama pemesan.");
      return;
    }

    if (!shopWhatsapp) {
      alert("Nomor WhatsApp toko belum diatur.");
      return;
    }

    // Record click in background
    incrementWhatsAppClicks(shopId).catch((err) => {
      console.error("Gagal mencatat klik WA:", err);
    });

    const url = compileWhatsAppCheckout({
      shopName,
      shopWhatsapp,
      buyerName: buyerName.trim(),
      items,
    });

    window.open(url, "_blank");
    clearCart();
    setIsOpen(false);
  };

  // Background overlay
  const drawerBg =
    preset === "minimalist" ? "bg-zinc-900" : "bg-white";
  const drawerBorder =
    preset === "minimalist"
      ? "border-zinc-800"
      : "border-gray-200";
  const inputBg =
    preset === "minimalist"
      ? "bg-zinc-800 border-zinc-700 text-zinc-50 placeholder:text-zinc-500"
      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md transform transition-transform duration-200 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full",
          drawerBg,
          "rounded-t-2xl border-t",
          drawerBorder
        )}
        style={{ maxHeight: "85vh" }}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b px-4 py-3",
            drawerBorder
          )}
        >
          <h2 className={cn("text-lg font-bold", tokens.text)}>
            Keranjang Belanja
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className={cn(
              "rounded-full p-2 transition-colors h-9 w-9",
              preset === "minimalist"
                ? "hover:bg-zinc-800"
                : "hover:bg-gray-100"
            )}
          >
            <X className={cn("h-5 w-5", tokens.muted)} />
          </Button>
        </div>

        {/* Items */}
        <div className="max-h-[45vh] overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <p className={cn("py-8 text-center text-sm", tokens.muted)}>
              Keranjang kosong.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3",
                    drawerBorder
                  )}
                >
                  {/* Item Image */}
                  {item.image && (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Item Info */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={cn(
                        "truncate text-sm font-semibold",
                        tokens.text
                      )}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        preset === "fresh"
                          ? "text-emerald-600"
                          : preset === "playful"
                            ? "text-rose-500"
                            : "text-zinc-300"
                      )}
                    >
                      {formatRupiah(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
                        drawerBorder,
                        preset === "minimalist"
                          ? "hover:bg-zinc-800"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <Minus className={cn("h-3 w-3", tokens.muted)} />
                    </Button>
                    <span
                      className={cn(
                        "w-6 text-center text-sm font-semibold",
                        tokens.text
                      )}
                    >
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
                        drawerBorder,
                        preset === "minimalist"
                          ? "hover:bg-zinc-800"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <Plus className={cn("h-3 w-3", tokens.muted)} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.productId)}
                      className="ml-1 rounded-md p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className={cn(
              "border-t px-4 py-4 space-y-3",
              drawerBorder
            )}
          >
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className={cn("text-sm font-medium", tokens.muted)}>
                Total
              </span>
              <span className={cn("text-lg font-bold", tokens.text)}>
                {formatRupiah(getTotalPrice())}
              </span>
            </div>

            {/* Nama Pemesan */}
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Nama Pemesan"
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2",
                inputBg,
                tokens.inputFocus
              )}
            />

            {/* Checkout Button */}
            <Button
              variant="default"
              onClick={handleCheckout}
              disabled={!buyerName.trim()}
              className={cn(
                "flex w-full items-center justify-center gap-2 py-6 text-base font-semibold transition-all duration-150 ease-in-out active:scale-95 disabled:opacity-50",
                tokens.radius,
                "bg-green-500 text-white hover:bg-green-600"
              )}
            >
              <MessageCircle className="h-5 w-5" />
              Pesan via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
