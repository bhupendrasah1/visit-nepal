import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.fetchConnectionCache = true;

function getConnectionUrl(): string {
  const envUrl = process.env.DATABASE_URL;
  if (!envUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return envUrl;
}

function createPrismaClient() {
  const url = getConnectionUrl();
  const adapter = new PrismaNeon({ connectionString: url });
  return new PrismaClient({ adapter }) as PrismaClient & { chat: any };
}

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof createPrismaClient> | undefined;
}

// Always create fresh client in development to pick up schema changes
if (process.env.NODE_ENV !== "production") {
  globalThis.__db = undefined;
}

export const prisma = globalThis.__db ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__db = prisma;
}
