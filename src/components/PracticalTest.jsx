import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft, FileCode, Loader2, AlertCircle, Send, RotateCcw,
  Trophy, Check, X, ChevronDown, ChevronUp, Home, Sparkles,
  ExternalLink, Lightbulb, LightbulbOff, ClipboardPaste,
} from 'lucide-react';
import CodeEditor from './CodeEditor.jsx';

/*
 * PracticalTest: full coding-test experience.
 *
 * Phases:
 *   setup     - pick units / difficulty, generate test
 *   loading   - waiting for test generation
 *   error     - generation failed
 *   paper     - student reads the paper and writes code
 *   marking   - submitting for marking
 *   results   - detailed mark breakdown
 */

const UNIT_OPTIONS = [
  { id: 'U2', label: 'Unit 2 - Variables & Arithmetic' },
  { id: 'U3', label: 'Unit 3 - Strings & Math Class' },
  { id: 'U5', label: 'Unit 5 - For Loops' },
  { id: 'U6', label: 'Unit 6 - Objects' },
  { id: 'U7', label: 'Unit 7 - If Statements' },
];

const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: 'Easy', desc: 'Fewer sections, simpler logic' },
  { id: 'medium', label: 'Medium', desc: 'Like a real class test' },
  { id: 'hard', label: 'Hard', desc: 'Exam-level integration' },
];

function gradeColor(grade) {
  if (grade === 'A') return 'var(--emerald)';
  if (grade === 'B') return 'var(--cyan)';
  if (grade === 'C') return 'var(--amber)';
  return 'var(--coral)';
}

function buildPaperHTML(test) {
  const sections = (test.sections || [])
    .map(s => {
      const qs = (s.questions || [])
        .map(q => `
          <div class="question">
            <span class="qnum">${q.number}</span>
            <div class="qbody">
              <div class="qtext">${q.text.replace(/\n/g, '<br/>')}</div>
              <div class="qmarks">(${q.marks})</div>
            </div>
          </div>`)
        .join('');
      return `
        <div class="section">
          <div class="section-head">
            <span class="snum">${s.number}</span>
            <span class="stitle">${s.title}</span>
            <span class="smarks">[${s.marks}]</span>
          </div>
          ${qs}
        </div>`;
    })
    .join('');

  const sampleBlock = test.sampleOutput
    ? `<div class="section">
        <div class="section-head"><span class="stitle">SAMPLE OUTPUT</span></div>
        <pre class="sample">${test.sampleOutput.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>${test.title} - Test Paper</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#0e0e12;color:#cfd0d4;padding:32px 40px;line-height:1.6}
  h1{font-size:28px;font-weight:800;margin-bottom:4px;color:#fff}
  .scenario{color:#8e8fa0;font-size:14px;margin-bottom:6px}
  .meta{font-family:'JetBrains Mono',monospace;font-size:12px;color:#d68aff;margin-bottom:24px}
  .meta span{color:#5cf2ff}
  .section{background:#17171f;border:1px solid #27272f;border-radius:10px;padding:20px;margin-bottom:16px}
  .section-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;font-weight:700}
  .snum{font-family:'JetBrains Mono',monospace;background:rgba(214,138,255,0.12);color:#d68aff;padding:2px 8px;border-radius:4px;font-size:12px}
  .stitle{font-size:16px;color:#fff}
  .smarks{font-family:'JetBrains Mono',monospace;font-size:12px;color:#8e8fa0;margin-left:auto}
  .question{display:flex;gap:12px;padding:10px 0;border-top:1px solid #27272f}
  .question:first-child{border-top:none;padding-top:0}
  .qnum{font-family:'JetBrains Mono',monospace;font-weight:600;color:#d68aff;min-width:36px;flex-shrink:0;font-size:13px}
  .qbody{flex:1}
  .qtext{color:#cfd0d4;font-size:14px;white-space:pre-line}
  .qmarks{font-family:'JetBrains Mono',monospace;font-size:11px;color:#8e8fa0;margin-top:4px}
  .sample{background:#0e0e12;border:1px solid #27272f;border-radius:6px;padding:14px;font-family:'JetBrains Mono',monospace;font-size:12px;white-space:pre-wrap;line-height:1.5;color:#8e8fa0;overflow-x:auto}
  .footer{text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:#5e5e6e;margin-top:24px}
  @media print{body{background:#fff;color:#222}.section{background:#f8f8f8;border-color:#ddd}.section-head .stitle{color:#222}.qtext{color:#333}.sample{background:#f0f0f0;border-color:#ddd;color:#444}.meta{color:#7b5ea7}.meta span{color:#2a8a96}.snum,.qnum{color:#7b5ea7}h1{color:#111}.scenario{color:#555}.footer{color:#999}}
</style>
</head>
<body>
  <h1>${test.title}</h1>
  <div class="scenario">${test.scenario}</div>
  <div class="meta">Class: <span>${test.className}</span> &nbsp; Total marks: <span>${test.totalMarks}</span></div>
  ${sections}
  ${sampleBlock}
  <div class="footer">Java Adventure - Practical Test Paper &nbsp;|&nbsp; Print with Ctrl+P</div>
</body>
</html>`;
}

export default function PracticalTest({ onBack, onComplete, dispatch }) {
  const [phase, setPhase] = useState('setup');
  const [selectedUnits, setSelectedUnits] = useState(['U2', 'U5', 'U7']);
  const [difficulty, setDifficulty] = useState('medium');
  const [test, setTest] = useState(null);
  const [code, setCode] = useState('');
  const [markResult, setMarkResult] = useState(null);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const paperTopRef = useRef(null);

  function toggleUnit(id) {
    setSelectedUnits(prev =>
      prev.includes(id)
        ? prev.filter(u => u !== id)
        : [...prev, id]
    );
  }

  async function generateTest() {
    if (selectedUnits.length < 2) {
      setError('Select at least 2 units for an integrated test.');
      return;
    }
    setError('');
    setPhase('loading');

    try {
      const res = await fetch('/api/generate-practical-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitIds: selectedUnits, difficulty }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      if (!data.test) throw new Error('No test data received');

      setTest(data.test);
      setCode(difficulty === 'easy' ? (data.test.starterCode || '') : '');
      setPhase('paper');
    } catch (err) {
      setError(err.message || 'Failed to generate test');
      setPhase('error');
    }
  }

  async function submitForMarking() {
    if (!code.trim()) return;
    setPhase('marking');

    try {
      const res = await fetch('/api/mark-practical-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test, code }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      if (!data.result) throw new Error('No marking result received');

      setMarkResult(data.result);
      setPhase('results');

      if (onComplete) {
        onComplete({
          mode: 'practicalTest',
          title: test.title,
          totalAwarded: data.result.totalAwarded,
          totalPossible: data.result.totalPossible,
          percentage: data.result.percentage,
          grade: data.result.grade,
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to mark test');
      setPhase('error');
    }
  }

  function toggleSection(num) {
    setExpandedSections(prev => ({ ...prev, [num]: !prev[num] }));
  }

  useEffect(() => {
    if (phase === 'paper' && paperTopRef.current) {
      paperTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [phase]);

  return (
    <div>
      {phase === 'setup' && (
        <SetupPhase
          selectedUnits={selectedUnits}
          toggleUnit={toggleUnit}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onGenerate={generateTest}
          onBack={onBack}
          error={error}
        />
      )}

      {phase === 'loading' && (
        <LoadingPhase onBack={() => setPhase('setup')} />
      )}

      {phase === 'error' && (
        <ErrorPhase error={error} onRetry={() => setPhase('setup')} onBack={onBack} />
      )}

      {phase === 'paper' && test && (
        <PaperPhase
          ref={paperTopRef}
          test={test}
          code={code}
          setCode={setCode}
          difficulty={difficulty}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          onSubmit={submitForMarking}
          onBack={() => setPhase('setup')}
        />
      )}

      {phase === 'marking' && (
        <MarkingPhase />
      )}

      {phase === 'results' && markResult && test && (
        <ResultsPhase
          result={markResult}
          test={test}
          onBack={onBack}
          onNewTest={() => {
            setTest(null);
            setCode('');
            setMarkResult(null);
            setPhase('setup');
          }}
          onRetry={() => {
            setMarkResult(null);
            setPhase('paper');
          }}
        />
      )}
    </div>
  );
}

function SetupPhase({ selectedUnits, toggleUnit, difficulty, setDifficulty, onGenerate, onBack, error }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
          style={{ color: 'var(--ink-mute)' }}>
          <ChevronLeft size={16} /> back
        </button>
        <div className="ja-mono text-xs" style={{ color: 'var(--magenta)', letterSpacing: '0.08em' }}>
          PRACTICAL TEST
        </div>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ja-glow-magenta"
          style={{ background: 'rgba(214,138,255,0.16)', color: 'var(--magenta)' }}>
          <FileCode size={22} />
        </div>
        <div>
          <div className="ja-display text-3xl sm:text-4xl" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Practical Test
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-dim)' }}>
            A full coding test generated fresh each time. Write your Java program, submit it, and get a detailed mark breakdown.
          </p>
        </div>
      </div>

      {/* Unit selection */}
      <div className="ja-card p-5 mb-4">
        <div className="ja-display text-base mb-3" style={{ fontWeight: 700 }}>
          Which units should the test cover?
        </div>
        <div className="ja-mono text-xs mb-3" style={{ color: 'var(--ink-mute)' }}>
          Select at least 2. The test will integrate concepts from all selected units.
        </div>
        <div className="space-y-2">
          {UNIT_OPTIONS.map(u => (
            <button
              key={u.id}
              onClick={() => toggleUnit(u.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left"
              style={{
                background: selectedUnits.includes(u.id) ? 'rgba(214,138,255,0.08)' : 'var(--panel)',
                border: '1px solid',
                borderColor: selectedUnits.includes(u.id) ? 'rgba(214,138,255,0.4)' : 'var(--line)',
              }}
            >
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: selectedUnits.includes(u.id) ? 'var(--magenta)' : 'var(--panel-2)',
                  color: selectedUnits.includes(u.id) ? 'var(--bg)' : 'var(--ink-mute)',
                }}>
                {selectedUnits.includes(u.id) && <Check size={12} strokeWidth={3} />}
              </div>
              <span className="text-sm" style={{ color: selectedUnits.includes(u.id) ? 'var(--ink)' : 'var(--ink-dim)' }}>
                {u.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="ja-card p-5 mb-5">
        <div className="ja-display text-base mb-3" style={{ fontWeight: 700 }}>Difficulty</div>
        <div className="flex gap-3">
          {DIFFICULTY_OPTIONS.map(d => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className="flex-1 p-3 rounded-lg text-center transition-all"
              style={{
                background: difficulty === d.id ? 'rgba(214,138,255,0.08)' : 'var(--panel)',
                border: '1px solid',
                borderColor: difficulty === d.id ? 'rgba(214,138,255,0.4)' : 'var(--line)',
              }}
            >
              <div className="ja-mono text-sm" style={{ fontWeight: 700, color: difficulty === d.id ? 'var(--magenta)' : 'var(--ink)' }}>
                {d.label}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--ink-mute)' }}>{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg mb-4"
          style={{ background: 'rgba(255,122,122,0.08)', border: '1px solid rgba(255,122,122,0.3)' }}>
          <AlertCircle size={14} style={{ color: 'var(--coral)' }} />
          <span className="text-sm" style={{ color: 'var(--coral)' }}>{error}</span>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={selectedUnits.length < 2}
        className="w-full flex items-center justify-center gap-2 ja-mono text-sm px-5 py-3 rounded-lg transition-opacity"
        style={{
          background: selectedUnits.length >= 2 ? 'var(--magenta)' : 'var(--panel-2)',
          color: selectedUnits.length >= 2 ? 'var(--bg)' : 'var(--ink-mute)',
          fontWeight: 700,
          opacity: selectedUnits.length >= 2 ? 1 : 0.5,
        }}
      >
        <Sparkles size={16} /> Generate test paper
      </button>
    </div>
  );
}

function LoadingPhase({ onBack }) {
  return (
    <div className="ja-card p-8 text-center">
      <Loader2 size={40} className="ja-spin mx-auto mb-4" style={{ color: 'var(--magenta)' }} />
      <div className="ja-display text-xl mb-2" style={{ fontWeight: 700 }}>Generating your test paper...</div>
      <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
        Claude is creating a unique practical test. This takes a few seconds.
      </p>
      <button onClick={onBack} className="mt-4 ja-mono text-xs hover:opacity-80" style={{ color: 'var(--ink-mute)' }}>
        cancel
      </button>
    </div>
  );
}

function ErrorPhase({ error, onRetry, onBack }) {
  return (
    <div className="ja-card p-6 text-center">
      <AlertCircle size={36} className="mx-auto mb-3" style={{ color: 'var(--coral)' }} />
      <div className="ja-display text-lg mb-2" style={{ fontWeight: 700 }}>Something went wrong</div>
      <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>{error}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onBack} className="ja-mono text-xs px-4 py-2 rounded-lg"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
          <ChevronLeft size={12} className="inline mr-1" /> back
        </button>
        <button onClick={onRetry} className="ja-mono text-xs px-4 py-2 rounded-lg"
          style={{ background: 'var(--magenta)', color: 'var(--bg)', fontWeight: 700 }}>
          <RotateCcw size={12} className="inline mr-1" /> try again
        </button>
      </div>
    </div>
  );
}

const PaperPhase = React.forwardRef(function PaperPhase(
  { test, code, setCode, difficulty, expandedSections, toggleSection, onSubmit, onBack },
  ref,
) {
  const [showSample, setShowSample] = useState(false);
  const isEasy = difficulty === 'easy';
  const [hintOn, setHintOn] = useState(isEasy);
  const popupRef = useRef(null);

  const blankCode = `public class ${test.className} {\n    public static void main(String[] args) {\n        \n    }\n}\n`;

  function toggleHint() {
    if (hintOn) {
      setCode(blankCode);
    } else {
      setCode(test.starterCode || blankCode);
    }
    setHintOn(prev => !prev);
  }

  function openPaperWindow() {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }
    const w = window.open('', '_blank', 'width=720,height=900,scrollbars=yes,resizable=yes');
    if (!w) return;
    w.document.open();
    w.document.write(buildPaperHTML(test));
    w.document.close();
    popupRef.current = w;
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setCode(text);
    } catch {
      /* clipboard access denied -- user can paste manually */
    }
  }

  useEffect(() => {
    return () => {
      if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
    };
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
          style={{ color: 'var(--ink-mute)' }}>
          <ChevronLeft size={16} /> new test
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={openPaperWindow}
            className="flex items-center gap-1.5 ja-mono text-xs px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
            style={{ background: 'rgba(92,242,255,0.08)', border: '1px solid rgba(92,242,255,0.25)', color: 'var(--cyan)' }}
            title="Open test paper in a separate window for reference while you code in your IDE"
          >
            <ExternalLink size={13} /> Pop-out paper
          </button>
          <div className="ja-mono text-xs" style={{ color: 'var(--magenta)', letterSpacing: '0.08em' }}>
            {test.totalMarks} MARKS
          </div>
        </div>
      </div>

      {/* Test header */}
      <div className="ja-card p-5 mb-4 ja-glow-magenta"
        style={{ background: 'linear-gradient(180deg, rgba(214,138,255,0.06), var(--panel-2))' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="ja-mono text-xs uppercase" style={{ color: 'var(--magenta)', letterSpacing: '0.1em' }}>
            Practical Test
          </div>
        </div>
        <div className="ja-display text-2xl sm:text-3xl mb-2" style={{ fontWeight: 800 }}>
          {test.title}
        </div>
        <p className="text-sm" style={{ color: 'var(--ink-dim)', lineHeight: 1.55 }}>
          {test.scenario}
        </p>
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
            Class name: <span style={{ color: 'var(--cyan)' }}>{test.className}</span>
          </div>
          <div className="flex items-center gap-2 ja-mono text-xs px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(214,138,255,0.06)', border: '1px solid var(--line)' }}>
            <ExternalLink size={12} style={{ color: 'var(--cyan)' }} />
            <span style={{ color: 'var(--ink-dim)' }}>
              Use <button onClick={openPaperWindow} className="underline" style={{ color: 'var(--cyan)' }}>pop-out</button> to
              code in NetBeans, then paste here to submit
            </span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3 mb-4">
        {(test.sections || []).map(section => {
          const isExpanded = expandedSections[section.number] !== false;
          return (
            <div key={section.number} className="ja-card overflow-hidden">
              <button
                onClick={() => toggleSection(section.number)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="ja-mono text-xs px-2 py-0.5 rounded"
                    style={{ background: 'rgba(214,138,255,0.12)', color: 'var(--magenta)' }}>
                    {section.number}
                  </span>
                  <span className="ja-display text-base" style={{ fontWeight: 700 }}>
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>[{section.marks}]</span>
                  {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--ink-mute)' }} /> : <ChevronDown size={16} style={{ color: 'var(--ink-mute)' }} />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {(section.questions || []).map(q => (
                    <div key={q.number} className="flex gap-3 text-sm"
                      style={{ borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
                      <span className="ja-mono flex-shrink-0" style={{ color: 'var(--magenta)', fontWeight: 600, minWidth: '40px' }}>
                        {q.number}
                      </span>
                      <div className="flex-1">
                        <div style={{ color: 'var(--ink-dim)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>{q.text}</div>
                        <div className="ja-mono text-xs mt-1" style={{ color: 'var(--ink-mute)' }}>({q.marks})</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sample output */}
      {test.sampleOutput && (
        <div className="ja-card mb-4">
          <button
            onClick={() => setShowSample(!showSample)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="ja-display text-base" style={{ fontWeight: 700 }}>Sample Output</span>
            {showSample
              ? <ChevronUp size={16} style={{ color: 'var(--ink-mute)' }} />
              : <ChevronDown size={16} style={{ color: 'var(--ink-mute)' }} />
            }
          </button>
          {showSample && (
            <div className="px-4 pb-4">
              <pre className="ja-code text-xs" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {test.sampleOutput}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Code editor */}
      <div className="ja-card p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileCode size={16} style={{ color: 'var(--cyan)' }} />
            <div className="ja-display text-base" style={{ fontWeight: 700 }}>Your code</div>
            <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
              {test.className}.java
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={pasteFromClipboard}
              className="flex items-center gap-1.5 ja-mono text-xs px-2.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink-dim)' }}
              title="Paste code from your clipboard (e.g. from NetBeans)"
            >
              <ClipboardPaste size={12} /> Paste from IDE
            </button>
            {isEasy && (
              <button
                onClick={toggleHint}
                className="flex items-center gap-1.5 ja-mono text-xs px-2.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                style={{
                  background: hintOn ? 'rgba(214,138,255,0.08)' : 'var(--panel)',
                  border: '1px solid',
                  borderColor: hintOn ? 'rgba(214,138,255,0.3)' : 'var(--line)',
                  color: hintOn ? 'var(--magenta)' : 'var(--ink-dim)',
                }}
                title={hintOn ? 'Remove starter code and start from scratch' : 'Load the starter code skeleton'}
              >
                {hintOn ? <Lightbulb size={12} /> : <LightbulbOff size={12} />}
                {hintOn ? 'Hint on' : 'Hint off'}
              </button>
            )}
          </div>
        </div>
        <CodeEditor
          value={code}
          onChange={setCode}
          minHeight="400px"
        />
      </div>

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={!code.trim()}
        className="w-full flex items-center justify-center gap-2 ja-mono text-sm px-5 py-3 rounded-lg transition-opacity"
        style={{
          background: code.trim() ? 'var(--magenta)' : 'var(--panel-2)',
          color: code.trim() ? 'var(--bg)' : 'var(--ink-mute)',
          fontWeight: 700,
          opacity: code.trim() ? 1 : 0.5,
        }}
      >
        <Send size={16} /> Submit for marking
      </button>
    </div>
  );
});

function MarkingPhase() {
  return (
    <div className="ja-card p-8 text-center">
      <Loader2 size={40} className="ja-spin mx-auto mb-4" style={{ color: 'var(--magenta)' }} />
      <div className="ja-display text-xl mb-2" style={{ fontWeight: 700 }}>Marking your test...</div>
      <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
        Claude is reviewing your code against the rubric. Hold tight.
      </p>
    </div>
  );
}

function ResultsPhase({ result, test, onBack, onNewTest, onRetry }) {
  const [expandedQ, setExpandedQ] = useState({});

  function toggleQ(num) {
    setExpandedQ(prev => ({ ...prev, [num]: !prev[num] }));
  }

  return (
    <div className="ja-pop">
      {/* Grade card */}
      <div className="ja-card p-6 sm:p-8 text-center mb-5 ja-glow-magenta"
        style={{ background: 'linear-gradient(180deg, rgba(214,138,255,0.06), var(--panel-2))' }}>
        <div className="ja-mono text-xs uppercase mb-3" style={{ color: 'var(--magenta)', letterSpacing: '0.1em' }}>
          Test Result - {test.title}
        </div>

        <div className="ja-display text-6xl sm:text-7xl mb-1" style={{ fontWeight: 800, color: gradeColor(result.grade) }}>
          {result.grade}
        </div>
        <div className="ja-display text-2xl mb-1" style={{ fontWeight: 700, color: gradeColor(result.grade) }}>
          {result.percentage}%
        </div>
        <div className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>
          {result.totalAwarded} / {result.totalPossible} marks
        </div>

        <p className="text-sm" style={{ color: 'var(--ink-dim)', lineHeight: 1.55, maxWidth: '420px', margin: '0 auto' }}>
          {result.verdict}
        </p>
      </div>

      {/* Question breakdown */}
      <div className="ja-card p-5 mb-4">
        <div className="ja-display text-base mb-4" style={{ fontWeight: 700 }}>Mark breakdown</div>
        <div className="space-y-2">
          {(result.questionMarks || []).map(q => {
            const pct = q.possible > 0 ? q.awarded / q.possible : 0;
            const barColor = pct >= 0.8 ? 'var(--emerald)' : pct >= 0.5 ? 'var(--amber)' : 'var(--coral)';
            const isOpen = expandedQ[q.number];

            return (
              <div key={q.number} className="rounded-lg overflow-hidden"
                style={{ border: '1px solid var(--line)', background: 'var(--panel)' }}>
                <button
                  onClick={() => toggleQ(q.number)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="ja-mono text-xs" style={{ color: 'var(--magenta)', minWidth: '32px' }}>{q.number}</span>
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: barColor }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="ja-mono text-sm" style={{ color: barColor, fontWeight: 700 }}>
                      {q.awarded}/{q.possible}
                    </span>
                    {isOpen
                      ? <ChevronUp size={14} style={{ color: 'var(--ink-mute)' }} />
                      : <ChevronDown size={14} style={{ color: 'var(--ink-mute)' }} />
                    }
                  </div>
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 text-sm" style={{ color: 'var(--ink-dim)', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                    {q.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths and improvements */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {result.overallStrengths && result.overallStrengths.length > 0 && (
          <div className="ja-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check size={14} style={{ color: 'var(--emerald)' }} />
              <span className="ja-mono text-xs" style={{ color: 'var(--emerald)' }}>STRENGTHS</span>
            </div>
            <ul className="space-y-1.5">
              {result.overallStrengths.map((s, i) => (
                <li key={i} className="text-sm" style={{ color: 'var(--ink-dim)' }}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {result.overallImprovements && result.overallImprovements.length > 0 && (
          <div className="ja-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={14} style={{ color: 'var(--amber)' }} />
              <span className="ja-mono text-xs" style={{ color: 'var(--amber)' }}>TO IMPROVE</span>
            </div>
            <ul className="space-y-1.5">
              {result.overallImprovements.map((s, i) => (
                <li key={i} className="text-sm" style={{ color: 'var(--ink-dim)' }}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Next step */}
      {result.nextStep && (
        <div className="ja-card p-4 mb-5" style={{ borderColor: 'rgba(214,138,255,0.3)' }}>
          <div className="flex items-start gap-2">
            <Sparkles size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--magenta)' }} />
            <span className="text-sm" style={{ color: 'var(--ink-dim)' }}>{result.nextStep}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onRetry} className="flex-1 flex items-center justify-center gap-2 ja-mono text-sm px-4 py-2.5 rounded-lg"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
          <RotateCcw size={14} /> Edit and resubmit
        </button>
        <button onClick={onNewTest} className="flex-1 flex items-center justify-center gap-2 ja-mono text-sm px-4 py-2.5 rounded-lg"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
          <FileCode size={14} /> New test
        </button>
        <button onClick={onBack} className="flex-1 flex items-center justify-center gap-2 ja-mono text-sm px-4 py-2.5 rounded-lg"
          style={{ background: 'var(--magenta)', color: 'var(--bg)', fontWeight: 700 }}>
          Done <Home size={14} />
        </button>
      </div>
    </div>
  );
}
