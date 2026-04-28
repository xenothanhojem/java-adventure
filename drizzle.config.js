import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

/*
 * drizzle-kit reads this when you run `pnpm db:push` (sync schema to DB)
 * or `pnpm db:studio` (open the browser-based DB explorer).
 *
 * Use the unpooled connection for migrations - pgbouncer's transaction
 * pooling can interfere with DDL.
 */

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL_UNPOOLED or DATABASE_URL must be set');
}

export default defineConfig({
  schema: './db/schema.js',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
