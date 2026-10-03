/*
 * Canonical skill registry for the Java subject (Exploring IT: Java
 * Programming Grade 10, 3rd ed). Used for tagging challenges, deriving
 * mastery state, and powering the progress report. `sections` lists the
 * textbook section numbers each skill covers.
 */

export const UNITS = {
  U2: { id: 'U2', number: 2, name: 'Integer and Real Numbers', worldId: 'variables' },
  U3: { id: 'U3', number: 3, name: 'Characters, Strings and Math Class', worldId: 'strings' },
  U4: { id: 'U4', number: 4, name: 'Problem Solving using Computational Thinking', worldId: 'algorithms' },
  U5: { id: 'U5', number: 5, name: 'For Loops', worldId: 'loops' },
  U6: { id: 'U6', number: 6, name: 'More about objects', worldId: 'objects' },
  U7: { id: 'U7', number: 7, name: 'If Statements', worldId: 'logic' },
};

export const SKILLS = {
  // Unit 2 - Integer and Real Numbers
  'U2-S1': { unit: 'U2', name: 'Understand variables', description: 'A variable is a box in memory with an identifier, a data type and a value.', sections: ['2.1', '2.1.2', '2.1.3'] },
  'U2-S2': { unit: 'U2', name: 'Read input using dialog boxes', description: 'JOptionPane.showInputDialog shows an input prompt and returns what was typed as a String.', sections: ['2.1.1', '2.1.3', '2.1.8'] },
  'U2-S3': { unit: 'U2', name: 'Choose correct data type', description: 'int for whole numbers, double for real numbers, String for text.', sections: ['2.1.4', '2.1.6', '2.2'] },
  'U2-S4': { unit: 'U2', name: 'Convert input to numbers', description: 'Integer.parseInt and Double.parseDouble; NumberFormatException for bad input.', sections: ['2.1.5', '2.1.6', '2.1.8'] },
  'U2-S5': { unit: 'U2', name: 'Perform arithmetic with variables', description: 'Apply + - * / % and predict results.', sections: ['2.3', '2.3.4'] },
  'U2-S6': { unit: 'U2', name: 'Integer division and remainder', description: 'int / int drops the remainder; % returns the remainder; one real operand gives real division.', sections: ['2.3.1'] },
  'U2-S7': { unit: 'U2', name: 'Variable updates', description: 'Assigning, overwriting, incrementing, decrementing and compound assignment.', sections: ['2.2.3', '2.2.4', '2.3.2', '2.3.3'] },
  'U2-S8': { unit: 'U2', name: 'Use meaningful identifiers', description: 'Rules and conventions (camel case) for identifiers.', sections: ['2.1.2', '2.1.7', '2.1.7.1'] },
  'U2-S9': { unit: 'U2', name: 'Concatenation and the + operator', description: '+ adds numbers but joins Strings; brackets force addition inside output.', sections: ['2.1.2', '2.1.5', '2.3'] },
  'U2-S10': { unit: 'U2', name: 'Primitive data types and ranges', description: 'boolean, char, byte, short, int, long, float, double; sizes and the 2^(n-1) range formula.', sections: ['2.2'] },
  'U2-S11': { unit: 'U2', name: 'Declare and initialise variables', description: 'Declare once, initialise before use, and where to declare variables.', sections: ['2.2.1', '2.2.2', '2.3.6'] },
  'U2-S12': { unit: 'U2', name: 'Order of arithmetic operators', description: 'Brackets first, then * / %, then + -, left to right for equal priority.', sections: ['2.3.5'] },

  // Unit 3 - Characters, Strings and Math Class
  'U3-S1': { unit: 'U3', name: 'Distinguish char and String', description: 'Single quotes vs double quotes; one char vs many.', sections: ['3.1', '3.2'] },
  'U3-S2': { unit: 'U3', name: 'Understand character codes', description: 'Characters are stored as Unicode integer values (65 is A, 97 is a).', sections: ['3.1'] },
  'U3-S3': { unit: 'U3', name: 'Interpret escape sequences', description: '\\n, \\t, \\\\, \\\' and \\" and their formatting effects.', sections: ['3.1.1', '3.1.3', '3.1.3.1', '3.1.3.2'] },
  'U3-S4': { unit: 'U3', name: 'Understand string methods', description: 'length() and charAt() with zero-based positions.', sections: ['3.2', '3.2.1'] },
  'U3-S5': { unit: 'U3', name: 'Understand typecasting', description: 'Widening vs narrowing; (int) truncates; (double) prevents integer division.', sections: ['3.3', '3.3.1'] },
  'U3-S6': { unit: 'U3', name: 'Convert between variable types', description: 'The conversion table: String, int, double and char in every direction.', sections: ['3.3.2'] },
  'U3-S7': { unit: 'U3', name: 'Use Math class methods', description: 'sqrt, round, abs, pow and the constant Math.PI.', sections: ['3.4', '3.4.1', '3.4.2'] },
  'U3-S8': { unit: 'U3', name: 'Output with showMessageDialog', description: 'JOptionPane.showMessageDialog(null, ...) output, message types and \\n in dialogs.', sections: ['3.1.2', '3.1.3'] },
  'U3-S9': { unit: 'U3', name: 'Round to decimal places', description: 'Multiply by 100, Math.round, divide by 100.0 to round to 2 decimal places.', sections: ['3.4.1'] },

  // Unit 4 - Problem Solving using Computational Thinking
  'U4-S1': { unit: 'U4', name: 'Computational thinking components', description: 'Decomposition, pattern recognition, abstraction, algorithms.', sections: ['4.1'] },
  'U4-S2': { unit: 'U4', name: 'Decompose a problem', description: 'Understand the problem, then break it into smaller tasks.', sections: ['4.2', '4.2.1', '4.2.2'] },
  'U4-S3': { unit: 'U4', name: 'Use IPO model', description: 'Identify input, processing and output and the devices involved.', sections: ['4.2.3'] },
  'U4-S4': { unit: 'U4', name: 'Pattern recognition and abstraction', description: 'Reuse existing solutions; focus on relevant detail (zoom in, zoom out).', sections: ['4.3', '4.4'] },
  'U4-S5': { unit: 'U4', name: 'Understand algorithms', description: 'A step-by-step solution written as a flow chart or pseudocode.', sections: ['4.5'] },
  'U4-S6': { unit: 'U4', name: 'Read and write basic pseudocode', description: 'begin, end, input, display, assignment arrows, no declarations.', sections: ['4.5.3', '4.5.3.1'] },
  'U4-S7': { unit: 'U4', name: 'Read simple flowcharts', description: 'Symbols for start/end, statement, input/output, decision and arrows.', sections: ['4.5.2', '4.5.2.1'] },
  'U4-S8': { unit: 'U4', name: 'Understand user-friendliness', description: 'Clear prompts, meaningful output and a sensible user interface.', sections: ['4.6', '4.6.1', '4.6.2'] },
  'U4-S9': { unit: 'U4', name: 'Understand readability', description: 'Descriptive names, one statement per line, indentation, comments, blank lines, conventions.', sections: ['4.6.3'] },
  'U4-S10': { unit: 'U4', name: 'Classify error types', description: 'Syntax, run time, logical errors.', sections: ['4.6.4', '4.6.4.1'] },
  'U4-S11': { unit: 'U4', name: 'Select test data categories', description: 'Standard, extreme (boundary) and abnormal values.', sections: ['4.7.1'] },
  'U4-S12': { unit: 'U4', name: 'Trace-table reasoning', description: 'Track variables in memory and screen output line by line.', sections: ['4.7.3', '4.7.3.1'] },
  'U4-S13': { unit: 'U4', name: 'Choose a data structure', description: 'Select the main variables and their types; temporary variables are not part of it.', sections: ['4.5.1', '4.9.1.3'] },
  'U4-S14': { unit: 'U4', name: 'Acceptance testing and evaluation', description: 'Independent testing, client acceptance testing, evaluating and optimising a solution.', sections: ['4.7', '4.7.2', '4.8'] },
  'U4-S15': { unit: 'U4', name: 'Swop two variables', description: 'Use a temp variable so that no value is overwritten and lost.', sections: ['4.9.2', '4.9.2.1', '4.9.2.2', '4.9.2.3', '4.9.2.4', '4.9.2.6', '4.9.2.7'] },
  'U4-S16': { unit: 'U4', name: 'Trace using the IDE', description: 'Breakpoints, debug and step to watch variables change while the program runs.', sections: ['4.9.2.5'] },
  'U4-S17': { unit: 'U4', name: 'Solve a problem end to end', description: 'Abstraction, IPO, data structure, algorithm, code, test and evaluate (sales price, temperature).', sections: ['4.6', '4.9', '4.9.1', '4.9.3'] },

  // Unit 5 - For Loops
  'U5-S1': { unit: 'U5', name: 'Purpose of loops', description: 'A for loop (counting loop) repeats code a set number of times.', sections: ['5.1'] },
  'U5-S2': { unit: 'U5', name: 'For loop header', description: 'Initialiser, condition and increment; the loop control variable.', sections: ['5.1', '5.3'] },
  'U5-S3': { unit: 'U5', name: 'Predict loop execution count', description: 'How many times a loop runs and when it stops.', sections: ['5.1', '5.3'] },
  'U5-S4': { unit: 'U5', name: 'Predict output of repeated actions', description: 'What is printed during and after a loop.', sections: ['5.1', '5.3'] },
  'U5-S5': { unit: 'U5', name: 'Identify loop errors', description: 'Infinite loops, loops that never run, loops that run once, the stray semicolon.', sections: ['5.2'] },
  'U5-S6': { unit: 'U5', name: 'Backward loops', description: 'Loops that count down.', sections: ['5.5'] },
  'U5-S7': { unit: 'U5', name: 'Char-based loops', description: 'Loops with char as control variable.', sections: ['5.6'] },
  'U5-S8': { unit: 'U5', name: 'Loop step size', description: 'Increment or decrement by more than 1.', sections: ['5.7'] },
  'U5-S9': { unit: 'U5', name: 'Loops for totals and averages', description: 'Accumulators, sums, averages and testing them.', sections: ['5.10'] },
  'U5-S10': { unit: 'U5', name: 'Trace loop variables', description: 'Trace control variables, conditions and accumulators pass by pass.', sections: ['5.4'] },
  'U5-S11': { unit: 'U5', name: 'For loops in pseudocode', description: 'for var from start to end; inc by value ... end for.', sections: ['5.1.1'] },
  'U5-S12': { unit: 'U5', name: 'Flowchart a for loop', description: 'Initialise before, diamond test, True into the body, False bypasses, arrow back.', sections: ['5.3.1'] },
  'U5-S13': { unit: 'U5', name: 'Decompose loop problems', description: 'Decide what goes before, inside and after the loop.', sections: ['5.8', '5.8.1'] },
  'U5-S14': { unit: 'U5', name: 'Add terms in a series', description: 'Add the current term to sum, then work out the next term, on each pass.', sections: ['5.9'] },
  'U5-S15': { unit: 'U5', name: 'Loops with Gogga objects', description: 'Repeat Gogga moves and use the loop control variable as a position.', sections: ['5.1', '5.7'] },

  // Unit 6 - More About Objects
  'U6-S1': { unit: 'U6', name: 'Constructors and overloading', description: 'Gogga constructors, method overloading and method resolution.', sections: ['6.4', '6.4.2'] },
  'U6-S2': { unit: 'U6', name: 'Object state and state diagrams', description: 'Show the current field values of an object at a point in a program.', sections: ['6.5'] },
  'U6-S3': { unit: 'U6', name: 'Color class and RGB', description: 'Built-in colours, new Color(red, green, blue) with values 0 to 255, setColor.', sections: ['6.6', '6.6.1', '6.6.2'] },
  'U6-S4': { unit: 'U6', name: 'Declare and instantiate objects', description: 'new and the constructor create an instance with default field values.', sections: ['6.1'] },
  'U6-S5': { unit: 'U6', name: 'Objects in memory', description: 'An object variable stores the address of the object; primitives store their own value.', sections: ['6.2', '6.8.1'] },
  'U6-S6': { unit: 'U6', name: 'Multiple independent objects', description: 'Many objects from one class, each with its own field values.', sections: ['6.3'] },
  'U6-S7': { unit: 'U6', name: 'Use API documentation', description: 'Constructor Summary, Field Summary, method signatures and final constants.', sections: ['6.4.1', '6.6'] },
  'U6-S8': { unit: 'U6', name: 'Generate random numbers', description: 'Math.random and (int) (Math.random() * (B - A + 1)) + A.', sections: ['6.7', '6.7.1', '6.7.2'] },
  'U6-S9': { unit: 'U6', name: 'Generate random colours', description: 'Random red, green and blue values from 0 to 255 make a random Color.', sections: ['6.8', '6.8.1'] },

  // Unit 7 - If Statements
  'U7-S1': { unit: 'U7', name: 'If/else structure', description: 'Condition section and branch sections.', sections: ['7.1'] },
  'U7-S2': { unit: 'U7', name: 'Relational conditions', description: '==, !=, <, <=, >, >= and English translations.', sections: ['7.2'] },
  'U7-S3': { unit: 'U7', name: 'Predict if output', description: 'What is printed for given inputs and conditions.', sections: ['7.1', '7.1.1'] },
  'U7-S4': { unit: 'U7', name: 'Curly brackets and layout', description: 'Brackets group statements; indentation aids reading.', sections: ['7.1', '7.3'] },
  'U7-S5': { unit: 'U7', name: 'Opposite conditions', description: 'Write the opposite of a relational condition.', sections: ['7.2', '7.3'] },
  'U7-S6': { unit: 'U7', name: 'Nested if', description: 'An if inside the else part of another if.', sections: ['7.4'] },
  'U7-S7': { unit: 'U7', name: 'Separate independent ifs', description: 'When to use else and when separate ifs must each be checked.', sections: ['7.4.1'] },
  'U7-S8': { unit: 'U7', name: 'Logical operators', description: 'AND, OR, NOT (& | ! and && ||) in combined conditions.', sections: ['7.5', '7.6'] },
  'U7-S9': { unit: 'U7', name: 'Conditions in scenarios', description: 'Translate word problems into conditions.', sections: ['7.2', '7.5'] },
  'U7-S10': { unit: 'U7', name: 'Rules of the if statement', description: 'if...else is one statement, else is optional, == not =, no semicolon after the condition, Strings not compared with ==.', sections: ['7.3'] },
  'U7-S11': { unit: 'U7', name: 'How conditions are evaluated', description: 'The ALU evaluates conditions; order is brackets, NOT, AND, OR.', sections: ['7.5.1', '7.6'] },
  'U7-S12': { unit: 'U7', name: 'Conditional vs Boolean operators', description: '&& and || skip the second part when the answer is known; & and | always check both.', sections: ['7.6'] },
  'U7-S13': { unit: 'U7', name: 'Negate a condition', description: 'Put ! before the condition and swop the then and else parts.', sections: ['7.6.1'] },
  'U7-S14': { unit: 'U7', name: "De Morgan's law", description: 'NOT(A AND B) = NOT A OR NOT B, and NOT(A OR B) = NOT A AND NOT B.', sections: ['7.6.2'] },
  'U7-S15': { unit: 'U7', name: 'Valueless variable problem', description: 'Initialise variables that only get values inside if statements.', sections: ['7.7'] },
  'U7-S16': { unit: 'U7', name: 'If in pseudocode and flowcharts', description: 'if ... then ... else ... endif, indented, and the decision diamond.', sections: ['7.1.1', '7.4'] },
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
  'operator-precedence': 'U2-S12',
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
  'string-concat': 'U2-S9',
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
  'objects': 'U6-S4',
  'new-keyword': 'U6-S4',
  'declare-vs-instantiate': 'U6-S4',
  'multiple-objects': 'U6-S6',
  'state-diagram': 'U6-S2',
  'object-state': 'U6-S2',
  'gogga': 'U6-S2',
  'color': 'U6-S3',
  'color-class': 'U6-S3',
  'rgb': 'U6-S3',
  'random': 'U6-S8',

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

  // Binary moved to the IT Theory subject - drop by mapping to null
  'binary': null,
  'decimal': null,
  'number-systems': null,
  'binary-place-value': null,
  'binary-to-decimal': null,
  'decimal-to-binary': null,
  'binary-addition': null,
  'binary-subtraction': null,
  'bits-bytes': null,
  'bit': null,
  'byte': null,
  'UB-S1': null,
  'UB-S2': null,
  'UB-S3': null,
  'UB-S4': null,
  'UB-S5': null,
  'UB-S6': null,
  'UB-S7': null,
  'UB-S8': null,

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
