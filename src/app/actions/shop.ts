"use server";

import { db } from "@/lib/db";
import { shop } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
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
      isPublished: true,
      updatedAt: new Date(),
    })
    .where(eq(shop.userId, user.id));

  revalidatePath("/dashboard/profil");
  revalidatePath("/dashboard");
  revalidatePath(`/${newSlug}`);

  return { success: true, slug: newSlug };
}

export async function incrementShopViews(shopId: string) {
  try {
    const existingShop = await db.query.shop.findFirst({
      where: eq(shop.id, shopId),
    });
    if (!existingShop) return { error: "Toko tidak ditemukan." };

    await db
      .update(shop)
      .set({
        views: (existingShop.views || 0) + 1,
      })
      .where(eq(shop.id, shopId));

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

    await db
      .update(shop)
      .set({
        whatsappClicks: (existingShop.whatsappClicks || 0) + 1,
      })
      .where(eq(shop.id, shopId));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Gagal menambahkan klik WA:", error);
    return { error: "Gagal memproses analitik." };
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

