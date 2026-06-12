"use server";

import { db } from "@/lib/db";
import { product, shop } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, count } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

const MAX_PRODUCTS = 20;

async function getAuthenticatedShop() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Tidak diizinkan.");

  const userShop = await db.query.shop.findFirst({
    where: eq(shop.userId, session.user.id),
  });
  if (!userShop) throw new Error("Toko tidak ditemukan.");

  return userShop;
}

export async function getProducts() {
  const userShop = await getAuthenticatedShop();
  const products = await db.query.product.findMany({
    where: eq(product.shopId, userShop.id),
    orderBy: (product, { asc }) => [asc(product.sortOrder)],
  });
  return products;
}

export async function createProduct(formData: FormData) {
  const userShop = await getAuthenticatedShop();

  // Cek limit produk
  const [productCount] = await db
    .select({ value: count() })
    .from(product)
    .where(eq(product.shopId, userShop.id));

  if (productCount.value >= MAX_PRODUCTS) {
    return { error: `Maksimal ${MAX_PRODUCTS} produk per toko.` };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const category = formData.get("category") as string;
  const image = formData.get("imageUrl") as string;

  if (!name || name.trim().length === 0) {
    return { error: "Nama produk wajib diisi." };
  }

  if (isNaN(price) || price < 0) {
    return { error: "Harga tidak valid." };
  }

  await db.insert(product).values({
    id: nanoid(),
    shopId: userShop.id,
    name: name.trim(),
    description: description?.trim() || null,
    price,
    category: category?.trim() || null,
    image: image || null,
    sortOrder: productCount.value,
    isAvailable: true,
  });

  revalidatePath("/dashboard/produk");
  revalidatePath(`/${userShop.slug}`);

  return { success: true };
}

export async function updateProduct(formData: FormData) {
  const userShop = await getAuthenticatedShop();
  const productId = formData.get("productId") as string;

  if (!productId) {
    return { error: "ID produk tidak ditemukan." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const category = formData.get("category") as string;
  const image = formData.get("imageUrl") as string;
  const isAvailable = formData.get("isAvailable") === "true";

  if (!name || name.trim().length === 0) {
    return { error: "Nama produk wajib diisi." };
  }

  if (isNaN(price) || price < 0) {
    return { error: "Harga tidak valid." };
  }

  await db
    .update(product)
    .set({
      name: name.trim(),
      description: description?.trim() || null,
      price,
      category: category?.trim() || null,
      image: image || null,
      isAvailable,
      updatedAt: new Date(),
    })
    .where(
      and(eq(product.id, productId), eq(product.shopId, userShop.id))
    );

  revalidatePath("/dashboard/produk");
  revalidatePath(`/${userShop.slug}`);

  return { success: true };
}

export async function deleteProduct(productId: string) {
  const userShop = await getAuthenticatedShop();

  await db
    .delete(product)
    .where(
      and(eq(product.id, productId), eq(product.shopId, userShop.id))
    );

  revalidatePath("/dashboard/produk");
  revalidatePath(`/${userShop.slug}`);

  return { success: true };
}
