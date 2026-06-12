import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from Next.js local env file
config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

