/*
 * Assembles a subject registry from content packs. A pack is either a
 * per-unit module (UNIT, SKILLS, WORLD, LEVELS, CHALLENGES, THEORY,
 * SCENARIOS) or an already-aggregated legacy registry.
 */

export function packFromUnitModule(m) {
  return {
    UNITS: { [m.UNIT.id]: m.UNIT },
    SKILLS: m.SKILLS,
    SKILL_HINTS: m.SKILL_HINTS,
    WORLDS: [m.WORLD],
    LEVELS: { [m.WORLD.id]: m.LEVELS },
    CHALLENGES: m.CHALLENGES,
    THEORY_UNITS: m.THEORY ? [m.THEORY] : [],
    SCENARIOS: m.SCENARIOS || [],
  };
}

export function buildSubject(packs) {
  const UNITS = Object.assign({}, ...packs.map((p) => p.UNITS || {}));
  const unitNumberByWorld = Object.fromEntries(Object.values(UNITS).map((u) => [u.worldId, u.number]));
  const unitNumberById = Object.fromEntries(Object.values(UNITS).map((u) => [u.id, u.number]));

  const WORLDS = packs
    .flatMap((p) => p.WORLDS || [])
    .sort((a, b) => (unitNumberByWorld[a.id] ?? 99) - (unitNumberByWorld[b.id] ?? 99));
  const THEORY_UNITS = packs
    .flatMap((p) => p.THEORY_UNITS || [])
    .sort((a, b) => (unitNumberById[a.unitId] ?? 99) - (unitNumberById[b.unitId] ?? 99));

  const registry = {
    UNITS,
    SKILLS: Object.assign({}, ...packs.map((p) => p.SKILLS || {})),
    SKILL_HINTS: Object.assign({}, ...packs.map((p) => p.SKILL_HINTS || {})),
    WORLDS,
    LEVELS: Object.assign({}, ...packs.map((p) => p.LEVELS || {})),
    CHALLENGES: Object.assign({}, ...packs.map((p) => p.CHALLENGES || {})),
    THEORY_UNITS,
    SCENARIOS: packs.flatMap((p) => p.SCENARIOS || []),
  };

  const worldToUnit = Object.fromEntries(Object.values(UNITS).map((u) => [u.worldId, u.id]));

  return {
    ...registry,
    unitIdForWorld: (worldId) => worldToUnit[worldId] || null,
    unitToWorld: (unitId) => UNITS[unitId]?.worldId || null,
    getTheoryUnit: (unitId) => THEORY_UNITS.find((u) => u.unitId === unitId) || null,
    getAllTheoryQuestions: (unitId) => {
      const unit = THEORY_UNITS.find((u) => u.unitId === unitId);
      return unit ? unit.topics.flatMap((t) => t.questions || []) : [];
    },
    getScenariosForUnit: (unitId) => registry.SCENARIOS.filter((s) => s.unitId === unitId),
  };
}
