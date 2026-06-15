"use client";

import { type TemplatePreset, getTemplateTokens } from "@/lib/template-presets";
import { cn } from "@/lib/utils";
import { ShoppingBag, ExternalLink, ShoppingCart } from "lucide-react";
import { Android } from "@/components/ui/android";
import { StorefrontFAQ } from "@/app/[slug]/_components/storefront-faq";
import { StorefrontFooter } from "@/app/[slug]/_components/storefront-footer";

interface StorefrontPreviewProps {
  name: string;
  slogan: string;
  whatsapp: string;
  profileImage: string;
  bannerImage: string;
  preset: TemplatePreset;
  primaryColor: string;
  slug: string;
  operationalHours?: string;
  address?: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  faq?: { question: string; answer: string }[];
}

export function StorefrontPreview({
  name,
  slogan,
  whatsapp: _whatsapp,
  profileImage,
  bannerImage,
  preset,
  primaryColor,
  slug,
  operationalHours = "",
  address = "",
  googleMapsUrl = "",
  instagramUrl = "",
  facebookUrl = "",
  tiktokUrl = "",
  faq = [],
}: StorefrontPreviewProps) {
  const baseTokens = getTemplateTokens(preset);
  const isMinimalist = preset === "minimalist";

  // Custom brand color overrides (jika bukan preset minimalist)
  const tokens = isMinimalist
    ? baseTokens
    : {
        ...baseTokens,
        accent: "preview-brand-bg",
        accentText: "text-white",
        accentHover: "preview-brand-hover",
        badgeBg: "preview-brand-bg-light",
        badgeText: "preview-brand-text",
      };

  // Mock products to show layout variations
  const mockProducts = [
    {
      id: "1",
      name: "Produk Contoh A",
      price: 25000,
    },
    {
      id: "2",
      name: "Produk Contoh B",
      price: 45000,
    },
  ];

  const displayName = name.trim() || "Nama Toko Anda";
  const displaySlogan = slogan.trim() || "Slogan menarik tokomu akan tampil di sini";
  const displaySlug = slug || "slug-toko";

  // Determine fonts based on preset
  const fontClass =
    preset === "playful"
      ? "font-sans tracking-wide"
      : preset === "minimalist"
      ? "font-mono tracking-tight"
      : "font-sans";

  return (
    <div className="flex flex-col items-center w-full justify-center">
      {/* Inject warna primer kustom */}
      {!isMinimalist && primaryColor && (
        <style dangerouslySetInnerHTML={{ __html: `
          .preview-brand-bg {
            background-color: ${primaryColor} !important;
          }
          .preview-brand-text {
            color: ${primaryColor} !important;
          }
          .preview-brand-hover:hover {
            filter: brightness(0.9) !important;
            opacity: 0.95 !important;
          }
          .preview-brand-bg-light {
            background-color: ${primaryColor}15 !important; /* ~8% opacity */
          }
        ` }} />
      )}

      {/* Device Wrapper using Magic UI Android Mockup */}
      <div className="relative mx-auto w-full max-w-[430px] aspect-[433/882] drop-shadow-2xl">
        <Android className="w-full h-full" width={430} height={882}>
          {/* Inner Web Page Container (layout size is 360x800) */}
          <div className="relative w-full h-full bg-white flex flex-col select-none overflow-y-auto">

            {/* Browser Mock Bar */}
            <div className="h-10 bg-gray-100 border-b border-gray-200 px-3.5 flex items-center shrink-0 z-20">
              <div className="flex-1 bg-white rounded-md border border-gray-200/80 h-6 px-2 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <span className="truncate">lapakkilat.com/{displaySlug}</span>
                <ExternalLink className="h-2.5 w-2.5 text-gray-400 shrink-0" />
              </div>
            </div>

            {/* Screen Content - Scrollable */}
            <div
              className={cn(
                "flex-1 overflow-y-auto custom-scrollbar pb-24 transition-colors duration-200",
                tokens.canvas
              )}
            >
              {/* Banner */}
              <div className="relative h-32 w-full overflow-hidden bg-gray-200">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Banner preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className={cn("h-full w-full opacity-20", tokens.accent)} />
                )}
              </div>

              {/* Profile + Info */}
              <div className="relative px-4 pb-4">
                {/* Profile Image */}
                <div className="-mt-10 mb-3 flex justify-center">
                  <div
                    className={cn(
                      "h-20 w-20 overflow-hidden rounded-full border-4 bg-white flex items-center justify-center shrink-0 shadow-sm",
                      tokens.canvas === "bg-zinc-950" ? "border-zinc-900" : "border-white"
                    )}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className={cn(
                          "flex h-full w-full items-center justify-center text-2xl font-bold",
                          tokens.accent,
                          tokens.accentText
                        )}
                      >
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Shop Info */}
                <div className="text-center">
                  <h1 className={cn("text-lg font-bold truncate leading-tight", tokens.text, fontClass)}>
                    {displayName}
                  </h1>
                  {displaySlogan && (
                    <p className={cn("mt-1.5 text-xs leading-relaxed max-w-full line-clamp-2 px-2", tokens.muted)}>
                      {displaySlogan}
                    </p>
                  )}
                </div>
              </div>

              {/* Category Tabs */}
              <div className="px-4 py-3 sticky top-0 z-10" style={{ backgroundColor: "inherit" }}>
                <div className={cn("flex gap-2 overflow-x-auto pb-1 scrollbar-hide", tokens.canvas)}>
                  <span
                    className={cn(
                      "shrink-0 px-4 py-2 text-xs font-semibold transition-all select-none cursor-default",
                      tokens.radius,
                      tokens.accent,
                      tokens.accentText
                    )}
                  >
                    Semua
                  </span>
                  <span
                    className={cn(
                      "shrink-0 px-4 py-2 text-xs font-semibold transition-all select-none cursor-default",
                      tokens.radius,
                      tokens.badgeBg,
                      tokens.badgeText
                    )}
                  >
                    Kopi & Teh
                  </span>
                  <span
                    className={cn(
                      "shrink-0 px-4 py-2 text-xs font-semibold transition-all select-none cursor-default",
                      tokens.radius,
                      tokens.badgeBg,
                      tokens.badgeText
                    )}
                  >
                    Camilan
                  </span>
                </div>
              </div>

              {/* Mock Catalog / Products */}
              <div className="grid grid-cols-2 gap-3 px-4 pb-6">
                {mockProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className={cn(
                      "overflow-hidden transition-all duration-150 flex flex-col justify-between",
                      tokens.radius,
                      tokens.cardBorder,
                      tokens.shadow,
                      preset === "playful" ? tokens.canvas : ""
                    )}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 flex items-center justify-center shrink-0">
                      <ShoppingBag className={cn(
                        "h-8 w-8 opacity-30",
                        preset === "minimalist" ? "text-zinc-600" : "text-gray-400"
                      )} />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-3 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className={cn("line-clamp-1 text-sm font-semibold", tokens.text)}>
                          {prod.name}
                        </h3>
                        <span
                          className={cn(
                            "mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold leading-none",
                            tokens.radius,
                            tokens.badgeBg,
                            tokens.badgeText
                          )}
                        >
                          Kopi
                        </span>
                      </div>
                      
                      <div>
                        <p
                          className={cn(
                            "mt-2.5 text-sm font-bold",
                            preset === "fresh"
                              ? "text-emerald-600"
                              : preset === "playful"
                                ? "text-rose-500"
                                : "text-zinc-100"
                          )}
                        >
                          Rp{prod.price.toLocaleString("id-ID")}
                        </p>
                        
                        {/* Add to Cart Button */}
                        <span
                          className={cn(
                            "mt-2.5 w-full py-2.5 text-[10px] font-bold text-center block transition-all duration-150 ease-in-out cursor-default select-none",
                            tokens.radius,
                            tokens.accent,
                            tokens.accentText
                          )}
                        >
                          + Keranjang
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="px-4 pb-4">
                <StorefrontFAQ 
                  shop={{
                    name: displayName,
                    whatsapp: _whatsapp || null,
                    operationalHours: operationalHours || null,
                    address: address || null,
                    faq: faq
                  }}
                  tokens={tokens}
                />
              </div>

              {/* Footer Section */}
              <StorefrontFooter 
                shop={{
                  name: displayName,
                  slogan: displaySlogan || null,
                  whatsapp: _whatsapp || null,
                  operationalHours: operationalHours || null,
                  address: address || null,
                  googleMapsUrl: googleMapsUrl || null,
                  instagramUrl: instagramUrl || null,
                  facebookUrl: facebookUrl || null,
                  tiktokUrl: tiktokUrl || null
                }}
                tokens={tokens}
              />
            </div>

            {/* Mock Floating Cart */}
            <div
              className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex w-11/12 items-center justify-between px-4 py-3.5 text-xs font-bold shadow-lg transition-all select-none cursor-default",
                tokens.radius === "rounded-none" ? "rounded-none" : "rounded-xl",
                tokens.accent,
                tokens.accentText
              )}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>1 Item</span>
              </span>
              <span>Rp25.000</span>
            </div>
          </div>
        </Android>
      </div>
      
      <p className="mt-3 text-xs text-gray-400 font-medium italic">
        Tampilan simulasi storefront pelanggan
      </p>
    </div>
  );
}
