import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, BookOpen, Brain, Check, X, Lightbulb,
  Star, ArrowRight, RotateCcw, Trophy, Sparkles, ListChecks,
} from 'lucide-react';
import { getTheoryUnit, getAllTheoryQuestions } from '../data/theory.js';

/*
 * TheoryMode: a two-phase learning experience.
 *
 *   1. LEARN  - browse topics, read explanations/vocabulary/worked examples
 *   2. QUIZ   - answer theory questions drawn from the unit's content
 *
 * Props:
 *   unitId       - which theory unit to show (e.g. 'U2', 'UB')
 *   worldColor   - CSS variable name (e.g. 'cyan', 'magenta')
 *   onBack       - return to world/level view
 *   onComplete   - callback with quiz results
 *   dispatch     - game state reducer dispatch (for skill tracking)
 */

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function TheoryMode({ unitId, worldColor = 'cyan', onBack, onComplete, dispatch, getTheoryUnit: getTheoryUnitProp }) {
  const resolveUnit = getTheoryUnitProp || getTheoryUnit;
  const unit = useMemo(() => resolveUnit(unitId), [unitId, getTheoryUnitProp]);
  const [phase, setPhase] = useState('learn');
  const [topicIdx, setTopicIdx] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizState, setQuizState] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [traceAnswers, setTraceAnswers] = useState({});
  const [orderSlots, setOrderSlots] = useState([]);
  const [results, setResults] = useState([]);
  const [showHint, setShowHint] = useState(false);

  if (!unit) {
    return (
      <div className="ja-card p-6 text-center">
        <div className="ja-display text-lg mb-2">Theory unit not found</div>
        <button onClick={onBack} className="ja-mono text-xs px-3 py-2 rounded-lg"
          style={{ background: 'var(--panel-2)', border: '1px solid var(--line)' }}>back</button>
      </div>
    );
  }

  const topic = unit.topics[topicIdx];

  function getQuestionsForUnit(id) {
    const u = resolveUnit(id);
    if (!u) return [];
    return u.topics.flatMap((t) => t.questions || []);
  }

  function startQuiz() {
    const all = getQuestionsForUnit(unitId);
    const picked = shuffle(all).slice(0, Math.min(10, all.length));
    setQuizQuestions(picked);
    setQuizIdx(0);
    setQuizState('answering');
    setSelected(null);
    setTraceAnswers({});
    setOrderSlots([]);
    setResults([]);
    setShowHint(false);
    setPhase('quiz');
  }

  function handleQuizAnswer(isCorrect, question) {
    const newResults = [...results, {
      id: question.id,
      correct: isCorrect,
      skills: question.skills || [],
      challengeType: 'theory-' + question.category,
      hintUsed: showHint,
    }];
    setResults(newResults);

    if (dispatch) {
      dispatch({
        type: 'answer',
        challengeId: question.id,
        correct: isCorrect,
        skills: question.skills || [],
        hintUsed: showHint,
        challengeType: 'theory-' + question.category,
      });
    }

    setQuizState('feedback');
  }

  function nextQuestion() {
    if (quizIdx + 1 >= quizQuestions.length) {
      setPhase('complete');
      if (onComplete) {
        const correct = results.filter(r => r.correct).length;
        onComplete({ correctCount: correct, total: results.length, results, unitId });
      }
      return;
    }
    setQuizIdx(quizIdx + 1);
    setQuizState('answering');
    setSelected(null);
    setTraceAnswers({});
    setOrderSlots([]);
    setShowHint(false);
  }

  return (
    <div>
      {phase === 'learn' && (
        <LearnPhase
          unit={unit}
          topic={topic}
          topicIdx={topicIdx}
          setTopicIdx={setTopicIdx}
          onBack={onBack}
          onStartQuiz={startQuiz}
          worldColor={worldColor}
        />
      )}

      {phase === 'quiz' && quizQuestions.length > 0 && (
        <QuizPhase
          question={quizQuestions[quizIdx]}
          questionNum={quizIdx + 1}
          totalQuestions={quizQuestions.length}
          quizState={quizState}
          selected={selected}
          setSelected={setSelected}
          traceAnswers={traceAnswers}
          setTraceAnswers={setTraceAnswers}
          orderSlots={orderSlots}
          setOrderSlots={setOrderSlots}
          showHint={showHint}
          setShowHint={setShowHint}
          onAnswer={handleQuizAnswer}
          onNext={nextQuestion}
          onBack={() => setPhase('learn')}
          worldColor={worldColor}
        />
      )}

      {phase === 'complete' && (
        <CompletePhase
          results={results}
          unitName={unit.title}
          onBack={onBack}
          onRetry={startQuiz}
          onReview={() => { setPhase('learn'); setTopicIdx(0); }}
          worldColor={worldColor}
        />
      )}
    </div>
  );
}

function LearnPhase({ unit, topic, topicIdx, setTopicIdx, onBack, onStartQuiz, worldColor }) {
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [topicIdx]);

  return (
    <div ref={topRef}>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
          style={{ color: 'var(--ink-mute)' }}>
          <ChevronLeft size={16} /> back
        </button>
        <div className="ja-mono text-xs" style={{ color: `var(--${worldColor})`, letterSpacing: '0.08em' }}>
          THEORY MODE
        </div>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(var(--${worldColor}-rgb, 92,242,255), 0.16)`, color: `var(--${worldColor})` }}>
          <BookOpen size={22} />
        </div>
        <div>
          <div className="ja-display text-3xl sm:text-4xl" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            {unit.title}
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-dim)' }}>{unit.purpose}</p>
        </div>
      </div>

      {/* Topic navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
        {unit.topics.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setTopicIdx(idx)}
            className="flex-shrink-0 ja-mono text-xs px-3 py-1.5 rounded-full transition-all"
            style={{
              background: idx === topicIdx ? `var(--${worldColor})` : 'var(--panel)',
              color: idx === topicIdx ? 'var(--bg)' : 'var(--ink-dim)',
              border: '1px solid',
              borderColor: idx === topicIdx ? `var(--${worldColor})` : 'var(--line)',
              fontWeight: idx === topicIdx ? 700 : 400,
            }}
          >
            {idx + 1}. {t.title}
          </button>
        ))}
      </div>

      {/* Topic content */}
      <div className="space-y-5">
        {/* Explanation */}
        <div className="ja-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} style={{ color: `var(--${worldColor})` }} />
            <div className="ja-display text-lg" style={{ fontWeight: 700 }}>{topic.title}</div>
          </div>
          <div className="space-y-2">
            {topic.explanation.map((line, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{line}</p>
            ))}
          </div>
        </div>

        {/* Vocabulary */}
        {topic.vocabulary && topic.vocabulary.length > 0 && (
          <div className="ja-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks size={16} style={{ color: 'var(--amber)' }} />
              <div className="ja-display text-base" style={{ fontWeight: 700 }}>Key vocabulary</div>
            </div>
            <div className="space-y-2">
              {topic.vocabulary.map((v, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="ja-mono flex-shrink-0" style={{ color: `var(--${worldColor})`, fontWeight: 600, minWidth: '140px' }}>
                    {v.term}
                  </span>
                  <span style={{ color: 'var(--ink-dim)' }}>{v.definition}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Worked examples */}
        {topic.workedExamples && topic.workedExamples.length > 0 && (
          <div className="ja-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} style={{ color: 'var(--emerald)' }} />
              <div className="ja-display text-base" style={{ fontWeight: 700 }}>Worked examples</div>
            </div>
            <div className="space-y-4">
              {topic.workedExamples.map((ex, i) => (
                <div key={i}>
                  <pre className="ja-code text-sm mb-2" style={{ whiteSpace: 'pre-wrap' }}>{ex.code}</pre>
                  <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>{ex.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Misconceptions */}
        {topic.misconceptions && topic.misconceptions.length > 0 && (
          <div className="ja-card p-5" style={{ borderColor: 'rgba(255,122,122,0.3)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} style={{ color: 'var(--coral)' }} />
              <div className="ja-display text-base" style={{ fontWeight: 700, color: 'var(--coral)' }}>Watch out for these mistakes</div>
            </div>
            <ul className="space-y-1.5">
              {topic.misconceptions.map((m, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--ink-dim)' }}>
                  <X size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--coral)' }} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setTopicIdx(Math.max(0, topicIdx - 1))}
          disabled={topicIdx === 0}
          className="flex items-center gap-1 ja-mono text-sm px-3 py-2 rounded-lg"
          style={{
            background: 'var(--panel)', border: '1px solid var(--line)',
            color: topicIdx === 0 ? 'var(--ink-mute)' : 'var(--ink)',
            opacity: topicIdx === 0 ? 0.4 : 1,
          }}
        >
          <ChevronLeft size={14} /> Previous
        </button>

        {topicIdx < unit.topics.length - 1 ? (
          <button
            onClick={() => setTopicIdx(topicIdx + 1)}
            className="flex items-center gap-1 ja-mono text-sm px-4 py-2 rounded-lg"
            style={{ background: `var(--${worldColor})`, color: 'var(--bg)', fontWeight: 700 }}
          >
            Next topic <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={onStartQuiz}
            className="flex items-center gap-2 ja-mono text-sm px-5 py-2.5 rounded-lg ja-pop"
            style={{ background: `var(--${worldColor})`, color: 'var(--bg)', fontWeight: 700 }}
          >
            <Brain size={16} /> Test yourself
          </button>
        )}
      </div>

      {/* Quick quiz access from any topic */}
      {topicIdx < unit.topics.length - 1 && (
        <div className="mt-4 text-center">
          <button
            onClick={onStartQuiz}
            className="ja-mono text-xs hover:opacity-80"
            style={{ color: 'var(--ink-mute)' }}
          >
            or skip to quiz →
          </button>
        </div>
      )}
    </div>
  );
}

function QuizPhase({
  question, questionNum, totalQuestions, quizState,
  selected, setSelected, traceAnswers, setTraceAnswers,
  orderSlots, setOrderSlots, showHint, setShowHint,
  onAnswer, onNext, onBack, worldColor,
}) {
  const isLast = questionNum === totalQuestions;

  function handleMcSelect(idx) {
    if (quizState !== 'answering') return;
    setSelected(idx);
  }

  function handleTfSelect(val) {
    if (quizState !== 'answering') return;
    setSelected(val);
  }

  function handleSubmit() {
    if (question.type === 'mc') {
      onAnswer(selected === question.answer, question);
    } else if (question.type === 'tf') {
      onAnswer(selected === question.answer, question);
    } else if (question.type === 'trace') {
      const allCorrect = question.rows.every((row, i) =>
        (traceAnswers[i] || '').trim() === row.answer
      );
      onAnswer(allCorrect, question);
    } else if (question.type === 'order') {
      const isCorrect = orderSlots.length === question.answer.length &&
        orderSlots.every((slot, i) => slot === question.answer[i]);
      onAnswer(isCorrect, question);
    }
  }

  function canSubmit() {
    if (question.type === 'mc') return selected !== null;
    if (question.type === 'tf') return selected !== null;
    if (question.type === 'trace') return question.rows.every((_, i) => (traceAnswers[i] || '').trim() !== '');
    if (question.type === 'order') return orderSlots.length === question.items.length;
    return false;
  }

  function handleOrderClick(itemIdx) {
    if (quizState !== 'answering') return;
    if (orderSlots.includes(itemIdx)) {
      setOrderSlots(orderSlots.filter(s => s !== itemIdx));
    } else {
      setOrderSlots([...orderSlots, itemIdx]);
    }
  }

  const progressPct = (questionNum / totalQuestions) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
          style={{ color: 'var(--ink-mute)' }}>
          <ChevronLeft size={16} /> back to theory
        </button>
        <div className="ja-mono text-xs" style={{ color: `var(--${worldColor})`, letterSpacing: '0.08em' }}>
          THEORY QUIZ · {questionNum}/{totalQuestions}
        </div>
      </div>

      {/* Progress bar */}
      <div className="ja-bar mb-5">
        <div className="ja-bar-fill" style={{ width: `${progressPct}%`, background: `var(--${worldColor})` }} />
      </div>

      {/* Question card */}
      <div className="ja-card p-5 sm:p-6">
        <div className="ja-mono text-xs mb-3 uppercase" style={{ color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>
          {question.category}
        </div>
        <div className="ja-display text-lg sm:text-xl mb-4" style={{ fontWeight: 700, lineHeight: 1.35, whiteSpace: 'pre-line' }}>
          {question.prompt}
        </div>

        {/* Code block if present */}
        {question.code && (
          <pre className="ja-code text-sm mb-4" style={{ whiteSpace: 'pre-wrap' }}>{question.code}</pre>
        )}

        {/* MC options */}
        {question.type === 'mc' && (
          <div className="space-y-2">
            {question.options.map((opt, idx) => {
              let state = '';
              if (quizState === 'answering' && selected === idx) state = 'selected';
              if (quizState === 'feedback') {
                if (idx === question.answer) state = 'correct';
                else if (idx === selected && selected !== question.answer) state = 'wrong';
                else state = 'locked';
              }
              return (
                <button
                  key={idx}
                  className="ja-opt"
                  data-state={state}
                  onClick={() => handleMcSelect(idx)}
                  disabled={quizState === 'feedback'}
                >
                  <div className="flex items-center gap-3">
                    <span className="ja-mono text-xs flex-shrink-0" style={{ color: 'var(--ink-mute)', width: '20px' }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* TF options */}
        {question.type === 'tf' && (
          <div className="flex gap-3">
            {[true, false].map(val => {
              let state = '';
              if (quizState === 'answering' && selected === val) state = 'selected';
              if (quizState === 'feedback') {
                if (val === question.answer) state = 'correct';
                else if (val === selected && selected !== question.answer) state = 'wrong';
                else state = 'locked';
              }
              return (
                <button
                  key={String(val)}
                  className="ja-opt flex-1"
                  data-state={state}
                  onClick={() => handleTfSelect(val)}
                  disabled={quizState === 'feedback'}
                >
                  <div className="text-center text-sm font-semibold">{val ? 'True' : 'False'}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Trace inputs */}
        {question.type === 'trace' && (
          <div className="space-y-2">
            {question.rows.map((row, i) => {
              let inputState = '';
              if (quizState === 'feedback') {
                inputState = (traceAnswers[i] || '').trim() === row.answer ? 'correct' : 'wrong';
              }
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm flex-shrink-0" style={{ color: 'var(--ink-dim)', minWidth: '140px' }}>{row.label}</span>
                  <input
                    type="text"
                    className="ja-trace-input"
                    data-state={inputState}
                    value={traceAnswers[i] || ''}
                    onChange={(e) => setTraceAnswers({ ...traceAnswers, [i]: e.target.value })}
                    disabled={quizState === 'feedback'}
                    placeholder="?"
                  />
                  {quizState === 'feedback' && inputState === 'wrong' && (
                    <span className="ja-mono text-xs" style={{ color: 'var(--emerald)' }}>{row.answer}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Order items */}
        {question.type === 'order' && (
          <div className="space-y-2">
            {question.items.map((item, idx) => {
              const placed = orderSlots.indexOf(idx);
              const isPlaced = placed !== -1;
              let itemState = '';
              if (quizState === 'feedback') {
                if (isPlaced) {
                  itemState = question.answer[placed] === idx ? 'placed-correct' : 'placed-wrong';
                }
              }
              return (
                <button
                  key={idx}
                  className="ja-sort-item w-full"
                  data-state={itemState}
                  onClick={() => handleOrderClick(idx)}
                  disabled={quizState === 'feedback'}
                >
                  <span className="ja-mono text-xs flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: isPlaced ? `var(--${worldColor})` : 'var(--panel-2)',
                      color: isPlaced ? 'var(--bg)' : 'var(--ink-mute)',
                      fontWeight: 700,
                    }}>
                    {isPlaced ? placed + 1 : ''}
                  </span>
                  <span className="text-sm">{item}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Hint */}
        {quizState === 'answering' && question.hint && (
          <div className="mt-4">
            {!showHint ? (
              <button onClick={() => setShowHint(true)} className="flex items-center gap-1.5 ja-mono text-xs hover:opacity-80"
                style={{ color: 'var(--amber)' }}>
                <Lightbulb size={14} /> show hint
              </button>
            ) : (
              <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(255,180,84,0.08)', border: '1px solid rgba(255,180,84,0.25)' }}>
                <Lightbulb size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--amber)' }} />
                <span className="text-sm" style={{ color: 'var(--amber)' }}>{question.hint}</span>
              </div>
            )}
          </div>
        )}

        {/* Submit / feedback */}
        {quizState === 'answering' && (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className="mt-5 w-full ja-mono text-sm px-4 py-3 rounded-lg transition-opacity"
            style={{
              background: canSubmit() ? `var(--${worldColor})` : 'var(--panel-2)',
              color: canSubmit() ? 'var(--bg)' : 'var(--ink-mute)',
              fontWeight: 700,
              opacity: canSubmit() ? 1 : 0.5,
            }}
          >
            Check answer
          </button>
        )}

        {quizState === 'feedback' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{
                background: isAnswerCorrect(question, selected, traceAnswers, orderSlots)
                  ? 'rgba(110,231,168,0.08)' : 'rgba(255,122,122,0.08)',
                border: '1px solid',
                borderColor: isAnswerCorrect(question, selected, traceAnswers, orderSlots)
                  ? 'rgba(110,231,168,0.3)' : 'rgba(255,122,122,0.3)',
              }}>
              {isAnswerCorrect(question, selected, traceAnswers, orderSlots)
                ? <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--emerald)' }} />
                : <X size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--coral)' }} />
              }
              <span className="text-sm" style={{
                color: isAnswerCorrect(question, selected, traceAnswers, orderSlots) ? 'var(--emerald)' : 'var(--coral)'
              }}>
                {question.explanation}
              </span>
            </div>

            <button
              onClick={onNext}
              className="w-full flex items-center justify-center gap-2 ja-mono text-sm px-4 py-3 rounded-lg"
              style={{ background: `var(--${worldColor})`, color: 'var(--bg)', fontWeight: 700 }}
            >
              {isLast ? (
                <>View results <Trophy size={14} /></>
              ) : (
                <>Next question <ArrowRight size={14} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function isAnswerCorrect(question, selected, traceAnswers, orderSlots) {
  if (question.type === 'mc' || question.type === 'tf') return selected === question.answer;
  if (question.type === 'trace') return question.rows.every((row, i) => (traceAnswers[i] || '').trim() === row.answer);
  if (question.type === 'order') return orderSlots.length === question.answer.length && orderSlots.every((s, i) => s === question.answer[i]);
  return false;
}

function CompletePhase({ results, unitName, onBack, onRetry, onReview, worldColor }) {
  const correct = results.filter(r => r.correct).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;

  return (
    <div className="ja-card p-6 sm:p-8 text-center ja-pop">
      <div className="ja-mono text-xs mb-4 uppercase" style={{ color: `var(--${worldColor})`, letterSpacing: '0.1em' }}>
        Theory Quiz Complete
      </div>

      <div className="ja-display text-4xl sm:text-5xl mb-2" style={{ fontWeight: 800, color: `var(--${worldColor})` }}>
        {pct}%
      </div>
      <div className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>
        {correct} of {total} correct on {unitName}
      </div>

      {/* Stars */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <Star key={s} size={28} className={`ja-star ${s <= stars ? 'lit' : ''}`}
            fill={s <= stars ? 'var(--amber)' : 'none'} />
        ))}
      </div>

      <div className="text-sm mb-6" style={{ color: 'var(--ink-dim)' }}>
        {pct >= 90 ? 'Outstanding! You have a solid grasp of the theory.'
          : pct >= 70 ? 'Good work! A few areas to revisit.'
            : pct >= 50 ? 'Getting there. Review the topics you missed.'
              : 'Keep studying! Go back through the theory and try again.'}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onReview} className="flex items-center justify-center gap-2 ja-mono text-sm px-5 py-2.5 rounded-lg"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)' }}>
          <BookOpen size={14} /> Review theory
        </button>
        <button onClick={onRetry} className="flex items-center justify-center gap-2 ja-mono text-sm px-5 py-2.5 rounded-lg"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)' }}>
          <RotateCcw size={14} /> Retry quiz
        </button>
        <button onClick={onBack} className="flex items-center justify-center gap-2 ja-mono text-sm px-5 py-2.5 rounded-lg"
          style={{ background: `var(--${worldColor})`, color: 'var(--bg)', fontWeight: 700 }}>
          Done <Check size={14} />
        </button>
      </div>
    </div>
  );
}

export default TheoryMode;
