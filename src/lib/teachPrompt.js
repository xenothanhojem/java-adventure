/*
 * Builds the "Teach me" prompts handed to an external AI tutor (Grok, ChatGPT,
 * Claude). Prompts travel in a URL query string, so they are kept short.
 */

const MAX_PROMPT_CHARS = 3500;

const SCOPE = {
  java: 'Stay within the Grade 10 Java scope: variables, String, char and Math, for, while and do...while loops, nested loops, if and switch, String comparison, boolean variables, and static void methods with no parameters and no return values. Do not use arrays, parameters, return values, classes other than the program class, exceptions or collections. Use JOptionPane for input, as the textbook does, and the Gogga class where it helps.',
  theory: 'Stay within the Grade 10 IT Theory scope and use the same terms the textbook uses.',
};

const BOOK = {
  java: '"Exploring IT: Java Programming Grade 10" (NetBeans, with the Gogga class from the it package)',
  theory: '"Exploring IT: Theory Grade 10"',
};

function intro(subjectId, studentName) {
  const who = studentName ? `a Grade 10 student called ${studentName}` : 'a Grade 10 student';
  return `You are a patient, encouraging tutor. I am ${who} studying Information Technology in South Africa (CAPS). My textbook is ${BOOK[subjectId] || BOOK.theory}.`;
}

function method(subjectId) {
  return [
    'How to teach me:',
    '1. Before teaching anything, ask me how I prefer to learn (for example step-by-step explanations, worked examples, analogies, diagrams, short quizzes, or trying things myself) and how much time I have. Wait for my answer.',
    '2. Check what I already know with one or two quick questions.',
    '3. Teach one idea at a time in short chunks, and check that I understand before moving on.',
    '4. Give me practice questions and let me try them before you show the answer. When I get something wrong, help me find the mistake instead of just giving the answer.',
    '5. Use everyday South African examples where they help.',
    `6. ${SCOPE[subjectId] || SCOPE.theory}`,
    '7. End with a short summary and three practice questions on the areas above.',
  ].join('\n');
}

function clip(text, max) {
  return text.length <= max ? text : `${text.slice(0, max - 3).trimEnd()}...`;
}

/*
 * areas: [{ name, description, unitName, accuracy, hint }]
 */
export function buildWeakAreasPrompt({ subjectId, subjectTitle, studentName, areas }) {
  const head = `${intro(subjectId, studentName)} In ${subjectTitle} I am struggling with the areas below, based on my results in a practice game.`;
  const tail = method(subjectId);

  const lines = areas.map((a, i) => {
    const score = typeof a.accuracy === 'number' ? ` (I get about ${a.accuracy}% right)` : '';
    const unit = a.unitName ? ` [${a.unitName}]` : '';
    return { base: `${i + 1}. ${a.name}${unit}${score}: ${a.description || ''}`.trim(), hint: a.hint };
  });

  const budget = MAX_PROMPT_CHARS - head.length - tail.length - 80;
  const withHints = lines.map((l) => (l.hint ? `${l.base}\n   Key points to cover: ${l.hint}` : l.base)).join('\n');
  const body = withHints.length <= budget
    ? withHints
    : clip(lines.map((l) => l.base).join('\n'), budget);

  return `${head}\n\nStruggling areas:\n${body}\n\n${tail}`;
}

/*
 * topic: a THEORY_UNITS topic ({ title, explanation, vocabulary, misconceptions, skills })
 */
export function buildTopicPrompt({ subjectId, subjectTitle, studentName, unitTitle, topic, skillHints = {} }) {
  const head = `${intro(subjectId, studentName)} I need help understanding "${topic.title}" from the unit "${unitTitle}" (${subjectTitle}).`;
  const tail = method(subjectId);

  const parts = [];
  const points = (topic.explanation || []).join(' ');
  if (points) parts.push(`My notes on this topic:\n${points}`);
  const vocab = (topic.vocabulary || []).map((v) => v.term).join(', ');
  if (vocab) parts.push(`Terms I need to know: ${vocab}`);
  const hints = (topic.skills || []).map((s) => skillHints[s]).filter(Boolean).join('; ');
  if (hints) parts.push(`Key points to cover: ${hints}`);
  const traps = (topic.misconceptions || []).join(' ');
  if (traps) parts.push(`Common mistakes to warn me about: ${traps}`);

  const budget = MAX_PROMPT_CHARS - head.length - tail.length - 20;
  const body = clip(parts.join('\n\n'), budget);

  return `${head}\n\n${body}\n\n${tail}`;
}

export const TUTORS = [
  { id: 'grok', label: 'Open in Grok', url: (p) => `https://grok.com/?q=${encodeURIComponent(p)}` },
  { id: 'chatgpt', label: 'Open in ChatGPT', url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { id: 'claude', label: 'Open in Claude', url: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
];
