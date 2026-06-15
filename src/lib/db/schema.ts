import { pgTable, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// Better Auth Core Tables
// ============================================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ============================================================
// LapakKilat Application Tables
// ============================================================

export const templatePresetEnum = pgEnum("template_preset", [
  "fresh",
  "playful",
  "minimalist",
]);

export const shop = pgTable("shop", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  slogan: text("slogan"),
  whatsapp: text("whatsapp"),
  profileImage: text("profile_image"),
  bannerImage: text("banner_image"),
  templatePreset: templatePresetEnum("template_preset")
    .notNull()
    .default("fresh"),
  primaryColor: text("primary_color").notNull().default("#059669"),
  views: integer("views").notNull().default(0),
  whatsappClicks: integer("whatsapp_clicks").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const shopAnalytics = pgTable("shop_analytics", {
  id: text("id").primaryKey(),
  shopId: text("shop_id")
    .notNull()
    .references(() => shop.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(),
  views: integer("views").notNull().default(0),
  whatsappClicks: integer("whatsapp_clicks").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const product = pgTable("product", {
  id: text("id").primaryKey(),
  shopId: text("shop_id")
    .notNull()
    .references(() => shop.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull().default(0),
  category: text("category"),
  image: text("image"),
  sortOrder: integer("sort_order").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ============================================================
// Relations
// ============================================================

export const userRelations = relations(user, ({ one }) => ({
  shop: one(shop, {
    fields: [user.id],
    references: [shop.userId],
  }),
}));

export const shopRelations = relations(shop, ({ one, many }) => ({
  user: one(user, {
    fields: [shop.userId],
    references: [user.id],
  }),
  products: many(product),
  analytics: many(shopAnalytics),
}));

export const shopAnalyticsRelations = relations(shopAnalytics, ({ one }) => ({
  shop: one(shop, {
    fields: [shopAnalytics.shopId],
    references: [shop.id],
  }),
}));

export const productRelations = relations(product, ({ one }) => ({
  shop: one(shop, {
    fields: [product.shopId],
    references: [shop.id],
  }),
}));
