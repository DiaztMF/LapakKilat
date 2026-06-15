"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn, formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { TemplateTokens, TemplatePreset } from "@/lib/template-presets";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image: string | null;
}

interface ProductGridProps {
  products: Product[];
  tokens: TemplateTokens;
  preset: TemplatePreset;
}

export function ProductGrid({ products, tokens, preset }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const addItem = useCartStore((state) => state.addItem);

  // Listen for category changes from CategoryTabs
  useEffect(() => {
    const handleCategoryChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setActiveCategory(customEvent.detail);
    };

    window.addEventListener("category-change", handleCategoryChange);
    return () =>
      window.removeEventListener("category-change", handleCategoryChange);
  }, []);

  const filteredProducts =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <ShoppingCart className={cn("h-12 w-12 mb-3", tokens.muted)} />
        <p className={cn("text-sm", tokens.muted)}>
          Belum ada produk di kategori ini.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 px-4 pb-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className={cn(
            "overflow-hidden transition-all duration-150",
            tokens.radius,
            tokens.cardBorder,
            tokens.shadow,
            preset === "playful" ? tokens.canvas : ""
          )}
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 448px) 50vw, 224px"
                className="object-cover"
              />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center",
                  preset === "minimalist"
                    ? "bg-zinc-900"
                    : "bg-gray-100"
                )}
              >
                <ShoppingCart
                  className={cn(
                    "h-8 w-8",
                    preset === "minimalist"
                      ? "text-zinc-700"
                      : "text-gray-300"
                  )}
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 md:p-2.5">
            <h3
              className={cn(
                "line-clamp-1 text-sm font-semibold",
                tokens.text
              )}
            >
              {product.name}
            </h3>

            {product.category && (
              <span
                className={cn(
                  "mt-1 inline-block px-1.5 py-0.5 text-[10px] md:text-xs",
                  tokens.radius,
                  tokens.badgeBg,
                  tokens.badgeText
                )}
              >
                {product.category}
              </span>
            )}

            <p
              className={cn(
                "mt-2 text-base md:text-sm font-bold",
                preset === "fresh"
                  ? "text-emerald-600"
                  : preset === "playful"
                    ? "text-rose-500"
                    : "text-zinc-100"
              )}
            >
              {formatRupiah(product.price)}
            </p>

            {/* Add to Cart Button */}
            <Button
              variant="ghost"
              onClick={() => handleAddToCart(product)}
              className={cn(
                "mt-2 w-full py-2.5 md:py-2 text-sm md:text-xs font-semibold transition-all duration-150 ease-in-out active:scale-95",
                tokens.radius,
                tokens.accent,
                tokens.accentText,
                tokens.accentHover
              )}
            >
              + Keranjang
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
