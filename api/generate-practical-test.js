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

  const unitDescriptions = {
    U2: 'Variables, data types (int, double, String), arithmetic (+,-,*,/,%), Integer.parseInt, Double.parseDouble, JOptionPane input, assignment, increment/decrement',
    U3: 'char vs String, escape sequences, length(), charAt(), typecasting, Math.sqrt/round/abs/pow/PI, character codes',
    U4: 'Computational thinking, IPO model, pseudocode, flowcharts, error types, test data, trace tables',
    U5: 'For loops (counting, backward, char loops, step sizes, accumulators for sum/average, nested loops)',
    U6: 'Classes, constructors, overloading, object state, Color class, Math.random()',
    U7: 'If/else, nested if, relational operators (==,!=,<,<=,>,>=), logical operators (&&,||,!), multiple conditions',
    UB: 'Binary number systems, place value, binary-decimal conversions, binary addition/subtraction, bits and bytes',
  };

  const unitBlock = unitIds
    .map(id => `  ${id}: ${unitDescriptions[id] || 'General Java Grade 10'}`)
    .join('\n');

  const systemPrompt = `You are an expert Grade 10 Java teacher in South Africa creating practical coding test papers. You use the "Exploring IT: Java Programming" textbook and NetBeans IDE.

You create tests modelled on real SA IT practical assessments -- a realistic scenario with a class, global variables, methods, loops, conditions, and output formatting. Think of tests like: a swimming team manager, a restaurant ordering system, a school marks calculator, a game score tracker, a shop inventory system, etc.

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
- Use JOptionPane.showInputDialog for user input.
- Use System.out.println / System.out.print for output.
- Total marks should be 50-70.
- Include at least one for loop, at least one if/else structure, at least one method besides main.
- Use ONLY for loops for repetition. Do NOT use while loops -- they are not part of the curriculum. If you need repeated processing (e.g. processing multiple items), use a for loop with a fixed count that the user inputs at the start (e.g. "How many swimmers?"), NOT a sentinel/flag loop.
- Include arithmetic (sum, average, or similar accumulator).
- Include string output formatting (concatenation, tabs, team/category lists).
- Questions should specify exact output format with examples.
- The scenario must be different each time -- be creative with South African contexts (rugby, cricket, tuckshop, matric dance, load shedding tracker, taxi fare calculator, braai planner, etc.).
- Keep it Grade 10 level: no arrays, no ArrayList, no file I/O, no try-catch. Only basic Java.
- The starterCode should be a compilable skeleton with the class, main method stub, and method stubs with TODO comments.
- Make section numbering start at 2 (section 1 is typically "create the project" which we skip).
- Return ONLY the JSON. No explanation, no markdown.

CRITICAL -- QUESTION WORDING STYLE:
- NEVER reveal Java types in the question text. The student must choose the correct type themselves -- that IS the assessment.
- When asking the student to declare global variables, present them in a TABLE format inside the question text, listing each variable name alongside a plain-English storage description. Use this exact pattern:

  "In the program called ClassName add the following global variables that will be accessible throughout the program. Choose the appropriate types for each variable.\\n\\nVariable | Description\\n---|---\\nitemName | Store text\\ntotalCount | Store whole number\\naverageScore | Store real number\\ncategoryList | Store text"

  NEVER write "int totalCount" or "double averageScore" or "(String)" in the question. Use ONLY:
    - "Store text" (student must decide: String)
    - "Store whole number" (student must decide: int)
    - "Store real number" (student must decide: double)
    - "Store single character" (student must decide: char)
    - "Store true/false" (student must decide: boolean)
- Similarly, when asking the student to declare local variables inside methods, describe what the variable stores, not its type. For example: "Create a variable called swimTime to store the total time in seconds" (not "Create a double called swimTime").
- For method signatures, describe the return/parameter purpose, don't give the signature. For example: "Write a method called processOrder that accepts the customer's name and returns nothing" rather than "Write void processOrder(String name)".
- The marking rubric SHOULD contain the expected types (for marking), but the question text must NOT.`;

  const userMessage = `Generate a practical coding test that integrates these units:
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
