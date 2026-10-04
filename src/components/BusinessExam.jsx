import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft, ScrollText, Loader2, AlertCircle, Send, RotateCcw, Trophy,
  Check, X, ChevronDown, ChevronUp, Home, Sparkles, Printer, BookOpen,
} from 'lucide-react';
import TeachMe from './TeachMe.jsx';
import { buildWeakAreasPrompt } from '../lib/teachPrompt.js';

/*
 * BusinessExam: IEB-style Business Studies practice paper.
 *
 * Phases: setup -> loading -> paper -> marking -> results (error at any step).
 * Section A is objective and marked exactly; Sections B and C are marked by
 * AI against the memo generated with the paper.
 */

const DRAFT_KEY = 'ja-business-exam-draft';
const ACCENT = 'gold';
const TINT = (a) => `rgba(255,200,87,${a})`;

const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: 'Easy', desc: 'Section A + one case study question' },
  { id: 'medium', label: 'Medium', desc: 'Section A + two case study questions' },
  { id: 'hard', label: 'Hard', desc: 'Exam-length: three case study questions' },
];

const INSTRUCTIONS = [
  'Answer ALL the questions.',
  'Read each case study carefully before answering the questions on it.',
  'Use the mark allocation as a guide: an "Explain" or "Discuss" point is usually worth 2 marks (state the fact, then develop it).',
  'Where a question asks you to quote, quote directly from the case study.',
  'Answer in full sentences in Sections B and C, except where you are asked to name or list.',
];

const MAX_NOTES_PER_UNIT = 30000;
const MAX_NOTES_TOTAL = 120000;

function gradeColor(grade) {
  if (grade === 'A') return 'var(--emerald)';
  if (grade === 'B') return 'var(--cyan)';
  if (grade === 'C') return 'var(--amber)';
  return 'var(--coral)';
}

/*
 * Textbook notes sent to the exam generator. When a chapter is too long for
 * the budget, every topic is shortened evenly so no section drops out.
 */
function unitNotes(theoryUnit, skills, hints, maxChars) {
  const keyFacts = skills.map((s) => hints[s.id]).filter(Boolean);
  const head = keyFacts.length ? ['## Key facts', ...keyFacts.map((h) => `- ${h}`)].join('\n') : '';
  const topics = theoryUnit?.topics || [];
  const longest = Math.max(0, ...topics.map((t) => (t.explanation || []).length));
  const render = (keep, withDefinitions) => topics.map((t) => {
    const lines = [`## ${t.title}`, ...(t.explanation || []).slice(0, keep).map((p) => `- ${p}`)];
    const vocab = (t.vocabulary || []).map((v) => (withDefinitions ? `${v.term}: ${v.definition}` : v.term));
    if (vocab.length) lines.push(`Terms: ${vocab.join(' | ')}`);
    return lines.join('\n');
  }).join('\n');
  for (const withDefinitions of [true, false]) {
    for (let keep = longest; keep >= 1; keep -= 1) {
      const text = `${head}\n${render(keep, withDefinitions)}`;
      if (text.length <= maxChars) return text;
    }
  }
  return `${render(1, false)}\n${head}`.slice(0, maxChars);
}

function allSectionAItems(exam) {
  const a = exam.sectionA;
  return [...a.multipleChoice, ...a.chooseWord, ...a.matching.items];
}

function allWrittenItems(exam) {
  return exam.sectionB.flatMap((q) => q.subQuestions);
}

function countAnswered(exam, answers, essay) {
  const a = allSectionAItems(exam).filter((q) => answers[q.number] !== undefined && answers[q.number] !== '').length;
  const b = allWrittenItems(exam).filter((s) => String(answers[s.number] || '').trim()).length;
  const c = exam.sectionC ? (essay.trim() ? 1 : 0) : 0;
  const total = allSectionAItems(exam).length + allWrittenItems(exam).length + (exam.sectionC ? 1 : 0);
  return { done: a + b + c, total };
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    const d = raw ? JSON.parse(raw) : null;
    return d?.exam?.sectionA ? d : null;
  } catch {
    return null;
  }
}

function saveDraft(draft) {
  try {
    if (draft) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage full or blocked: the paper still works, it just will not survive a refresh */
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildExamHTML(exam) {
  const e = escapeHtml;
  const a = exam.sectionA;
  const letters = ['A', 'B', 'C', 'D'];
  const mc = a.multipleChoice.map((q) => `<div class="q"><span class="n">${e(q.number)}</span> ${e(q.stem)}
    <div class="opts">${q.options.map((o, i) => `<div>${letters[i]}&nbsp;&nbsp;${e(o)}</div>`).join('')}</div></div>`).join('');
  const word = a.chooseWord.map((q) => `<div class="q"><span class="n">${e(q.number)}</span> ${e(q.stem)} <i>(${q.choices.map(e).join(' / ')})</i></div>`).join('');
  const rows = Math.max(a.matching.items.length, a.matching.options.length);
  const match = Array.from({ length: rows }, (_, i) => {
    const it = a.matching.items[i];
    const op = a.matching.options[i];
    return `<tr><td>${it ? `${e(it.number)} ${e(it.text)}` : ''}</td><td>${op ? `${e(op.letter)}&nbsp;&nbsp;${e(op.text)}` : ''}</td></tr>`;
  }).join('');
  const b = exam.sectionB.map((q) => `<h3>QUESTION ${e(q.number)}: ${e(q.title)} <span class="m">[${q.marks}]</span></h3>
    <div class="case">${e(q.caseStudy).replace(/\n/g, '<br/>')}</div>
    ${q.subQuestions.map((s) => `<div class="q"><span class="n">${e(s.number)}</span> ${e(s.text)} <span class="m">(${s.marks})</span></div>`).join('')}`).join('');
  const c = exam.sectionC ? `<h2>SECTION C</h2><h3>QUESTION ${e(exam.sectionC.number)}: ${e(exam.sectionC.title)} <span class="m">[${exam.sectionC.marks}]</span></h3>
    <div class="case">${e(exam.sectionC.context).replace(/\n/g, '<br/>')}</div>
    <ul>${exam.sectionC.bullets.map((x) => `<li>${e(x.text)} <span class="m">(${x.marks})</span></li>`).join('')}</ul>
    <div class="q">Insight: ${exam.sectionC.insight.map((r) => `${e(r.criterion)} (${r.marks})`).join(', ')}</div>` : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${e(exam.title)}</title>
<style>
  body{font-family:Georgia,'Times New Roman',serif;max-width:760px;margin:24px auto;padding:0 20px;color:#111;line-height:1.5}
  h1{font-size:22px;margin:0 0 4px} h2{font-size:16px;margin:28px 0 8px;border-bottom:2px solid #111} h3{font-size:14px;margin:18px 0 6px}
  .meta{font-size:13px;margin-bottom:12px} .q{margin:8px 0;font-size:14px} .n{font-weight:bold;margin-right:6px}
  .opts{margin:4px 0 0 34px} .m{float:right;font-weight:bold} .case{background:#f4f4f4;border:1px solid #ccc;padding:10px;font-size:14px;margin:6px 0}
  table{border-collapse:collapse;width:100%;font-size:13px} td{border:1px solid #999;padding:5px 8px;vertical-align:top;width:50%}
  th{border:1px solid #999;padding:5px 8px;background:#eee;text-align:left}
  ul.instr{font-size:13px}
</style></head><body>
<h1>${e(exam.title)}</h1>
<div class="meta">Grade 10 Business Studies &nbsp;|&nbsp; Time: ${exam.durationMinutes} minutes &nbsp;|&nbsp; Total: ${exam.totalMarks} marks</div>
<ul class="instr">${INSTRUCTIONS.map((i) => `<li>${e(i)}</li>`).join('')}</ul>
<h2>SECTION A <span class="m">[${a.marks}]</span></h2>
<h3>QUESTION 1</h3>
<div class="q"><b>1.1</b> Choose the correct answer. Write only the letter (A-D) next to the question number.</div>${mc}
${a.chooseWord.length ? `<div class="q"><b>1.2</b> Choose the correct word(s) from those given in brackets.</div>${word}` : ''}
${a.matching.items.length ? `<div class="q"><b>1.3</b> Choose a description from COLUMN B that matches a term in COLUMN A. Write only the letter next to the question number.</div>
<table><thead><tr><th>COLUMN A</th><th>COLUMN B</th></tr></thead><tbody>${match}</tbody></table>` : ''}
<h2>SECTION B</h2>${b}
${c}
</body></html>`;
}

export default function BusinessExam({ module, studentName, subjectTitle = 'Business Studies', onBack, onComplete, dispatch }) {
  const units = useMemo(
    () => Object.values(module.UNITS).sort((x, y) => x.number - y.number),
    [module],
  );
  const draft = useMemo(loadDraft, []);
  const [phase, setPhase] = useState('setup');
  const [selected, setSelected] = useState(() => units.slice(0, 3).map((u) => u.id));
  const [difficulty, setDifficulty] = useState('medium');
  const [includeEssay, setIncludeEssay] = useState(false);
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [essay, setEssay] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [errorFrom, setErrorFrom] = useState('setup');
  const topRef = useRef(null);

  useEffect(() => {
    if (exam && (phase === 'paper' || phase === 'marking')) saveDraft({ exam, answers, essay });
  }, [exam, answers, essay, phase]);

  useEffect(() => {
    if ((phase === 'paper' || phase === 'results') && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [phase]);

  function toggleUnit(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]));
  }

  async function generate() {
    if (selected.length === 0) {
      setError('Select at least one chapter.');
      return;
    }
    setError('');
    setPhase('loading');
    const perUnit = Math.min(MAX_NOTES_PER_UNIT, Math.floor(MAX_NOTES_TOTAL / selected.length));
    const payloadUnits = units.filter((u) => selected.includes(u.id)).map((u) => {
      const skills = Object.entries(module.SKILLS)
        .filter(([, s]) => s.unit === u.id)
        .map(([id, s]) => ({ id, name: s.name }));
      return {
        id: u.id,
        name: u.name,
        skills,
        notes: unitNotes(module.getTheoryUnit(u.id), skills, module.SKILL_HINTS || {}, perUnit),
      };
    });
    try {
      const res = await fetch('/api/generate-business-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ units: payloadUnits, difficulty, includeEssay }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Server error ${res.status}`);
      if (!body.exam) throw new Error('No exam received');
      setExam(body.exam);
      setAnswers({});
      setEssay('');
      setResult(null);
      setPhase('paper');
    } catch (err) {
      setError(err.message || 'Failed to generate the exam');
      setErrorFrom('setup');
      setPhase('error');
    }
  }

  async function submit() {
    setPhase('marking');
    try {
      const res = await fetch('/api/mark-business-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, answers, essay }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Server error ${res.status}`);
      if (!body.result) throw new Error('No marking result received');
      setResult(body.result);
      setPhase('results');
      saveDraft(null);
      recordSkills(body.result);
      if (onComplete) {
        onComplete({
          title: exam.title,
          totalAwarded: body.result.totalAwarded,
          totalPossible: body.result.totalPossible,
          percentage: body.result.percentage,
          grade: body.result.grade,
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to mark the exam');
      setErrorFrom('paper');
      setPhase('error');
    }
  }

  function recordSkills(r) {
    if (!dispatch) return;
    const send = (id, skills, correct, kind) => {
      if (!skills?.length) return;
      dispatch({ type: 'answer', challengeId: `exam-${id}`, correct, skills, hintUsed: false, challengeType: `exam-${kind}` });
    };
    for (const it of r.sectionA.items) send(it.number, it.skills, it.correct, it.kind);
    for (const q of r.sectionB) {
      for (const s of q.subQuestions) send(s.number, s.skills, s.awarded * 2 >= s.possible, 'written');
    }
    for (const [i, b] of (r.sectionC?.bullets || []).entries()) send(`essay-${i + 1}`, b.skills, b.awarded * 2 >= b.possible, 'essay');
  }

  function resumeDraft() {
    setExam(draft.exam);
    setAnswers(draft.answers || {});
    setEssay(draft.essay || '');
    setPhase('paper');
  }

  return (
    <div ref={topRef}>
      {phase === 'setup' && (
        <SetupPhase
          units={units}
          selected={selected}
          toggleUnit={toggleUnit}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          includeEssay={includeEssay}
          setIncludeEssay={setIncludeEssay}
          onGenerate={generate}
          onBack={onBack}
          error={error}
          draft={draft}
          onResume={resumeDraft}
        />
      )}
      {phase === 'loading' && <BusyCard title="Setting your exam paper..." text="Claude is writing a fresh paper and memo from your textbook chapters. This can take up to a minute." />}
      {phase === 'marking' && <BusyCard title="Marking your paper..." text="Section A is marked instantly. Your written answers are being marked against the memo." />}
      {phase === 'error' && (
        <ErrorCard
          error={error}
          retryLabel={errorFrom === 'paper' ? 'back to paper' : 'try again'}
          onRetry={() => setPhase(errorFrom)}
          onBack={onBack}
        />
      )}
      {phase === 'paper' && exam && (
        <PaperPhase
          exam={exam}
          answers={answers}
          setAnswer={(n, v) => setAnswers((prev) => ({ ...prev, [n]: v }))}
          essay={essay}
          setEssay={setEssay}
          onSubmit={submit}
          onBack={() => setPhase('setup')}
        />
      )}
      {phase === 'results' && result && exam && (
        <ResultsPhase
          result={result}
          module={module}
          subjectTitle={subjectTitle}
          studentName={studentName}
          onBack={onBack}
          onNew={() => { setExam(null); setResult(null); setPhase('setup'); }}
        />
      )}
    </div>
  );
}

function Header({ onBack, backLabel = 'back', right }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80" style={{ color: 'var(--ink-mute)' }}>
        <ChevronLeft size={16} /> {backLabel}
      </button>
      {right || (
        <div className="ja-mono text-xs" style={{ color: `var(--${ACCENT})`, letterSpacing: '0.08em' }}>PRACTICE EXAM</div>
      )}
    </div>
  );
}

function Choice({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
      style={{ background: active ? TINT(0.1) : 'var(--panel)', border: '1px solid', borderColor: active ? TINT(0.45) : 'var(--line)' }}
    >
      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: active ? `var(--${ACCENT})` : 'var(--panel-2)', color: active ? 'var(--on-accent)' : 'var(--ink-mute)' }}>
        {active && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="text-sm" style={{ color: active ? 'var(--ink)' : 'var(--ink-dim)' }}>{children}</span>
    </button>
  );
}

function SetupPhase({
  units, selected, toggleUnit, difficulty, setDifficulty, includeEssay, setIncludeEssay,
  onGenerate, onBack, error, draft, onResume,
}) {
  return (
    <div>
      <Header onBack={onBack} />
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ja-glow-gold"
          style={{ background: TINT(0.16), color: `var(--${ACCENT})` }}>
          <ScrollText size={22} />
        </div>
        <div>
          <div className="ja-display text-3xl sm:text-4xl" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>Practice Exam</div>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-dim)' }}>
            A fresh IEB-style paper from your textbook chapters: objective questions marked instantly, case study questions and an optional essay marked against a memo.
          </p>
        </div>
      </div>

      {draft && (
        <button onClick={onResume} className="ja-card w-full text-left p-4 mb-4 flex items-center justify-between gap-3 hover:opacity-90"
          style={{ borderColor: TINT(0.4) }}>
          <div>
            <div className="ja-display text-base" style={{ fontWeight: 700 }}>Continue your unfinished paper</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--ink-mute)' }}>{draft.exam.title}</div>
          </div>
          <ChevronDown size={16} style={{ transform: 'rotate(-90deg)', color: `var(--${ACCENT})` }} />
        </button>
      )}

      <div className="ja-card p-5 mb-4">
        <div className="ja-display text-base mb-1" style={{ fontWeight: 700 }}>Which chapters should the exam cover?</div>
        <div className="ja-mono text-xs mb-3" style={{ color: 'var(--ink-mute)' }}>Pick the chapters you are being tested on.</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {units.map((u) => (
            <Choice key={u.id} active={selected.includes(u.id)} onClick={() => toggleUnit(u.id)}>
              Chapter {u.number} - {u.name}
            </Choice>
          ))}
        </div>
      </div>

      <div className="ja-card p-5 mb-4">
        <div className="ja-display text-base mb-3" style={{ fontWeight: 700 }}>Paper size</div>
        <div className="flex gap-3">
          {DIFFICULTY_OPTIONS.map((d) => (
            <button key={d.id} onClick={() => setDifficulty(d.id)} className="flex-1 p-3 rounded-lg text-center transition-all"
              style={{ background: difficulty === d.id ? TINT(0.1) : 'var(--panel)', border: '1px solid', borderColor: difficulty === d.id ? TINT(0.45) : 'var(--line)' }}>
              <div className="ja-mono text-sm" style={{ fontWeight: 700, color: difficulty === d.id ? `var(--${ACCENT})` : 'var(--ink)' }}>{d.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--ink-mute)' }}>{d.desc}</div>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <Choice active={includeEssay} onClick={() => setIncludeEssay(!includeEssay)}>
            Include a Section C essay (adds 20-40 marks, marked for content and insight)
          </Choice>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg mb-4" style={{ background: 'rgba(255,122,122,0.08)', border: '1px solid rgba(255,122,122,0.3)' }}>
          <AlertCircle size={14} style={{ color: 'var(--coral)' }} />
          <span className="text-sm" style={{ color: 'var(--coral)' }}>{error}</span>
        </div>
      )}

      <button onClick={onGenerate} disabled={selected.length === 0}
        className="w-full flex items-center justify-center gap-2 ja-mono text-sm px-5 py-3 rounded-lg transition-opacity"
        style={{
          background: selected.length ? `var(--${ACCENT})` : 'var(--panel-2)',
          color: selected.length ? 'var(--on-accent)' : 'var(--ink-mute)',
          fontWeight: 700, opacity: selected.length ? 1 : 0.5,
        }}>
        <Sparkles size={16} /> Generate exam paper
      </button>
    </div>
  );
}

function BusyCard({ title, text }) {
  return (
    <div className="ja-card p-8 text-center">
      <Loader2 size={40} className="ja-spin mx-auto mb-4" style={{ color: `var(--${ACCENT})` }} />
      <div className="ja-display text-xl mb-2" style={{ fontWeight: 700 }}>{title}</div>
      <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>{text}</p>
    </div>
  );
}

function ErrorCard({ error, retryLabel, onRetry, onBack }) {
  return (
    <div className="ja-card p-6 text-center">
      <AlertCircle size={36} className="mx-auto mb-3" style={{ color: 'var(--coral)' }} />
      <div className="ja-display text-lg mb-2" style={{ fontWeight: 700 }}>Something went wrong</div>
      <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>{error}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onBack} className="ja-mono text-xs px-4 py-2 rounded-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
          <ChevronLeft size={12} className="inline mr-1" /> back
        </button>
        <button onClick={onRetry} className="ja-mono text-xs px-4 py-2 rounded-lg" style={{ background: `var(--${ACCENT})`, color: 'var(--on-accent)', fontWeight: 700 }}>
          <RotateCcw size={12} className="inline mr-1" /> {retryLabel}
        </button>
      </div>
    </div>
  );
}

function Marks({ n, square = false }) {
  return (
    <span className="ja-mono text-xs flex-shrink-0" style={{ color: `var(--${ACCENT})` }}>
      {square ? `[${n}]` : `(${n})`}
    </span>
  );
}

function SectionTitle({ title, marks }) {
  return (
    <div className="flex items-center justify-between mt-6 mb-3">
      <div className="ja-display text-lg" style={{ fontWeight: 800, letterSpacing: '0.02em' }}>{title}</div>
      {marks !== undefined && <Marks n={marks} square />}
    </div>
  );
}

function CaseStudy({ text }) {
  return (
    <div className="p-4 rounded-lg mb-3 text-sm" style={{ background: 'var(--panel-2)', border: '1px solid var(--line)', color: 'var(--ink-dim)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
      {text}
    </div>
  );
}

function AnswerBox({ value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full mt-2 p-3 rounded-lg text-sm"
      style={{ background: 'var(--input-bg)', border: '1px solid var(--line)', color: 'var(--ink)', resize: 'vertical', lineHeight: 1.55 }}
    />
  );
}

function PaperPhase({ exam, answers, setAnswer, essay, setEssay, onSubmit, onBack }) {
  const a = exam.sectionA;
  const letters = ['A', 'B', 'C', 'D'];
  const { done, total } = countAnswered(exam, answers, essay);
  const usedLetters = new Set(a.matching.items.map((it) => answers[it.number]).filter(Boolean));

  function openPrint() {
    const w = window.open('', '_blank', 'width=800,height=900,scrollbars=yes,resizable=yes');
    if (!w) return;
    w.document.open();
    w.document.write(buildExamHTML(exam));
    w.document.close();
  }

  function confirmSubmit() {
    if (done < total && !window.confirm(`You have answered ${done} of ${total} questions. Submit anyway?`)) return;
    onSubmit();
  }

  return (
    <div>
      <Header
        onBack={onBack}
        backLabel="new exam"
        right={(
          <div className="flex items-center gap-3">
            <button onClick={openPrint} className="flex items-center gap-1.5 ja-mono text-xs px-3 py-1.5 rounded-lg hover:opacity-80"
              style={{ background: TINT(0.08), border: `1px solid ${TINT(0.3)}`, color: `var(--${ACCENT})` }}>
              <Printer size={13} /> Print paper
            </button>
            <div className="ja-mono text-xs" style={{ color: `var(--${ACCENT})`, letterSpacing: '0.08em' }}>{exam.totalMarks} MARKS</div>
          </div>
        )}
      />

      <div className="ja-card p-5 mb-4 ja-glow-gold" style={{ background: `linear-gradient(180deg, ${TINT(0.06)}, var(--panel-2))` }}>
        <div className="ja-mono text-xs uppercase mb-1" style={{ color: `var(--${ACCENT})`, letterSpacing: '0.1em' }}>Business Studies Practice Exam</div>
        <div className="ja-display text-2xl mb-2" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>{exam.title}</div>
        <div className="ja-mono text-xs mb-2" style={{ color: 'var(--ink-mute)' }}>
          {(exam.units || []).map((u) => u.name).join(' \u00b7 ')}
        </div>
        <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
          Time: <span style={{ color: `var(--${ACCENT})` }}>{exam.durationMinutes} minutes</span>
          {' '}&middot; Answered: <span style={{ color: `var(--${ACCENT})` }}>{done}/{total}</span>
        </div>
        <details className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
          <summary className="ja-mono cursor-pointer" style={{ color: 'var(--ink-mute)' }}>Instructions</summary>
          <ul className="mt-2 ml-4 space-y-1" style={{ listStyle: 'disc' }}>
            {INSTRUCTIONS.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </details>
      </div>

      <SectionTitle title="SECTION A" marks={a.marks} />
      <div className="ja-card p-5 mb-4">
        <div className="ja-display text-base mb-3" style={{ fontWeight: 700 }}>QUESTION 1</div>

        {a.multipleChoice.length > 0 && (
          <div className="mb-5">
            <div className="text-sm mb-3" style={{ color: 'var(--ink-dim)' }}><b>1.1</b> Choose the correct answer.</div>
            {a.multipleChoice.map((q) => (
              <div key={q.number} className="mb-4">
                <div className="flex gap-2 text-sm mb-2">
                  <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{q.number}</span>
                  <span className="flex-1">{q.stem}</span>
                  <Marks n={q.marks} />
                </div>
                <div className="grid sm:grid-cols-2 gap-2 ml-8">
                  {q.options.map((o, i) => (
                    <button key={i} onClick={() => setAnswer(q.number, i)} className="ja-opt text-left text-sm p-2 rounded-lg flex gap-2"
                      data-state={answers[q.number] === i ? 'selected' : undefined}>
                      <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{letters[i]}</span> {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {a.chooseWord.length > 0 && (
          <div className="mb-5">
            <div className="text-sm mb-3" style={{ color: 'var(--ink-dim)' }}><b>1.2</b> Choose the correct word(s) from those given.</div>
            {a.chooseWord.map((q) => (
              <div key={q.number} className="mb-3">
                <div className="flex gap-2 text-sm mb-2">
                  <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{q.number}</span>
                  <span className="flex-1">{q.stem}</span>
                  <Marks n={q.marks} />
                </div>
                <div className="flex flex-wrap gap-2 ml-8">
                  {q.choices.map((c, i) => (
                    <button key={i} onClick={() => setAnswer(q.number, i)} className="ja-opt text-sm px-3 py-1.5 rounded-lg"
                      style={{ width: 'auto' }}
                      data-state={answers[q.number] === i ? 'selected' : undefined}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {a.matching.items.length > 0 && (
          <div>
            <div className="text-sm mb-3" style={{ color: 'var(--ink-dim)' }}>
              <b>1.3</b> Choose a description from COLUMN B that matches each term in COLUMN A.
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>COLUMN A</div>
                {a.matching.items.map((it) => (
                  <div key={it.number} className="flex items-center gap-2 text-sm p-2 rounded-lg" style={{ background: 'var(--panel-2)', border: '1px solid var(--line)' }}>
                    <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{it.number}</span>
                    <span className="flex-1">{it.text}</span>
                    <select
                      value={answers[it.number] || ''}
                      onChange={(e) => setAnswer(it.number, e.target.value)}
                      className="ja-mono text-sm rounded px-2 py-1"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                    >
                      <option value="">-</option>
                      {a.matching.options.map((o) => (
                        <option key={o.letter} value={o.letter}>
                          {o.letter}{usedLetters.has(o.letter) && answers[it.number] !== o.letter ? ' (used)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>COLUMN B</div>
                {a.matching.options.map((o) => (
                  <div key={o.letter} className="flex gap-2 text-sm p-2 rounded-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink-dim)' }}>
                    <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{o.letter}</span>
                    <span>{o.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <SectionTitle title="SECTION B" />
      {exam.sectionB.map((q) => (
        <div key={q.number} className="ja-card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="ja-display text-base" style={{ fontWeight: 700 }}>QUESTION {q.number}: {q.title}</div>
            <Marks n={q.marks} square />
          </div>
          <CaseStudy text={q.caseStudy} />
          {q.subQuestions.map((s) => (
            <div key={s.number} className="mb-4">
              <div className="flex gap-2 text-sm">
                <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{s.number}</span>
                <span className="flex-1" style={{ whiteSpace: 'pre-line' }}>{s.text}</span>
                <Marks n={s.marks} />
              </div>
              <AnswerBox value={answers[s.number]} onChange={(v) => setAnswer(s.number, v)} rows={Math.min(10, 2 + s.marks)} />
            </div>
          ))}
        </div>
      ))}

      {exam.sectionC && (
        <>
          <SectionTitle title="SECTION C" />
          <div className="ja-card p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="ja-display text-base" style={{ fontWeight: 700 }}>QUESTION {exam.sectionC.number}: {exam.sectionC.title}</div>
              <Marks n={exam.sectionC.marks} square />
            </div>
            <CaseStudy text={exam.sectionC.context} />
            <div className="text-sm mb-2" style={{ color: 'var(--ink-dim)' }}>Write an essay in which you:</div>
            <ul className="text-sm space-y-1 mb-3 ml-5" style={{ listStyle: 'disc' }}>
              {exam.sectionC.bullets.map((b, i) => (
                <li key={i}>{b.text} <Marks n={b.marks} /></li>
              ))}
            </ul>
            <div className="ja-mono text-xs mb-2" style={{ color: 'var(--ink-mute)' }}>
              Insight: {exam.sectionC.insight.map((r) => `${r.criterion} (${r.marks})`).join(', ')}
            </div>
            <AnswerBox value={essay} onChange={setEssay} rows={16} placeholder="Introduction, then a paragraph per bullet with headings, then a conclusion." />
          </div>
        </>
      )}

      <button onClick={confirmSubmit}
        className="w-full flex items-center justify-center gap-2 ja-mono text-sm px-5 py-3 rounded-lg mt-2"
        style={{ background: `var(--${ACCENT})`, color: 'var(--on-accent)', fontWeight: 700 }}>
        <Send size={16} /> Submit for marking
      </button>
    </div>
  );
}

function ScoreLine({ awarded, possible }) {
  const ok = possible > 0 && awarded * 2 >= possible;
  return (
    <span className="ja-mono text-xs flex-shrink-0 px-2 py-0.5 rounded"
      style={{ background: ok ? 'rgba(110,231,168,0.12)' : 'rgba(255,122,122,0.12)', color: ok ? 'var(--emerald)' : 'var(--coral)' }}>
      {awarded}/{possible}
    </span>
  );
}

function MemoToggle({ memo }) {
  const [open, setOpen] = useState(false);
  if (!memo?.length) return null;
  return (
    <div className="mt-2">
      <button onClick={() => setOpen(!open)} className="ja-mono text-xs flex items-center gap-1 hover:opacity-80" style={{ color: 'var(--ink-mute)' }}>
        <BookOpen size={12} /> memo {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {open && (
        <ul className="mt-1 ml-4 text-xs space-y-0.5" style={{ listStyle: 'disc', color: 'var(--ink-dim)' }}>
          {memo.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      )}
    </div>
  );
}

function ResultsPhase({ result, module, subjectTitle, studentName, onBack, onNew }) {
  const r = result;
  const missedSkills = useMemo(() => {
    const tally = {};
    const add = (skills, missed) => {
      for (const s of skills || []) {
        tally[s] = tally[s] || { missed: 0, seen: 0 };
        tally[s].seen += 1;
        if (missed) tally[s].missed += 1;
      }
    };
    r.sectionA.items.forEach((it) => add(it.skills, !it.correct));
    r.sectionB.forEach((q) => q.subQuestions.forEach((s) => add(s.skills, s.awarded * 2 < s.possible)));
    (r.sectionC?.bullets || []).forEach((b) => add(b.skills, b.awarded * 2 < b.possible));
    return Object.entries(tally)
      .filter(([id, t]) => t.missed > 0 && module.SKILLS[id])
      .sort((x, y) => y[1].missed - x[1].missed)
      .slice(0, 6)
      .map(([id, t]) => ({ id, ...t }));
  }, [r, module]);

  const teachPrompt = () => buildWeakAreasPrompt({
    subjectId: 'business',
    subjectTitle,
    studentName,
    areas: missedSkills.map((m) => ({
      name: module.SKILLS[m.id].name,
      description: module.SKILLS[m.id].description,
      unitName: module.UNITS[module.SKILLS[m.id].unit]?.name,
      accuracy: Math.round(((m.seen - m.missed) / m.seen) * 100),
      hint: module.SKILL_HINTS?.[m.id],
    })),
  });

  return (
    <div>
      <Header onBack={onBack} />

      <div className="ja-card p-6 mb-4 text-center ja-glow-gold" style={{ background: `linear-gradient(180deg, ${TINT(0.08)}, var(--panel-2))` }}>
        <Trophy size={36} className="mx-auto mb-2" style={{ color: `var(--${ACCENT})` }} />
        <div className="ja-display text-5xl" style={{ fontWeight: 800, color: gradeColor(r.grade) }}>{r.percentage}%</div>
        <div className="ja-mono text-sm mt-1" style={{ color: 'var(--ink-dim)' }}>
          {r.totalAwarded} / {r.totalPossible} marks &middot; symbol {r.grade}
        </div>
        <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: 'var(--ink-dim)' }}>{r.verdict}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4 ja-mono text-xs">
          <span className="px-2 py-1 rounded" style={{ background: 'var(--panel)' }}>Section A {r.sectionA.awarded}/{r.sectionA.possible}</span>
          <span className="px-2 py-1 rounded" style={{ background: 'var(--panel)' }}>
            Section B {r.sectionB.reduce((t, q) => t + q.awarded, 0)}/{r.sectionB.reduce((t, q) => t + q.possible, 0)}
          </span>
          {r.sectionC && <span className="px-2 py-1 rounded" style={{ background: 'var(--panel)' }}>Section C {r.sectionC.awarded}/{r.sectionC.possible}</span>}
        </div>
      </div>

      {(r.strengths.length > 0 || r.improvements.length > 0 || missedSkills.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {r.strengths.length > 0 && (
            <div className="ja-card p-4">
              <div className="ja-mono text-xs mb-2" style={{ color: 'var(--emerald)' }}>STRENGTHS</div>
              <ul className="text-sm space-y-1 ml-4" style={{ listStyle: 'disc', color: 'var(--ink-dim)' }}>
                {r.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          <div className="ja-card p-4">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="ja-mono text-xs" style={{ color: 'var(--coral)' }}>WORK ON</div>
              {missedSkills.length > 0 && <TeachMe getPrompt={teachPrompt} label="Teach me these" color={ACCENT} />}
            </div>
            <ul className="text-sm space-y-1 ml-4" style={{ listStyle: 'disc', color: 'var(--ink-dim)' }}>
              {r.improvements.map((s, i) => <li key={i}>{s}</li>)}
              {r.improvements.length === 0 && missedSkills.map((m) => <li key={m.id}>{module.SKILLS[m.id].name}</li>)}
            </ul>
          </div>
        </div>
      )}

      <SectionTitle title="SECTION A" marks={`${r.sectionA.awarded}/${r.sectionA.possible}`} />
      <div className="ja-card p-4 mb-4 space-y-2">
        {r.sectionA.items.map((it) => (
          <div key={it.number} className="flex gap-3 text-sm p-2 rounded-lg" style={{ background: 'var(--panel)' }}>
            {it.correct
              ? <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--emerald)' }} />
              : <X size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--coral)' }} />}
            <div className="flex-1 min-w-0">
              <div><span className="ja-mono mr-2" style={{ color: `var(--${ACCENT})` }}>{it.number}</span>{it.prompt}</div>
              {!it.correct && (
                <div className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>
                  Your answer: {it.given || 'none'} &middot; Correct: <b style={{ color: 'var(--emerald)' }}>{it.correctAnswer}</b>
                  {it.explanation && <div className="mt-0.5" style={{ color: 'var(--ink-mute)' }}>{it.explanation}</div>}
                </div>
              )}
            </div>
            <ScoreLine awarded={it.awarded} possible={it.marks} />
          </div>
        ))}
      </div>

      <SectionTitle title="SECTION B" />
      {r.sectionB.map((q) => (
        <div key={q.number} className="ja-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="ja-display text-base" style={{ fontWeight: 700 }}>QUESTION {q.number}: {q.title}</div>
            <ScoreLine awarded={q.awarded} possible={q.possible} />
          </div>
          {q.subQuestions.map((s) => (
            <div key={s.number} className="p-3 rounded-lg mb-2" style={{ background: 'var(--panel)' }}>
              <div className="flex gap-2 text-sm">
                <span className="ja-mono" style={{ color: `var(--${ACCENT})` }}>{s.number}</span>
                <span className="flex-1">{s.text}</span>
                <ScoreLine awarded={s.awarded} possible={s.possible} />
              </div>
              {s.feedback && <div className="text-xs mt-2" style={{ color: 'var(--ink-dim)' }}>{s.feedback}</div>}
              {s.missed.length > 0 && (
                <div className="text-xs mt-1" style={{ color: 'var(--ink-mute)' }}>Missed: {s.missed.join('; ')}</div>
              )}
              <MemoToggle memo={s.memo} />
            </div>
          ))}
        </div>
      ))}

      {r.sectionC && (
        <>
          <SectionTitle title="SECTION C" />
          <div className="ja-card p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="ja-display text-base" style={{ fontWeight: 700 }}>QUESTION {r.sectionC.number}: {r.sectionC.title}</div>
              <ScoreLine awarded={r.sectionC.awarded} possible={r.sectionC.possible} />
            </div>
            {r.sectionC.feedback && <p className="text-sm mb-3" style={{ color: 'var(--ink-dim)' }}>{r.sectionC.feedback}</p>}
            {r.sectionC.bullets.map((b, i) => (
              <div key={i} className="p-3 rounded-lg mb-2" style={{ background: 'var(--panel)' }}>
                <div className="flex gap-2 text-sm">
                  <span className="flex-1">{b.text}</span>
                  <ScoreLine awarded={b.awarded} possible={b.possible} />
                </div>
                {b.feedback && <div className="text-xs mt-2" style={{ color: 'var(--ink-dim)' }}>{b.feedback}</div>}
                <MemoToggle memo={b.memo} />
              </div>
            ))}
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {r.sectionC.insight.map((x) => (
                <div key={x.criterion} className="p-2 rounded-lg text-xs" style={{ background: 'var(--panel)' }}>
                  <div className="flex justify-between"><b>{x.criterion}</b><ScoreLine awarded={x.awarded} possible={x.possible} /></div>
                  {x.comment && <div className="mt-1" style={{ color: 'var(--ink-dim)' }}>{x.comment}</div>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3 mt-4">
        <button onClick={onBack} className="flex-1 flex items-center justify-center gap-2 ja-mono text-sm px-4 py-3 rounded-lg"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
          <Home size={14} /> map
        </button>
        <button onClick={onNew} className="flex-1 flex items-center justify-center gap-2 ja-mono text-sm px-4 py-3 rounded-lg"
          style={{ background: `var(--${ACCENT})`, color: 'var(--on-accent)', fontWeight: 700 }}>
          <Sparkles size={14} /> new exam
        </button>
      </div>
    </div>
  );
}
