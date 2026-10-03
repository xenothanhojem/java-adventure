/*
 * Serverless function: generate a practical coding test via Anthropic.
 *
 * POST /api/generate-practical-test
 * Body: { unitIds, difficulty }   unitIds from U1-U11 (U12 SQL is not part of the practical program)
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
    U1: `UNIT 1 -- Introduction to Java Programming
What has been taught:
- A Java program is a class with a main method: public class Name { public static void main(String[] args) { ... } }. The file name matches the class name.
- Comments (//), curly brackets around blocks, a semi-colon after every statement.
- Output: System.out.println() prints and moves to a new line, System.out.print() stays on the same line. Text goes in double quotes.
- Objects: Gogga bug = new Gogga(); creates an object with the new operator. Methods are called with dot notation (bug.move()).
- Syntax (compilation) errors versus logical errors. Source code is compiled to bytecode and run on the Java Virtual Machine.
- Programmer versus end user.
Vocabulary: class, object, method, field, main method, statement, comment, compile, bytecode, JVM, syntax error, logical error, output.`,

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
- Concatenation: + joins strings; "Age: " + age produces text output. "Sum " + a + b joins the numbers as text, so brackets are needed around calculations.
- Variables must be declared and given a value before use; using an uninitialised local variable is a compile error.
Vocabulary the student knows: variable, value, type, declaration, assignment, parse, convert, identifier, operator, expression, modulus, remainder, increment, decrement, precedence.`,

    U3: `UNIT 3 -- Characters, Strings and Math Class
What has been taught:
- char: stores one character in single quotes (e.g. 'A'). Different from String.
- String vs char: "A" is a String, 'A' is a char. String holds many characters, char holds exactly one.
- Escape sequences: \\n (new line), \\t (tab), \\" (quote in string), \\\\ (backslash).
- String methods: .length() returns number of characters, .charAt(index) returns character at position. Indexing starts at 0.
- Typecasting: (int) converts double to int (truncates decimal). Widening is automatic, narrowing needs explicit cast.
- Character-number relationship: characters have numeric code values. (char)65 gives 'A'. (int)'A' gives 65.
- Math class methods: Math.sqrt(x), Math.round(x), Math.abs(x), Math.pow(base, exp), Math.PI. Rounding to 2 decimals: Math.round(x * 100) / 100.0.
- Output in a dialog with JOptionPane.showMessageDialog(null, message). "" + ch turns a char into a String.
Vocabulary: char, character literal, escape sequence, index, length, typecasting, narrowing, widening, Math class.`,

    U4: `UNIT 4 -- Problem Solving using Computational Thinking
What has been taught:
- Computational thinking: decomposition, pattern recognition, abstraction and algorithms.
- Input, Processing and Output (IPO) model; choosing the data structure (variables and their types).
- Algorithms as flow charts and pseudocode.
- User friendliness: clear prompts, labelled output, a simple user interface with JOptionPane.
- Readability: meaningful names, indentation, comments.
- Syntax, run-time and logical errors.
- Testing with standard, extreme and abnormal data; acceptance testing; trace tables.
- Evaluating and optimising a solution.
- Worked examples: calculating a sales price, swopping two numbers using a temporary variable, temperature conversion.
Vocabulary: decomposition, pattern recognition, abstraction, algorithm, IPO, flow chart, pseudocode, trace table, test data, acceptance testing, optimise.`,

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
Vocabulary: loop variable, initialisation, condition, increment, decrement, iteration, accumulator, running total, off-by-one.`,

    U6: `UNIT 6 -- More about Objects
What has been taught:
- Declaring and instantiating objects with new; the variable stores the address (reference) of the object in memory.
- Constructors and constructor overloading, found from class documentation (e.g. Gogga(), Gogga(across, down), Gogga(Color), Gogga(across, down, Color), Gogga(across, down, direction, Color)).
- State diagrams showing an object's field values after each step.
- The Color class: predefined colours (Color.red) and creating colours with new Color(red, green, blue), each from 0 to 255.
- Math.random() returns a double from 0.0 up to (not including) 1.0. Scaling: (int)(Math.random() * range) + min. Generating random colours.
Vocabulary: object, instantiate, reference, constructor, overloading, state diagram, Color, RGB, Math.random(), scaling.`,

    U7: `UNIT 7 -- If Statements
What has been taught:
- Decision making: programs choose actions based on conditions that evaluate to true or false.
- Relational operators: > < >= <= == !=. The == operator tests equality (different from = assignment).
- Simple if: runs a block only when condition is true. If false, block is skipped.
- if...else: two-way decision. Exactly one branch executes.
- Nested if: an if inside another if, for multi-level decisions.
- Multiple separate if statements: independent conditions, more than one may run (different from if...else chain).
- Logical operators: && (AND -- both must be true), || (OR -- at least one true), ! (NOT -- reverses condition), and the Boolean operators & and | which always evaluate both sides. Order: brackets, NOT, AND, OR.
- Negating conditions and De Morgan's law: !(a && b) is the same as !a || !b.
- The valueless variable problem: a variable given a value only inside an if branch must be initialised first.
- Output prediction: evaluate condition first, then determine which branch executes.
Vocabulary: condition, relational operator, comparison, boolean, if, else, nested if, logical operator, AND, OR, NOT, branch.`,

    U8: `UNIT 8 -- Switch Statements and More
What has been taught:
- Comparing Strings with equals() and equalsIgnoreCase() (never ==). toUpperCase() and toLowerCase(), often before charAt(0) when reading a single character.
- word1.compareTo(word2): negative if word1 comes first alphabetically, 0 if equal, positive if it comes after.
- Trace tables for programs with if statements and loops.
- Largest and smallest: the first value sets max and min, then a loop with if (num > max) ... else if (num < min) ...
- switch on an int or char: case labels (char labels in single quotes), stacked labels (case 8: case 9: case 10:), break at the end of each case, default for invalid input, fall-through when break is missing.
- When if must be used instead of switch: ranges, relational operators, double values.
- boolean variables: boolean leap = year % 4 == 0; used as if (leap). Rewriting an if/else that sets true/false as one assignment (hot = temp >= 35;).
- Typical programs: menus (A/E/Z/S/X), mark / 10 to a symbol, days in a month, Rock Paper Scissors.
Vocabulary: equals, equalsIgnoreCase, compareTo, switch, case, break, default, fall-through, boolean.`,

    U9: `UNIT 9 -- While Loops and Do Loops
What has been taught:
- while loops designed with SITC: Select and Initialise the test variable before the loop, Test it in the while heading, Change it as the last statement in the loop.
- Input validation: repeat until the value is in range (e.g. age 0 to 120).
- Sequences with a step (multiples of 3 up to 8000) and showing N numbers per line with a counter and %.
- Adding a series until the sum is just greater than a limit, then displaying the count and sum.
- Rogue (sentinel) values (-1, -99, 0, "X"): input until the rogue value, calculating totals, counts, averages, maximum and minimum, without processing the rogue value.
- Random numbers until a stop value: (int)(Math.random() * 6) + 1 until a 6 is thrown.
- do...while loops for menus that repeat until a quit option, and for input validation.
- Common errors: missing change (infinite loop), wrong condition, a semi-colon after the while heading, || used where && is needed with !=.
- Choosing the appropriate loop: for (known count), while (may run zero times), do...while (runs at least once).
Vocabulary: while, do...while, SITC, rogue value, sentinel, infinite loop, validation, pre-test, post-test.`,

    U10: `UNIT 10 -- Nested Loops
What has been taught:
- A loop inside another loop; the inner loop runs completely for every pass of the outer loop. Counting total iterations (outer x inner).
- Blocks and patterns of characters with print and println (rows and columns of *, triangles where the outer loop controls the inner loop's limit).
- char loop variables (for (char ch = 'A'; ch <= 'E'; ch++)).
- Repeated verses of a song, multiplication tables.
- Grouped input: an outer loop for each group (e.g. each learner or each company) and an inner loop for each item, with per-group totals, averages and changes.
Vocabulary: nested loop, outer loop, inner loop, iteration, pattern, row, column.`,

    U11: `UNIT 11 -- Methods
What has been taught:
- User-defined methods of the form static void name() with NO parameters and NO return values, called from main as name();. After a call, execution continues on the next line.
- Shared data uses static class variables declared inside the class but outside every method. Variables declared inside a method are local to it.
- Decomposing a problem into task methods; merging near-identical methods into one reused method.
- Putting the inner loop of a nested loop in a method called from the outer loop in main.
- Pattern: a helper method processes ONE item (input with JOptionPane, a for loop, highest/lowest/sum logic) and leaves its result in a static class variable; main calls it in a loop (for, or while until a rogue value) and tracks the overall highest or lowest.
- Advantages of methods: decomposition, easier to find errors, readability, less repetition. Top-down versus bottom-up design.
Vocabulary: method, method call, static, class variable, local variable, decomposition, structured programming, top-down, bottom-up.`,
  };

  const knownIds = (Array.isArray(unitIds) ? unitIds : []).filter(id => unitCurriculum[id]);
  const selectedIds = knownIds.length ? knownIds : ['U2', 'U5', 'U7'];
  const maxUnit = Math.max(...selectedIds.map(id => Number(id.slice(1))));

  const unitBlock = selectedIds.map(id => unitCurriculum[id]).join('\n\n');

  const scopeRules = [
    maxUnit >= 11
      ? '- The student knows user-defined methods: you MAY ask for static void methods with no parameters and no return values, sharing data through static class variables. NEVER use parameters, return values or methods that call other user-defined methods.'
      : '- ALL code must go inside the main method. Do NOT create separate methods (no helper methods, no user-defined methods outside of main). Methods are Unit 11 and have NOT been taught yet. The ONLY method in the program is public static void main(String[] args).',
    maxUnit >= 9
      ? '- for, while and do...while loops are all allowed. Rogue value (sentinel) loops and input validation loops are allowed.'
      : '- Use ONLY for loops for repetition. Do NOT use while or do...while loops; they are Unit 9. If you need repeated processing, use a for loop with a count the user inputs at the start (e.g. "How many swimmers?"), NOT a sentinel loop.',
    maxUnit >= 10
      ? '- Nested loops are allowed.'
      : '- Do NOT use nested loops (a loop inside a loop); they are Unit 10.',
    maxUnit >= 8
      ? '- switch statements, String comparison with equals/equalsIgnoreCase/compareTo, toUpperCase/toLowerCase and boolean variables are allowed.'
      : '- Do NOT use switch statements, equals(), equalsIgnoreCase(), compareTo() or boolean variables; they are Unit 8.',
    maxUnit >= 7
      ? '- Include at least one if/else structure.'
      : '- Do NOT use if statements; they are Unit 7.',
    maxUnit >= 5
      ? '- Include at least one loop and an accumulator (sum, average, or similar).'
      : '- Do NOT use loops; they are Unit 5. Use straight-line code with input, calculation and output.',
  ].join('\n');

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
- The student has worked through the textbook units in order, so earlier units are background knowledge, but the questions must focus on the listed units. Never use a feature from a unit later than the highest listed unit.
- Use JOptionPane.showInputDialog for user input.
- Use System.out.println / System.out.print for output.
- Total marks should be 50-70.
${scopeRules}
- Include string output formatting (concatenation, tabs, team/category lists).
- Questions should specify exact output format with examples.
- The scenario must be different each time -- be creative with South African contexts (rugby, cricket, tuckshop, matric dance, load shedding tracker, taxi fare calculator, braai planner, etc.).
- Keep it Grade 10 level: NEVER use arrays, ArrayList or other collections, file I/O, try-catch, Scanner, the ternary operator, break or continue inside loops, or user-defined classes other than the program class.
- Do not use the Gogga class; the test is a text-based program.
- The starterCode should be a compilable skeleton with the class and a main method stub with TODO comments.${maxUnit >= 11 ? ' It may include empty static void method stubs if the questions ask for methods.' : ' No other methods.'}
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
    - "Store single character" (student must decide: char)${maxUnit >= 8 ? '\n    - "Store true/false" (student must decide: boolean)' : ''}
- Similarly, when asking the student to declare local variables, describe what the variable stores, not its type. For example: "Create a variable called swimTime to store the total time in seconds" (not "Create a double called swimTime").
${maxUnit >= 11 ? '- When asking for a method, describe what it must do and when main calls it; do not give the method header.' : '- Do NOT ask the student to create any methods. Everything goes inside main.'}
- The marking rubric SHOULD contain the expected types (for marking), but the question text must NOT.`;

  const userMessage = `Generate a practical coding test that focuses on these units. Stay strictly within the scope rules -- do not use any feature from a unit later than Unit ${maxUnit}.

CURRICULUM CONTENT TO FOCUS ON:

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
        model: 'claude-sonnet-4-6',
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
