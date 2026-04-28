import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  uniqueIndex,
  doublePrecision,
} from 'drizzle-orm/pg-core';

/*
 * users: one row per learner. Email is the natural identity (lowercased).
 */
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    school: text('school').notNull(),
    grade: text('grade').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_unique').on(table.email),
  }),
);

/*
 * sessions: one row per completed run (level, practice, do-or-die).
 *   mode       - 'level' | 'practice' | 'doOrDie'
 *   unitId     - 'U2' .. 'U7' or null for cross-unit practice
 *   levelId    - level identifier (when mode = 'level')
 *   scenarioId - scenario identifier (when mode = 'doOrDie')
 *   score/grade are populated for do-or-die runs only.
 */
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  mode: text('mode').notNull(),
  unitId: text('unit_id'),
  levelId: text('level_id'),
  scenarioId: text('scenario_id'),
  correctCount: integer('correct_count').notNull().default(0),
  total: integer('total').notNull().default(0),
  score: doublePrecision('score'),
  grade: text('grade'),
  durationMs: integer('duration_ms'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/*
 * attempts: one row per individual challenge answer. Powers granular skill
 * mastery tracking server-side (mirroring what the client computes).
 */
export const attempts = pgTable('attempts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sessionId: integer('session_id').references(() => sessions.id, { onDelete: 'set null' }),
  challengeId: text('challenge_id').notNull(),
  challengeType: text('challenge_type').notNull(),
  skills: jsonb('skills').notNull().default([]),
  correct: boolean('correct').notNull(),
  hintUsed: boolean('hint_used').notNull().default(false),
  unitId: text('unit_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
