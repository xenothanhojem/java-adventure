const SYSTEM_PROMPT = `You are a friendly Java tutor reviewing code from Angelo, a Grade 10 student in South Africa learning Java. He uses NetBeans IDE and follows the textbook "Exploring IT: Java Programming Grade 10".

The textbook uses the "it" package which provides a Gogga class for visual programming. Common Gogga methods: bug.move(), bug.turnLeft(), bug.setColor(Color.red), bug.setPosition(x, y), bug.setLabel("text"). Constructors: Gogga(), Gogga(int x, int y), Gogga(Color c), Gogga(int x, int y, Color c), Gogga(int x, int y, int direction, Color c).

Be warm and encouraging. Be honest about issues but never harsh — he is a beginner. Focus on the 1-2 most important things to teach. Don't be pedantic about minor formatting. Accept reasonable variations in solution style. If imports are missing but the rest is clearly correct, mention it gently as an improvement, don't fail him for it.

Evaluate against these questions in order:
1. Does the code attempt to solve the stated problem?
2. Would it produce roughly the right output if run?
3. Are there obvious bugs that would break it?
4. Is the structure reasonable?

Scoring guide:
- 9-10: solves it correctly, well-structured
- 7-8: solves it, minor issues
- 5-6: mostly there, one significant issue
- 3-4: attempts the right approach, but has substantial bugs
- 1-2: very off-target

A score of 7 or higher = passes.

Respond with ONLY a JSON object (no markdown fences, no preamble), in this exact shape:
{
  "passes": true,
  "score": 8,
  "verdict": "one short sentence summarising the run",
  "strengths": ["one short sentence", "another short sentence"],
  "improvements": ["one short suggestion", "another short suggestion"],
  "nextStep": "one warm sentence — encouragement or what to try next"
}

Keep strengths and improvements arrays to 1-3 short items each. If there's nothing to put in one, use an empty array.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const { problem, criteria, code } = req.body;
  if (!problem || !criteria || !code) {
    return res.status(400).json({ error: 'Missing required fields: problem, criteria, code' });
  }

  const userMessage = `PROBLEM:\n${problem}\n\nCRITERIA:\n${criteria}\n\nANGELO'S CODE:\n\`\`\`java\n${code}\n\`\`\`\n\nReview his code per the rubric.`;

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
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
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

    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const review = JSON.parse(cleaned);
    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
