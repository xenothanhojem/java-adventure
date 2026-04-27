import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Code2, Zap, Star, Flame, Trophy, Target,
  Lightbulb, RotateCcw, Check, X, Lock, Sparkles, BarChart3, Home,
  ArrowRight, BookOpen, Cpu, Repeat, GitBranch, Hash, ScrollText, Brain,
  PartyPopper, Rocket, Boxes, Workflow, Bug, Send, Loader2, FileCode,
  AlertCircle, Pencil
} from 'lucide-react';

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

const WORLDS = [
  {
    id: 'variables',
    name: 'Variables Lab',
    subtitle: 'Unit 2 · Types, arithmetic & input',
    color: 'cyan',
    glow: 'ja-glow-cyan',
    bg: 'ja-w-variables',
    icon: Hash,
    blurb: 'Where every value finds its slot. Pick the right type, predict the maths, master modulus.',
  },
  {
    id: 'strings',
    name: 'String Cave',
    subtitle: 'Unit 3 · Chars, strings & Math',
    color: 'magenta',
    glow: 'ja-glow-magenta',
    bg: 'ja-w-strings',
    icon: ScrollText,
    blurb: 'Single quotes vs double quotes. charAt zero. Escapes. The Math class. All in here.',
  },
  {
    id: 'algorithms',
    name: 'Algorithm Tower',
    subtitle: 'Unit 4 · Computational thinking',
    color: 'coral',
    glow: 'ja-glow-coral',
    bg: 'ja-w-algorithms',
    icon: Workflow,
    blurb: 'Decompose. Spot patterns. Abstract away noise. Flowcharts, pseudocode, errors, traces — the toolkit behind every program.',
  },
  {
    id: 'loops',
    name: 'Loop Mountain',
    subtitle: 'Unit 5 · for loops & repetition',
    color: 'amber',
    glow: 'ja-glow-amber',
    bg: 'ja-w-loops',
    icon: Repeat,
    blurb: 'Count up. Count down. Sum, average, never-runs, runs-forever. Climb every iteration.',
  },
  {
    id: 'objects',
    name: 'Object Forge',
    subtitle: 'Unit 6 · More about objects',
    color: 'indigo',
    glow: 'ja-glow-indigo',
    bg: 'ja-w-objects',
    icon: Boxes,
    blurb: 'Constructors, overloading, state diagrams, the Color class, random numbers. Where Gogga objects come from.',
  },
  {
    id: 'logic',
    name: 'Logic Base',
    subtitle: 'Unit 7 · if statements & decisions',
    color: 'emerald',
    glow: 'ja-glow-emerald',
    bg: 'ja-w-logic',
    icon: GitBranch,
    blurb: 'True or false. If, else, nested. AND, OR, NOT. Every branch leads somewhere.',
  },
];

// Each level is a small bundle of challenges
const LEVELS = {
  variables: [
    { id: 'v-l1', name: 'Type Selector',     subtitle: 'Recognise the right data type', challengeIds: ['v1','v2','v3'] },
    { id: 'v-l2', name: 'Arithmetic Lab',    subtitle: 'Predict what maths produces',   challengeIds: ['v4','v5','v6','v7'] },
    { id: 'v-l3', name: 'Variables Boss',    subtitle: 'Mixed challenges to wrap up',   challengeIds: ['v8','v9','v10','v11','v12'] },
    { id: 'v-l4', name: 'Code Workshop',     subtitle: 'Read code, spot bugs, write your first program', challengeIds: ['v13','v14','v15','v16','v17'], hasCoding: true },
  ],
  strings: [
    { id: 's-l1', name: 'Quote Quarry',      subtitle: 'char vs String',                challengeIds: ['s1','s2','s3'] },
    { id: 's-l2', name: 'String Operations', subtitle: 'length, charAt, escapes',       challengeIds: ['s4','s5','s6','s7'] },
    { id: 's-l3', name: 'String Boss',       subtitle: 'Math class + casting + strings',challengeIds: ['s8','s9','s10','s11','s12'] },
    { id: 's-l4', name: 'Code Workshop',     subtitle: 'Read string code, spot bugs, write your own', challengeIds: ['s13','s14','s15','s16','s17'], hasCoding: true },
  ],
  loops: [
    { id: 'l-l1', name: 'How Many Times?',   subtitle: 'Counting loop iterations',      challengeIds: ['l1','l2','l3'] },
    { id: 'l-l2', name: 'Loop Output',       subtitle: 'What does it print?',           challengeIds: ['l4','l5','l6','l7'] },
    { id: 'l-l3', name: 'Loop Boss',         subtitle: 'Sums, traces, broken loops',    challengeIds: ['l8','l9','l10','l11','l12'] },
    { id: 'l-l4', name: 'Code Workshop',     subtitle: 'Loop reading, debugging, and writing your own', challengeIds: ['l13','l14','l15','l16','l17'], hasCoding: true },
  ],
  logic: [
    { id: 'g-l1', name: 'Condition Check',   subtitle: 'Evaluating true/false',         challengeIds: ['g1','g2','g3'] },
    { id: 'g-l2', name: 'If / Else',         subtitle: 'Picking the right branch',      challengeIds: ['g4','g5','g6','g7'] },
    { id: 'g-l3', name: 'Logic Boss',        subtitle: 'Nested logic and operators',    challengeIds: ['g8','g9','g10','g11','g12'] },
    { id: 'g-l4', name: 'Code Workshop',     subtitle: 'Read decisions, spot bugs, write a classifier', challengeIds: ['g13','g14','g15','g16','g17'], hasCoding: true },
  ],
  algorithms: [
    { id: 'a-l1', name: 'Four Pillars',      subtitle: 'Decompose, spot patterns, abstract, sequence', challengeIds: ['a1','a2','a3','a4'] },
    { id: 'a-l2', name: 'IPO Model',         subtitle: 'Input · Processing · Output',  challengeIds: ['a5','a6','a7','a8'] },
    { id: 'a-l3', name: 'Flowcharts & Pseudocode', subtitle: 'Symbols and the rules',  challengeIds: ['a9','a10','a11','a12','a13'] },
    { id: 'a-l4', name: 'Errors, Tests & Traces',  subtitle: 'Boss level — bring it all together', challengeIds: ['a14','a15','a16','a17','a18','a19','a20'], hasCoding: true },
  ],
  objects: [
    { id: 'o-l1', name: 'Objects 101',       subtitle: 'Declaring, instantiating, the new keyword', challengeIds: ['o1','o2','o3','o4'] },
    { id: 'o-l2', name: 'Constructors',      subtitle: 'Overloading and method resolution',         challengeIds: ['o5','o6','o7','o8'] },
    { id: 'o-l3', name: 'Color & Random',    subtitle: 'RGB and Math.random',                       challengeIds: ['o9','o10','o11','o12','o13'] },
    { id: 'o-l4', name: 'Object Forge Boss', subtitle: 'State, randomness, and your own program',   challengeIds: ['o14','o15','o16','o17','o18'], hasCoding: true },
  ],
};

const CHALLENGES = {
  /* ---- Variables Lab ---- */
  v1: {
    type: 'mc', world: 'variables',
    prompt: "Which type best stores a person's age (e.g. 16)?",
    options: ['String', 'int', 'double', 'char'],
    answer: 1,
    hint: 'Ages are whole numbers, not decimals or text.',
    explanation: 'int is for whole numbers. double works but uses more memory. String would store "16" as text — you couldn\'t do maths on it.',
    skills: ['variable-type-selection']
  },
  v2: {
    type: 'mc', world: 'variables',
    prompt: 'Which type best stores an average rainfall reading like 12.4 mm?',
    options: ['int', 'char', 'double', 'String'],
    answer: 2,
    hint: 'You need to keep the digits after the decimal point.',
    explanation: 'double is for real numbers (decimals). int would chop off the .4 and you\'d lose accuracy.',
    skills: ['variable-type-selection']
  },
  v3: {
    type: 'mc', world: 'variables',
    prompt: "Which type best stores a single grade letter like 'B'?",
    options: ['String', 'int', 'char', 'double'],
    answer: 2,
    hint: 'It\'s exactly one character — not a word.',
    explanation: 'char stores exactly one character. String works too but is overkill for a single letter.',
    skills: ['variable-type-selection', 'char-vs-string']
  },
  v4: {
    type: 'mc', world: 'variables',
    prompt: 'What value does x hold after this code runs?',
    code: 'int x = 7 / 2;',
    options: ['3', '3.5', '4', '0'],
    answer: 0,
    hint: 'Both numbers are integers, so Java does integer division.',
    explanation: 'When you divide two ints, Java throws away the decimal part. 7 / 2 is 3, not 3.5.',
    skills: ['arithmetic-output', 'integer-division']
  },
  v5: {
    type: 'mc', world: 'variables',
    prompt: 'What value does r hold after this code runs?',
    code: 'int r = 17 % 5;',
    options: ['3', '2', '12', '3.4'],
    answer: 1,
    hint: 'The % operator gives the remainder.',
    explanation: '17 ÷ 5 is 3 remainder 2. The % operator returns the remainder, so r is 2.',
    skills: ['arithmetic-output', 'modulus']
  },
  v6: {
    type: 'mc', world: 'variables',
    prompt: 'What value does y hold after this code runs?',
    code: 'double y = 7.0 / 2;',
    options: ['3', '3.5', '4', '0.5'],
    answer: 1,
    hint: 'One of the values is a double. Does that change the rule?',
    explanation: 'Because 7.0 is a double, Java does real-number division. 7.0 / 2 = 3.5.',
    skills: ['arithmetic-output', 'integer-division']
  },
  v7: {
    type: 'mc', world: 'variables',
    prompt: 'Which operator goes in the blank so count becomes 6?',
    code: 'int count = 5;\ncount___;\n// count is now 6',
    options: ['++', '--', '+=', '== 6'],
    answer: 0,
    hint: 'You\'re adding exactly 1.',
    explanation: 'count++ is shorthand for count = count + 1.',
    skills: ['increment-operator']
  },
  v8: {
    type: 'mc', world: 'variables',
    prompt: 'What is a after these three lines?',
    code: 'int a = 3;\na += 4;\na *= 2;',
    options: ['10', '14', '11', '7'],
    answer: 1,
    hint: 'Do them in order: first +=, then *=.',
    explanation: 'a = 3, then a += 4 makes a = 7, then a *= 2 makes a = 14.',
    skills: ['arithmetic-output', 'compound-assignment']
  },
  v9: {
    type: 'mc', world: 'variables',
    prompt: 'Which of these is NOT a valid variable name in Java?',
    options: ['firstName', '_score', '2ndPlace', 'totalSum'],
    answer: 2,
    hint: 'Look at how each one starts.',
    explanation: 'Variable names cannot start with a digit. 2ndPlace is invalid. _score is fine — underscores are allowed.',
    skills: ['identifier-rules']
  },
  v10: {
    type: 'mc', world: 'variables',
    prompt: 'What is x after this code runs?',
    code: 'double pi = 3.14;\nint x = (int) pi;',
    options: ['3', '4', '3.14', 'error'],
    answer: 0,
    hint: 'Casting a double to int chops off the decimal.',
    explanation: 'Casting a double to int does not round — it truncates. (int) 3.14 = 3.',
    skills: ['typecasting']
  },
  v11: {
    type: 'trace', world: 'variables',
    prompt: 'Trace the value of a after each line.',
    code: 'int a = 1;\na = a * 2;\na = a + 5;\na = a - 3;',
    rows: [
      { label: 'After line 1', answer: '1' },
      { label: 'After line 2', answer: '2' },
      { label: 'After line 3', answer: '7' },
      { label: 'After line 4', answer: '4' },
    ],
    hint: 'Take each line one at a time and update a.',
    explanation: '1 → ×2 = 2 → +5 = 7 → −3 = 4.',
    skills: ['trace-table', 'arithmetic-output']
  },
  v12: {
    type: 'mc', world: 'variables',
    prompt: 'A user types their age into an input dialog. The dialog returns a String. To use it as a number, you need to:',
    options: [
      'Nothing — it\'s already a number',
      'Convert it with Integer.parseInt(...)',
      'Use (char) to cast it',
      'Multiply it by 1'
    ],
    answer: 1,
    hint: 'Input dialogs always give back text. You must convert it.',
    explanation: 'Integer.parseInt converts a String like "16" into the int 16 so you can do maths with it.',
    skills: ['input-conversion']
  },

  /* ---- String Cave ---- */
  s1: {
    type: 'mc', world: 'strings',
    prompt: 'Which type uses SINGLE quotes around its value?',
    options: ['String', 'char', 'int', 'double'],
    answer: 1,
    hint: 'One symbol, one type.',
    explanation: 'char uses single quotes: \'A\'. String uses double quotes: "A".',
    skills: ['char-vs-string', 'quote-rules']
  },
  s2: {
    type: 'tf', world: 'strings',
    prompt: 'This declaration is valid Java:',
    code: 'char c = "A";',
    answer: false,
    hint: 'Look at the quotes.',
    explanation: 'False. char needs single quotes: char c = \'A\'. With double quotes "A" is a String, not a char.',
    skills: ['char-vs-string', 'quote-rules']
  },
  s3: {
    type: 'mc', world: 'strings',
    prompt: 'Which type would you use to store the sentence "Hello, world"?',
    options: ['char', 'String', 'int', 'double'],
    answer: 1,
    hint: 'It\'s more than one character.',
    explanation: 'String stores any sequence of characters. char only holds one.',
    skills: ['char-vs-string']
  },
  s4: {
    type: 'mc', world: 'strings',
    prompt: 'What does this expression evaluate to?',
    code: '"Angelo".length()',
    options: ['5', '6', '7', '"Angelo"'],
    answer: 1,
    hint: 'Count the letters.',
    explanation: 'A-n-g-e-l-o is 6 characters, so length() returns 6.',
    skills: ['string-length']
  },
  s5: {
    type: 'mc', world: 'strings',
    prompt: 'What does this expression evaluate to?',
    code: '"Java".charAt(0)',
    options: ["'J'", "'a'", "'v'", "'J'a"],
    answer: 0,
    hint: 'Indexing starts at zero — what\'s the first character?',
    explanation: 'String positions start at 0. Index 0 of "Java" is \'J\'.',
    skills: ['charAt', 'indexing']
  },
  s6: {
    type: 'mc', world: 'strings',
    prompt: 'What does this expression evaluate to?',
    code: '"Hello".charAt(4)',
    options: ["'l'", "'o'", "'H'", 'error'],
    answer: 1,
    hint: 'Index 0 is \'H\'. Count up: H=0, e=1, l=2, l=3, o=4.',
    explanation: 'Indexing starts at 0, so index 4 of "Hello" is the fifth character — \'o\'.',
    skills: ['charAt', 'indexing']
  },
  s7: {
    type: 'mc', world: 'strings',
    prompt: 'Which escape sequence inserts a new line?',
    options: ['\\t', '\\n', '\\\\', '\\"'],
    answer: 1,
    hint: 'n stands for "new line".',
    explanation: '\\n is the newline escape. \\t is tab. \\\\ is a backslash. \\" is a quote inside a string.',
    skills: ['escape-characters']
  },
  s8: {
    type: 'mc', world: 'strings',
    prompt: 'What character does this return?',
    code: 'String w = "Code";\nw.charAt(w.length() - 1);',
    options: ["'C'", "'o'", "'d'", "'e'"],
    answer: 3,
    hint: 'length() is 4. Subtract 1 to get the last index.',
    explanation: '"Code" has length 4. The last index is 4 - 1 = 3, and charAt(3) is \'e\'.',
    skills: ['charAt', 'string-length', 'indexing']
  },
  s9: {
    type: 'mc', world: 'strings',
    prompt: 'What does this evaluate to?',
    code: 'Math.sqrt(16)',
    options: ['4', '4.0', '8.0', '256'],
    answer: 1,
    hint: 'Math.sqrt always returns a double.',
    explanation: 'Math.sqrt returns a double, so the answer is 4.0, not the int 4.',
    skills: ['math-methods']
  },
  s10: {
    type: 'mc', world: 'strings',
    prompt: 'What does this evaluate to?',
    code: 'Math.pow(2, 5)',
    options: ['7.0', '10.0', '32.0', '25.0'],
    answer: 2,
    hint: 'pow(a, b) means "a to the power of b".',
    explanation: 'Math.pow(2, 5) is 2⁵ = 32. It returns a double, so 32.0.',
    skills: ['math-methods']
  },
  s11: {
    type: 'mc', world: 'strings',
    prompt: 'What is printed?',
    code: 'System.out.println("It\\\'s nice");',
    options: ['It\\\'s nice', "It's nice", 'It"s nice', 'compile error'],
    answer: 1,
    hint: '\\\' means "I want a real apostrophe here".',
    explanation: 'The escape \\\' inserts a literal apostrophe inside the string. The output is: It\'s nice.',
    skills: ['escape-characters']
  },
  s12: {
    type: 'mc', world: 'strings',
    prompt: 'What does this print?',
    code: 'int code = 65;\nchar letter = (char) code;\nSystem.out.print(letter);',
    options: ["A", "65", "a", "char"],
    answer: 0,
    hint: 'The ASCII code 65 maps to a capital letter.',
    explanation: '(char) 65 converts the integer 65 to its character: \'A\'. So the output is A.',
    skills: ['typecasting', 'char-vs-string']
  },

  /* ---- Loop Mountain ---- */
  l1: {
    type: 'mc', world: 'loops',
    prompt: 'How many times does the body of this loop run?',
    code: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
    options: ['4', '5', '6', '0'],
    answer: 1,
    hint: 'Start at 1, end when i > 5.',
    explanation: 'i takes values 1, 2, 3, 4, 5 — that\'s 5 iterations.',
    skills: ['for-loop-count']
  },
  l2: {
    type: 'mc', world: 'loops',
    prompt: 'How many times does this loop run?',
    code: 'for (int i = 0; i < 10; i += 2) {\n    System.out.println(i);\n}',
    options: ['10', '5', '6', '4'],
    answer: 1,
    hint: 'i jumps by 2 each time. List the values it takes.',
    explanation: 'i = 0, 2, 4, 6, 8 — five iterations. At 10 the condition fails.',
    skills: ['for-loop-count']
  },
  l3: {
    type: 'tf', world: 'loops',
    prompt: 'This loop runs at least once:',
    code: 'for (int i = 10; i <= 5; i++) {\n    System.out.println("hi");\n}',
    answer: false,
    hint: 'Check the condition before the first iteration.',
    explanation: 'False. The condition i <= 5 is already false on entry (10 is not <= 5), so the body never runs.',
    skills: ['for-loop-count', 'loop-never-runs']
  },
  l4: {
    type: 'mc', world: 'loops',
    prompt: 'What does this print? (values separated by spaces)',
    code: 'for (int i = 1; i <= 3; i++) {\n    System.out.print(i + " ");\n}',
    options: ['1 2 3', '0 1 2', '1 2 3 4', '3 2 1'],
    answer: 0,
    hint: 'i goes 1, then 2, then 3.',
    explanation: 'The loop prints i for i = 1, 2, 3 → "1 2 3 ".',
    skills: ['for-loop-output']
  },
  l5: {
    type: 'mc', world: 'loops',
    prompt: 'What does this print?',
    code: 'for (int i = 5; i >= 1; i--) {\n    System.out.print(i + " ");\n}',
    options: ['1 2 3 4 5', '5 4 3 2 1', '5 4 3 2', '5'],
    answer: 1,
    hint: 'i-- means count down.',
    explanation: 'Counting backwards from 5 to 1 prints "5 4 3 2 1".',
    skills: ['for-loop-output', 'loop-direction']
  },
  l6: {
    type: 'mc', world: 'loops',
    prompt: 'What is the final value of total?',
    code: 'int total = 0;\nfor (int i = 1; i <= 5; i++) {\n    total = total + i;\n}',
    options: ['5', '10', '15', '120'],
    answer: 2,
    hint: 'Add up 1 + 2 + 3 + 4 + 5.',
    explanation: 'You\'re summing 1 to 5: 1+2+3+4+5 = 15.',
    skills: ['for-loop-sum']
  },
  l7: {
    type: 'mc', world: 'loops',
    prompt: 'What does this print?',
    code: 'for (char c = \'A\'; c <= \'C\'; c++) {\n    System.out.print(c);\n}',
    options: ['ABC', 'A B C', '65 66 67', 'AAA'],
    answer: 0,
    hint: 'You can loop with chars too — they go up by 1 in their codes.',
    explanation: 'c goes from \'A\' to \'C\', incrementing each time. Output: ABC.',
    skills: ['for-loop-output', 'char-loop']
  },
  l8: {
    type: 'mc', world: 'loops',
    prompt: 'Which loop runs FOREVER if you actually ran it?',
    code: '// Option A:\nfor (int i = 0; i < 5; i++) { ... }\n\n// Option B:\nfor (int i = 0; i < 5; i--) { ... }',
    options: ['Option A', 'Option B', 'Both', 'Neither'],
    answer: 1,
    hint: 'Look at how each one updates i.',
    explanation: 'Option B starts at 0 and decreases — i never reaches 5, so the condition stays true forever. That\'s an infinite loop.',
    skills: ['loop-runs-forever']
  },
  l9: {
    type: 'trace', world: 'loops',
    prompt: 'Trace this loop. After each iteration, what is total?',
    code: 'int total = 0;\nfor (int i = 1; i <= 4; i++) {\n    total = total + i;\n}',
    rows: [
      { label: 'After i = 1', answer: '1' },
      { label: 'After i = 2', answer: '3' },
      { label: 'After i = 3', answer: '6' },
      { label: 'After i = 4', answer: '10' },
    ],
    hint: 'Add the current i to total each time.',
    explanation: 'total runs 0→1→3→6→10. The familiar triangular numbers.',
    skills: ['for-loop-sum', 'trace-table']
  },
  l10: {
    type: 'mc', world: 'loops',
    prompt: 'A loop adds 5 numbers into total. What\'s the average?',
    code: 'int total = 20;\nint count = 5;\ndouble avg = ___;',
    options: ['total / count', 'total * count', '(double) total / count', 'total - count'],
    answer: 2,
    hint: 'You want a decimal answer. What kind of division do you need?',
    explanation: 'To get a real-number average from two ints, cast first: (double) total / count gives 4.0, not 4.',
    skills: ['for-loop-average', 'typecasting']
  },
  l11: {
    type: 'order', world: 'loops',
    prompt: 'Order these steps to compute the sum of N numbers entered by the user.',
    items: [
      'Set total = 0',
      'Read N from the user',
      'Loop from i = 1 to N',
      'Inside the loop: read a number and add it to total',
      'Print total'
    ],
    answer: [0, 1, 2, 3, 4],
    hint: 'Initialise the running total before the loop, print after.',
    explanation: 'Always initialise running totals BEFORE looping, do the work INSIDE, and print AFTER.',
    skills: ['algorithm-order', 'for-loop-sum']
  },
  l12: {
    type: 'mc', world: 'loops',
    prompt: 'How many stars does this print?',
    code: 'for (int i = 0; i < 4; i++) {\n    for (int j = 0; j < 3; j++) {\n        System.out.print("*");\n    }\n}',
    options: ['7', '12', '16', '4'],
    answer: 1,
    hint: 'Inner loop runs fully for each outer iteration.',
    explanation: 'Outer runs 4 times, inner runs 3 times each. 4 × 3 = 12 stars.',
    skills: ['for-loop-output', 'nested-loops']
  },

  /* ---- Logic Base ---- */
  g1: {
    type: 'tf', world: 'logic',
    prompt: 'This expression is true:',
    code: '5 > 3',
    answer: true,
    hint: 'Is 5 greater than 3?',
    explanation: 'True. 5 is greater than 3.',
    skills: ['relational-operator']
  },
  g2: {
    type: 'mc', world: 'logic',
    prompt: 'Which operator means "not equal to"?',
    options: ['=', '==', '!=', '<>'],
    answer: 2,
    hint: 'It\'s the != combination.',
    explanation: '!= means "not equal". == is "equal". = is assignment.',
    skills: ['relational-operator']
  },
  g3: {
    type: 'tf', world: 'logic',
    prompt: 'This expression is true:',
    code: '7 == 7 && 3 < 1',
    answer: false,
    hint: '&& needs BOTH sides to be true.',
    explanation: 'False. 7 == 7 is true, but 3 < 1 is false. With &&, both must be true.',
    skills: ['logical-operators']
  },
  g4: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when x = 5?',
    code: 'if (x > 10) {\n    System.out.print("big");\n} else {\n    System.out.print("small");\n}',
    options: ['big', 'small', 'nothing', 'error'],
    answer: 1,
    hint: 'Is 5 > 10?',
    explanation: '5 > 10 is false, so the else branch runs and prints "small".',
    skills: ['if-else']
  },
  g5: {
    type: 'mc', world: 'logic',
    prompt: 'Which condition correctly checks "x is between 1 and 10 (inclusive)"?',
    options: [
      'x > 1 && x < 10',
      'x >= 1 || x <= 10',
      'x >= 1 && x <= 10',
      '1 <= x <= 10'
    ],
    answer: 2,
    hint: '"Inclusive" means 1 and 10 should both count. You need AND, not OR.',
    explanation: 'Both conditions must hold: x >= 1 AND x <= 10. Java doesn\'t allow 1 <= x <= 10 like maths does.',
    skills: ['relational-operator', 'logical-operators']
  },
  g6: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when score = 72?',
    code: 'if (score >= 80) {\n    System.out.print("A");\n} else if (score >= 70) {\n    System.out.print("B");\n} else if (score >= 60) {\n    System.out.print("C");\n} else {\n    System.out.print("F");\n}',
    options: ['A', 'B', 'C', 'F'],
    answer: 1,
    hint: '72 fails the first check. Try the second.',
    explanation: '72 is not >= 80, but it IS >= 70, so the second branch runs and prints "B".',
    skills: ['if-else', 'nested-if']
  },
  g7: {
    type: 'mc', world: 'logic',
    prompt: 'When is (a > 0 || b > 0) true?',
    options: [
      'Only if both a and b are positive',
      'Only if a is positive',
      'If either a or b (or both) is positive',
      'Never'
    ],
    answer: 2,
    hint: '|| is OR — only one side needs to be true.',
    explanation: '|| (OR) is true if at least one side is true. Both being positive also works.',
    skills: ['logical-operators']
  },
  g8: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when x = -3?',
    code: 'if (x > 0) {\n    System.out.print("positive");\n} else if (x < 0) {\n    System.out.print("negative");\n} else {\n    System.out.print("zero");\n}',
    options: ['positive', 'negative', 'zero', 'nothing'],
    answer: 1,
    hint: 'Walk through each condition.',
    explanation: '-3 is not > 0, so first branch fails. -3 < 0 is true, so it prints "negative".',
    skills: ['if-else', 'nested-if']
  },
  g9: {
    type: 'mc', world: 'logic',
    prompt: 'These two conditions are equivalent:',
    code: '!(x > 0)\nx <= 0',
    options: ['Always equivalent', 'Only when x is even', 'Only when x is positive', 'Never equivalent'],
    answer: 0,
    hint: '"NOT (x > 0)" means "x is NOT greater than 0".',
    explanation: 'If x is not greater than 0, then x must be less than or equal to 0. Logically identical.',
    skills: ['logical-operators']
  },
  g10: {
    type: 'order', world: 'logic',
    prompt: 'Order the steps to classify a number as positive, negative, or zero.',
    items: [
      'Read the number',
      'Check if it is greater than 0 — if so, print "positive"',
      'Otherwise check if it is less than 0 — if so, print "negative"',
      'Otherwise print "zero"'
    ],
    answer: [0, 1, 2, 3],
    hint: 'You need the number before you can test it.',
    explanation: 'Always read input before testing. The else-if chain handles the three cases cleanly.',
    skills: ['algorithm-order', 'if-else']
  },
  g11: {
    type: 'mc', world: 'logic',
    prompt: 'A program crashes only when run, not when compiled. What kind of error is that?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'No error'],
    answer: 1,
    hint: 'Syntax errors stop compilation. This one passes compilation.',
    explanation: 'Runtime errors only show up while the program is running (e.g. dividing by zero). Syntax errors stop compilation. Logical errors give wrong answers without crashing.',
    skills: ['error-types']
  },
  g12: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when age = 17 and hasLicence = true?',
    code: 'if (age >= 18 && hasLicence) {\n    System.out.print("can drive");\n} else {\n    System.out.print("cannot drive");\n}',
    options: ['can drive', 'cannot drive', 'nothing', 'error'],
    answer: 1,
    hint: 'Both sides of && must be true.',
    explanation: 'age >= 18 is false (17 < 18). With &&, one false side makes the whole condition false. So the else branch runs.',
    skills: ['if-else', 'logical-operators']
  },

  /* ==== VARIABLES — Code Workshop ==== */
  v13: {
    type: 'code-read', world: 'variables',
    prompt: 'What does this short program do?',
    code: 'int a = Integer.parseInt(JOptionPane.showInputDialog("a?"));\nint b = Integer.parseInt(JOptionPane.showInputDialog("b?"));\nSystem.out.println(a + b);',
    options: [
      'Asks for one number and prints it twice',
      'Asks for two numbers and prints their sum',
      'Asks for two numbers and prints them joined as text',
      'Asks for two numbers and prints their product'
    ],
    answer: 1,
    hint: 'parseInt converts the input to an int, so + means add.',
    explanation: 'Both inputs are converted to int, then added together. If a was a String the + would join them as text instead.',
    skills: ['code-reading', 'input-conversion']
  },
  v14: {
    type: 'error-spot', world: 'variables',
    prompt: 'What kind of error will the compiler complain about here?',
    code: 'int score = 75\nSystem.out.println(score);',
    options: ['Syntax error — missing semicolon', 'Runtime error', 'Logical error', 'No error at all'],
    answer: 0,
    hint: 'Look at the end of line 1.',
    explanation: 'Java statements end with a semicolon. The compiler will refuse to build this — that\'s a syntax error.',
    skills: ['error-types', 'syntax-error']
  },
  v15: {
    type: 'trace', world: 'variables',
    prompt: 'Trace the value of x line by line.',
    code: 'int x = 10;\nx = x % 4;\nx = x * 5;\nx = x + (x / 2);',
    rows: [
      { label: 'After line 1', answer: '10' },
      { label: 'After line 2', answer: '2' },
      { label: 'After line 3', answer: '10' },
      { label: 'After line 4', answer: '15' },
    ],
    hint: 'Take it line by line. Remember integer division truncates.',
    explanation: '10 → %4 = 2 → ×5 = 10 → +(10/2) = 10 + 5 = 15.',
    skills: ['trace-table', 'modulus', 'arithmetic-output']
  },
  v16: {
    type: 'code-write', world: 'variables',
    prompt: 'Write a program that asks for an age and prints whether the person is a teenager.',
    criteria: 'Use JOptionPane.showInputDialog to ask for the age. Convert it to an int with Integer.parseInt. A teenager is anyone whose age is from 13 to 19 inclusive. Print "teenager" or "not a teenager" using System.out.println.',
    starter: 'import javax.swing.JOptionPane;\n\npublic class TeenCheck {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['code-write', 'input-conversion', 'if-else'],
    explanation: 'Asking for input, converting it, and using a condition to drive output is the heart of most Grade 10 programs.'
  },
  v17: {
    type: 'mc', world: 'variables',
    prompt: 'What is the difference between = and == in Java?',
    options: [
      'They mean exactly the same thing',
      '= compares values, == assigns values',
      '= assigns values, == compares values',
      '== is for numbers only, = is for everything else'
    ],
    answer: 2,
    hint: 'One puts a value INTO a variable. The other CHECKS if two values are equal.',
    explanation: '= assigns: x = 5 puts 5 into x. == compares: x == 5 is true if x already equals 5. Mixing these up is one of the most common bugs.',
    skills: ['operators', 'common-mistakes']
  },

  /* ==== STRINGS — Code Workshop ==== */
  s13: {
    type: 'code-read', world: 'strings',
    prompt: 'What does this code print?',
    code: 'String name = "Angelo";\nSystem.out.println("Hi " + name + "!");\nSystem.out.println("Your name has " + name.length() + " letters.");',
    options: [
      'Hi Angelo!\nYour name has 6 letters.',
      'Hi name!\nYour name has 6 letters.',
      'Hi Angelo!\nYour name has Angelo letters.',
      'Compile error'
    ],
    answer: 0,
    hint: '+ joins strings together. length() returns the number of characters.',
    explanation: 'String concatenation joins "Hi ", the value of name, and "!". length() returns 6 for "Angelo".',
    skills: ['code-reading', 'string-concat', 'string-length']
  },
  s14: {
    type: 'error-spot', world: 'strings',
    prompt: 'What\'s wrong with this declaration?',
    code: 'String greeting = "Hello;\nSystem.out.println(greeting);',
    options: [
      'No error',
      'Syntax error — the string is not closed',
      'Runtime error — the string is too long',
      'Logical error — wrong message'
    ],
    answer: 1,
    hint: 'Count the double quotes.',
    explanation: 'There\'s only one " — the string was opened but never closed. The compiler can\'t parse this. Syntax error.',
    skills: ['error-types', 'syntax-error']
  },
  s15: {
    type: 'trace', world: 'strings',
    prompt: 'Trace what each variable holds.',
    code: 'String word = "Hello";\nint n = word.length();\nchar first = word.charAt(0);\nchar last = word.charAt(n - 1);',
    rows: [
      { label: 'word', answer: 'Hello' },
      { label: 'n',    answer: '5' },
      { label: 'first',answer: 'H' },
      { label: 'last', answer: 'o' },
    ],
    hint: 'Length counts characters. Index 0 is the first. The last index is length minus one.',
    explanation: '"Hello" has length 5. charAt(0) = \'H\'. charAt(5-1) = charAt(4) = \'o\'.',
    skills: ['trace-table', 'string-length', 'charAt']
  },
  s16: {
    type: 'code-write', world: 'strings',
    prompt: 'Write a program that asks for a name and prints just the first letter (in capitals).',
    criteria: 'Use JOptionPane to ask for a name (a String). Get the first character with charAt(0). Print it on its own line. You can use Character.toUpperCase to make it capital, or assume the user types in capitals already — both are fine.',
    starter: 'import javax.swing.JOptionPane;\n\npublic class FirstLetter {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['code-write', 'charAt', 'string-operations'],
    explanation: 'Getting a character from a String and printing it is a common building block — you\'ll do it again when working with text.'
  },
  s17: {
    type: 'mc', world: 'strings',
    prompt: 'What does this calculate?',
    code: 'double r = 5.0;\ndouble area = Math.PI * Math.pow(r, 2);',
    options: ['The circumference of a circle', 'The area of a circle', 'The diameter of a circle', 'The volume of a sphere'],
    answer: 1,
    hint: 'πr² is a famous formula.',
    explanation: 'Math.PI * r² is the area of a circle. Math.pow(r, 2) is r squared.',
    skills: ['math-methods']
  },

  /* ==== LOOPS — Code Workshop ==== */
  l13: {
    type: 'code-read', world: 'loops',
    prompt: 'What does this loop print?',
    code: 'for (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) {\n        System.out.print(i + " ");\n    }\n}',
    options: ['1 2 3 4 5', '1 3 5', '2 4', '0 2 4'],
    answer: 2,
    hint: 'The if only lets even numbers through.',
    explanation: 'i goes 1 to 5. The condition i % 2 == 0 is true only for even numbers, so only 2 and 4 print.',
    skills: ['code-reading', 'for-loop-output', 'modulus']
  },
  l14: {
    type: 'error-spot', world: 'loops',
    prompt: 'This loop is supposed to print 1 to 10, but only prints 1 to 9. What kind of error is that?',
    code: 'for (int i = 1; i < 10; i++) {\n    System.out.println(i);\n}',
    options: [
      'Syntax error',
      'Runtime error',
      'Logical error — should be i <= 10',
      'No error, this is correct'
    ],
    answer: 2,
    hint: 'It compiles. It runs. But the answer is wrong by one.',
    explanation: 'Classic off-by-one bug. < 10 stops at 9. To include 10 you need <= 10. The program runs fine — there\'s just a logical error in the condition.',
    skills: ['error-types', 'logical-error', 'for-loop-count']
  },
  l15: {
    type: 'trace', world: 'loops',
    prompt: 'Trace product through this loop.',
    code: 'int product = 1;\nfor (int i = 1; i <= 4; i++) {\n    product = product * i;\n}',
    rows: [
      { label: 'After i = 1', answer: '1' },
      { label: 'After i = 2', answer: '2' },
      { label: 'After i = 3', answer: '6' },
      { label: 'After i = 4', answer: '24' },
    ],
    hint: 'Multiply each time. This is calculating 4 factorial.',
    explanation: 'product runs 1 → ×1 = 1 → ×2 = 2 → ×3 = 6 → ×4 = 24. That\'s 4! (four factorial).',
    skills: ['trace-table', 'for-loop-product']
  },
  l16: {
    type: 'code-write', world: 'loops',
    prompt: 'Write a loop that prints the even numbers from 2 up to 20 (inclusive), each on its own line.',
    criteria: 'Use a for loop. Print exactly: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 — each on its own line using System.out.println. Two ways are fine: increment by 2, OR increment by 1 and use an if (i % 2 == 0) check inside.',
    starter: 'public class EvenNumbers {\n    public static void main(String[] args) {\n        // your loop here\n    }\n}',
    skills: ['code-write', 'for-loop-output', 'modulus'],
    explanation: 'Counting in twos is a common loop pattern. Both approaches (increment by 2, or check with %) are acceptable solutions.'
  },
  l17: {
    type: 'mc', world: 'loops',
    prompt: 'You need to print "Hello" exactly five times. Which approach is best?',
    options: [
      'Write System.out.println("Hello"); five times in a row',
      'Use a for loop that runs 5 times with one println inside',
      'Use an if statement',
      'Both A and B are fine; B is better when the count might change'
    ],
    answer: 3,
    hint: 'Both work. One scales better.',
    explanation: 'Both work for exactly 5. But if the count needs to change later (or comes from user input) the loop is the only sensible choice. This is pattern recognition — spotting when repetition belongs in a loop.',
    skills: ['pattern-recognition', 'when-to-loop']
  },

  /* ==== LOGIC — Code Workshop ==== */
  g13: {
    type: 'code-read', world: 'logic',
    prompt: 'What does this print when n = 8?',
    code: 'if (n % 2 == 0) {\n    if (n > 5) {\n        System.out.print("big even");\n    } else {\n        System.out.print("small even");\n    }\n} else {\n    System.out.print("odd");\n}',
    options: ['odd', 'small even', 'big even', 'nothing'],
    answer: 2,
    hint: 'Walk through the outer if first, then the inner one.',
    explanation: '8 % 2 == 0 is true (it\'s even). Then n > 5 is also true (8 > 5). So the inner if runs and prints "big even".',
    skills: ['code-reading', 'nested-if', 'modulus']
  },
  g14: {
    type: 'error-spot', world: 'logic',
    prompt: 'This compiles but always says "yes" no matter what x is. What\'s wrong?',
    code: 'int x = 5;\nif (x = 10) {\n    System.out.print("yes");\n}',
    options: [
      'Nothing — that\'s correct Java',
      'Logical error — should be x == 10, not x = 10',
      'Runtime error',
      'The print statement is wrong'
    ],
    answer: 1,
    hint: 'There\'s a single = where there should be a comparison.',
    explanation: 'x = 10 is assignment, not comparison. In Java this would actually cause a compile error in a condition (because int is not boolean), but in many languages it silently passes. Either way: you wanted x == 10 (compare), not x = 10 (assign).',
    skills: ['error-types', 'logical-error', 'common-mistakes']
  },
  g15: {
    type: 'trace', world: 'logic',
    prompt: 'Trace the variable result. The user enters 72.',
    code: 'int score = 72;\nString result;\nif (score >= 80) result = "A";\nelse if (score >= 70) result = "B";\nelse if (score >= 60) result = "C";\nelse result = "F";',
    rows: [
      { label: 'score',  answer: '72' },
      { label: 'result', answer: 'B' },
    ],
    hint: 'Check each condition in order. Stop at the first true one.',
    explanation: '72 fails >= 80, but passes >= 70, so result becomes "B". The remaining branches are skipped.',
    skills: ['trace-table', 'if-else', 'nested-if']
  },
  g16: {
    type: 'code-write', world: 'logic',
    prompt: 'Write a program that asks for a temperature in °C and prints "freezing", "normal", or "hot".',
    criteria: 'Use JOptionPane to ask for the temperature. Convert with Integer.parseInt (or Double.parseDouble — both fine). Rules: below 10 = "freezing", from 10 up to (but not including) 30 = "normal", 30 or higher = "hot". Print the result with System.out.println.',
    starter: 'import javax.swing.JOptionPane;\n\npublic class TempCheck {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['code-write', 'if-else', 'nested-if'],
    explanation: 'Three-way classification with if/else if/else is one of the most common patterns in real programs.'
  },
  g17: {
    type: 'mc', world: 'logic',
    prompt: 'In Java, what is the result of: 3 > 2 && 5 < 4 || 1 == 1',
    options: ['true', 'false', 'compile error', 'depends on the variables'],
    answer: 0,
    hint: '&& has higher priority than ||. So evaluate (3>2 && 5<4) first, then OR with (1==1).',
    explanation: '&& binds tighter than ||. So: (3>2 && 5<4) becomes (true && false) = false. Then false || (1==1) = false || true = true.',
    skills: ['logical-operators', 'operator-precedence']
  },

  /* =========================================================================
     ALGORITHM TOWER — Unit 4 — Computational Thinking
     ========================================================================= */

  a1: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which computational thinking technique means "breaking a big problem into smaller parts"?',
    options: ['Pattern recognition', 'Decomposition', 'Abstraction', 'Algorithm'],
    answer: 1,
    hint: 'Think: "de-compose" = break apart.',
    explanation: 'Decomposition means dividing a complex problem into smaller, more manageable parts. Each part can then be tackled separately.',
    skills: ['decomposition']
  },
  a2: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which technique means "looking for similarities between problems or parts of a problem"?',
    options: ['Decomposition', 'Pattern recognition', 'Abstraction', 'Pseudocode'],
    answer: 1,
    hint: 'It\'s in the name.',
    explanation: 'Pattern recognition is spotting things that repeat or are similar — so you can reuse a known solution instead of inventing a new one.',
    skills: ['pattern-recognition']
  },
  a3: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which technique means "focusing on what\'s important and ignoring irrelevant detail"?',
    options: ['Decomposition', 'Pattern recognition', 'Abstraction', 'Algorithm'],
    answer: 2,
    hint: 'Like zooming in on a camera — only what\'s in the viewfinder matters.',
    explanation: 'Abstraction is the "zoom in / zoom out" idea: keep only the details that matter for the problem, drop the rest.',
    skills: ['abstraction']
  },
  a4: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which technique means "writing the step-by-step solution"?',
    options: ['Algorithm', 'Decomposition', 'Pattern recognition', 'Abstraction'],
    answer: 0,
    hint: 'A recipe is one of these.',
    explanation: 'An algorithm is the actual list of steps to follow — written as pseudocode, a flowchart, or eventually as code.',
    skills: ['algorithms']
  },

  a5: {
    type: 'mc', world: 'algorithms',
    prompt: 'A program calculates the area of a rectangle. What is the INPUT?',
    options: [
      'The area of the rectangle',
      'The length and width',
      'length × width',
      'The colour of the rectangle'
    ],
    answer: 1,
    hint: 'What does the program need from the user before it can calculate anything?',
    explanation: 'Input is the data going in. To find area, you need length and width. The colour is irrelevant — that\'s abstraction at work.',
    skills: ['ipo', 'decomposition']
  },
  a6: {
    type: 'mc', world: 'algorithms',
    prompt: 'For the same area-of-a-rectangle program, what is the PROCESSING?',
    options: [
      'Asking the user for length and width',
      'Showing the answer on screen',
      'area = length × width',
      'Storing the rectangle in memory'
    ],
    answer: 2,
    hint: 'Processing is the calculation step.',
    explanation: 'Processing is the work the program does between input and output — here, multiplying length by width.',
    skills: ['ipo']
  },
  a7: {
    type: 'mc', world: 'algorithms',
    prompt: 'For the same program, what is the OUTPUT?',
    options: [
      'The length and width entered',
      'The calculated area shown on screen',
      'Nothing',
      'The user\'s name'
    ],
    answer: 1,
    hint: 'Output is what the user sees at the end.',
    explanation: 'Output is the result displayed to the user. Here that\'s the area.',
    skills: ['ipo']
  },
  a8: {
    type: 'order', world: 'algorithms',
    prompt: 'Order these steps to calculate and display the average of three numbers.',
    items: [
      'Read three numbers from the user',
      'Calculate sum = num1 + num2 + num3',
      'Calculate average = sum / 3.0',
      'Display the average'
    ],
    answer: [0, 1, 2, 3],
    hint: 'Input first. Then calculate. Then output.',
    explanation: 'IPO order: read inputs, do the processing (sum then average), then display. You can\'t calculate before you have data.',
    skills: ['ipo', 'algorithm-order']
  },

  a9: {
    type: 'mc', world: 'algorithms',
    prompt: 'In a flowchart, which shape is used for INPUT or OUTPUT?',
    options: ['Rectangle', 'Diamond', 'Parallelogram (slanted rectangle)', 'Oval (rounded rectangle)'],
    answer: 2,
    hint: 'Slanted sides. It looks like a leaning rectangle.',
    explanation: 'A parallelogram is the input/output shape. Rectangle = statement. Diamond = decision. Oval = start/end.',
    skills: ['flowchart-symbols']
  },
  a10: {
    type: 'mc', world: 'algorithms',
    prompt: 'In a flowchart, which shape is used for START or END?',
    options: ['Rectangle', 'Diamond', 'Parallelogram', 'Oval (rounded rectangle)'],
    answer: 3,
    hint: 'Curved at the ends.',
    explanation: 'Oval (or rounded rectangle) marks where the program begins and ends.',
    skills: ['flowchart-symbols']
  },
  a11: {
    type: 'mc', world: 'algorithms',
    prompt: 'In pseudocode, what does the arrow ← mean? (e.g.  total ← 0)',
    options: [
      'Greater than',
      'Assignment — put the value on the right INTO the variable on the left',
      'Equals — check if they are the same',
      'Subtract'
    ],
    answer: 1,
    hint: 'It\'s the pseudocode version of = in Java.',
    explanation: 'In pseudocode, ← means assign. total ← 0 means "set total to 0". It avoids the confusion between = (assign) and == (compare) in Java.',
    skills: ['pseudocode']
  },
  a12: {
    type: 'tf', world: 'algorithms',
    prompt: 'Pseudocode should include variable type declarations like "int" or "double".',
    answer: false,
    hint: 'Pseudocode is meant to work with ANY programming language.',
    explanation: 'False. Pseudocode is language-independent. Different languages have different type rules, so pseudocode skips type declarations entirely.',
    skills: ['pseudocode']
  },
  a13: {
    type: 'order', world: 'algorithms',
    prompt: 'Order this pseudocode for "ask for hours and rate, work out pay".',
    items: [
      'begin',
      'input hours',
      'input rate',
      'pay ← hours * rate',
      'display "Pay is " + pay',
      'end'
    ],
    answer: [0, 1, 2, 3, 4, 5],
    hint: 'begin always first, end always last. Input before processing, processing before output.',
    explanation: 'Pseudocode always starts with "begin" and ends with "end". Inputs are read, then processing, then output. Indentation between begin and end matters when you write it on paper.',
    skills: ['pseudocode', 'algorithm-order']
  },

  a14: {
    type: 'mc', world: 'algorithms',
    prompt: 'The program won\'t compile. The IDE says "missing semicolon". What kind of error is this?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'Acceptance error'],
    answer: 0,
    hint: 'Compile-time problems are always one type.',
    explanation: 'Syntax errors are spotted by the compiler before the program runs. They\'re the easiest to find — the IDE shows you exactly where.',
    skills: ['error-types', 'syntax-error']
  },
  a15: {
    type: 'mc', world: 'algorithms',
    prompt: 'The program compiles fine. It runs. But it crashes when the user enters 0 for the divisor. What kind of error?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'No error'],
    answer: 1,
    hint: 'It happens while the program is RUNNING.',
    explanation: 'Runtime errors only show up while the program is running. Dividing by zero, square root of a negative number, parsing "abc" as int — all classic runtime errors.',
    skills: ['error-types', 'runtime-error']
  },
  a16: {
    type: 'mc', world: 'algorithms',
    prompt: 'The program compiles. It runs without crashing. But it gives the wrong answer (e.g. average of 4 and 6 returns 5 + 0). What kind of error?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'No error'],
    answer: 2,
    hint: 'No crash, no compile complaint, just a wrong answer.',
    explanation: 'Logical errors are the trickiest. The program does something, just not what you intended. They have no error message — you find them with testing and trace tables.',
    skills: ['error-types', 'logical-error']
  },
  a17: {
    type: 'mc', world: 'algorithms',
    prompt: 'A variable can hold values from 1 to 10. Which is STANDARD test data?',
    options: ['0', '5', '11', "'p'"],
    answer: 1,
    hint: 'Standard means a normal value comfortably inside the range.',
    explanation: '5 is well inside 1 to 10 — that\'s standard. 1 and 10 are extremes. 0 and 11 are extreme-incorrect. \'p\' is abnormal.',
    skills: ['testing', 'standard-data']
  },
  a18: {
    type: 'mc', world: 'algorithms',
    prompt: 'A variable can hold values from 1 to 10. Which is EXTREME test data?',
    options: ['5', '7', '1 or 10', "'p'"],
    answer: 2,
    hint: 'Extreme means right on the boundary.',
    explanation: '1 and 10 are the limits of the range — extreme test data. They check that your conditions like <= and >= work at the edges.',
    skills: ['testing', 'extreme-data']
  },
  a19: {
    type: 'mc', world: 'algorithms',
    prompt: 'A variable should hold an integer from 1 to 10. Which is ABNORMAL test data?',
    options: ['5', '1', '10', "'p' or -3"],
    answer: 3,
    hint: 'Abnormal = wrong type or definitely outside the rules.',
    explanation: 'Abnormal data is data that should never legally appear: a letter where a number is expected, a negative when only positives are valid, or special keys.',
    skills: ['testing', 'abnormal-data']
  },
  a20: {
    type: 'code-write', world: 'algorithms',
    prompt: 'Write the CalcPrice program from your textbook in Java.',
    criteria: 'Ask the user for a price (a double). Calculate discount = 5% of price. Calculate VAT = 15% of price. Calculate result = price - discount + VAT. Display the result with a clear message like "The final amount is " + result. Use JOptionPane and Double.parseDouble for input.',
    starter: 'import javax.swing.JOptionPane;\n\npublic class CalcPrice {\n    public static void main(String[] args) {\n        // input: ask for price\n\n        // processing: discount, VAT, result\n\n        // output: display the result\n    }\n}',
    skills: ['code-write', 'ipo', 'arithmetic-output'],
    explanation: 'This is the exact textbook example brought together: IPO model, abstraction, decomposition, all in one short program.'
  },

  /* =========================================================================
     OBJECT FORGE — Unit 6 — More about Objects
     ========================================================================= */

  o1: {
    type: 'mc', world: 'objects',
    prompt: 'What does the keyword new actually do?',
    options: [
      'It declares a variable',
      'It creates (instantiates) a new object in memory',
      'It deletes an object',
      'It renames a variable'
    ],
    answer: 1,
    hint: 'It\'s about bringing an object into existence.',
    explanation: 'new asks the runtime for a fresh chunk of memory and creates an object there. Without new, the variable just points to nothing (null).',
    skills: ['objects', 'new-keyword']
  },
  o2: {
    type: 'mc', world: 'objects',
    prompt: 'After this line runs, does a Gogga object exist yet?',
    code: 'Gogga bug;',
    options: [
      'Yes — bug is a fully-formed Gogga',
      'No — only a variable named bug has been declared. There\'s no object yet.',
      'It depends on the compiler',
      'Yes, but only if Gogga has a constructor'
    ],
    answer: 1,
    hint: 'Declaring is not the same as creating.',
    explanation: 'Gogga bug; just declares a variable that COULD point to a Gogga. The object itself is only created once you write bug = new Gogga();',
    skills: ['objects', 'declare-vs-instantiate']
  },
  o3: {
    type: 'mc', world: 'objects',
    prompt: 'Which line correctly declares AND instantiates a Gogga object in one statement?',
    options: [
      'Gogga bug;',
      'bug = new Gogga();',
      'Gogga bug = new Gogga();',
      'new Gogga bug;'
    ],
    answer: 2,
    hint: 'You need a type, a name, and the new keyword.',
    explanation: 'Gogga bug = new Gogga(); is the standard one-liner. It\'s exactly the same as splitting it across two lines: Gogga bug; bug = new Gogga();',
    skills: ['objects', 'declare-vs-instantiate']
  },
  o4: {
    type: 'tf', world: 'objects',
    prompt: 'A single class can be used to create many independent objects.',
    answer: true,
    hint: 'Think of a class as a dress pattern.',
    explanation: 'True. A class is like a pattern. You can make many objects from it, each with its own field values. Gogga one, Gogga two, Gogga three — independent and separate.',
    skills: ['objects', 'multiple-objects']
  },

  o5: {
    type: 'mc', world: 'objects',
    prompt: 'What is a constructor?',
    options: [
      'A method that destroys an object',
      'A special method called automatically when an object is created, used to set initial field values',
      'The main method of a program',
      'A method that prints the object'
    ],
    answer: 1,
    hint: 'It\'s called automatically by new.',
    explanation: 'A constructor has the same name as the class and runs when you say new. Its job is to set the initial values of the object\'s fields.',
    skills: ['constructors']
  },
  o6: {
    type: 'mc', world: 'objects',
    prompt: 'Which constructor signature matches the call new Gogga(3, 5)?',
    options: [
      'Gogga()',
      'Gogga(int across, int down)',
      'Gogga(Color col)',
      'Gogga(int across, int down, Color col)'
    ],
    answer: 1,
    hint: 'Match the number AND types of parameters.',
    explanation: 'Gogga(int across, int down) takes two ints, which is exactly what 3 and 5 are. Java picks the constructor whose signature matches the call.',
    skills: ['constructors', 'method-overloading']
  },
  o7: {
    type: 'mc', world: 'objects',
    prompt: 'What is it called when several methods share the same name but have different parameter lists?',
    options: ['Method recursion', 'Method overloading', 'Method inheritance', 'Method assignment'],
    answer: 1,
    hint: 'Multiple versions of the same name → over-loaded.',
    explanation: 'Method overloading lets you have several methods (or constructors) with the same name. Java picks the right one by looking at the parameters — that\'s called method resolution.',
    skills: ['method-overloading']
  },
  o8: {
    type: 'code-read', world: 'objects',
    prompt: 'How many Gogga objects are created by this code?',
    code: 'Gogga one = new Gogga();\nGogga two = new Gogga(8, 2);\nGogga three = new Gogga(Color.yellow);\nGogga four = new Gogga(2, 7, Color.blue);',
    options: ['1', '2', '3', '4'],
    answer: 3,
    hint: 'Each new makes a new object.',
    explanation: 'Four objects, each created with a different constructor. Method overloading lets the same class create objects with different starting states.',
    skills: ['code-reading', 'multiple-objects', 'method-overloading']
  },

  o9: {
    type: 'mc', world: 'objects',
    prompt: 'What is a state diagram used for?',
    options: [
      'Showing the layout of the screen',
      'Showing the current values of an object\'s fields at a point in the program',
      'Drawing flowcharts',
      'Listing the methods of a class'
    ],
    answer: 1,
    hint: 'It\'s like a snapshot of an object\'s memory.',
    explanation: 'A state diagram is a tracing tool — it shows every field of an object and its current value at a moment in time. Useful for spotting where things go wrong.',
    skills: ['state-diagram']
  },
  o10: {
    type: 'mc', world: 'objects',
    prompt: 'When creating a Color with Color(int r, int g, int b), what is the valid range for each value?',
    options: ['0 to 100', '0 to 255', '-255 to 255', '1 to 1000'],
    answer: 1,
    hint: 'It\'s an 8-bit value per channel.',
    explanation: 'Each of red, green, blue is 0 to 255 inclusive. 0 = none of that colour, 255 = maximum. Color(255, 0, 0) is pure red.',
    skills: ['color-class', 'rgb']
  },
  o11: {
    type: 'mc', world: 'objects',
    prompt: 'What does Math.random() return?',
    options: [
      'A whole number between 0 and 100',
      'A real number greater than or equal to 0 and less than 1',
      'A random integer of any size',
      'Always the same number'
    ],
    answer: 1,
    hint: 'It\'s a double in a specific range.',
    explanation: 'Math.random() returns a double value where 0 ≤ value < 1. It can hit 0 but never quite reaches 1. You scale and cast it to get other ranges.',
    skills: ['random']
  },
  o12: {
    type: 'mc', world: 'objects',
    prompt: 'Which line generates a random integer from 0 to 9 (inclusive)?',
    options: [
      '(int) Math.random() * 10',
      '(int) (Math.random() * 10)',
      'Math.random() * 10',
      '(int) Math.random() + 10'
    ],
    answer: 1,
    hint: 'Brackets matter. The cast must apply AFTER the multiply.',
    explanation: 'Without the brackets, (int) Math.random() casts to 0 first, then multiplies — always giving 0. (int)(Math.random() * 10) multiplies first, then casts. That gives 0 through 9.',
    skills: ['random', 'typecasting']
  },
  o13: {
    type: 'mc', world: 'objects',
    prompt: 'Which line generates a random integer from 1 to 10 (inclusive)?',
    options: [
      '(int) (Math.random() * 10)',
      '(int) (Math.random() * 10) + 1',
      '(int) (Math.random() * 11)',
      '(int) (Math.random() * 9) + 1'
    ],
    answer: 1,
    hint: 'Start by getting 0-9, then shift the range up by 1.',
    explanation: '(int)(Math.random() * 10) gives 0-9. Add 1 → range becomes 1-10. The general formula is: (int)(Math.random() * (B-A+1)) + A.',
    skills: ['random']
  },

  o14: {
    type: 'trace', world: 'objects',
    prompt: 'Trace bug\'s xPos and yPos. The Gogga starts at (7, 5) facing UP. Each move() goes one block in its facing direction. UP decreases yPos.',
    code: 'Gogga bug = new Gogga();\nbug.move();\nbug.move();\nbug.turnLeft(); // now facing LEFT\nbug.move();',
    rows: [
      { label: 'After line 1 — xPos', answer: '7' },
      { label: 'After line 1 — yPos', answer: '5' },
      { label: 'After line 2 — yPos', answer: '4' },
      { label: 'After line 3 — yPos', answer: '3' },
      { label: 'After line 5 — xPos', answer: '6' },
    ],
    hint: 'UP means yPos goes down by 1 each move. After turnLeft from UP, the bug now faces LEFT — xPos goes down by 1.',
    explanation: 'Default position (7, 5), facing UP. Move twice: yPos goes 5 → 4 → 3, xPos stays 7. turnLeft makes it face LEFT. Move once: xPos 7 → 6.',
    skills: ['state-diagram', 'trace-table', 'gogga']
  },
  o15: {
    type: 'mc', world: 'objects',
    prompt: 'Which line generates a random integer from 5 to 15 (inclusive)?',
    options: [
      '(int) (Math.random() * 15) + 5',
      '(int) (Math.random() * 11) + 5',
      '(int) (Math.random() * 10) + 5',
      '(int) (Math.random() * 5) + 15'
    ],
    answer: 1,
    hint: 'Number of options = B - A + 1. Then add A.',
    explanation: 'From 5 to 15 inclusive is 11 different values (15 - 5 + 1 = 11). So multiply by 11, cast, then add 5 to shift the range.',
    skills: ['random']
  },
  o16: {
    type: 'error-spot', world: 'objects',
    prompt: 'Why does this fail to compile?',
    code: 'Gogga bug;\nbug.move();\nbug.turnLeft();',
    options: [
      'turnLeft is misspelled',
      'bug is declared but never instantiated — there\'s no object to call move() on',
      'You can\'t call methods inside main',
      'Nothing — it\'s fine'
    ],
    answer: 1,
    hint: 'Look at line 1 vs line 2. What\'s missing?',
    explanation: 'Gogga bug; only declares the variable. Without bug = new Gogga(); there\'s no actual object yet. Calling .move() on a non-existent object is a problem (NullPointerException at runtime, or compile warning depending on context).',
    skills: ['objects', 'declare-vs-instantiate', 'error-types']
  },
  o17: {
    type: 'mc', world: 'objects',
    prompt: 'What colour will the Gogga be after this code?',
    code: 'Color custom = new Color(255, 0, 0);\nGogga bug = new Gogga(0, 0, custom);',
    options: ['Pure green', 'Pure blue', 'Pure red', 'White'],
    answer: 2,
    hint: 'Color(red, green, blue). Which channel is at maximum?',
    explanation: 'Color(255, 0, 0) = max red, no green, no blue → pure red. The bug is created at (0, 0) with that colour.',
    skills: ['color-class', 'rgb', 'constructors']
  },
  o18: {
    type: 'code-write', world: 'objects',
    prompt: 'Write a program that creates two Gogga objects with random RGB colours, places them at different positions, and makes each one move forward three times.',
    criteria: 'Use the it.* package and java.awt.Color. Generate three random integers (each 0-255) for the first colour and use them to make a Color object, then use that Color when creating the first Gogga. Do the same for a second Gogga at a different position. Make each one call move() three times. NetBeans should be set up with the it package — that\'s how the textbook examples work.',
    starter: 'import it.*;\nimport java.awt.Color;\n\npublic class TwoRandomGoggas {\n    public static void main(String[] args) {\n        // Random colour 1\n\n        // Random colour 2\n\n        // Two Goggas at different positions\n\n        // Make each move 3 times\n    }\n}',
    skills: ['code-write', 'random', 'color-class', 'multiple-objects'],
    explanation: 'This brings together everything from Unit 6: random numbers, the Color class, multiple objects, and method calls on each one.'
  },
};

/* =========================================================================
   STATE MANAGEMENT
   ========================================================================= */

const STORAGE_KEY = 'java-adventure-state-v1';

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    levelProgress: {},   // { 'v-l1': { stars: 2, attempted: 3, correct: 3 } }
    skillStats: {},      // { 'arithmetic-output': { correct: 4, wrong: 1 } }
    challengeAttempts: {}, // { 'v1': { attempts: 2, lastCorrect: true } }
    sessionsPlayed: 0,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'load': {
      return { ...defaultState(), ...action.payload };
    }
    case 'reset': {
      return defaultState();
    }
    case 'answer': {
      const { challengeId, correct, skills, hintUsed } = action;
      const xpDelta = correct ? (hintUsed ? 5 : 10) : 0;
      const streak = correct ? state.streak + 1 : 0;
      const skillStats = { ...state.skillStats };
      for (const sk of (skills || [])) {
        const cur = skillStats[sk] || { correct: 0, wrong: 0 };
        skillStats[sk] = {
          correct: cur.correct + (correct ? 1 : 0),
          wrong: cur.wrong + (correct ? 0 : 1),
        };
      }
      const prev = state.challengeAttempts[challengeId] || { attempts: 0, lastCorrect: false };
      return {
        ...state,
        xp: state.xp + xpDelta,
        streak,
        bestStreak: Math.max(state.bestStreak, streak),
        skillStats,
        challengeAttempts: {
          ...state.challengeAttempts,
          [challengeId]: { attempts: prev.attempts + 1, lastCorrect: correct }
        }
      };
    }
    case 'completeLevel': {
      const { levelId, attempted, correct } = action;
      const stars = scoreStars(correct, attempted);
      const prev = state.levelProgress[levelId];
      const merged = !prev || stars > prev.stars
        ? { stars, attempted, correct }
        : prev;
      return {
        ...state,
        levelProgress: { ...state.levelProgress, [levelId]: merged },
        sessionsPlayed: state.sessionsPlayed + 1,
      };
    }
    default:
      return state;
  }
}

function scoreStars(correct, attempted) {
  if (attempted === 0) return 0;
  const acc = correct / attempted;
  if (acc >= 0.95) return 3;
  if (acc >= 0.75) return 2;
  if (acc >= 0.5)  return 1;
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

function Hud({ state, onHome, onPractice, onReset }) {
  return (
    <div className="ja-card flex items-center justify-between px-4 py-3 mb-6">
      <div className="flex items-center gap-3">
        <button onClick={onHome} className="flex items-center gap-2 hover:opacity-90">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg,#5cf2ff,#a8c5ff)', color:'#0a0c12'}}>
            <Code2 size={20} strokeWidth={2.5}/>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm leading-tight ja-display" style={{fontWeight:700, letterSpacing:'-0.01em'}}>Java Adventure</div>
            <div className="text-xs ja-mono" style={{color:'var(--ink-mute)'}}>// learn by doing</div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Stat icon={<Zap size={14}/>}    label="XP"     value={state.xp}      color="cyan"/>
        <Stat icon={<Flame size={14}/>}  label="Streak" value={state.streak}  color="amber"/>
        <Stat icon={<Trophy size={14}/>} label="Best"   value={state.bestStreak} color="emerald" hideOnMobile/>
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

function WorldMap({ state, onPickWorld }) {
  return (
    <div>
      <div className="mb-8 mt-2">
        <div className="ja-mono text-xs mb-2" style={{color:'var(--ink-mute)'}}>// world_map.java</div>
        <h1 className="ja-display text-4xl sm:text-5xl mb-2" style={{fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.05}}>
          Pick a world.<br/>
          <span style={{color:'var(--ink-dim)'}}>Then make Java make sense.</span>
        </h1>
        <p className="text-base mt-3 max-w-xl" style={{color:'var(--ink-dim)'}}>
          Each world covers a unit from class. Levels get harder as you go. Three stars per level if you nail it.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {WORLDS.map(world => {
          const Icon = world.icon;
          const levels = LEVELS[world.id];
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

function LevelView({ worldId, state, onBack, onPickLevel }) {
  const world = WORLDS.find(w => w.id === worldId);
  const levels = LEVELS[worldId];
  const Icon = world.icon;

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

function ChallengeRunner({ levelId, challengeIds, onExit, onComplete, dispatch, mode = 'level' }) {
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]); // [{ id, correct, hintUsed }]

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
      hintUsed
    });
    setResults(prev => [...prev, { id: cid, correct, hintUsed }]);
  }

  function handleNext() {
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      // Done
      const correctCount = results.filter(r => r.correct).length;
      if (mode === 'level' && levelId) {
        dispatch({
          type: 'completeLevel',
          levelId,
          attempted: total,
          correct: correctCount,
        });
      }
      onComplete({ correctCount, total, results });
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

function ChallengeCard({ challenge, onAnswer, onNext, isLast }) {
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
        <FeedbackPanel correct={correct} explanation={challenge.explanation} onNext={onNext} isLast={isLast}/>
      )}
    </div>
  );
}

function labelForType(t) {
  return ({
    mc:           'multiple choice',
    tf:           'true / false',
    order:        'order the steps',
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
      <textarea
        className="ja-code-input"
        value={code}
        onChange={e => setCode(e.target.value)}
        disabled={phase === 'reviewing' || phase === 'reviewed'}
        spellCheck={false}
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

function FeedbackPanel({ correct, explanation, onNext, isLast }) {
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
      <p className="text-sm mb-4" style={{color:'var(--ink-dim)', lineHeight:1.6}}>{explanation}</p>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="ja-mono text-sm px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{background:'var(--ink)', color:'#0a0c12', fontWeight:700}}
        >
          {isLast ? 'finish' : 'next'} <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

/* ---------- SUMMARY ---------- */

function SummaryScreen({ correctCount, total, results, mode, levelName, onHome, onReplay }) {
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
                Q{i + 1} {CHALLENGES[r.id]?.skills?.[0] ? `· ${prettySkill(CHALLENGES[r.id].skills[0])}` : ''}
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
   APP ROOT
   ========================================================================= */

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, defaultState);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState({ kind: 'map' }); // map | world | level | summary | practice

  // Load progress on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window !== 'undefined' && window.storage) {
        try {
          const res = await window.storage.get(STORAGE_KEY);
          if (!cancelled && res?.value) {
            dispatch({ type: 'load', payload: JSON.parse(res.value) });
          }
        } catch (e) {
          // No saved state — fine.
        }
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Save on state change
  useEffect(() => {
    if (!loaded) return;
    if (typeof window !== 'undefined' && window.storage) {
      window.storage.set(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
    }
  }, [state, loaded]);

  function goHome() { setView({ kind: 'map' }); }

  function startLevel(levelId, worldId) {
    const level = LEVELS[worldId].find(l => l.id === levelId);
    setView({
      kind: 'level',
      levelId,
      worldId,
      challengeIds: level.challengeIds,
      levelName: level.name
    });
  }

  function startPractice() {
    // Pull weak-skill challenges; if no data yet, pull a random sample
    const skillStats = state.skillStats || {};
    const weakSkills = Object.entries(skillStats)
      .filter(([, v]) => v.correct + v.wrong >= 2 && v.correct / (v.correct + v.wrong) < 0.7)
      .map(([k]) => k);

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
      challengeIds: picked,
      levelName: 'Quick Practice'
    });
  }

  function handleResetProgress() {
    if (typeof window !== 'undefined' && window.confirm('Reset all progress? This cannot be undone.')) {
      dispatch({ type: 'reset' });
    }
  }

  return (
    <div className="ja-root min-h-screen ja-grid-bg" style={{padding:'24px 16px 80px'}}>
      <style>{styleSheet}</style>

      <div className="max-w-3xl mx-auto">
        <Hud
          state={state}
          onHome={goHome}
          onPractice={startPractice}
          onReset={handleResetProgress}
        />

        {view.kind === 'map' && (
          <WorldMap
            state={state}
            onPickWorld={(worldId) => setView({ kind: 'world', worldId })}
          />
        )}

        {view.kind === 'world' && (
          <LevelView
            worldId={view.worldId}
            state={state}
            onBack={goHome}
            onPickLevel={(levelId) => startLevel(levelId, view.worldId)}
          />
        )}

        {view.kind === 'level' && (
          <ChallengeRunner
            levelId={view.levelId}
            challengeIds={view.challengeIds}
            mode="level"
            onExit={() => setView({ kind: 'world', worldId: view.worldId })}
            onComplete={({ correctCount, total, results }) =>
              setView({ kind: 'summary', mode: 'level', levelName: view.levelName, worldId: view.worldId,
                        levelId: view.levelId, challengeIds: view.challengeIds, correctCount, total, results })
            }
            dispatch={dispatch}
          />
        )}

        {view.kind === 'practice' && (
          <ChallengeRunner
            challengeIds={view.challengeIds}
            mode="practice"
            onExit={goHome}
            onComplete={({ correctCount, total, results }) =>
              setView({ kind: 'summary', mode: 'practice', levelName: 'Quick Practice',
                        challengeIds: view.challengeIds, correctCount, total, results })
            }
            dispatch={dispatch}
          />
        )}

        {view.kind === 'summary' && (
          <SummaryScreen
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
          // angelo's java practice arena · v1
        </div>
      </div>
    </div>
  );
}
