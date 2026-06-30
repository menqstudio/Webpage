import { PrismaClient } from "@prisma/client";

/**
 * Lazy Prisma singleton. Returns null when DATABASE_URL is unset so the app
 * (and dev) keeps working without a database — the lead flow degrades to
 * notify-only. Construct lazily to avoid throwing on a missing env var.
 */
const globalForPrisma = globalThis as unknown as {
  __menqPrisma?: PrismaClient;
};

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPrisma(): PrismaClient | null {
  if (!isDbConfigured()) return null;
  if (!globalForPrisma.__menqPrisma) {
    globalForPrisma.__menqPrisma = new PrismaClient();
  }
  return globalForPrisma.__menqPrisma;
}
