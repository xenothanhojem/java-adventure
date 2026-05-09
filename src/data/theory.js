/*
 * Theory content structured from the Application Learning Units Content Map.
 * Each unit contains topics with explanations, vocabulary, worked examples,
 * misconceptions, and assessment questions for testing conceptual understanding.
 *
 * Question types:
 *   define    - learner must define a term
 *   explain   - learner must explain a concept or reason
 *   identify  - learner picks the correct item from options
 *   distinguish - learner compares two related concepts
 *   predict   - learner predicts output or result
 *   classify  - learner categorises an item
 *   calculate - learner performs a calculation or conversion
 *   sequence  - learner orders steps correctly
 */

export const THEORY_UNITS = [
  // ===================================================================
  // UNIT 2 - Integer and Real Numbers
  // ===================================================================
  {
    unitId: 'U2',
    title: 'Integer and Real Numbers',
    purpose: 'Introduces variables, data storage, input, numeric conversion, and arithmetic operations in Java.',
    outcomes: [
      'Explain what a variable is',
      'Identify and use String, int, and double',
      'Explain how user input is read',
      'Explain why numeric input often needs conversion',
      'Use arithmetic operators correctly',
      'Explain integer division and remainder',
      'Recognise good variable names',
      'Explain assignment and overwriting',
    ],
    topics: [
      {
        id: 'U2-T1',
        title: 'Variables',
        skills: ['U2-S1'],
        explanation: [
          'A variable is a named memory location that stores a value while the program runs.',
          'Every variable has three key parts: a name, a type, and a value.',
          'Variables allow programs to remember and work with data. Without them, every piece of information would be lost immediately.',
          'The value stored in a variable may change during execution -- that is why it is called a "variable".',
        ],
        vocabulary: [
          { term: 'variable', definition: 'A named memory location that stores a value.' },
          { term: 'value', definition: 'The data stored inside a variable at a given moment.' },
          { term: 'type', definition: 'The kind of data a variable can hold (e.g. int, double, String).' },
          { term: 'memory', definition: 'The temporary storage a computer uses while running programs.' },
          { term: 'declaration', definition: 'The statement that creates a variable with a name and type.' },
          { term: 'assignment', definition: 'The act of storing a value in a variable using the = operator.' },
        ],
        workedExamples: [
          { code: 'int age = 15;', explanation: 'Declares an integer variable called age and stores the value 15.' },
          { code: 'String name = "Angelo";', explanation: 'Declares a String variable called name and stores the text "Angelo".' },
          { code: 'int x = 5;\nx = 10;', explanation: 'First x holds 5, then the second line overwrites it with 10. The old value is gone.' },
        ],
        misconceptions: [
          'Thinking a variable IS the literal value rather than a container that holds it.',
          'Thinking variables never change once set.',
          'Not understanding the role of the data type in controlling what a variable can store.',
        ],
        questions: [
          {
            id: 'U2-T1-Q1', type: 'mc', category: 'define',
            prompt: 'What is a variable in Java?',
            options: [
              'A fixed number that never changes',
              'A named memory location that stores a value',
              'A line of code that prints output',
              'The name of a Java program',
            ],
            answer: 1,
            hint: 'Think about what stores data while a program runs.',
            explanation: 'A variable is a named memory location. It has a name, a type, and a value that can change during execution.',
            skills: ['U2-S1'],
          },
          {
            id: 'U2-T1-Q2', type: 'mc', category: 'explain',
            prompt: 'Why are variables useful in programming?',
            options: [
              'They make the code run faster',
              'They allow programs to store and work with data',
              'They prevent errors from occurring',
              'They display information on screen',
            ],
            answer: 1,
            hint: 'Without variables, programs cannot remember anything.',
            explanation: 'Variables let programs store, retrieve, and manipulate data. Without them, all information would be lost immediately.',
            skills: ['U2-S1'],
          },
          {
            id: 'U2-T1-Q3', type: 'mc', category: 'identify',
            prompt: 'In the code `int score = 100;`, what is the variable name?',
            options: ['int', 'score', '100', '='],
            answer: 1,
            hint: 'The name comes between the type and the = sign.',
            explanation: 'The variable name is "score". "int" is the type, "100" is the value, and "=" is the assignment operator.',
            skills: ['U2-S1'],
          },
          {
            id: 'U2-T1-Q4', type: 'mc', category: 'distinguish',
            prompt: 'What is the difference between a variable name and the value stored in it?',
            options: [
              'There is no difference',
              'The name is what you call it; the value is the data it currently holds',
              'The name changes but the value stays the same',
              'The value is always a number',
            ],
            answer: 1,
            hint: 'A name labels the storage location; the value is what is inside.',
            explanation: 'The name identifies the variable (like a label on a box). The value is the actual data inside it, and it can change.',
            skills: ['U2-S1'],
          },
        ],
      },
      {
        id: 'U2-T2',
        title: 'Input from the user',
        skills: ['U2-S2'],
        explanation: [
          'Programs often need values from the user to do useful work.',
          'In Java, JOptionPane.showInputDialog() displays a prompt and waits for the user to type something.',
          'The value returned by showInputDialog() is always a String -- even if the user types a number.',
          'This means you must convert (parse) the text into a number before doing calculations.',
        ],
        vocabulary: [
          { term: 'input', definition: 'Data provided to a program by the user.' },
          { term: 'prompt', definition: 'A message that tells the user what to type.' },
          { term: 'dialog box', definition: 'A small window that appears for the user to enter data.' },
          { term: 'return value', definition: 'The result a method gives back when it finishes.' },
        ],
        workedExamples: [
          { code: 'String name = JOptionPane.showInputDialog("Enter your name:");', explanation: 'Shows a dialog box asking for the user\'s name. The text they type is stored in the variable name.' },
          { code: 'String ageText = JOptionPane.showInputDialog("Enter your age:");', explanation: 'Even though the user types a number like 16, the dialog returns the text "16" as a String. You need to parse it to use it in calculations.' },
        ],
        misconceptions: [
          'Assuming dialog input automatically becomes a number -- it always comes in as text first.',
          'Confusing input (data coming IN) with output (data going OUT).',
        ],
        questions: [
          {
            id: 'U2-T2-Q1', type: 'mc', category: 'explain',
            prompt: 'What does JOptionPane.showInputDialog() return?',
            options: ['An integer', 'A double', 'A String', 'Nothing'],
            answer: 2,
            hint: 'Dialog boxes always return text.',
            explanation: 'showInputDialog() always returns a String, even if the user types a number. You must convert it if you need a numeric type.',
            skills: ['U2-S2'],
          },
          {
            id: 'U2-T2-Q2', type: 'tf', category: 'explain',
            prompt: 'If a user types 42 into a showInputDialog, the program receives the integer 42.',
            answer: false,
            hint: 'What type does the dialog return?',
            explanation: 'False. The dialog returns the String "42", not the integer 42. You must use Integer.parseInt() to convert it.',
            skills: ['U2-S2'],
          },
        ],
      },
      {
        id: 'U2-T3',
        title: 'String values',
        skills: ['U2-S3'],
        explanation: [
          'A String stores a sequence of text characters.',
          'Strings must be enclosed in double quotation marks, e.g. "Hello".',
          'Strings can be combined using the + operator -- this is called concatenation.',
          'A String that looks like a number (e.g. "25") is NOT a number. You cannot do arithmetic with it directly.',
        ],
        vocabulary: [
          { term: 'String', definition: 'A data type that stores a sequence of characters (text).' },
          { term: 'concatenation', definition: 'Joining two strings together using the + operator.' },
          { term: 'literal', definition: 'A fixed value written directly in code, like "Hello" or 42.' },
        ],
        workedExamples: [
          { code: 'String greeting = "Hello" + " " + "World";', explanation: 'Concatenation joins three strings into "Hello World".' },
          { code: '"5" + "3"', explanation: 'This gives "53" (concatenation), NOT 8 (addition). Both values are Strings.' },
        ],
        misconceptions: [
          'Thinking "25" is the same as 25 -- one is text, the other is a number.',
          'Confusing concatenation with arithmetic addition when + is used with Strings.',
        ],
        questions: [
          {
            id: 'U2-T3-Q1', type: 'mc', category: 'explain',
            prompt: 'Why is "25" NOT the same as 25 in Java?',
            options: [
              'They are the same',
              '"25" is text (String); 25 is a number (int). You cannot do maths on text.',
              '"25" is bigger than 25',
              'Java does not allow numbers in quotes',
            ],
            answer: 1,
            hint: 'One is in double quotes, making it text.',
            explanation: '"25" is a String literal -- Java treats it as text, not a number. 25 (no quotes) is an int you can calculate with.',
            skills: ['U2-S3'],
          },
          {
            id: 'U2-T3-Q2', type: 'mc', category: 'predict',
            prompt: 'What does "Hello" + " " + "World" produce?',
            options: ['HelloWorld', 'Hello World', 'Hello + World', 'Error'],
            answer: 1,
            hint: 'The + operator joins strings together, including the space.',
            explanation: 'String concatenation joins "Hello", " ", and "World" into "Hello World".',
            skills: ['U2-S3'],
          },
        ],
      },
      {
        id: 'U2-T4',
        title: 'Integer values (int)',
        skills: ['U2-S3'],
        explanation: [
          'int stores whole numbers only -- no decimal point.',
          'Integers can be positive or negative: 42, -7, 0.',
          'Use int when values are countable and never need fractions: ages, counts, quantities.',
        ],
        vocabulary: [
          { term: 'integer', definition: 'A whole number with no fractional part.' },
          { term: 'whole number', definition: 'A number without decimals: ..., -2, -1, 0, 1, 2, ...' },
        ],
        misconceptions: [
          'Trying to store decimal values in an int -- the decimal part gets chopped off.',
          'Choosing int for money amounts with cents (use double instead).',
        ],
        questions: [
          {
            id: 'U2-T4-Q1', type: 'mc', category: 'define',
            prompt: 'What kind of values does int store?',
            options: ['Decimal numbers', 'Whole numbers only', 'Text values', 'True or false'],
            answer: 1,
            hint: 'int cannot hold a decimal point.',
            explanation: 'int stores whole numbers (integers) like 5, -3, or 100. It cannot store 3.14.',
            skills: ['U2-S3'],
          },
          {
            id: 'U2-T4-Q2', type: 'mc', category: 'classify',
            prompt: 'Which value should NOT be stored as an int?',
            options: ['A person\'s age (16)', 'Number of students (30)', 'A price with cents (R49.99)', 'A year (2026)'],
            answer: 2,
            hint: 'Which one has a decimal part?',
            explanation: 'R49.99 has cents (a decimal part) so it needs double, not int.',
            skills: ['U2-S3'],
          },
        ],
      },
      {
        id: 'U2-T5',
        title: 'Real values (double)',
        skills: ['U2-S3'],
        explanation: [
          'double stores numbers with decimal values -- real numbers.',
          'Use double when precision matters: prices, averages, distances, measurements.',
          'double is not just for "big" numbers. A small value like 0.5 also needs double.',
        ],
        vocabulary: [
          { term: 'double', definition: 'A data type for real numbers (numbers with decimal parts).' },
          { term: 'real number', definition: 'A number that may include a fractional (decimal) component.' },
        ],
        misconceptions: [
          'Assuming double is only for very large numbers.',
          'Not realising that any value with a decimal point requires a decimal-capable type.',
        ],
        questions: [
          {
            id: 'U2-T5-Q1', type: 'mc', category: 'explain',
            prompt: 'When should you use double instead of int?',
            options: [
              'When the number is very large',
              'When the value might have a decimal part',
              'When the variable name is long',
              'When the value is negative',
            ],
            answer: 1,
            hint: 'Think about what int cannot store.',
            explanation: 'Use double whenever the value may include decimal places (e.g. 3.14, 49.99, 0.5). int drops the decimals.',
            skills: ['U2-S3'],
          },
          {
            id: 'U2-T5-Q2', type: 'mc', category: 'classify',
            prompt: 'Classify each: age=16, average=82.5, count=30, price=R9.99. How many need double?',
            options: ['1', '2', '3', '4'],
            answer: 1,
            hint: 'Count the values that have decimal parts.',
            explanation: 'average (82.5) and price (R9.99) have decimals, so 2 values need double. Age and count are whole numbers (int).',
            skills: ['U2-S3'],
          },
        ],
      },
      {
        id: 'U2-T6',
        title: 'Parsing and conversion',
        skills: ['U2-S4'],
        explanation: [
          'User input from a dialog is always text (String).',
          'To perform calculations, you must convert the text to a number first.',
          'Integer.parseInt() converts a String to an int: Integer.parseInt("42") gives 42.',
          'Double.parseDouble() converts a String to a double: Double.parseDouble("3.14") gives 3.14.',
          'Using the wrong method or skipping conversion will cause errors.',
        ],
        vocabulary: [
          { term: 'parse', definition: 'To analyse and convert text into a different data type.' },
          { term: 'convert', definition: 'To change data from one type to another.' },
        ],
        workedExamples: [
          { code: 'String input = "42";\nint age = Integer.parseInt(input);', explanation: 'Converts the String "42" into the integer 42 so you can do maths with it.' },
          { code: 'String input = "3.14";\ndouble pi = Double.parseDouble(input);', explanation: 'Converts the String "3.14" into the double 3.14.' },
        ],
        misconceptions: [
          'Assuming parse methods are optional -- if you skip them, "42" stays text and + means concatenation, not addition.',
          'Using Integer.parseInt when the value has decimals (use Double.parseDouble instead).',
        ],
        questions: [
          {
            id: 'U2-T6-Q1', type: 'mc', category: 'explain',
            prompt: 'What does Integer.parseInt("25") do?',
            options: [
              'Prints 25 on screen',
              'Converts the String "25" into the integer 25',
              'Checks if 25 is positive',
              'Creates a new String',
            ],
            answer: 1,
            hint: 'parseInt converts text to a whole number.',
            explanation: 'Integer.parseInt() takes a String that looks like a number and converts it to an actual int value.',
            skills: ['U2-S4'],
          },
          {
            id: 'U2-T6-Q2', type: 'mc', category: 'identify',
            prompt: 'A user enters "7.5" in a dialog. Which method converts this to a number?',
            options: ['Integer.parseInt()', 'Double.parseDouble()', 'String.valueOf()', 'Math.round()'],
            answer: 1,
            hint: '7.5 has a decimal part -- which type handles decimals?',
            explanation: 'Double.parseDouble() handles decimal numbers. Integer.parseInt() would crash on "7.5" because it is not a whole number.',
            skills: ['U2-S4'],
          },
        ],
      },
      {
        id: 'U2-T7',
        title: 'Assignment and overwriting',
        skills: ['U2-S7'],
        explanation: [
          'Assignment means storing a value in a variable using the = operator.',
          'In Java, = does NOT mean "equals" like in maths. It means "store this value".',
          'When you assign a new value, the old value is lost -- it is overwritten.',
          'The first assignment to a new variable is called initialisation.',
        ],
        vocabulary: [
          { term: 'assignment', definition: 'Storing a value in a variable using =.' },
          { term: 'initialisation', definition: 'The first time a variable is given a value.' },
          { term: 'overwrite', definition: 'Replacing the existing value with a new one.' },
        ],
        workedExamples: [
          { code: 'int x = 5;\nx = 10;', explanation: 'x starts at 5. The second line overwrites it. Now x is 10. The value 5 is lost.' },
        ],
        misconceptions: [
          'Reading = as mathematical equality. In Java, x = x + 1 makes perfect sense -- it means "take x, add 1, store the result back in x".',
          'Not understanding that a later assignment completely replaces the earlier one.',
        ],
        questions: [
          {
            id: 'U2-T7-Q1', type: 'mc', category: 'explain',
            prompt: 'What does the = operator do in Java?',
            options: [
              'Tests if two values are equal',
              'Stores the right-side value into the left-side variable',
              'Adds two values together',
              'Compares two Strings',
            ],
            answer: 1,
            hint: 'In Java, = is assignment, not equality.',
            explanation: 'The = operator stores (assigns) the value on the right into the variable on the left. Equality testing uses ==.',
            skills: ['U2-S7'],
          },
          {
            id: 'U2-T7-Q2', type: 'mc', category: 'predict',
            prompt: 'What is x after these lines?\n\nint x = 3;\nx = 7;\nx = 1;',
            options: ['3', '7', '1', '11'],
            answer: 2,
            hint: 'Each assignment overwrites the previous value.',
            explanation: 'x is set to 3, then overwritten to 7, then overwritten to 1. The final value is 1.',
            skills: ['U2-S7'],
          },
        ],
      },
      {
        id: 'U2-T8',
        title: 'Identifiers and naming rules',
        skills: ['U2-S8'],
        explanation: [
          'An identifier is the name you give a variable (or class, method, etc.).',
          'Good identifiers are meaningful and readable: studentAge is better than sa.',
          'Identifiers cannot contain spaces.',
          'Identifiers cannot start with a digit (2ndPlace is invalid).',
          'Reserved keywords like int, for, if cannot be used as variable names.',
        ],
        vocabulary: [
          { term: 'identifier', definition: 'A name given to a variable, class, or method.' },
          { term: 'keyword', definition: 'A word reserved by Java that cannot be used as an identifier.' },
          { term: 'naming convention', definition: 'An agreed style for naming, e.g. camelCase for variables.' },
        ],
        misconceptions: [
          'Putting spaces in variable names (my score is invalid; use myScore).',
          'Starting a name with a digit (2nd is invalid; use second).',
          'Using reserved keywords as names (int, for, class cannot be variable names).',
        ],
        questions: [
          {
            id: 'U2-T8-Q1', type: 'mc', category: 'identify',
            prompt: 'Which of these is a VALID variable name?',
            options: ['1stPlace', 'my score', 'totalSum', 'for'],
            answer: 2,
            hint: 'Check: no spaces, no digit start, no keywords.',
            explanation: '1stPlace starts with a digit, "my score" has a space, "for" is a keyword. Only totalSum is valid.',
            skills: ['U2-S8'],
          },
          {
            id: 'U2-T8-Q2', type: 'mc', category: 'explain',
            prompt: 'Why is the variable name "x" worse than "studentAge"?',
            options: [
              'x is a reserved keyword',
              'x does not describe what the variable stores',
              'x causes a compile error',
              'Single-letter names are not allowed',
            ],
            answer: 1,
            hint: 'Good names tell you what the data represents.',
            explanation: '"x" is valid but meaningless. "studentAge" tells anyone reading the code exactly what the variable stores.',
            skills: ['U2-S8'],
          },
        ],
      },
      {
        id: 'U2-T9',
        title: 'Arithmetic operators',
        skills: ['U2-S5'],
        explanation: [
          '+ adds numbers (or concatenates strings).',
          '- subtracts.',
          '* multiplies.',
          '/ divides.',
          '% (modulus) gives the remainder after division.',
        ],
        vocabulary: [
          { term: 'operator', definition: 'A symbol that performs an operation on values (+, -, *, /, %).' },
          { term: 'expression', definition: 'A combination of values, variables, and operators that produces a result.' },
          { term: 'modulus', definition: 'The % operator, which returns the remainder of integer division.' },
        ],
        workedExamples: [
          { code: '10 % 3', explanation: '10 divided by 3 is 3 remainder 1. So 10 % 3 = 1.' },
          { code: '15 % 5', explanation: '15 divided by 5 is exactly 3 with no remainder. So 15 % 5 = 0.' },
        ],
        misconceptions: [
          'Confusing % with the percentage symbol. In Java, % means remainder (modulus).',
          'Confusing / with mathematical fraction notation without considering integer vs double behaviour.',
        ],
        questions: [
          {
            id: 'U2-T9-Q1', type: 'mc', category: 'identify',
            prompt: 'Which operator gives the remainder of a division?',
            options: ['+', '/', '%', '-'],
            answer: 2,
            hint: 'It is not the division operator /.',
            explanation: 'The % (modulus) operator returns the remainder. For example, 7 % 3 = 1 because 7 / 3 = 2 remainder 1.',
            skills: ['U2-S5'],
          },
          {
            id: 'U2-T9-Q2', type: 'mc', category: 'predict',
            prompt: 'What is the result of 20 % 6?',
            options: ['2', '3', '14', '3.33'],
            answer: 0,
            hint: '20 / 6 = 3 remainder ?',
            explanation: '20 / 6 = 3 remainder 2. The % operator returns the remainder, so 20 % 6 = 2.',
            skills: ['U2-S5'],
          },
        ],
      },
      {
        id: 'U2-T10',
        title: 'Integer division and remainder',
        skills: ['U2-S6'],
        explanation: [
          'When both values in a division are integers, Java performs integer division.',
          'Integer division drops the decimal part -- it does NOT round.',
          '5 / 2 gives 2 (not 2.5). The .5 is simply discarded.',
          'To get a decimal result, at least one value must be a double.',
        ],
        workedExamples: [
          { code: 'int result = 7 / 2;  // result is 3', explanation: 'Both are ints, so Java does integer division: 7 / 2 = 3 (the .5 is dropped).' },
          { code: 'double result = 7.0 / 2;  // result is 3.5', explanation: '7.0 is a double, so Java does real-number division: 7.0 / 2 = 3.5.' },
        ],
        misconceptions: [
          'Expecting 5 / 2 to always produce 2.5 -- with two ints, it gives 2.',
          'Confusing the quotient (result of /) with the remainder (result of %).',
        ],
        questions: [
          {
            id: 'U2-T10-Q1', type: 'mc', category: 'explain',
            prompt: 'Why does 5 / 2 give 2 in Java (not 2.5)?',
            options: [
              'Java rounds down automatically',
              'Both values are integers, so Java drops the decimal part',
              '5 is an odd number',
              'The / operator always rounds',
            ],
            answer: 1,
            hint: 'Think about what happens with int / int.',
            explanation: 'When both operands are ints, Java performs integer division and discards the fractional part. It does not round -- it truncates.',
            skills: ['U2-S6'],
          },
          {
            id: 'U2-T10-Q2', type: 'mc', category: 'predict',
            prompt: 'What are the quotient and remainder of 17 / 5?',
            options: [
              'Quotient: 3, Remainder: 2',
              'Quotient: 3.4, Remainder: 0',
              'Quotient: 2, Remainder: 7',
              'Quotient: 4, Remainder: -3',
            ],
            answer: 0,
            hint: 'Use 17 / 5 for quotient and 17 % 5 for remainder.',
            explanation: '17 / 5 = 3 (integer division drops the .4). 17 % 5 = 2 (the remainder).',
            skills: ['U2-S6'],
          },
        ],
      },
      {
        id: 'U2-T11',
        title: 'Increment, decrement, and compound assignment',
        skills: ['U2-S7'],
        explanation: [
          '++ increases a variable by 1 (increment). x++ is shorthand for x = x + 1.',
          '-- decreases a variable by 1 (decrement). x-- is shorthand for x = x - 1.',
          '+= adds a value: x += 3 means x = x + 3.',
          '-= subtracts: x -= 2 means x = x - 2.',
          '*= and /= work the same way for multiplication and division.',
        ],
        vocabulary: [
          { term: 'increment', definition: 'Increasing a value by 1 (using ++).' },
          { term: 'decrement', definition: 'Decreasing a value by 1 (using --).' },
          { term: 'compound assignment', definition: 'Shorthand operators like +=, -=, *=, /= that combine an operation with assignment.' },
        ],
        workedExamples: [
          { code: 'int count = 5;\ncount++;  // count is now 6', explanation: 'count++ adds 1 to count.' },
          { code: 'int x = 10;\nx -= 3;  // x is now 7', explanation: 'x -= 3 is the same as x = x - 3. So 10 - 3 = 7.' },
        ],
        misconceptions: [
          'Confusing x++ with x + 1 -- x++ actually changes x, while x + 1 just calculates without storing.',
          'Not understanding that compound assignments modify the variable in place.',
        ],
        questions: [
          {
            id: 'U2-T11-Q1', type: 'mc', category: 'explain',
            prompt: 'What does x++ do?',
            options: [
              'Doubles x',
              'Adds 1 to x and stores the result back in x',
              'Prints x',
              'Checks if x is positive',
            ],
            answer: 1,
            hint: '++ is shorthand for "add 1 and save".',
            explanation: 'x++ is equivalent to x = x + 1. It increments the value of x by 1.',
            skills: ['U2-S7'],
          },
          {
            id: 'U2-T11-Q2', type: 'mc', category: 'predict',
            prompt: 'What is n after this code?\n\nint n = 8;\nn -= 3;\nn *= 2;',
            options: ['10', '13', '5', '2'],
            answer: 0,
            hint: 'Do it step by step: first subtract 3, then multiply by 2.',
            explanation: 'n starts at 8. n -= 3 makes n = 5. n *= 2 makes n = 10.',
            skills: ['U2-S7'],
          },
        ],
      },
      {
        id: 'U2-T12',
        title: 'Order of arithmetic operations',
        skills: ['U2-S5'],
        explanation: [
          'Java follows a fixed order when evaluating expressions (precedence).',
          'Brackets () are evaluated first.',
          'Then multiplication *, division /, and modulus %.',
          'Then addition + and subtraction -.',
          'When operators have equal precedence, they are evaluated left to right.',
        ],
        vocabulary: [
          { term: 'precedence', definition: 'The order in which operators are evaluated in an expression.' },
          { term: 'order of operations', definition: 'Brackets first, then *, /, %, then +, -.' },
        ],
        workedExamples: [
          { code: '2 + 3 * 4', explanation: 'Multiplication first: 3 * 4 = 12. Then 2 + 12 = 14.' },
          { code: '(2 + 3) * 4', explanation: 'Brackets first: 2 + 3 = 5. Then 5 * 4 = 20.' },
        ],
        misconceptions: [
          'Calculating strictly left to right without considering precedence (2 + 3 * 4 is 14, NOT 20).',
        ],
        questions: [
          {
            id: 'U2-T12-Q1', type: 'mc', category: 'predict',
            prompt: 'What is the result of 3 + 4 * 2?',
            options: ['14', '11', '10', '24'],
            answer: 1,
            hint: 'Multiplication happens before addition.',
            explanation: '4 * 2 = 8 first (higher precedence), then 3 + 8 = 11.',
            skills: ['U2-S5'],
          },
          {
            id: 'U2-T12-Q2', type: 'mc', category: 'explain',
            prompt: 'Why does (3 + 4) * 2 give a different result from 3 + 4 * 2?',
            options: [
              'They give the same result',
              'Brackets force 3 + 4 to be done first, changing the order',
              'The * operator works differently with brackets',
              'Java has a bug',
            ],
            answer: 1,
            hint: 'Brackets override the default precedence.',
            explanation: 'Without brackets: 4 * 2 first = 11. With brackets: (3 + 4) first = 7, then 7 * 2 = 14.',
            skills: ['U2-S5'],
          },
        ],
      },
    ],
  },

  // ===================================================================
  // UNIT 3 - Characters, Strings and Math Class
  // ===================================================================
  {
    unitId: 'U3',
    title: 'Characters, Strings and Math Class',
    purpose: 'Expands understanding of text and symbols in Java, introduces character data, string methods, escape sequences, typecasting, and Math class methods.',
    outcomes: [
      'Distinguish clearly between char and String',
      'Explain single quotes vs double quotes',
      'Interpret escape sequences',
      'Use and explain length() and charAt() conceptually',
      'Explain basic typecasting',
      'Convert between number and character representations',
      'Explain the purpose of key Math methods and Math.PI',
    ],
    topics: [
      {
        id: 'U3-T1',
        title: 'Character data (char)',
        skills: ['U3-S1'],
        explanation: [
          'char stores exactly one character -- a single letter, digit, or symbol.',
          'Character literals use single quotes: \'A\', \'7\', \'#\'.',
          'Every character has an underlying numeric code value (e.g. \'A\' = 65).',
        ],
        vocabulary: [
          { term: 'char', definition: 'A data type that stores a single character.' },
          { term: 'character literal', definition: 'A single character enclosed in single quotes.' },
          { term: 'code value', definition: 'The numeric value assigned to a character in an encoding scheme.' },
        ],
        misconceptions: [
          'Using double quotes for char -- "A" is a String, \'A\' is a char.',
          'Trying to store multiple characters in a char -- it can only hold one.',
        ],
        questions: [
          {
            id: 'U3-T1-Q1', type: 'mc', category: 'define',
            prompt: 'What does char store?',
            options: ['A word', 'Exactly one character', 'A number', 'A sentence'],
            answer: 1,
            hint: 'char is short for "character" -- just one.',
            explanation: 'char stores a single character, such as \'A\', \'5\', or \'@\'. For multiple characters, use String.',
            skills: ['U3-S1'],
          },
          {
            id: 'U3-T1-Q2', type: 'tf', category: 'identify',
            prompt: 'This is valid Java: char letter = "B";',
            answer: false,
            hint: 'What kind of quotes does char require?',
            explanation: 'False. char requires single quotes: char letter = \'B\'. Double quotes create a String.',
            skills: ['U3-S1'],
          },
        ],
      },
      {
        id: 'U3-T2',
        title: 'Difference between char and String',
        skills: ['U3-S1'],
        explanation: [
          'char stores ONE symbol. String stores a sequence of characters.',
          'char uses single quotes: \'A\'. String uses double quotes: "A".',
          '\'A\' and "A" are different types in Java, even though they look similar.',
        ],
        questions: [
          {
            id: 'U3-T2-Q1', type: 'mc', category: 'distinguish',
            prompt: 'What is the key difference between \'A\' and "A"?',
            options: [
              'They are identical',
              '\'A\' is a char (single character); "A" is a String (text sequence)',
              '\'A\' is uppercase and "A" is lowercase',
              '\'A\' is for numbers and "A" is for text',
            ],
            answer: 1,
            hint: 'Look at the quote type.',
            explanation: 'Single quotes make a char value, double quotes make a String. They are different data types.',
            skills: ['U3-S1'],
          },
          {
            id: 'U3-T2-Q2', type: 'mc', category: 'classify',
            prompt: 'Classify each: \'Z\', "Hello", \'5\', "A". How many are char values?',
            options: ['1', '2', '3', '4'],
            answer: 1,
            hint: 'Count the ones with single quotes.',
            explanation: '\'Z\' and \'5\' use single quotes = char. "Hello" and "A" use double quotes = String. That is 2 chars.',
            skills: ['U3-S1'],
          },
        ],
      },
      {
        id: 'U3-T3',
        title: 'Escape sequences',
        skills: ['U3-S3'],
        explanation: [
          'Escape sequences are special character combinations that produce formatting or special characters.',
          '\\n creates a new line.',
          '\\t creates a tab (horizontal spacing).',
          '\\" puts a quotation mark inside a string.',
          '\\\\ represents a single backslash.',
        ],
        vocabulary: [
          { term: 'escape sequence', definition: 'A backslash followed by a character that has special meaning (\\n, \\t, etc.).' },
        ],
        misconceptions: [
          'Treating \\n as the letters "backslash n" -- it is a single invisible character (new line).',
          'Writing /n instead of \\n (forward slash vs backslash).',
        ],
        questions: [
          {
            id: 'U3-T3-Q1', type: 'mc', category: 'identify',
            prompt: 'Which escape sequence creates a new line?',
            options: ['\\t', '\\n', '\\\\', '/n'],
            answer: 1,
            hint: 'n = new line.',
            explanation: '\\n is the newline escape. \\t is tab. /n (forward slash) is NOT an escape sequence.',
            skills: ['U3-S3'],
          },
          {
            id: 'U3-T3-Q2', type: 'mc', category: 'predict',
            prompt: 'What does System.out.println("Line1\\nLine2") display?',
            options: [
              'Line1\\nLine2',
              'Line1 Line2',
              'Line1 on one line, then Line2 on the next line',
              'Line1nLine2',
            ],
            answer: 2,
            hint: '\\n means new line -- the text splits there.',
            explanation: '\\n inserts a line break. "Line1" appears on the first line, "Line2" on the next.',
            skills: ['U3-S3'],
          },
        ],
      },
      {
        id: 'U3-T4',
        title: 'Strings and string methods',
        skills: ['U3-S4'],
        explanation: [
          'A String is a sequence of characters, each in a numbered position.',
          'length() returns the number of characters in a string.',
          'charAt(index) returns the character at that position.',
          'Indexing starts at 0, not 1. The first character is at index 0.',
          'The last character is at index length() - 1.',
        ],
        vocabulary: [
          { term: 'index', definition: 'A number indicating the position of a character (starts at 0).' },
          { term: 'length', definition: 'The number of characters in a string.' },
          { term: 'method', definition: 'A named operation you can call on an object (e.g. .length()).' },
        ],
        workedExamples: [
          { code: '"Java".length()', explanation: 'Returns 4 because J-a-v-a has 4 characters.' },
          { code: '"Java".charAt(0)', explanation: 'Returns \'J\' -- the character at index 0 (the first position).' },
          { code: '"Java".charAt(3)', explanation: 'Returns \'a\' -- index 3 is the last character (J=0, a=1, v=2, a=3).' },
        ],
        misconceptions: [
          'Starting positions at 1 instead of 0.',
          'Confusing length (4) with the last index (3). The last index is always length - 1.',
        ],
        questions: [
          {
            id: 'U3-T4-Q1', type: 'mc', category: 'explain',
            prompt: 'Why does "Hello".charAt(0) return \'H\' and not \'e\'?',
            options: [
              'Because H is a capital letter',
              'Because indexing starts at 0, so the first character is at position 0',
              'Because charAt always returns the first letter',
              'Because 0 means "beginning"',
            ],
            answer: 1,
            hint: 'Zero-based indexing: the count starts at 0.',
            explanation: 'In Java, string positions start at 0. Index 0 = \'H\', index 1 = \'e\', index 2 = \'l\', etc.',
            skills: ['U3-S4'],
          },
          {
            id: 'U3-T4-Q2', type: 'mc', category: 'predict',
            prompt: 'What does "Code".charAt("Code".length() - 1) return?',
            options: ['\'C\'', '\'o\'', '\'d\'', '\'e\''],
            answer: 3,
            hint: 'length() is 4, so length() - 1 = 3. What is at index 3?',
            explanation: '"Code" has length 4. Index 3 (the last position) is \'e\'. C=0, o=1, d=2, e=3.',
            skills: ['U3-S4'],
          },
        ],
      },
      {
        id: 'U3-T5',
        title: 'Typecasting',
        skills: ['U3-S5'],
        explanation: [
          'Typecasting changes one data type to another.',
          'Widening (e.g. int to double) is safe and automatic -- no data is lost.',
          'Narrowing (e.g. double to int) must be done explicitly and may lose data.',
          'Casting double to int removes the decimal part (truncates, does not round).',
          'Syntax: (int) 3.7 gives 3.',
        ],
        vocabulary: [
          { term: 'typecasting', definition: 'Converting a value from one type to another.' },
          { term: 'widening', definition: 'Safe conversion to a larger type (e.g. int to double).' },
          { term: 'narrowing', definition: 'Risky conversion to a smaller type (e.g. double to int) -- may lose data.' },
        ],
        misconceptions: [
          'Believing conversion always preserves the exact value -- narrowing loses the decimal.',
          'Confusing parsing (text to number) with casting (number to number).',
        ],
        questions: [
          {
            id: 'U3-T5-Q1', type: 'mc', category: 'predict',
            prompt: 'What does (int) 9.8 produce?',
            options: ['10', '9', '9.8', 'Error'],
            answer: 1,
            hint: 'Casting to int truncates -- it does not round.',
            explanation: '(int) 9.8 removes the decimal part, giving 9. It does NOT round up to 10.',
            skills: ['U3-S5'],
          },
          {
            id: 'U3-T5-Q2', type: 'mc', category: 'distinguish',
            prompt: 'What is the difference between parsing and casting?',
            options: [
              'They are the same thing',
              'Parsing converts text to a number; casting converts one numeric type to another',
              'Casting is for Strings; parsing is for numbers',
              'Parsing is faster than casting',
            ],
            answer: 1,
            hint: 'One works with text, the other with numeric types.',
            explanation: 'Parsing: String "42" to int 42 (text to number). Casting: double 3.7 to int 3 (number to number).',
            skills: ['U3-S5'],
          },
        ],
      },
      {
        id: 'U3-T6',
        title: 'Character-number relationships',
        skills: ['U3-S2', 'U3-S6'],
        explanation: [
          'Every character has a numeric code (e.g. \'A\' = 65, \'a\' = 97, \'0\' = 48).',
          'You can cast an int to a char to get the character: (char) 65 gives \'A\'.',
          'You can cast a char to an int to get its code: (int) \'A\' gives 65.',
          'This relationship is the basis of character encoding (ASCII/Unicode).',
        ],
        vocabulary: [
          { term: 'ASCII', definition: 'A standard encoding that maps characters to numbers (A=65, B=66, etc.).' },
          { term: 'character code', definition: 'The numeric value representing a character in an encoding.' },
        ],
        questions: [
          {
            id: 'U3-T6-Q1', type: 'mc', category: 'explain',
            prompt: 'How can a number represent a character?',
            options: [
              'Numbers and characters are completely unrelated',
              'Each character has a numeric code in an encoding scheme like ASCII',
              'Only vowels have codes',
              'Characters are stored as their position in the alphabet',
            ],
            answer: 1,
            hint: 'Think about how computers store characters internally.',
            explanation: 'Computers use numeric codes (ASCII/Unicode) to represent every character. \'A\' = 65, \'B\' = 66, etc.',
            skills: ['U3-S2'],
          },
        ],
      },
      {
        id: 'U3-T7',
        title: 'Math class methods',
        skills: ['U3-S7'],
        explanation: [
          'Java\'s Math class provides built-in methods for common calculations.',
          'Math.sqrt(x) returns the square root of x.',
          'Math.round(x) rounds a real number to the nearest whole number.',
          'Math.abs(x) returns the absolute value (distance from zero, always non-negative).',
          'Math.pow(base, exp) raises base to the power of exp.',
          'Math.PI is a constant representing the value of pi (approximately 3.14159).',
        ],
        workedExamples: [
          { code: 'Math.sqrt(25)', explanation: 'Returns 5.0 (the square root of 25). Always returns a double.' },
          { code: 'Math.pow(2, 3)', explanation: 'Returns 8.0 (2 to the power of 3: 2 x 2 x 2 = 8).' },
          { code: 'Math.abs(-7)', explanation: 'Returns 7. Absolute value removes the negative sign.' },
          { code: 'Math.round(3.6)', explanation: 'Returns 4. Rounds to the nearest whole number.' },
        ],
        misconceptions: [
          'Confusing Math.round() with truncation -- round(3.6) = 4, but (int)3.6 = 3.',
          'Confusing absolute value with just "removing the sign" -- it means distance from zero.',
          'Thinking Math.pow(2, 3) means 2 * 3 = 6. It means 2^3 = 8.',
        ],
        questions: [
          {
            id: 'U3-T7-Q1', type: 'mc', category: 'identify',
            prompt: 'Which Math method returns the square root of a number?',
            options: ['Math.pow()', 'Math.sqrt()', 'Math.abs()', 'Math.round()'],
            answer: 1,
            hint: 'sqrt stands for "square root".',
            explanation: 'Math.sqrt() calculates the square root. Math.pow() is for exponents, not roots.',
            skills: ['U3-S7'],
          },
          {
            id: 'U3-T7-Q2', type: 'mc', category: 'predict',
            prompt: 'What does Math.pow(3, 2) return?',
            options: ['5.0', '6.0', '9.0', '8.0'],
            answer: 2,
            hint: 'pow(base, exponent) = base^exponent.',
            explanation: 'Math.pow(3, 2) = 3^2 = 3 x 3 = 9.0. It returns a double.',
            skills: ['U3-S7'],
          },
        ],
      },
    ],
  },

  // ===================================================================
  // UNIT 4 - Problem Solving using Computational Thinking
  // ===================================================================
  {
    unitId: 'U4',
    title: 'Problem Solving using Computational Thinking',
    purpose: 'Develops the ability to think like a problem solver before coding: computational thinking, IPO, algorithms, pseudocode, flowcharts, error types, and trace tables.',
    outcomes: [
      'Explain computational thinking',
      'Identify decomposition, pattern recognition, abstraction, and algorithms',
      'Break problems into input, processing, and output',
      'Read simple pseudocode and flowcharts',
      'Classify types of errors',
      'Explain basic testing concepts',
      'Complete trace-based reasoning tasks',
    ],
    topics: [
      {
        id: 'U4-T1',
        title: 'Computational thinking',
        skills: ['U4-S1', 'U4-S2', 'U4-S4'],
        explanation: [
          'Computational thinking is a set of problem-solving skills used before writing code.',
          'Decomposition: breaking a big problem into smaller, manageable parts.',
          'Pattern recognition: spotting similarities or repeated structures.',
          'Abstraction: focusing on relevant details and ignoring what does not matter.',
          'Algorithm design: creating a step-by-step solution.',
        ],
        vocabulary: [
          { term: 'decomposition', definition: 'Breaking a problem into smaller parts.' },
          { term: 'pattern recognition', definition: 'Spotting repeated structures or similarities.' },
          { term: 'abstraction', definition: 'Focusing on what matters and ignoring irrelevant details.' },
          { term: 'algorithm', definition: 'A step-by-step plan to solve a problem.' },
        ],
        misconceptions: [
          'Mixing up abstraction (removing detail) and decomposition (breaking into parts).',
          'Thinking an algorithm must be written in code -- it can be in plain English or pseudocode.',
        ],
        questions: [
          {
            id: 'U4-T1-Q1', type: 'mc', category: 'define',
            prompt: 'What does decomposition mean?',
            options: [
              'Writing code in a programming language',
              'Breaking a problem into smaller, manageable parts',
              'Ignoring irrelevant details',
              'Spotting repeated patterns',
            ],
            answer: 1,
            hint: 'Think "break it down".',
            explanation: 'Decomposition means dividing a complex problem into smaller, easier sub-problems that can be solved individually.',
            skills: ['U4-S2'],
          },
          {
            id: 'U4-T1-Q2', type: 'mc', category: 'identify',
            prompt: 'A student notices that several homework problems all follow the same calculate-then-display pattern. Which skill is this?',
            options: ['Decomposition', 'Abstraction', 'Pattern recognition', 'Algorithm design'],
            answer: 2,
            hint: 'They spotted something that repeats.',
            explanation: 'Recognising a recurring structure across problems is pattern recognition.',
            skills: ['U4-S4'],
          },
          {
            id: 'U4-T1-Q3', type: 'mc', category: 'distinguish',
            prompt: 'What is the difference between abstraction and decomposition?',
            options: [
              'They are the same thing',
              'Abstraction removes irrelevant detail; decomposition breaks a problem into parts',
              'Decomposition removes detail; abstraction breaks things apart',
              'Abstraction is for code; decomposition is for maths',
            ],
            answer: 1,
            hint: 'One simplifies, the other splits.',
            explanation: 'Abstraction = focus on what matters, ignore the rest. Decomposition = split one big task into smaller tasks.',
            skills: ['U4-S1'],
          },
        ],
      },
      {
        id: 'U4-T2',
        title: 'IPO model',
        skills: ['U4-S3'],
        explanation: [
          'IPO stands for Input, Processing, Output.',
          'Input: the data a program receives (from the user, a file, etc.).',
          'Processing: the calculations or logic performed on the data.',
          'Output: the result the program produces (displayed, saved, etc.).',
          'Identifying IPO helps plan a solution before writing code.',
        ],
        questions: [
          {
            id: 'U4-T2-Q1', type: 'mc', category: 'identify',
            prompt: 'A program asks for two numbers, adds them, and displays the sum. What is the Processing?',
            options: [
              'Asking for two numbers',
              'Adding the two numbers',
              'Displaying the sum',
              'Storing the numbers',
            ],
            answer: 1,
            hint: 'Processing is the work done on the data.',
            explanation: 'The input is the two numbers, the processing is the addition, and the output is displaying the sum.',
            skills: ['U4-S3'],
          },
          {
            id: 'U4-T2-Q2', type: 'mc', category: 'classify',
            prompt: 'Classify: "The user enters their name." Is this Input, Processing, or Output?',
            options: ['Input', 'Processing', 'Output', 'None of these'],
            answer: 0,
            hint: 'Data coming into the program is...',
            explanation: 'The user providing data to the program is input.',
            skills: ['U4-S3'],
          },
        ],
      },
      {
        id: 'U4-T3',
        title: 'Algorithms',
        skills: ['U4-S5'],
        explanation: [
          'An algorithm is a series of ordered instructions that solve a problem.',
          'The order of steps matters -- swapping steps can produce wrong results.',
          'Good algorithms are precise and unambiguous.',
        ],
        questions: [
          {
            id: 'U4-T3-Q1', type: 'order', category: 'sequence',
            prompt: 'Put these steps in the correct order to calculate the area of a rectangle:',
            items: [
              'Display the area',
              'Get the length from the user',
              'Calculate area = length x width',
              'Get the width from the user',
            ],
            answer: [1, 3, 2, 0],
            hint: 'Input first, then process, then output.',
            explanation: 'Get length, get width (inputs), calculate area (processing), display (output). This follows the IPO model.',
            skills: ['U4-S5'],
          },
        ],
      },
      {
        id: 'U4-T4',
        title: 'Pseudocode',
        skills: ['U4-S6'],
        explanation: [
          'Pseudocode is a structured way to describe a solution without strict programming syntax.',
          'It helps plan logic before writing actual code.',
          'Pseudocode uses readable instructions like "Read name", "Display total", "Set count to 0".',
          'There is no single correct format -- it just needs to be clear.',
        ],
        vocabulary: [
          { term: 'pseudocode', definition: 'A human-readable description of a program\'s logic using structured language.' },
        ],
        misconceptions: [
          'Thinking pseudocode must compile or run.',
          'Thinking there is only one exact format for pseudocode.',
        ],
        questions: [
          {
            id: 'U4-T4-Q1', type: 'mc', category: 'define',
            prompt: 'What is pseudocode?',
            options: [
              'A programming language that compiles slowly',
              'A structured description of a solution using readable, informal language',
              'The final version of a program',
              'A type of flowchart',
            ],
            answer: 1,
            hint: '"pseudo" means not real -- it is not actual code.',
            explanation: 'Pseudocode describes logic in readable language. It is a planning tool, not a programming language.',
            skills: ['U4-S6'],
          },
        ],
      },
      {
        id: 'U4-T5',
        title: 'Flowcharts',
        skills: ['U4-S7'],
        explanation: [
          'Flowcharts show the logic of a process visually using symbols and arrows.',
          'Oval/rounded rectangle: Start and End.',
          'Parallelogram: Input or Output.',
          'Rectangle: Process (a calculation or action).',
          'Diamond: Decision (a yes/no question that creates branches).',
          'Arrows show the direction of flow.',
        ],
        vocabulary: [
          { term: 'flowchart', definition: 'A visual diagram showing the steps and flow of a process.' },
          { term: 'decision symbol', definition: 'A diamond shape representing a yes/no branch.' },
        ],
        misconceptions: [
          'Confusing the parallelogram (input/output) with the rectangle (process).',
          'Ignoring arrow direction -- flow matters.',
        ],
        questions: [
          {
            id: 'U4-T5-Q1', type: 'mc', category: 'identify',
            prompt: 'Which flowchart symbol represents a decision?',
            options: ['Rectangle', 'Oval', 'Diamond', 'Parallelogram'],
            answer: 2,
            hint: 'Decisions have two possible paths (yes/no).',
            explanation: 'The diamond shape represents a decision point with yes/no (true/false) branches.',
            skills: ['U4-S7'],
          },
        ],
      },
      {
        id: 'U4-T6',
        title: 'Error types',
        skills: ['U4-S10'],
        explanation: [
          'Syntax errors: the code breaks the rules of the language. The program will not compile.',
          'Runtime errors: the program compiles but crashes when it runs (e.g. dividing by zero).',
          'Logical errors: the program runs without crashing but produces wrong results.',
        ],
        vocabulary: [
          { term: 'syntax error', definition: 'A mistake that violates the rules of the language, preventing compilation.' },
          { term: 'runtime error', definition: 'An error that occurs during execution, causing the program to crash.' },
          { term: 'logical error', definition: 'An error where the program runs but produces incorrect results.' },
        ],
        misconceptions: [
          'Assuming every wrong result is a syntax error -- syntax errors prevent the program from running at all.',
          'Confusing runtime errors (crash) with logical errors (wrong result, no crash).',
        ],
        questions: [
          {
            id: 'U4-T6-Q1', type: 'mc', category: 'classify',
            prompt: 'A program calculates a student\'s average but always gives 0. The program does not crash. What type of error is this?',
            options: ['Syntax error', 'Runtime error', 'Logical error', 'No error'],
            answer: 2,
            hint: 'The program runs but gives the wrong answer.',
            explanation: 'The program compiles and runs without crashing, but the result is wrong. That is a logical error.',
            skills: ['U4-S10'],
          },
          {
            id: 'U4-T6-Q2', type: 'mc', category: 'classify',
            prompt: 'A program has a missing semicolon. What type of error is this?',
            options: ['Syntax error', 'Runtime error', 'Logical error', 'Warning only'],
            answer: 0,
            hint: 'Missing punctuation breaks the language rules.',
            explanation: 'A missing semicolon violates Java syntax rules. The program will not compile at all. This is a syntax error.',
            skills: ['U4-S10'],
          },
          {
            id: 'U4-T6-Q3', type: 'mc', category: 'distinguish',
            prompt: 'What is the difference between a runtime error and a logical error?',
            options: [
              'They are the same thing',
              'A runtime error crashes the program; a logical error produces wrong results without crashing',
              'A logical error is worse than a runtime error',
              'Runtime errors are in the syntax',
            ],
            answer: 1,
            hint: 'One crashes, the other silently gives wrong output.',
            explanation: 'Runtime error = program crashes during execution. Logical error = program runs fine but gives the wrong answer.',
            skills: ['U4-S10'],
          },
        ],
      },
      {
        id: 'U4-T7',
        title: 'Testing and test data',
        skills: ['U4-S11'],
        explanation: [
          'Standard data: normal, expected input that the program should handle correctly.',
          'Abnormal data: invalid or unexpected input (e.g. text where a number is expected).',
          'Extreme data: valid input at the boundaries of the allowed range (e.g. 0, 100 for a percentage).',
          'Testing with all three types ensures the program is correct and robust.',
        ],
        vocabulary: [
          { term: 'standard data', definition: 'Normal, expected input.' },
          { term: 'abnormal data', definition: 'Invalid or unexpected input.' },
          { term: 'extreme data', definition: 'Valid input at the boundary of the allowed range.' },
        ],
        misconceptions: [
          'Thinking extreme data means invalid data -- extreme data is valid but at the edge.',
          'Not distinguishing abnormal (invalid) from unusual-but-valid (extreme).',
        ],
        questions: [
          {
            id: 'U4-T7-Q1', type: 'mc', category: 'classify',
            prompt: 'A program accepts test marks from 0 to 100. Classify the input value -5:',
            options: ['Standard data', 'Abnormal data', 'Extreme data', 'Normal data'],
            answer: 1,
            hint: '-5 is outside the valid range.',
            explanation: '-5 is outside the valid range (0-100), making it invalid. Invalid input is abnormal data.',
            skills: ['U4-S11'],
          },
          {
            id: 'U4-T7-Q2', type: 'mc', category: 'classify',
            prompt: 'A program accepts test marks from 0 to 100. Classify the input value 100:',
            options: ['Standard data', 'Abnormal data', 'Extreme data', 'Invalid data'],
            answer: 2,
            hint: '100 is valid but at the very edge of the range.',
            explanation: '100 is valid but sits at the boundary of the allowed range. This is extreme data.',
            skills: ['U4-S11'],
          },
        ],
      },
      {
        id: 'U4-T8',
        title: 'Trace tables',
        skills: ['U4-S12'],
        explanation: [
          'A trace table records how variable values change during execution, line by line.',
          'It helps you follow logic carefully and predict the final result.',
          'Trace tables are especially useful for understanding loops and conditions.',
        ],
        questions: [
          {
            id: 'U4-T8-Q1', type: 'mc', category: 'explain',
            prompt: 'What is the purpose of a trace table?',
            options: [
              'To make the program run faster',
              'To track how variable values change step by step during execution',
              'To find syntax errors',
              'To format the output',
            ],
            answer: 1,
            hint: 'Trace = follow step by step.',
            explanation: 'A trace table records the value of each variable after each line of code executes, helping you verify logic.',
            skills: ['U4-S12'],
          },
          {
            id: 'U4-T8-Q2', type: 'trace', category: 'predict',
            prompt: 'Trace the value of x after each line:',
            code: 'int x = 2;\nx = x + 3;\nx = x * 2;',
            rows: [
              { label: 'After line 1', answer: '2' },
              { label: 'After line 2', answer: '5' },
              { label: 'After line 3', answer: '10' },
            ],
            hint: 'Take each line one at a time.',
            explanation: 'x starts at 2, then 2 + 3 = 5, then 5 * 2 = 10.',
            skills: ['U4-S12'],
          },
        ],
      },
    ],
  },

  // ===================================================================
  // UNIT 5 - For Loops
  // ===================================================================
  {
    unitId: 'U5',
    title: 'For Loops',
    purpose: 'Introduces controlled repetition using for loops -- how repeated actions are structured, counted, and controlled in Java.',
    outcomes: [
      'Explain why loops are useful',
      'Explain the three parts of a for loop',
      'Predict how many times a loop executes',
      'Trace loop-controlled output and totals',
      'Identify loops that count up or down',
      'Interpret loops with character control variables',
    ],
    topics: [
      {
        id: 'U5-T1',
        title: 'Need for repetition',
        skills: ['U5-S1'],
        explanation: [
          'Many tasks require the same instructions to be performed multiple times.',
          'Without loops, you would have to copy-paste the same lines over and over.',
          'Loops automate repetition, making code shorter, cleaner, and easier to maintain.',
        ],
        questions: [
          {
            id: 'U5-T1-Q1', type: 'mc', category: 'explain',
            prompt: 'Why is a loop better than writing the same line 100 times?',
            options: [
              'Loops run faster',
              'Loops reduce duplication -- one block handles all repetitions',
              'Loops prevent all errors',
              'Loops are required by Java',
            ],
            answer: 1,
            hint: 'Think about code maintenance and length.',
            explanation: 'A loop replaces repeated code with a single block that runs multiple times. Less duplication means fewer mistakes and easier updates.',
            skills: ['U5-S1'],
          },
        ],
      },
      {
        id: 'U5-T2',
        title: 'Structure of a for loop',
        skills: ['U5-S2'],
        explanation: [
          'A for loop has three parts in its header: initialisation, condition, update.',
          'for (int i = 1; i <= 5; i++) -- start at 1, run while i <= 5, add 1 each time.',
          'The body (inside { }) contains the instructions repeated each iteration.',
          'The loop stops when the condition becomes false.',
        ],
        vocabulary: [
          { term: 'loop variable', definition: 'The variable that controls how many times the loop runs.' },
          { term: 'initialisation', definition: 'Setting the starting value of the loop variable.' },
          { term: 'condition', definition: 'The test checked before each iteration; loop continues while true.' },
          { term: 'iteration', definition: 'One complete execution of the loop body.' },
        ],
        workedExamples: [
          { code: 'for (int i = 1; i <= 3; i++) {\n    System.out.println(i);\n}', explanation: 'i starts at 1. Prints 1, 2, 3. When i becomes 4, the condition i <= 3 is false, and the loop stops.' },
        ],
        misconceptions: [
          'Forgetting that the update step (i++) is part of the loop control.',
          'Thinking the loop runs forever unless you add a special stop command.',
        ],
        questions: [
          {
            id: 'U5-T2-Q1', type: 'mc', category: 'identify',
            prompt: 'In for (int i = 0; i < 5; i++), what is the condition?',
            options: ['int i = 0', 'i < 5', 'i++', 'The entire header'],
            answer: 1,
            hint: 'The condition is the middle part, checked before each iteration.',
            explanation: 'The three parts are: int i = 0 (init), i < 5 (condition), i++ (update). The condition determines when the loop stops.',
            skills: ['U5-S2'],
          },
          {
            id: 'U5-T2-Q2', type: 'mc', category: 'explain',
            prompt: 'When does a for loop stop?',
            options: [
              'After a fixed 10 iterations',
              'When the condition becomes false',
              'When it runs out of memory',
              'When the user presses a key',
            ],
            answer: 1,
            hint: 'The condition is checked before each iteration.',
            explanation: 'The loop checks the condition before each iteration. When the condition is false, the loop stops and execution continues after the loop.',
            skills: ['U5-S2'],
          },
        ],
      },
      {
        id: 'U5-T3',
        title: 'Loop counting and iterations',
        skills: ['U5-S3'],
        explanation: [
          'The number of iterations depends on the start value, condition, and update step together.',
          'for (int i = 1; i <= 5; i++) runs 5 times (i = 1, 2, 3, 4, 5).',
          'for (int i = 0; i < 5; i++) also runs 5 times (i = 0, 1, 2, 3, 4).',
          '<= (inclusive) and < (exclusive) make a difference in iteration count.',
        ],
        questions: [
          {
            id: 'U5-T3-Q1', type: 'mc', category: 'predict',
            prompt: 'How many times does this loop run?\n\nfor (int i = 1; i <= 10; i++)',
            options: ['9', '10', '11', '0'],
            answer: 1,
            hint: 'i goes 1, 2, 3, ... 10. Count them.',
            explanation: 'i starts at 1 and runs while i <= 10. Values: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. That is 10 iterations.',
            skills: ['U5-S3'],
          },
          {
            id: 'U5-T3-Q2', type: 'mc', category: 'predict',
            prompt: 'How many times does this loop run?\n\nfor (int i = 0; i < 3; i++)',
            options: ['2', '3', '4', '0'],
            answer: 1,
            hint: 'i starts at 0 and stops BEFORE 3.',
            explanation: 'i takes values 0, 1, 2. When i becomes 3, the condition i < 3 is false. That is 3 iterations.',
            skills: ['U5-S3'],
          },
          {
            id: 'U5-T3-Q3', type: 'tf', category: 'predict',
            prompt: 'This loop runs at least once:\n\nfor (int i = 10; i < 5; i++)',
            answer: false,
            hint: 'Check: is 10 < 5?',
            explanation: 'False. The condition i < 5 is checked before the first iteration. Since 10 is not less than 5, the loop body never executes.',
            skills: ['U5-S3', 'U5-S5'],
          },
        ],
      },
      {
        id: 'U5-T4',
        title: 'Incrementing and decrementing loops',
        skills: ['U5-S6', 'U5-S8'],
        explanation: [
          'Loops can count forward (i++) or backward (i--).',
          'The update step can change by more than 1: i += 2 skips every other number.',
          'The step direction must match the condition logically -- counting up needs a < or <= condition.',
        ],
        questions: [
          {
            id: 'U5-T4-Q1', type: 'mc', category: 'predict',
            prompt: 'What does this print?\n\nfor (int i = 5; i >= 1; i--) {\n    System.out.print(i + " ");\n}',
            options: ['1 2 3 4 5', '5 4 3 2 1', '5 4 3 2', '0'],
            answer: 1,
            hint: 'i starts at 5 and counts DOWN to 1.',
            explanation: 'i goes 5, 4, 3, 2, 1. When i becomes 0, the condition i >= 1 is false. Output: 5 4 3 2 1.',
            skills: ['U5-S6'],
          },
          {
            id: 'U5-T4-Q2', type: 'mc', category: 'predict',
            prompt: 'How many times does this loop run?\n\nfor (int i = 0; i < 10; i += 3)',
            options: ['3', '4', '10', '2'],
            answer: 1,
            hint: 'List the values: 0, 3, 6, 9, then 12 fails the condition.',
            explanation: 'i takes values 0, 3, 6, 9. When i becomes 12, the condition fails. That is 4 iterations.',
            skills: ['U5-S8'],
          },
        ],
      },
      {
        id: 'U5-T5',
        title: 'Totals, sums, and averages in loops',
        skills: ['U5-S9', 'U5-S10'],
        explanation: [
          'An accumulator variable keeps a running total that grows each iteration.',
          'The total must be initialised BEFORE the loop starts (usually to 0).',
          'Inside the loop, the new value is added: total = total + value.',
          'To calculate an average: divide the total by the count after the loop.',
        ],
        workedExamples: [
          { code: 'int total = 0;\nfor (int i = 1; i <= 5; i++) {\n    total = total + i;\n}\n// total is 15', explanation: 'Adds 1+2+3+4+5 = 15. The running total: 0 -> 1 -> 3 -> 6 -> 10 -> 15.' },
        ],
        misconceptions: [
          'Initialising the total INSIDE the loop -- this resets it every iteration, losing the accumulated sum.',
        ],
        questions: [
          {
            id: 'U5-T5-Q1', type: 'mc', category: 'explain',
            prompt: 'Why must `total = 0` be placed BEFORE the loop, not inside it?',
            options: [
              'It does not matter where you put it',
              'Inside the loop it resets to 0 every iteration, losing the running sum',
              'Java does not allow variables inside loops',
              'The total would be negative',
            ],
            answer: 1,
            hint: 'Think about what happens if total becomes 0 every time the loop repeats.',
            explanation: 'If total resets to 0 inside the loop, you only keep the last value added. Initialising before the loop preserves the running sum.',
            skills: ['U5-S9'],
          },
          {
            id: 'U5-T5-Q2', type: 'trace', category: 'predict',
            prompt: 'Trace the value of sum after each iteration:',
            code: 'int sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum = sum + i;\n}',
            rows: [
              { label: 'After i = 1', answer: '1' },
              { label: 'After i = 2', answer: '3' },
              { label: 'After i = 3', answer: '6' },
              { label: 'After i = 4', answer: '10' },
            ],
            hint: 'Add the current i to sum each time.',
            explanation: 'sum goes: 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10.',
            skills: ['U5-S9', 'U5-S10'],
          },
        ],
      },
      {
        id: 'U5-T6',
        title: 'Loop errors and special cases',
        skills: ['U5-S5'],
        explanation: [
          'A loop may never run if the condition is already false at the start.',
          'A loop may be infinite if the condition never becomes false (e.g. wrong update direction).',
          'Off-by-one errors occur when the loop runs one time too many or too few.',
        ],
        questions: [
          {
            id: 'U5-T6-Q1', type: 'mc', category: 'identify',
            prompt: 'Which loop runs FOREVER?',
            code: '// A:\nfor (int i = 0; i < 5; i++) { }\n\n// B:\nfor (int i = 0; i < 5; i--) { }',
            options: ['A', 'B', 'Both', 'Neither'],
            answer: 1,
            hint: 'Check: does i ever reach 5 in each loop?',
            explanation: 'Loop B: i starts at 0 and decreases (i--). It will never reach 5, so i < 5 stays true forever. Infinite loop.',
            skills: ['U5-S5'],
          },
        ],
      },
    ],
  },

  // ===================================================================
  // UNIT 7 - If Statements
  // ===================================================================
  {
    unitId: 'U7',
    title: 'If Statements',
    purpose: 'Introduces conditional logic and decision making in Java -- testing conditions and choosing different actions based on true/false.',
    outcomes: [
      'Explain the purpose of an if statement',
      'Use and interpret relational operators',
      'Predict true/false results of conditions',
      'Read and explain if, if...else, and nested if',
      'Understand simple logical operators',
      'Reason about output based on conditions',
    ],
    topics: [
      {
        id: 'U7-T1',
        title: 'Decision making in programs',
        skills: ['U7-S1'],
        explanation: [
          'Programs sometimes need to make decisions -- choosing between different actions.',
          'Decisions depend on conditions that evaluate to either true or false.',
          'The if statement is Java\'s primary decision-making structure.',
        ],
        questions: [
          {
            id: 'U7-T1-Q1', type: 'mc', category: 'explain',
            prompt: 'Why do programs need decision structures like if?',
            options: [
              'To make the code longer',
              'To choose different actions based on conditions',
              'To repeat code',
              'To declare variables',
            ],
            answer: 1,
            hint: 'Sometimes a program needs to do different things depending on the data.',
            explanation: 'Decision structures let programs respond differently to different situations, making them flexible and useful.',
            skills: ['U7-S1'],
          },
        ],
      },
      {
        id: 'U7-T2',
        title: 'Relational operators',
        skills: ['U7-S2'],
        explanation: [
          'Relational operators compare values and produce true or false.',
          '> greater than, < less than.',
          '>= greater than or equal, <= less than or equal.',
          '== equal to (NOT the same as = which is assignment).',
          '!= not equal to.',
        ],
        vocabulary: [
          { term: 'relational operator', definition: 'An operator that compares values (>, <, >=, <=, ==, !=).' },
          { term: 'boolean result', definition: 'The true or false value produced by a comparison.' },
        ],
        misconceptions: [
          'Confusing = (assignment) with == (equality test).',
          'Confusing != with just ! -- != is "not equal to".',
        ],
        questions: [
          {
            id: 'U7-T2-Q1', type: 'mc', category: 'explain',
            prompt: 'What is the difference between = and == in Java?',
            options: [
              'They are the same',
              '= assigns a value; == tests if two values are equal',
              '== assigns; = tests equality',
              '= is for numbers; == is for text',
            ],
            answer: 1,
            hint: 'One stores, the other compares.',
            explanation: '= stores a value (assignment). == checks if two values are equal (comparison). Mixing them up is a common bug.',
            skills: ['U7-S2'],
          },
          {
            id: 'U7-T2-Q2', type: 'tf', category: 'predict',
            prompt: 'The expression 5 != 3 evaluates to true.',
            answer: true,
            hint: '!= means "not equal to".',
            explanation: 'True. 5 is not equal to 3, so 5 != 3 is true.',
            skills: ['U7-S2'],
          },
        ],
      },
      {
        id: 'U7-T3',
        title: 'Simple if statement',
        skills: ['U7-S1', 'U7-S3'],
        explanation: [
          'A simple if statement runs a block only when a condition is true.',
          'If the condition is false, the block is skipped entirely.',
          'There is no alternative action -- the program just moves on.',
        ],
        questions: [
          {
            id: 'U7-T3-Q1', type: 'mc', category: 'predict',
            prompt: 'What prints when x = 3?\n\nif (x > 5) {\n    System.out.println("big");\n}\nSystem.out.println("done");',
            options: ['big done', 'big', 'done', 'nothing'],
            answer: 2,
            hint: 'Is 3 > 5?',
            explanation: '3 > 5 is false, so "big" is skipped. "done" prints because it is outside the if block.',
            skills: ['U7-S3'],
          },
        ],
      },
      {
        id: 'U7-T4',
        title: 'if...else',
        skills: ['U7-S1', 'U7-S3'],
        explanation: [
          'if...else provides two paths: one for true, one for false.',
          'Exactly one branch executes -- never both.',
        ],
        questions: [
          {
            id: 'U7-T4-Q1', type: 'mc', category: 'predict',
            prompt: 'What prints when age = 15?\n\nif (age >= 18) {\n    System.out.println("adult");\n} else {\n    System.out.println("minor");\n}',
            options: ['adult', 'minor', 'adult minor', 'nothing'],
            answer: 1,
            hint: 'Is 15 >= 18?',
            explanation: '15 >= 18 is false, so the else branch runs. Output: "minor".',
            skills: ['U7-S3'],
          },
          {
            id: 'U7-T4-Q2', type: 'mc', category: 'distinguish',
            prompt: 'What is the difference between a simple if and if...else?',
            options: [
              'They are the same',
              'A simple if has no alternative action; if...else has a fallback for when the condition is false',
              'if...else can only test numbers',
              'A simple if is faster',
            ],
            answer: 1,
            hint: 'What happens when the condition is false in each case?',
            explanation: 'Simple if: if false, nothing happens. if...else: if false, the else branch runs. The else provides a guaranteed alternative.',
            skills: ['U7-S1'],
          },
        ],
      },
      {
        id: 'U7-T5',
        title: 'Nested if',
        skills: ['U7-S6'],
        explanation: [
          'A nested if is an if statement inside another if statement.',
          'The inner if is only checked if the outer condition is true.',
          'Nesting allows multi-level decisions.',
        ],
        questions: [
          {
            id: 'U7-T5-Q1', type: 'mc', category: 'predict',
            prompt: 'What prints when x = 8?\n\nif (x > 5) {\n    if (x > 10) {\n        System.out.println("very big");\n    } else {\n        System.out.println("medium");\n    }\n}',
            options: ['very big', 'medium', 'nothing', 'very big medium'],
            answer: 1,
            hint: 'First check: is 8 > 5? Then check: is 8 > 10?',
            explanation: '8 > 5 is true (enter outer if). 8 > 10 is false (enter inner else). Output: "medium".',
            skills: ['U7-S6'],
          },
        ],
      },
      {
        id: 'U7-T6',
        title: 'Multiple separate if statements',
        skills: ['U7-S7'],
        explanation: [
          'Separate if statements are independent -- each is checked regardless of the others.',
          'More than one may execute if more than one condition is true.',
          'This is different from if...else, where only one branch runs.',
        ],
        questions: [
          {
            id: 'U7-T6-Q1', type: 'mc', category: 'predict',
            prompt: 'What prints when x = 5?\n\nif (x > 3) { System.out.println("A"); }\nif (x > 4) { System.out.println("B"); }\nif (x > 5) { System.out.println("C"); }',
            options: ['A', 'A B', 'A B C', 'B'],
            answer: 1,
            hint: 'Each if is independent. Check all three conditions.',
            explanation: '5 > 3 is true (print A). 5 > 4 is true (print B). 5 > 5 is false (skip C). Output: A B.',
            skills: ['U7-S7'],
          },
        ],
      },
      {
        id: 'U7-T7',
        title: 'Logical operators',
        skills: ['U7-S8'],
        explanation: [
          '&& (AND): both conditions must be true for the result to be true.',
          '|| (OR): at least one condition must be true.',
          '! (NOT): reverses a boolean value -- true becomes false, false becomes true.',
        ],
        vocabulary: [
          { term: 'AND (&&)', definition: 'True only when BOTH sides are true.' },
          { term: 'OR (||)', definition: 'True when AT LEAST ONE side is true.' },
          { term: 'NOT (!)', definition: 'Reverses the boolean: !true = false, !false = true.' },
        ],
        misconceptions: [
          'Treating OR as meaning "both are required" -- OR needs only one to be true.',
          'Forgetting that NOT reverses the entire condition.',
        ],
        questions: [
          {
            id: 'U7-T7-Q1', type: 'mc', category: 'predict',
            prompt: 'What is the result of: (5 > 3) && (2 > 8)?',
            options: ['true', 'false', 'error', '5'],
            answer: 1,
            hint: '&& needs BOTH sides to be true.',
            explanation: '5 > 3 is true, but 2 > 8 is false. Since && requires both, the result is false.',
            skills: ['U7-S8'],
          },
          {
            id: 'U7-T7-Q2', type: 'mc', category: 'predict',
            prompt: 'What is the result of: (5 > 3) || (2 > 8)?',
            options: ['true', 'false', 'error', '5'],
            answer: 0,
            hint: '|| needs at least one side to be true.',
            explanation: '5 > 3 is true. With ||, only one needs to be true. The result is true.',
            skills: ['U7-S8'],
          },
          {
            id: 'U7-T7-Q3', type: 'mc', category: 'identify',
            prompt: 'Which logical operator should you use to check if a number is between 1 and 100 (inclusive)?',
            options: ['||', '&&', '!', '=='],
            answer: 1,
            hint: 'The number must be >= 1 AND <= 100 at the same time.',
            explanation: 'Use && because the number must satisfy BOTH conditions: x >= 1 && x <= 100.',
            skills: ['U7-S8'],
          },
        ],
      },
    ],
  },

  // ===================================================================
  // BINARY CALCULATIONS AND CONVERSIONS MODULE
  // ===================================================================
  {
    unitId: 'UB',
    title: 'Binary Calculations and Conversions',
    purpose: 'Covers binary number systems, place values, conversions between binary and decimal, binary arithmetic, and basic digital storage terminology.',
    outcomes: [
      'Explain what binary is and why computers use it',
      'Distinguish binary from decimal',
      'Understand place value in binary',
      'Convert binary to decimal',
      'Convert decimal to binary',
      'Perform simple binary addition',
      'Recognise carry in binary addition',
      'Explain bits, bytes, and storage terminology',
    ],
    topics: [
      {
        id: 'UB-T1',
        title: 'Number systems overview',
        skills: ['UB-S1'],
        explanation: [
          'A number system is a way of representing values using symbols and place values.',
          'Decimal (base 10) uses digits 0-9. Each place value is a power of 10.',
          'Binary (base 2) uses only 0 and 1. Each place value is a power of 2.',
          'The "base" tells you how many unique symbols the system uses.',
        ],
        vocabulary: [
          { term: 'number system', definition: 'A method of representing values using symbols and positional place values.' },
          { term: 'base (radix)', definition: 'The number of unique symbols in a number system (decimal = 10, binary = 2).' },
          { term: 'decimal', definition: 'Base 10 number system using digits 0-9.' },
          { term: 'binary', definition: 'Base 2 number system using only 0 and 1.' },
        ],
        misconceptions: [
          'Thinking binary numbers are "smaller" -- they represent the same values, just in a different notation.',
        ],
        questions: [
          {
            id: 'UB-T1-Q1', type: 'mc', category: 'define',
            prompt: 'What does "base 2" mean?',
            options: [
              'The system uses 2 digits: 0 and 1',
              'Numbers can only go up to 2',
              'There are 2 columns',
              'Values are always doubled',
            ],
            answer: 0,
            hint: 'The base tells you how many different symbols are used.',
            explanation: 'Base 2 (binary) uses only two symbols: 0 and 1. Each place value is a power of 2.',
            skills: ['UB-S1'],
          },
          {
            id: 'UB-T1-Q2', type: 'mc', category: 'distinguish',
            prompt: 'What is the key difference between decimal and binary?',
            options: [
              'Decimal is bigger than binary',
              'Decimal uses 10 symbols (0-9); binary uses 2 symbols (0 and 1)',
              'Binary is only for computers; decimal is only for humans',
              'They cannot represent the same numbers',
            ],
            answer: 1,
            hint: 'Focus on how many symbols each system uses.',
            explanation: 'Decimal has 10 unique digits; binary has 2. Both can represent the same values, just using different notation.',
            skills: ['UB-S1'],
          },
        ],
      },
      {
        id: 'UB-T2',
        title: 'Why computers use binary',
        skills: ['UB-S2'],
        explanation: [
          'Computers are built from electronic components that naturally have two states: on and off.',
          'These two states map perfectly to binary: on = 1, off = 0.',
          'Binary is reliable for computers because distinguishing between just two states is simple and error-resistant.',
        ],
        questions: [
          {
            id: 'UB-T2-Q1', type: 'mc', category: 'explain',
            prompt: 'Why do computers use binary instead of decimal?',
            options: [
              'Binary numbers are smaller',
              'Computer circuits have two states (on/off) that map to 1 and 0',
              'Decimal is too complicated for maths',
              'Binary was invented before decimal',
            ],
            answer: 1,
            hint: 'Think about how electronic circuits work.',
            explanation: 'Digital circuits naturally have two states (on/off, high/low voltage). Binary (0 and 1) maps directly to these states, making it reliable.',
            skills: ['UB-S2'],
          },
        ],
      },
      {
        id: 'UB-T3',
        title: 'Binary place value',
        skills: ['UB-S3'],
        explanation: [
          'In binary, place values increase in powers of 2 from right to left.',
          'From right to left: 1, 2, 4, 8, 16, 32, 64, 128...',
          'Each position indicates whether that power of 2 is included (1) or not (0).',
        ],
        vocabulary: [
          { term: 'place value', definition: 'The value of a digit based on its position in the number.' },
          { term: 'power of 2', definition: 'Values like 1, 2, 4, 8, 16 -- each double the previous.' },
          { term: 'bit position', definition: 'The location of a digit in a binary number, counted from the right starting at 0.' },
        ],
        workedExamples: [
          { code: '10110', explanation: 'Place values: 16, 8, 4, 2, 1.\n1x16 = 16, 0x8 = 0, 1x4 = 4, 1x2 = 2, 0x1 = 0.\nTotal = 22.' },
        ],
        misconceptions: [
          'Reading place values as powers of 10 instead of powers of 2.',
        ],
        questions: [
          {
            id: 'UB-T3-Q1', type: 'mc', category: 'identify',
            prompt: 'What are the place values (from left to right) for a 4-bit binary number?',
            options: [
              '1, 2, 3, 4',
              '8, 4, 2, 1',
              '10, 20, 30, 40',
              '4, 3, 2, 1',
            ],
            answer: 1,
            hint: 'Each position is a power of 2.',
            explanation: 'Binary place values (left to right for 4 bits): 8 (2^3), 4 (2^2), 2 (2^1), 1 (2^0).',
            skills: ['UB-S3'],
          },
        ],
      },
      {
        id: 'UB-T4',
        title: 'Binary to decimal conversion',
        skills: ['UB-S4'],
        explanation: [
          'To convert binary to decimal: multiply each bit by its place value and add the results.',
          'Only positions with a 1 contribute to the total; positions with 0 add nothing.',
          'Example: 1101 = 1x8 + 1x4 + 0x2 + 1x1 = 8 + 4 + 0 + 1 = 13.',
        ],
        workedExamples: [
          { code: '1101 to decimal', explanation: 'Place values: 8, 4, 2, 1.\n1x8=8, 1x4=4, 0x2=0, 1x1=1.\n8+4+0+1 = 13.\nSo 1101 in binary = 13 in decimal.' },
          { code: '1010 to decimal', explanation: '1x8=8, 0x4=0, 1x2=2, 0x1=0. Total = 10.' },
          { code: '1111 to decimal', explanation: '8+4+2+1 = 15.' },
        ],
        misconceptions: [
          'Adding the digits instead of the place values (1+1+0+1 = 3, which is wrong).',
          'Assigning wrong place values (e.g. using powers of 10).',
        ],
        questions: [
          {
            id: 'UB-T4-Q1', type: 'mc', category: 'calculate',
            prompt: 'What is 1011 in decimal?',
            options: ['9', '10', '11', '13'],
            answer: 2,
            hint: 'Place values: 8, 4, 2, 1. Add up the positions with a 1.',
            explanation: '1x8 + 0x4 + 1x2 + 1x1 = 8 + 0 + 2 + 1 = 11.',
            skills: ['UB-S4'],
          },
          {
            id: 'UB-T4-Q2', type: 'mc', category: 'calculate',
            prompt: 'What is 10000 in decimal?',
            options: ['8', '16', '32', '10'],
            answer: 1,
            hint: 'That is 5 bits. The leftmost place value is 2^4 = 16.',
            explanation: '1x16 + 0x8 + 0x4 + 0x2 + 0x1 = 16.',
            skills: ['UB-S4'],
          },
          {
            id: 'UB-T4-Q3', type: 'mc', category: 'calculate',
            prompt: 'What is 11111 in decimal?',
            options: ['15', '31', '32', '25'],
            answer: 1,
            hint: 'All bits are 1. Add: 16 + 8 + 4 + 2 + 1.',
            explanation: '16 + 8 + 4 + 2 + 1 = 31.',
            skills: ['UB-S4'],
          },
        ],
      },
      {
        id: 'UB-T5',
        title: 'Decimal to binary conversion',
        skills: ['UB-S5'],
        explanation: [
          'Method A (repeated division): divide by 2, write the remainder, repeat until quotient is 0, then read remainders bottom-to-top.',
          'Method B (place-value): find the largest power of 2 that fits, mark 1, subtract, continue.',
          'Both methods produce the same result.',
        ],
        workedExamples: [
          { code: '13 to binary (division method)', explanation: '13/2 = 6 r1, 6/2 = 3 r0, 3/2 = 1 r1, 1/2 = 0 r1.\nRead bottom to top: 1101.\nSo 13 = 1101 in binary.' },
          { code: '22 to binary (place-value method)', explanation: '22 includes 16? Yes (1, remainder 6). Includes 8? No (0). Includes 4? Yes (1, remainder 2). Includes 2? Yes (1, remainder 0). Includes 1? No (0).\nResult: 10110.' },
        ],
        misconceptions: [
          'Reading remainders top-to-bottom instead of bottom-to-top.',
          'Stopping the division too early (before the quotient reaches 0).',
        ],
        questions: [
          {
            id: 'UB-T5-Q1', type: 'mc', category: 'calculate',
            prompt: 'What is 10 in binary?',
            options: ['1010', '1100', '1001', '1110'],
            answer: 0,
            hint: '10 = 8 + 2. Which bits are on?',
            explanation: '10 = 8 + 2. In binary: 1x8, 0x4, 1x2, 0x1 = 1010.',
            skills: ['UB-S5'],
          },
          {
            id: 'UB-T5-Q2', type: 'mc', category: 'calculate',
            prompt: 'What is 25 in binary?',
            options: ['10101', '11001', '11011', '10011'],
            answer: 1,
            hint: '25 = 16 + 8 + 1.',
            explanation: '25 = 16 + 8 + 0 + 0 + 1 = 11001 in binary.',
            skills: ['UB-S5'],
          },
          {
            id: 'UB-T5-Q3', type: 'order', category: 'sequence',
            prompt: 'Put the repeated division steps in the correct order to convert 9 to binary:',
            items: [
              'Read remainders bottom to top: 1001',
              '9 / 2 = 4 remainder 1',
              '1 / 2 = 0 remainder 1',
              '4 / 2 = 2 remainder 0',
              '2 / 2 = 1 remainder 0',
            ],
            answer: [1, 3, 4, 2, 0],
            hint: 'Divide by 2 each time until the quotient is 0, then read remainders backwards.',
            explanation: '9/2=4r1, 4/2=2r0, 2/2=1r0, 1/2=0r1. Read bottom to top: 1001.',
            skills: ['UB-S5'],
          },
        ],
      },
      {
        id: 'UB-T6',
        title: 'Binary addition',
        skills: ['UB-S6'],
        explanation: [
          'Binary addition follows four basic rules:',
          '0 + 0 = 0',
          '0 + 1 = 1',
          '1 + 0 = 1',
          '1 + 1 = 10 (write 0, carry 1 to the next column)',
          '1 + 1 + 1 = 11 (write 1, carry 1)',
          'Work from right to left, just like decimal column addition.',
        ],
        workedExamples: [
          { code: '  1011\n+ 0110\n------\n 10001', explanation: 'From right: 1+0=1, 1+1=10(write 0 carry 1), 0+1+1=10(write 0 carry 1), 1+0+1=10(write 0 carry 1), carry=1. Result: 10001.' },
        ],
        misconceptions: [
          'Treating 1 + 1 as 2 instead of binary 10 (write 0, carry 1).',
          'Forgetting to carry.',
        ],
        questions: [
          {
            id: 'UB-T6-Q1', type: 'mc', category: 'calculate',
            prompt: 'What is 1010 + 0101 in binary?',
            options: ['1111', '10000', '1100', '1001'],
            answer: 0,
            hint: 'Add column by column from the right.',
            explanation: '0+1=1, 1+0=1, 0+1=1, 1+0=1. No carries needed. Result: 1111.',
            skills: ['UB-S6'],
          },
          {
            id: 'UB-T6-Q2', type: 'mc', category: 'calculate',
            prompt: 'What is 1101 + 0011 in binary?',
            options: ['10000', '1110', '10001', '1111'],
            answer: 0,
            hint: 'Watch for carries: 1+1 = 10 in binary.',
            explanation: '1+1=10(write 0 carry 1), 0+1+1=10(write 0 carry 1), 1+0+1=10(write 0 carry 1), 1+0+1=10(write 0 carry 1). Result: 10000.',
            skills: ['UB-S6'],
          },
          {
            id: 'UB-T6-Q3', type: 'mc', category: 'explain',
            prompt: 'In binary addition, what does 1 + 1 equal?',
            options: ['2', '11', '10', '0'],
            answer: 2,
            hint: 'In binary there is no digit 2.',
            explanation: '1 + 1 in binary = 10 (which means "write 0 in this column and carry 1 to the next"). The decimal value is 2, but in binary notation it is written as 10.',
            skills: ['UB-S6'],
          },
        ],
      },
      {
        id: 'UB-T7',
        title: 'Binary subtraction',
        skills: ['UB-S7'],
        explanation: [
          'Basic binary subtraction rules: 0-0=0, 1-0=1, 1-1=0.',
          '0-1 requires borrowing from the next column (similar to decimal subtraction).',
          'You can verify by converting both to decimal, subtracting, and converting back.',
        ],
        workedExamples: [
          { code: '1010 - 0011', explanation: 'Decimal check: 1010=10, 0011=3, 10-3=7, 7=0111.\nSo 1010 - 0011 = 0111.' },
        ],
        questions: [
          {
            id: 'UB-T7-Q1', type: 'mc', category: 'calculate',
            prompt: 'What is 1100 - 0101 in binary?',
            options: ['0111', '1001', '0110', '1000'],
            answer: 0,
            hint: 'Convert to decimal to check: 12 - 5 = ?',
            explanation: '1100 = 12, 0101 = 5. 12 - 5 = 7. 7 in binary = 0111.',
            skills: ['UB-S7'],
          },
        ],
      },
      {
        id: 'UB-T8',
        title: 'Bits, bytes, and storage basics',
        skills: ['UB-S8'],
        explanation: [
          'A bit is one binary digit -- either 0 or 1. It is the smallest unit of data.',
          '4 bits form a nibble.',
          '8 bits form a byte -- the standard unit for measuring digital storage.',
          'Larger units: kilobyte (KB), megabyte (MB), gigabyte (GB).',
        ],
        vocabulary: [
          { term: 'bit', definition: 'One binary digit (0 or 1). The smallest unit of data.' },
          { term: 'nibble', definition: 'A group of 4 bits.' },
          { term: 'byte', definition: 'A group of 8 bits. The standard unit for measuring storage.' },
        ],
        misconceptions: [
          'Confusing bits and bytes -- a byte is 8 bits, not 1.',
          'Thinking a byte can be any number of bits.',
        ],
        questions: [
          {
            id: 'UB-T8-Q1', type: 'mc', category: 'define',
            prompt: 'How many bits are in one byte?',
            options: ['2', '4', '8', '16'],
            answer: 2,
            hint: 'A nibble is 4 bits, a byte is double that.',
            explanation: 'A byte = 8 bits. This is the standard unit used to measure digital storage.',
            skills: ['UB-S8'],
          },
          {
            id: 'UB-T8-Q2', type: 'mc', category: 'identify',
            prompt: 'What is the term for a group of 4 bits?',
            options: ['Byte', 'Nibble', 'Word', 'Kilobyte'],
            answer: 1,
            hint: 'It rhymes with... well, it is a fun name for half a byte.',
            explanation: 'A nibble is 4 bits. A byte is 8 bits (two nibbles).',
            skills: ['UB-S8'],
          },
        ],
      },
    ],
  },
];

export function getTheoryUnit(unitId) {
  return THEORY_UNITS.find(u => u.unitId === unitId) || null;
}

export function getTheoryTopicsForUnit(unitId) {
  const unit = getTheoryUnit(unitId);
  return unit ? unit.topics : [];
}

export function getAllTheoryQuestions(unitId) {
  const topics = getTheoryTopicsForUnit(unitId);
  return topics.flatMap(t => t.questions || []);
}

export function getTheoryQuestionsByCategory(unitId, category) {
  return getAllTheoryQuestions(unitId).filter(q => q.category === category);
}
