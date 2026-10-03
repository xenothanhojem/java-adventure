import { WORLDS as LEGACY_WORLDS } from './worlds.js';
import { LEVELS as LEGACY_LEVELS } from './levels.js';
import { CHALLENGES as LEGACY_CHALLENGES } from './challenges.js';
import { SKILL_HINTS as LEGACY_HINTS } from './hints.js';
import {
  UNITS as LEGACY_UNITS, SKILLS as LEGACY_SKILLS, LEGACY_SKILL_MAP,
} from '../../data/skills.js';
import { SCENARIOS as LEGACY_SCENARIOS } from '../../data/scenarios.js';
import { THEORY_UNITS as LEGACY_THEORY } from '../../data/theory.js';
import * as u1 from './units/u1.js';
import * as u8 from './units/u8.js';
import * as u9 from './units/u9.js';
import * as u10 from './units/u10.js';
import * as u11 from './units/u11.js';
import * as u12 from './units/u12.js';
import { buildSubject, packFromUnitModule } from '../buildSubject.js';

export {
  SKILL_GROUPS, deriveMastery, MASTERY_LABEL, MASTERY_COLOR,
} from '../../data/skills.js';

const subject = buildSubject([
  {
    UNITS: LEGACY_UNITS,
    SKILLS: LEGACY_SKILLS,
    SKILL_HINTS: LEGACY_HINTS,
    WORLDS: LEGACY_WORLDS,
    LEVELS: LEGACY_LEVELS,
    CHALLENGES: LEGACY_CHALLENGES,
    THEORY_UNITS: LEGACY_THEORY,
    SCENARIOS: LEGACY_SCENARIOS,
  },
  ...[u1, u8, u9, u10, u11, u12].map(packFromUnitModule),
]);

export const {
  UNITS, SKILLS, SKILL_HINTS, WORLDS, LEVELS, CHALLENGES, THEORY_UNITS, SCENARIOS,
  unitIdForWorld, unitToWorld, getTheoryUnit, getAllTheoryQuestions, getScenariosForUnit,
} = subject;

export function migrateSkillIds(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const id of arr) {
    const mapped = SKILLS[id] ? id : LEGACY_SKILL_MAP[id];
    if (mapped && SKILLS[mapped] && !out.includes(mapped)) out.push(mapped);
  }
  return out;
}
