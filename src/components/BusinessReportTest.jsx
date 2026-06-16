import React, { useState } from 'react';
import {
  ChevronLeft, FileText, Loader2, Send, Trophy, RotateCcw, AlertCircle,
} from 'lucide-react';

const SCENARIOS = [
  { id: 'green-harvest', label: 'Green Harvest Farms (ownership expansion)' },
  { id: 'brighttech', label: 'BrightTech Pty Ltd (ethics & professionalism)' },
];

const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

const SECTIONS = [
  { key: 'title', label: 'Title', placeholder: 'Report on...' },
  { key: 'introduction', label: 'Terms of Reference / Introduction', placeholder: 'This report has been prepared to investigate...' },
  { key: 'procedure', label: 'Procedure / Methodology', placeholder: 'Information was gathered from...' },
  { key: 'findings', label: 'Findings', placeholder: 'Explain theory, compare options, apply to the scenario...' },
  { key: 'conclusion', label: 'Conclusion', placeholder: 'In conclusion...' },
  { key: 'recommendations', label: 'Recommendations', placeholder: 'It is recommended that...' },
];

function gradeColor(grade) {
  if (grade === 'A') return 'var(--emerald)';
  if (grade === 'B') return 'var(--cyan)';
  if (grade === 'C') return 'var(--amber)';
  return 'var(--coral)';
}

export default function BusinessReportTest({ onBack, onComplete }) {
  const [phase, setPhase] = useState('setup');
  const [scenarioId, setScenarioId] = useState('green-harvest');
  const [difficulty, setDifficulty] = useState('medium');
  const [test, setTest] = useState(null);
  const [report, setReport] = useState(() => Object.fromEntries(SECTIONS.map((s) => [s.key, ''])));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function generateTest() {
    setError('');
    setPhase('loading');
    try {
      const res = await fetch('/api/generate-business-report-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId, difficulty }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${res.status}`);
      }
      const data = await res.json();
      setTest(data.test);
      setReport(Object.fromEntries(SECTIONS.map((s) => [s.key, ''])));
      setPhase('paper');
    } catch (e) {
      setError(e.message || 'Could not generate test');
      setPhase('setup');
    }
  }

  async function submitReport() {
    setPhase('marking');
    try {
      const res = await fetch('/api/mark-business-report-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test, report }),
      });
      if (!res.ok) throw new Error('Marking failed');
      const data = await res.json();
      setResult(data.result);
      setPhase('results');
      onComplete?.({
        unitId: test.unitId,
        totalAwarded: data.result.totalAwarded,
        totalPossible: data.result.totalPossible,
        percentage: data.result.percentage,
        grade: data.result.grade,
      });
    } catch (e) {
      setError(e.message || 'Marking failed');
      setPhase('writing');
    }
  }

  if (phase === 'setup') {
    return (
      <div className="space-y-5">
        <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm" style={{ color: 'var(--ink-mute)' }}>
          <ChevronLeft size={16} /> back
        </button>
        <div>
          <h1 className="ja-display text-3xl mb-1" style={{ fontWeight: 800 }}>Business Report Test</h1>
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>IEB Section C practice — structured report writing with AI marking.</p>
        </div>
        {error && (
          <div className="ja-card p-4 flex items-start gap-2" style={{ borderColor: 'var(--coral)' }}>
            <AlertCircle size={16} style={{ color: 'var(--coral)' }} />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <div className="ja-card p-5 space-y-4">
          <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>scenario</div>
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenarioId(s.id)}
              className="w-full text-left ja-card p-4 ja-tile"
              style={{ borderColor: scenarioId === s.id ? 'var(--gold)' : 'var(--line)' }}
            >
              {s.label}
            </button>
          ))}
          <div className="ja-mono text-xs pt-2" style={{ color: 'var(--ink-mute)' }}>difficulty</div>
          <div className="flex gap-2">
            {DIFFICULTY_OPTIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className="ja-mono text-xs px-3 py-2 rounded-lg flex-1"
                style={{
                  border: `1px solid ${difficulty === d.id ? 'var(--gold)' : 'var(--line)'}`,
                  color: difficulty === d.id ? 'var(--gold)' : 'var(--ink-mute)',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
          <button
            onClick={generateTest}
            className="w-full ja-mono text-sm py-3 rounded-lg flex items-center justify-center gap-2"
            style={{ background: 'var(--gold)', color: '#0a0c12', fontWeight: 700 }}
          >
            <FileText size={16} /> generate test paper
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'loading' || phase === 'marking') {
    return (
      <div className="ja-card p-10 text-center">
        <Loader2 size={32} className="mx-auto mb-4 animate-spin" style={{ color: 'var(--gold)' }} />
        <div className="ja-display text-lg">{phase === 'loading' ? 'Generating test paper...' : 'Marking your report...'}</div>
      </div>
    );
  }

  if (phase === 'results' && result) {
    return (
      <div className="space-y-5">
        <div className="ja-card p-6 text-center ja-glow-gold">
          <Trophy size={36} className="mx-auto mb-3" style={{ color: gradeColor(result.grade) }} />
          <div className="ja-display text-4xl mb-1" style={{ fontWeight: 800, color: gradeColor(result.grade) }}>
            {result.grade}
          </div>
          <div className="ja-mono text-sm" style={{ color: 'var(--ink-dim)' }}>
            {result.totalAwarded}/{result.totalPossible} marks ({result.percentage}%)
          </div>
          <p className="text-sm mt-4" style={{ color: 'var(--ink-dim)' }}>{result.verdict}</p>
        </div>
        {(result.feedback || []).map((f, i) => (
          <div key={i} className="ja-card p-4 text-sm" style={{ color: 'var(--ink-dim)' }}>{f}</div>
        ))}
        <div className="flex gap-3">
          <button onClick={() => setPhase('setup')} className="ja-mono text-sm px-4 py-2 rounded-lg" style={{ border: '1px solid var(--line)' }}>
            <RotateCcw size={14} className="inline mr-1" /> new test
          </button>
          <button onClick={onBack} className="ja-mono text-sm px-4 py-2 rounded-lg" style={{ background: 'var(--gold)', color: '#0a0c12', fontWeight: 700 }}>
            back to map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm" style={{ color: 'var(--ink-mute)' }}>
        <ChevronLeft size={16} /> back
      </button>
      {phase === 'paper' && test && (
        <div className="ja-card p-5 mb-4">
          <div className="ja-mono text-xs mb-2" style={{ color: 'var(--gold)' }}>test paper</div>
          <h2 className="ja-display text-xl mb-2" style={{ fontWeight: 700 }}>{test.title}</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)', lineHeight: 1.6 }}>{test.scenario}</p>
          <ul className="text-sm space-y-1" style={{ color: 'var(--ink-dim)' }}>
            {(test.sections?.[0]?.prompts || []).map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
          <button
            onClick={() => setPhase('writing')}
            className="mt-4 ja-mono text-sm px-4 py-2 rounded-lg"
            style={{ background: 'var(--gold)', color: '#0a0c12', fontWeight: 700 }}
          >
            start writing
          </button>
        </div>
      )}
      {phase === 'writing' && test && (
        <>
          <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>write your report below</div>
          {SECTIONS.map((section) => (
            <div key={section.key} className="ja-card p-4">
              <label className="ja-mono text-xs block mb-2" style={{ color: 'var(--gold)' }}>{section.label}</label>
              <textarea
                value={report[section.key]}
                onChange={(e) => setReport((r) => ({ ...r, [section.key]: e.target.value }))}
                placeholder={section.placeholder}
                rows={section.key === 'findings' ? 8 : 3}
                className="w-full ja-mono text-sm p-3 rounded-lg resize-y"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--ink)' }}
              />
            </div>
          ))}
          {error && <div className="text-sm" style={{ color: 'var(--coral)' }}>{error}</div>}
          <button
            onClick={submitReport}
            className="w-full ja-mono text-sm py-3 rounded-lg flex items-center justify-center gap-2"
            style={{ background: 'var(--gold)', color: '#0a0c12', fontWeight: 700 }}
          >
            <Send size={16} /> submit for marking
          </button>
        </>
      )}
    </div>
  );
}
