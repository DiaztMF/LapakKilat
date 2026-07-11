import { db } from "@/lib/db";
import { shop, product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StorefrontHeader } from "./_components/storefront-header";
import { CategoryTabs } from "./_components/category-tabs";
import { ProductGrid } from "./_components/product-grid";
import { FloatingCart } from "./_components/floating-cart";
import { CartDrawer } from "./_components/cart-drawer";
import { StorefrontFAQ } from "./_components/storefront-faq";
import { StorefrontFooter } from "./_components/storefront-footer";
import { getTemplateTokens, type TemplatePreset } from "@/lib/template-presets";
import { PageViewTracker } from "./_components/page-view-tracker";
import { Store, MessageCircle } from "lucide-react";
import { FallbackStatusPoller } from "./_components/fallback-status-poller";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getShopData(slug: string) {
  const shopData = await db.query.shop.findFirst({
    where: eq(shop.slug, slug),
    with: {
      products: {
        where: eq(product.isAvailable, true),
        orderBy: (product, { asc }) => [asc(product.sortOrder)],
      },
    },
  });

  return shopData;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const shopData = await getShopData(slug);

  if (!shopData) {
    return { title: "Toko tidak ditemukan — LapakKilat" };
  }

  const titleSuffix = shopData.isPublished ? "" : " (Tidak Aktif)";

  return {
    title: `${shopData.name}${titleSuffix} — LapakKilat`,
    description:
      shopData.slogan || `Katalog online ${shopData.name} di LapakKilat`,
    openGraph: {
      title: `${shopData.name}${titleSuffix}`,
      description:
        shopData.slogan || `Katalog online ${shopData.name}`,
      type: "website",
    },
  };
}

export default async function StorefrontPage({ params }: PageProps) {
  const { slug } = await params;
  const shopData = await getShopData(slug);

  if (!shopData) {
    notFound();
  }



  const baseTokens = getTemplateTokens(shopData.templatePreset as TemplatePreset);
  const products = shopData.products || [];

  // Custom brand color overrides (jika bukan preset minimalist)
  const isMinimalist = shopData.templatePreset === "minimalist";
  const tokens = isMinimalist
    ? baseTokens
    : {
        ...baseTokens,
        accent: "custom-brand-bg",
        accentText: "text-white",
        accentHover: "custom-brand-hover",
        badgeBg: "custom-brand-bg-light",
        badgeText: "custom-brand-text",
      };

  // Fallback untuk toko yang sedang tidak aktif
  if (!shopData.isPublished) {
    return (
      <div className={`min-h-screen ${tokens.canvas} flex flex-col items-center justify-center p-4`}>
        {/* Poller status toko di sisi klien untuk reload jika toko aktif kembali */}
        <FallbackStatusPoller shopSlug={shopData.slug} />

        {/* Inject warna primer kustom */}
        {!isMinimalist && shopData.primaryColor && (
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-brand-bg {
              background-color: ${shopData.primaryColor} !important;
            }
            .custom-brand-text {
              color: ${shopData.primaryColor} !important;
            }
            .custom-brand-hover:hover {
              filter: brightness(0.9) !important;
              opacity: 0.95 !important;
            }
            .custom-brand-bg-light {
              background-color: ${shopData.primaryColor}15 !important;
            }
          ` }} />
        )}

        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm space-y-6">
          {/* Logo / Avatar Toko */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full overflow-hidden border border-gray-100 bg-gray-50">
            {shopData.profileImage ? (
              <img
                src={shopData.profileImage}
                alt={shopData.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store className="h-10 w-10 text-gray-400" />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-900">{shopData.name}</h1>
            {shopData.slogan && (
              <p className="text-sm text-gray-500 line-clamp-2">{shopData.slogan}</p>
            )}
          </div>

          <div className="py-4 border-t border-b border-gray-100 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Tutup Sementara
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Katalog online toko ini sedang dinonaktifkan sementara oleh pemiliknya. Silakan hubungi pemilik toko untuk informasi lebih lanjut.
            </p>
          </div>

          {shopData.whatsapp && (
            <a
              href={`https://wa.me/${shopData.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white shadow-md active:scale-95 transition-all ${tokens.accent} ${tokens.accentHover}`}
            >
              <MessageCircle className="h-5 w-5" />
              Hubungi Toko via WhatsApp
            </a>
          )}
        </div>
      </div>
    );
  }

  // Extract unique categories
  const categories = [
    "Semua",
    ...Array.from(
      new Set(
        products
          .map((p) => p.category)
          .filter((c): c is string => !!c)
      )
    ),
  ];

  return (
    <div className={`min-h-screen ${tokens.canvas}`}>
      {/* Inject warna primer kustom */}
      {!isMinimalist && shopData.primaryColor && (
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-brand-bg {
            background-color: ${shopData.primaryColor} !important;
          }
          .custom-brand-text {
            color: ${shopData.primaryColor} !important;
          }
          .custom-brand-hover:hover {
            filter: brightness(0.9) !important;
            opacity: 0.95 !important;
          }
          .custom-brand-bg-light {
            background-color: ${shopData.primaryColor}15 !important; /* ~8% opacity */
          }
        ` }} />
      )}
      <StorefrontHeader shop={shopData} tokens={tokens} />

      <div className="mx-auto max-w-md md:max-w-4xl lg:max-w-6xl px-4 py-2 md:py-3 space-y-5">
        <CategoryTabs
          categories={categories}
          tokens={tokens}
          preset={shopData.templatePreset as TemplatePreset}
        />
        <ProductGrid
          products={products}
          tokens={tokens}
          preset={shopData.templatePreset as TemplatePreset}
          shopSlug={shopData.slug}
        />
        <StorefrontFAQ shop={shopData} tokens={tokens} />
      </div>

      {/* Storefront Footer */}
      <StorefrontFooter shop={shopData} tokens={tokens} />

      {/* Global Cart UI Components */}
      <FloatingCart
        tokens={tokens}
        preset={shopData.templatePreset as TemplatePreset}
      />
      <CartDrawer
        shopId={shopData.id}
        shopName={shopData.name}
        shopWhatsapp={shopData.whatsapp || ""}
        tokens={tokens}
        preset={shopData.templatePreset as TemplatePreset}
      />
      {/* Client-side Page View Tracker */}
      <PageViewTracker shopId={shopData.id} />
    </div>
  );
}
