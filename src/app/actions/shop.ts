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
      isPublished: true,
      updatedAt: new Date(),
    })
    .where(eq(shop.userId, user.id));

  revalidatePath("/dashboard/profil");
  revalidatePath(`/${newSlug}`);

  return { success: true, slug: newSlug };
}
