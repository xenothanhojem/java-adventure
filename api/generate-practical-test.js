/*
 * Serverless function: generate a practical coding test via Anthropic.
 *
 * POST /api/generate-practical-test
 * Body: { unitIds, difficulty }
 *
 * Returns a structured practical test with scenario, questions, marking rubric,
 * and starter code -- modelled on Grade 10 SA IT practical assessment papers.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const {
    unitIds = ['U2', 'U5', 'U7'],
    difficulty = 'medium',
  } = req.body || {};

  const unitCurriculum = {
    U2: `UNIT 2 -- Integer and Real Numbers
What has been taught:
- Variables: named memory locations with a name, type, and value. Variables can change during execution.
- Data types: String (text in double quotes), int (whole numbers), double (decimal/real numbers).
- Input: JOptionPane.showInputDialog() returns user input as text (String).
- Parsing: Integer.parseInt() converts String to int, Double.parseDouble() converts String to double. Input must be parsed before arithmetic.
- Assignment: the = operator stores a value. Reassignment overwrites the old value.
- Identifiers: valid variable names cannot start with a digit, cannot have spaces, cannot be Java keywords. Good names are meaningful (e.g. totalScore, not x).
- Arithmetic operators: + - * / % (modulus = remainder).
- Integer division: 5/2 gives 2 (decimal discarded when both operands are int).
- Remainder: 5%2 gives 1.
- Order of operations: brackets first, then * / %, then + -.
- Increment/decrement: x++, x--, +=, -=, *=, /=.
- Concatenation: + joins strings; "Age: " + age produces text output.
Vocabulary the student knows: variable, value, type, declaration, assignment, parse, convert, identifier, operator, expression, modulus, remainder, increment, decrement, precedence.
What is NOT in this unit: arrays, methods outside main, while loops, file I/O, try-catch.`,

    U3: `UNIT 3 -- Characters, Strings and Math Class
What has been taught:
- char: stores one character in single quotes (e.g. 'A'). Different from String.
- String vs char: "A" is a String, 'A' is a char. String holds many characters, char holds exactly one.
- Escape sequences: \\n (new line), \\t (tab), \\" (quote in string), \\\\ (backslash).
- String methods: .length() returns number of characters, .charAt(index) returns character at position. Indexing starts at 0.
- Typecasting: (int) converts double to int (truncates decimal). Widening is automatic, narrowing needs explicit cast.
- Character-number relationship: characters have numeric code values. (char)65 gives 'A'. (int)'A' gives 65.
- Math class methods: Math.sqrt(x), Math.round(x), Math.abs(x), Math.pow(base, exp), Math.PI.
Vocabulary: char, character literal, escape sequence, index, length, typecasting, narrowing, widening, Math class.
What is NOT in this unit: substring(), equals(), compareTo(), Scanner, methods outside main.`,

    U5: `UNIT 5 -- For Loops
What has been taught:
- Repetition: loops repeat instructions efficiently instead of duplicating code.
- For loop structure: initial value, condition, increment/decrement, loop body. Loop stops when condition becomes false.
- Counting iterations: depends on start value, condition (< vs <=), and step size.
- Count-up and count-down loops. Custom step sizes (i += 2, i -= 3, etc.).
- Char loops: character variables can be loop counters (e.g. looping from 'A' to 'Z').
- Loop output: printing values or patterns controlled by the loop variable.
- Accumulators: running total inside a loop (sum += value), calculating averages (total / count).
- Loop errors: loop that never runs (condition false at start), infinite loop (condition never false), off-by-one errors (< vs <=).
Vocabulary: loop variable, initialisation, condition, increment, decrement, iteration, accumulator, running total, off-by-one.
What is NOT in this unit: while loops, do-while loops, nested loops (only basic single for loops), break/continue, methods outside main.`,

    U6: `UNIT 6 -- Objects (limited scope)
What has been taught:
- Classes as blueprints for objects. Object state (fields/properties).
- Constructors and overloading constructors.
- Math.random() for generating random numbers. Scaling random: (int)(Math.random() * range) + min.
- Color class basics.
Vocabulary: class, object, constructor, overloading, state, Math.random().
What is NOT in this unit: writing custom methods, return types, parameters, encapsulation, inheritance.`,

    U7: `UNIT 7 -- If Statements
What has been taught:
- Decision making: programs choose actions based on conditions that evaluate to true or false.
- Relational operators: > < >= <= == !=. The == operator tests equality (different from = assignment).
- Simple if: runs a block only when condition is true. If false, block is skipped.
- if...else: two-way decision. Exactly one branch executes.
- Nested if: an if inside another if, for multi-level decisions.
- Multiple separate if statements: independent conditions, more than one may run (different from if...else chain).
- Logical operators: && (AND -- both must be true), || (OR -- at least one true), ! (NOT -- reverses condition).
- Output prediction: evaluate condition first, then determine which branch executes.
Vocabulary: condition, relational operator, comparison, boolean, if, else, nested if, logical operator, AND, OR, NOT, branch.
What is NOT in this unit: switch statements, ternary operator, methods outside main.`,

    UB: `BINARY MODULE -- Binary Calculations and Conversions
What has been taught:
- Number systems: decimal (base 10, digits 0-9), binary (base 2, digits 0-1).
- Why computers use binary: electronic components have two states (on/off, 1/0).
- Binary place values: powers of 2 from right to left (1, 2, 4, 8, 16, 32, 64, 128).
- Binary to decimal: multiply each bit by its place value, add results.
- Decimal to binary: repeated division by 2, reading remainders bottom to top.
- Binary addition: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (carry 1). Multi-bit addition with carries.
- Binary subtraction: basic borrowing concept.
- Bits and bytes: 1 byte = 8 bits. Kilobyte, megabyte, gigabyte terminology.
This is a THEORY module -- it does not involve Java programming.`,
  };

  const unitBlock = unitIds
    .filter(id => id !== 'UB')
    .map(id => unitCurriculum[id] || `  ${id}: General Java Grade 10`)
    .join('\n\n');

  const systemPrompt = `You are an expert Grade 10 Java teacher in South Africa creating practical coding test papers. You use the "Exploring IT: Java Programming" textbook and NetBeans IDE.

You create tests modelled on real SA IT practical assessments -- a realistic scenario with a class, variables, loops, conditions, and output formatting. Think of tests like: a swimming team manager, a restaurant ordering system, a school marks calculator, a game score tracker, a shop inventory system, etc.

Generate a COMPLETE practical test as a JSON object. STRICT FORMAT -- no prose, no markdown fences, just valid JSON.

The JSON shape:
{
  "title": "Short test title (e.g. 'Restaurant Order System')",
  "scenario": "2-3 sentence real-world scenario description",
  "totalMarks": <number>,
  "className": "PascalCase class name for the program",
  "sections": [
    {
      "number": "2",
      "title": "Section title (e.g. 'RestaurantOrder class')",
      "marks": <number>,
      "questions": [
        {
          "number": "2.1",
          "text": "Full question text exactly as it would appear on the test paper",
          "marks": <number>,
          "skills": ["U2-S3", "U7-S1"]
        }
      ]
    }
  ],
  "sampleOutput": "Full expected sample output as it would appear on the paper, using \\n for newlines",
  "starterCode": "Minimal Java class skeleton with the class name, main method, and TODO comments for each section",
  "markingRubric": [
    {
      "questionNumber": "2.1",
      "criteria": "What specifically to check in the student's code",
      "marks": <number>
    }
  ]
}

RULES:
- The test MUST integrate concepts from the listed units naturally into ONE cohesive program.
- ONLY use concepts, vocabulary, and Java features explicitly listed in the curriculum content provided. If something is listed under "What is NOT in this unit", do NOT include it in the test. The student has not learned it yet.
- Use JOptionPane.showInputDialog for user input.
- Use System.out.println / System.out.print for output.
- Total marks should be 50-70.
- Include at least one for loop and at least one if/else structure.
- ALL code must go inside the main method. Do NOT create separate methods (no helper methods, no user-defined methods outside of main). Methods/subroutines are Unit 11 and have NOT been taught yet. The ONLY method in the program is public static void main(String[] args).
- Use ONLY for loops for repetition. Do NOT use while loops -- they are not part of the curriculum. If you need repeated processing (e.g. processing multiple items), use a for loop with a fixed count that the user inputs at the start (e.g. "How many swimmers?"), NOT a sentinel/flag loop.
- Include arithmetic (sum, average, or similar accumulator).
- Include string output formatting (concatenation, tabs, team/category lists).
- Questions should specify exact output format with examples.
- The scenario must be different each time -- be creative with South African contexts (rugby, cricket, tuckshop, matric dance, load shedding tracker, taxi fare calculator, braai planner, etc.).
- Keep it Grade 10 level: no arrays, no ArrayList, no file I/O, no try-catch, no user-defined methods. Only basic Java.
- The starterCode should be a compilable skeleton with the class and a main method stub with TODO comments. No other methods.
- Make section numbering start at 2 (section 1 is typically "create the project" which we skip).
- Return ONLY the JSON. No explanation, no markdown.

CRITICAL -- QUESTION WORDING STYLE:
- NEVER reveal Java types in the question text. The student must choose the correct type themselves -- that IS the assessment.
- When asking the student to declare variables, present them in a TABLE format inside the question text, listing each variable name alongside a plain-English storage description. Use this exact pattern:

  "Declare the following variables in your program. Choose the appropriate types for each variable.\\n\\nVariable | Description\\n---|---\\nitemName | Store text\\ntotalCount | Store whole number\\naverageScore | Store real number\\ncategoryList | Store text"

  NEVER write "int totalCount" or "double averageScore" or "(String)" in the question. Use ONLY:
    - "Store text" (student must decide: String)
    - "Store whole number" (student must decide: int)
    - "Store real number" (student must decide: double)
    - "Store single character" (student must decide: char)
    - "Store true/false" (student must decide: boolean)
- Similarly, when asking the student to declare local variables, describe what the variable stores, not its type. For example: "Create a variable called swimTime to store the total time in seconds" (not "Create a double called swimTime").
- Do NOT ask the student to create any methods. Everything goes inside main.
- The marking rubric SHOULD contain the expected types (for marking), but the question text must NOT.`;

  const userMessage = `Generate a practical coding test that integrates concepts from ONLY these units. Stay strictly within the scope described -- do not use any concept listed under "What is NOT in this unit".

CURRICULUM CONTENT THE STUDENT HAS LEARNED:

${unitBlock}

Difficulty: ${difficulty}

Create a fresh, unique scenario. Return the JSON object.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 6000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return res.status(response.status).json({
        error: `Anthropic API error: ${response.status}`,
        details: body,
      });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      return res.status(502).json({
        error: 'Failed to parse generated test JSON',
        details: parseErr.message,
        raw: text.slice(0, 800),
      });
    }

    if (!parsed.title || !parsed.sections || !parsed.starterCode) {
      return res.status(502).json({ error: 'Generated test missing required fields' });
    }

    return res.status(200).json({ test: parsed });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
