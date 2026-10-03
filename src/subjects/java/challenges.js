export const CHALLENGES = {
  /* ---- Variables Lab ---- */
  v1: {
    type: 'mc', world: 'variables',
    prompt: "Which type best stores a person's age (e.g. 16)?",
    options: ['String', 'int', 'double', 'char'],
    answer: 1,
    hint: 'Ages are whole numbers, not decimals or text.',
    explanation: 'int is for whole numbers. double works but uses more memory. String would store "16" as text — you couldn\'t do maths on it.',
    skills: ['U2-S3']
  },
  v2: {
    type: 'mc', world: 'variables',
    prompt: 'Which type best stores an average rainfall reading like 12.4 mm?',
    options: ['int', 'char', 'double', 'String'],
    answer: 2,
    hint: 'You need to keep the digits after the decimal point.',
    explanation: 'double is for real numbers (decimals). int would chop off the .4 and you\'d lose accuracy.',
    skills: ['U2-S3']
  },
  v3: {
    type: 'mc', world: 'variables',
    prompt: "Which type best stores a single grade letter like 'B'?",
    options: ['String', 'int', 'char', 'double'],
    answer: 2,
    hint: 'It\'s exactly one character — not a word.',
    explanation: 'char stores exactly one character. String works too but is overkill for a single letter.',
    skills: ['U2-S3', 'U3-S1']
  },
  v4: {
    type: 'mc', world: 'variables',
    prompt: 'What value does x hold after this code runs?',
    code: 'int x = 7 / 2;',
    options: ['3', '3.5', '4', '0'],
    answer: 0,
    hint: 'Both numbers are integers, so Java does integer division.',
    explanation: 'When you divide two ints, Java throws away the decimal part. 7 / 2 is 3, not 3.5.',
    skills: ['U2-S5', 'U2-S6']
  },
  v5: {
    type: 'mc', world: 'variables',
    prompt: 'What value does r hold after this code runs?',
    code: 'int r = 17 % 5;',
    options: ['3', '2', '12', '3.4'],
    answer: 1,
    hint: 'The % operator gives the remainder.',
    explanation: '17 ÷ 5 is 3 remainder 2. The % operator returns the remainder, so r is 2.',
    skills: ['U2-S5', 'U2-S6']
  },
  v6: {
    type: 'mc', world: 'variables',
    prompt: 'What value does y hold after this code runs?',
    code: 'double y = 7.0 / 2;',
    options: ['3', '3.5', '4', '0.5'],
    answer: 1,
    hint: 'One of the values is a double. Does that change the rule?',
    explanation: 'Because 7.0 is a double, Java does real-number division. 7.0 / 2 = 3.5.',
    skills: ['U2-S5', 'U2-S6']
  },
  v7: {
    type: 'mc', world: 'variables',
    prompt: 'Which operator goes in the blank so count becomes 6?',
    code: 'int count = 5;\ncount___;\n// count is now 6',
    options: ['++', '--', '+=', '== 6'],
    answer: 0,
    hint: 'You\'re adding exactly 1.',
    explanation: 'count++ is shorthand for count = count + 1.',
    skills: ['U2-S7']
  },
  v8: {
    type: 'mc', world: 'variables',
    prompt: 'What is a after these three lines?',
    code: 'int a = 3;\na += 4;\na *= 2;',
    options: ['10', '14', '11', '7'],
    answer: 1,
    hint: 'Do them in order: first +=, then *=.',
    explanation: 'a = 3, then a += 4 makes a = 7, then a *= 2 makes a = 14.',
    skills: ['U2-S5', 'U2-S7']
  },
  v9: {
    type: 'mc', world: 'variables',
    prompt: 'Which of these is NOT a valid variable name in Java?',
    options: ['firstName', '_score', '2ndPlace', 'totalSum'],
    answer: 2,
    hint: 'Look at how each one starts.',
    explanation: 'Variable names cannot start with a digit. 2ndPlace is invalid. _score is fine — underscores are allowed.',
    skills: ['U2-S8']
  },
  v10: {
    type: 'mc', world: 'variables',
    prompt: 'What is x after this code runs?',
    code: 'double pi = 3.14;\nint x = (int) pi;',
    options: ['3', '4', '3.14', 'error'],
    answer: 0,
    hint: 'Casting a double to int chops off the decimal.',
    explanation: 'Casting a double to int does not round — it truncates. (int) 3.14 = 3.',
    skills: ['U3-S5']
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
    skills: ['U4-S12', 'U2-S5']
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
    skills: ['U2-S4']
  },

  /* ---- String Cave ---- */
  s1: {
    type: 'mc', world: 'strings',
    prompt: 'Which type uses SINGLE quotes around its value?',
    options: ['String', 'char', 'int', 'double'],
    answer: 1,
    hint: 'One symbol, one type.',
    explanation: 'char uses single quotes: \'A\'. String uses double quotes: "A".',
    skills: ['U3-S1']
  },
  s2: {
    type: 'tf', world: 'strings',
    prompt: 'This declaration is valid Java:',
    code: 'char c = "A";',
    answer: false,
    hint: 'Look at the quotes.',
    explanation: 'False. char needs single quotes: char c = \'A\'. With double quotes "A" is a String, not a char.',
    skills: ['U3-S1']
  },
  s3: {
    type: 'mc', world: 'strings',
    prompt: 'Which type would you use to store the sentence "Hello, world"?',
    options: ['char', 'String', 'int', 'double'],
    answer: 1,
    hint: 'It\'s more than one character.',
    explanation: 'String stores any sequence of characters. char only holds one.',
    skills: ['U3-S1']
  },
  s4: {
    type: 'mc', world: 'strings',
    prompt: 'What does this expression evaluate to?',
    code: '"Angelo".length()',
    options: ['5', '6', '7', '"Angelo"'],
    answer: 1,
    hint: 'Count the letters.',
    explanation: 'A-n-g-e-l-o is 6 characters, so length() returns 6.',
    skills: ['U3-S4']
  },
  s5: {
    type: 'mc', world: 'strings',
    prompt: 'What does this expression evaluate to?',
    code: '"Java".charAt(0)',
    options: ["'J'", "'a'", "'v'", "'J'a"],
    answer: 0,
    hint: 'Indexing starts at zero — what\'s the first character?',
    explanation: 'String positions start at 0. Index 0 of "Java" is \'J\'.',
    skills: ['U3-S4']
  },
  s6: {
    type: 'mc', world: 'strings',
    prompt: 'What does this expression evaluate to?',
    code: '"Hello".charAt(4)',
    options: ["'l'", "'o'", "'H'", 'error'],
    answer: 1,
    hint: 'Index 0 is \'H\'. Count up: H=0, e=1, l=2, l=3, o=4.',
    explanation: 'Indexing starts at 0, so index 4 of "Hello" is the fifth character — \'o\'.',
    skills: ['U3-S4']
  },
  s7: {
    type: 'mc', world: 'strings',
    prompt: 'Which escape sequence inserts a new line?',
    options: ['\\t', '\\n', '\\\\', '\\"'],
    answer: 1,
    hint: 'n stands for "new line".',
    explanation: '\\n is the newline escape. \\t is tab. \\\\ is a backslash. \\" is a quote inside a string.',
    skills: ['U3-S3']
  },
  s8: {
    type: 'mc', world: 'strings',
    prompt: 'What character does this return?',
    code: 'String w = "Code";\nw.charAt(w.length() - 1);',
    options: ["'C'", "'o'", "'d'", "'e'"],
    answer: 3,
    hint: 'length() is 4. Subtract 1 to get the last index.',
    explanation: '"Code" has length 4. The last index is 4 - 1 = 3, and charAt(3) is \'e\'.',
    skills: ['U3-S4']
  },
  s9: {
    type: 'mc', world: 'strings',
    prompt: 'What does this evaluate to?',
    code: 'Math.sqrt(16)',
    options: ['4', '4.0', '8.0', '256'],
    answer: 1,
    hint: 'Math.sqrt always returns a double.',
    explanation: 'Math.sqrt returns a double, so the answer is 4.0, not the int 4.',
    skills: ['U3-S7']
  },
  s10: {
    type: 'mc', world: 'strings',
    prompt: 'What does this evaluate to?',
    code: 'Math.pow(2, 5)',
    options: ['7.0', '10.0', '32.0', '25.0'],
    answer: 2,
    hint: 'pow(a, b) means "a to the power of b".',
    explanation: 'Math.pow(2, 5) is 2⁵ = 32. It returns a double, so 32.0.',
    skills: ['U3-S7']
  },
  s11: {
    type: 'mc', world: 'strings',
    prompt: 'What is printed?',
    code: 'System.out.println("It\\\'s nice");',
    options: ['It\\\'s nice', "It's nice", 'It"s nice', 'compile error'],
    answer: 1,
    hint: '\\\' means "I want a real apostrophe here".',
    explanation: 'The escape \\\' inserts a literal apostrophe inside the string. The output is: It\'s nice.',
    skills: ['U3-S3']
  },
  s12: {
    type: 'mc', world: 'strings',
    prompt: 'What does this print?',
    code: 'int code = 65;\nchar letter = (char) code;\nSystem.out.print(letter);',
    options: ["A", "65", "a", "char"],
    answer: 0,
    hint: 'The ASCII code 65 maps to a capital letter.',
    explanation: '(char) 65 converts the integer 65 to its character: \'A\'. So the output is A.',
    skills: ['U3-S5', 'U3-S1']
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
    skills: ['U5-S3']
  },
  l2: {
    type: 'mc', world: 'loops',
    prompt: 'How many times does this loop run?',
    code: 'for (int i = 0; i < 10; i += 2) {\n    System.out.println(i);\n}',
    options: ['10', '5', '6', '4'],
    answer: 1,
    hint: 'i jumps by 2 each time. List the values it takes.',
    explanation: 'i = 0, 2, 4, 6, 8 — five iterations. At 10 the condition fails.',
    skills: ['U5-S3']
  },
  l3: {
    type: 'tf', world: 'loops',
    prompt: 'This loop runs at least once:',
    code: 'for (int i = 10; i <= 5; i++) {\n    System.out.println("hi");\n}',
    answer: false,
    hint: 'Check the condition before the first iteration.',
    explanation: 'False. The condition i <= 5 is already false on entry (10 is not <= 5), so the body never runs.',
    skills: ['U5-S3', 'U5-S5']
  },
  l4: {
    type: 'mc', world: 'loops',
    prompt: 'What does this print? (values separated by spaces)',
    code: 'for (int i = 1; i <= 3; i++) {\n    System.out.print(i + " ");\n}',
    options: ['1 2 3', '0 1 2', '1 2 3 4', '3 2 1'],
    answer: 0,
    hint: 'i goes 1, then 2, then 3.',
    explanation: 'The loop prints i for i = 1, 2, 3 → "1 2 3 ".',
    skills: ['U5-S4']
  },
  l5: {
    type: 'mc', world: 'loops',
    prompt: 'What does this print?',
    code: 'for (int i = 5; i >= 1; i--) {\n    System.out.print(i + " ");\n}',
    options: ['1 2 3 4 5', '5 4 3 2 1', '5 4 3 2', '5'],
    answer: 1,
    hint: 'i-- means count down.',
    explanation: 'Counting backwards from 5 to 1 prints "5 4 3 2 1".',
    skills: ['U5-S4', 'U5-S6']
  },
  l6: {
    type: 'mc', world: 'loops',
    prompt: 'What is the final value of total?',
    code: 'int total = 0;\nfor (int i = 1; i <= 5; i++) {\n    total = total + i;\n}',
    options: ['5', '10', '15', '120'],
    answer: 2,
    hint: 'Add up 1 + 2 + 3 + 4 + 5.',
    explanation: 'You\'re summing 1 to 5: 1+2+3+4+5 = 15.',
    skills: ['U5-S9']
  },
  l7: {
    type: 'mc', world: 'loops',
    prompt: 'What does this print?',
    code: 'for (char c = \'A\'; c <= \'C\'; c++) {\n    System.out.print(c);\n}',
    options: ['ABC', 'A B C', '65 66 67', 'AAA'],
    answer: 0,
    hint: 'You can loop with chars too — they go up by 1 in their codes.',
    explanation: 'c goes from \'A\' to \'C\', incrementing each time. Output: ABC.',
    skills: ['U5-S4', 'U5-S7']
  },
  l8: {
    type: 'mc', world: 'loops',
    prompt: 'Which loop runs FOREVER if you actually ran it?',
    code: '// Option A:\nfor (int i = 0; i < 5; i++) { ... }\n\n// Option B:\nfor (int i = 0; i < 5; i--) { ... }',
    options: ['Option A', 'Option B', 'Both', 'Neither'],
    answer: 1,
    hint: 'Look at how each one updates i.',
    explanation: 'Option B starts at 0 and decreases — i never reaches 5, so the condition stays true forever. That\'s an infinite loop.',
    skills: ['U5-S5']
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
    skills: ['U5-S9', 'U4-S12']
  },
  l10: {
    type: 'mc', world: 'loops',
    prompt: 'A loop adds 5 numbers into total. Which expression gives the correct average of 4.4?',
    code: 'int total = 22;\nint count = 5;\ndouble avg = ___;',
    options: ['total / count', 'total * count', '(double) total / count', 'total - count'],
    answer: 2,
    hint: 'You want a decimal answer. What kind of division do you need?',
    explanation: 'total / count is int / int, so it gives 4 and avg stores 4.0. Casting first, (double) total / count, makes it 22.0 / 5 = 4.4.',
    skills: ['U5-S9', 'U3-S5']
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
    skills: ['U5-S9', 'U5-S13']
  },
  l12: {
    type: 'error-spot', world: 'loops',
    prompt: 'This loop was meant to print "Hi" five times. How many times is "Hi" actually printed?',
    code: 'for (int loop = 1; loop <= 5; loop++);\n{\n    System.out.println("Hi");\n}',
    options: ['5', '1', '0', 'It never stops'],
    answer: 1,
    hint: 'Look very carefully at the end of the loop header.',
    explanation: 'The semicolon after the header ends the for statement, so the loop repeats nothing. The block in curly brackets then runs once only, after the loop.',
    skills: ['U5-S5', 'U5-S2']
  },

  /* ---- Logic Base ---- */
  g1: {
    type: 'tf', world: 'logic',
    prompt: 'This expression is true:',
    code: '5 > 3',
    answer: true,
    hint: 'Is 5 greater than 3?',
    explanation: 'True. 5 is greater than 3.',
    skills: ['U7-S2']
  },
  g2: {
    type: 'mc', world: 'logic',
    prompt: 'Which operator means "not equal to"?',
    options: ['=', '==', '!=', '<>'],
    answer: 2,
    hint: 'It\'s the != combination.',
    explanation: '!= means "not equal". == is "equal". = is assignment.',
    skills: ['U7-S2']
  },
  g3: {
    type: 'tf', world: 'logic',
    prompt: 'This expression is true:',
    code: '7 == 7 && 3 < 1',
    answer: false,
    hint: '&& needs BOTH sides to be true.',
    explanation: 'False. 7 == 7 is true, but 3 < 1 is false. With &&, both must be true.',
    skills: ['U7-S8']
  },
  g4: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when x = 5?',
    code: 'if (x > 10) {\n    System.out.print("big");\n} else {\n    System.out.print("small");\n}',
    options: ['big', 'small', 'nothing', 'error'],
    answer: 1,
    hint: 'Is 5 > 10?',
    explanation: '5 > 10 is false, so the else branch runs and prints "small".',
    skills: ['U7-S1']
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
    skills: ['U7-S2', 'U7-S8', 'U7-S9']
  },
  g6: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when score = 72?',
    code: 'if (score >= 80) {\n    System.out.print("A");\n} else if (score >= 70) {\n    System.out.print("B");\n} else if (score >= 60) {\n    System.out.print("C");\n} else {\n    System.out.print("F");\n}',
    options: ['A', 'B', 'C', 'F'],
    answer: 1,
    hint: '72 fails the first check. Try the second.',
    explanation: '72 is not >= 80, but it IS >= 70, so the second branch runs and prints "B".',
    skills: ['U7-S1', 'U7-S6']
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
    skills: ['U7-S8']
  },
  g8: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when x = -3?',
    code: 'if (x > 0) {\n    System.out.print("positive");\n} else if (x < 0) {\n    System.out.print("negative");\n} else {\n    System.out.print("zero");\n}',
    options: ['positive', 'negative', 'zero', 'nothing'],
    answer: 1,
    hint: 'Walk through each condition.',
    explanation: '-3 is not > 0, so first branch fails. -3 < 0 is true, so it prints "negative".',
    skills: ['U7-S1', 'U7-S6']
  },
  g9: {
    type: 'mc', world: 'logic',
    prompt: 'These two conditions are equivalent:',
    code: '!(x > 0)\nx <= 0',
    options: ['Always equivalent', 'Only when x is even', 'Only when x is positive', 'Never equivalent'],
    answer: 0,
    hint: '"NOT (x > 0)" means "x is NOT greater than 0".',
    explanation: 'If x is not greater than 0, then x must be less than or equal to 0. Logically identical.',
    skills: ['U7-S8']
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
    skills: ['U4-S5', 'U7-S1']
  },
  g11: {
    type: 'mc', world: 'logic',
    prompt: 'A program crashes only when run, not when compiled. What kind of error is that?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'No error'],
    answer: 1,
    hint: 'Syntax errors stop compilation. This one passes compilation.',
    explanation: 'Runtime errors only show up while the program is running (e.g. dividing by zero). Syntax errors stop compilation. Logical errors give wrong answers without crashing.',
    skills: ['U4-S10']
  },
  g12: {
    type: 'mc', world: 'logic',
    prompt: 'What does this print when age = 17 and hasLicence = true?',
    code: 'if (age >= 18 && hasLicence) {\n    System.out.print("can drive");\n} else {\n    System.out.print("cannot drive");\n}',
    options: ['can drive', 'cannot drive', 'nothing', 'error'],
    answer: 1,
    hint: 'Both sides of && must be true.',
    explanation: 'age >= 18 is false (17 < 18). With &&, one false side makes the whole condition false. So the else branch runs.',
    skills: ['U7-S1', 'U7-S8']
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
    skills: ['U2-S4']
  },
  v14: {
    type: 'error-spot', world: 'variables',
    prompt: 'What kind of error will the compiler complain about here?',
    code: 'int score = 75\nSystem.out.println(score);',
    options: ['Syntax error — missing semicolon', 'Runtime error', 'Logical error', 'No error at all'],
    answer: 0,
    hint: 'Look at the end of line 1.',
    explanation: 'Java statements end with a semicolon. The compiler will refuse to build this — that\'s a syntax error.',
    skills: ['U4-S10']
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
    skills: ['U4-S12', 'U2-S6', 'U2-S5']
  },
  v16: {
    type: 'code-write', world: 'variables',
    prompt: 'Write the NumberResults program: ask the user for two whole numbers, then display the first number doubled and the two numbers multiplied, each with a meaningful message.',
    criteria: 'Class NumberResults. Import javax.swing.*. Declare two int variables. Read each number with JOptionPane.showInputDialog using a clear input prompt and convert it with Integer.parseInt. Display the first number and the number doubled with a message, for example "40 doubled is 80". Display the product of the two numbers with a message, for example "40 multiplied by 10 is 400". Use brackets around calculations inside System.out.println so they are not concatenated.',
    starter: 'import javax.swing.*;\n\npublic class NumberResults {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U2-S4', 'U2-S5', 'U2-S9'],
    explanation: 'Input, conversion with Integer.parseInt, arithmetic and labelled output are the building blocks of every Unit 2 program. With 40 and 10 the program should show 80 and 400.'
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
    skills: ['U2-S7', 'U7-S2']
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
    skills: ['U2-S9', 'U3-S4']
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
    skills: ['U4-S10']
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
    skills: ['U4-S12', 'U3-S4']
  },
  s16: {
    type: 'code-write', world: 'strings',
    prompt: 'Write a program that asks for a name and prints just the first letter (in capitals).',
    criteria: 'Use JOptionPane to ask for a name (a String). Get the first character with charAt(0). Print it on its own line. You can use Character.toUpperCase to make it capital, or assume the user types in capitals already — both are fine.',
    starter: 'import javax.swing.JOptionPane;\n\npublic class FirstLetter {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U3-S4'],
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
    skills: ['U3-S7']
  },

  /* ==== LOOPS — Code Workshop ==== */
  l13: {
    type: 'code-read', world: 'loops',
    prompt: 'What does this loop print?',
    code: 'for (int i = 11; i <= 19; i = i + 4) {\n    System.out.print(i + " ");\n}',
    options: ['11 12 13 14 15', '11 15 19', '11 15', '15 19 23'],
    answer: 1,
    hint: 'Start at 11 and add 4 each pass. Stop when i is more than 19.',
    explanation: 'i takes the values 11, 15 and 19. The next value, 23, makes i <= 19 false, so the loop ends.',
    skills: ['U5-S4', 'U5-S8']
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
    skills: ['U4-S10', 'U5-S3']
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
    skills: ['U4-S12', 'U5-S9']
  },
  l16: {
    type: 'code-write', world: 'loops',
    prompt: 'Write a loop that prints the even numbers from 2 up to 20 (inclusive), each on its own line.',
    criteria: 'Class EvenNumbers. Use a single for loop whose loop control variable starts at 2 and is increased by 2 each pass (num = num + 2 or num += 2) until it reaches 20. Print exactly 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, each on its own line using System.out.println. Add a heading line before the loop.',
    starter: 'public class EvenNumbers {\n    public static void main(String[] args) {\n        // your loop here\n    }\n}',
    skills: ['U5-S8', 'U5-S4'],
    explanation: 'Changing the loop control variable by 2 means the loop variable itself is the even number, so no second variable is needed. This is the textbook EvenNumbers activity.'
  },
  l17: {
    type: 'mc', world: 'loops',
    prompt: 'You need to print "Hello" exactly five times. Which approach is best?',
    options: [
      'Write System.out.println("Hello"); five times in a row',
      'Use a for loop that runs 5 times with one println inside',
      'Use an if statement',
      'Store "Hello" in five separate String variables'
    ],
    answer: 1,
    hint: 'Pattern recognition: the same statement is repeated a set number of times.',
    explanation: 'Writing the line five times works, but a for loop is shorter and easy to change if the count changes later or comes from user input. Spotting repetition that belongs in a loop is pattern recognition.',
    skills: ['U4-S4', 'U5-S1']
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
    skills: ['U7-S6', 'U2-S6']
  },
  g14: {
    type: 'error-spot', world: 'logic',
    prompt: 'The programmer wanted to test whether x is 10. What is wrong with this code?',
    code: 'int x = 5;\nif (x = 10) {\n    System.out.print("yes");\n}',
    options: [
      'Nothing, it is correct Java',
      'Syntax error: = assigns a value, the condition needs x == 10',
      'Run time error: x is not 10',
      'Logical error: it always prints yes'
    ],
    answer: 1,
    hint: 'There is a single = where there should be a comparison.',
    explanation: 'x = 10 is an assignment, which gives an int, not true or false, so the compiler rejects it (incompatible types). A condition that checks equality must use the double equals: if (x == 10).',
    skills: ['U7-S10', 'U4-S10']
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
    skills: ['U4-S12', 'U7-S1', 'U7-S6']
  },
  g16: {
    type: 'code-write', world: 'logic',
    prompt: 'Write a program that asks for a temperature in °C and prints "freezing", "normal", or "hot".',
    criteria: 'Use JOptionPane to ask for the temperature. Convert with Integer.parseInt (or Double.parseDouble — both fine). Rules: below 10 = "freezing", from 10 up to (but not including) 30 = "normal", 30 or higher = "hot". Print the result with System.out.println.',
    starter: 'import javax.swing.JOptionPane;\n\npublic class TempCheck {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U7-S1', 'U7-S6', 'U7-S9'],
    explanation: 'Three-way classification with if/else if/else is one of the most common patterns in real programs.'
  },
  g17: {
    type: 'mc', world: 'logic',
    prompt: 'In Java, what is the result of: 3 > 2 && 5 < 4 || 1 == 1',
    options: ['true', 'false', 'compile error', 'depends on the variables'],
    answer: 0,
    hint: 'AND is done before OR. So evaluate (3>2 && 5<4) first, then OR with (1==1).',
    explanation: 'The order is brackets, NOT, AND, OR. So (3>2 && 5<4) becomes (true && false) = false. Then false || (1==1) = false || true = true.',
    skills: ['U7-S8', 'U7-S11']
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
    skills: ['U4-S1', 'U4-S2']
  },
  a2: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which technique means "looking for similarities between problems or parts of a problem"?',
    options: ['Decomposition', 'Pattern recognition', 'Abstraction', 'Pseudocode'],
    answer: 1,
    hint: 'It\'s in the name.',
    explanation: 'Pattern recognition is spotting things that repeat or are similar — so you can reuse a known solution instead of inventing a new one.',
    skills: ['U4-S1', 'U4-S4']
  },
  a3: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which technique means "focusing on what\'s important and ignoring irrelevant detail"?',
    options: ['Decomposition', 'Pattern recognition', 'Abstraction', 'Algorithm'],
    answer: 2,
    hint: 'Like zooming in on a camera — only what\'s in the viewfinder matters.',
    explanation: 'Abstraction is the "zoom in / zoom out" idea: keep only the details that matter for the problem, drop the rest.',
    skills: ['U4-S1', 'U4-S4']
  },
  a4: {
    type: 'mc', world: 'algorithms',
    prompt: 'Which technique means "writing the step-by-step solution"?',
    options: ['Algorithm', 'Decomposition', 'Pattern recognition', 'Abstraction'],
    answer: 0,
    hint: 'A recipe is one of these.',
    explanation: 'An algorithm is the actual list of steps to follow — written as pseudocode, a flowchart, or eventually as code.',
    skills: ['U4-S5']
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
    skills: ['U4-S3', 'U4-S2']
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
    skills: ['U4-S3']
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
    skills: ['U4-S3']
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
    skills: ['U4-S3', 'U4-S5']
  },

  a9: {
    type: 'mc', world: 'algorithms',
    prompt: 'In a flowchart, which shape is used for INPUT or OUTPUT?',
    options: ['Rectangle', 'Diamond', 'Parallelogram (slanted rectangle)', 'Oval (rounded rectangle)'],
    answer: 2,
    hint: 'Slanted sides. It looks like a leaning rectangle.',
    explanation: 'A parallelogram is the input/output shape. Rectangle = statement. Diamond = decision. Oval = start/end.',
    skills: ['U4-S7']
  },
  a10: {
    type: 'mc', world: 'algorithms',
    prompt: 'In a flowchart, which shape is used for START or END?',
    options: ['Rectangle', 'Diamond', 'Parallelogram', 'Oval (rounded rectangle)'],
    answer: 3,
    hint: 'Curved at the ends.',
    explanation: 'Oval (or rounded rectangle) marks where the program begins and ends.',
    skills: ['U4-S7']
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
    skills: ['U4-S6']
  },
  a12: {
    type: 'tf', world: 'algorithms',
    prompt: 'Pseudocode should include variable type declarations like "int" or "double".',
    answer: false,
    hint: 'Pseudocode is meant to work with ANY programming language.',
    explanation: 'False. Pseudocode is language-independent. Different languages have different type rules, so pseudocode skips type declarations entirely.',
    skills: ['U4-S6']
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
    skills: ['U4-S6', 'U4-S5']
  },

  a14: {
    type: 'mc', world: 'algorithms',
    prompt: 'The program won\'t compile. The IDE says "missing semicolon". What kind of error is this?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'Acceptance error'],
    answer: 0,
    hint: 'Compile-time problems are always one type.',
    explanation: 'Syntax errors are spotted by the compiler before the program runs. They\'re the easiest to find — the IDE shows you exactly where.',
    skills: ['U4-S10']
  },
  a15: {
    type: 'mc', world: 'algorithms',
    prompt: 'The program compiles fine. It runs. But it crashes when the user enters 0 for the divisor. What kind of error?',
    options: ['Syntax error', 'Runtime error', 'Logical error', 'No error'],
    answer: 1,
    hint: 'It happens while the program is RUNNING.',
    explanation: 'Runtime errors only show up while the program is running. Dividing by zero, square root of a negative number, parsing "abc" as int — all classic runtime errors.',
    skills: ['U4-S10']
  },
  a16: {
    type: 'mc', world: 'algorithms',
    prompt: 'The program compiles and runs without stopping, but it works out the sum instead of the average of four numbers. What kind of error is this?',
    options: ['Syntax error', 'Run time error', 'Logical error', 'No error'],
    answer: 2,
    hint: 'No crash, no compiler complaint, just a wrong answer.',
    explanation: 'Logical errors are the hardest to find. The program compiles and runs but does not do what you wanted, and there is no error message. You find them with test data and trace tables.',
    skills: ['U4-S10']
  },
  a17: {
    type: 'mc', world: 'algorithms',
    prompt: 'A variable can hold values from 1 to 10. Which is STANDARD test data?',
    options: ['0', '5', '11', "'p'"],
    answer: 1,
    hint: 'Standard means a normal value comfortably inside the range.',
    explanation: '5 is well inside 1 to 10 — that\'s standard. 1 and 10 are extremes. 0 and 11 are extreme-incorrect. \'p\' is abnormal.',
    skills: ['U4-S11']
  },
  a18: {
    type: 'mc', world: 'algorithms',
    prompt: 'A variable can hold values from 1 to 10. Which is EXTREME test data?',
    options: ['5', '7', '1 or 10', "'p'"],
    answer: 2,
    hint: 'Extreme means right on the boundary.',
    explanation: '1 and 10 are the limits of the range — extreme test data. They check that your conditions like <= and >= work at the edges.',
    skills: ['U4-S11']
  },
  a19: {
    type: 'mc', world: 'algorithms',
    prompt: 'A variable should hold an integer from 1 to 10. Which is ABNORMAL test data?',
    options: ['5', '1', '10', "'p' or -3"],
    answer: 3,
    hint: 'Abnormal = wrong type or definitely outside the rules.',
    explanation: 'Abnormal data is data that should never legally appear: a letter where a number is expected, a negative when only positives are valid, or special keys.',
    skills: ['U4-S11']
  },
  a20: {
    type: 'code-write', world: 'algorithms',
    prompt: 'Write the CalcPrice program from your textbook in Java.',
    criteria: 'Class CalcPrice. Ask the user for a price with JOptionPane.showInputDialog and store it in a double using Double.parseDouble. Calculate discount = price * 0.05. Calculate VAT on the price AFTER the discount: VAT = (price - discount) * 0.15. Calculate result = price - discount + VAT. Display "The final amount is " + result. For a price of 250 the program must display 273.125 (not 275.0, which is the textbook logical error of working out VAT on the full price).',
    starter: 'import javax.swing.JOptionPane;\n\npublic class CalcPrice {\n    public static void main(String[] args) {\n        // input: ask for price\n\n        // processing: discount, VAT, result\n\n        // output: display the result\n    }\n}',
    skills: ['U4-S17', 'U4-S3', 'U2-S5'],
    explanation: 'The textbook first codes VAT as price * 0.15 and then uses a trace table to find the logical error: VAT must be calculated on the discounted price. 250 - 12.5 = 237.5, plus 15% VAT (35.625) gives 273.125.'
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
    skills: ['U6-S4']
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
    skills: ['U6-S4']
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
    skills: ['U6-S4']
  },
  o4: {
    type: 'tf', world: 'objects',
    prompt: 'A single class can be used to create many independent objects.',
    answer: true,
    hint: 'Think of a class as a dress pattern.',
    explanation: 'True. A class is like a pattern. You can make many objects from it, each with its own field values. Gogga one, Gogga two, Gogga three — independent and separate.',
    skills: ['U6-S4', 'U6-S6']
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
    skills: ['U6-S1']
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
    skills: ['U6-S1']
  },
  o7: {
    type: 'mc', world: 'objects',
    prompt: 'What is it called when several methods share the same name but have different parameter lists?',
    options: ['Method recursion', 'Method overloading', 'Method inheritance', 'Method assignment'],
    answer: 1,
    hint: 'Multiple versions of the same name → over-loaded.',
    explanation: 'Method overloading lets you have several methods (or constructors) with the same name. Java picks the right one by looking at the parameters — that\'s called method resolution.',
    skills: ['U6-S1']
  },
  o8: {
    type: 'code-read', world: 'objects',
    prompt: 'How many Gogga objects are created by this code?',
    code: 'Gogga one = new Gogga();\nGogga two = new Gogga(8, 2);\nGogga three = new Gogga(Color.yellow);\nGogga four = new Gogga(2, 7, Color.blue);',
    options: ['1', '2', '3', '4'],
    answer: 3,
    hint: 'Each new makes a new object.',
    explanation: 'Four objects, each created with a different constructor. Method overloading lets the same class create objects with different starting states.',
    skills: ['U6-S6', 'U6-S1']
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
    skills: ['U6-S2']
  },
  o10: {
    type: 'mc', world: 'objects',
    prompt: 'When creating a Color with Color(int r, int g, int b), what is the valid range for each value?',
    options: ['0 to 100', '0 to 255', '-255 to 255', '1 to 1000'],
    answer: 1,
    hint: 'It\'s an 8-bit value per channel.',
    explanation: 'Each of red, green, blue is 0 to 255 inclusive. 0 = none of that colour, 255 = maximum. Color(255, 0, 0) is pure red.',
    skills: ['U6-S3']
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
    skills: ['U6-S8']
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
    skills: ['U6-S8', 'U3-S5']
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
    skills: ['U6-S8']
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
    skills: ['U6-S2', 'U4-S12']
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
    skills: ['U6-S8']
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
    explanation: 'Gogga bug; only declares the variable, which holds no object yet. Java will not compile it, because the variable bug might not have been initialised. Add bug = new Gogga(); before calling move().',
    skills: ['U6-S4', 'U4-S10']
  },
  o17: {
    type: 'mc', world: 'objects',
    prompt: 'What colour will the Gogga be after this code?',
    code: 'Color custom = new Color(255, 0, 0);\nGogga bug = new Gogga(0, 0, custom);',
    options: ['Pure green', 'Pure blue', 'Pure red', 'White'],
    answer: 2,
    hint: 'Color(red, green, blue). Which channel is at maximum?',
    explanation: 'Color(255, 0, 0) = max red, no green, no blue → pure red. The bug is created at (0, 0) with that colour.',
    skills: ['U6-S3', 'U6-S1']
  },
  o18: {
    type: 'code-write', world: 'objects',
    prompt: 'Write a program that creates two Gogga objects with random RGB colours, places them at different positions, and makes each one move forward three times.',
    criteria: 'Import it.* and java.awt.Color. Generate three random integers from 0 to 255 with (int) (Math.random() * 256) and use them in new Color(red, green, blue). Pass that Color to a Gogga constructor such as new Gogga(2, 3, col1). Do the same for a second Gogga at a different position with its own random colour. Make each Gogga call move() three times.',
    starter: 'import it.*;\nimport java.awt.Color;\n\npublic class TwoRandomGoggas {\n    public static void main(String[] args) {\n        // Random colour 1\n\n        // Random colour 2\n\n        // Two Goggas at different positions\n\n        // Make each move 3 times\n    }\n}',
    skills: ['U6-S9', 'U6-S8', 'U6-S6'],
    explanation: 'This brings together everything from Unit 6: random numbers, the Color class, multiple objects, and method calls on each one.'
  },

  /* =========================================================================
     VARIABLE VALLEY — additional textbook coverage (Unit 2)
     ========================================================================= */

  v18: {
    type: 'code-read', world: 'variables',
    prompt: 'What does this statement display?',
    code: 'System.out.println("The sum is " + 4 + 5);',
    options: ['The sum is 45', 'The sum is 9', 'The sum is 4 + 5', 'A syntax error'],
    answer: 0,
    hint: '+ works from left to right. What type is on the left of the first +?',
    explanation: '"The sum is " + 4 gives the String "The sum is 4", and joining 5 to it gives "The sum is 45". Brackets, "The sum is " + (4 + 5), force the addition first and display 9.',
    skills: ['U2-S9']
  },
  v19: {
    type: 'trace', world: 'variables',
    prompt: 'Work out each result as Java would (integer division and modulus). Type whole numbers, with a minus sign where needed.',
    code: '43 / 5\n43 % 5\n12 / 15\n12 % 15\n-14 / 8\n-14 % 8',
    rows: [
      { label: '43 / 5', answer: '8' },
      { label: '43 % 5', answer: '3' },
      { label: '12 / 15', answer: '0' },
      { label: '12 % 15', answer: '12' },
      { label: '-14 / 8', answer: '-1' },
      { label: '-14 % 8', answer: '-6' }
    ],
    hint: 'DIV keeps only the whole number part. MOD is what is left over. With a negative first number the remainder is negative too.',
    explanation: '43 = 8 x 5 + 3. 12 / 15 is 0 remainder 12. -14 / 8 is -1.75, and Java drops the decimal part to give -1; -14 - (-1 x 8) = -6.',
    skills: ['U2-S6']
  },
  v20: {
    type: 'mc', world: 'variables',
    prompt: 'What does Java calculate for this expression?',
    code: '4 + 5 * 3 - 12 % 5',
    options: ['17', '0', '25', '19'],
    answer: 0,
    hint: 'Do * and % first (from left to right), then + and -.',
    explanation: '5 * 3 = 15 and 12 % 5 = 2 are done first. Then 4 + 15 = 19 and 19 - 2 = 17.',
    skills: ['U2-S12', 'U2-S6']
  },
  v21: {
    type: 'mc', world: 'variables',
    prompt: 'What does Java calculate for this expression?',
    code: '(10 + 4) / (25 - 2 * 11)',
    options: ['4.67', '5', '4', '0'],
    answer: 2,
    hint: 'Brackets first. Inside a bracket, * still comes before -. Both values are int.',
    explanation: 'The first bracket gives 14. In the second bracket 2 * 11 = 22 is done before the subtraction, giving 3. 14 / 3 is integer division, so the answer is 4.',
    skills: ['U2-S12', 'U2-S6']
  },
  v22: {
    type: 'error-spot', world: 'variables',
    prompt: 'Why does this line not compile?',
    code: 'int tooBig = 2147483648;',
    options: [
      'The value is larger than the biggest int, 2 147 483 647',
      'Variable names cannot contain capital letters',
      'An int cannot store even numbers',
      'The semicolon must come before the value'
    ],
    answer: 0,
    hint: 'An int uses 32 bits. What is the largest value that fits?',
    explanation: 'An int is a 32-bit signed integer, so its largest value is 2^31 - 1 = 2 147 483 647. Use a type with a bigger range, for example long tooBig = 2147483648L;',
    skills: ['U2-S10']
  },
  v23: {
    type: 'match', world: 'variables',
    prompt: 'Match each data item to the most suitable data type.',
    pairs: [
      { left: 'A postal code such as 0003', right: 'String' },
      { left: 'An age in years', right: 'int' },
      { left: 'Your height in metres', right: 'double' },
      { left: 'Whether a person is a smoker', right: 'boolean' }
    ],
    answer: [0, 1, 2, 3],
    hint: 'Will you calculate with it? Does it need decimals? Is it only true or false?',
    explanation: 'A postal code is never used in calculations and its leading zeros must be kept, so it is a String. Ages are whole numbers (int), heights have decimals (double) and yes or no values are boolean.',
    skills: ['U2-S3', 'U2-S10']
  },
  v24: {
    type: 'error-spot', world: 'variables',
    prompt: 'What is wrong with this code?',
    code: 'double num;\ndouble num = 3.56;',
    options: [
      'num is declared twice, so Java reports an error',
      'A double cannot store 3.56',
      'Nothing, the second line overwrites the first',
      'double must be written with a capital D'
    ],
    answer: 0,
    hint: 'How many variables can have the same identifier?',
    explanation: 'A data type in front of a name declares a new variable. There cannot be two variables called num, so the compiler reports that num is already defined. Write the second line as num = 3.56;',
    skills: ['U2-S11', 'U2-S1']
  },
  v25: {
    type: 'error-spot', world: 'variables',
    prompt: 'What happens when this code is compiled?',
    code: 'int total;\ntotal = total + 5;\nSystem.out.println(total);',
    options: [
      'It prints 5',
      'It prints 0',
      'A compiler error: total might not have been initialised',
      'A run time error when line 3 runs'
    ],
    answer: 2,
    hint: 'What value does total have before line 2 runs?',
    explanation: 'A variable must be given a value before it is used. total was never initialised, so the compiler gives an error. Fix it with int total = 0;',
    skills: ['U2-S11']
  },
  v26: {
    type: 'tf', world: 'variables',
    prompt: 'The statement sum =+ x; does the same as sum += x;',
    answer: false,
    hint: 'Read =+ as two separate symbols.',
    explanation: 'False. sum =+ x; is read as sum = +x; so it simply stores x in sum. The compound assignment operator is +=, which means sum = sum + x.',
    skills: ['U2-S7']
  },
  v27: {
    type: 'trace', world: 'variables',
    prompt: 'Trace the value of x after each line.',
    code: 'int x = 10;\nx *= 5;\nx -= 8;\nx /= 4;\nx %= 3;',
    rows: [
      { label: 'x after line 2', answer: '50' },
      { label: 'x after line 3', answer: '42' },
      { label: 'x after line 4', answer: '10' },
      { label: 'x after line 5', answer: '1' }
    ],
    hint: 'x op= y means x = x op y. Remember that / with ints drops the remainder.',
    explanation: '10 * 5 = 50, 50 - 8 = 42, 42 / 4 = 10 (integer division) and 10 % 3 = 1.',
    skills: ['U2-S7', 'U2-S6', 'U2-S1']
  },
  v28: {
    type: 'mc', world: 'variables',
    prompt: 'Which statement must be added at the top of a program to use JOptionPane.showInputDialog?',
    options: ['import java.awt.*;', 'import it.*;', 'import javax.swing.*;', 'import java.lang.Integer;'],
    answer: 2,
    hint: 'JOptionPane is one of the swing classes.',
    explanation: 'showInputDialog is a method of the JOptionPane class, which is in the javax.swing package. import javax.swing.*; gives access to every class in that package.',
    skills: ['U2-S2']
  },
  v29: {
    type: 'code-read', world: 'variables',
    prompt: 'The user types 4 and then 3. What is displayed?',
    code: 'String num1, num2;\nnum1 = JOptionPane.showInputDialog("Type the first number");\nnum2 = JOptionPane.showInputDialog("Type the second number");\nSystem.out.println("The sum of the numbers is " + num1 + num2);',
    options: [
      'The sum of the numbers is 7',
      'The sum of the numbers is 43',
      'The sum of the numbers is 4 3',
      'A NumberFormatException'
    ],
    answer: 1,
    hint: 'What data type are num1 and num2?',
    explanation: 'num1 and num2 are Strings, so + joins them instead of adding: "4" + "3" gives "43". Declare them as int, convert with Integer.parseInt and put brackets around (num1 + num2).',
    skills: ['U2-S9', 'U2-S4']
  },
  v30: {
    type: 'code-write', world: 'variables',
    prompt: 'Write the Prices program: input three product names and their prices, then display a shopping list with a heading and the total cost.',
    criteria: 'Class Prices. Import javax.swing.*. Declare three String variables for the product names and three double variables for the prices. Use user-friendly prompts with JOptionPane.showInputDialog and convert each price with Double.parseDouble. Display a blank line with System.out.println(), then the heading SHOPPING LIST, then each product with its price next to it, then the total cost of the three items with a message. With Potatoes 121.99, Beans 33.85 and Sweetcorn 38.15 the total is 193.99.',
    starter: 'import javax.swing.*;\n\npublic class Prices {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U2-S2', 'U2-S4', 'U2-S3'],
    explanation: 'This brings together String and double variables, dialog input with conversion, and labelled output. Prices need double because they have cents.'
  },
  v31: {
    type: 'mc', world: 'variables',
    prompt: 'The type short stores a signed integer in 16 bits. What is the largest value it can store?',
    options: ['65 536', '32 767', '32 768', '16 384'],
    answer: 1,
    hint: 'Use 2^(n - 1) - 1 with n = 16.',
    explanation: 'One bit is used for the sign, so the largest value is 2^15 - 1 = 32 768 - 1 = 32 767. The smallest is -2^15 = -32 768.',
    skills: ['U2-S10']
  },
  v32: {
    type: 'mc', world: 'variables',
    prompt: 'What does Java calculate for this expression?',
    code: '5 + (7 * 2) % 4 - 13 / 8 + 1',
    options: ['6', '7', '8', '5'],
    answer: 1,
    hint: 'Brackets, then * / % from left to right, then + - from left to right.',
    explanation: 'Brackets: 7 * 2 = 14. Then 14 % 4 = 2 and 13 / 8 = 1. Finally from left to right: 5 + 2 = 7, 7 - 1 = 6, 6 + 1 = 7.',
    skills: ['U2-S12']
  },
  v33: {
    type: 'tf', world: 'variables',
    prompt: 'After this line runs, ans stores 2.5.',
    code: 'double ans = 5 / 2;',
    answer: false,
    hint: 'Look at the types on either side of the / sign, not the type of ans.',
    explanation: 'False. 5 / 2 is worked out first with two ints, giving 2. Only then is 2 converted to a double, so ans stores 2.0. The type of the variable on the left does not change how the division is done.',
    skills: ['U2-S6']
  },

  /* =========================================================================
     STRING STATION — additional textbook coverage (Unit 3)
     ========================================================================= */

  s18: {
    type: 'code-read', world: 'strings',
    prompt: 'What is displayed by this code?',
    code: 'char ch1 = \'a\';\nSystem.out.println(ch1);\nchar ch2 = 97;\nSystem.out.println(ch2);\nch1++;\nSystem.out.println(ch1);',
    options: [
      'a, a and b on three lines',
      'a, 97 and b on three lines',
      'a, a and 98 on three lines',
      'a, 97 and 98 on three lines'
    ],
    answer: 0,
    hint: 'ch2 is declared as a char, and 97 is the Unicode value of a.',
    explanation: 'Characters are stored as Unicode integers. ch2 = 97 stores the character a because ch2 is a char. ch1++ changes 97 to 98, and because ch1 is a char Java displays b.',
    skills: ['U3-S2']
  },
  s19: {
    type: 'trace', world: 'strings',
    prompt: 'Trace what is stored in wrd, ch and len.',
    code: 'String s1 = "hello";\nString s2 = "there";\nString wrd = "" + s2.charAt(0) + s1.charAt(4);\nchar ch = s2.charAt(3);\nint len = s2.length();',
    rows: [
      { label: 'wrd', answer: 'to' },
      { label: 'ch', answer: 'r' },
      { label: 'len', answer: '5' }
    ],
    hint: 'Number the characters from 0: t is 0, h is 1, e is 2, r is 3, e is 4.',
    explanation: 's2.charAt(0) is t and s1.charAt(4) is o, so wrd is "to" (the "" makes the result a String). Position 3 of "there" is r, and "there" has 5 characters.',
    skills: ['U3-S4']
  },
  s20: {
    type: 'code-read', world: 'strings',
    prompt: 'What does this code display?',
    code: 'String s1 = "polo";\nString s2 = "call";\nSystem.out.print(s2.charAt(0));\nSystem.out.print(s1.charAt(3));\nSystem.out.print(s1.charAt(1));\nSystem.out.print(s2.charAt(2));\nSystem.out.println("!");',
    options: ['pall!', 'cool!', 'clol!', 'colo!'],
    answer: 1,
    hint: 'Positions start at 0. print keeps everything on one line.',
    explanation: 'c (position 0 of call), o (position 3 of polo), o (position 1 of polo), l (position 2 of call), then the exclamation mark: cool!',
    skills: ['U3-S4']
  },
  s21: {
    type: 'mc', world: 'strings',
    prompt: 'What does this display?',
    code: 'System.out.println("ETHNIC AFRICA".length());',
    options: ['12', '13', '14', '11'],
    answer: 1,
    hint: 'Count every character, including the space.',
    explanation: 'ETHNIC has 6 letters, AFRICA has 6, and the space between them is also a character: 6 + 1 + 6 = 13.',
    skills: ['U3-S4']
  },
  s22: {
    type: 'error-spot', world: 'strings',
    prompt: 'Why does this statement give an error?',
    code: 'System.out.println(875.length());',
    options: [
      'length() can only be used with Strings, and 875 is an integer',
      'length needs a parameter inside its brackets',
      'println cannot display a number',
      'The method is called size(), not length()'
    ],
    answer: 0,
    hint: 'Which class does the length() method belong to?',
    explanation: 'length() is a method of the String class. 875 is an int, a primitive value with no methods. "875".length() would work and return 3.',
    skills: ['U3-S4']
  },
  s23: {
    type: 'code-read', world: 'strings',
    prompt: 'What does this display?',
    code: 'double x;\nx = 15 / 2;\nSystem.out.println(x);',
    options: ['7.5', '7', '7.0', '8.0'],
    answer: 2,
    hint: 'The right-hand side is worked out before it is stored.',
    explanation: '15 / 2 is integer division, giving 7. The 7 is then converted to a double when it is stored in x, so println shows 7.0.',
    skills: ['U3-S5', 'U2-S6']
  },
  s24: {
    type: 'mc', world: 'strings',
    prompt: 'Which statement stores 7.5 in the double variable x?',
    options: ['x = 15 / 2;', 'x = (double) (15 / 2);', 'x = (int) 15.0 / 2;', 'x = (double) 15 / 2;'],
    answer: 3,
    hint: 'The cast must change 15 into a double BEFORE the division happens.',
    explanation: '(double) 15 / 2 casts 15 to 15.0 first, so the division is 15.0 / 2 = 7.5. In (double) (15 / 2) the brackets make the integer division happen first, giving 7.0.',
    skills: ['U3-S5']
  },
  s25: {
    type: 'match', world: 'strings',
    prompt: 'Match each conversion to the way the textbook does it.',
    pairs: [
      { left: 'String to int', right: 'Integer.parseInt(str)' },
      { left: 'double to int', right: '(int) dblNum' },
      { left: 'int to String', right: '"" + intNum' },
      { left: 'String to char', right: 'str.charAt(position)' },
      { left: 'char to int', right: '(int) ch' }
    ],
    answer: [0, 1, 2, 3, 4],
    hint: 'Casts work between numbers and characters. Strings need methods, or joining to "".',
    explanation: 'Casts convert between char, int and double. Converting from a String needs parseInt, parseDouble or charAt. Joining a value to "" is the easiest way to make a String.',
    skills: ['U3-S6']
  },
  s26: {
    type: 'error-spot', world: 'strings',
    prompt: 'Why does the second line give an error?',
    code: 'char ch = \'k\';\nString str = ch;',
    options: [
      'A char cannot be assigned directly to a String; use String str = "" + ch;',
      'The char must be written in double quotes on line 1',
      'String must be written in lowercase',
      'ch must first be cast with (int)'
    ],
    answer: 0,
    hint: 'char and String are different data types.',
    explanation: 'A char cannot be stored directly in a String variable. Joining it to an empty String, "" + ch, converts it to a String.',
    skills: ['U3-S6', 'U3-S1']
  },
  s27: {
    type: 'mc', world: 'strings',
    prompt: 'What does this display?',
    code: 'System.out.println(Math.sqrt(-16));',
    options: ['4.0', '-4.0', 'NaN', '16'],
    answer: 2,
    hint: 'Does a negative number have a real square root?',
    explanation: 'There is no real square root of a negative number, so Math.sqrt returns NaN (Not a Number). Math.sqrt(Math.abs(-16)) gives 4.0.',
    skills: ['U3-S7']
  },
  s28: {
    type: 'trace', world: 'strings',
    prompt: 'Type exactly what each statement displays.',
    code: 'System.out.println(Math.pow(10, 2));\nSystem.out.println(Math.round(2.6));\nSystem.out.println(Math.abs(-16));\nSystem.out.println(Math.round(-3.8));',
    rows: [
      { label: 'Line 1', answer: '100.0' },
      { label: 'Line 2', answer: '3' },
      { label: 'Line 3', answer: '16' },
      { label: 'Line 4', answer: '-4' }
    ],
    hint: 'pow always returns a double. round returns a whole number. abs keeps the type it was given.',
    explanation: 'Math.pow returns a double, so 10 squared shows as 100.0. Math.round rounds to the nearest whole number: 2.6 becomes 3 and -3.8 becomes -4. Math.abs(-16) is 16.',
    skills: ['U3-S7']
  },
  s29: {
    type: 'code-read', world: 'strings',
    prompt: 'name stores "Thabo". How is the message shown in the dialog box?',
    code: 'JOptionPane.showMessageDialog(null, "Hello " + name + ".\\nHow are you?\\nI am fine");',
    options: [
      'On one line, with the \\n characters visible',
      'On three lines: Hello Thabo. / How are you? / I am fine',
      'On two lines: Hello Thabo. How are you? / I am fine',
      'On one line: Hello name. How are you? I am fine'
    ],
    answer: 1,
    hint: 'What does \\n do inside a String?',
    explanation: 'Each \\n starts a new line inside the dialog box, so the three sentences appear on separate lines. name is outside the quotes, so its value Thabo is shown.',
    skills: ['U3-S8', 'U3-S3']
  },
  s30: {
    type: 'mc', world: 'strings',
    prompt: 'Why is null used as the first parameter in JOptionPane.showMessageDialog(null, "Hi")?',
    options: [
      'It tells Java to show an empty message',
      'It means there is no GUI component, such as a frame, to display the message in',
      'It removes the OK button',
      'It sets the title of the dialog to nothing'
    ],
    answer: 1,
    hint: 'The first parameter names the component the message belongs to.',
    explanation: 'The first parameter is the GUI component the message is displayed in. Our programs have no frames or other GUI components, so we pass null, which means nothing.',
    skills: ['U3-S8']
  },
  s31: {
    type: 'tf', world: 'strings',
    prompt: 'The formatting character \\t can be used to line up columns inside a showMessageDialog box.',
    answer: false,
    hint: 'The textbook notes one formatting character that only works with System.out.',
    explanation: 'False. \\t cannot be used with showMessageDialog. It works with System.out.println, where it moves to the next tab stop. \\n works with both.',
    skills: ['U3-S3', 'U3-S8']
  },
  s32: {
    type: 'order', world: 'strings',
    prompt: 'Put the steps in order to round 5.6983 to 2 decimal places.',
    items: [
      'Divide by 100 to get 5.7',
      'Input the real number 5.6983',
      'Round to the nearest integer with Math.round to get 570',
      'Multiply by 100 to get 569.83'
    ],
    answer: [1, 3, 2, 0],
    hint: 'Move two decimal places in front of the point first, then move them back.',
    explanation: 'Multiplying by 100 moves two decimal places in front of the point, Math.round removes the rest, and dividing by 100 moves them back. In Java divide by 100.0, because Math.round returns a whole number and 570 / 100 would be integer division.',
    skills: ['U3-S9']
  },
  s33: {
    type: 'code-write', world: 'strings',
    prompt: 'Write the ColdDrinks program: cold drinks cost R23.89 each. Ask how many the customer wants and display the amount to pay. Then ask how much money (in whole rand) the customer gives and display the change rounded to 2 decimal places.',
    criteria: 'Class ColdDrinks. Import javax.swing.*. Store the price 23.89 in a double. Input the number of cold drinks and the amount given (whole rand) as ints using JOptionPane.showInputDialog and Integer.parseInt. Calculate amount = number * price and change = given - amount. Round the change to 2 decimal places with Math.round(change * 100) / 100.0. Display the number of drinks, the amount to pay and the change with clear messages. For 3 drinks and R100 the amount is 71.67 and the change is 28.33.',
    starter: 'import javax.swing.*;\n\npublic class ColdDrinks {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U3-S9', 'U3-S8', 'U3-S7'],
    explanation: 'Money calculations with doubles can produce long decimals, so rounding to 2 decimal places with Math.round makes the output readable.'
  },
  s34: {
    type: 'mc', world: 'strings',
    prompt: 'Why is Math.PI written without round brackets, unlike Math.sqrt(25)?',
    options: [
      'PI is a constant field of the Math class, not a method',
      'PI is a method that has no parameters',
      'Brackets are optional for every Math method',
      'PI is a variable you must declare first'
    ],
    answer: 0,
    hint: 'Only methods are followed by brackets.',
    explanation: 'Math.PI is a field declared as final, so its value cannot change. By convention constant fields are written in capital letters. Methods such as sqrt are followed by brackets.',
    skills: ['U3-S7']
  },
  s35: {
    type: 'code-read', world: 'strings',
    prompt: 'name stores "Doris". What is displayed?',
    code: 'char first = name.charAt(0);\nint position = (int) first - 64;\nSystem.out.println(position);',
    options: ['68', '4', '3', 'D'],
    answer: 1,
    hint: 'The Unicode value of A is 65.',
    explanation: 'The first letter is D, whose Unicode value is 68. 68 - 64 = 4, which is the position of D in the alphabet.',
    skills: ['U3-S6', 'U3-S2']
  },

  /* =========================================================================
     ALGORITHM TOWER — additional textbook coverage (Unit 4)
     ========================================================================= */

  a21: {
    type: 'mc', world: 'algorithms',
    prompt: 'In the IPO model used this year, where are the values the user types stored?',
    options: ['On the monitor', 'In variables in RAM', 'Inside the keyboard', 'In the ALU'],
    answer: 1,
    hint: 'Input comes from the keyboard, but it must be kept somewhere while the program runs.',
    explanation: 'Input comes from the keyboard and is stored in variables in RAM. The CPU does the processing, with calculations done by the ALU, and output goes to the monitor.',
    skills: ['U4-S3']
  },
  a22: {
    type: 'mc', world: 'algorithms',
    prompt: 'You recognise that a new problem is similar to one you have solved before. According to the textbook, what is the first option?',
    options: [
      'Write all the code again from scratch',
      'Ask the user to solve it',
      'Use the existing program, which has already been tested',
      'Draw a new flow chart before anything else'
    ],
    answer: 2,
    hint: 'Why redo work that is already tested?',
    explanation: 'An existing program has been tested and is probably error free, so using it is the first option. Next come pre-written methods, generic algorithms and code that can be repeated in loops.',
    skills: ['U4-S4']
  },
  a23: {
    type: 'mc', world: 'algorithms',
    prompt: 'When you analyse a problem statement, what should you underline?',
    options: [
      'Every number in the statement',
      'Words that describe what is to be done, such as find the average or calculate VAT',
      'The names of the people in the problem',
      'Words you do not understand'
    ],
    answer: 1,
    hint: 'You want to see clearly what the program must do.',
    explanation: 'To understand a problem: read it carefully, underline the words that describe what is to be done, state in your own words what you need to do, and list all the facts that are given.',
    skills: ['U4-S2']
  },
  a24: {
    type: 'mc', world: 'algorithms',
    prompt: 'The CalcPrice data structure stores the price, discount, VAT and final result. Which type does the textbook choose, and why?',
    options: [
      'int, because prices are whole numbers',
      'String, because the values are displayed',
      'char, because each is a single value',
      'double, because the problem deals with money'
    ],
    answer: 3,
    hint: 'Money has rand and cents.',
    explanation: 'A data structure is the set of main variables used for input, processing and output, each with a suitable type. Money has cents, so double is suitable.',
    skills: ['U4-S13']
  },
  a25: {
    type: 'tf', world: 'algorithms',
    prompt: 'In the Swop program, the variable temp is part of the main data structure.',
    answer: false,
    hint: 'How long is the value in temp actually needed?',
    explanation: 'False. temp only stores a value for a moment while the swop happens. Temporary or intermediate variables are not part of the main data structure; num1 and num2 are.',
    skills: ['U4-S13', 'U4-S15']
  },
  a26: {
    type: 'trace', world: 'algorithms',
    prompt: 'Trace the first version of CalcPrice for a price of 250. Type each value as Java would display it.',
    code: 'int price = 250;\ndouble discount = price * 0.05;\ndouble VAT = price * 0.15;\ndouble result = price - discount + VAT;\nSystem.out.println("The final amount is " + result);',
    rows: [
      { label: 'discount', answer: '12.5' },
      { label: 'VAT', answer: '37.5' },
      { label: 'result', answer: '275.0' }
    ],
    hint: '5% is 0.05 and 15% is 0.15. A double always shows a decimal point.',
    explanation: 'discount = 12.5, VAT = 37.5 and result = 250 - 12.5 + 37.5 = 275.0. The test plan expected 273.125, so the trace table exposes a logical error.',
    skills: ['U4-S12', 'U4-S17']
  },
  a27: {
    type: 'mc', world: 'algorithms',
    prompt: 'CalcPrice gives 275.0 for a price of 250, but 273.125 was expected. Which line fixes the logical error?',
    options: [
      'double VAT = price * 0.15 + discount;',
      'double VAT = (price - discount) * 0.15;',
      'double VAT = price * 15;',
      'double result = price + discount + VAT;'
    ],
    answer: 1,
    hint: 'VAT is charged on the price the customer actually pays.',
    explanation: 'VAT must be calculated on the discounted price: (250 - 12.5) x 0.15 = 35.625. Then 250 - 12.5 + 35.625 = 273.125.',
    skills: ['U4-S17', 'U4-S10']
  },
  a28: {
    type: 'trace', world: 'algorithms',
    prompt: 'Trace the swop. The user entered 5 for num1 and 10 for num2.',
    code: 'int temp = num1;\nnum1 = num2;\nnum2 = temp;',
    rows: [
      { label: 'temp after line 1', answer: '5' },
      { label: 'num1 after line 2', answer: '10' },
      { label: 'num2 after line 3', answer: '5' }
    ],
    hint: 'temp keeps a copy before num1 is overwritten.',
    explanation: 'temp keeps a copy of num1 (5) before num1 is overwritten with 10. num2 then gets 5 from temp, so the values are swopped.',
    skills: ['U4-S15', 'U4-S12']
  },
  a29: {
    type: 'error-spot', world: 'algorithms',
    prompt: 'This code tries to swop num1 (5) and num2 (10). What goes wrong?',
    code: 'num1 = num2;\nnum2 = num1;',
    options: [
      'Both variables end up storing 10',
      'Both variables end up storing 5',
      'The values are swopped correctly',
      'A syntax error stops it compiling'
    ],
    answer: 0,
    hint: 'What happens to the 5 in num1 on line 1?',
    explanation: 'num1 = num2 overwrites the 5, which is lost. num2 = num1 then copies 10 back into num2. It compiles and runs, so this is a logical error; a temp variable fixes it.',
    skills: ['U4-S15', 'U4-S10']
  },
  a30: {
    type: 'order', world: 'algorithms',
    prompt: 'Put the steps in order to trace a program using the IDE.',
    items: [
      'Click the step icon to run one line at a time while watching the variables',
      'Make sure the program compiles',
      'Click the debug (lady beetle) icon',
      'Click next to the line number where the trace must start, so a red dot appears'
    ],
    answer: [1, 3, 2, 0],
    hint: 'A program must compile before it can be traced.',
    explanation: 'The program must compile first. The breakpoint (red dot) tells the IDE where to pause, debug runs the program up to it, and stepping runs one line at a time so you can watch the values change.',
    skills: ['U4-S16']
  },
  a31: {
    type: 'trace', world: 'algorithms',
    prompt: 'TempConversion uses this statement with celsius declared as double. Type the value of fahr as Java would display it.',
    code: 'double fahr = (9 * celsius) / 5 + 32;',
    rows: [
      { label: 'celsius = 0', answer: '32.0' },
      { label: 'celsius = 100', answer: '212.0' },
      { label: 'celsius = -3.5', answer: '25.7' }
    ],
    hint: 'celsius is a double, so the whole calculation is done with doubles.',
    explanation: '9 x 0 / 5 + 32 = 32.0. 9 x 100 / 5 + 32 = 212.0. 9 x -3.5 = -31.5, / 5 = -6.3, + 32 = 25.7. These match the test plan.',
    skills: ['U4-S17']
  },
  a32: {
    type: 'mc', world: 'algorithms',
    prompt: 'A client paid a company to write a weekly wages system. What is acceptance testing?',
    options: [
      'The programmer checks that every line compiles',
      'The client checks that the system meets all the criteria that were originally stated',
      'Testing with abnormal data only',
      'Accepting any program that runs without stopping'
    ],
    answer: 1,
    hint: 'Who has to accept the product before paying for it?',
    explanation: 'In acceptance testing the client is involved and checks that the product satisfies all the original criteria. Only then is the product signed off and paid for.',
    skills: ['U4-S14']
  },
  a33: {
    type: 'match', world: 'algorithms',
    prompt: 'Match each term to its meaning.',
    pairs: [
      { left: 'User-friendly', right: 'Easy for the end user to use when the program runs' },
      { left: 'Readable', right: 'Easy for another programmer to understand the code' },
      { left: 'Syntax error', right: 'Picked up by the compiler, for example a missing semicolon' },
      { left: 'Logical error', right: 'The program runs but does not do what was wanted' }
    ],
    answer: [0, 1, 2, 3],
    hint: 'One pair is about the user, one about the programmer, two about errors.',
    explanation: 'User-friendliness is about the person running the program; readability is about the person reading the code. Syntax errors stop the program compiling; logical errors give wrong results without an error message.',
    skills: ['U4-S8', 'U4-S9', 'U4-S10']
  },
  a34: {
    type: 'mc', world: 'algorithms',
    prompt: 'A program shows 10 lines of results using 10 separate showMessageDialog statements. Why is this poor user interface design?',
    options: [
      'showMessageDialog cannot display numbers',
      'The user must click OK ten times; combine the lines with \\n or use System.out.println',
      'The messages appear in the wrong order',
      'showMessageDialog can only be used once in a program'
    ],
    answer: 1,
    hint: 'Think about what the user must do to close each dialog.',
    explanation: 'Every dialog must be closed with OK, which frustrates the user. Rather combine the information into one statement using \\n, or use System.out.println, which has a larger area for output.',
    skills: ['U4-S8']
  },
  a35: {
    type: 'trace', world: 'algorithms',
    prompt: 'Trace this program. The user enters 4 for num2 and then 2 for num3.',
    code: 'num1 = 9;\nnum2 = Integer.parseInt(JOptionPane.showInputDialog(""));\nnum3 = Integer.parseInt(JOptionPane.showInputDialog(""));\nnum5 = num1 - (num2 - num3) % 5;\nnum4 = 2 * num2;\nnum2 = num4 + num5;\nnum3 = num2 % 6;\nnum1 = (num5 / 2) + (num3 * num3);',
    rows: [
      { label: 'num5', answer: '7' },
      { label: 'num4', answer: '8' },
      { label: 'final num2', answer: '15' },
      { label: 'final num3', answer: '3' },
      { label: 'final num1', answer: '12' }
    ],
    hint: 'All the variables are int, so / and % give whole numbers.',
    explanation: 'num5 = 9 - 2 % 5 = 7, num4 = 8, num2 = 8 + 7 = 15, num3 = 15 % 6 = 3, and num1 = 7 / 2 + 3 * 3 = 3 + 9 = 12.',
    skills: ['U4-S12', 'U2-S12']
  },
  a36: {
    type: 'error-spot', world: 'algorithms',
    prompt: 'This segment should display the average of three whole numbers. What is wrong?',
    code: 'int m1, m2, m3;\ndouble ave;\n// m1, m2 and m3 are input here\nave = m1 + m2 + m3 / 3;\nSystem.out.println("The average is: " + ave);',
    options: [
      'Syntax error: ave must be an int',
      'Logical error: only m3 is divided by 3; use (m1 + m2 + m3) / 3.0',
      'Run time error: you cannot divide by 3',
      'Nothing is wrong'
    ],
    answer: 1,
    hint: 'Which operator is done first, + or /?',
    explanation: 'Division is done before addition, so only m3 is divided. Brackets make the sum happen first, and dividing by 3.0 avoids integer division. The program still runs, so this is a logical error.',
    skills: ['U4-S10', 'U2-S12']
  },
  a37: {
    type: 'code-write', world: 'algorithms',
    prompt: 'Write the TempConversion program: input a temperature in Celsius and display it in Fahrenheit using F = 9C / 5 + 32.',
    criteria: 'Class TempConversion. Import javax.swing.*. Input the Celsius temperature as a double with Double.parseDouble(JOptionPane.showInputDialog(...)). Calculate fahr = (9 * celsius) / 5 + 32 and store it in a double. Display "Temperature in Fahrenheit: " + fahr with JOptionPane.showMessageDialog(null, ...). Test values: 0 gives 32.0, 100 gives 212.0 and -3.5 gives 25.7.',
    starter: 'import javax.swing.*;\n\npublic class TempConversion {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U4-S17', 'U4-S3'],
    explanation: 'The IPO table is: input c, processing f = (9 * c) / 5 + 32, output f. Declaring celsius as double means real values such as -3.5 can be entered.'
  },

  /* =========================================================================
     LOOP LAGOON — additional textbook coverage (Unit 5)
     ========================================================================= */

  l18: {
    type: 'mc', world: 'loops',
    prompt: 'Which pseudocode line matches the Java header for (int i = 1; i <= 10; i++)?',
    options: ['loop i until 10', 'for i from 1 to 10; inc by 1', 'repeat 10 times; i++', 'for i = 1, i <= 10, i++'],
    answer: 1,
    hint: 'The textbook pattern is: for var from start to end; inc by value.',
    explanation: 'The pseudocode rule is for var from start to end; inc by value. The statements to repeat are indented, and the loop is closed with end for.',
    skills: ['U5-S11']
  },
  l19: {
    type: 'order', world: 'loops',
    prompt: 'Put the FindAve pseudocode in order to find the average of 10 numbers.',
    items: [
      'end for',
      'sum ← 0',
      'ave ← sum / 10',
      'input num',
      'for loop from 1 to 10; inc by 1',
      'sum ← sum + num'
    ],
    answer: [1, 4, 3, 5, 0, 2],
    hint: 'What happens once before the loop, what is repeated, and what happens once at the end?',
    explanation: 'sum is set to 0 before the loop. Inside the loop each number is input and added to sum. After end for, the average is calculated once.',
    skills: ['U5-S11', 'U5-S9']
  },
  l20: {
    type: 'mc', world: 'loops',
    prompt: 'In a flow chart of a for loop, where do the statements that must be repeated go?',
    options: [
      'Below the True exit of the decision diamond, with an arrow back to the diamond',
      'Before the loop control variable is initialised',
      'After the False exit of the diamond',
      'Inside the decision diamond'
    ],
    answer: 0,
    hint: 'The loop body runs while the condition is true.',
    explanation: 'The loop control variable is initialised before the diamond. The True exit leads to the loop body, which ends with an arrow back to the condition. The False exit bypasses the loop.',
    skills: ['U5-S12']
  },
  l21: {
    type: 'tf', world: 'loops',
    prompt: 'In a flow chart of a for loop, the loop control variable is initialised inside the loop body, after the True exit.',
    answer: false,
    hint: 'What would happen to the variable on every pass?',
    explanation: 'False. It is initialised once, before the condition. If it were set inside the body, it would be reset on every pass and the loop would never end.',
    skills: ['U5-S12']
  },
  l22: {
    type: 'trace', world: 'loops',
    prompt: 'Trace this loop. Type the values as Java would display them.',
    code: 'double sum = 1.5;\nint j;\nfor (j = 2; j <= 5; j++)\n{\n    System.out.println(j);\n    System.out.println(sum);\n    sum = sum + j;\n}',
    rows: [
      { label: 'sum after the pass where j is 2', answer: '3.5' },
      { label: 'sum after the pass where j is 3', answer: '6.5' },
      { label: 'sum after the pass where j is 5', answer: '15.5' },
      { label: 'j after the loop ends', answer: '6' }
    ],
    hint: 'j is declared before the loop, so it still exists afterwards.',
    explanation: 'sum grows 1.5, 3.5, 6.5, 10.5, 15.5. j was declared before the loop, so after the loop it keeps the value 6 that made j <= 5 false.',
    skills: ['U5-S10']
  },
  l23: {
    type: 'code-read', world: 'loops',
    prompt: 'What does this loop display?',
    code: 'for (char letter = \'G\'; letter >= \'C\'; letter--)\n{\n    System.out.print(letter);\n}',
    options: ['CDEFG', 'GFEDC', 'GFED', 'Nothing is displayed'],
    answer: 1,
    hint: 'letter starts at G and moves backwards through the alphabet.',
    explanation: 'letter is decremented each pass: G, F, E, D, C. After C it becomes B, and B >= C is false.',
    skills: ['U5-S7', 'U5-S6']
  },
  l24: {
    type: 'mc', world: 'loops',
    prompt: 'How many times is the message displayed?',
    code: 'for (char letter = \'a\'; letter <= \'j\'; letter++)\n{\n    System.out.println(message);\n}',
    options: ['9', '11', '10', '0'],
    answer: 2,
    hint: 'Count the letters from a to j.',
    explanation: 'a to j are a, b, c, d, e, f, g, h, i and j: 10 values (Unicode 97 to 106). The loop ends when letter becomes k.',
    skills: ['U5-S7', 'U5-S3']
  },
  l25: {
    type: 'mc', world: 'loops',
    prompt: 'How many times is the business name displayed?',
    code: 'for (int count = 10; count <= 20; count = count + 1)\n{\n    System.out.print(name + " ");\n}',
    options: ['10', '11', '20', '9'],
    answer: 1,
    hint: 'Both 10 and 20 are included.',
    explanation: 'count takes every value from 10 to 20: 20 - 10 + 1 = 11 passes. When count becomes 21 the condition is false.',
    skills: ['U5-S3']
  },
  l26: {
    type: 'trace', world: 'loops',
    prompt: 'Trace the SumOfTerms program, which adds the first five terms of 11 + 12 + 13 + ...',
    code: 'int sum = 0;\nint term = 11;\nint numTerms = 5;\nfor (int j = 1; j <= numTerms; j++)\n{\n    sum = sum + term;\n    term = term + 1;\n}',
    rows: [
      { label: 'sum after pass 1', answer: '11' },
      { label: 'sum after pass 2', answer: '23' },
      { label: 'sum after pass 3', answer: '36' },
      { label: 'sum after pass 5', answer: '65' },
      { label: 'term after the loop', answer: '16' }
    ],
    hint: 'Add the current term to sum, then work out the next term.',
    explanation: '11, then 11 + 12 = 23, 23 + 13 = 36, 36 + 14 = 50, 50 + 15 = 65. term is increased after it is added, so it ends at 16.',
    skills: ['U5-S14', 'U5-S10']
  },
  l27: {
    type: 'mc', world: 'loops',
    prompt: 'You decompose FindAve into before, inside and after the loop. Which statement belongs AFTER the loop?',
    options: ['input num', 'sum ← sum + num', 'ave ← sum / 10', 'sum ← 0'],
    answer: 2,
    hint: 'Which step needs all the numbers to have been added already?',
    explanation: 'sum ← 0 is done once before the loop, input and adding are repeated inside it, and the average is calculated once after the last number has been added.',
    skills: ['U5-S13']
  },
  l28: {
    type: 'match', world: 'loops',
    prompt: 'For the Learner Driver percentage table (marks 0 to 22), match each task to where it belongs.',
    pairs: [
      { left: 'Display the table headings', right: 'Before the loop' },
      { left: 'Calculate and display the rounded percentage for one mark', right: 'Inside the loop' },
      { left: 'Display a closing message once the table is complete', right: 'After the loop' }
    ],
    answer: [0, 1, 2],
    hint: 'Which task happens once, and which happens for every mark?',
    explanation: 'Headings are shown once, so they go before the loop. Each mark from 0 to 22 needs its own percentage, so that is repeated. Anything that happens once at the end goes after the loop.',
    skills: ['U5-S13']
  },
  l29: {
    type: 'code-read', world: 'loops',
    prompt: 'How many one-block dashes does rat draw?',
    code: 'Gogga rat = new Gogga();\nrat.setDirection(Gogga.RIGHT);\nfor (int x = 1; x <= 13; x = x + 3)\n{\n    rat.setPosition(x, 5);\n    rat.move();\n}',
    options: ['13', '4', '5', '3'],
    answer: 2,
    hint: 'List the values of x: start at 1 and add 3.',
    explanation: 'x takes the values 1, 4, 7, 10 and 13, so the loop body runs 5 times. Each pass places rat at (x, 5) and moves one block, drawing one dash.',
    skills: ['U5-S15', 'U5-S8']
  },
  l30: {
    type: 'mc', world: 'loops',
    prompt: 'What does this code draw?',
    code: 'Gogga bug = new Gogga();\nfor (int i = 1; i <= 4; i++)\n{\n    bug.move();\n    bug.move();\n    bug.turnLeft();\n}',
    options: [
      'A straight line 8 blocks long',
      'A square with sides of 2 blocks',
      'A rectangle 2 blocks by 1 block',
      'A square with sides of 4 blocks'
    ],
    answer: 1,
    hint: 'One pass draws one side and then turns.',
    explanation: 'Each pass draws a side of 2 blocks and turns left. Four passes draw four sides, so bug draws a square and ends where it started.',
    skills: ['U5-S15', 'U5-S1']
  },
  l31: {
    type: 'code-write', world: 'loops',
    prompt: 'Write the SumOfTerms program so that the user enters the first number of the series and the number of terms, and the program displays the sum.',
    criteria: 'Class SumOfTerms. Import javax.swing.*. Input the first term and the number of terms as ints with JOptionPane.showInputDialog and Integer.parseInt. Initialise sum to 0 before the loop. Use a for loop that runs numTerms times; inside it add term to sum and then add 1 to term. After the loop display "The sum of the " + numTerms + " terms is " + sum. Starting at 11 with 5 terms gives 65; starting at 1 with 25 terms gives 325; starting at 100 with 100 terms gives 14950.',
    starter: 'import javax.swing.*;\n\npublic class SumOfTerms {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U5-S14', 'U5-S9'],
    explanation: 'Adding the current term and then working out the next one is a general method that does not depend on knowing the last term of the series.'
  },
  l32: {
    type: 'mc', world: 'loops',
    prompt: 'What happens when this loop runs?',
    code: 'for (int loop = 1; ; loop = loop + 1)\n{\n    System.out.println(loop);\n}',
    options: [
      'It never runs',
      'It runs once',
      'It is an infinite loop, because there is no terminating condition',
      'It runs 10 times'
    ],
    answer: 2,
    hint: 'Look at the middle part of the header.',
    explanation: 'The condition part of the header is empty, so nothing ever stops the loop. Leaving out the increment, as in for (int loop = 1; loop <= 10; ), also causes an infinite loop.',
    skills: ['U5-S5']
  },
  l33: {
    type: 'error-spot', world: 'loops',
    prompt: 'Why does the last line give an error?',
    code: 'for (int count = 1; count <= 10; count++)\n{\n    System.out.print("*");\n}\nSystem.out.println(count);',
    options: [
      'count was declared in the loop header, so it only exists inside the loop',
      'print and println cannot be used in the same program',
      'count is 11, which is too large',
      'The loop needs a semicolon after the header'
    ],
    answer: 0,
    hint: 'Where was count declared?',
    explanation: 'A loop control variable declared inside the for brackets is only valid in the loop. To use it afterwards, declare it before the loop, as in int count; for (count = 1; ...).',
    skills: ['U5-S2']
  },
  l34: {
    type: 'trace', world: 'loops',
    prompt: 'FindAve uses doubles. The user enters 4, 7, 2, 6 and 9. Type each value as Java would display it.',
    code: 'double sum = 0;\ndouble num;\nfor (int loop = 1; loop <= 5; loop++)\n{\n    num = Double.parseDouble(JOptionPane.showInputDialog("Enter a number"));\n    sum = sum + num;\n}\ndouble ave = sum / 5;',
    rows: [
      { label: 'sum after the second number', answer: '11.0' },
      { label: 'sum after the loop', answer: '28.0' },
      { label: 'num after the loop', answer: '9.0' },
      { label: 'ave', answer: '5.6' }
    ],
    hint: 'num is overwritten on every pass; sum keeps growing.',
    explanation: 'sum goes 4.0, 11.0, 13.0, 19.0, 28.0. num only holds the last value entered, 9.0. 28.0 / 5 = 5.6.',
    skills: ['U5-S9', 'U5-S10']
  },

  /* =========================================================================
     OBJECT FORGE — additional textbook coverage (Unit 6)
     ========================================================================= */

  o19: {
    type: 'mc', world: 'objects',
    prompt: 'A Gogga is created with Gogga bug = new Gogga();. Which starting values does the default constructor give it?',
    options: [
      'xPos 0, yPos 0, facing RIGHT, black',
      'xPos 7, yPos 5, facing UP, red, trail width 5',
      'xPos 1, yPos 1, facing DOWN, blue, trail width 1',
      'xPos 7, yPos 5, facing UP, red, trail width 1'
    ],
    answer: 1,
    hint: 'The default Gogga starts near the middle of the grid.',
    explanation: 'Gogga() places the object at (7, 5), facing UP, with colour Color.red, trailWidth 5, showTrail true and an empty label.',
    skills: ['U6-S4']
  },
  o20: {
    type: 'mc', world: 'objects',
    prompt: 'What does the variable bug store after the second line runs?',
    code: 'Gogga bug;\nbug = new Gogga();',
    options: ['null', 'The address in memory of the new Gogga object', 'The values 7 and 5', 'The word Gogga'],
    answer: 1,
    hint: 'The object itself is created somewhere else in memory.',
    explanation: 'After Gogga bug; the variable holds null (no object). new Gogga() creates the object in another location in memory, and bug stores the address of that object.',
    skills: ['U6-S5']
  },
  o21: {
    type: 'tf', world: 'objects',
    prompt: 'The variable bug itself stores all the field values of the Gogga, such as xPos, yPos and direction.',
    answer: false,
    hint: 'Think of the memory diagram with an arrow.',
    explanation: 'False. The fields are stored in the object in another location in memory. bug only stores the address of that object, which is why it is called an object reference.',
    skills: ['U6-S5']
  },
  o22: {
    type: 'code-read', world: 'objects',
    prompt: 'What is the yPos of kreepy after this code runs?',
    code: 'Gogga bug = new Gogga();\nGogga kreepy = new Gogga(2, 8);\nbug.move();\nbug.move();',
    options: ['8', '6', '3', '5'],
    answer: 0,
    hint: 'Which object do the move() calls belong to?',
    explanation: 'Each Gogga object is independent. bug.move() only changes the fields of bug. kreepy was created at (2, 8) and has not moved, so its yPos is still 8.',
    skills: ['U6-S6']
  },
  o23: {
    type: 'mc', world: 'objects',
    prompt: 'Which Gogga constructor is invoked by this statement?',
    code: 'Gogga five = new Gogga(2, 7, Gogga.RIGHT, Color.blue);',
    options: [
      'Gogga(int across, int down)',
      'Gogga(int across, int down, Color col)',
      'Gogga(int across, int down, int direction, Color col)',
      'Gogga(Color col)'
    ],
    answer: 2,
    hint: 'Gogga.RIGHT is an int constant.',
    explanation: 'The call has three int values (2, 7 and Gogga.RIGHT) followed by a Color, so it matches Gogga(int across, int down, int direction, Color col).',
    skills: ['U6-S1', 'U6-S7']
  },
  o24: {
    type: 'mc', world: 'objects',
    prompt: 'What is method resolution?',
    options: [
      'Making a method run faster',
      'Java finding the method whose signature matches the call statement',
      'Giving two methods exactly the same signature',
      'Converting a method into a constructor'
    ],
    answer: 1,
    hint: 'With overloaded methods, Java must decide which one to run.',
    explanation: 'Java looks at the parameters in the call and uses the method whose signature matches. So new Gogga(4, 3) invokes Gogga(int across, int down).',
    skills: ['U6-S1']
  },
  o25: {
    type: 'error-spot', world: 'objects',
    prompt: 'A programmer wants a class to have both of these constructors. Why is that not allowed?',
    code: 'Gogga(int across, int down)\nGogga(int down, int across)',
    options: [
      'Constructors cannot have int parameters',
      'Both have the same signature (two ints), so Java could not decide which to use',
      'A class may only have one constructor',
      'Parameter names must be in capitals'
    ],
    answer: 1,
    hint: 'A signature is the name plus the list of parameter types.',
    explanation: 'Both signatures are Gogga(int, int). There cannot be two methods with the same signature in one class, because method resolution would not know which one to call.',
    skills: ['U6-S1']
  },
  o26: {
    type: 'mc', world: 'objects',
    prompt: 'Which single statement does the same as these three lines?',
    code: 'Gogga pam = new Gogga();\npam.setPosition(3, 5);\npam.setColor(Color.green);',
    options: [
      'Gogga pam = new Gogga(Color.green);',
      'Gogga pam = new Gogga(3, 5);',
      'Gogga pam = new Gogga(3, 5, Color.green);',
      'Gogga pam = new Gogga(Color.green, 3, 5);'
    ],
    answer: 2,
    hint: 'The parameters must be in the order of a real constructor signature.',
    explanation: 'Gogga(int across, int down, Color col) sets the position and colour when the object is created, so no extra method calls are needed. The colour comes last in that signature.',
    skills: ['U6-S1']
  },
  o27: {
    type: 'trace', world: 'objects',
    prompt: 'Complete the state diagram of sam after this code runs.',
    code: 'Gogga sam = new Gogga();\nsam.setPosition(3, 7);\nsam.setDirection(Gogga.RIGHT);\nsam.setColor(Color.green);\nsam.setTrailWidth(8);\nsam.setLabel("sam");\nsam.move();',
    rows: [
      { label: 'xPos', answer: '4' },
      { label: 'yPos', answer: '7' },
      { label: 'trailWidth', answer: '8' },
      { label: 'label (without quotes)', answer: 'sam' }
    ],
    hint: 'Moving RIGHT changes only xPos.',
    explanation: 'sam starts at (3, 7) facing RIGHT. Moving one block to the right changes xPos to 4; yPos stays 7. The set methods changed trailWidth to 8 and the label to "sam".',
    skills: ['U6-S2']
  },
  o28: {
    type: 'mc', world: 'objects',
    prompt: 'You open the Color class in the Java API documentation. What will you find in its Field Summary?',
    options: [
      'The predefined colours, such as GREEN and green, declared as final',
      'The constructors, such as Color(int r, int g, int b)',
      'The source code of the class',
      'A list of Gogga objects that use the colour'
    ],
    answer: 0,
    hint: 'Fields are the attributes of the class, not its methods or constructors.',
    explanation: 'The Field Summary lists the colour fields in capitals and lowercase. They are final, so their values are constant. Constructors such as Color(int, int, int) are in the Constructor Summary.',
    skills: ['U6-S7', 'U6-S3']
  },
  o29: {
    type: 'error-spot', world: 'objects',
    prompt: 'After bug1 has moved, the programmer wants to change its colour. What is wrong with the last line?',
    code: 'Color col1 = new Color(120, 200, 80);\nGogga bug1 = new Gogga(7, 9, col1);\nbug1.move();\nColor col3 = new Color(200, 0, 120);\nGogga bug1 = new Gogga(7, 9, col3);',
    options: [
      'bug1 is declared a second time; use bug1.setColor(col3); instead',
      'Colour values cannot be larger than 120',
      'col3 must be declared before bug1',
      'Nothing, it changes the colour correctly'
    ],
    answer: 0,
    hint: 'The object already exists. Which method changes its colour?',
    explanation: 'Declaring Gogga bug1 again is a duplicate variable error. Use the setColor() method of the existing object: bug1.setColor(col3);',
    skills: ['U6-S3', 'U6-S4']
  },
  o30: {
    type: 'mc', world: 'objects',
    prompt: 'What colour is buggy?',
    code: 'Color col = new Color(0, 0, 0);\nGogga buggy = new Gogga(col);',
    options: ['White', 'Black', 'Grey', 'Red, the default colour'],
    answer: 1,
    hint: 'Each value is the amount of red, green and blue light.',
    explanation: 'Red, green and blue are all 0, meaning none of any colour, which is black. Color(255, 255, 255) would be white.',
    skills: ['U6-S3']
  },
  o31: {
    type: 'tf', world: 'objects',
    prompt: 'The statement System.out.println((int) (Math.random() * 10)); can display the number 10.',
    answer: false,
    hint: 'Math.random() is always less than 1.',
    explanation: 'False. Math.random() * 10 is always less than 10, and the cast drops the decimals. The possible values are 0 to 9.',
    skills: ['U6-S8']
  },
  o32: {
    type: 'trace', world: 'objects',
    prompt: 'Suppose Math.random() returns 0.453. Work out each expression.',
    code: 'Math.random() * 10\n(int) (Math.random() * 10)\n(int) (Math.random() * 6) + 1',
    rows: [
      { label: 'Math.random() * 10', answer: '4.53' },
      { label: '(int) (Math.random() * 10)', answer: '4' },
      { label: '(int) (Math.random() * 6) + 1', answer: '3' }
    ],
    hint: 'Casting to int drops everything after the decimal point.',
    explanation: '0.453 x 10 = 4.53, and (int) drops the decimals to give 4. 0.453 x 6 = 2.718, which casts to 2, plus 1 gives 3.',
    skills: ['U6-S8']
  },
  o33: {
    type: 'mc', world: 'objects',
    prompt: 'Which statement assigns num a random whole number from 10 to 25 inclusive?',
    options: [
      'int num = (int) (Math.random() * 25) + 10;',
      'int num = (int) (Math.random() * 16) + 10;',
      'int num = (int) (Math.random() * 15) + 10;',
      'int num = (int) (Math.random() * 16) + 25;'
    ],
    answer: 1,
    hint: 'Use (int) (Math.random() * (B - A + 1)) + A.',
    explanation: 'There are 25 - 10 + 1 = 16 possible values, starting at 10, so multiply by 16 and add 10.',
    skills: ['U6-S8']
  },
  o34: {
    type: 'mc', world: 'objects',
    prompt: 'Why does the RandCol program use (int) (Math.random() * 256) for each of red, green and blue?',
    options: [
      'It gives a whole number from 0 to 255, the range each colour value must be in',
      'It gives a number from 1 to 256',
      'Each colour needs 256 bits',
      'It makes the colour brighter'
    ],
    answer: 0,
    hint: 'How many values are there from 0 to 255?',
    explanation: 'There are 256 values from 0 to 255, starting at 0, so the formula is (int) (Math.random() * 256). The three values are then used in new Color(red, green, blue).',
    skills: ['U6-S9']
  },
  o35: {
    type: 'code-read', world: 'objects',
    prompt: 'DiceThrow uses this statement. Which values can num have?',
    code: 'int num = (int) (Math.random() * 6) + 1;',
    options: ['0 to 5', '1 to 6', '0 to 6', '1 to 7'],
    answer: 1,
    hint: 'Work out the range before and after adding 1.',
    explanation: '(int) (Math.random() * 6) gives 0 to 5, and adding 1 shifts the range to 1 to 6, just like a dice.',
    skills: ['U6-S8']
  },
  o36: {
    type: 'code-write', world: 'objects',
    prompt: 'Write the LongJumpGogga program: create sam (black, at 1, 4, facing right) and fred (yellow, at 1, 7, facing right). Move each to a random row from 1 to 5, then make each jump to a random column from 1 to 10 in that same row.',
    criteria: 'Class LongJumpGogga. Import it.* and java.awt.Color. Create sam with new Gogga(1, 4, Gogga.RIGHT, Color.black) and fred with new Gogga(1, 7, Gogga.RIGHT, Color.yellow). For each Gogga generate y with (int) (Math.random() * 5) + 1 and call setPosition(1, y). Then generate x with (int) (Math.random() * 10) + 1 and call setPosition(x, y), so the Gogga jumps horizontally in the same row. Use separate random numbers for sam and fred.',
    starter: 'import it.*;\nimport java.awt.Color;\n\npublic class LongJumpGogga {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U6-S8', 'U6-S1', 'U6-S6'],
    explanation: 'This combines the four-parameter constructor, two independent objects and the random number formula with two different ranges.'
  },

  /* =========================================================================
     LOGIC LABYRINTH — additional textbook coverage (Unit 7)
     ========================================================================= */

  g18: {
    type: 'mc', world: 'logic',
    prompt: 'In this pseudocode for a Ticket program, which word ends the if statement?',
    code: 'begin\n    input age\n    if age < 12\n        then price ← 100\n        else price ← 150\n    endif\n    display "Your ticket costs R" + price\nend',
    options: ['end', 'endif', 'stop', 'else'],
    answer: 1,
    hint: 'Each control structure in pseudocode has its own closing word.',
    explanation: 'The words if, then, else and endif mark each part of the if statement, and the statements are indented to show which part they belong to.',
    skills: ['U7-S16']
  },
  g19: {
    type: 'code-read', world: 'logic',
    prompt: 'The user enters 5 for a and 0 for b. What is displayed?',
    code: 'double result;\nif (b != 0)\n{\n    result = a / b;\n    JOptionPane.showMessageDialog(null, "The result is " + result);\n}',
    options: ['The result is 0.0', 'Nothing is displayed', 'The result is Infinity', 'A run time error message'],
    answer: 1,
    hint: 'Is the condition true? Is there an else part?',
    explanation: 'b != 0 is false and there is no else part, so the block is skipped and the program continues after the if statement. Adding an else with a message tells the user why nothing happened.',
    skills: ['U7-S1', 'U7-S3']
  },
  g20: {
    type: 'trace', world: 'logic',
    prompt: 'Trace the NumChars program when the user types peacock.',
    code: 'num = wrd.length();\nif (num % 2 != 0)\n{\n    System.out.println(wrd + " has an odd number of letters.");\n    posn = num / 2 + 1;\n    System.out.println("The middle letter is " + wrd.charAt(posn - 1));\n}',
    rows: [
      { label: 'num', answer: '7' },
      { label: 'posn', answer: '4' },
      { label: 'middle letter', answer: 'c' }
    ],
    hint: 'num / 2 is integer division. charAt counts from 0.',
    explanation: 'peacock has 7 letters and 7 % 2 is 1, so the condition is true. posn = 7 / 2 + 1 = 4, and charAt(3) is c (p is 0, e is 1, a is 2, c is 3).',
    skills: ['U7-S3', 'U3-S4']
  },
  g21: {
    type: 'error-spot', world: 'logic',
    prompt: 'Why will this not compile?',
    code: 'double len = 12.0;\nif (len =< 15.5)\n    System.out.println("It is not long enough");',
    options: [
      '=< is not a Java operator; it must be written <=',
      'A double cannot be compared with 15.5',
      'The if needs an else part',
      'println cannot be inside an if'
    ],
    answer: 0,
    hint: 'The order of the characters in a relational operator matters.',
    explanation: 'You cannot use =>, =< or ><. The correct operators are >=, <= and !=.',
    skills: ['U7-S2']
  },
  g22: {
    type: 'error-spot', world: 'logic',
    prompt: 'This code always prints "You may see the movie", even when age is 10. Why?',
    code: 'if (age > 16);\n{\n    System.out.println("You may see the movie");\n}',
    options: [
      'The semicolon after the condition ends the if, so the block always runs',
      'age must be compared with ==',
      'The curly brackets are not needed',
      '16 should be written as 16.0'
    ],
    answer: 0,
    hint: 'Look at the end of the first line.',
    explanation: 'The semicolon is an empty statement that the if controls. The block in curly brackets is no longer part of the if, so it runs every time. Remove the semicolon.',
    skills: ['U7-S10', 'U7-S4']
  },
  g23: {
    type: 'tf', world: 'logic',
    prompt: 'Because String is not a primitive data type, two Strings should not be compared using ==.',
    answer: true,
    hint: 'Which data types can be compared with relational operators?',
    explanation: 'True. Objects of the String data type cannot be compared using ==; you will learn later how to compare Strings. Single characters (char) can be compared with ==, for example option == \'A\'.',
    skills: ['U7-S10']
  },
  g24: {
    type: 'code-read', world: 'logic',
    prompt: 'MaxMinNum has max = 60 and min = 21. The user enters 72. Which messages are stored?',
    code: 'if (num > 0)\n    message1 = "Your number " + num + " is larger than zero";\nelse\n    message1 = "Your number is negative or zero";\n\nif (num > max)\n    message2 = "Your number " + num + " is larger than " + max;\n\nif (num < min)\n    message2 = "Your number " + num + " is smaller than " + min;',
    options: [
      'Your number 72 is larger than zero, and Your number 72 is larger than 60',
      'Only Your number 72 is larger than zero',
      'Your number 72 is larger than zero, and Your number 72 is smaller than 21',
      'Your number is negative or zero, and Your number 72 is larger than 60'
    ],
    answer: 0,
    hint: 'The three if statements are separate, so each one is checked.',
    explanation: '72 > 0 sets message1, 72 > 60 sets message2, and 72 < 21 is false, so message2 is not changed again.',
    skills: ['U7-S7', 'U7-S3']
  },
  g25: {
    type: 'match', world: 'logic',
    prompt: 'Match each condition to its opposite.',
    pairs: [
      { left: 'num1 > 5', right: 'num1 <= 5' },
      { left: 'num1 >= 5', right: 'num1 < 5' },
      { left: 'num1 == 5', right: 'num1 != 5' },
      { left: 'answer != \'Y\'', right: 'answer == \'Y\'' },
      { left: 'num1 % num2 == 0', right: 'num1 % num2 != 0' }
    ],
    answer: [0, 1, 2, 3, 4],
    hint: 'The opposite of > is not <.',
    explanation: '> is the opposite of <=, and < is the opposite of >=. == and != are opposites of each other.',
    skills: ['U7-S5']
  },
  g26: {
    type: 'code-read', world: 'logic',
    prompt: 'In the Salaries program basicSalary is the int 3000 and salary is a double. The user enters 15 sales. What is the last line displayed?',
    code: 'if (sales > 10)\n{\n    salary = basicSalary + basicSalary * sales / 100;\n    System.out.println("Well done!");\n}\nelse\n{\n    salary = basicSalary;\n}\nSystem.out.println("Salary : R" + salary);',
    options: ['Salary : R3450', 'Salary : R3000.0', 'Salary : R3450.0', 'Salary : R3015.0'],
    answer: 2,
    hint: 'Work out the int calculation, then remember salary is a double.',
    explanation: '15 > 10, so 3000 * 15 / 100 = 450 is added to 3000. The int 3450 is stored in the double salary, so it is displayed as 3450.0. The last println is outside the if, so it runs for every input.',
    skills: ['U7-S3', 'U2-S6']
  },
  g27: {
    type: 'mc', world: 'logic',
    prompt: 'When should several if statements be joined with else into a nested if?',
    options: [
      'When only ONE of the conditions can be true at the same time',
      'Whenever there are two or more conditions',
      'When the conditions are independent of each other',
      'Only when the conditions test Strings'
    ],
    answer: 0,
    hint: 'Think of a menu where the user can choose only one option.',
    explanation: 'In the Greet program only one option can be chosen, so once one condition is true the others need not be checked. Independent tests, such as positive and divisible by 7, must be separate if statements.',
    skills: ['U7-S6', 'U7-S7']
  },
  g28: {
    type: 'code-read', world: 'logic',
    prompt: 'The TestNumber program receives -14. Which two messages are stored?',
    code: 'if (num > 0)\n    message1 = num + " is positive";\nelse\n    message1 = num + " is negative";\n\nif (num % 7 == 0)\n    message2 = num + " is divisible by 7";\nelse\n    message2 = num + " is NOT divisible by 7";',
    options: [
      '-14 is positive and -14 is divisible by 7',
      '-14 is negative and -14 is NOT divisible by 7',
      '-14 is negative only',
      '-14 is negative and -14 is divisible by 7'
    ],
    answer: 3,
    hint: 'The two if statements are independent. What is -14 % 7?',
    explanation: '-14 > 0 is false, so message1 is "-14 is negative". -14 % 7 is 0, so message2 is "-14 is divisible by 7". Both if statements are checked.',
    skills: ['U7-S7']
  },
  g29: {
    type: 'mc', world: 'logic',
    prompt: 'a is 2 and b is 5. In the condition (a > b && a > 0), is the part a > 0 evaluated?',
    options: [
      'Yes, both parts are always evaluated',
      'No, a > b is false, so the whole condition is already false',
      'Yes, because a > 0 is true',
      'No, && never evaluates the second part'
    ],
    answer: 1,
    hint: '&& is the conditional AND.',
    explanation: '&& only evaluates the second part if the first part is true. With a single &, the Boolean AND, a > 0 would still be checked.',
    skills: ['U7-S12']
  },
  g30: {
    type: 'tf', world: 'logic',
    prompt: 'In (x > 0 | y > 0) with a single |, Java evaluates y > 0 even when x > 0 is already true.',
    answer: true,
    hint: 'Compare the Boolean OR (|) with the conditional OR (||).',
    explanation: 'True. | always evaluates both parts. The conditional OR || stops as soon as the first part is true, because the whole condition must then be true, so || is more efficient.',
    skills: ['U7-S12']
  },
  g31: {
    type: 'trace', world: 'logic',
    prompt: 'Evaluate this condition for each set of values. Type true or false.',
    code: '(b == 2 | (answer == \'y\' & a == 3))',
    rows: [
      { label: 'answer is \'y\', a is 4, b is 2', answer: 'true' },
      { label: 'answer is \'b\', a is 3, b is 2', answer: 'true' },
      { label: 'answer is \'b\', a is 5, b is 3', answer: 'false' },
      { label: 'answer is \'y\', a is 3, b is 7', answer: 'true' }
    ],
    hint: 'If b == 2 the OR is already true. Otherwise both parts of the AND must be true.',
    explanation: 'Rows 1 and 2 have b == 2, so the result is true. Row 3: b is 3 and answer is not \'y\', so false. Row 4: b is not 2, but answer is \'y\' and a is 3, so true.',
    skills: ['U7-S11', 'U7-S8']
  },
  g32: {
    type: 'order', world: 'logic',
    prompt: 'Put the parts of a condition in the order Java evaluates them.',
    items: ['AND', 'Brackets', 'OR', 'NOT'],
    answer: [1, 3, 0, 2],
    hint: 'OR is done last.',
    explanation: 'Java evaluates brackets first, then NOT, then AND, then OR. Operators with the same priority are evaluated from left to right.',
    skills: ['U7-S11']
  },
  g33: {
    type: 'mc', world: 'logic',
    prompt: 'Using De Morgan\'s law, what is the negation of (a > b & b < 10)?',
    options: ['(a <= b | b >= 10)', '(a <= b & b >= 10)', '(a < b | b > 10)', '(a > b | b < 10)'],
    answer: 0,
    hint: 'Negate each part and change AND to OR.',
    explanation: 'NOT (A AND B) = NOT A OR NOT B. a > b becomes a <= b, b < 10 becomes b >= 10, and & becomes |.',
    skills: ['U7-S14']
  },
  g34: {
    type: 'mc', world: 'logic',
    prompt: 'Which condition is equivalent to !(days == 5 && hours > 3) without using NOT?',
    options: [
      'days != 5 && hours <= 3',
      'days == 5 || hours > 3',
      'days != 5 || hours <= 3',
      'days != 5 || hours < 3'
    ],
    answer: 2,
    hint: 'Negate each part, and the opposite of > is <=.',
    explanation: 'By De Morgan\'s law NOT (A AND B) becomes NOT A OR NOT B: days != 5 || hours <= 3.',
    skills: ['U7-S14', 'U7-S5']
  },
  g35: {
    type: 'code-read', world: 'logic',
    prompt: 'The programmer added ! to the condition but did not swop the statements. What is displayed?',
    code: 'int num = 3;\nif (!(num == 3))\n    System.out.println("num is 3");\nelse\n    System.out.println("num is not 3");',
    options: ['num is 3', 'num is not 3', 'Nothing', 'A syntax error'],
    answer: 1,
    hint: 'Evaluate num == 3 first, then apply !.',
    explanation: 'num == 3 is true, so !(num == 3) is false and the else part runs, showing the wrong message. When you negate a condition you must also swop the then and else parts.',
    skills: ['U7-S13']
  },
  g36: {
    type: 'mc', world: 'logic',
    prompt: 'This if statement has an empty then part. Which version does the same without the empty part?',
    code: 'if (num < 1 || num > 10)\n{\n}\nelse\n    System.out.println("num is in range 1 to 10");',
    options: [
      'if (num >= 1 && num <= 10) System.out.println("num is in range 1 to 10");',
      'if (num < 1 && num > 10) System.out.println("num is in range 1 to 10");',
      'if (num >= 1 || num <= 10) System.out.println("num is in range 1 to 10");',
      'if (num > 1 && num < 10) System.out.println("num is in range 1 to 10");'
    ],
    answer: 0,
    hint: 'Negate the condition, then the else statement becomes the then statement.',
    explanation: 'NOT (num < 1 OR num > 10) is num >= 1 AND num <= 10. The else statement moves into the then part and the else falls away.',
    skills: ['U7-S13', 'U7-S14']
  },
  g37: {
    type: 'error-spot', world: 'logic',
    prompt: 'Why does Java refuse to compile this code?',
    code: 'int mark = 79;\nchar grade;\nif (mark >= 80) { grade = \'A\'; }\nelse if (mark >= 70) { grade = \'B\'; }\nelse if (mark >= 60) { grade = \'C\'; }\nSystem.out.println(grade);',
    options: [
      'grade might not have a value, so initialise it, for example char grade = \'X\';',
      'A char cannot store a letter',
      'else if is not allowed in Java',
      'mark must be a double'
    ],
    answer: 0,
    hint: 'What value does grade have if none of the conditions are true?',
    explanation: 'grade only gets a value inside the if statements. If no condition were true it would have no value, so Java reports that the variable might not have been initialised. Initialise it before the if statements.',
    skills: ['U7-S15']
  },
  g38: {
    type: 'code-read', world: 'logic',
    prompt: 'The LetterGrade program receives a mark of 79. Which grade is stored?',
    code: 'markDiv10 = mark / 10;\nif (markDiv10 == 8 | markDiv10 == 9 | markDiv10 == 10) {grade = \'A\';}\nelse\n  if (markDiv10 == 7) {grade = \'B\';}\n  else\n    if (markDiv10 == 6) {grade = \'C\';}\n    else\n      if (markDiv10 == 5) {grade = \'D\';}',
    options: ['A', 'B', 'C', 'D'],
    answer: 1,
    hint: 'mark and markDiv10 are ints.',
    explanation: '79 / 10 is integer division, giving 7. The first condition is false and markDiv10 == 7 is true, so grade becomes B and the remaining conditions are not checked.',
    skills: ['U7-S6', 'U7-S3']
  },
  g39: {
    type: 'tf', world: 'logic',
    prompt: 'This is valid Java: if (age > 25 & < 38)',
    answer: false,
    hint: 'Each part of the condition must make sense on its own.',
    explanation: 'False. The variable must be repeated in each part: if (age > 25 & age < 38).',
    skills: ['U7-S8', 'U7-S10']
  },
  g40: {
    type: 'code-write', world: 'logic',
    prompt: 'Write the Greet program: show a menu (A. Afrikaans, E. English, Z. Zulu, X. Exit), input the user\'s choice and display "Goeie Dag", "Good Day" or "Sawubona". It must work for uppercase and lowercase letters.',
    criteria: 'Class Greet. Import javax.swing.*. Display the menu with JOptionPane.showMessageDialog, using \\n for new lines. Input the choice and convert it with .toUpperCase().charAt(0). Initialise String message = "" before the if statements. Use a nested if (else before each following if): A gives "Goeie Dag", E gives "Good Day", Z gives "Sawubona", and any other choice gives a closing message such as "Click Close to end". Display message with JOptionPane.showMessageDialog.',
    starter: 'import javax.swing.*;\n\npublic class Greet {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
    skills: ['U7-S6', 'U7-S15', 'U7-S8'],
    explanation: 'Only one menu option can be chosen, so a nested if is more efficient than separate if statements. message must be initialised because it only gets a value inside the if statements.'
  }
};
