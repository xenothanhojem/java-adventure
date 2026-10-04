/*
 * Generate a Grade 10 Business Studies practice exam (IEB-style) via Anthropic.
 *
 * POST /api/generate-business-exam
 * Body: {
 *   units: [{ id, name, notes, skills: [{ id, name }] }],   // notes = textbook summary for the chapter
 *   difficulty: 'easy' | 'medium' | 'hard',
 *   includeEssay: boolean,
 * }
 *
 * Returns { exam } where every Section A item carries its answer and every
 * Section B / C question carries a marking memo. Mark totals are recomputed
 * here so the paper always adds up.
 */

const SIZE = {
  easy: { mc: 4, word: 3, match: 3, bQuestions: 1, bMarks: 20, essayMarks: 20 },
  medium: { mc: 6, word: 4, match: 5, bQuestions: 2, bMarks: 20, essayMarks: 30 },
  hard: { mc: 10, word: 5, match: 5, bQuestions: 3, bMarks: 20, essayMarks: 40 },
};

const MAX_NOTES_PER_UNIT = 32000;
const MAX_NOTES_TOTAL = 128000;

function clip(text, max) {
  const s = String(text || '');
  return s.length <= max ? s : `${s.slice(0, max)}\n[notes truncated]`;
}

function buildSystemPrompt(size, includeEssay) {
  const aMarks = (size.mc + size.word + size.match) * 2;
  const essayLine = includeEssay
    ? `SECTION C (essay): ONE essay question worth ${size.essayMarks} marks.`
    : 'SECTION C: none. Set "sectionC" to null.';

  return `You are a senior Grade 10 Business Studies teacher and examiner at an IEB school in South Africa. You set practice exams for Angelo, a Grade 10 learner whose textbook is the "Business Studies Grade 10 Learner's Book" (Consumo Publishers, 6th edition).

You will receive textbook notes for the chapters to examine. Every question, answer and memo point MUST come from these notes: use the textbook's own terms, definitions and lists. Do not examine content that is not in the notes. Spread the questions across all the chapters provided, in proportion to how much content each has.

PAPER LAYOUT
SECTION A (objective, ${aMarks} marks, 2 marks per item), all in QUESTION 1:
  1.1 Multiple choice: ${size.mc} items, numbered 1.1.1, 1.1.2, ... Four options each, exactly one correct, plausible distractors taken from neighbouring textbook lists. Spread the correct index across 0-3.
  1.2 Choose the correct word: ${size.word} items, numbered 1.2.1, ... A statement with ONE blank written as "___" and 2 or 3 choices (as in "Choose the correct word(s) from those given in brackets").
  1.3 Match columns: ${size.match} Column A items, numbered 1.3.1, ..., and ${size.match + 2} Column B options lettered A, B, C, ... (two extra distractors). Each Column A item has exactly one correct letter and no letter is used twice.
SECTION B (direct and applied questions): ${size.bQuestions} question(s), each worth exactly ${size.bMarks} marks, numbered QUESTION 2, 3, ... Each question opens with a short South African business case study (4-7 sentences, a fictional business with a name, owner and situation), followed by 4-6 sub-questions numbered 2.1, 2.2, ... (and 2.1.1 style where useful). Mix the action verbs the way exams do:
  - Name / State / List (1 mark per fact, say how many: "Name THREE ...")
  - Define (2 marks)
  - Identify from the case study, then quote to motivate (e.g. "Identify the form of ownership. Quote from the scenario to support your answer." 1 mark identify + 1 mark quote)
  - Explain / Describe (2 marks per point: 1 for the fact, 1 for the explanation)
  - Distinguish / Differentiate (tabulate or explain both sides)
  - Discuss / Evaluate / Advise / Recommend applied to the case (2 marks per developed point)
  At least half of each question's marks must be applied to the case study.
${essayLine}
${includeEssay ? `  The essay gives a short context paragraph, then 3 or 4 bullet points the learner must address, each with its mark allocation. Content marks per bullet sum to ${size.essayMarks - 8}. Then 8 insight marks: Layout (2: introduction, body and conclusion), Analysis and interpretation (2), Synthesis (2: relevant, no repetition), Originality and examples (2: recent South African examples).` : ''}

MEMOS
Every Section B sub-question and every essay bullet has a memo: the marking points a teacher would tick, written as short statements from the notes, with the mark each point earns, e.g. "Unlimited liability: the owner can lose personal possessions if the business cannot pay its debts (2)". Give MORE memo points than marks available (alternatives a learner could reasonably write), and add "Accept any other relevant answer" where appropriate. Marks in a memo must add up to at least the sub-question's marks.

SKILLS
Tag every item and sub-question with 1-3 skill ids from the skill list of the chapter it examines.

RETURN ONLY JSON (no markdown fences) of exactly this shape:
{
  "title": "Grade 10 Business Studies Practice Exam: <short focus>",
  "sectionA": {
    "multipleChoice": [{ "number": "1.1.1", "stem": "...", "options": ["...","...","...","..."], "answer": 0, "explanation": "one sentence", "skills": ["B1-S2"] }],
    "chooseWord": [{ "number": "1.2.1", "stem": "A ... is owned by ___.", "choices": ["...","..."], "answer": 1, "explanation": "one sentence", "skills": ["B3-S2"] }],
    "matching": {
      "items": [{ "number": "1.3.1", "text": "...", "answer": "C", "skills": ["B8-S1"] }],
      "options": [{ "letter": "A", "text": "..." }],
      "explanation": "one or two sentences"
    }
  },
  "sectionB": [{
    "number": "2",
    "title": "short topic title",
    "caseStudy": "...",
    "subQuestions": [{ "number": "2.1", "text": "...", "marks": 4, "memo": ["point (2)", "point (2)", "alternative point (2)"], "skills": ["B3-S1"] }]
  }],
  "sectionC": ${includeEssay ? `{
    "number": "<next question number>",
    "title": "short essay title",
    "context": "...",
    "bullets": [{ "text": "Explain the ...", "marks": 8, "memo": ["point (2)", "..."], "skills": ["B6-S1"] }],
    "insight": [{ "criterion": "Layout", "marks": 2, "description": "Introduction, body and conclusion" }]
  }` : 'null'}
}

Check before returning: the numbering is consecutive, each Section B question's sub-question marks add up to ${size.bMarks}, each matching item has a unique letter, and every answer is correct according to the notes.`;
}

function buildUserMessage(units) {
  let budget = MAX_NOTES_TOTAL;
  const blocks = units.map((u) => {
    const notes = clip(u.notes, Math.min(MAX_NOTES_PER_UNIT, Math.max(2000, budget)));
    budget -= notes.length;
    const skills = (u.skills || []).map((s) => `  ${s.id}: ${s.name}`).join('\n');
    return `=== CHAPTER ${u.id}: ${u.name} ===\nSkill ids:\n${skills}\n\nTextbook notes:\n${notes}`;
  });
  return `Set the practice exam on these chapters.\n\n${blocks.join('\n\n')}\n\nReturn ONLY the JSON object.`;
}

function parseJson(text) {
  const cleaned = String(text || '')
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  return JSON.parse(start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned);
}

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const skillList = (v, allowed) => (Array.isArray(v) ? v.filter((s) => allowed.has(s)).slice(0, 3) : []);

function normaliseExam(raw, size, includeEssay, allowedSkills) {
  const a = raw.sectionA || {};

  const multipleChoice = (Array.isArray(a.multipleChoice) ? a.multipleChoice : [])
    .filter((q) => str(q.stem) && Array.isArray(q.options) && q.options.length === 4
      && Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3)
    .map((q, i) => ({
      number: `1.1.${i + 1}`, stem: str(q.stem), options: q.options.map(str), answer: q.answer,
      marks: 2, explanation: str(q.explanation), skills: skillList(q.skills, allowedSkills),
    }));

  const chooseWord = (Array.isArray(a.chooseWord) ? a.chooseWord : [])
    .filter((q) => str(q.stem) && Array.isArray(q.choices) && q.choices.length >= 2 && q.choices.length <= 3
      && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length)
    .map((q, i) => ({
      number: `1.2.${i + 1}`, stem: str(q.stem), choices: q.choices.map(str), answer: q.answer,
      marks: 2, explanation: str(q.explanation), skills: skillList(q.skills, allowedSkills),
    }));

  const m = a.matching || {};
  const options = (Array.isArray(m.options) ? m.options : [])
    .filter((o) => /^[A-Z]$/.test(str(o.letter)) && str(o.text))
    .map((o) => ({ letter: str(o.letter), text: str(o.text) }));
  const letters = new Set(options.map((o) => o.letter));
  const usedLetters = new Set();
  const matchItems = (Array.isArray(m.items) ? m.items : [])
    .filter((it) => {
      const letter = str(it.answer);
      if (!str(it.text) || !letters.has(letter) || usedLetters.has(letter)) return false;
      usedLetters.add(letter);
      return true;
    })
    .map((it, i) => ({
      number: `1.3.${i + 1}`, text: str(it.text), answer: str(it.answer),
      marks: 2, skills: skillList(it.skills, allowedSkills),
    }));

  const sectionAItems = multipleChoice.length + chooseWord.length + matchItems.length;
  if (sectionAItems < 5) throw new Error('Section A came back incomplete');

  const sectionB = (Array.isArray(raw.sectionB) ? raw.sectionB : [])
    .slice(0, size.bQuestions)
    .map((q, qi) => {
      const qNum = String(qi + 2);
      const subs = (Array.isArray(q.subQuestions) ? q.subQuestions : [])
        .filter((s) => str(s.text) && Number(s.marks) > 0 && Array.isArray(s.memo) && s.memo.length > 0)
        .map((s, si) => {
          const original = str(s.number);
          const keep = original.startsWith(`${qNum}.`) && /^\d+(\.\d+){1,2}$/.test(original);
          return {
            number: keep ? original : `${qNum}.${si + 1}`,
            text: str(s.text),
            marks: Math.round(Number(s.marks)),
            memo: s.memo.map(str).filter(Boolean),
            skills: skillList(s.skills, allowedSkills),
          };
        });
      return {
        number: qNum,
        title: str(q.title) || `Question ${qNum}`,
        caseStudy: str(q.caseStudy),
        subQuestions: subs,
        marks: subs.reduce((t, s) => t + s.marks, 0),
      };
    })
    .filter((q) => q.caseStudy && q.subQuestions.length > 0);

  if (sectionB.length === 0) throw new Error('Section B came back incomplete');

  let sectionC = null;
  if (includeEssay && raw.sectionC && typeof raw.sectionC === 'object') {
    const c = raw.sectionC;
    const bullets = (Array.isArray(c.bullets) ? c.bullets : [])
      .filter((b) => str(b.text) && Number(b.marks) > 0 && Array.isArray(b.memo))
      .map((b) => ({
        text: str(b.text), marks: Math.round(Number(b.marks)),
        memo: b.memo.map(str).filter(Boolean), skills: skillList(b.skills, allowedSkills),
      }));
    const insight = (Array.isArray(c.insight) ? c.insight : [])
      .filter((r) => str(r.criterion) && Number(r.marks) > 0)
      .map((r) => ({ criterion: str(r.criterion), marks: Math.round(Number(r.marks)), description: str(r.description) }));
    if (bullets.length > 0) {
      sectionC = {
        number: String(sectionB.length + 2),
        title: str(c.title) || 'Essay',
        context: str(c.context),
        bullets,
        insight,
        marks: bullets.reduce((t, b) => t + b.marks, 0) + insight.reduce((t, r) => t + r.marks, 0),
      };
    }
  }

  const sectionAMarks = sectionAItems * 2;
  const sectionBMarks = sectionB.reduce((t, q) => t + q.marks, 0);
  const totalMarks = sectionAMarks + sectionBMarks + (sectionC ? sectionC.marks : 0);

  return {
    title: str(raw.title) || 'Grade 10 Business Studies Practice Exam',
    totalMarks,
    durationMinutes: Math.max(20, Math.round((totalMarks * 0.8) / 5) * 5),
    sectionA: {
      marks: sectionAMarks,
      multipleChoice,
      chooseWord,
      matching: { items: matchItems, options, explanation: str(m.explanation) },
    },
    sectionB,
    sectionC,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const { units, difficulty = 'medium', includeEssay = false } = req.body || {};
  const cleanUnits = (Array.isArray(units) ? units : [])
    .filter((u) => u && /^B\d{1,2}$/.test(String(u.id)) && str(u.notes))
    .slice(0, 11)
    .map((u) => ({
      id: String(u.id),
      name: str(u.name),
      notes: String(u.notes),
      skills: (Array.isArray(u.skills) ? u.skills : [])
        .filter((s) => s && /^B\d{1,2}-S\d{1,2}$/.test(String(s.id)))
        .map((s) => ({ id: String(s.id), name: str(s.name) })),
    }));

  if (cleanUnits.length === 0) {
    return res.status(400).json({ error: 'Select at least one chapter' });
  }

  const size = SIZE[difficulty] || SIZE.medium;
  const essay = Boolean(includeEssay);
  const allowedSkills = new Set(cleanUnits.flatMap((u) => u.skills.map((s) => s.id)));

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
        max_tokens: 9000,
        system: buildSystemPrompt(size, essay),
        messages: [{ role: 'user', content: buildUserMessage(cleanUnits) }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(response.status).json({ error: `Anthropic API error: ${response.status}`, details: body });
    }

    const data = await response.json();
    const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');

    let raw;
    try {
      raw = parseJson(text);
    } catch (parseErr) {
      return res.status(502).json({ error: 'Failed to parse generated exam', details: parseErr.message });
    }

    let exam;
    try {
      exam = normaliseExam(raw, size, essay, allowedSkills);
    } catch (shapeErr) {
      return res.status(502).json({ error: shapeErr.message });
    }

    exam.units = cleanUnits.map((u) => ({ id: u.id, name: u.name }));
    exam.difficulty = SIZE[difficulty] ? difficulty : 'medium';
    return res.status(200).json({ exam });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
