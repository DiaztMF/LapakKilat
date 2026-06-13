import { db } from "@/lib/db";
import { shop, product } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StorefrontHeader } from "./_components/storefront-header";
import { CategoryTabs } from "./_components/category-tabs";
import { ProductGrid } from "./_components/product-grid";
import { FloatingCart } from "./_components/floating-cart";
import { CartDrawer } from "./_components/cart-drawer";
import { getTemplateTokens, type TemplatePreset } from "@/lib/template-presets";
import { incrementShopViews } from "@/app/actions/shop";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getShopData(slug: string) {
  const shopData = await db.query.shop.findFirst({
    where: and(eq(shop.slug, slug), eq(shop.isPublished, true)),
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

  return {
    title: `${shopData.name} — LapakKilat`,
    description:
      shopData.slogan || `Katalog online ${shopData.name} di LapakKilat`,
    openGraph: {
      title: shopData.name,
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

  // Increment view count in background
  incrementShopViews(shopData.id).catch((err) => {
    console.error("Gagal mencatat kunjungan toko:", err);
  });

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
      <div className="mx-auto max-w-md">
        <StorefrontHeader shop={shopData} tokens={tokens} />
        <CategoryTabs
          categories={categories}
          tokens={tokens}
          preset={shopData.templatePreset as TemplatePreset}
        />
        <ProductGrid
          products={products}
          tokens={tokens}
          preset={shopData.templatePreset as TemplatePreset}
        />
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
      </div>
    </div>
  );
}
