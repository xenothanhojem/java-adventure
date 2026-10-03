/*
 * Serverless function: generate Do or Die challenges via Anthropic.
 *
 * POST /api/generate-challenges
 * Body: { subject, unitId, unitName, skills, skillHints, count, scenarioContext, difficulty }
 *
 * Returns an array of challenge objects matching the in-app shape:
 *   - mc:    { id, type:'mc', prompt, code?, options:[..4], answer:int, hint, explanation, skills }
 *   - tf:    { id, type:'tf', prompt, code?, answer:bool, hint, explanation, skills }
 *   - trace: { id, type:'trace', prompt, code, rows:[{label,answer}], hint, explanation, skills }
 *   - order: { id, type:'order', prompt, items:[..], answer:[indices], hint, explanation, skills }
 */

function buildSystemPrompt(subject = 'java') {
  if (subject === 'theory') {
    return `You are an expert Grade 10 Information Technology teacher in South Africa generating short timed quiz questions for Angelo, a Grade 10 learner studying the "Exploring IT: Theory Grade 10" textbook (CAPS IT).

Generate a JSON array of challenge objects. STRICT FORMAT - no prose, no markdown fences, just a JSON array.

Each challenge has these required fields:
  id (short string, unique within the array, e.g. "q1", "q2")
  type ("mc" | "tf" | "trace" | "order")
  prompt (the question text)
  skills (array of skill ids from the provided skill list)
  hint (one short helpful sentence, no answer)
  explanation (one or two sentences explaining the correct answer)

Type-specific:
  - mc: options (array of EXACTLY 4 strings), answer (integer 0-3 index)
  - tf: answer (boolean)
  - trace: code (a short table, expression or number to work from, \\n for newlines), rows (array of {label, answer}); answers are compared as exact strings, so use plain integers, binary digits, UPPERCASE hex, or a token the prompt names explicitly (e.g. "type TRUE or FALSE")
  - order: items (array of 4-6 short strings, in random order), answer (array of indices in correct order)

Optional: code (a binary/hex number, truth table, Boolean expression, URL or similar to display). Use \\n for line breaks.

RULES:
- IT Theory only: data representation, hardware, system software, networks, Boolean logic, Internet and WWW, social and ethical issues. NO programming code.
- Questions must be answerable in 30 seconds. Mix difficulty: a couple easy, mostly medium, one harder.
- Use a variety of types. Do not put 6 mc in a row.
- Spread the correct mc answer index across 0-3.
- Connect lightly to the scenario context. Use South African examples where natural.
- Stay strictly within the listed skills and Grade 10 scope. Verify every conversion and truth value.
- Return ONLY the JSON array.`;
  }
  return `You are an expert Java teacher generating short timed quiz questions for Angelo, a Grade 10 student in South Africa learning Java with NetBeans and the "Exploring IT: Java Programming Grade 10" textbook.

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
- Spread the correct mc answer index across 0-3.
- Make the questions thematically connect to the supplied scenario where possible (use scenario nouns lightly - e.g. nuke codes, vault digits, distress signals, asteroid speeds).
- Stay strictly within the listed skills and the Grade 10 textbook scope. No arrays, no user-defined classes, no exceptions, no collections.
- If the unit is Databases and SQL, use SQL statements (SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE) on a small sample table instead of Java.
- For trace questions, rows answers must be exact strings (e.g. "7" not "7.0" unless double). Mentally execute every snippet precisely.
- For mc, exactly one option correct.
- Return ONLY the JSON array. No explanation, no markdown.`;
}

function buildUserMessage({ unitId, unitName, skills, skillHints, count, scenarioContext, difficulty }) {
  const skillBlock = skills
    .map((id) => `  ${id} - ${(skillHints && skillHints[id]) || ''}`)
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
    subject = 'java',
    unitId,
    unitName,
    skills = [],
    skillHints = {},
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
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: buildSystemPrompt(subject),
        messages: [{
          role: 'user',
          content: buildUserMessage({ unitId, unitName, skills, skillHints, count: safeCount, scenarioContext, difficulty }),
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
