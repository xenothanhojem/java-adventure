/*
 * Serverless function: generate a step-by-step guide for a practical test.
 *
 * POST /api/guide-practical-test
 * Body: { test }
 *
 * Returns a structured walkthrough that helps the student approach the paper
 * without giving away the actual code.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const { test } = req.body || {};
  if (!test) {
    return res.status(400).json({ error: 'Missing required field: test' });
  }

  const questionsText = (test.sections || [])
    .flatMap(s => (s.questions || []).map(q => `${q.number} [${q.marks}]: ${q.text}`))
    .join('\n');

  const systemPrompt = `You are a warm, encouraging Grade 10 Java teacher in South Africa helping a student work through a practical coding test. The student has the test paper but doesn't know where to start.

Your job is to produce a STRUCTURED GUIDE that walks them through the paper step by step. You are a coach, not a cheat sheet -- guide their thinking without writing the code for them.

Respond with ONLY a JSON object (no markdown fences, no preamble):
{
  "overview": "1-2 sentences summarising what the program does and the big-picture approach",
  "startingPoint": {
    "title": "Where to begin",
    "steps": [
      "Create a new Java project in NetBeans called <className>",
      "Set up your class with the correct name",
      "Think about what global variables you need -- look at the table in the question"
    ]
  },
  "walkthrough": [
    {
      "questionNumber": "2.1",
      "title": "Short friendly title for this step",
      "thinkAbout": "A guiding question or prompt that helps the student think through this part",
      "approach": "1-3 sentences describing the approach in plain language. NO code, NO exact syntax. Guide the thinking.",
      "conceptReminder": "A brief reminder of the relevant Java concept (e.g. 'Remember: to store text in Java you use a specific data type that starts with a capital letter')",
      "commonMistake": "One common mistake to watch out for"
    }
  ],
  "testingTips": [
    "Short tip about how to test their program",
    "Another testing tip"
  ],
  "encouragement": "One warm sentence of encouragement"
}

CRITICAL RULES:
- NEVER write any Java code in the guide. Not even fragments like 'int x = 5' or 'System.out.println'. The student must write ALL code themselves.
- NEVER give the exact answer. Guide their thinking, don't solve it.
- For variable declaration questions, remind them to think about what TYPE of data each variable stores, but don't say 'use int' or 'use String'.
- For loop questions, remind them of the loop structure concept but don't give the syntax.
- For if/else questions, help them think about the conditions but don't write them out.
- Keep language simple and warm -- this is a Grade 10 student.
- The walkthrough should have one entry per question on the test paper.
- conceptReminder should reference the CONCEPT, not the syntax. Think "remember that Java has a way to repeat something a fixed number of times" not "use for(int i=0; i<n; i++)".
- Keep each field concise -- 1-3 sentences max.`;

  const userMessage = `Here is the practical test paper the student needs help with:

Title: ${test.title}
Scenario: ${test.scenario}
Class name: ${test.className}
Total marks: ${test.totalMarks}

Questions:
${questionsText}

Sample output:
${test.sampleOutput || '(not provided)'}

Generate the step-by-step guide. Return the JSON object.`;

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
        error: 'Failed to parse guide JSON',
        details: parseErr.message,
        raw: text.slice(0, 800),
      });
    }

    return res.status(200).json({ guide: parsed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
