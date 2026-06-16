export 
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

  /* ---- Binary Matrix ---- */
  b1: {
    type: 'mc', world: 'binary',
    prompt: 'What does "base 2" mean?',
    options: ['Uses 2 digits: 0 and 1', 'Numbers go up to 2', 'There are 2 columns', 'Values are always doubled'],
    answer: 0,
    hint: 'The base tells you how many different symbols the system uses.',
    explanation: 'Base 2 (binary) uses only two symbols: 0 and 1. Every place value is a power of 2.',
    skills: ['binary']
  },
  b2: {
    type: 'mc', world: 'binary',
    prompt: 'Why do computers use binary internally?',
    options: ['Binary numbers are smaller', 'Electronic circuits have two states (on/off) mapping to 1/0', 'Decimal is too complex', 'Binary was invented first'],
    answer: 1,
    hint: 'Think about how electronic circuits work physically.',
    explanation: 'Digital circuits naturally distinguish two voltage states. Binary (0 and 1) maps directly to on/off, making it reliable.',
    skills: ['binary']
  },
  b3: {
    type: 'mc', world: 'binary',
    prompt: 'What are the binary place values for a 4-bit number (left to right)?',
    options: ['1, 2, 3, 4', '8, 4, 2, 1', '10, 20, 30, 40', '4, 3, 2, 1'],
    answer: 1,
    hint: 'Each position is a power of 2.',
    explanation: 'Binary place values from left to right for 4 bits: 8 (2^3), 4 (2^2), 2 (2^1), 1 (2^0).',
    skills: ['binary-place-value']
  },
  b4: {
    type: 'tf', world: 'binary',
    prompt: 'The binary number 1010 and the decimal number 1010 represent the same value.',
    answer: false,
    hint: 'One uses base 2 place values, the other uses base 10.',
    explanation: 'False. Binary 1010 = 10 in decimal (8+0+2+0). Decimal 1010 is one thousand and ten. Same digits, different bases, very different values.',
    skills: ['binary']
  },
  b5: {
    type: 'mc', world: 'binary',
    prompt: 'Convert the binary number 1101 to decimal.',
    options: ['11', '12', '13', '14'],
    answer: 2,
    hint: 'Place values: 8, 4, 2, 1. Add up the positions with a 1.',
    explanation: '1x8 + 1x4 + 0x2 + 1x1 = 8 + 4 + 0 + 1 = 13.',
    skills: ['binary-to-decimal']
  },
  b6: {
    type: 'mc', world: 'binary',
    prompt: 'Convert the binary number 10110 to decimal.',
    options: ['18', '20', '22', '26'],
    answer: 2,
    hint: '5-bit number. Place values: 16, 8, 4, 2, 1.',
    explanation: '1x16 + 0x8 + 1x4 + 1x2 + 0x1 = 16 + 0 + 4 + 2 + 0 = 22.',
    skills: ['binary-to-decimal']
  },
  b7: {
    type: 'mc', world: 'binary',
    prompt: 'Convert the decimal number 19 to binary.',
    options: ['10011', '10101', '10010', '11001'],
    answer: 0,
    hint: '19 = 16 + 2 + 1. Which bits are on?',
    explanation: '19 = 16 + 0 + 0 + 2 + 1, so in binary: 1x16, 0x8, 0x4, 1x2, 1x1 = 10011.',
    skills: ['decimal-to-binary']
  },
  b8: {
    type: 'order', world: 'binary',
    prompt: 'Put the repeated-division steps in order to convert 11 to binary:',
    items: [
      'Read remainders bottom to top: 1011',
      '11 / 2 = 5 remainder 1',
      '1 / 2 = 0 remainder 1',
      '5 / 2 = 2 remainder 1',
      '2 / 2 = 1 remainder 0',
    ],
    answer: [1, 3, 4, 2, 0],
    hint: 'Keep dividing by 2 until the quotient is 0, then read remainders backwards.',
    explanation: '11/2=5r1, 5/2=2r1, 2/2=1r0, 1/2=0r1. Remainders bottom to top: 1011.',
    skills: ['decimal-to-binary']
  },
  b9: {
    type: 'mc', world: 'binary',
    prompt: 'What is 1010 + 0101 in binary?',
    options: ['1111', '10000', '1100', '1001'],
    answer: 0,
    hint: 'Add column by column from the right. No carries needed here.',
    explanation: '0+1=1, 1+0=1, 0+1=1, 1+0=1. Result: 1111. (Decimal check: 10 + 5 = 15 = 1111.)',
    skills: ['binary-addition']
  },
  b10: {
    type: 'mc', world: 'binary',
    prompt: 'What is 1011 + 0110 in binary?',
    options: ['10000', '10001', '1110', '10010'],
    answer: 1,
    hint: 'Watch for carries: 1+1 = 10 in binary (write 0, carry 1).',
    explanation: 'From right: 1+0=1, 1+1=10(carry), 0+1+1=10(carry), 1+0+1=10(carry), carry=1. Result: 10001. (11 + 6 = 17.)',
    skills: ['binary-addition']
  },
  b11: {
    type: 'mc', world: 'binary',
    prompt: 'In binary addition, what is 1 + 1?',
    options: ['2', '11', '10', '0'],
    answer: 2,
    hint: 'There is no digit 2 in binary.',
    explanation: '1 + 1 in binary = 10 (write 0 in this column, carry 1 to the next). The decimal value is 2, written as 10 in binary.',
    skills: ['binary-addition']
  },
  b12: {
    type: 'mc', world: 'binary',
    prompt: 'What is 1100 - 0101 in binary?',
    options: ['0111', '1001', '0110', '1000'],
    answer: 0,
    hint: 'Convert to decimal to check: 12 - 5 = ?',
    explanation: '1100 = 12, 0101 = 5. 12 - 5 = 7. 7 in binary = 0111.',
    skills: ['binary-subtraction']
  },
  b13: {
    type: 'mc', world: 'binary',
    prompt: 'How many bits are in one byte?',
    options: ['2', '4', '8', '16'],
    answer: 2,
    hint: 'A nibble is 4 bits; a byte is double that.',
    explanation: '1 byte = 8 bits. A nibble is 4 bits (half a byte).',
    skills: ['bits-bytes']
  },
  b14: {
    type: 'mc', world: 'binary',
    prompt: 'What is the maximum decimal value you can store in 8 bits (1 byte)?',
    options: ['128', '255', '256', '512'],
    answer: 1,
    hint: '8 bits all set to 1: 11111111.',
    explanation: '11111111 = 128+64+32+16+8+4+2+1 = 255. The range is 0 to 255.',
    skills: ['bits-bytes', 'binary-to-decimal']
  },
  b15: {
    type: 'trace', world: 'binary',
    prompt: 'Convert each binary number to decimal:',
    code: '1001\n0110\n1110\n10000',
    rows: [
      { label: '1001', answer: '9' },
      { label: '0110', answer: '6' },
      { label: '1110', answer: '14' },
      { label: '10000', answer: '16' },
    ],
    hint: 'Multiply each bit by its place value and add.',
    explanation: '1001=8+1=9, 0110=4+2=6, 1110=8+4+2=14, 10000=16.',
    skills: ['binary-to-decimal']
  },
  b16: {
    type: 'mc', world: 'binary',
    prompt: 'What is 1111 + 0001 in binary?',
    options: ['10000', '10001', '1111', '10010'],
    answer: 0,
    hint: 'This is like adding 15 + 1 in decimal.',
    explanation: '1111 = 15, 0001 = 1. 15 + 1 = 16 = 10000 in binary. Carries ripple all the way through.',
    skills: ['binary-addition']
  },
  b17: {
    type: 'mc', world: 'binary',
    prompt: 'Convert the decimal number 42 to binary.',
    options: ['101010', '101011', '110010', '100110'],
    answer: 0,
    hint: '42 = 32 + 8 + 2.',
    explanation: '42 = 32+8+2 = 1x32, 0x16, 1x8, 0x4, 1x2, 0x1 = 101010.',
    skills: ['decimal-to-binary']
  },
};
