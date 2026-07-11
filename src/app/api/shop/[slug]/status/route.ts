export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { shop } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
      columns: {
        isPublished: true,
      },
    });

    if (!shopData) {
      return NextResponse.json(
        { isPublished: false, exists: false },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      {
        isPublished: shopData.isPublished,
        exists: true,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Gagal memuat status toko real-time:", error);
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
