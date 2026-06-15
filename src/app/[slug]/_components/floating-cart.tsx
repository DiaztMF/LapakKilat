"use client";

import { cn, formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { TemplateTokens, TemplatePreset } from "@/lib/template-presets";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingCartProps {
  tokens: TemplateTokens;
  preset: TemplatePreset;
}

export function FloatingCart({ tokens, preset }: FloatingCartProps) {
  const items = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (items.length === 0) return null;

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-cart-drawer"));
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 flex w-11/12 max-w-sm md:w-80 items-center justify-between px-5 py-6 text-sm font-semibold shadow-lg transition-all duration-150 ease-in-out active:scale-95",
        tokens.radius === "rounded-none" ? "rounded-none" : "rounded-2xl",
        tokens.accent,
        tokens.accentText,
        tokens.accentHover
      )}
    >
      <span className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5" />
        <span>{getTotalItems()} Item</span>
      </span>
      <span className="font-bold">{formatRupiah(getTotalPrice())}</span>
    </Button>
  );
}
