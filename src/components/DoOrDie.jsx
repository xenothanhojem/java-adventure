import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft, Skull, Timer, Loader2, AlertCircle, Trophy, RotateCcw, Home,
} from 'lucide-react';
import { tickerScheduleFor, scoreRun, GRADE_COLOR } from '../data/scenarios.js';
import { UNITS } from '../data/skills.js';
import NewsTicker from './NewsTicker.jsx';

/*
 * Do or Die: timed, AI-generated challenge run with cinematic pressure.
 *
 * Phases:
 *   - briefing  : show scenario narrative, "deploy" button
 *   - loading   : fetch challenges from /api/generate-challenges
 *   - error     : show fetch / parse error with retry
 *   - playing   : timer + ticker + challenge card; auto-end at time = 0
 *   - complete  : show grade + score breakdown + narrative outcome
 */

function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

function CountdownBar({ remaining, total }) {
  const pct = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;
  const danger = remaining <= 30;
  const warning = remaining <= 60;
  const color = danger ? 'var(--coral)' : warning ? 'var(--amber)' : 'var(--cyan)';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer size={16} style={{ color }} className={danger ? 'ja-pulse-coral' : ''} />
          <div className="ja-mono text-xs uppercase" style={{ color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>
            time remaining
          </div>
        </div>
        <div
          className="ja-display text-2xl tabular-nums"
          style={{ fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}
        >
          {formatTime(remaining)}
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${pct * 100}%`,
            background: color,
            transition: 'width 1s linear',
          }}
        />
      </div>
    </div>
  );
}

function Briefing({ scenario, onDeploy, onBack }) {
  const unit = UNITS[scenario.unitId];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
          style={{ color: 'var(--ink-mute)' }}
        >
          <ChevronLeft size={16} /> abort mission
        </button>
        <div className="ja-mono text-xs" style={{ color: 'var(--coral)', letterSpacing: '0.08em' }}>
          DO OR DIE · {unit ? `Unit ${unit.number}` : ''}
        </div>
      </div>

      <div
        className="ja-card p-6 sm:p-8 ja-glow-coral relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,122,122,0.06) 0%, var(--panel-2) 100%)',
        }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,122,122,0.16)', color: 'var(--coral)' }}
          >
            <Skull size={24} />
          </div>
          <div>
            <div className="ja-mono text-xs uppercase mb-1" style={{ color: 'var(--coral)', letterSpacing: '0.1em' }}>
              Mission Briefing
            </div>
            <div className="ja-display text-3xl sm:text-4xl" style={{ fontWeight: 800, lineHeight: 1.1 }}>
              {scenario.title}
            </div>
          </div>
        </div>

        <div className="text-base mb-6 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
          {scenario.briefing}
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
            <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>time limit</div>
            <div className="ja-display text-xl" style={{ fontWeight: 700, color: 'var(--coral)' }}>
              {formatTime(scenario.timeLimitSeconds)}
            </div>
          </div>
          <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
            <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>questions</div>
            <div className="ja-display text-xl" style={{ fontWeight: 700, color: 'var(--cyan)' }}>
              {scenario.questionCount}
            </div>
          </div>
          <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
            <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>scoring</div>
            <div className="ja-display text-xl" style={{ fontWeight: 700, color: 'var(--amber)' }}>
              S - F
            </div>
          </div>
        </div>

        <div className="ja-mono text-xs mb-4" style={{ color: 'var(--ink-mute)' }}>
          // skills under test: {scenario.skills.join(', ')}
        </div>

        <button
          onClick={onDeploy}
          className="w-full ja-display text-lg px-6 py-4 rounded-xl ja-glow-coral hover:opacity-95 transition"
          style={{
            background: 'linear-gradient(90deg, var(--coral), var(--magenta))',
            color: '#0a0c12',
            fontWeight: 800,
            letterSpacing: '0.04em',
          }}
        >
          DEPLOY - GENERATE MISSION
        </button>
      </div>
    </div>
  );
}

function LoadingScreen({ scenario }) {
  return (
    <div className="ja-card p-10 flex flex-col items-center text-center">
      <Loader2 size={32} className="ja-spin mb-4" style={{ color: 'var(--coral)' }} />
      <div className="ja-display text-xl mb-2" style={{ fontWeight: 700 }}>
        Generating mission parameters...
      </div>
      <div className="ja-mono text-sm" style={{ color: 'var(--ink-mute)' }}>
        // tactical computer is preparing {scenario.questionCount} challenges
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry, onBack }) {
  return (
    <div className="ja-card p-8 flex flex-col items-center text-center"
         style={{ background: 'rgba(255,122,122,0.08)', borderColor: 'rgba(255,122,122,0.4)' }}>
      <AlertCircle size={28} className="mb-3" style={{ color: 'var(--coral)' }} />
      <div className="ja-display text-xl mb-2" style={{ fontWeight: 700 }}>Mission compromised</div>
      <div className="text-sm mb-5" style={{ color: 'var(--ink-dim)' }}>{message}</div>
      <div className="flex gap-2">
        <button
          onClick={onRetry}
          className="ja-mono text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
          style={{ background: 'var(--coral)', color: '#0a0c12', fontWeight: 700 }}
        >
          <RotateCcw size={14} /> retry
        </button>
        <button
          onClick={onBack}
          className="ja-mono text-xs px-4 py-2 rounded-lg"
          style={{ background: 'var(--panel-2)', color: 'var(--ink-dim)', border: '1px solid var(--line)' }}
        >
          back
        </button>
      </div>
    </div>
  );
}

function Playing({ scenario, challenges, remaining, onAnswer, idx, renderChallenge }) {
  const total = scenario.timeLimitSeconds;
  const elapsedFraction = total > 0 ? 1 - remaining / total : 0;
  const schedule = useMemo(() => tickerScheduleFor(scenario), [scenario]);

  const danger = remaining <= 30;
  const current = challenges[idx];

  if (!current) return null;

  return (
    <div className={`space-y-4 ${danger ? 'ja-screen-pulse' : ''}`}>
      <div className="grid sm:grid-cols-3 gap-3 items-stretch">
        <div className="ja-card p-4 sm:col-span-2">
          <CountdownBar remaining={remaining} total={total} />
        </div>
        <div className="ja-card p-4 flex items-center justify-between">
          <div>
            <div className="ja-mono text-xs uppercase" style={{ color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>
              progress
            </div>
            <div className="ja-display text-2xl" style={{ fontWeight: 800, color: 'var(--cyan)' }}>
              {idx + 1} / {challenges.length}
            </div>
          </div>
          <Skull size={28} style={{ color: 'var(--coral)', opacity: 0.6 }} />
        </div>
      </div>

      <NewsTicker
        messages={scenario.tickerMessages}
        schedule={schedule}
        elapsedFraction={elapsedFraction}
      />

      <div key={idx}>
        {renderChallenge({
          challenge: current,
          onAnswer: ({ correct, hintUsed }) => onAnswer({ correct, hintUsed }),
        })}
      </div>
    </div>
  );
}

function CompleteScreen({ scenario, result, onReplay, onBack }) {
  const grade = result.grade;
  const color = GRADE_COLOR[grade] || 'var(--ink)';
  const passed = grade !== 'F';
  return (
    <div className="space-y-5">
      <div
        className={`ja-card p-8 sm:p-10 text-center ${passed ? 'ja-glow-emerald' : 'ja-glow-coral'} relative overflow-hidden`}
        style={{
          background: passed
            ? 'linear-gradient(180deg, rgba(110,231,168,0.08) 0%, var(--panel-2) 100%)'
            : 'linear-gradient(180deg, rgba(255,122,122,0.08) 0%, var(--panel-2) 100%)',
        }}
      >
        <div className="ja-mono text-xs uppercase mb-2" style={{ color: 'var(--ink-mute)', letterSpacing: '0.12em' }}>
          mission outcome
        </div>
        <div className="ja-display text-2xl mb-4" style={{ fontWeight: 700 }}>
          {scenario.title}
        </div>

        <div
          className="ja-display mb-2"
          style={{
            fontWeight: 900,
            fontSize: '8rem',
            lineHeight: 1,
            color,
            textShadow: `0 0 40px ${color}66`,
            letterSpacing: '-0.04em',
          }}
        >
          {grade}
        </div>
        <div className="ja-mono text-sm mb-6" style={{ color: 'var(--ink-mute)' }}>
          {Math.round(result.finalScore)} / 100 points
        </div>

        <div className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-dim)' }}>
          {passed ? scenario.victoryMessage : scenario.failMessage}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <ScoreBlock label="completion" value={`${Math.round(result.completionPct * 100)}%`} sub={`${Math.round(result.completionScore)} / 40`} color="var(--cyan)" />
          <ScoreBlock label="accuracy"   value={`${Math.round(result.accuracyPct * 100)}%`}   sub={`${Math.round(result.accuracyScore)} / 40`} color="var(--emerald)" />
          <ScoreBlock label="speed"      value={`${Math.round(result.speedPct * 100)}%`}      sub={`${Math.round(result.speedBonus)} / 20`}    color="var(--amber)" />
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={onReplay}
            className="ja-mono text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5"
            style={{ background: 'var(--coral)', color: '#0a0c12', fontWeight: 700 }}
          >
            <RotateCcw size={14} /> retry mission
          </button>
          <button
            onClick={onBack}
            className="ja-mono text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5"
            style={{ background: 'var(--panel-2)', color: 'var(--ink-dim)', border: '1px solid var(--line)' }}
          >
            <Home size={14} /> base
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreBlock({ label, value, sub, color }) {
  return (
    <div className="px-3 py-3 rounded-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
      <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{label}</div>
      <div className="ja-display text-2xl" style={{ fontWeight: 800, color }}>{value}</div>
      <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{sub}</div>
    </div>
  );
}

export default function DoOrDie({ scenario, onBack, onComplete, dispatch, renderChallenge }) {
  const [phase, setPhase] = useState('briefing');
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(scenario.timeLimitSeconds);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(null);

  const startTsRef = useRef(0);
  const finishedRef = useRef(false);

  async function fetchChallenges() {
    setPhase('loading');
    setError(null);
    try {
      const unit = UNITS[scenario.unitId];
      const res = await fetch('/api/generate-challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: scenario.unitId,
          unitName: unit ? unit.name : '',
          skills: scenario.skills,
          count: scenario.questionCount,
          scenarioContext: `${scenario.title}: ${scenario.briefing}`,
          difficulty: 'medium',
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Generation failed (${res.status})`);
      }
      const data = await res.json();
      if (!data.challenges || data.challenges.length === 0) {
        throw new Error('No challenges generated');
      }
      setChallenges(data.challenges);
      setIdx(0);
      setAnsweredCount(0);
      setCorrectCount(0);
      setRemaining(scenario.timeLimitSeconds);
      finishedRef.current = false;
      startTsRef.current = Date.now();
      setPhase('playing');
    } catch (e) {
      setError(e.message || 'Could not generate the mission. Try again.');
      setPhase('error');
    }
  }

  useEffect(() => {
    if (phase !== 'playing') return undefined;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTsRef.current) / 1000);
      const left = scenario.timeLimitSeconds - elapsed;
      setRemaining(left);
      if (left <= 0 && !finishedRef.current) {
        finishedRef.current = true;
        finalize({ timeOut: true });
      }
    }, 250);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, scenario.timeLimitSeconds]);

  function finalize({ timeOut } = {}) {
    const elapsed = Math.floor((Date.now() - startTsRef.current) / 1000);
    const timeRemainingSec = Math.max(0, scenario.timeLimitSeconds - elapsed);
    const computed = scoreRun({
      totalQuestions: challenges.length,
      questionsAnswered: answeredCount,
      correctAnswers: correctCount,
      timeRemainingSec,
      timeLimitSec: scenario.timeLimitSeconds,
    });
    setResult(computed);
    setPhase('complete');
    if (dispatch) {
      dispatch({
        type: 'doOrDieResult',
        scenarioId: scenario.id,
        unitId: scenario.unitId,
        score: computed.finalScore,
        grade: computed.grade,
        completion: computed.completionPct,
        accuracy: computed.accuracyPct,
        speed: computed.speedPct,
        correctCount,
        total: challenges.length,
      });
    }
    if (onComplete) onComplete(computed);
  }

  function handleAnswer({ correct, hintUsed }) {
    /*
     * Use functional setStates so we always work with the latest values
     * even when the timer interval also fires near the boundary.
     */
    setAnsweredCount((prev) => prev + 1);
    if (correct) setCorrectCount((prev) => prev + 1);

    const cur = challenges[idx];
    if (cur && dispatch) {
      dispatch({
        type: 'answer',
        challengeId: `dor:${scenario.id}:${cur.id}`,
        correct,
        skills: cur.skills || scenario.skills,
        hintUsed,
        challengeType: cur.type,
      });
    }

    /*
     * Advance after a short tick so the user sees the feedback. Because the
     * underlying ChallengeCard handles its own feedback phase, we hop forward
     * when the user clicks Next. We don't auto-advance here - the rendered
     * card calls onNext via its internal flow. But our renderChallenge does
     * not pass onNext, so we advance immediately on answer. The ChallengeCard
     * still shows its feedback for a moment.
     */
    if (idx + 1 < challenges.length) {
      setTimeout(() => setIdx((v) => v + 1), 1200);
    } else {
      setTimeout(() => {
        if (!finishedRef.current) {
          finishedRef.current = true;
          finalize({ timeOut: false });
        }
      }, 1200);
    }
  }

  if (phase === 'briefing') {
    return <Briefing scenario={scenario} onDeploy={fetchChallenges} onBack={onBack} />;
  }
  if (phase === 'loading') {
    return <LoadingScreen scenario={scenario} />;
  }
  if (phase === 'error') {
    return <ErrorScreen message={error || 'unknown error'} onRetry={fetchChallenges} onBack={onBack} />;
  }
  if (phase === 'playing') {
    return (
      <Playing
        scenario={scenario}
        challenges={challenges}
        remaining={remaining}
        onAnswer={handleAnswer}
        idx={idx}
        renderChallenge={renderChallenge}
      />
    );
  }
  if (phase === 'complete') {
    return (
      <CompleteScreen
        scenario={scenario}
        result={result}
        onReplay={fetchChallenges}
        onBack={onBack}
      />
    );
  }
  return null;
}
