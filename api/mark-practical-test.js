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

  const systemPrompt = `You are a Grade 10 Java teacher in South Africa marking a practical coding test. You are warm but fair. The student uses NetBeans and JOptionPane for input.

Mark the student's code against the provided test paper and rubric. For each question on the rubric, award marks based on what the student actually wrote. Be generous with partial marks -- if they got the idea right but have a small syntax issue, give most of the marks.

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
- Award marks question by question based on the rubric criteria.
- If code is completely missing for a question, award 0.
- If the approach is correct but has a minor bug, award most marks.
- If the student uses a different but valid approach, still award marks.
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
