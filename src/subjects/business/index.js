export { WORLDS } from './worlds.js';
export { LEVELS } from './levels.js';
export { CHALLENGES } from './challenges.js';
export {
  UNITS, SKILLS, deriveMastery, migrateSkillIds, MASTERY_LABEL, MASTERY_COLOR,
} from './skills.js';
export { SCENARIOS, getScenariosForUnit } from './scenarios.js';
export { getTheoryUnit, getAllTheoryQuestions, THEORY_UNITS } from './theory.js';

import { UNITS } from './skills.js';

const WORLD_TO_UNIT = Object.fromEntries(
  Object.values(UNITS).map((u) => [u.worldId, u.id]),
);

export function unitIdForWorld(worldId) {
  return WORLD_TO_UNIT[worldId] || null;
}

export function unitToWorld(unitId) {
  return Object.values(UNITS).find((u) => u.id === unitId)?.worldId || null;
}
