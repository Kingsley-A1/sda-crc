/**
 * Prisma Database Client Singleton
 * ================================
 * This file exports a single Prisma client instance to be used across the application.
 * It prevents multiple Prisma Client instances in development (hot reload).
 * 
 * "For where two or three gather in my name, there am I with them." — Matthew 18:20
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Test connection on startup (don't block app if it fails)
if (process.env.NODE_ENV === "development") {
  db.$connect()
    .then(() => console.log("✅ Database connected"))
    .catch((err) => console.warn("⚠️ Database connection failed (app will use fallback data):", err.message));
}

export default db;
