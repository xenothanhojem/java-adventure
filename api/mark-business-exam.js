/*
 * Mark a Grade 10 Business Studies practice exam.
 *
 * POST /api/mark-business-exam
 * Body: { exam, answers: { [questionNumber]: number | string }, essay: string }
 *
 * Section A is marked here against the stored answers. Sections B and C are
 * marked by Anthropic against the memo; awarded marks are clamped to the
 * marks available so totals stay consistent.
 */

function gradeFor(percentage) {
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  if (percentage >= 40) return 'E';
  return 'F';
}

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const clamp = (n, max) => Math.max(0, Math.min(max, Math.round(Number(n) || 0)));

function markSectionA(sectionA, answers) {
  const items = [];
  for (const q of sectionA.multipleChoice || []) {
    const given = answers[q.number];
    const correct = Number.isInteger(given) && given === q.answer;
    items.push({
      number: q.number, kind: 'mc', prompt: q.stem, marks: q.marks, awarded: correct ? q.marks : 0, correct,
      given: Number.isInteger(given) ? q.options[given] : null, correctAnswer: q.options[q.answer],
      explanation: q.explanation, skills: q.skills || [],
    });
  }
  for (const q of sectionA.chooseWord || []) {
    const given = answers[q.number];
    const correct = Number.isInteger(given) && given === q.answer;
    items.push({
      number: q.number, kind: 'word', prompt: q.stem, marks: q.marks, awarded: correct ? q.marks : 0, correct,
      given: Number.isInteger(given) ? q.choices[given] : null, correctAnswer: q.choices[q.answer],
      explanation: q.explanation, skills: q.skills || [],
    });
  }
  const options = sectionA.matching?.options || [];
  const optionText = (letter) => options.find((o) => o.letter === letter)?.text || '';
  for (const q of sectionA.matching?.items || []) {
    const given = str(answers[q.number]);
    const correct = given === q.answer;
    items.push({
      number: q.number, kind: 'match', prompt: q.text, marks: q.marks, awarded: correct ? q.marks : 0, correct,
      given: given ? `${given} - ${optionText(given)}` : null, correctAnswer: `${q.answer} - ${optionText(q.answer)}`,
      explanation: sectionA.matching?.explanation || '', skills: q.skills || [],
    });
  }
  return {
    awarded: items.reduce((t, i) => t + i.awarded, 0),
    possible: items.reduce((t, i) => t + i.marks, 0),
    items,
  };
}

function buildMarkingPrompt() {
  return `You are an experienced Grade 10 Business Studies examiner at an IEB school in South Africa, marking a learner's practice exam with the memo provided.

MARKING RULES
- Award marks only for points that match a memo point or are clearly correct alternatives in the learner's own words. The memo shows the marks each point earns in brackets.
- "Name / State / List N" questions: mark only the first N facts the learner gives.
- "Explain / Describe / Discuss" points need the fact AND a development (why or how) for full marks; a bare fact earns at most half.
- "Identify ... and quote" questions: the identification mark and the quote mark are separate; the quote must come from the case study.
- Applied questions must refer to the case study; generic theory with no link to the case earns at most half.
- Never award more than the marks available for a sub-question, an essay bullet or an insight criterion.
- Ignore spelling and grammar unless the meaning is lost. Blank answers get 0.
- Feedback is for a Grade 10 learner: one or two encouraging, specific sentences naming what earned marks and what was missing.

ESSAY (if present)
- Mark each bullet's content against its memo, then the insight criteria as described.
- Layout: credit a real introduction and conclusion, not a repeated question.

RETURN ONLY JSON (no markdown fences):
{
  "subQuestions": { "2.1": { "awarded": 3, "feedback": "...", "credited": ["memo point credited", "..."], "missed": ["memo point missed", "..."] } },
  "essay": { "bullets": [{ "awarded": 6, "feedback": "..." }], "insight": [{ "awarded": 1, "comment": "..." }], "feedback": "..." } or null,
  "strengths": ["2-3 short strengths"],
  "improvements": ["2-3 short, specific things to work on, naming the textbook topic"],
  "verdict": "one or two sentences overall"
}`;
}

function buildMarkingMessage(exam, answers, essay) {
  const parts = [];
  for (const q of exam.sectionB || []) {
    parts.push(`QUESTION ${q.number}: ${q.title}\nCase study:\n${q.caseStudy}`);
    for (const s of q.subQuestions) {
      parts.push(`--- ${s.number} (${s.marks} marks): ${s.text}\nMemo:\n${s.memo.map((m) => `  - ${m}`).join('\n')}\nLearner answer:\n${str(answers[s.number]) || '[blank]'}`);
    }
  }
  if (exam.sectionC) {
    const c = exam.sectionC;
    parts.push(`QUESTION ${c.number} (ESSAY, ${c.marks} marks): ${c.title}\nContext: ${c.context}`);
    c.bullets.forEach((b, i) => {
      parts.push(`--- Bullet ${i + 1} (${b.marks} marks): ${b.text}\nMemo:\n${b.memo.map((m) => `  - ${m}`).join('\n')}`);
    });
    parts.push(`Insight criteria:\n${(c.insight || []).map((r) => `  - ${r.criterion} (${r.marks}): ${r.description}`).join('\n')}`);
    parts.push(`Learner essay:\n${str(essay) || '[blank]'}`);
  }
  return `${parts.join('\n\n')}\n\nMark every sub-question listed${exam.sectionC ? ' and the essay' : ''}. Return ONLY the JSON object.`;
}

function parseJson(text) {
  const cleaned = String(text || '').replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  return JSON.parse(start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned);
}

function hasWriting(exam, answers, essay) {
  const subs = (exam.sectionB || []).flatMap((q) => q.subQuestions);
  return subs.some((s) => str(answers[s.number])) || (exam.sectionC && str(essay));
}

function assemble(exam, answers, essay, ai) {
  const sectionB = (exam.sectionB || []).map((q) => {
    const subQuestions = q.subQuestions.map((s) => {
      const blank = !str(answers[s.number]);
      const m = (!blank && ai?.subQuestions?.[s.number]) || {};
      return {
        number: s.number,
        text: s.text,
        possible: s.marks,
        awarded: blank ? 0 : clamp(m.awarded, s.marks),
        feedback: blank ? 'No answer given.' : str(m.feedback),
        credited: Array.isArray(m.credited) ? m.credited.map(str).filter(Boolean) : [],
        missed: Array.isArray(m.missed) ? m.missed.map(str).filter(Boolean) : [],
        memo: s.memo,
        skills: s.skills || [],
      };
    });
    return {
      number: q.number,
      title: q.title,
      possible: subQuestions.reduce((t, s) => t + s.possible, 0),
      awarded: subQuestions.reduce((t, s) => t + s.awarded, 0),
      subQuestions,
    };
  });

  let sectionC = null;
  if (exam.sectionC) {
    const c = exam.sectionC;
    const blank = !str(essay);
    const e = (!blank && ai?.essay) || {};
    const bullets = c.bullets.map((b, i) => ({
      text: b.text,
      possible: b.marks,
      awarded: blank ? 0 : clamp(e.bullets?.[i]?.awarded, b.marks),
      feedback: blank ? '' : str(e.bullets?.[i]?.feedback),
      memo: b.memo,
      skills: b.skills || [],
    }));
    const insight = (c.insight || []).map((r, i) => ({
      criterion: r.criterion,
      possible: r.marks,
      awarded: blank ? 0 : clamp(e.insight?.[i]?.awarded, r.marks),
      comment: blank ? '' : str(e.insight?.[i]?.comment),
    }));
    sectionC = {
      number: c.number,
      title: c.title,
      possible: c.marks,
      awarded: bullets.reduce((t, b) => t + b.awarded, 0) + insight.reduce((t, r) => t + r.awarded, 0),
      bullets,
      insight,
      feedback: blank ? 'No essay submitted.' : str(e.feedback),
    };
  }
  return { sectionB, sectionC };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { exam, answers = {}, essay = '' } = req.body || {};
  if (!exam || !exam.sectionA || !Array.isArray(exam.sectionB)) {
    return res.status(400).json({ error: 'Missing required field: exam' });
  }

  const sectionA = markSectionA(exam.sectionA, answers);
  let ai = null;

  if (hasWriting(exam, answers, essay)) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
    }
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
          max_tokens: 6000,
          system: buildMarkingPrompt(),
          messages: [{ role: 'user', content: buildMarkingMessage(exam, answers, essay) }],
        }),
      });
      if (!response.ok) {
        const body = await response.text();
        return res.status(response.status).json({ error: `Anthropic API error: ${response.status}`, details: body });
      }
      const data = await response.json();
      const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
      ai = parseJson(text);
    } catch (err) {
      return res.status(502).json({ error: `Marking failed: ${err.message}` });
    }
  }

  const { sectionB, sectionC } = assemble(exam, answers, essay, ai);
  const totalPossible = sectionA.possible
    + sectionB.reduce((t, q) => t + q.possible, 0)
    + (sectionC ? sectionC.possible : 0);
  const totalAwarded = sectionA.awarded
    + sectionB.reduce((t, q) => t + q.awarded, 0)
    + (sectionC ? sectionC.awarded : 0);
  const percentage = totalPossible ? Math.round((totalAwarded / totalPossible) * 100) : 0;

  return res.status(200).json({
    result: {
      totalAwarded,
      totalPossible,
      percentage,
      grade: gradeFor(percentage),
      sectionA,
      sectionB,
      sectionC,
      strengths: Array.isArray(ai?.strengths) ? ai.strengths.map(str).filter(Boolean) : [],
      improvements: Array.isArray(ai?.improvements) ? ai.improvements.map(str).filter(Boolean) : [],
      verdict: str(ai?.verdict) || (percentage >= 60 ? 'Good work on the objective questions.' : 'Revise the topics you missed and try another paper.'),
    },
  });
}
