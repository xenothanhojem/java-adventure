/*
 * Serverless function: generate Do or Die challenges via Anthropic.
 *
 * POST /api/generate-challenges
 * Body: { unitId, unitName, skills, count, scenarioContext, difficulty }
 *
 * Returns an array of challenge objects matching the in-app shape:
 *   - mc:    { id, type:'mc', prompt, code?, options:[..4], answer:int, hint, explanation, skills }
 *   - tf:    { id, type:'tf', prompt, code?, answer:bool, hint, explanation, skills }
 *   - trace: { id, type:'trace', prompt, code, rows:[{label,answer}], hint, explanation, skills }
 *   - order: { id, type:'order', prompt, items:[..], answer:[indices], hint, explanation, skills }
 */

const SKILL_HINTS = {
  // Unit 2
  'U2-S1': 'variable purpose: a variable stores a typed value with a name',
  'U2-S2': 'JOptionPane.showInputDialog returns text first',
  'U2-S3': 'choose int / double / String / char correctly',
  'U2-S4': 'Integer.parseInt and Double.parseDouble for converting input',
  'U2-S5': 'arithmetic with + - * / and correct precedence',
  'U2-S6': 'integer division drops decimals; % returns remainder',
  'U2-S7': 'increment, decrement, +=, *= and overwriting',
  'U2-S8': 'valid identifier rules: cannot start with digit, no spaces, no reserved words',
  // Unit 3
  'U3-S1': 'char uses single quotes, String uses double quotes',
  'U3-S2': "characters map to codes, e.g. 65 -> 'A'",
  'U3-S3': "escape sequences: \\n new line, \\t tab, \\\" quote, \\\\ backslash",
  'U3-S4': 'length() returns size, charAt(i) is zero-indexed',
  'U3-S5': 'casting (int) truncates a double',
  'U3-S6': 'conceptual conversions int <-> char, numbers <-> String',
  'U3-S7': 'Math.sqrt, Math.round, Math.abs, Math.pow, Math.PI',
  // Unit 4
  'U4-S1': 'name decomposition / pattern recognition / abstraction / algorithm',
  'U4-S2': 'break a problem into ordered sub-tasks',
  'U4-S3': 'IPO: identify input, processing, output',
  'U4-S4': 'spot repeated patterns; ignore irrelevant story details',
  'U4-S5': 'an algorithm is a step-by-step solution; correct order matters',
  'U4-S6': 'pseudocode uses begin/end/input/display/assignment arrows',
  'U4-S7': 'flowchart symbols: start/end, input/output, process, decision',
  'U4-S8': 'user-friendliness: clear prompts and meaningful outputs',
  'U4-S9': 'readability: descriptive names, indentation, layout',
  'U4-S10': 'syntax error / runtime error / logical error - classify each',
  'U4-S11': 'standard / abnormal / extreme test data categories',
  'U4-S12': 'trace tables: track variable values across each line',
  // Unit 5
  'U5-S1': 'loops repeat statements automatically',
  'U5-S2': 'for loop header: start, condition, update; control variable',
  'U5-S3': 'predict how many times the loop runs',
  'U5-S4': 'predict output of loop body and statements after the loop',
  'U5-S5': 'loop errors: infinite, never-runs, runs-once',
  'U5-S6': 'backward loops use --, condition i >= n',
  'U5-S7': 'a char can be a loop control variable',
  'U5-S8': 'step size other than 1 (i += 2 etc)',
  'U5-S9': 'sum / average accumulator pattern: sum = sum + value',
  'U5-S10': 'trace loop control variables and accumulators across passes',
  // Unit 6
  'U6-S1': 'multiple constructor signatures (overloading)',
  'U6-S2': 'object state: track field values across method calls',
  'U6-S3': 'Color class and Math.random for randomness',
  // Unit 7
  'U7-S1': 'if / else: one branch when true, the other when false',
  'U7-S2': '== != < <= > >= and English equivalents',
  'U7-S3': 'predict output of if/else for given inputs',
  'U7-S4': 'curly brackets group statements; indentation aids reading',
  'U7-S5': 'opposite condition (e.g. !(x > 5) is x <= 5)',
  'U7-S6': 'nested if: deeper checks only when earlier conditions hold',
  'U7-S7': 'separate ifs may both run; nested ifs share a path',
  'U7-S8': '&& both true, || either true, ! flips truth',
  'U7-S9': 'apply conditions in word problems (age, discount, divisibility)',
  // Binary
  'UB-S1': 'decimal is base 10 (digits 0-9); binary is base 2 (only 0 and 1)',
  'UB-S2': 'computers use binary because circuits have two states: on/off',
  'UB-S3': 'binary place values are powers of 2: 1, 2, 4, 8, 16, 32...',
  'UB-S4': 'binary to decimal: multiply each bit by its place value, sum the results',
  'UB-S5': 'decimal to binary: repeated division by 2 (read remainders bottom-to-top)',
  'UB-S6': 'binary addition: 0+0=0, 0+1=1, 1+1=10 (carry 1), 1+1+1=11',
  'UB-S7': 'binary subtraction: 0-0=0, 1-0=1, 1-1=0, 0-1 requires borrowing',
  'UB-S8': '1 bit = 0 or 1; 4 bits = nibble; 8 bits = byte',
};

function buildSystemPrompt() {
  return `You are an expert Java teacher generating short timed quiz questions for Angelo, a Grade 10 student in South Africa learning Java with NetBeans and the Exploring IT textbook.

You will generate a JSON array of challenge objects. STRICT FORMAT - no prose, no markdown fences, just a JSON array.

Each challenge has these required fields:
  id (short string, unique within the array, e.g. "g1", "g2")
  type ("mc" | "tf" | "trace" | "order")
  prompt (the question text)
  skills (array of skill ids from the provided skill list)
  hint (one short helpful sentence, no answer)
  explanation (one or two sentences explaining the correct answer)

Type-specific:
  - mc: options (array of EXACTLY 4 strings), answer (integer 0-3 index)
  - tf: answer (boolean)
  - trace: code (Java snippet as a string with \\n for newlines), rows (array of {label, answer} where answer is a string of the variable value at that step)
  - order: items (array of 4-6 short strings, in random order), answer (array of indices in correct order)

Optional: code (a Java snippet to display). Use \\n for line breaks.

RULES:
- Questions must be answerable in 30 seconds.
- Mix difficulty: a couple easy, mostly medium, one harder.
- Use a variety of types. Do not put 6 mc in a row.
- Make the questions thematically connect to the supplied scenario where possible (use scenario nouns lightly - e.g. nuke codes, vault digits, distress signals, asteroid speeds).
- Stay strictly within the listed skills. Do not invent advanced Java concepts (no arrays, no methods, no classes - keep it Grade 10 introductory).
- For trace questions, the code must use only int / double / String basics; rows answers must be exact strings (e.g. "7" not "7.0" unless double).
- For mc, exactly one option correct.
- Return ONLY the JSON array. No explanation, no markdown.`;
}

function buildUserMessage({ unitId, unitName, skills, count, scenarioContext, difficulty }) {
  const skillBlock = skills
    .map((id) => `  ${id} - ${SKILL_HINTS[id] || ''}`)
    .join('\n');
  return `Generate ${count} challenges for unit ${unitId} (${unitName}).

Allowed skills:
${skillBlock}

Difficulty: ${difficulty || 'medium'}.

Scenario context (for thematic flavour, optional):
"${scenarioContext || 'general practice'}"

Return a JSON array of ${count} challenge objects.`;
}

function safeParseChallenges(text) {
  // Strip code fences if Claude added any anyway
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

function validateChallenge(c) {
  if (!c || typeof c !== 'object') return false;
  if (!c.id || typeof c.id !== 'string') return false;
  if (!c.type || typeof c.type !== 'string') return false;
  if (!c.prompt || typeof c.prompt !== 'string') return false;
  if (!Array.isArray(c.skills)) return false;
  switch (c.type) {
    case 'mc':
      return Array.isArray(c.options) && c.options.length === 4
        && Number.isInteger(c.answer) && c.answer >= 0 && c.answer <= 3;
    case 'tf':
      return typeof c.answer === 'boolean';
    case 'trace':
      return typeof c.code === 'string' && Array.isArray(c.rows)
        && c.rows.every((r) => r && typeof r.label === 'string' && typeof r.answer === 'string');
    case 'order':
      return Array.isArray(c.items) && c.items.length >= 3
        && Array.isArray(c.answer) && c.answer.length === c.items.length;
    default:
      return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const {
    unitId,
    unitName,
    skills = [],
    count = 6,
    scenarioContext = '',
    difficulty = 'medium',
  } = req.body || {};

  if (!unitId || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ error: 'Missing required fields: unitId, skills' });
  }

  const safeCount = Math.max(3, Math.min(10, Number(count) || 6));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: buildSystemPrompt(),
        messages: [{
          role: 'user',
          content: buildUserMessage({ unitId, unitName, skills, count: safeCount, scenarioContext, difficulty }),
        }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(response.status).json({ error: `Anthropic API error: ${response.status}`, details: body });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    let parsed;
    try {
      parsed = safeParseChallenges(text);
    } catch (parseErr) {
      return res.status(502).json({ error: 'Failed to parse generated JSON', details: parseErr.message, raw: text.slice(0, 500) });
    }

    if (!Array.isArray(parsed)) {
      return res.status(502).json({ error: 'Generated content was not a JSON array' });
    }

    const valid = parsed.filter(validateChallenge);
    if (valid.length === 0) {
      return res.status(502).json({ error: 'No valid challenges in generated output', raw: text.slice(0, 500) });
    }

    return res.status(200).json({ challenges: valid });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
