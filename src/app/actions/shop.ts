"use server";

import { db } from "@/lib/db";
import { shop, shopAnalytics } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { eq, and, gte } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Tidak diizinkan.");
  return session.user;
}

export async function getShopByUser() {
  const user = await getAuthenticatedUser();
  const result = await db.query.shop.findFirst({
    where: eq(shop.userId, user.id),
  });
  return result;
}

export async function updateShopProfile(formData: FormData) {
  try {
    const user = await getAuthenticatedUser();

    const name = formData.get("name") as string;
    const slogan = formData.get("slogan") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const profileImage = formData.get("profileImage") as string;
    const bannerImage = formData.get("bannerImage") as string;
    const templatePreset = formData.get("templatePreset") as
      | "fresh"
      | "playful"
      | "minimalist";
    const primaryColor = formData.get("primaryColor") as string;
    const operationalHours = formData.get("operationalHours") as string;
    const address = formData.get("address") as string;
    const googleMapsUrl = formData.get("googleMapsUrl") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const facebookUrl = formData.get("facebookUrl") as string;
    const tiktokUrl = formData.get("tiktokUrl") as string;
    const faqString = formData.get("faq") as string;
    let faqList = [];
    try {
      faqList = faqString ? JSON.parse(faqString) : [];
    } catch (e) {
      console.error("Gagal mem-parse faq:", e);
    }

    if (!name || name.trim().length === 0) {
      return { error: "Nama toko wajib diisi." };
    }

    // Generate slug dari nama toko
    const baseSlug = slugify(name);
    const existingShop = await db.query.shop.findFirst({
      where: eq(shop.userId, user.id),
    });

    if (!existingShop) {
      return { error: "Toko tidak ditemukan." };
    }

    // Cek apakah slug berubah
    let newSlug = existingShop.slug;
    const currentBaseName = existingShop.slug.replace(/-[a-zA-Z0-9_-]{6}$/, "");
    if (currentBaseName !== baseSlug) {
      newSlug = `${baseSlug}-${nanoid(6)}`;
    }

    await db
      .update(shop)
      .set({
        name: name.trim(),
        slug: newSlug,
        slogan: slogan?.trim() || null,
        whatsapp: whatsapp?.trim() || null,
        profileImage: profileImage || null,
        bannerImage: bannerImage || null,
        templatePreset: templatePreset || "fresh",
        primaryColor: primaryColor || "#059669",
        operationalHours: operationalHours?.trim() || null,
        address: address?.trim() || null,
        googleMapsUrl: googleMapsUrl?.trim() || null,
        instagramUrl: instagramUrl?.trim() || null,
        facebookUrl: facebookUrl?.trim() || null,
        tiktokUrl: tiktokUrl?.trim() || null,
        faq: faqList,
        updatedAt: new Date(),
      })
      .where(eq(shop.userId, user.id));

    revalidatePath("/dashboard/profil");
    revalidatePath("/dashboard");
    revalidatePath(`/${newSlug}`);

    return { success: true, slug: newSlug };
  } catch (error) {
    console.error("Gagal memperbarui profil toko:", error);
    const message = error instanceof Error ? error.message : "Gagal memperbarui profil toko.";
    return { error: message };
  }
}

export async function incrementShopViews(shopId: string) {
  try {
    const existingShop = await db.query.shop.findFirst({
      where: eq(shop.id, shopId),
    });
    if (!existingShop) return { error: "Toko tidak ditemukan." };

    // Update total views di tabel shop
    await db
      .update(shop)
      .set({
        views: (existingShop.views || 0) + 1,
      })
      .where(eq(shop.id, shopId));

    // Update/Insert di tabel shopAnalytics untuk hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAnalytics = await db.query.shopAnalytics.findFirst({
      where: and(
        eq(shopAnalytics.shopId, shopId),
        eq(shopAnalytics.date, today)
      ),
    });

    if (existingAnalytics) {
      await db
        .update(shopAnalytics)
        .set({
          views: existingAnalytics.views + 1,
          updatedAt: new Date(),
        })
        .where(eq(shopAnalytics.id, existingAnalytics.id));
    } else {
      await db.insert(shopAnalytics).values({
        id: nanoid(),
        shopId,
        date: today,
        views: 1,
        whatsappClicks: 0,
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Gagal menambahkan view:", error);
    return { error: "Gagal memproses analitik." };
  }
}

export async function incrementWhatsAppClicks(shopId: string) {
  try {
    const existingShop = await db.query.shop.findFirst({
      where: eq(shop.id, shopId),
    });
    if (!existingShop) return { error: "Toko tidak ditemukan." };

    // Update total clicks di tabel shop
    await db
      .update(shop)
      .set({
        whatsappClicks: (existingShop.whatsappClicks || 0) + 1,
      })
      .where(eq(shop.id, shopId));

    // Update/Insert di tabel shopAnalytics untuk hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAnalytics = await db.query.shopAnalytics.findFirst({
      where: and(
        eq(shopAnalytics.shopId, shopId),
        eq(shopAnalytics.date, today)
      ),
    });

    if (existingAnalytics) {
      await db
        .update(shopAnalytics)
        .set({
          whatsappClicks: existingAnalytics.whatsappClicks + 1,
          updatedAt: new Date(),
        })
        .where(eq(shopAnalytics.id, existingAnalytics.id));
    } else {
      await db.insert(shopAnalytics).values({
        id: nanoid(),
        shopId,
        date: today,
        views: 0,
        whatsappClicks: 1,
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Gagal menambahkan klik WA:", error);
    return { error: "Gagal memproses analitik." };
  }
}

export async function getShopDailyAnalytics() {
  try {
    const user = await getAuthenticatedUser();
    const existingShop = await db.query.shop.findFirst({
      where: eq(shop.userId, user.id),
    });

    if (!existingShop) throw new Error("Toko tidak ditemukan.");

    const analyticsData = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const dbAnalytics = await db.query.shopAnalytics.findMany({
      where: and(
        eq(shopAnalytics.shopId, existingShop.id),
        gte(shopAnalytics.date, sevenDaysAgo)
      ),
      orderBy: (sa, { asc }) => [asc(sa.date)],
    });

    const daysOfWeek = ["Ahd", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      
      const match = dbAnalytics.find(
        (a) => new Date(a.date).toDateString() === d.toDateString()
      );
      
      analyticsData.push({
        day: daysOfWeek[d.getDay()],
        views: match ? match.views : 0,
        clicks: match ? match.whatsappClicks : 0,
      });
    }

    return analyticsData;
  } catch (error) {
    console.error("Gagal mengambil analitik harian:", error);
    return [];
  }
}

export async function toggleShopPublishStatus() {
  try {
    const user = await getAuthenticatedUser();
    const existingShop = await db.query.shop.findFirst({
      where: eq(shop.userId, user.id),
    });

    if (!existingShop) return { error: "Toko tidak ditemukan." };

    const newStatus = !existingShop.isPublished;

    await db
      .update(shop)
      .set({
        isPublished: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(shop.userId, user.id));

    revalidatePath("/dashboard/profil");
    revalidatePath("/dashboard");
    revalidatePath(`/${existingShop.slug}`);

    return { success: true, isPublished: newStatus };
  } catch (error) {
    console.error("Gagal mengubah status publish:", error);
    return { error: "Gagal mengubah status publikasi toko." };
  }
}

