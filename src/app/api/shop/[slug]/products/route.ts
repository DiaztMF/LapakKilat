export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { shop, product } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Cari data toko berdasarkan slug
    const shopData = await db.query.shop.findFirst({
      where: eq(shop.slug, slug),
    });

    if (!shopData) {
      return NextResponse.json(
        { error: "Toko tidak ditemukan." },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }

    if (!shopData.isPublished) {
      return NextResponse.json(
        { error: "Toko tidak aktif." },
        {
          status: 403,
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }

    // Ambil produk yang aktif/tersedia
    const products = await db.query.product.findMany({
      where: and(eq(product.shopId, shopData.id), eq(product.isAvailable, true)),
      orderBy: (product, { asc }) => [asc(product.sortOrder)],
    });

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Gagal memuat produk real-time:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  }
}
