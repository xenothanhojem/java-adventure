import * as t1 from './units/t1.js';
import * as t2 from './units/t2.js';
import * as t3 from './units/t3.js';
import * as t4 from './units/t4.js';
import * as t5 from './units/t5.js';
import * as t6 from './units/t6.js';
import * as t7 from './units/t7.js';
import * as t8 from './units/t8.js';
import { buildSubject, packFromUnitModule } from '../buildSubject.js';

export { deriveMastery, MASTERY_LABEL, MASTERY_COLOR } from '../../data/skills.js';

const subject = buildSubject([t1, t2, t3, t4, t5, t6, t7, t8].map(packFromUnitModule));

export const {
  UNITS, SKILLS, SKILL_HINTS, WORLDS, LEVELS, CHALLENGES, THEORY_UNITS, SCENARIOS,
  unitIdForWorld, unitToWorld, getTheoryUnit, getAllTheoryQuestions, getScenariosForUnit,
} = subject;

export function migrateSkillIds(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr.filter((id) => SKILLS[id]))];
}
