export { WORLDS } from './worlds.js';
export { LEVELS } from './levels.js';
export { CHALLENGES } from './challenges.js';
export { UNITS, SKILLS, SKILL_GROUPS, deriveMastery, migrateSkillIds, MASTERY_LABEL, MASTERY_COLOR } from '../../data/skills.js';
export { SCENARIOS, getScenariosForUnit } from '../../data/scenarios.js';
export { getTheoryUnit, getAllTheoryQuestions } from '../../data/theory.js';

import { UNITS } from '../../data/skills.js';

const WORLD_TO_UNIT = Object.fromEntries(
  Object.values(UNITS).map((u) => [u.worldId, u.id]),
);

export function unitIdForWorld(worldId) {
  return WORLD_TO_UNIT[worldId] || null;
}

export function unitToWorld(unitId) {
  return Object.values(UNITS).find((u) => u.id === unitId)?.worldId || null;
}
