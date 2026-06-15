import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { nanoid } from "nanoid";
import { slugify } from "./utils";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 menit
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    window: 60, // 60 detik (1 menit)
    max: 10,    // maksimal 10 request untuk melindungi dari brute-force
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.ngrok-free.app",
    "https://*.ngrok.io",
    "https://lapak-kilat.vercel.app",
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Auto-create shop record ketika user pertama kali register
          const baseSlug = slugify(user.name || "toko");
          const uniqueSlug = `${baseSlug}-${nanoid(6)}`;

          await db.insert(schema.shop).values({
            id: nanoid(),
            userId: user.id,
            slug: uniqueSlug,
            name: user.name || "Toko Saya",
            templatePreset: "fresh",
            isPublished: false,
          });
        },
      },
    },
  },
  plugins: [dash()],
});

export type Session = typeof auth.$Infer.Session;
