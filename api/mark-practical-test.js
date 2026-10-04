/*
 * Serverless function: mark a practical coding test via Anthropic.
 *
 * POST /api/mark-practical-test
 * Body: { test, code }
 *   test  - the full test object (from generate-practical-test)
 *   code  - the student's Java code
 *
 * Returns a detailed marking breakdown per question plus overall feedback.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const { test, code } = req.body || {};
  if (!test || !code) {
    return res.status(400).json({ error: 'Missing required fields: test, code' });
  }

  const rubricText = (test.markingRubric || [])
    .map(r => `  ${r.questionNumber} [${r.marks} marks]: ${r.criteria}`)
    .join('\n');

  const questionsText = (test.sections || [])
    .flatMap(s => s.questions || [])
    .map(q => `  ${q.number} [${q.marks}]: ${q.text}`)
    .join('\n');

  const systemPrompt = `You are a Grade 10 Java teacher in South Africa marking a practical coding test with a marking guideline, the way SA IT practical papers are marked. You are warm but fair. The student uses NetBeans; data comes from JOptionPane input or from Math.random().

Mark the student's code against the provided test paper and rubric. Each rubric entry lists one tick per mark: award each tick independently when that item is present and correct in the student's code, so partial marks come from the ticks they earned.

Respond with ONLY a JSON object (no markdown fences, no preamble):
{
  "totalAwarded": <number>,
  "totalPossible": <number>,
  "percentage": <number 0-100>,
  "grade": "<letter A-F based on SA grading: 80+=A, 70+=B, 60+=C, 50+=D, 40+=E, <40=F>",
  "questionMarks": [
    {
      "number": "2.1",
      "awarded": <number>,
      "possible": <number>,
      "feedback": "Brief specific feedback on what was right/wrong"
    }
  ],
  "overallStrengths": ["short point", "short point"],
  "overallImprovements": ["short suggestion", "short suggestion"],
  "verdict": "One warm summary sentence about their performance",
  "nextStep": "One encouraging sentence about what to focus on next"
}

MARKING RULES:
- Award marks question by question, tick by tick, based on the rubric criteria.
- If code is completely missing for a question, award 0.
- A small syntax slip (such as a missing semicolon) should not cost more than 1 mark in that question.
- Where the question says "appropriate looping structure" or "appropriate programming structure", accept any valid choice (for, while or do...while; if or switch).
- If the student uses a different but valid approach, still award marks.
- For output-format ticks, check the literal text, spaces and tabs. A small capitalisation or wording difference costs at most 1 mark for that line.
- Random values in the student's output will differ from the sample output; judge the logic, not the numbers.
- Code that has been commented out does not earn marks.
- Be specific in feedback -- reference their actual code.
- Keep feedback items brief (1 sentence each).
- Do NOT fail them for missing imports if the logic is right.
- Grade boundaries: A (80-100), B (70-79), C (60-69), D (50-59), E (40-49), F (0-39).`;

  const userMessage = `TEST PAPER:
Title: ${test.title}
Scenario: ${test.scenario}
Class name: ${test.className}
Total marks: ${test.totalMarks}

QUESTIONS:
${questionsText}

MARKING RUBRIC:
${rubricText}

EXPECTED SAMPLE OUTPUT:
${test.sampleOutput || '(not provided)'}

STUDENT'S CODE:
\`\`\`java
${code}
\`\`\`

Mark this code against the rubric. Return the JSON marking result.`;

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
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(response.status).json({
        error: `Anthropic API error: ${response.status}`,
        details: body,
      });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      return res.status(502).json({
        error: 'Failed to parse marking JSON',
        details: parseErr.message,
        raw: text.slice(0, 800),
      });
    }

    return res.status(200).json({ result: parsed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
