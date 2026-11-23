export function seedFallbackAllowed(): boolean {
  if (process.env.ALLOW_SEED_FALLBACK === "true") return true;
  if (process.env.ALLOW_SEED_FALLBACK === "false") return false;
  return process.env.NODE_ENV !== "production";
}

export class DatabaseUnavailableError extends Error {
  constructor() {
    super("Database unavailable");
    this.name = "DatabaseUnavailableError";
  }
}

export async function withDatabase<T>(
  scope: string,
  fromDatabase: () => Promise<T>,
  fromSeed: () => Promise<T>,
): Promise<T> {
  if (!process.env.DATABASE_URL) {
    if (seedFallbackAllowed()) return fromSeed();
    console.error(JSON.stringify({ event: "db_not_configured", scope }));
    throw new DatabaseUnavailableError();
  }
  try {
    return await fromDatabase();
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "UnknownError";
    if (seedFallbackAllowed()) {
      console.warn(JSON.stringify({ event: "db_fallback_to_seed", scope, errorName }));
      return fromSeed();
    }
    console.error(JSON.stringify({ event: "db_query_failed", scope, errorName }));
    throw new DatabaseUnavailableError();
  }
}
