import { eq } from 'drizzle-orm';
import { getDb, schema } from '../db/client.js';

/*
 * /api/users
 *   GET  ?email=...  - look up an existing user
 *   POST { name, school, grade, email } - upsert and return the user
 */

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  try {
    const { db } = getDb();

    if (req.method === 'GET') {
      const email = (req.query?.email || '').toString().toLowerCase().trim();
      if (!email) return res.status(400).json({ error: 'email is required' });
      const rows = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
      if (rows.length === 0) return res.status(404).json({ error: 'not found' });
      return res.status(200).json({ user: rows[0] });
    }

    if (req.method === 'POST') {
      const { name, school, grade, email } = req.body || {};
      if (!name || !school || !grade || !email) {
        return res.status(400).json({ error: 'name, school, grade and email are required' });
      }
      if (!isEmail(email)) {
        return res.status(400).json({ error: 'invalid email' });
      }
      const normalisedEmail = email.toLowerCase().trim();

      const inserted = await db
        .insert(schema.users)
        .values({
          name: String(name).trim(),
          school: String(school).trim(),
          grade: String(grade).trim(),
          email: normalisedEmail,
        })
        .onConflictDoUpdate({
          target: schema.users.email,
          set: {
            name: String(name).trim(),
            school: String(school).trim(),
            grade: String(grade).trim(),
            updatedAt: new Date(),
          },
        })
        .returning();

      return res.status(200).json({ user: inserted[0] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'server error' });
  }
}
