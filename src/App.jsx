import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Code2, Zap, Star, Flame, Trophy, Target,
  Lightbulb, RotateCcw, Check, X, Lock, Sparkles, BarChart3, Home,
  ArrowRight, BookOpen, Cpu, Repeat, GitBranch, Hash, ScrollText, Brain,
  PartyPopper, Rocket, Boxes, Workflow, Bug, Send, Loader2, FileCode,
  AlertCircle, Pencil, TrendingUp, Skull, Timer, LogOut, Binary, Briefcase
} from 'lucide-react';
import { migrateSkillIds } from './data/skills.js';
import CodeEditor from './components/CodeEditor.jsx';
import ProgressReport from './components/ProgressReport.jsx';
import DoOrDie from './components/DoOrDie.jsx';
import OnboardingModal from './components/OnboardingModal.jsx';
import TheoryMode from './components/TheoryMode.jsx';
import PracticalTest from './components/PracticalTest.jsx';
import SubjectPicker from './components/SubjectPicker.jsx';
import BusinessReportTest from './components/BusinessReportTest.jsx';
import { getSubject, getSubjectModule } from './subjects/index.js';
import { tickerScheduleFor, scoreRun, GRADE_COLOR } from './data/scenarios.js';

/* =========================================================================
   STYLE BLOCK — fonts, custom CSS, small animations.
   We're constrained to Tailwind core utilities, so anything bespoke
   (fonts, glows, code highlighting) lives here.
   ========================================================================= */

const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root {
    --bg: #0a0c12;
    --bg-2: #11141d;
    --panel: #161a26;
    --panel-2: #1c2030;
    --line: #262b3d;
    --line-2: #343a52;
    --ink: #e8ebf5;
    --ink-dim: #9aa1bb;
    --ink-mute: #5d6481;

    --cyan: #5cf2ff;
    --magenta: #d68aff;
    --amber: #ffb454;
    --emerald: #6ee7a8;
    --coral: #ff7a7a;
    --gold: #ffc857;
    --teal: #2dd4bf;
    --sky: #38bdf8;
    --orange: #fb923c;
    --violet: #a78bfa;
    --rose: #fb7185;
    --lime: #a3e635;

    --syn-key: #ff8aae;       /* keywords  (int, for, if) */
    --syn-num: #ffb454;       /* numbers   */
    --syn-str: #6ee7a8;       /* strings   */
    --syn-com: #5d6481;       /* comments  */
    --syn-fn:  #5cf2ff;       /* functions */
    --syn-id:  #e8ebf5;       /* identifiers */
  }

  body, .ja-root {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Bricolage Grotesque', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .ja-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
  .ja-display { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-variation-settings: 'opsz' 96; }

  .ja-grid-bg {
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: -1px -1px;
    background-color: var(--bg);
  }

  .ja-vignette::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 50% 30%, transparent 0%, rgba(10,12,18,0.85) 75%);
  }

  .ja-glow-cyan    { box-shadow: 0 0 0 1px rgba(92,242,255,0.35), 0 0 30px -8px rgba(92,242,255,0.55), inset 0 0 20px -10px rgba(92,242,255,0.4); }
  .ja-glow-magenta { box-shadow: 0 0 0 1px rgba(214,138,255,0.35), 0 0 30px -8px rgba(214,138,255,0.55), inset 0 0 20px -10px rgba(214,138,255,0.4); }
  .ja-glow-amber   { box-shadow: 0 0 0 1px rgba(255,180,84,0.35),  0 0 30px -8px rgba(255,180,84,0.55),  inset 0 0 20px -10px rgba(255,180,84,0.4); }
  .ja-glow-emerald { box-shadow: 0 0 0 1px rgba(110,231,168,0.35), 0 0 30px -8px rgba(110,231,168,0.55), inset 0 0 20px -10px rgba(110,231,168,0.4); }

  .ja-glow-coral   { box-shadow: 0 0 0 1px rgba(255,122,122,0.35), 0 0 30px -8px rgba(255,122,122,0.55), inset 0 0 20px -10px rgba(255,122,122,0.4); }

  .ja-glow-gold    { box-shadow: 0 0 0 1px rgba(255,200,87,0.35), 0 0 30px -8px rgba(255,200,87,0.55), inset 0 0 20px -10px rgba(255,200,87,0.4); }
  .ja-glow-teal    { box-shadow: 0 0 0 1px rgba(45,212,191,0.35), 0 0 30px -8px rgba(45,212,191,0.55), inset 0 0 20px -10px rgba(45,212,191,0.4); }
  .ja-glow-sky     { box-shadow: 0 0 0 1px rgba(56,189,248,0.35), 0 0 30px -8px rgba(56,189,248,0.55), inset 0 0 20px -10px rgba(56,189,248,0.4); }
  .ja-glow-orange  { box-shadow: 0 0 0 1px rgba(251,146,60,0.35), 0 0 30px -8px rgba(251,146,60,0.55), inset 0 0 20px -10px rgba(251,146,60,0.4); }
  .ja-glow-violet  { box-shadow: 0 0 0 1px rgba(167,139,250,0.35), 0 0 30px -8px rgba(167,139,250,0.55), inset 0 0 20px -10px rgba(167,139,250,0.4); }
  .ja-glow-rose    { box-shadow: 0 0 0 1px rgba(251,113,133,0.35), 0 0 30px -8px rgba(251,113,133,0.55), inset 0 0 20px -10px rgba(251,113,133,0.4); }
  .ja-glow-lime    { box-shadow: 0 0 0 1px rgba(163,230,53,0.35), 0 0 30px -8px rgba(163,230,53,0.55), inset 0 0 20px -10px rgba(163,230,53,0.4); }

  :root {
    --gold: #ffc857;
    --teal: #2dd4bf;
    --sky: #38bdf8;
    --orange: #fb923c;
    --violet: #a78bfa;
    --rose: #fb7185;
    --lime: #a3e635;
  }

  .ja-w-report { border-color: color-mix(in srgb, var(--gold) 30%, var(--line)); }
  .ja-w-concepts { border-color: color-mix(in srgb, var(--teal) 30%, var(--line)); }
  .ja-w-factors { border-color: color-mix(in srgb, var(--sky) 30%, var(--line)); }
  .ja-w-sole-partner { border-color: color-mix(in srgb, var(--orange) 30%, var(--line)); }
  .ja-w-companies { border-color: color-mix(in srgb, var(--violet) 30%, var(--line)); }
  .ja-w-public-sector { border-color: color-mix(in srgb, var(--rose) 30%, var(--line)); }
  .ja-w-compare { border-color: color-mix(in srgb, var(--lime) 30%, var(--line)); }
  .ja-w-ethics { border-color: color-mix(in srgb, var(--emerald) 30%, var(--line)); }
  .ja-w-citizenship { border-color: color-mix(in srgb, var(--cyan) 30%, var(--line)); }
  .ja-w-contracts { border-color: color-mix(in srgb, var(--coral) 30%, var(--line)); }
  .ja-w-self-mgmt { border-color: color-mix(in srgb, var(--magenta) 30%, var(--line)); }
  .ja-w-exam { border-color: color-mix(in srgb, var(--amber) 30%, var(--line)); }

  .ja-card {
    background: linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%);
    border: 1px solid var(--line);
    border-radius: 14px;
  }

  .ja-tile {
    transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  }
  .ja-tile:hover {
    transform: translateY(-2px);
  }

  /* code block — Java syntax highlighted via spans */
  .ja-code {
    background: #07090f;
    border: 1px solid var(--line);
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.65;
    padding: 14px 16px;
    overflow-x: auto;
    color: var(--ink);
    white-space: pre;
  }
  .ja-code .k  { color: var(--syn-key); }
  .ja-code .n  { color: var(--syn-num); }
  .ja-code .s  { color: var(--syn-str); }
  .ja-code .c  { color: var(--syn-com); font-style: italic; }
  .ja-code .f  { color: var(--syn-fn); }
  .ja-code .i  { color: var(--syn-id); }
  .ja-code .b  { color: var(--ink-dim); }
  .ja-code .blank {
    background: rgba(92,242,255,0.12);
    border: 1px dashed rgba(92,242,255,0.5);
    padding: 0 8px;
    border-radius: 4px;
    color: var(--cyan);
  }

  /* Option button */
  .ja-opt {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 12px 14px;
    text-align: left;
    transition: all .15s ease;
    cursor: pointer;
    width: 100%;
  }
  .ja-opt:hover {
    border-color: var(--line-2);
    background: var(--panel-2);
  }
  .ja-opt[data-state="selected"] {
    border-color: var(--cyan);
    background: rgba(92,242,255,0.08);
  }
  .ja-opt[data-state="correct"] {
    border-color: var(--emerald);
    background: rgba(110,231,168,0.10);
  }
  .ja-opt[data-state="wrong"] {
    border-color: var(--coral);
    background: rgba(255,122,122,0.08);
  }
  .ja-opt[data-state="locked"] {
    opacity: .55;
    cursor: default;
  }

  /* Subtle scanline for terminal feel — very low opacity, only on hero */
  .ja-scanline {
    position: relative;
  }
  .ja-scanline::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.015) 0px,
      rgba(255,255,255,0.015) 1px,
      transparent 1px,
      transparent 3px
    );
    pointer-events: none;
    border-radius: inherit;
  }

  /* Pulse used for streak/feedback flair */
  @keyframes ja-pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.06); }
  }
  .ja-pulse { animation: ja-pulse 1.4s ease-in-out infinite; }

  @keyframes ja-pop {
    0%   { transform: scale(.85); opacity: 0; }
    60%  { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .ja-pop { animation: ja-pop .35s ease-out; }

  @keyframes ja-shake {
    0%, 100% { transform: translateX(0); }
    25%      { transform: translateX(-4px); }
    75%      { transform: translateX(4px); }
  }
  .ja-shake { animation: ja-shake .3s ease-in-out; }

  /* World tile gradient backgrounds */
  .ja-w-variables  { background: radial-gradient(circle at 30% 20%, rgba(92,242,255,0.18), transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }
  .ja-w-strings    { background: radial-gradient(circle at 30% 20%, rgba(214,138,255,0.18), transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }
  .ja-w-loops      { background: radial-gradient(circle at 30% 20%, rgba(255,180,84,0.18),  transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }
  .ja-w-logic      { background: radial-gradient(circle at 30% 20%, rgba(110,231,168,0.18), transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }
  .ja-w-algorithms { background: radial-gradient(circle at 30% 20%, rgba(255,122,122,0.18), transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }
  .ja-w-objects    { background: radial-gradient(circle at 30% 20%, rgba(168,197,255,0.20), transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }

  /* Indigo glow for object world */
  .ja-glow-indigo { box-shadow: 0 0 0 1px rgba(168,197,255,0.35), 0 0 30px -8px rgba(168,197,255,0.55), inset 0 0 20px -10px rgba(168,197,255,0.4); }

  /* Lime glow and background for binary world */
  .ja-glow-lime { box-shadow: 0 0 0 1px rgba(190,242,100,0.35), 0 0 30px -8px rgba(190,242,100,0.55), inset 0 0 20px -10px rgba(190,242,100,0.4); }
  .ja-w-binary { background: radial-gradient(circle at 30% 20%, rgba(190,242,100,0.18), transparent 60%), linear-gradient(180deg, var(--panel), var(--panel-2)); }
  :root { --lime: #bef264; }

  /* Trace table inputs */
  .ja-trace-input {
    background: #07090f;
    border: 1px solid var(--line-2);
    color: var(--cyan);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 6px;
    width: 100px;
    text-align: center;
    outline: none;
  }
  .ja-trace-input:focus { border-color: var(--cyan); }
  .ja-trace-input[data-state="correct"] { border-color: var(--emerald); color: var(--emerald); background: rgba(110,231,168,0.08); }
  .ja-trace-input[data-state="wrong"]   { border-color: var(--coral); color: var(--coral); background: rgba(255,122,122,0.08); }

  /* Sortable item */
  .ja-sort-item {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 12px 14px;
    cursor: pointer;
    user-select: none;
    transition: all .12s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ja-sort-item:hover { border-color: var(--line-2); background: var(--panel-2); }
  .ja-sort-item[data-state="placed-correct"] { border-color: var(--emerald); background: rgba(110,231,168,0.08); }
  .ja-sort-item[data-state="placed-wrong"]   { border-color: var(--coral); background: rgba(255,122,122,0.08); }

  /* Progress bar */
  .ja-bar {
    height: 6px;
    background: var(--line);
    border-radius: 999px;
    overflow: hidden;
  }
  .ja-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--cyan), #a8c5ff);
    border-radius: 999px;
    transition: width .3s ease;
  }

  /* Star row */
  .ja-star { color: var(--line-2); }
  .ja-star.lit { color: var(--amber); filter: drop-shadow(0 0 6px rgba(255,180,84,0.6)); }

  /* Breathing glow for worldmap accent dots */
  @keyframes ja-breathe {
    0%, 100% { opacity: .6; }
    50%      { opacity: 1; }
  }
  .ja-breathe { animation: ja-breathe 2.5s ease-in-out infinite; }

  /* Do or Die: pulsing coral icon, ticker slide, screen pulse, spinner */
  @keyframes ja-pulse-coral {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.15); }
  }
  .ja-pulse-coral { animation: ja-pulse-coral 1.2s ease-in-out infinite; }

  @keyframes ja-ticker-slide {
    from { transform: translateX(40%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  .ja-ticker-slide { animation: ja-ticker-slide 0.6s ease-out; }

  @keyframes ja-screen-pulse {
    0%, 100% { box-shadow: inset 0 0 80px -10px rgba(255,122,122,0.05); }
    50%      { box-shadow: inset 0 0 120px -10px rgba(255,122,122,0.18); }
  }
  .ja-screen-pulse {
    position: relative;
    border-radius: 16px;
    animation: ja-screen-pulse 1.4s ease-in-out infinite;
  }

  @keyframes ja-spin {
    to { transform: rotate(360deg); }
  }
  .ja-spin { animation: ja-spin 1s linear infinite; }

  /* CodeMirror container fits the panel */
  .ja-code-editor {
    width: 100%;
  }
  .ja-code-editor .cm-editor {
    height: 100%;
  }

  /* Code-write textarea */
  .ja-code-input {
    width: 100%;
    background: #07090f;
    border: 1px solid var(--line-2);
    border-radius: 10px;
    color: var(--ink);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    padding: 14px 16px;
    outline: none;
    resize: vertical;
    min-height: 220px;
    tab-size: 4;
  }
  .ja-code-input:focus {
    border-color: var(--cyan);
  }
  .ja-code-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Spinner for API call */
  @keyframes ja-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .ja-spin { animation: ja-spin 1s linear infinite; }

  /* Review badge */
  .ja-review-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
  }
  .ja-review-badge.passes {
    background: rgba(110,231,168,0.12);
    color: var(--emerald);
    border: 1px solid rgba(110,231,168,0.4);
  }
  .ja-review-badge.fails {
    background: rgba(255,122,122,0.12);
    color: var(--coral);
    border: 1px solid rgba(255,122,122,0.4);
  }

  /* Coding challenge level indicator */
  .ja-coding-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    background: rgba(92,242,255,0.12);
    color: var(--cyan);
    border: 1px solid rgba(92,242,255,0.35);
  }
`;

/* =========================================================================
   SYNTAX HIGHLIGHTER (tiny, Java-flavoured)
   ========================================================================= */

const JAVA_KEYWORDS = new Set([
  'int','double','char','String','boolean','void','if','else','for','while',
  'do','return','public','static','class','new','true','false','null','final',
  'break','continue','Math','System'
]);

function highlightJava(code) {
  // Tokenise crudely — works for our short snippets, not a real parser.
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    const c = code[i];

    // Line comment
    if (c === '/' && code[i+1] === '/') {
      let j = i;
      while (j < code.length && code[j] !== '\n') j++;
      tokens.push({ t: 'c', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // Strings (double-quoted)
    if (c === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, code.length);
      tokens.push({ t: 's', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // Char literal (single-quoted)
    if (c === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, code.length);
      tokens.push({ t: 's', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) j++;
      tokens.push({ t: 'n', v: code.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (JAVA_KEYWORDS.has(word)) tokens.push({ t: 'k', v: word });
      else if (code[j] === '(') tokens.push({ t: 'f', v: word });
      else tokens.push({ t: 'i', v: word });
      i = j;
      continue;
    }

    // Blank token: ___ becomes a fill-in slot
    if (c === '_' && code.slice(i, i+3) === '___') {
      let j = i;
      while (j < code.length && code[j] === '_') j++;
      tokens.push({ t: 'blank', v: '____' });
      i = j;
      continue;
    }

    // Punctuation / whitespace
    tokens.push({ t: 'b', v: c });
    i++;
  }
  return tokens;
}

function CodeBlock({ code, className = '' }) {
  const tokens = useMemo(() => highlightJava(code), [code]);
  return (
    <pre className={`ja-code ${className}`}>
      {tokens.map((tok, idx) => (
        <span key={idx} className={tok.t}>{tok.v}</span>
      ))}
    </pre>
  );
}

/* =========================================================================
   WORLDS + CHALLENGE CONTENT
   ========================================================================= */

/* =========================================================================
   SUBJECT DATA — worlds, levels, challenges per subject
   ========================================================================= */

function subjectMod(subjectId) {
  return getSubjectModule(subjectId || 'java');
}

function getWorlds(subjectId) {
  return subjectMod(subjectId).WORLDS;
}

function getLevels(subjectId) {
  return subjectMod(subjectId).LEVELS;
}

function getChallenges(subjectId) {
  return subjectMod(subjectId).CHALLENGES;
}

function unitIdForWorld(worldId, subjectId) {
  return subjectMod(subjectId).unitIdForWorld(worldId);
}

function unitToWorld(unitId, subjectId) {
  return subjectMod(subjectId).unitToWorld(unitId);
}

function getScenariosForUnit(unitId, subjectId) {
  return subjectMod(subjectId).getScenariosForUnit(unitId);
}

function getTheoryUnitForSubject(unitId, subjectId) {
  return subjectMod(subjectId).getTheoryUnit(unitId);
}

function getScenarios(subjectId) {
  return subjectMod(subjectId).SCENARIOS;
}

function unitIdForCurrentRun(challengeIds, subjectId) {
  const CHALLENGES = getChallenges(subjectId);
  if (!challengeIds || challengeIds.length === 0) return null;
  const first = CHALLENGES[challengeIds[0]];
  if (!first) return null;
  return unitIdForWorld(first.world, subjectId);
}

function migrateSkillIdsForSubject(skills, subjectId) {
  return subjectMod(subjectId).migrateSkillIds(skills || []);
}

function scoreStars(correct, attempted) {
  if (attempted === 0) return 0;
  const acc = correct / attempted;
  if (acc >= 0.95) return 3;
  if (acc >= 0.75) return 2;
  if (acc >= 0.5) return 1;
  return 0;
}

/* =========================================================================
   COMPONENTS
   ========================================================================= */

function Stars({ count, size = 16 }) {
  return (
    <div className="inline-flex gap-1">
      {[0,1,2].map(i => (
        <Star key={i} size={size} fill="currentColor" className={`ja-star ${i < count ? 'lit' : ''}`} />
      ))}
    </div>
  );
}

function Hud({ subject, state, user, onHome, onPractice, onProgress, onReset, onSignOut, onSwitchSubject }) {
  return (
    <div className="ja-card flex items-center justify-between px-4 py-3 mb-6 gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onHome} className="flex items-center gap-2 hover:opacity-90">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: subject === 'business' ? 'linear-gradient(135deg,#ffc857,#2dd4bf)' : 'linear-gradient(135deg,#5cf2ff,#a8c5ff)', color:'#0a0c12'}}>
            {subject === 'business' ? <Briefcase size={20} strokeWidth={2.5}/> : <Code2 size={20} strokeWidth={2.5}/>}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm leading-tight ja-display" style={{fontWeight:700, letterSpacing:'-0.01em'}}>{getSubject(subject).title}</div>
            <div className="text-xs ja-mono truncate" style={{color:'var(--ink-mute)'}}>
              {user ? `// ${user.name}` : '// learn by doing'}
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Stat icon={<Zap size={14}/>}    label="XP"     value={state.xp}      color="cyan"/>
        <Stat icon={<Flame size={14}/>}  label="Streak" value={state.streak}  color="amber"/>
        <Stat icon={<Trophy size={14}/>} label="Best"   value={state.bestStreak} color="emerald" hideOnMobile/>
        <button
          onClick={onProgress}
          className="ja-mono text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
          style={{border:'1px solid var(--line-2)', color:'var(--ink)'}}
          title="View your mastery progress"
        >
          <TrendingUp size={14}/> <span className="hidden sm:inline">Progress</span>
        </button>
        <button
          onClick={onPractice}
          className="ja-mono text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
          style={{border:'1px solid var(--line-2)', color:'var(--ink)'}}
          title="Practice your weakest skills"
        >
          <Target size={14}/> <span className="hidden sm:inline">Practice</span>
        </button>
        <button
          onClick={onReset}
          className="ja-mono text-xs px-2 py-2 rounded-lg"
          style={{border:'1px solid var(--line)', color:'var(--ink-mute)'}}
          title="Reset all progress"
        >
          <RotateCcw size={14}/>
        </button>
        {user && onSignOut && (
          <button
            onClick={onSignOut}
            className="ja-mono text-xs px-2 py-2 rounded-lg"
            style={{border:'1px solid var(--line)', color:'var(--ink-mute)'}}
            title={`Sign out ${user.email}`}
          >
            <LogOut size={14}/>
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value, color, hideOnMobile }) {
  const colorMap = { cyan:'var(--cyan)', amber:'var(--amber)', emerald:'var(--emerald)' };
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${hideOnMobile ? 'hidden sm:flex' : ''}`}
         style={{background:'var(--bg-2)', border:'1px solid var(--line)'}}>
      <span style={{color: colorMap[color]}}>{icon}</span>
      <span className="ja-mono text-xs" style={{color:'var(--ink-mute)'}}>{label}</span>
      <span className="ja-mono text-sm" style={{color:'var(--ink)', fontWeight:700}}>{value}</span>
    </div>
  );
}

/* ---------- HOME / WORLD MAP ---------- */

function WorldMap({ subject, state, onPickWorld, onPracticalTest, onSwitchSubject }) {
  return (
    <div>
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-between mb-2">
        <div className="ja-mono text-xs" style={{color:'var(--ink-mute)'}}>// world_map.{subject}</div>
        <button onClick={onSwitchSubject} className="ja-mono text-xs px-2 py-1 rounded" style={{border:'1px solid var(--line)', color:'var(--ink-mute)'}}>switch subject</button>
      </div>
        <h1 className="ja-display text-4xl sm:text-5xl mb-2" style={{fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.05}}>
          {getSubject(subject).title === 'Java Adventure' ? (
            <>Pick a world.<br/><span style={{color:'var(--ink-dim)'}}>Then make Java make sense.</span></>
          ) : (
            <>Pick a world.<br/><span style={{color:'var(--ink-dim)'}}>Ownership, ethics, and report writing.</span></>
          )}
        </h1>
        <p className="text-base mt-3 max-w-xl" style={{color:'var(--ink-dim)'}}>
          Each world covers a unit from class. Levels get harder as you go. Three stars per level if you nail it.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {getWorlds(subject).map(world => {
          const Icon = world.icon;
          const levels = getLevels(subject)[world.id];
          const totalLevels = levels.length;
          const completedLevels = levels.filter(l => state.levelProgress[l.id]?.stars >= 1).length;
          const totalStars = levels.reduce((s,l) => s + (state.levelProgress[l.id]?.stars || 0), 0);
          const maxStars = totalLevels * 3;

          return (
            <button
              key={world.id}
              onClick={() => onPickWorld(world.id)}
              className={`ja-tile ja-card text-left p-6 ${world.bg} ja-scanline relative overflow-hidden`}
              style={{minHeight: 200}}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${world.glow}`}
                     style={{background:'rgba(0,0,0,0.3)', color:`var(--${world.color})`}}>
                  <Icon size={22} strokeWidth={2}/>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="ja-mono text-xs" style={{color:`var(--${world.color})`}}>
                    {completedLevels}/{totalLevels} levels
                  </div>
                  <div className="ja-mono text-xs" style={{color:'var(--ink-mute)'}}>
                    ★ {totalStars}/{maxStars}
                  </div>
                </div>
              </div>

              <div className="ja-display text-2xl mb-1" style={{fontWeight:700, letterSpacing:'-0.02em'}}>
                {world.name}
              </div>
              <div className="ja-mono text-xs mb-3" style={{color:`var(--${world.color})`, opacity: 0.85}}>
                {world.subtitle}
              </div>
              <p className="text-sm" style={{color:'var(--ink-dim)', lineHeight:1.55}}>
                {world.blurb}
              </p>

              <div className="mt-4 ja-bar">
                <div className="ja-bar-fill"
                     style={{
                       width: `${(totalStars / maxStars) * 100}%`,
                       background: `linear-gradient(90deg, var(--${world.color}), var(--ink))`
                     }}/>
              </div>
            </button>
          );
        })}
      </div>

      {/* Practical Test card */}
      <button
        onClick={onPracticalTest}
        className="ja-tile ja-card w-full text-left p-6 mt-4 relative overflow-hidden ja-glow-magenta"
        style={{ background: 'linear-gradient(135deg, rgba(214,138,255,0.08), rgba(92,242,255,0.04))' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{background:'rgba(214,138,255,0.16)', color:'var(--magenta)'}}>
              <FileCode size={22} strokeWidth={2}/>
            </div>
            <div>
              <div className="ja-display text-2xl mb-1" style={{fontWeight:700, letterSpacing:'-0.02em'}}>
                {getSubject(subject).practicalTestLabel}
              </div>
              <div className="ja-mono text-xs mb-2" style={{color: subject === 'business' ? 'var(--gold)' : 'var(--magenta)', opacity: 0.85}}>
                {subject === 'business' ? 'AI-marked business report exam' : 'AI-generated coding exam'}
              </div>
              <p className="text-sm" style={{color:'var(--ink-dim)', lineHeight:1.55}}>
                {subject === 'business'
                  ? 'Full business report practice test. Scenario, structured writing, instant AI marking against IEB criteria.'
                  : 'A full practical coding test -- just like the real thing. Pick your units, get a unique test paper, write your code, and get marked instantly.'}
              </p>
            </div>
          </div>
          <div className="ja-mono text-xs px-2 py-1 rounded flex-shrink-0"
            style={{background:'rgba(214,138,255,0.12)', color:'var(--magenta)'}}>
            NEW
          </div>
        </div>
      </button>

      {state.sessionsPlayed > 0 && (
        <SkillSummary state={state}/>
      )}
    </div>
  );
}

function SkillSummary({ state }) {
  const skills = Object.entries(state.skillStats || {});
  if (skills.length === 0) return null;
  const sorted = skills
    .map(([k, v]) => ({ k, ...v, total: v.correct + v.wrong, acc: (v.correct + v.wrong > 0 ? v.correct / (v.correct + v.wrong) : 0) }))
    .sort((a, b) => b.total - a.total);
  const strong = sorted.filter(s => s.acc >= 0.75).slice(0, 3);
  const weak = sorted.filter(s => s.acc < 0.6).slice(0, 3);

  return (
    <div className="ja-card mt-8 p-5">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={16} style={{color:'var(--cyan)'}}/>
        <div className="ja-display text-lg" style={{fontWeight:700}}>Your skill map</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="ja-mono text-xs mb-2" style={{color:'var(--emerald)'}}>STRONG</div>
          {strong.length === 0 && <div className="text-sm" style={{color:'var(--ink-mute)'}}>Keep playing to surface your strong skills.</div>}
          {strong.map(s => (
            <div key={s.k} className="flex items-center justify-between py-1 ja-mono text-sm" style={{color:'var(--ink-dim)'}}>
              <span>{prettySkill(s.k)}</span>
              <span style={{color:'var(--emerald)'}}>{Math.round(s.acc*100)}%</span>
            </div>
          ))}
        </div>
        <div>
          <div className="ja-mono text-xs mb-2" style={{color:'var(--coral)'}}>NEEDS WORK</div>
          {weak.length === 0 && <div className="text-sm" style={{color:'var(--ink-mute)'}}>Nothing flagged. Nice.</div>}
          {weak.map(s => (
            <div key={s.k} className="flex items-center justify-between py-1 ja-mono text-sm" style={{color:'var(--ink-dim)'}}>
              <span>{prettySkill(s.k)}</span>
              <span style={{color:'var(--coral)'}}>{Math.round(s.acc*100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function prettySkill(s) {
  return s.replace(/-/g, ' ');
}

/* ---------- LEVEL VIEW ---------- */

function LevelView({ subject, worldId, state, onBack, onPickLevel, onPickScenario, onPickTheory }) {
  const world = getWorlds(subject).find(w => w.id === worldId);
  const levels = getLevels(subject)[worldId];
  const Icon = world.icon;
  const unitId = unitIdForWorld(worldId, subject);
  const scenarios = unitId ? getScenariosForUnit(unitId, subject) : [];
  const hasTheory = unitId ? !!getTheoryUnitForSubject(unitId, subject) : false;
  const bestByScenario = {};
  for (const r of (state.doOrDieHistory || [])) {
    const cur = bestByScenario[r.scenarioId];
    if (!cur || r.score > cur.score) bestByScenario[r.scenarioId] = r;
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 ja-mono text-sm mb-5 hover:opacity-80"
              style={{color:'var(--ink-mute)'}}>
        <ChevronLeft size={16}/> back to world map
      </button>

      <div className="flex items-start gap-4 mb-7">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${world.glow}`}
             style={{background:'rgba(0,0,0,0.3)', color:`var(--${world.color})`}}>
          <Icon size={26} strokeWidth={2}/>
        </div>
        <div>
          <h1 className="ja-display text-3xl sm:text-4xl mb-1" style={{fontWeight:800, letterSpacing:'-0.02em'}}>{world.name}</h1>
          <div className="ja-mono text-sm" style={{color:`var(--${world.color})`}}>{world.subtitle}</div>
        </div>
      </div>

      {hasTheory && (
        <div className="mb-6">
          <button
            onClick={() => onPickTheory && onPickTheory(unitId)}
            className="ja-tile ja-card p-4 w-full text-left flex items-center justify-between gap-3"
            style={{ background: `linear-gradient(180deg, rgba(var(--${world.color}-rgb, 92,242,255), 0.06), var(--panel-2))` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(var(--${world.color}-rgb, 92,242,255), 0.16)`, color: `var(--${world.color})` }}>
                <BookOpen size={16} />
              </div>
              <div>
                <div className="ja-display text-base" style={{ fontWeight: 700 }}>Theory Mode</div>
                <div className="ja-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
                  Learn the concepts, then test yourself
                </div>
              </div>
            </div>
            <ArrowRight size={16} style={{ color: `var(--${world.color})`, flexShrink: 0 }} />
          </button>
        </div>
      )}

      {scenarios.length > 0 && (
        <div className="mb-6">
          <div className="ja-mono text-xs mb-3 flex items-center gap-2" style={{ color: 'var(--coral)', letterSpacing: '0.08em' }}>
            <Skull size={12} /> DO OR DIE - timed missions
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {scenarios.map((sc) => {
              const best = bestByScenario[sc.id];
              return (
                <button
                  key={sc.id}
                  onClick={() => onPickScenario && onPickScenario(sc.id)}
                  className="ja-tile ja-card p-4 text-left flex items-center justify-between gap-3"
                  style={{ background: 'linear-gradient(180deg, rgba(255,122,122,0.05), var(--panel-2))' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ background: 'rgba(255,122,122,0.16)', color: 'var(--coral)' }}>
                      <Skull size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="ja-display text-base" style={{ fontWeight: 700 }}>{sc.title}</div>
                      <div className="ja-mono text-xs truncate" style={{ color: 'var(--ink-mute)' }}>
                        {sc.summary}
                      </div>
                    </div>
                  </div>
                  {best ? (
                    <div className="ja-display text-2xl flex-shrink-0" style={{ fontWeight: 800, color: 'var(--amber)' }}>
                      {best.grade}
                    </div>
                  ) : (
                    <Timer size={16} style={{ color: 'var(--ink-mute)', flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {levels.map((level, idx) => {
          const progress = state.levelProgress[level.id];
          const stars = progress?.stars || 0;
          const numChallenges = level.challengeIds.length;
          const previousLocked = idx > 0 && !state.levelProgress[levels[idx-1].id];
          const locked = previousLocked && stars === 0;

          return (
            <button
              key={level.id}
              onClick={() => !locked && onPickLevel(level.id)}
              disabled={locked}
              className="ja-tile ja-card w-full p-5 text-left flex items-center justify-between gap-4"
              style={{opacity: locked ? 0.4 : 1, cursor: locked ? 'not-allowed' : 'pointer'}}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center ja-mono"
                     style={{background:'var(--bg-2)', border:'1px solid var(--line)', color:`var(--${world.color})`, fontWeight:700}}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="ja-display text-lg" style={{fontWeight:700}}>{level.name}</div>
                    {level.hasCoding && (
                      <span className="ja-coding-pill">
                        <FileCode size={10}/> CODING
                      </span>
                    )}
                    {locked && <Lock size={13} style={{color:'var(--ink-mute)'}}/>}
                  </div>
                  <div className="ja-mono text-xs mt-0.5" style={{color:'var(--ink-mute)'}}>
                    {level.subtitle} · {numChallenges} challenges
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Stars count={stars}/>
                <ChevronRight size={18} style={{color:'var(--ink-mute)'}}/>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CHALLENGE RUNNER ---------- */

function ChallengeRunner({ subject, levelId, challengeIds, onExit, onComplete, dispatch, mode = 'level' }) {
  const [idx, setIdx] = useState(0);
  /*
   * Each result captures everything needed to persist the attempt server-side:
   * id, correctness, hint usage, challenge type, and skill ids.
   */
  const [results, setResults] = useState([]);

  const CHALLENGES = getChallenges(subject);
  const current = CHALLENGES[challengeIds[idx]];
  const total = challengeIds.length;
  const progress = ((idx) / total) * 100;

  function handleAnswer({ correct, hintUsed }) {
    const cid = challengeIds[idx];
    dispatch({
      type: 'answer',
      challengeId: cid,
      correct,
      skills: current.skills,
      hintUsed,
      challengeType: current.type,
      subject,
    });
    setResults((prev) => [
      ...prev,
      {
        id: cid,
        correct,
        hintUsed,
        challengeType: current.type,
        skills: migrateSkillIdsForSubject(current.skills || [], subject),
      },
    ]);
  }

  function handleNext() {
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      const correctCount = results.filter((r) => r.correct).length;
      const unitId = unitIdForCurrentRun(challengeIds, subject);
      if (mode === 'level' && levelId) {
        dispatch({
          type: 'completeLevel',
          levelId,
          attempted: total,
          correct: correctCount,
          unitId,
          subject,
        });
      } else if (mode === 'practice') {
        dispatch({
          type: 'completePractice',
          subject,
          attempted: total,
          correct: correctCount,
        });
      }
      onComplete({ correctCount, total, results, unitId });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onExit} className="flex items-center gap-1.5 ja-mono text-sm hover:opacity-80"
                style={{color:'var(--ink-mute)'}}>
          <ChevronLeft size={16}/> exit
        </button>
        <div className="ja-mono text-xs" style={{color:'var(--ink-mute)'}}>
          {idx + 1} / {total}
        </div>
      </div>

      <div className="ja-bar mb-6">
        <div className="ja-bar-fill" style={{width: `${progress}%`}}/>
      </div>

      <ChallengeCard key={challengeIds[idx]} challenge={current} onAnswer={handleAnswer} onNext={handleNext} isLast={idx === total - 1}/>
    </div>
  );
}

/* ---------- INDIVIDUAL CHALLENGE CARD ---------- */

function ChallengeCard({ challenge, onAnswer, onNext, isLast, hideNext }) {
  const [phase, setPhase] = useState('answering'); // answering | feedback
  const [correct, setCorrect] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function submit(wasCorrect) {
    setCorrect(wasCorrect);
    setPhase('feedback');
    onAnswer({ correct: wasCorrect, hintUsed });
  }

  function showHintHandler() {
    setHintUsed(true);
    setShowHint(true);
  }

  return (
    <div className="ja-card p-5 sm:p-7 ja-pop">
      <div className="flex items-center gap-2 mb-4">
        <div className="ja-mono text-xs px-2 py-1 rounded" style={{background:'var(--bg-2)', color:'var(--ink-mute)'}}>
          {labelForType(challenge.type)}
        </div>
        {challenge.skills?.slice(0, 2).map(sk => (
          <div key={sk} className="ja-mono text-xs px-2 py-1 rounded hidden sm:block"
               style={{background:'var(--bg-2)', color:'var(--ink-mute)'}}>
            {prettySkill(sk)}
          </div>
        ))}
      </div>

      <div className="ja-display text-xl sm:text-2xl mb-4" style={{fontWeight:700, lineHeight:1.3}}>
        {challenge.prompt}
      </div>

      {challenge.code && (
        <div className="mb-5">
          <CodeBlock code={challenge.code}/>
        </div>
      )}

      {phase === 'answering' && (
        <>
          {(challenge.type === 'mc' || challenge.type === 'code-read' || challenge.type === 'error-spot')
                                       && <MCAnswers     challenge={challenge} onSubmit={submit}/>}
          {challenge.type === 'tf'    && <TFAnswers     challenge={challenge} onSubmit={submit}/>}
          {challenge.type === 'order' && <OrderAnswers  challenge={challenge} onSubmit={submit}/>}
          {challenge.type === 'match' && <MatchAnswers challenge={challenge} onSubmit={submit}/>}
          {challenge.type === 'trace' && <TraceAnswers  challenge={challenge} onSubmit={submit}/>}
          {challenge.type === 'code-write' && <CodeWriteAnswers challenge={challenge} onSubmit={submit}/>}

          {/* Hint — not shown for code-write since it's already wide-open */}
          {challenge.type !== 'code-write' && (
            <div className="mt-5 flex items-center justify-end">
              {!showHint ? (
                <button onClick={showHintHandler}
                        className="ja-mono text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:opacity-80"
                        style={{border:'1px solid var(--line)', color:'var(--ink-mute)'}}>
                  <Lightbulb size={13}/> hint (-5 XP)
                </button>
              ) : (
                <div className="ja-card px-4 py-3 flex items-start gap-2 w-full"
                     style={{background:'rgba(255,180,84,0.06)', borderColor:'rgba(255,180,84,0.3)'}}>
                  <Lightbulb size={15} className="flex-shrink-0 mt-0.5" style={{color:'var(--amber)'}}/>
                  <div className="text-sm" style={{color:'var(--ink-dim)'}}>{challenge.hint}</div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {phase === 'feedback' && (
        <FeedbackPanel correct={correct} explanation={challenge.explanation} onNext={onNext} isLast={isLast} hideNext={hideNext}/>
      )}
    </div>
  );
}

function labelForType(t) {
  return ({
    mc:           'multiple choice',
    tf:           'true / false',
    order:        'order the steps',
    match:        'match the pairs',
    trace:        'trace the values',
    'code-read':  'read the code',
    'error-spot': 'spot the error',
    'code-write': 'coding challenge'
  })[t] || t;
}

/* ---------- ANSWER COMPONENTS ---------- */

async function reviewCode({ problem, criteria, code }) {
  const response = await fetch('/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem, criteria, code }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `API returned ${response.status}`);
  }

  return response.json();
}

function CodeWriteAnswers({ challenge, onSubmit }) {
  const [code, setCode] = useState(challenge.starter || '');
  const [phase, setPhase] = useState('writing'); // writing | reviewing | reviewed | error
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (code.trim().length < 20) {
      setError('Looks a bit short. Paste your code from NetBeans and try again.');
      return;
    }
    setError(null);
    setPhase('reviewing');
    try {
      const result = await reviewCode({
        problem: challenge.prompt,
        criteria: challenge.criteria || 'Solve the stated problem.',
        code
      });
      setReview(result);
      setPhase('reviewed');
    } catch (e) {
      setError(`Couldn't reach the reviewer just now. (${e.message || 'unknown error'}) Your code is still saved — try again in a moment.`);
      setPhase('error');
    }
  }

  function handleContinue() {
    onSubmit(review?.passes === true);
  }

  function handleRetry() {
    setPhase('writing');
    setError(null);
  }

  return (
    <div>
      <div className="ja-card p-4 mb-4" style={{background:'var(--bg-2)'}}>
        <div className="ja-mono text-xs mb-2 flex items-center gap-2" style={{color:'var(--cyan)'}}>
          <FileCode size={13}/> what your program needs to do:
        </div>
        <div className="text-sm" style={{color:'var(--ink-dim)', lineHeight:1.6}}>
          {challenge.criteria}
        </div>
      </div>

      <div className="ja-mono text-xs mb-2 flex items-center gap-2" style={{color:'var(--ink-mute)'}}>
        <Pencil size={12}/> write your code in NetBeans, then paste it here:
      </div>
      <CodeEditor
        value={code}
        onChange={setCode}
        readOnly={phase === 'reviewing' || phase === 'reviewed'}
        minHeight="260px"
        placeholder="// paste your code here"
      />

      {error && (
        <div className="ja-card mt-3 p-3 flex items-start gap-2"
             style={{background:'rgba(255,122,122,0.08)', borderColor:'rgba(255,122,122,0.4)'}}>
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{color:'var(--coral)'}}/>
          <div className="text-sm" style={{color:'var(--ink-dim)'}}>{error}</div>
        </div>
      )}

      {phase === 'writing' && (
        <div className="mt-4 flex justify-between items-center gap-3 flex-wrap">
          <div className="ja-mono text-xs" style={{color:'var(--ink-mute)'}}>
            Claude will review your code and give feedback.
          </div>
          <button
            onClick={handleSubmit}
            disabled={code.trim().length < 5}
            className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
            style={{
              background: code.trim().length >= 5 ? 'var(--cyan)' : 'var(--line)',
              color: code.trim().length >= 5 ? '#0a0c12' : 'var(--ink-mute)',
              fontWeight: 700,
              cursor: code.trim().length >= 5 ? 'pointer' : 'not-allowed'
            }}
          >
            <Send size={14}/> submit for review
          </button>
        </div>
      )}

      {phase === 'reviewing' && (
        <div className="ja-card mt-4 p-5 flex items-center gap-3"
             style={{background:'rgba(92,242,255,0.05)', borderColor:'rgba(92,242,255,0.3)'}}>
          <Loader2 size={18} className="ja-spin" style={{color:'var(--cyan)'}}/>
          <div className="text-sm" style={{color:'var(--ink-dim)'}}>
            Claude is reading your code carefully…
          </div>
        </div>
      )}

      {phase === 'error' && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRetry}
            className="ja-mono text-sm px-4 py-2 rounded-lg"
            style={{border:'1px solid var(--line-2)', color:'var(--ink)'}}
          >
            try again
          </button>
        </div>
      )}

      {phase === 'reviewed' && review && (
        <CodeReview review={review} onContinue={handleContinue} onRevise={() => { setPhase('writing'); setReview(null); }}/>
      )}
    </div>
  );
}

function CodeReview({ review, onContinue, onRevise }) {
  return (
    <div className="ja-card mt-4 p-5 ja-pop"
         style={{
           background: review.passes ? 'rgba(110,231,168,0.06)' : 'rgba(255,180,84,0.06)',
           borderColor: review.passes ? 'rgba(110,231,168,0.4)' : 'rgba(255,180,84,0.4)'
         }}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`ja-review-badge ${review.passes ? 'passes' : 'fails'}`}>
            {review.passes ? <><Check size={12}/> PASSES</> : <><AlertCircle size={12}/> NEEDS REVISION</>}
          </span>
          <span className="ja-mono text-xs" style={{color:'var(--ink-mute)'}}>
            score: {review.score}/10
          </span>
        </div>
      </div>

      {review.verdict && (
        <div className="ja-display text-base mb-4" style={{fontWeight:700, color:'var(--ink)'}}>
          {review.verdict}
        </div>
      )}

      {review.strengths && review.strengths.length > 0 && (
        <div className="mb-3">
          <div className="ja-mono text-xs mb-1.5" style={{color:'var(--emerald)'}}>WHAT'S GOOD</div>
          {review.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm mb-1" style={{color:'var(--ink-dim)'}}>
              <Check size={14} className="flex-shrink-0 mt-0.5" style={{color:'var(--emerald)'}}/>
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}

      {review.improvements && review.improvements.length > 0 && (
        <div className="mb-3">
          <div className="ja-mono text-xs mb-1.5" style={{color:'var(--amber)'}}>TO IMPROVE</div>
          {review.improvements.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm mb-1" style={{color:'var(--ink-dim)'}}>
              <ArrowRight size={14} className="flex-shrink-0 mt-0.5" style={{color:'var(--amber)'}}/>
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}

      {review.nextStep && (
        <div className="ja-card p-3 mb-4" style={{background:'var(--bg-2)'}}>
          <div className="text-sm italic" style={{color:'var(--ink-dim)'}}>
            {review.nextStep}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 flex-wrap">
        {!review.passes && (
          <button
            onClick={onRevise}
            className="ja-mono text-sm px-4 py-2 rounded-lg"
            style={{border:'1px solid var(--line-2)', color:'var(--ink)'}}
          >
            revise & resubmit
          </button>
        )}
        <button
          onClick={onContinue}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{background: review.passes ? 'var(--emerald)' : 'var(--ink)', color:'#0a0c12', fontWeight:700}}
        >
          continue <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

function MCAnswers({ challenge, onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function getState(idx) {
    if (!submitted) return idx === selected ? 'selected' : '';
    if (idx === challenge.answer) return 'correct';
    if (idx === selected && idx !== challenge.answer) return 'wrong';
    return 'locked';
  }

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => onSubmit(selected === challenge.answer), 350);
  }

  return (
    <div>
      <div className="grid gap-2.5">
        {challenge.options.map((opt, idx) => (
          <button
            key={idx}
            disabled={submitted}
            onClick={() => setSelected(idx)}
            data-state={getState(idx)}
            className="ja-opt"
          >
            <div className="flex items-center gap-3">
              <div className="ja-mono text-xs w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                   style={{background:'var(--bg-2)', color:'var(--ink-dim)'}}>
                {String.fromCharCode(65 + idx)}
              </div>
              <div className="ja-mono text-sm" style={{color:'var(--ink)'}}>{opt}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selected === null || submitted}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: selected !== null && !submitted ? 'var(--cyan)' : 'var(--line)',
            color: selected !== null && !submitted ? '#0a0c12' : 'var(--ink-mute)',
            fontWeight: 700,
            cursor: selected !== null && !submitted ? 'pointer' : 'not-allowed'
          }}
        >
          submit <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

function TFAnswers({ challenge, onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function getState(value) {
    if (!submitted) return value === selected ? 'selected' : '';
    if (value === challenge.answer) return 'correct';
    if (value === selected && value !== challenge.answer) return 'wrong';
    return 'locked';
  }

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => onSubmit(selected === challenge.answer), 350);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        {[true, false].map(value => (
          <button
            key={String(value)}
            disabled={submitted}
            onClick={() => setSelected(value)}
            data-state={getState(value)}
            className="ja-opt text-center"
            style={{padding:'18px'}}
          >
            <div className="ja-display text-xl" style={{fontWeight:700}}>{value ? 'TRUE' : 'FALSE'}</div>
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selected === null || submitted}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: selected !== null && !submitted ? 'var(--cyan)' : 'var(--line)',
            color: selected !== null && !submitted ? '#0a0c12' : 'var(--ink-mute)',
            fontWeight: 700,
            cursor: selected !== null && !submitted ? 'pointer' : 'not-allowed'
          }}
        >
          submit <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

function OrderAnswers({ challenge, onSubmit }) {
  // User clicks items from a "shuffled" pool; they appear in order in the slot list.
  // We shuffle on mount so it isn't trivially in order.
  const [pool, setPool] = useState(() => {
    const indices = challenge.items.map((_, i) => i);
    // simple shuffle that won't return identity for short lists
    for (let attempts = 0; attempts < 10; attempts++) {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      if (indices.some((v, i) => v !== i)) break;
    }
    return indices;
  });
  const [placed, setPlaced] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function pick(idx) {
    if (submitted) return;
    setPool(p => p.filter(x => x !== idx));
    setPlaced(p => [...p, idx]);
  }

  function unpick(slotIdx) {
    if (submitted) return;
    const idx = placed[slotIdx];
    setPlaced(p => p.filter((_, i) => i !== slotIdx));
    setPool(p => [...p, idx]);
  }

  function handleSubmit() {
    setSubmitted(true);
    const correct = placed.length === challenge.answer.length &&
                    placed.every((v, i) => v === challenge.answer[i]);
    setTimeout(() => onSubmit(correct), 400);
  }

  function slotState(slotIdx) {
    if (!submitted) return '';
    return placed[slotIdx] === challenge.answer[slotIdx] ? 'placed-correct' : 'placed-wrong';
  }

  return (
    <div>
      <div className="ja-mono text-xs mb-2" style={{color:'var(--ink-mute)'}}>// in order:</div>
      <div className="space-y-2 mb-5">
        {placed.map((idx, slotIdx) => (
          <div key={slotIdx} className="ja-sort-item" data-state={slotState(slotIdx)} onClick={() => unpick(slotIdx)}>
            <div className="ja-mono text-xs w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                 style={{background:'var(--bg-2)', color:'var(--cyan)', fontWeight:700}}>
              {slotIdx + 1}
            </div>
            <div className="text-sm" style={{color:'var(--ink)'}}>{challenge.items[idx]}</div>
          </div>
        ))}
        {Array.from({length: challenge.answer.length - placed.length}).map((_, i) => (
          <div key={`empty-${i}`} className="ja-sort-item" style={{borderStyle:'dashed', cursor:'default', opacity:0.5}}>
            <div className="ja-mono text-xs w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                 style={{background:'var(--bg-2)', color:'var(--ink-mute)'}}>
              {placed.length + i + 1}
            </div>
            <div className="text-sm" style={{color:'var(--ink-mute)'}}>(pick from below)</div>
          </div>
        ))}
      </div>

      {pool.length > 0 && !submitted && (
        <>
          <div className="ja-mono text-xs mb-2" style={{color:'var(--ink-mute)'}}>// click to add:</div>
          <div className="space-y-2">
            {pool.map(idx => (
              <div key={idx} className="ja-sort-item" onClick={() => pick(idx)}>
                <div className="text-sm" style={{color:'var(--ink-dim)'}}>{challenge.items[idx]}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={pool.length > 0 || submitted}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: pool.length === 0 && !submitted ? 'var(--cyan)' : 'var(--line)',
            color: pool.length === 0 && !submitted ? '#0a0c12' : 'var(--ink-mute)',
            fontWeight: 700,
            cursor: pool.length === 0 && !submitted ? 'pointer' : 'not-allowed'
          }}
        >
          submit <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

function MatchAnswers({ challenge, onSubmit }) {
  const pairs = challenge.pairs || [];
  const [selections, setSelections] = useState(() => pairs.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const rightOptions = useMemo(() => {
    const rights = pairs.map((p) => p.right);
    return rights;
  }, [pairs]);

  function pick(slotIdx, rightText) {
    if (submitted) return;
    setSelections((prev) => {
      const next = [...prev];
      next[slotIdx] = rightText;
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    const correct = pairs.every((p, i) => selections[i] === p.right);
    setTimeout(() => onSubmit(correct), 400);
  }

  const allFilled = selections.every((s) => s !== null);

  return (
    <div className="space-y-4">
      {pairs.map((pair, i) => (
        <div key={i} className="ja-card p-4" style={{ background: 'var(--bg-2)' }}>
          <div className="text-sm mb-3" style={{ color: 'var(--ink)', fontWeight: 600 }}>{pair.left}</div>
          <div className="grid gap-2">
            {rightOptions.map((opt) => {
              const picked = selections[i] === opt;
              let state = '';
              if (submitted) {
                state = opt === pair.right ? 'correct' : picked ? 'wrong' : '';
              }
              return (
                <button
                  key={opt}
                  onClick={() => pick(i, opt)}
                  disabled={submitted}
                  className="ja-mc-opt text-left text-sm"
                  data-state={picked ? (submitted ? (opt === pair.right ? 'correct' : 'wrong') : 'selected') : state}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!allFilled || submitted}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg"
          style={{
            background: allFilled && !submitted ? 'var(--cyan)' : 'var(--line)',
            color: allFilled && !submitted ? '#0a0c12' : 'var(--ink-mute)',
            fontWeight: 700,
          }}
        >
          submit <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

function TraceAnswers({ challenge, onSubmit }) {
  const [values, setValues] = useState(() => challenge.rows.map(() => ''));
  const [submitted, setSubmitted] = useState(false);

  function setVal(idx, v) {
    if (submitted) return;
    setValues(vs => vs.map((x, i) => i === idx ? v : x));
  }

  function handleSubmit() {
    setSubmitted(true);
    const allCorrect = challenge.rows.every((row, i) => values[i].trim() === row.answer);
    setTimeout(() => onSubmit(allCorrect), 400);
  }

  function inputState(idx) {
    if (!submitted) return '';
    return values[idx].trim() === challenge.rows[idx].answer ? 'correct' : 'wrong';
  }

  return (
    <div>
      <div className="ja-mono text-xs mb-2" style={{color:'var(--ink-mute)'}}>// fill in the variable's value at each step:</div>
      <div className="ja-card overflow-hidden">
        {challenge.rows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between px-4 py-3"
               style={{borderBottom: idx < challenge.rows.length - 1 ? '1px solid var(--line)' : 'none'}}>
            <div className="ja-mono text-sm" style={{color:'var(--ink-dim)'}}>{row.label}</div>
            <input
              className="ja-trace-input"
              data-state={inputState(idx)}
              value={values[idx]}
              onChange={e => setVal(idx, e.target.value)}
              disabled={submitted}
              placeholder="?"
            />
          </div>
        ))}
      </div>

      {submitted && (
        <div className="ja-mono text-xs mt-3" style={{color:'var(--ink-mute)'}}>
          Correct values: {challenge.rows.map(r => r.answer).join(', ')}
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={values.some(v => v.trim() === '') || submitted}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: !values.some(v => v.trim() === '') && !submitted ? 'var(--cyan)' : 'var(--line)',
            color:      !values.some(v => v.trim() === '') && !submitted ? '#0a0c12' : 'var(--ink-mute)',
            fontWeight: 700,
            cursor:     !values.some(v => v.trim() === '') && !submitted ? 'pointer' : 'not-allowed'
          }}
        >
          submit <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

/* ---------- FEEDBACK ---------- */

function FeedbackPanel({ correct, explanation, onNext, isLast, hideNext }) {
  return (
    <div className={`ja-card p-5 mt-2 ja-pop ${correct ? 'ja-glow-emerald' : 'ja-glow-coral'}`}
         style={{background: correct ? 'rgba(110,231,168,0.06)' : 'rgba(255,122,122,0.06)'}}>
      <div className="flex items-center gap-3 mb-2">
        {correct ? (
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
               style={{background:'var(--emerald)', color:'#0a0c12'}}>
            <Check size={18} strokeWidth={3}/>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
               style={{background:'var(--coral)', color:'#0a0c12'}}>
            <X size={18} strokeWidth={3}/>
          </div>
        )}
        <div className="ja-display text-lg" style={{fontWeight:700, color: correct ? 'var(--emerald)' : 'var(--coral)'}}>
          {correct ? 'Correct!' : 'Not quite.'}
        </div>
      </div>
      <p className="text-sm" style={{color:'var(--ink-dim)', lineHeight:1.6}}>{explanation}</p>
      {!hideNext && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onNext}
            className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
            style={{background:'var(--ink)', color:'#0a0c12', fontWeight:700}}
          >
            {isLast ? 'finish' : 'next'} <ArrowRight size={14}/>
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- SUMMARY ---------- */

function SummaryScreen({ subject, correctCount, total, results, mode, levelName, onHome, onReplay }) {
  const acc = total === 0 ? 0 : correctCount / total;
  const stars = scoreStars(correctCount, total);
  const xpEarned = results.reduce((s, r) => s + (r.correct ? (r.hintUsed ? 5 : 10) : 0), 0);

  let headline, sub;
  if (acc >= 0.95) {
    headline = "Perfect run.";
    sub = "Three stars. You owned this level.";
  } else if (acc >= 0.75) {
    headline = "Solid work.";
    sub = "You're getting it. Push for the third star.";
  } else if (acc >= 0.5) {
    headline = "Halfway there.";
    sub = "Try again — you'll catch the ones that slipped.";
  } else {
    headline = "Tough one.";
    sub = "No stress — replay and you'll spot the patterns.";
  }

  return (
    <div className="ja-card p-7 ja-pop">
      <div className="flex justify-center mb-4">
        {stars >= 2 ? (
          <PartyPopper size={36} className="ja-pulse" style={{color:'var(--amber)'}}/>
        ) : (
          <Sparkles size={36} style={{color:'var(--cyan)'}}/>
        )}
      </div>

      <h2 className="ja-display text-3xl text-center mb-1" style={{fontWeight:800, letterSpacing:'-0.02em'}}>
        {headline}
      </h2>
      <p className="text-center text-base mb-6" style={{color:'var(--ink-dim)'}}>{sub}</p>

      {mode === 'level' && (
        <div className="flex justify-center mb-6">
          <Stars count={stars} size={32}/>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-6">
        <SummaryStat label="correct" value={`${correctCount}/${total}`} color="cyan"/>
        <SummaryStat label="accuracy" value={`${Math.round(acc * 100)}%`} color="emerald"/>
        <SummaryStat label="XP earned" value={`+${xpEarned}`} color="amber"/>
      </div>

      <div className="ja-card p-4 mb-5" style={{background:'var(--bg-2)'}}>
        <div className="ja-mono text-xs mb-3" style={{color:'var(--ink-mute)'}}>// run breakdown</div>
        <div className="grid gap-1.5">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="ja-mono" style={{color:'var(--ink-dim)'}}>
                Q{i + 1} {getChallenges(subject)[r.id]?.skills?.[0] ? `· ${prettySkill(getChallenges(subject)[r.id].skills[0])}` : ''}
              </span>
              <span style={{color: r.correct ? 'var(--emerald)' : 'var(--coral)'}}>
                {r.correct ? <Check size={15}/> : <X size={15}/>}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onReplay}
          className="ja-mono text-sm px-4 py-2.5 rounded-lg"
          style={{border:'1px solid var(--line-2)', color:'var(--ink)'}}
        >
          replay
        </button>
        <button
          onClick={onHome}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg"
          style={{background:'var(--cyan)', color:'#0a0c12', fontWeight:700}}
        >
          back to map
        </button>
      </div>
    </div>
  );
}

function SummaryStat({ label, value, color }) {
  const colorMap = { cyan:'var(--cyan)', amber:'var(--amber)', emerald:'var(--emerald)' };
  return (
    <div className="ja-card text-center px-2 py-3" style={{background:'var(--bg-2)'}}>
      <div className="ja-mono text-xs mb-1" style={{color:'var(--ink-mute)'}}>{label}</div>
      <div className="ja-display text-xl" style={{fontWeight:700, color: colorMap[color]}}>{value}</div>
    </div>
  );
}

/* =========================================================================
   STATE MANAGEMENT — subject-scoped progress
   ========================================================================= */

const STORAGE_KEY = 'java-adventure-state-v3';
const LEGACY_STORAGE_KEY = 'java-adventure-state-v2';
const LEGACY_FLAT_KEY = 'java-adventure-state-v1';
const MAX_SKILL_HISTORY = 50;
const MAX_SESSION_HISTORY = 200;
const MAX_DOR_HISTORY = 100;

function defaultSubjectState() {
  return {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    levelProgress: {},
    skillStats: {},
    challengeAttempts: {},
    sessionsPlayed: 0,
    sessionHistory: [],
    doOrDieHistory: [],
  };
}

function defaultState() {
  return {
    subjects: {
      java: defaultSubjectState(),
      business: defaultSubjectState(),
    },
  };
}

function migrateSkillStats(oldStats, subjectId) {
  const out = {};
  for (const [key, val] of Object.entries(oldStats || {})) {
    const ids = subjectId === 'business'
      ? migrateSkillIdsForSubject([key], subjectId)
      : migrateSkillIds([key]);
    if (ids.length === 0) continue;
    const newKey = ids[0];
    const cur = out[newKey] || { correct: 0, wrong: 0, history: [] };
    out[newKey] = {
      correct: cur.correct + (val.correct || 0),
      wrong: cur.wrong + (val.wrong || 0),
      history: cur.history.concat(val.history || []),
    };
  }
  return out;
}

function migrateSubjectState(payload, subjectId) {
  const base = { ...defaultSubjectState(), ...payload };
  base.skillStats = migrateSkillStats(payload.skillStats, subjectId);
  base.sessionHistory = Array.isArray(payload.sessionHistory) ? payload.sessionHistory : [];
  base.doOrDieHistory = Array.isArray(payload.doOrDieHistory) ? payload.doOrDieHistory : [];
  return base;
}

function migrateLoadedState(payload) {
  if (payload?.subjects) {
    return {
      subjects: {
        java: migrateSubjectState(payload.subjects.java || {}, 'java'),
        business: migrateSubjectState(payload.subjects.business || {}, 'business'),
      },
    };
  }
  return {
    subjects: {
      java: migrateSubjectState(payload || {}, 'java'),
      business: defaultSubjectState(),
    },
  };
}

function appendBounded(arr, item, max) {
  const next = arr.concat([item]);
  if (next.length > max) return next.slice(next.length - max);
  return next;
}

function patchSubject(state, subjectId, patchFn) {
  const sid = subjectId || 'java';
  const cur = state.subjects?.[sid] || defaultSubjectState();
  return {
    ...state,
    subjects: {
      ...state.subjects,
      [sid]: patchFn(cur),
    },
  };
}

function reducer(state, action) {
  const subjectId = action.subject || 'java';

  switch (action.type) {
    case 'load': {
      return migrateLoadedState(action.payload || {});
    }
    case 'reset': {
      if (action.subject) {
        return patchSubject(state, action.subject, () => defaultSubjectState());
      }
      return defaultState();
    }
    case 'answer': {
      const { challengeId, correct, skills, hintUsed, challengeType } = action;
      return patchSubject(state, subjectId, (sub) => {
        const xpDelta = correct ? (hintUsed ? 5 : 10) : 0;
        const streak = correct ? sub.streak + 1 : 0;
        const canonicalSkills = migrateSkillIdsForSubject(skills || [], subjectId);
        const skillStats = { ...sub.skillStats };
        const t = Date.now();
        for (const sk of canonicalSkills) {
          const cur = skillStats[sk] || { correct: 0, wrong: 0, history: [] };
          const history = appendBounded(
            cur.history || [],
            { t, c: !!correct, type: challengeType || 'unknown' },
            MAX_SKILL_HISTORY,
          );
          skillStats[sk] = {
            correct: cur.correct + (correct ? 1 : 0),
            wrong: cur.wrong + (correct ? 0 : 1),
            history,
          };
        }
        const prev = sub.challengeAttempts[challengeId] || { attempts: 0, lastCorrect: false };
        return {
          ...sub,
          xp: sub.xp + xpDelta,
          streak,
          bestStreak: Math.max(sub.bestStreak, streak),
          skillStats,
          challengeAttempts: {
            ...sub.challengeAttempts,
            [challengeId]: { attempts: prev.attempts + 1, lastCorrect: correct },
          },
        };
      });
    }
    case 'completeLevel': {
      const { levelId, attempted, correct, unitId } = action;
      const stars = scoreStars(correct, attempted);
      return patchSubject(state, subjectId, (sub) => {
        const prev = sub.levelProgress[levelId];
        const merged = !prev || stars > prev.stars ? { stars, attempted, correct } : prev;
        const sessionEntry = {
          t: Date.now(), mode: 'level', unitId: unitId || null, levelId,
          correctCount: correct, total: attempted,
        };
        return {
          ...sub,
          levelProgress: { ...sub.levelProgress, [levelId]: merged },
          sessionsPlayed: sub.sessionsPlayed + 1,
          sessionHistory: appendBounded(sub.sessionHistory || [], sessionEntry, MAX_SESSION_HISTORY),
        };
      });
    }
    case 'completePractice': {
      const { attempted, correct } = action;
      return patchSubject(state, subjectId, (sub) => {
        const sessionEntry = {
          t: Date.now(), mode: 'practice', unitId: null, correctCount: correct, total: attempted,
        };
        return {
          ...sub,
          sessionsPlayed: sub.sessionsPlayed + 1,
          sessionHistory: appendBounded(sub.sessionHistory || [], sessionEntry, MAX_SESSION_HISTORY),
        };
      });
    }
    case 'doOrDieResult': {
      const { scenarioId, unitId, score, grade, completion, accuracy, speed, correctCount, total } = action;
      return patchSubject(state, subjectId, (sub) => {
        const entry = {
          scenarioId, unitId: unitId || null, t: Date.now(), score, grade, completion, accuracy, speed,
        };
        const sessionEntry = {
          t: entry.t, mode: 'doOrDie', unitId: unitId || null, scenarioId,
          correctCount: correctCount || 0, total: total || 0, score, grade,
        };
        return {
          ...sub,
          sessionsPlayed: sub.sessionsPlayed + 1,
          doOrDieHistory: appendBounded(sub.doOrDieHistory || [], entry, MAX_DOR_HISTORY),
          sessionHistory: appendBounded(sub.sessionHistory || [], sessionEntry, MAX_SESSION_HISTORY),
        };
      });
    }
    default:
      return state;
  }
}

/* =========================================================================
   APP ROOT
   ========================================================================= */

const USER_STORAGE_KEY = 'java-adventure-user-v1';

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, defaultState);
  const [loaded, setLoaded] = useState(false);
  /*
   * View kinds:
   *   map | world | level | summary | practice | progress | doOrDie | theory | practicalTest
   */
  const [view, setView] = useState({ kind: 'subjectPicker' });
  /*
   * Authenticated learner. Loaded from localStorage on mount; populated by
   * the OnboardingModal on first visit. We re-fetch via /api/users on mount
   * so a refresh always reflects the latest server-side row.
   */
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false);
  const activeSubject = view.subject || 'java';
  const subjectState = state.subjects?.[activeSubject] || defaultSubjectState();
  const subjectDispatch = (action) => dispatch({ ...action, subject: activeSubject });



  /*
   * Storage abstraction: prefer the host-injected window.storage (if present),
   * otherwise fall back to localStorage. We also try to migrate from the
   * legacy v1 key on first load.
   */
  async function readSaved() {
    if (typeof window === 'undefined') return null;
    if (window.storage) {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        if (res?.value) return res.value;
        const legacy = await window.storage.get(LEGACY_STORAGE_KEY);
        if (legacy?.value) return legacy.value;
      } catch (e) {
        // ignore; fall through to localStorage
      }
    }
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v) return v;
      const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) return legacy;
    } catch (e) { /* ignore */ }
    return null;
  }

  async function writeSaved(value) {
    if (typeof window === 'undefined') return;
    if (window.storage) {
      try { await window.storage.set(STORAGE_KEY, value); return; } catch (e) { /* fall through */ }
    }
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const value = await readSaved();
      if (!cancelled && value) {
        try {
          dispatch({ type: 'load', payload: JSON.parse(value) });
        } catch (e) { /* ignore corrupt save */ }
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    writeSaved(JSON.stringify(state));
  }, [state, loaded]);

  /*
   * User identity bootstrap: read the cached user from localStorage so the
   * onboarding modal doesn't flash on every refresh, then re-validate the
   * server has the row (in case the DB was reset).
   */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let cached = null;
      try {
        const raw = window.localStorage?.getItem(USER_STORAGE_KEY);
        if (raw) cached = JSON.parse(raw);
      } catch (e) { /* ignore */ }
      if (cached?.email) {
        setUser(cached);
        try {
          const res = await fetch(`/api/users?email=${encodeURIComponent(cached.email)}`);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled && data.user) {
              setUser(data.user);
              window.localStorage?.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
            }
          }
        } catch (e) { /* keep cached */ }
      }
      if (!cancelled) setUserChecked(true);
    })();
    return () => { cancelled = true; };
  }, []);

  function handleOnboardingComplete(newUser) {
    setUser(newUser);
    try { window.localStorage?.setItem(USER_STORAGE_KEY, JSON.stringify(newUser)); } catch (e) { /* ignore */ }
  }

  function handleSignOut() {
    if (typeof window === 'undefined') return;
    if (!window.confirm('Sign out? Your local progress will be cleared from this device.')) return;
    try {
      window.localStorage?.removeItem(USER_STORAGE_KEY);
      window.localStorage?.removeItem(STORAGE_KEY);
      window.localStorage?.removeItem(LEGACY_STORAGE_KEY);
    } catch (e) { /* ignore */ }
    setUser(null);
    dispatch({ type: 'reset', subject: activeSubject });
    setView({ kind: 'subjectPicker' });
  }

  /*
   * Persist a completed run to the database. Fire-and-forget: failures are
   * surfaced to the console but don't block the UI flow.
   */
  async function syncSession(payload) {
    if (!user?.id) return;
    try {
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, subject: activeSubject, ...payload }),
      });
    } catch (e) {
      /* Non-fatal: local state already captured the result. */
      // eslint-disable-next-line no-console
      console.warn('session sync failed', e);
    }
  }

  function buildAttemptsForApi(results, fallbackUnitId) {
    return (results || []).map((r) => ({
      challengeId: r.id,
      challengeType: r.challengeType || 'unknown',
      skills: r.skills || [],
      correct: !!r.correct,
      hintUsed: !!r.hintUsed,
      unitId: r.unitId || fallbackUnitId || null,
    }));
  }

  function goHome() { setView({ kind: 'map', subject: activeSubject }); }
  function goSubjectPicker() { setView({ kind: 'subjectPicker' }); }
  function selectSubject(subjectId) { setView({ kind: 'map', subject: subjectId }); }
  function goProgress() { setView({ kind: 'progress', subject: activeSubject }); }

  function startLevel(levelId, worldId) {
    const level = getLevels(activeSubject)[worldId].find(l => l.id === levelId);
    setView({
      kind: 'level',
      subject: activeSubject,
      levelId,
      worldId,
      challengeIds: level.challengeIds,
      levelName: level.name
    });
  }

  function startScenario(scenarioId, worldId) {
    setView({ kind: 'doOrDie', subject: activeSubject, scenarioId, worldId });
  }

  function startPractice() {
    // Pull weak-skill challenges; if no data yet, pull a random sample
    const skillStats = state.skillStats || {};
    const weakSkills = Object.entries(skillStats)
      .filter(([, v]) => v.correct + v.wrong >= 2 && v.correct / (v.correct + v.wrong) < 0.7)
      .map(([k]) => k);

    const CHALLENGES = getChallenges(activeSubject);
    const allIds = Object.keys(CHALLENGES);
    let picked;
    if (weakSkills.length > 0) {
      picked = allIds.filter(id => CHALLENGES[id].skills?.some(s => weakSkills.includes(s)));
    }
    if (!picked || picked.length === 0) {
      picked = allIds.slice();
    }
    // Shuffle and take up to 8
    for (let i = picked.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picked[i], picked[j]] = [picked[j], picked[i]];
    }
    picked = picked.slice(0, 8);

    setView({
      kind: 'practice',
      subject: activeSubject,
      challengeIds: picked,
      levelName: 'Quick Practice'
    });
  }

  function handleResetProgress() {
    if (typeof window !== 'undefined' && window.confirm(`Reset all ${getSubject(activeSubject).title} progress? This cannot be undone.`)) {
      dispatch({ type: 'reset' });
    }
  }

  return (
    <div className="ja-root min-h-screen ja-grid-bg" style={{padding:'24px 16px 80px'}}>
      <style>{styleSheet}</style>

      {userChecked && !user && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      <div className="max-w-3xl mx-auto">
        {view.kind !== 'subjectPicker' && (
        <Hud
          subject={activeSubject}
          state={subjectState}
          user={user}
          onHome={goHome}
          onPractice={startPractice}
          onProgress={goProgress}
          onReset={handleResetProgress}
          onSignOut={handleSignOut}
          onSwitchSubject={goSubjectPicker}
        />
        )}

        {view.kind === 'subjectPicker' && (
          <SubjectPicker onSelect={selectSubject} />
        )}

        {view.kind === 'map' && (
          <WorldMap
            subject={activeSubject}
            state={subjectState}
            onPickWorld={(worldId) => setView({ kind: 'world', subject: activeSubject, worldId })}
            onPracticalTest={() => setView({ kind: activeSubject === 'business' ? 'businessReportTest' : 'practicalTest', subject: activeSubject })}
            onSwitchSubject={goSubjectPicker}
          />
        )}

        {view.kind === 'progress' && (
          <ProgressReport subject={activeSubject} state={subjectState} onBack={goHome} />
        )}

        {view.kind === 'world' && (
          <LevelView
            subject={activeSubject}
            worldId={view.worldId}
            state={subjectState}
            onBack={goHome}
            onPickLevel={(levelId) => startLevel(levelId, view.worldId)}
            onPickScenario={(scenarioId) => startScenario(scenarioId, view.worldId)}
            onPickTheory={(theoryUnitId) => setView({ kind: 'theory', subject: activeSubject, unitId: theoryUnitId, worldId: view.worldId })}
          />
        )}

        {view.kind === 'theory' && (
          <TheoryMode
            unitId={view.unitId}
            worldColor={getWorlds(activeSubject).find(w => w.id === view.worldId)?.color || 'cyan'}
            getTheoryUnit={(id) => getTheoryUnitForSubject(id, activeSubject)}
            onBack={() => setView({ kind: 'world', subject: activeSubject, worldId: view.worldId })}
            onComplete={({ correctCount, total, results, unitId: theoryUnitId }) => {
              syncSession({
                mode: 'theory',
                unitId: theoryUnitId,
                correctCount,
                total,
                attempts: buildAttemptsForApi(results, theoryUnitId),
              });
            }}
            dispatch={(a) => subjectDispatch(a)}
          />
        )}

        {view.kind === 'businessReportTest' && (
          <BusinessReportTest
            onBack={goHome}
            onComplete={(result) => {
              syncSession({
                mode: 'businessReportTest',
                subject: 'business',
                unitId: result.unitId,
                correctCount: result.totalAwarded,
                total: result.totalPossible,
                score: result.percentage,
                grade: result.grade,
              });
            }}
          />
        )}

        {view.kind === 'practicalTest' && (
          <PracticalTest
            onBack={goHome}
            onComplete={(result) => {
              syncSession({
                mode: 'practicalTest',
                title: result.title,
                totalAwarded: result.totalAwarded,
                totalPossible: result.totalPossible,
                percentage: result.percentage,
                grade: result.grade,
              });
            }}
            dispatch={(a) => subjectDispatch(a)}
          />
        )}

        {view.kind === 'doOrDie' && (() => {
          const scenario = getScenarios(activeSubject).find((s) => s.id === view.scenarioId);
          if (!scenario) {
            return (
              <div className="ja-card p-6 text-center">
                <div className="ja-display text-lg mb-2">Scenario not found</div>
                <button onClick={goHome} className="ja-mono text-xs px-3 py-2 rounded-lg" style={{background:'var(--panel-2)', border:'1px solid var(--line)'}}>back</button>
              </div>
            );
          }
          return (
            <DoOrDie
              scenario={scenario}
              subject={activeSubject}
              units={subjectMod(activeSubject).UNITS}
              dispatch={(a) => subjectDispatch(a)}
              onBack={() => setView({ kind: 'world', subject: activeSubject, worldId: view.worldId || unitToWorld(scenario.unitId, activeSubject) })}
              onComplete={(result) => {
                syncSession({
                  mode: 'doOrDie',
                  unitId: result.unitId,
                  scenarioId: result.scenarioId,
                  correctCount: result.correctCount,
                  total: result.total,
                  score: result.finalScore,
                  grade: result.grade,
                  durationMs: result.durationMs,
                  attempts: result.attempts,
                });
              }}
              renderChallenge={({ challenge, onAnswer }) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onAnswer={onAnswer}
                  onNext={() => {}}
                  isLast={false}
                  hideNext
                />
              )}
            />
          );
        })()}

        {view.kind === 'level' && (
          <ChallengeRunner
            levelId={view.levelId}
            challengeIds={view.challengeIds}
            mode="level"
            onExit={() => setView({ kind: 'world', worldId: view.worldId })}
            onComplete={({ correctCount, total, results, unitId }) => {
              syncSession({
                mode: 'level',
                unitId,
                levelId: view.levelId,
                correctCount,
                total,
                attempts: buildAttemptsForApi(results, unitId),
              });
              setView({
                kind: 'summary', mode: 'level', levelName: view.levelName, worldId: view.worldId,
                levelId: view.levelId, challengeIds: view.challengeIds, correctCount, total, results,
              });
            }}
            dispatch={(a) => subjectDispatch(a)}
            subject={activeSubject}
          />
        )}

        {view.kind === 'practice' && (
          <ChallengeRunner
            challengeIds={view.challengeIds}
            mode="practice"
            onExit={goHome}
            onComplete={({ correctCount, total, results, unitId }) => {
              syncSession({
                mode: 'practice',
                unitId,
                correctCount,
                total,
                attempts: buildAttemptsForApi(results, unitId),
              });
              setView({
                kind: 'summary', mode: 'practice', levelName: 'Quick Practice',
                challengeIds: view.challengeIds, correctCount, total, results,
              });
            }}
            dispatch={(a) => subjectDispatch(a)}
            subject={activeSubject}
          />
        )}

        {view.kind === 'summary' && (
          <SummaryScreen
            subject={activeSubject}
            correctCount={view.correctCount}
            total={view.total}
            results={view.results}
            mode={view.mode}
            levelName={view.levelName}
            onHome={goHome}
            onReplay={() => {
              if (view.mode === 'level') {
                startLevel(view.levelId, view.worldId);
              } else {
                startPractice();
              }
            }}
          />
        )}

        {/* Footer */}
        <div className="mt-12 text-center ja-mono text-xs" style={{color:'var(--ink-mute)'}}>
          // grade 10 practice arena · v2
        </div>
      </div>
    </div>
  );
}
