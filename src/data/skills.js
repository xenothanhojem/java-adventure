/*
 * Canonical skill registry from java_game_curriculum_mastery_map.md.
 * Used for tagging challenges, deriving mastery state, and powering the
 * progress report.
 */

export const UNITS = {
  U2: { id: 'U2', number: 2, name: 'Integer and Real Numbers', worldId: 'variables' },
  U3: { id: 'U3', number: 3, name: 'Characters, Strings and Math Class', worldId: 'strings' },
  U4: { id: 'U4', number: 4, name: 'Problem Solving using Computational Thinking', worldId: 'algorithms' },
  U5: { id: 'U5', number: 5, name: 'For Loops', worldId: 'loops' },
  U6: { id: 'U6', number: 6, name: 'More about objects', worldId: 'objects' },
  U7: { id: 'U7', number: 7, name: 'If Statements', worldId: 'logic' },
  UB: { id: 'UB', number: 8, name: 'Binary Calculations and Conversions', worldId: 'binary' },
};

export const SKILLS = {
  // Unit 2 - Integer and Real Numbers
  'U2-S1': { unit: 'U2', name: 'Understand variables', description: 'A variable stores a value with a name and type.' },
  'U2-S2': { unit: 'U2', name: 'Read input using dialog boxes', description: 'JOptionPane.showInputDialog returns text first.' },
  'U2-S3': { unit: 'U2', name: 'Choose correct data type', description: 'int for whole numbers, double for decimals, String for text.' },
  'U2-S4': { unit: 'U2', name: 'Convert input to numbers', description: 'Integer.parseInt and Double.parseDouble.' },
  'U2-S5': { unit: 'U2', name: 'Perform arithmetic with variables', description: 'Apply + - * / % and predict results.' },
  'U2-S6': { unit: 'U2', name: 'Integer division and remainder', description: 'Integer division drops decimals; % returns remainder.' },
  'U2-S7': { unit: 'U2', name: 'Variable updates', description: 'Increment, decrement, compound assignment, overwriting.' },
  'U2-S8': { unit: 'U2', name: 'Use meaningful identifiers', description: 'Recognise valid and clear variable names.' },

  // Unit 3 - Characters, Strings, Math
  'U3-S1': { unit: 'U3', name: 'Distinguish char and String', description: 'Single quotes vs double quotes; one char vs many.' },
  'U3-S2': { unit: 'U3', name: 'Understand character codes', description: 'Characters map to numeric values (e.g. 65 -> A).' },
  'U3-S3': { unit: 'U3', name: 'Interpret escape sequences', description: '\\n, \\t, \\", \\\\ and their formatting effects.' },
  'U3-S4': { unit: 'U3', name: 'Understand string methods', description: 'length() and charAt() with zero-based indexing.' },
  'U3-S5': { unit: 'U3', name: 'Understand typecasting', description: 'Widening vs narrowing; (int) truncates decimals.' },
  'U3-S6': { unit: 'U3', name: 'Convert between related types', description: 'int <-> char, numbers <-> String conceptually.' },
  'U3-S7': { unit: 'U3', name: 'Use Math class methods', description: 'sqrt, round, abs, pow, PI and their results.' },

  // Unit 4 - Computational Thinking
  'U4-S1': { unit: 'U4', name: 'Computational thinking components', description: 'Decomposition, pattern recognition, abstraction, algorithms.' },
  'U4-S2': { unit: 'U4', name: 'Decompose a problem', description: 'Break a task into ordered sub-tasks.' },
  'U4-S3': { unit: 'U4', name: 'Use IPO model', description: 'Identify input, processing, output for a problem.' },
  'U4-S4': { unit: 'U4', name: 'Pattern recognition and abstraction', description: 'Spot repeated structure; ignore irrelevant details.' },
  'U4-S5': { unit: 'U4', name: 'Understand algorithms', description: 'Step-by-step solutions in correct order.' },
  'U4-S6': { unit: 'U4', name: 'Read and write basic pseudocode', description: 'begin, end, input, display, assignment arrows.' },
  'U4-S7': { unit: 'U4', name: 'Read simple flowcharts', description: 'Symbols for start/end, input/output, process, decision.' },
  'U4-S8': { unit: 'U4', name: 'Understand user-friendliness', description: 'Clear prompts and meaningful outputs.' },
  'U4-S9': { unit: 'U4', name: 'Understand readability', description: 'Naming, indentation, spacing, layout.' },
  'U4-S10': { unit: 'U4', name: 'Classify error types', description: 'Syntax, runtime, logical errors.' },
  'U4-S11': { unit: 'U4', name: 'Select test data categories', description: 'Standard, abnormal, extreme values.' },
  'U4-S12': { unit: 'U4', name: 'Trace-table reasoning', description: 'Track variable changes step by step.' },

  // Unit 5 - For Loops
  'U5-S1': { unit: 'U5', name: 'Purpose of loops', description: 'Loops repeat statements automatically.' },
  'U5-S2': { unit: 'U5', name: 'For loop header', description: 'Start value, condition, update, control variable.' },
  'U5-S3': { unit: 'U5', name: 'Predict loop execution count', description: 'How many times a loop runs and when it stops.' },
  'U5-S4': { unit: 'U5', name: 'Predict output of repeated actions', description: 'What is printed during and after a loop.' },
  'U5-S5': { unit: 'U5', name: 'Identify loop errors', description: 'Infinite loops, never-runs, runs-once.' },
  'U5-S6': { unit: 'U5', name: 'Backward loops', description: 'Loops that count down.' },
  'U5-S7': { unit: 'U5', name: 'Char-based loops', description: 'Loops with char as control variable.' },
  'U5-S8': { unit: 'U5', name: 'Loop step size', description: 'Increment or decrement by more than 1.' },
  'U5-S9': { unit: 'U5', name: 'Loops for totals and averages', description: 'Accumulators, sums, averages.' },
  'U5-S10': { unit: 'U5', name: 'Trace loop variables', description: 'Trace control variables and accumulators.' },

  // Unit 6 - Objects (no formal mastery map, retained from app)
  'U6-S1': { unit: 'U6', name: 'Constructors and overloading', description: 'Multiple constructor signatures.' },
  'U6-S2': { unit: 'U6', name: 'Object state', description: 'Track and reason about object state.' },
  'U6-S3': { unit: 'U6', name: 'Color and randomness', description: 'Color class and random numbers.' },

  // Unit 7 - If Statements
  'U7-S1': { unit: 'U7', name: 'If/else structure', description: 'Condition section and branch sections.' },
  'U7-S2': { unit: 'U7', name: 'Relational conditions', description: '==, !=, <, <=, >, >= and English translations.' },
  'U7-S3': { unit: 'U7', name: 'Predict if output', description: 'What is printed for given inputs and conditions.' },
  'U7-S4': { unit: 'U7', name: 'Curly brackets and layout', description: 'Brackets group statements; indentation aids reading.' },
  'U7-S5': { unit: 'U7', name: 'Opposite conditions', description: 'Derive the inverse of a condition.' },
  'U7-S6': { unit: 'U7', name: 'Nested if', description: 'Decisions inside decisions.' },
  'U7-S7': { unit: 'U7', name: 'Separate independent ifs', description: 'When multiple ifs must each be checked.' },
  'U7-S8': { unit: 'U7', name: 'Logical operators', description: '&&, ||, ! and combined conditions.' },
  'U7-S9': { unit: 'U7', name: 'Conditions in scenarios', description: 'Apply conditions to word problems.' },

  // Binary Calculations and Conversions
  'UB-S1': { unit: 'UB', name: 'Number systems', description: 'Decimal vs binary, base/radix concept.' },
  'UB-S2': { unit: 'UB', name: 'Why computers use binary', description: 'Two-state electronics, on/off, reliability.' },
  'UB-S3': { unit: 'UB', name: 'Binary place value', description: 'Powers of 2, reading binary columns.' },
  'UB-S4': { unit: 'UB', name: 'Binary to decimal', description: 'Convert binary to decimal using place values.' },
  'UB-S5': { unit: 'UB', name: 'Decimal to binary', description: 'Repeated division or place-value decomposition.' },
  'UB-S6': { unit: 'UB', name: 'Binary addition', description: 'Column addition with carry in binary.' },
  'UB-S7': { unit: 'UB', name: 'Binary subtraction', description: 'Subtraction with borrowing in binary.' },
  'UB-S8': { unit: 'UB', name: 'Bits bytes and storage', description: 'Bit, nibble, byte terminology.' },
};

/*
 * Cross-unit integrated skill groups (mastery map section 8).
 * Each group lists the constituent skill ids that, when all secure,
 * indicate cross-unit competence.
 */
export const SKILL_GROUPS = {
  A: {
    name: 'Input + Type + Arithmetic',
    description: 'Dialog input, parsing, type selection, arithmetic prediction.',
    skills: ['U2-S2', 'U2-S3', 'U2-S4', 'U2-S5'],
  },
  B: {
    name: 'Strings + Conditions',
    description: 'length, charAt, %, if statements based on string size or character.',
    skills: ['U3-S4', 'U2-S6', 'U7-S2', 'U7-S3'],
  },
  C: {
    name: 'Loop + Output + Accumulator',
    description: 'For loops, totals, averages, trace table reasoning.',
    skills: ['U5-S2', 'U5-S4', 'U5-S9', 'U5-S10'],
  },
  D: {
    name: 'Computational Thinking + Coding Logic',
    description: 'IPO, algorithm ordering, error spotting, output reasoning.',
    skills: ['U4-S3', 'U4-S5', 'U4-S10', 'U5-S4'],
  },
  E: {
    name: 'Conditions + Loops',
    description: 'Loop-generated values with conditional checks; pattern reasoning.',
    skills: ['U5-S3', 'U5-S4', 'U7-S3', 'U7-S8'],
  },
};

/*
 * Mapping from legacy short-tag skill ids (used in earlier challenge data)
 * to the canonical unit-prefixed ids. Used for state migration on load.
 */
export const LEGACY_SKILL_MAP = {
  // Unit 2
  'variable-type-selection': 'U2-S3',
  'data-types': 'U2-S3',
  'arithmetic-output': 'U2-S5',
  'arithmetic': 'U2-S5',
  'operators': 'U2-S5',
  'operator-precedence': 'U2-S5',
  'integer-division': 'U2-S6',
  'modulus': 'U2-S6',
  'increment-operator': 'U2-S7',
  'increment': 'U2-S7',
  'compound-assignment': 'U2-S7',
  'identifier-rules': 'U2-S8',
  'identifiers': 'U2-S8',
  'input-conversion': 'U2-S4',
  'input': 'U2-S2',
  'parsing': 'U2-S4',

  // Unit 3
  'char-vs-string': 'U3-S1',
  'quote-rules': 'U3-S1',
  'char': 'U3-S1',
  'string-length': 'U3-S4',
  'charAt': 'U3-S4',
  'indexing': 'U3-S4',
  'string-concat': 'U3-S4',
  'string-operations': 'U3-S4',
  'strings': 'U3-S4',
  'escape-characters': 'U3-S3',
  'escape': 'U3-S3',
  'typecasting': 'U3-S5',
  'typecast': 'U3-S5',
  'casting': 'U3-S5',
  'math-methods': 'U3-S7',
  'math': 'U3-S7',
  'math-class': 'U3-S7',
  'character-codes': 'U3-S2',

  // Unit 4
  'decomposition': 'U4-S2',
  'pattern-recognition': 'U4-S4',
  'abstraction': 'U4-S4',
  'algorithms': 'U4-S5',
  'algorithm': 'U4-S5',
  'algorithm-order': 'U4-S5',
  'ipo': 'U4-S3',
  'pseudocode': 'U4-S6',
  'flowchart': 'U4-S7',
  'flowchart-symbols': 'U4-S7',
  'error-types': 'U4-S10',
  'syntax-error': 'U4-S10',
  'runtime-error': 'U4-S10',
  'logical-error': 'U4-S10',
  'errors': 'U4-S10',
  'test-data': 'U4-S11',
  'testing': 'U4-S11',
  'standard-data': 'U4-S11',
  'extreme-data': 'U4-S11',
  'abnormal-data': 'U4-S11',
  'trace': 'U4-S12',
  'trace-table': 'U4-S12',
  'readability': 'U4-S9',
  'user-friendly': 'U4-S8',
  'common-mistakes': 'U4-S10',

  // Unit 5
  'loops': 'U5-S1',
  'when-to-loop': 'U5-S1',
  'for-loop': 'U5-S2',
  'nested-loops': 'U5-S2',
  'for-loop-count': 'U5-S3',
  'loop-count': 'U5-S3',
  'for-loop-output': 'U5-S4',
  'loop-output': 'U5-S4',
  'loop-never-runs': 'U5-S5',
  'loop-runs-forever': 'U5-S5',
  'loop-errors': 'U5-S5',
  'loop-direction': 'U5-S6',
  'backward-loop': 'U5-S6',
  'char-loop': 'U5-S7',
  'loop-step': 'U5-S8',
  'for-loop-sum': 'U5-S9',
  'for-loop-average': 'U5-S9',
  'for-loop-product': 'U5-S9',
  'accumulator': 'U5-S9',
  'sum': 'U5-S9',
  'average': 'U5-S9',

  // Unit 6
  'constructors': 'U6-S1',
  'method-overloading': 'U6-S1',
  'overloading': 'U6-S1',
  'objects': 'U6-S2',
  'new-keyword': 'U6-S2',
  'declare-vs-instantiate': 'U6-S2',
  'multiple-objects': 'U6-S2',
  'state-diagram': 'U6-S2',
  'object-state': 'U6-S2',
  'gogga': 'U6-S2',
  'color': 'U6-S3',
  'color-class': 'U6-S3',
  'rgb': 'U6-S3',
  'random': 'U6-S3',

  // Unit 7
  'if': 'U7-S1',
  'if-else': 'U7-S1',
  'relational': 'U7-S2',
  'relational-operator': 'U7-S2',
  'if-output': 'U7-S3',
  'brackets': 'U7-S4',
  'opposite': 'U7-S5',
  'nested-if': 'U7-S6',
  'separate-if': 'U7-S7',
  'logical-operators': 'U7-S8',
  'and-or-not': 'U7-S8',
  'scenarios': 'U7-S9',

  // Binary
  'binary': 'UB-S1',
  'decimal': 'UB-S1',
  'number-systems': 'UB-S1',
  'binary-place-value': 'UB-S3',
  'binary-to-decimal': 'UB-S4',
  'decimal-to-binary': 'UB-S5',
  'binary-addition': 'UB-S6',
  'binary-subtraction': 'UB-S7',
  'bits-bytes': 'UB-S8',
  'bit': 'UB-S8',
  'byte': 'UB-S8',

  // Generic / non-skill tags - drop by mapping to null
  'code-reading': null,
  'code-write': null,
};

export function migrateSkillId(id) {
  if (!id) return null;
  if (SKILLS[id]) return id;
  if (id in LEGACY_SKILL_MAP) return LEGACY_SKILL_MAP[id];
  return null;
}

export function migrateSkillIds(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const id of arr) {
    const mapped = migrateSkillId(id);
    if (mapped && !out.includes(mapped)) out.push(mapped);
  }
  return out;
}

/*
 * Mastery state derivation rules from mastery map sections 2.3 and 10.
 *
 *   Mastered  - 8/10 recent correct, across 3+ challenge types
 *   Secure    - 4/5 recent correct, across 2+ challenge types
 *   Practising - some attempts, inconsistent (>= 40% accuracy overall)
 *   Introduced - some attempts, weak accuracy
 *   NotStarted - no attempts
 *
 * Downgrade applied if the last 5 attempts have < 60% accuracy.
 */
export const MASTERY_STATES = ['notStarted', 'introduced', 'practising', 'secure', 'mastered'];

export const MASTERY_LABEL = {
  notStarted: 'Not Started',
  introduced: 'Introduced',
  practising: 'Practising',
  secure: 'Secure',
  mastered: 'Mastered',
};

export const MASTERY_COLOR = {
  notStarted: '#5d6481',
  introduced: '#ff7a7a',
  practising: '#ffb454',
  secure: '#5cf2ff',
  mastered: '#6ee7a8',
};

export function deriveMastery(stat) {
  if (!stat) return 'notStarted';
  const history = stat.history || [];
  const totalAttempts = (stat.correct || 0) + (stat.wrong || 0);
  if (totalAttempts === 0) return 'notStarted';

  const last10 = history.slice(-10);
  const last5 = history.slice(-5);

  const recent10Correct = last10.filter(h => h.correct).length;
  const recent5Correct = last5.filter(h => h.correct).length;
  const types10 = new Set(last10.map(h => h.challengeType).filter(Boolean));
  const types5 = new Set(last5.map(h => h.challengeType).filter(Boolean));

  const last5Accuracy = last5.length > 0 ? recent5Correct / last5.length : 0;
  const overallAccuracy = totalAttempts > 0 ? (stat.correct || 0) / totalAttempts : 0;

  if (last10.length >= 10 && recent10Correct >= 8 && types10.size >= 3) {
    return last5Accuracy < 0.6 ? 'secure' : 'mastered';
  }
  if (last5.length >= 5 && recent5Correct >= 4 && types5.size >= 2) {
    return last5Accuracy < 0.6 ? 'practising' : 'secure';
  }
  if (overallAccuracy >= 0.4) return 'practising';
  return 'introduced';
}

export function unitIdForSkill(skillId) {
  const skill = SKILLS[skillId];
  return skill ? skill.unit : null;
}
