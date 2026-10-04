import * as b1 from './units/b1.js';
import * as b2 from './units/b2.js';
import * as b3 from './units/b3.js';
import * as b4 from './units/b4.js';
import * as b5 from './units/b5.js';
import * as b6 from './units/b6.js';
import * as b7 from './units/b7.js';
import * as b8 from './units/b8.js';
import * as b9 from './units/b9.js';
import * as b10 from './units/b10.js';
import * as b11 from './units/b11.js';
import { buildSubject, packFromUnitModule } from '../buildSubject.js';

export { deriveMastery, MASTERY_LABEL, MASTERY_COLOR } from '../../data/skills.js';

const subject = buildSubject([b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11].map(packFromUnitModule));

export const {
  UNITS, SKILLS, SKILL_HINTS, WORLDS, LEVELS, CHALLENGES, THEORY_UNITS, SCENARIOS,
  unitIdForWorld, unitToWorld, getTheoryUnit, getAllTheoryQuestions, getScenariosForUnit,
} = subject;

export function migrateSkillIds(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr.filter((id) => SKILLS[id]))];
}
