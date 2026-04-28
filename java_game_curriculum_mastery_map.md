# Java Game Curriculum Mastery Map

This document consolidates the curriculum coverage from the uploaded Grade 10 Java learning units and converts it into a structured mastery framework that can be used to train or drive a backend content library for an educational game.

Covered source units:
- Unit 2: Integer and Real Numbers
- Unit 3: Characters, Strings and Math Class
- Unit 4: Problem Solving using Computational Thinking
- Unit 5: For Loops
- Unit 7: If Statements

The purpose of this document is to define, for each unit:
- detailed concepts covered
- expected learner outcomes
- observable mastery criteria
- indicators that the learner still needs reinforcement
- suggested challenge and test coverage for the game backend

---

# 1. How to Use This Document

This document is designed for a backend learning system or content engine.

It can be used to:
- define skill trees
- tag question banks
- build challenge progression
- track learner mastery by concept
- identify weak areas for targeted revision
- support adaptive learning in the game

Recommended backend usage model:
- each unit contains topics
- each topic contains granular skills
- each skill has outcomes and mastery criteria
- each skill can be tagged against challenge templates, analytics, and recommendation rules

---

# 2. Mastery Framework

## 2.1 Suggested Mastery States

Each skill should be trackable using a mastery state such as:

- **Not Started**: no meaningful exposure yet
- **Introduced**: learner has attempted the skill but performance is inconsistent
- **Practising**: learner shows partial understanding but still makes regular mistakes
- **Secure**: learner usually answers correctly in standard contexts
- **Mastered**: learner answers correctly across mixed and slightly harder contexts with consistency

## 2.2 Suggested Evidence Types

Mastery should not be based on one correct answer only. It should be based on a mix of:

- direct recall questions
- output prediction questions
- application questions
- error-spotting questions
- reasoning across mixed skills
- repeated correct performance over time

## 2.3 Suggested General Mastery Rule

A learner can be marked **Mastered** for a skill when they can:

1. answer correctly in at least 3 different challenge types
2. maintain at least 80% to 90% accuracy across recent attempts
3. perform correctly without heavy hint dependence
4. demonstrate the skill in mixed-context questions, not only isolated drills

A learner should be marked **Needs More Practice** when they:

- get fewer than 70% correct recently
- are only successful in recognition questions but fail application questions
- repeatedly confuse key concepts
- depend on hints for most correct answers
- answer correctly only when the question is almost identical to a previous one

---

# 3. Unit 2 — Integer and Real Numbers

## 3.1 Detailed Information Covered

Unit 2 introduces variables, user input, and the basic numeric data types used early in Java. It builds the learner’s understanding of storing values, reading input, converting input to numbers, using arithmetic operators, and understanding how Java handles integer and real-number calculations.

### Main concepts covered
- variables and what they store
- reading input from the user
- `JOptionPane.showInputDialog()`
- assignment statements
- declaring variables
- storing string input first
- converting string input into numbers
- `int` for whole numbers
- `double` for real numbers and decimals
- `Integer.parseInt()`
- `Double.parseDouble()`
- integer division vs real division
- modulus / remainder operator `%`
- increment and decrement
- compound assignment operators
- valid and invalid identifier names
- initialising variables
- overwriting variables
- order of arithmetic operations

## 3.2 Unit Outcomes

By the end of Unit 2, the learner should be able to:

- explain what a variable is
- choose between `String`, `int`, and `double` for simple data
- input data using `JOptionPane.showInputDialog()`
- convert user input to integers and doubles correctly
- perform arithmetic calculations using numeric variables
- predict outputs for simple arithmetic statements
- explain the difference between integer division and decimal division
- use `%` to find remainders
- recognise good identifier names
- explain the difference between declaration, initialisation, assignment, and overwriting

## 3.3 Topic-Level Skills and Mastery Criteria

### Skill U2-S1: Understand variables
**Learner can:**
- explain that a variable stores a value
- identify variables in simple code
- recognise that a variable has a name, type, and value

**Mastery criteria:**
- accurately identifies the purpose of variables in recognition and application questions
- can predict what value a variable stores after assignments
- can distinguish between declaration and assigning a value

**Needs more practice if:**
- confuses a variable name with its value
- cannot track variable value changes
- does not understand that the type affects what may be stored

### Skill U2-S2: Read input using dialog boxes
**Learner can:**
- identify `JOptionPane.showInputDialog()` as input
- explain that user input is initially text

**Mastery criteria:**
- correctly identifies where input happens in code
- can place input in the right stage of IPO questions
- can use input prompts conceptually in a program plan

**Needs more practice if:**
- confuses input with output
- does not understand that dialog input returns a string first

### Skill U2-S3: Choose correct data type
**Learner can:**
- choose `int` for whole numbers
- choose `double` for decimals
- avoid using `String` where calculations are needed

**Mastery criteria:**
- selects correct type for values such as age, price, average, count, and distance
- can explain why one type is more suitable than another

**Needs more practice if:**
- chooses `String` for numbers that will be calculated
- confuses `int` and `double`

### Skill U2-S4: Convert input to integers and doubles
**Learner can:**
- identify and apply `Integer.parseInt()` and `Double.parseDouble()` conceptually

**Mastery criteria:**
- chooses the correct conversion method based on the required numeric type
- predicts what happens if conversion is missing
- understands that calculations require converted numeric values

**Needs more practice if:**
- cannot choose between parse methods
- believes strings will calculate like numbers automatically

### Skill U2-S5: Perform arithmetic with variables
**Learner can:**
- apply `+`, `-`, `*`, `/`, `%`
- predict results of arithmetic statements

**Mastery criteria:**
- correctly predicts arithmetic output across multiple variable values
- uses brackets correctly when needed in output expressions
- distinguishes arithmetic from string concatenation

**Needs more practice if:**
- mixes up concatenation with numeric addition
- misreads the role of brackets

### Skill U2-S6: Understand integer division and remainder
**Learner can:**
- explain that integer division drops the decimal part
- explain that `%` returns the remainder

**Mastery criteria:**
- correctly predicts results such as `5 / 2`, `10 / 3`, `10 % 3`
- applies `%` in even/odd and remainder checks

**Needs more practice if:**
- expects integer division to behave like decimal division
- cannot explain remainder output

### Skill U2-S7: Understand variable updates
**Learner can:**
- interpret increment, decrement, and compound assignment
- recognise overwriting of values

**Mastery criteria:**
- predicts value changes after `num++`, `num--`, `num += 5`, `num *= 2`
- understands that a later assignment replaces the earlier value

**Needs more practice if:**
- treats `+=` as unrelated to addition
- cannot trace updated values correctly

### Skill U2-S8: Use meaningful identifiers
**Learner can:**
- recognise valid and invalid identifier names
- choose clearer variable names

**Mastery criteria:**
- correctly classifies identifier examples
- chooses descriptive names in program-design questions

**Needs more practice if:**
- allows spaces, invalid starting digits, or reserved words
- chooses vague or misleading names repeatedly

## 3.4 Backend Coverage Recommendations for Unit 2

The game backend should include content for:
- variable purpose and value tracking
- data type selection
- input and conversion recognition
- arithmetic output prediction
- integer division and modulus
- increment/decrement drills
- identifier validation
- declaration vs initialisation vs assignment vs overwriting

---

# 4. Unit 3 — Characters, Strings and Math Class

## 4.1 Detailed Information Covered

Unit 3 extends early Java knowledge into character handling, string operations, typecasting, and common mathematical methods. It introduces the idea that a `char` holds a single character, strings are sequences of characters, and Java includes built-in methods and classes that can be reused.

### Main concepts covered
- `char` as a single character type
- single quotes vs double quotes
- character codes / Unicode / ASCII idea
- escape sequences such as `\n`, `\t`, `\"`, `\\`
- output using `JOptionPane.showMessageDialog()`
- formatting text with new lines and tabs
- `String` as a sequence of characters
- string concatenation
- `charAt()`
- `length()`
- widening conversion
- narrowing conversion
- cast operator
- conversions between `double`, `int`, `char`, and `String` conceptually
- `Math.sqrt()`
- `Math.round()`
- `Math.abs()`
- `Math.pow()`
- `Math.PI`

## 4.2 Unit Outcomes

By the end of Unit 3, the learner should be able to:
- distinguish between `char` and `String`
- recognise when single quotes and double quotes are required
- explain and interpret common escape characters
- use `length()` and `charAt()` conceptually
- explain what typecasting is
- predict the effect of converting from one type to another in simple cases
- use the basic Math class methods conceptually and predict outputs
- apply `Math.PI` in simple geometry calculations

## 4.3 Topic-Level Skills and Mastery Criteria

### Skill U3-S1: Distinguish `char` and `String`
**Learner can:**
- explain that `char` stores one character only
- explain that `String` stores text / multiple characters
- recognise single vs double quotes

**Mastery criteria:**
- correctly classifies examples as `char` or `String`
- identifies invalid character declarations conceptually
- chooses the right type in short scenarios

**Needs more practice if:**
- treats `char` and `String` as interchangeable
- uses the wrong quotes repeatedly

### Skill U3-S2: Understand character codes
**Learner can:**
- recognise that characters map to numeric values
- understand simple examples like 65 → `A`

**Mastery criteria:**
- predicts output for simple numeric-to-char or char-to-numeric conversions
- understands that code values and displayed characters are related

**Needs more practice if:**
- cannot connect characters with underlying code values

### Skill U3-S3: Interpret escape sequences
**Learner can:**
- explain `\n`, `\t`, `\"`, `\\`
- predict formatted output using escape sequences

**Mastery criteria:**
- correctly chooses the appropriate escape sequence for a formatting goal
- predicts output layout for short strings

**Needs more practice if:**
- confuses the printed symbols with their formatting behavior

### Skill U3-S4: Understand string methods
**Learner can:**
- explain `length()`
- explain `charAt(position)`
- recognise that indexing begins at 0

**Mastery criteria:**
- correctly predicts length values
- identifies first, last, or indexed characters accurately
- uses zero-based indexing consistently

**Needs more practice if:**
- counts positions starting from 1
- confuses the last position with the length value itself

### Skill U3-S5: Understand typecasting
**Learner can:**
- explain widening and narrowing conceptually
- predict what happens when decimals are cast to integers

**Mastery criteria:**
- correctly predicts results such as `(int) 7.9` → `7`
- understands that narrowing may lose information

**Needs more practice if:**
- expects rounding instead of truncation in integer casts
- cannot recognise loss of decimal data

### Skill U3-S6: Convert between related types conceptually
**Learner can:**
- interpret common conversions such as int ↔ char and int/double ↔ string

**Mastery criteria:**
- selects a correct conceptual conversion route in structured questions
- distinguishes between direct storage and conversion

**Needs more practice if:**
- assumes all types can be swapped directly without conversion

### Skill U3-S7: Use Math class methods conceptually
**Learner can:**
- identify the purpose of `sqrt`, `round`, `abs`, `pow`, and `PI`

**Mastery criteria:**
- predicts outputs of common Math method calls
- matches the correct method to the required task
- uses `Math.PI` appropriately in circle questions

**Needs more practice if:**
- confuses which method does what
- misapplies `pow` or `sqrt`

## 4.4 Backend Coverage Recommendations for Unit 3

The game backend should include content for:
- `char` vs `String`
- quote type selection
- escape sequence meaning and output formatting
- string length and character indexing
- simple typecasting output prediction
- code-value and character relationships
- Math method selection and result prediction
- circle calculations using `Math.PI`

---

# 5. Unit 4 — Problem Solving using Computational Thinking

## 5.1 Detailed Information Covered

Unit 4 shifts from only writing small Java statements to thinking about how problems are solved. It introduces computational thinking, decomposition, pattern recognition, abstraction, algorithms, IPO, data structures, flowcharts, pseudocode, user-friendliness, readability, testing, and trace tables.

### Main concepts covered
- computational thinking as a problem-solving method
- decomposition
- pattern recognition
- abstraction
- algorithms
- understanding the problem before solving it
- breaking a problem into small tasks
- IPO model: input, processing, output
- data structure in a simple introductory sense
- flowchart symbols and flowchart reading
- pseudocode conventions
- converting solutions between pseudocode, flowchart, and Java thinking
- user-friendliness
- readability
- syntax errors
- runtime errors
- logical errors
- standard, abnormal, and extreme test data
- trace tables
- evaluating and improving a solution

## 5.2 Unit Outcomes

By the end of Unit 4, the learner should be able to:
- explain what computational thinking is
- describe decomposition, pattern recognition, abstraction, and algorithms
- break a simple problem into input, processing, and output
- identify what information is relevant and what is irrelevant
- read and write simple pseudocode
- read and interpret simple flowcharts
- distinguish user-friendliness from readability
- identify syntax, runtime, and logical errors
- choose appropriate standard, extreme, and abnormal test data
- complete a basic trace table

## 5.3 Topic-Level Skills and Mastery Criteria

### Skill U4-S1: Understand computational thinking components
**Learner can:**
- name and describe decomposition, pattern recognition, abstraction, and algorithms

**Mastery criteria:**
- matches each component to the correct meaning
- identifies which component is being used in a scenario

**Needs more practice if:**
- confuses abstraction with decomposition
- knows terms only by memory but not by use

### Skill U4-S2: Decompose a problem
**Learner can:**
- break a larger task into smaller ordered tasks

**Mastery criteria:**
- produces sensible small-step breakdowns for simple program problems
- identifies what happens before, during, and after processing

**Needs more practice if:**
- writes steps that are too vague or out of order
- cannot separate sub-tasks

### Skill U4-S3: Use IPO model
**Learner can:**
- identify the input, processing, and output of a simple problem

**Mastery criteria:**
- correctly completes IPO tables for varied scenarios
- distinguishes data entry from calculations and displayed results

**Needs more practice if:**
- mixes processing and output
- includes irrelevant story details as required inputs

### Skill U4-S4: Apply pattern recognition and abstraction
**Learner can:**
- recognise repeated structures in problems
- ignore irrelevant story details

**Mastery criteria:**
- extracts the core structure of a word problem
- reuses logic from similar previous problems

**Needs more practice if:**
- gets distracted by story wording
- cannot see repeated problem types

### Skill U4-S5: Understand algorithms
**Learner can:**
- explain that an algorithm is a step-by-step solution
- follow a simple algorithm in the correct order

**Mastery criteria:**
- orders steps correctly
- identifies missing or misplaced steps in an algorithm

**Needs more practice if:**
- treats steps as interchangeable
- cannot detect incorrect sequence

### Skill U4-S6: Read and write basic pseudocode
**Learner can:**
- understand `begin`, `end`, `input`, `display`, and assignment arrows conceptually

**Mastery criteria:**
- converts simple pseudocode to plain-language meaning
- writes or orders basic pseudocode for straightforward tasks

**Needs more practice if:**
- confuses pseudocode with Java syntax
- uses unclear or incomplete steps

### Skill U4-S7: Read simple flowcharts
**Learner can:**
- identify start/end, input/output, process, decision, and flow arrows

**Mastery criteria:**
- matches symbols to meanings
- follows the route of a simple flowchart correctly

**Needs more practice if:**
- confuses symbol roles
- cannot track branches or direction correctly

### Skill U4-S8: Understand user-friendliness
**Learner can:**
- recognise clear prompts and meaningful outputs

**Mastery criteria:**
- identifies which interface wording is clearer for a user
- improves prompts and messages in design questions

**Needs more practice if:**
- accepts vague input prompts and meaningless outputs as equally good

### Skill U4-S9: Understand readability
**Learner can:**
- recognise descriptive names, indentation, spacing, and logical layout

**Mastery criteria:**
- identifies more readable code or structure from alternatives
- explains why naming and layout matter

**Needs more practice if:**
- cannot distinguish readable from messy code

### Skill U4-S10: Classify error types
**Learner can:**
- distinguish syntax, runtime, and logical errors

**Mastery criteria:**
- classifies common examples correctly
- explains why the program fails or produces the wrong result

**Needs more practice if:**
- calls all mistakes “syntax errors”
- cannot explain the difference between crash and wrong output

### Skill U4-S11: Select test data categories
**Learner can:**
- choose standard, abnormal, and extreme values

**Mastery criteria:**
- provides valid examples in each category for a given input rule
- explains why each value type is useful

**Needs more practice if:**
- treats all unusual data as the same type
- chooses invalid extremes that do not match the stated limits

### Skill U4-S12: Complete trace-table reasoning
**Learner can:**
- follow variable changes step by step
- connect code execution with output

**Mastery criteria:**
- correctly fills in variable states after each line or loop pass
- predicts output using traced values

**Needs more practice if:**
- loses track of updated values
- cannot separate memory changes from printed output

## 5.4 Backend Coverage Recommendations for Unit 4

The game backend should include content for:
- definitions and scenario-matching for computational thinking terms
- IPO table completion
- decomposition ordering challenges
- abstraction and relevance filtering
- flowchart symbol recognition and reading
- pseudocode ordering and conversion
- user-friendliness and readability comparisons
- error classification
- test-data selection
- trace-table mini games

---

# 6. Unit 5 — For Loops

## 6.1 Detailed Information Covered

Unit 5 introduces repetition using `for` loops. It develops the idea that repeated instructions can be placed inside a loop, and that the loop header controls the start value, condition, and increment or decrement. It also includes loop flowcharts, loop errors, counting backwards, loops with `char`, arithmetic sequences, sums, and averages.

### Main concepts covered
- repeated statements and counting loops
- coding a `for` loop in Java
- representing a `for` loop in pseudocode
- start value, condition, and increment/decrement
- statements inside the loop body
- loop indentation and readability
- loop control variable
- controlling how many times a loop runs
- output patterns using loops
- loops with input-driven repetition counts
- printing numbered results during loop runs
- infinite loops and loop errors
- loops that never execute
- loops that execute only once
- loop flowcharts
- counting backwards
- for loops using `char` as control variable
- changing a loop control variable by more than 1
- sequences such as even numbers
- computational thinking with loops
- adding terms in a series
- calculating sums and averages using loops
- repeated overwriting of input variable values while accumulating totals
- testing with standard, extreme, and abnormal data for loop-based programs

## 6.2 Unit Outcomes

By the end of Unit 5, the learner should be able to:
- explain why loops are useful
- identify the three parts of a `for` loop header
- predict how many times a loop runs
- determine the output of simple loops
- understand how start value, condition, and increment work together
- recognise loop errors such as infinite loops and loops that do not run
- write or interpret simple loop logic for repeated output
- use loops to generate sequences and totals
- understand loop-based averages conceptually
- reason about forward and backward loops and char-based loops

## 6.3 Topic-Level Skills and Mastery Criteria

### Skill U5-S1: Understand purpose of loops
**Learner can:**
- explain that loops repeat statements automatically
- identify repeated code that can be simplified by a loop

**Mastery criteria:**
- spots repeated patterns and places them inside a loop conceptually
- explains why loops reduce duplication

**Needs more practice if:**
- cannot recognise repeatable patterns
- treats loops as unrelated to repeated code

### Skill U5-S2: Understand the `for` loop header
**Learner can:**
- identify start value, condition, and update part
- explain the role of the loop control variable

**Mastery criteria:**
- labels each part correctly
- predicts how changing each part changes loop behavior

**Needs more practice if:**
- confuses condition with increment
- cannot identify which variable controls repetition

### Skill U5-S3: Predict loop execution count
**Learner can:**
- determine how many times a simple loop runs
- explain when a loop stops

**Mastery criteria:**
- calculates execution count correctly across forward and backward loops
- recognises inclusive vs exclusive final conditions conceptually

**Needs more practice if:**
- repeatedly miscounts loop runs
- ignores the effect of final comparison operators

### Skill U5-S4: Predict output of repeated actions
**Learner can:**
- determine what is printed during and after a loop

**Mastery criteria:**
- predicts complete output for simple loop-based print programs
- distinguishes repeated body output from once-off output after the loop

**Needs more practice if:**
- assumes statements after the loop are repeated too
- cannot follow print order

### Skill U5-S5: Identify loop errors
**Learner can:**
- recognise infinite loops
- recognise loops that never execute
- recognise loops that execute only once due to poor setup

**Mastery criteria:**
- explains why the error occurs using the start, condition, and update together
- can choose the corrected loop among alternatives

**Needs more practice if:**
- recognises the wrong result but cannot explain why
- does not understand how the condition is tested repeatedly

### Skill U5-S6: Understand backward loops
**Learner can:**
- read loops that count down instead of up

**Mastery criteria:**
- predicts execution count and outputs in decrementing loops
- matches condition direction to decrement behavior

**Needs more practice if:**
- uses an increasing condition with a decreasing counter or vice versa conceptually

### Skill U5-S7: Understand char-based loops
**Learner can:**
- recognise that a `char` can be used as a loop control variable
- interpret output sequences of characters

**Mastery criteria:**
- predicts alphabetical output ranges
- understands that character codes progress in sequence

**Needs more practice if:**
- treats character loops as invalid or random
- cannot connect letter order with increment behavior

### Skill U5-S8: Change loop step size
**Learner can:**
- understand loops that increase or decrease by more than 1
- generate sequences such as even numbers

**Mastery criteria:**
- predicts sequence output for step size 2 or other simple values
- explains why certain values appear or do not appear

**Needs more practice if:**
- assumes all loops increase by 1
- cannot connect step size with generated pattern

### Skill U5-S9: Use loops for totals and averages
**Learner can:**
- understand how repeated input and accumulation work conceptually
- understand sum and average logic inside loops

**Mastery criteria:**
- tracks `sum = sum + value` correctly through repeated passes
- predicts final total or average in simple examples
- distinguishes setup before the loop from repeated work inside it

**Needs more practice if:**
- resets totals incorrectly in reasoning questions
- cannot explain why variables are updated each pass

### Skill U5-S10: Trace loop variables
**Learner can:**
- trace loop control variables and accumulators across multiple passes

**Mastery criteria:**
- fills in loop trace tables correctly
- predicts final variable values after repeated updates

**Needs more practice if:**
- loses track of current pass number or accumulated totals

## 6.4 Backend Coverage Recommendations for Unit 5

The game backend should include content for:
- loop purpose and repeated code spotting
- loop-header labeling
- execution-count prediction
- output prediction with inside-loop and after-loop statements
- infinite / never-run / once-only loop diagnosis
- backward loop reasoning
- char loop reasoning
- non-1 increments and even-number sequences
- totals, sums, averages, and accumulator traces
- loop flowchart interpretation

---

# 7. Unit 7 — If Statements

## 7.1 Detailed Information Covered

Unit 7 introduces decision making in Java using `if`, `else`, nested `if`, separate `if` statements, relational operators, and logical operators. It focuses on evaluating conditions, selecting branches, and understanding how different conditions influence output.

### Main concepts covered
- coding programs with `if` statements
- using a condition to decide between actions
- `if ... else`
- problem solving using conditions
- flowcharts and pseudocode for `if`
- relational operators:
  - `==`
  - `!=`
  - `<`
  - `<=`
  - `>`
  - `>=`
- true and false outcomes
- layout and indentation of `if` statements
- the importance of curly brackets
- common `if` statement mistakes
- opposite conditions
- checking positive / negative / zero
- comparing values to max and min
- nested `if` statements
- when to use separate `if` statements instead of nested structures
- logical operators
  - AND `&&`
  - OR `||`
  - NOT `!`
- uppercase/lowercase handling in character input comparisons conceptually
- evaluating logical conditions in Java

## 7.2 Unit Outcomes

By the end of Unit 7, the learner should be able to:
- explain how an `if` statement works
- evaluate a condition as true or false
- choose the correct relational operator for a rule
- predict which branch of an `if/else` will execute
- understand the role of curly brackets and indentation
- recognise and improve simple nested `if` structures
- know when separate `if` statements are more suitable than nested ones
- interpret simple logical operator expressions using AND, OR, and NOT
- predict output based on condition results

## 7.3 Topic-Level Skills and Mastery Criteria

### Skill U7-S1: Understand `if` and `if/else` structure
**Learner can:**
- identify the condition section and the branch sections
- explain that one path runs when true and another may run when false

**Mastery criteria:**
- labels parts of an if statement correctly
- predicts whether the true or false branch runs in simple cases

**Needs more practice if:**
- thinks both branches run together
- cannot explain what triggers `else`

### Skill U7-S2: Evaluate relational conditions
**Learner can:**
- interpret `==`, `!=`, `<`, `<=`, `>`, `>=`
- translate simple English conditions into operators and vice versa

**Mastery criteria:**
- correctly evaluates conditions using given variable values
- chooses the correct operator to match a rule such as “at least 13” or “not equal to 0”

**Needs more practice if:**
- confuses `=` with `==`
- mixes opposite operators repeatedly

### Skill U7-S3: Predict output of `if` statements
**Learner can:**
- determine what is printed for given inputs and conditions

**Mastery criteria:**
- predicts outputs for standard `if/else` questions accurately
- can explain why that branch is chosen

**Needs more practice if:**
- guesses based on wording instead of evaluating the condition

### Skill U7-S4: Understand curly brackets and layout
**Learner can:**
- recognise that curly brackets group statements
- understand why indentation improves readability

**Mastery criteria:**
- identifies which statements belong to an `if` or `else`
- recognises likely errors caused by missing or misplaced brackets conceptually

**Needs more practice if:**
- assumes layout does not affect understanding
- cannot tell which lines are inside the branch

### Skill U7-S5: Use opposite conditions
**Learner can:**
- identify or derive the opposite of a condition

**Mastery criteria:**
- completes opposite-condition exercises correctly
- preserves the same program meaning when conditions are inverted with branch logic adjusted

**Needs more practice if:**
- changes the operator without understanding the effect on the logic

### Skill U7-S6: Understand nested `if`
**Learner can:**
- follow one decision inside another
- trace the path through nested checks

**Mastery criteria:**
- predicts output of simple nested structures
- recognises that deeper checks happen only when earlier conditions direct the flow there

**Needs more practice if:**
- treats all nested conditions as if they are checked independently every time

### Skill U7-S7: Understand separate independent `if` statements
**Learner can:**
- recognise when more than one test should be done independently

**Mastery criteria:**
- distinguishes between a situation needing nested logic and one needing separate checks
- predicts that separate `if` statements may both execute

**Needs more practice if:**
- always nests conditions even when the checks are independent
- thinks only one `if` may run in a section

### Skill U7-S8: Understand logical operators
**Learner can:**
- interpret `&&`, `||`, and `!`
- reason about combined conditions

**Mastery criteria:**
- correctly evaluates two-condition expressions in simple contexts
- translates common English rules into logical-operator meaning conceptually

**Needs more practice if:**
- treats AND and OR as interchangeable
- cannot reason through NOT

### Skill U7-S9: Apply conditions in meaningful scenarios
**Learner can:**
- interpret word problems using age, discount, divisibility, comparison, or menu-choice logic

**Mastery criteria:**
- chooses correct condition structure for varied simple scenarios
- predicts outputs and messages accurately from problem descriptions

**Needs more practice if:**
- understands operators in isolation but fails in word-problem contexts

## 7.4 Backend Coverage Recommendations for Unit 7

The game backend should include content for:
- identifying `if` structure parts
- relational operator matching and evaluation
- output prediction for conditions
- bracket grouping and readability
- opposite-condition exercises
- nested if reading
- separate-if vs nested-if comparison
- logical operator truth evaluation
- scenario-based decision problems

---

# 8. Cross-Unit Integrated Skills

The backend should not only store unit-isolated content. It should also support mixed-skill challenges, because real understanding appears when the learner combines concepts.

## 8.1 Recommended integrated skill groups

### Group A: Input + type + arithmetic
Combines:
- dialog input
- parsing
- variable type selection
- arithmetic output prediction

### Group B: Strings + conditions
Combines:
- `length()`
- odd/even checks using `%`
- `charAt()`
- if statements based on string size or character position

### Group C: Loop + output + accumulator
Combines:
- for loops
- totals and averages
- trace-table style value tracking

### Group D: Computational thinking + coding logic
Combines:
- IPO
- algorithm ordering
- error spotting
- output reasoning

### Group E: Conditions + loops
Combines:
- loop-generated values
- conditional checks inside or after repeated logic conceptually
- pattern and sequence reasoning

## 8.2 Cross-unit mastery standard
A learner can be considered broadly secure when they can:
- solve mixed-skill questions without needing isolated concept cues
- move between code, flowchart, and pseudocode reasoning
- explain why an answer is correct, not only what the answer is
- handle standard and slightly varied forms of the same problem type

---

# 9. Suggested Backend Tag Structure

Each content item should include tags like:

- `unit:2`
- `topic:variables`
- `skill:integer-division`
- `challenge:output-prediction`
- `difficulty:2`
- `evidence:application`
- `mode:practice`

## 9.1 Suggested challenge types
- recognition
- multiple-choice output prediction
- fill-the-gap
- trace table
- match term to meaning
- classify error
- choose best operator
- order the steps
- IPO completion
- flowchart reading
- pseudocode reading
- scenario decision challenge
- mixed boss challenge

---

# 10. Suggested Mastery Rules Per Skill in the Game

## 10.1 Minimal rule
Mark a skill as **Secure** when the learner gets:
- 4 out of the last 5 correct
- across at least 2 challenge types

## 10.2 Stronger rule
Mark a skill as **Mastered** when the learner gets:
- at least 8 out of the last 10 correct
- across at least 3 challenge types
- with average hint dependence low
- with at least one mixed-context success

## 10.3 Downgrade rule
Reduce mastery confidence if:
- accuracy drops below 60% in the last 5 attempts
- the learner repeatedly fails mixed-context items after isolated success
- the learner only succeeds after multiple hints

---

# 11. Content Gaps to Avoid in the Game

To make the game truly end-to-end, avoid building only simple recall content.

The game must not cover only:
- term definitions
- single-step multiple choice
- exact textbook clones

It must also include:
- output reasoning
- problem decomposition
- error identification
- operator selection in context
- loop run counting
- branch prediction
- mixed-skill application

---

# 12. Final Curriculum Summary for the Backend

## Unit 2 summary
Focuses on variables, input, number types, conversion, arithmetic, identifiers, and arithmetic rules.

## Unit 3 summary
Focuses on characters, strings, escape characters, typecasting, and Math class methods.

## Unit 4 summary
Focuses on computational thinking, IPO, algorithms, pseudocode, flowcharts, testing, readability, user-friendliness, and trace tables.

## Unit 5 summary
Focuses on repetition with for loops, loop control, loop errors, sequences, accumulators, sums, and averages.

## Unit 7 summary
Focuses on decision making with conditions, relational operators, branching, nested logic, separate conditions, and logical operators.

---

# 13. Recommended Next Artifact

The next most useful backend artifact after this file would be a **machine-friendly content schema**, for example:
- units
- topics
- skills
- challenge templates
- difficulty levels
- mastery thresholds
- analytics tags

That would let you directly seed the library and challenge generator for the game.
