/*
 * Generate a Business Studies report practice test.
 * POST /api/generate-business-report-test
 * Body: { scenarioId?, difficulty?, unitIds? }
 */

const STATIC_TESTS = {
  'green-harvest': {
    id: 'green-harvest',
    title: 'Report on the Most Suitable Form of Ownership for Green Harvest Farms',
    scenario: 'Green Harvest Farms started as a small vegetable farm owned by one person. The business has grown and now supplies local supermarkets. The owner wants to expand nationally, buy new equipment, employ more workers, and reduce personal financial risk. The owner is also concerned about creating a professional image and attracting investors.',
    totalMarks: 50,
    unitId: 'B7',
    sections: [
      {
        title: 'Task requirements',
        prompts: [
          'Explain the current form of ownership.',
          'Discuss advantages and disadvantages of the current form.',
          'Compare partnership and private company as options.',
          'Recommend the most suitable form of ownership for expansion.',
          'Justify your recommendation with business reasons.',
        ],
      },
    ],
    rubric: [
      { criterion: 'Report structure and headings', marks: 8 },
      { criterion: 'Correct business terminology and definitions', marks: 10 },
      { criterion: 'Comparison of ownership forms', marks: 12 },
      { criterion: 'Application to Green Harvest scenario', marks: 10 },
      { criterion: 'Conclusion and justified recommendations', marks: 10 },
    ],
  },
  'brighttech': {
    id: 'brighttech',
    title: 'Report on Professionalism and Ethics at BrightTech Pty Ltd',
    scenario: 'BrightTech Pty Ltd has grown quickly. Employees complain that managers communicate poorly, meetings start late, and some staff use company computers for personal projects during work hours. A customer complained that advertising exaggerates product benefits.',
    totalMarks: 50,
    unitId: 'B8',
    sections: [
      {
        title: 'Task requirements',
        prompts: [
          'Identify professional and ethical problems in the scenario.',
          'Explain why these problems are harmful to the business.',
          'Discuss the importance of organisational culture.',
          'Recommend practical solutions to improve professionalism and ethics.',
        ],
      },
    ],
    rubric: [
      { criterion: 'Report structure and formal tone', marks: 8 },
      { criterion: 'Identification of ethical/professional issues', marks: 12 },
      { criterion: 'Explanation of impact on business', marks: 10 },
      { criterion: 'Organisational culture theory', marks: 10 },
      { criterion: 'Practical justified recommendations', marks: 10 },
    ],
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scenarioId = 'green-harvest', difficulty = 'medium' } = req.body || {};
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const test = STATIC_TESTS[scenarioId] || STATIC_TESTS['green-harvest'];
    return res.status(200).json({ test: { ...test, difficulty, generated: 'static' } });
  }

  const base = STATIC_TESTS[scenarioId] || STATIC_TESTS['green-harvest'];

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
        max_tokens: 2000,
        system: `You create Grade 10 IEB Business Studies report practice tests. Return ONLY valid JSON with shape:
{ "title", "scenario", "totalMarks", "unitId", "sections": [{ "title", "prompts": [] }], "rubric": [{ "criterion", "marks" }] }
Difficulty: ${difficulty}. Focus on forms of ownership, ethics, and business report writing.`,
        messages: [{
          role: 'user',
          content: `Create a business report test similar to: ${base.title}. Scenario theme: ${base.scenario}`,
        }],
      }),
    });

    if (!response.ok) {
      const test = STATIC_TESTS[scenarioId] || STATIC_TESTS['green-harvest'];
      return res.status(200).json({ test: { ...test, difficulty, generated: 'static-fallback' } });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const test = JSON.parse(cleaned);
    return res.status(200).json({ test });
  } catch (err) {
    const test = STATIC_TESTS[scenarioId] || STATIC_TESTS['green-harvest'];
    return res.status(200).json({ test: { ...test, difficulty, generated: 'static-fallback', note: err.message } });
  }
}
