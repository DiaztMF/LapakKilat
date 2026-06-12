import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL belum diatur. Fitur database tidak akan berfungsi."
  );
}

const sql = neon(process.env.DATABASE_URL || "postgresql://placeholder:placeholder@placeholder/placeholder");

export const db = drizzle(sql, { schema });
