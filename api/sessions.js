import { getDb, schema } from '../db/client.js';

/*
 * /api/sessions
 *   POST { userId, mode, unitId?, levelId?, scenarioId?, correctCount, total,
 *          score?, grade?, durationMs?, attempts?: [{...}] }
 *
 *   Inserts the session and (optionally) a batch of associated attempts in a
 *   single transaction. Returns the created session row.
 */

function asString(v) { return v == null ? null : String(v); }
function asInt(v, def = 0) { const n = Number(v); return Number.isFinite(n) ? Math.round(n) : def; }
function asNum(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = req.body || {};
    const userId = asInt(body.userId, 0);
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const sessionRow = {
      userId,
      mode: asString(body.mode) || 'unknown',
      unitId: asString(body.unitId),
      levelId: asString(body.levelId),
      scenarioId: asString(body.scenarioId),
      correctCount: asInt(body.correctCount, 0),
      total: asInt(body.total, 0),
      score: asNum(body.score),
      grade: asString(body.grade),
      durationMs: body.durationMs == null ? null : asInt(body.durationMs, 0),
    };

    const { db } = getDb();
    const [session] = await db.insert(schema.sessions).values(sessionRow).returning();

    if (Array.isArray(body.attempts) && body.attempts.length > 0) {
      const rows = body.attempts.map((a) => ({
        userId,
        sessionId: session.id,
        challengeId: asString(a.challengeId) || 'unknown',
        challengeType: asString(a.challengeType) || 'unknown',
        skills: Array.isArray(a.skills) ? a.skills : [],
        correct: !!a.correct,
        hintUsed: !!a.hintUsed,
        unitId: asString(a.unitId) || sessionRow.unitId,
      }));
      await db.insert(schema.attempts).values(rows);
    }

    return res.status(200).json({ session });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'server error' });
  }
}
