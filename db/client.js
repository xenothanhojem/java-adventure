import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';

/*
 * Lazy singleton db client. In serverless / dev hot-reload environments we
 * cache on globalThis so we don't open a new pool on every invocation.
 */

function buildClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not configured');
  }
  /*
   * Vercel/Neon: use the pooled URL with prepare disabled so the
   * statement-level pooler (pgbouncer) doesn't choke on prepared statements.
   * max:1 keeps the per-invocation footprint tiny on serverless.
   */
  const sql = postgres(url, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  return { sql, db: drizzle(sql, { schema }) };
}

export function getDb() {
  const cache = globalThis.__ja_db_cache__;
  if (cache) return cache;
  const created = buildClient();
  globalThis.__ja_db_cache__ = created;
  return created;
}

export { schema };
