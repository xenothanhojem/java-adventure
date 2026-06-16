/*
 * Mark a Business Studies report practice test.
 * POST /api/mark-business-report-test
 * Body: { test, report: { title, introduction, procedure, findings, conclusion, recommendations } }
 */

function gradeFor(percentage) {
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  if (percentage >= 40) return 'E';
  return 'F';
}

function staticMark(test, report) {
  const text = Object.values(report || {}).join(' ').toLowerCase();
  let score = 0;
  const feedback = [];

  if (report.title?.trim().length > 10) { score += 5; feedback.push('Title present.'); }
  else feedback.push('Add a clear, specific title.');

  if (report.introduction?.trim().length > 40) { score += 8; feedback.push('Introduction explains purpose.'); }
  else feedback.push('Expand Terms of Reference / Introduction.');

  if (report.procedure?.trim().length > 20) { score += 5; feedback.push('Procedure section included.'); }
  else feedback.push('Add a brief Procedure / Methodology section.');

  if (report.findings?.trim().length > 120) { score += 15; feedback.push('Findings contain substantial analysis.'); }
  else feedback.push('Findings need more theory, comparison, and application.');

  const terms = ['liability', 'sole trader', 'partnership', 'company', 'pty', 'ethics', 'ethical', 'recommend'];
  const termHits = terms.filter((t) => text.includes(t)).length;
  score += Math.min(12, termHits * 2);
  if (termHits < 3) feedback.push('Use more business terminology (liability, legal personality, etc.).');

  if (text.includes('recommend')) { score += 8; feedback.push('Recommendations language used.'); }
  if (report.conclusion?.trim().length > 40) { score += 7; feedback.push('Conclusion summarises findings.'); }
  if (report.recommendations?.trim().length > 40) { score += 8; feedback.push('Recommendations provided.'); }

  const totalPossible = test?.totalMarks || 50;
  const totalAwarded = Math.min(totalPossible, score);
  const percentage = Math.round((totalAwarded / totalPossible) * 100);
  return {
    totalAwarded,
    totalPossible,
    percentage,
    grade: gradeFor(percentage),
    feedback,
    verdict: percentage >= 60
      ? 'Solid foundation. Keep linking theory to the scenario in full sentences.'
      : 'Keep practising report structure and applying ownership/ethics theory to the case study.',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { test, report } = req.body || {};
  if (!test || !report) {
    return res.status(400).json({ error: 'Missing required fields: test, report' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ result: staticMark(test, report) });
  }

  const rubricText = (test.rubric || [])
    .map((r) => `- ${r.criterion} (${r.marks} marks)`)
    .join('\n');

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
        system: `You mark Grade 10 IEB Business Studies reports. Return ONLY JSON:
{ "totalAwarded", "totalPossible", "percentage", "grade", "feedback": [], "verdict", "rubricBreakdown": [{ "criterion", "awarded", "possible", "comment" }] }
Grade: A 80+, B 70+, C 60+, D 50+, E 40+, F below 40.`,
        messages: [{
          role: 'user',
          content: `SCENARIO:\n${test.scenario}\n\nRUBRIC:\n${rubricText}\n\nSTUDENT REPORT:\nTitle: ${report.title}\nIntroduction: ${report.introduction}\nProcedure: ${report.procedure}\nFindings: ${report.findings}\nConclusion: ${report.conclusion}\nRecommendations: ${report.recommendations}`,
        }],
      }),
    });

    if (!response.ok) {
      return res.status(200).json({ result: staticMark(test, report) });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const result = JSON.parse(cleaned);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(200).json({ result: staticMark(test, report) });
  }
}
