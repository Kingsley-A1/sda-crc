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
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
