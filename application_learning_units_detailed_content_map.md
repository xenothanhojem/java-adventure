Application Learning Units — Detailed Content Map

Purpose

This document is a detailed content specification for configuring an educational application and its learning-unit structure.

It is not a mastery framework.

It is intended to give the application setup enough detail to:

* define learning units end to end
* break each unit into lessons, sub-lessons, and content blocks
* generate theory questions and revision content
* support practical Java exercises where relevant
* structure explanatory content for learner-facing screens
* define lesson outcomes, terminology, examples, and theory coverage
* include a dedicated binary module for calculations and conversions

This content map is based on the uploaded Grade 10 Java units already provided in the conversation, plus an additional structured binary module requested for theory and number-system learning.

Covered uploaded units:

* Unit 2: Integer and Real Numbers
* Unit 3: Characters, Strings and Math Class
* Unit 4: Problem Solving using Computational Thinking
* Unit 5: For Loops
* Unit 7: If Statements

Additional included module:

* Binary Calculations and Conversions

⸻

1. Recommended Structure for the Application

Each learning unit should be configurable using the following hierarchy:

1.1 Unit

A major curriculum area.

1.2 Topic

A major section within the unit.

1.3 Subtopic

A more granular lesson concept.

1.4 Content block

A learner-facing teaching block, for example:

* explanation
* worked example
* key rule
* vocabulary
* misconception warning
* theory question set
* revision summary
* practical task

1.5 Assessment block

A theory or practical testable element, for example:

* define
* explain
* identify
* distinguish
* predict output
* classify
* calculate
* convert
* sequence steps
* detect error

⸻

2. Global Content Types the Application Should Support

The application should support these content modes across all units:

2.1 Theory explanation

Used for definitions, concept teaching, and rules.

2.2 Worked example

Used to demonstrate a concept step by step.

2.3 Quick recap

Used to summarise a topic after explanation.

2.4 Vocabulary list

Used to define keywords that may appear in tests.

2.5 Compare-and-contrast block

Used where learners confuse similar ideas.
Examples:

* char vs String
* int vs double
* syntax error vs runtime error vs logical error
* if vs if...else

2.6 Output prediction block

Used to reinforce theoretical understanding of Java behavior.

2.7 Practical application block

Used to connect theory with simple Java programs.

2.8 Error-spotting block

Used to test understanding of rules and common mistakes.

2.9 Mini test / revision block

Used after each topic or lesson cluster.

⸻

3. Unit 2 — Integer and Real Numbers

3.1 Unit purpose

This unit introduces the learner to variables, data storage, input, numeric conversion, and arithmetic operations in Java. It forms the foundation for understanding how values are stored, changed, and calculated.

3.2 Unit-level learner outcomes

By the end of this unit, the learner should be able to:

* explain what a variable is
* identify and use String, int, and double
* explain how user input is read
* explain why numeric input often needs conversion
* use arithmetic operators correctly
* explain integer division and remainder
* recognise good variable names
* explain assignment and overwriting

3.3 Topic map

Topic 3.3.1 Variables

Subtopics

* what a variable is
* why variables are used
* variable name, type, and value
* storing information temporarily in memory

Theory content to teach

* a variable is a named memory location
* variables allow programs to store data while running
* each variable has a type
* variables may change in value during execution

Vocabulary

* variable
* value
* type
* memory
* declaration
* assignment

Theory questions the app should support

* define a variable
* explain why variables are useful
* identify variables in code
* distinguish between a variable name and the value stored in it

Worked examples

* int age = 15;
* String name = "Angelo";
* showing a variable before and after reassignment

Misconceptions to address

* thinking a variable is the same as the literal value
* thinking variables never change
* not understanding the role of the data type

⸻

Topic 3.3.2 Input from the user

Subtopics

* user input as a program concept
* JOptionPane.showInputDialog()
* input as text first

Theory content to teach

* programs often need values from the user
* showInputDialog() displays a prompt and returns user input
* user input comes in as text before any conversion

Vocabulary

* input
* prompt
* dialog box
* return value

Theory questions the app should support

* identify the input statement in a program
* explain what JOptionPane.showInputDialog() does
* explain why the input is treated as text first

Worked example

* asking for a name
* asking for a number and explaining why parsing is needed later

Misconceptions to address

* assuming dialog input automatically becomes a number
* confusing input with output

⸻

Topic 3.3.3 String values

Subtopics

* what String means
* text values in Java
* using double quotes
* concatenation of strings

Theory content to teach

* a String stores text
* strings are enclosed in double quotation marks
* strings can be combined using +
* strings are different from numeric values even if they look like numbers

Vocabulary

* string
* text
* concatenation
* literal

Theory questions the app should support

* define a String
* explain why "25" is not the same as 25
* identify a string literal
* predict simple string-joining output

Misconceptions to address

* thinking a number typed in quotes is numeric
* confusing concatenation with addition

⸻

Topic 3.3.4 Integer values (int)

Subtopics

* whole numbers
* positive and negative integers
* storing countable amounts

Theory content to teach

* int stores whole numbers only
* integers do not include decimal fractions
* integer values are suitable for counts, ages, and quantities with no decimal part

Vocabulary

* integer
* whole number
* negative number

Theory questions the app should support

* define int
* choose when to use int
* identify invalid uses of int

Misconceptions to address

* trying to store decimal values in int
* choosing int for money amounts with cents

⸻

Topic 3.3.5 Real values (double)

Subtopics

* decimal numbers
* real-number input and calculations
* when double is preferred over int

Theory content to teach

* double stores numbers with decimal values
* it is used where precision beyond whole numbers is needed
* examples include prices, averages, distances, and measurements

Vocabulary

* double
* decimal
* real number

Theory questions the app should support

* define double
* explain when double should be used instead of int
* classify values into int or double

Misconceptions to address

* assuming double is only for “very big” numbers
* not realising decimal values require a decimal-capable type

⸻

Topic 3.3.6 Parsing and conversion

Subtopics

* Integer.parseInt()
* Double.parseDouble()
* converting text input into numbers

Theory content to teach

* input is usually received as text
* if a calculation must be done, text must be converted to a numeric type
* Integer.parseInt() converts a string to an integer
* Double.parseDouble() converts a string to a double

Vocabulary

* parse
* convert
* numeric conversion

Theory questions the app should support

* explain what Integer.parseInt() does
* explain what Double.parseDouble() does
* choose the correct conversion method for a given task
* explain what may go wrong if conversion is not done

Misconceptions to address

* assuming parse methods are optional in numeric input tasks
* using the wrong parse method

⸻

Topic 3.3.7 Assignment and overwriting

Subtopics

* assignment operator =
* initialisation
* updating a variable
* overwriting old values

Theory content to teach

* assignment means storing a value in a variable
* = does not mean mathematical equality in the same way as algebra
* a variable can be given a new value later
* the new value replaces the old one

Vocabulary

* assignment
* initialisation
* overwrite
* reassignment

Theory questions the app should support

* explain assignment
* distinguish declaration from assignment
* trace changing variable values

Misconceptions to address

* reading = only as “equals” in the mathematical sense
* not understanding that a later assignment replaces the earlier one

⸻

Topic 3.3.8 Identifiers and naming rules

Subtopics

* valid variable names
* invalid variable names
* meaningful names

Theory content to teach

* identifiers are names used for variables and other program elements
* good identifiers are meaningful and readable
* identifiers cannot contain spaces
* identifiers should not begin with a number
* reserved keywords cannot be used as identifiers

Vocabulary

* identifier
* keyword
* naming convention

Theory questions the app should support

* identify valid vs invalid names
* explain why a name is invalid
* improve poor variable names

Misconceptions to address

* allowing spaces in names
* starting a name with a digit
* using keywords as names

⸻

Topic 3.3.9 Arithmetic operators

Subtopics

* addition
* subtraction
* multiplication
* division
* modulus

Theory content to teach

* + adds numbers
* - subtracts
* * multiplies
* / divides
* % gives the remainder after division

Vocabulary

* operator
* expression
* modulus
* remainder

Theory questions the app should support

* match operators to meanings
* evaluate arithmetic expressions
* explain the purpose of %
* identify which operator to use in a given problem

Misconceptions to address

* confusing % with percentage
* confusing / with fraction notation without considering type behavior

⸻

Topic 3.3.10 Integer division and remainder

Subtopics

* integer division result
* discarded decimal part
* remainder

Theory content to teach

* integer division gives a whole-number result if both values are integers
* the decimal part is discarded in integer division
* remainder can be found using %

Theory questions the app should support

* explain why 5 / 2 may give 2
* calculate quotient and remainder separately
* distinguish integer division from decimal division

Misconceptions to address

* expecting 5 / 2 to always produce 2.5
* confusing quotient with remainder

⸻

Topic 3.3.11 Increment, decrement, and compound assignment

Subtopics

* ++
* --
* +=
* -=
* *=
* /=

Theory content to teach

* increment increases by one
* decrement decreases by one
* compound assignment is a shortened update form
* these forms are common in programming and loops

Vocabulary

* increment
* decrement
* compound assignment

Theory questions the app should support

* explain the meaning of x++
* rewrite compound assignments in long form
* predict resulting variable values

Misconceptions to address

* confusing x++ with x+1 without storing the result
* not understanding the effect of compound assignment

⸻

Topic 3.3.12 Order of arithmetic operations

Subtopics

* brackets first
* multiplication/division/modulus
* addition/subtraction

Theory content to teach

* arithmetic follows a fixed order
* brackets are evaluated first
* multiplication, division, and modulus are done before addition and subtraction

Vocabulary

* precedence
* order of operations
* expression evaluation

Theory questions the app should support

* evaluate expressions step by step
* explain why two expressions give different answers

Misconceptions to address

* calculating strictly left to right without considering precedence

⸻

4. Unit 3 — Characters, Strings and Math Class

4.1 Unit purpose

This unit expands the learner’s understanding of text and symbols in Java, introduces character data, string methods, escape sequences, typecasting, and the use of built-in mathematical methods.

4.2 Unit-level learner outcomes

By the end of this unit, the learner should be able to:

* distinguish clearly between char and String
* explain single quotes vs double quotes
* interpret escape sequences
* use and explain length() and charAt() conceptually
* explain basic typecasting
* convert between number and character representations conceptually
* explain the purpose of key Math methods and Math.PI

4.3 Topic map

Topic 4.3.1 Character data (char)

Subtopics

* single characters
* character literals
* single quotes
* character code values

Theory content to teach

* char stores one character only
* character literals use single quotes
* a character may also be understood through its code value

Vocabulary

* char
* character literal
* single quote
* code value

Theory questions the app should support

* define char
* distinguish between char and String
* identify valid and invalid character literals

Misconceptions to address

* using double quotes for char
* trying to store multiple characters in a char

⸻

Topic 4.3.2 Difference between char and String

Subtopics

* one character vs many characters
* data type purpose
* syntax difference

Theory content to teach

* char stores one symbol
* String stores a sequence of characters
* syntax and use cases are different

Theory questions the app should support

* compare char and String
* classify values as character or string
* explain why 'A' and "A" are different

Misconceptions to address

* assuming a one-letter string is the same thing as a char

⸻

Topic 4.3.3 Escape sequences

Subtopics

* new line
* tab
* quote escaping
* backslash escaping

Theory content to teach

* escape sequences allow special formatting or special characters in strings
* \n creates a new line
* \t creates a tab
* \" allows a quotation mark in a string
* \\ represents a backslash

Vocabulary

* escape sequence
* new line
* tab
* special character

Theory questions the app should support

* match escape sequences to effects
* explain why escape sequences are needed
* predict formatted output

Misconceptions to address

* treating escape sequences as normal letters
* confusing \n with /n

⸻

Topic 4.3.4 Strings and string methods

Subtopics

* sequence of characters
* length()
* charAt()
* indexing starts at zero

Theory content to teach

* a string is made up of characters in positions
* length() returns the number of characters
* charAt(index) returns the character at a specific index
* indexing starts at 0, not 1

Vocabulary

* index
* position
* length
* method

Theory questions the app should support

* explain what length() does
* explain what charAt() does
* determine the first, last, or middle character from a given word
* identify indexing mistakes

Misconceptions to address

* starting positions at 1 instead of 0
* confusing length with the last index value

⸻

Topic 4.3.5 Typecasting

Subtopics

* widening and narrowing
* cast operator
* explicit conversion

Theory content to teach

* typecasting changes one type to another
* some conversions are safe and automatic, others must be explicit
* narrowing conversion may lose information
* casting from double to int removes the decimal part

Vocabulary

* typecasting
* cast operator
* narrowing
* widening

Theory questions the app should support

* explain typecasting
* explain what happens when casting a double to an int
* distinguish automatic from explicit conversion conceptually

Misconceptions to address

* believing conversion always preserves the exact value
* confusing parsing with casting

⸻

Topic 4.3.6 Character-number relationships

Subtopics

* converting code to character
* converting character to numeric code
* conceptual role of character encoding

Theory content to teach

* characters can be represented by numeric codes
* a number can be cast to a character
* a character can be treated as its code value

Vocabulary

* character code
* encoding
* ASCII / Unicode concept

Theory questions the app should support

* explain how a number can represent a character
* convert simple code values to letters conceptually
* explain why characters and numbers are related in computing

Misconceptions to address

* assuming characters and numeric codes are completely unrelated

⸻

Topic 4.3.7 Math class overview

Subtopics

* built-in class for calculations
* purpose of methods
* reusable prewritten functionality

Theory content to teach

* Java provides a Math class with useful built-in methods
* these methods allow common calculations without writing custom logic from scratch

Vocabulary

* Math class
* method
* built-in method

Theory questions the app should support

* explain what the Math class is used for
* identify which problems suit Math methods

⸻

Topic 4.3.8 Math.sqrt()

Theory content to teach

* returns the square root of a number
* useful in geometry and formula-based problems

Topic 4.3.9 Math.round()

Theory content to teach

* rounds a real number to the nearest whole number

Topic 4.3.10 Math.abs()

Theory content to teach

* returns the absolute value
* absolute value is distance from zero, so it is never negative

Topic 4.3.11 Math.pow()

Theory content to teach

* raises a number to a power

Topic 4.3.12 Math.PI

Theory content to teach

* represents the value of pi
* used in circle and geometry formulas

Theory questions the app should support across these methods

* match each method to its purpose
* identify the best method for a problem
* interpret method outputs in simple examples

Misconceptions to address

* confusing round with truncation
* confusing absolute value with changing sign arbitrarily
* confusing powers with multiplication by the exponent

⸻

5. Unit 4 — Problem Solving using Computational Thinking

5.1 Unit purpose

This unit develops the learner’s ability to think like a problem solver before coding. It introduces computational thinking, IPO analysis, abstraction, algorithms, pseudocode, flowcharts, test data, error categories, and trace tables.

5.2 Unit-level learner outcomes

By the end of this unit, the learner should be able to:

* explain computational thinking
* identify decomposition, pattern recognition, abstraction, and algorithms
* break problems into input, processing, and output
* read simple pseudocode and flowcharts
* classify types of errors
* explain basic testing concepts
* complete trace-based reasoning tasks

5.3 Topic map

Topic 5.3.1 Computational thinking

Subtopics

* decomposition
* pattern recognition
* abstraction
* algorithms

Theory content to teach

* decomposition means breaking a problem into smaller parts
* pattern recognition means spotting similarities or repetition
* abstraction means focusing on relevant details and ignoring unimportant ones
* an algorithm is a step-by-step solution

Vocabulary

* decomposition
* pattern recognition
* abstraction
* algorithm

Theory questions the app should support

* define each term
* match examples to the correct term
* explain why computational thinking helps in programming

Misconceptions to address

* mixing up abstraction and decomposition
* thinking an algorithm must always be written in code

⸻

Topic 5.3.2 IPO model

Subtopics

* input
* processing
* output

Theory content to teach

* input is the data entered or provided
* processing is the work/calculation done on the data
* output is the result shown or produced

Theory questions the app should support

* identify IPO for a scenario
* sort given statements into input, processing, or output
* explain why IPO helps planning

Misconceptions to address

* confusing input and output
* putting calculations into input instead of processing

⸻

Topic 5.3.3 Abstraction in word problems

Subtopics

* relevant vs irrelevant details
* simplifying a problem description

Theory content to teach

* not every story detail matters to the algorithm
* the programmer must extract only what is needed to solve the problem

Theory questions the app should support

* identify unnecessary details in a problem statement
* explain what data is actually needed

Misconceptions to address

* trying to include every narrative detail in program logic

⸻

Topic 5.3.4 Algorithms

Subtopics

* ordered steps
* precise instructions
* logic sequence

Theory content to teach

* an algorithm is a series of ordered instructions to solve a problem
* the order of steps matters
* ambiguous instructions lead to weak solutions

Theory questions the app should support

* arrange steps into the correct order
* identify missing steps in an algorithm
* compare good and bad algorithm descriptions

⸻

Topic 5.3.5 Pseudocode

Subtopics

* purpose of pseudocode
* structure of pseudocode
* language-independent planning

Theory content to teach

* pseudocode is a structured way to describe a solution without strict programming syntax
* it helps plan logic before coding
* it uses readable, programming-like instructions

Vocabulary

* pseudocode
* algorithm design

Theory questions the app should support

* define pseudocode
* explain why pseudocode is useful
* interpret simple pseudocode
* convert a small algorithm into pseudocode-like steps

Misconceptions to address

* thinking pseudocode must compile
* thinking pseudocode has only one exact format

⸻

Topic 5.3.6 Flowcharts

Subtopics

* start/end symbol
* input/output symbol
* process symbol
* decision symbol
* flow arrows

Theory content to teach

* flowcharts show the logic of a process visually
* each symbol has a different purpose
* arrows show the order of flow
* decision points create branches

Vocabulary

* flowchart
* symbol
* process
* decision
* branch

Theory questions the app should support

* match flowchart symbols to functions
* read simple flowcharts
* compare pseudocode with flowcharts

Misconceptions to address

* confusing the input/output symbol with the process symbol
* ignoring arrow direction

⸻

Topic 5.3.7 User-friendliness and readability

Subtopics

* clear prompts
* meaningful output
* readable code and design

Theory content to teach

* user-friendliness refers to how easy the program is for a user to understand and use
* readability refers to how easy it is for a human to read and understand the code
* good prompts, labels, spacing, and naming improve quality

Theory questions the app should support

* explain user-friendliness
* explain readability
* distinguish between user-facing clarity and code clarity

Misconceptions to address

* assuming a program is readable just because it runs
* assuming user-friendliness only means “looks nice”

⸻

Topic 5.3.8 Error types

Subtopics

* syntax errors
* runtime errors
* logical errors

Theory content to teach

* syntax errors break the rules of the programming language
* runtime errors happen when the program runs and encounters a problem
* logical errors allow the program to run but produce wrong results

Vocabulary

* syntax error
* runtime error
* logical error

Theory questions the app should support

* define each error type
* classify given examples
* explain why each error is different

Misconceptions to address

* assuming every wrong answer is a syntax error
* confusing runtime with logical errors

⸻

Topic 5.3.9 Testing and test data

Subtopics

* standard data
* abnormal data
* extreme data

Theory content to teach

* standard data is normal expected input
* abnormal data is invalid or unexpected input
* extreme data is valid input at the boundaries of allowed range
* testing is necessary to check correctness and robustness

Theory questions the app should support

* define each type of test data
* choose examples of each type
* explain why different test data types matter

Misconceptions to address

* thinking extreme data means invalid data
* not distinguishing abnormal from unusual-but-valid input

⸻

Topic 5.3.10 Trace tables

Subtopics

* tracking variable changes
* following execution step by step
* confirming expected results

Theory content to teach

* a trace table records how values change during execution
* it helps the learner follow logic carefully
* it is useful for debugging and understanding loops and conditions

Theory questions the app should support

* explain the purpose of a trace table
* complete missing values in a trace-style scenario
* use tracing to predict final values

Misconceptions to address

* changing multiple variables incorrectly at the wrong step
* skipping line-by-line reasoning

⸻

6. Unit 5 — For Loops

6.1 Unit purpose

This unit introduces controlled repetition using for loops. It helps the learner understand how repeated actions are structured, counted, and controlled in Java.

6.2 Unit-level learner outcomes

By the end of this unit, the learner should be able to:

* explain why loops are useful
* explain the three main parts of a for loop
* predict how many times a loop will execute
* trace loop-controlled output and totals
* identify loops that count up or down
* interpret loops with numeric and character control variables

6.3 Topic map

Topic 6.3.1 Need for repetition

Subtopics

* repeated instructions
* reducing duplication
* automation through loops

Theory content to teach

* loops are used when instructions must be repeated
* loops make code shorter and more efficient
* repetition structures reduce manual duplication

Theory questions the app should support

* explain why a loop is better than repeated statements
* identify tasks that suit repetition

⸻

Topic 6.3.2 Structure of a for loop

Subtopics

* initial value
* condition
* increment or decrement
* loop body

Theory content to teach

* a for loop usually contains a start value, a test condition, and an update step
* the body contains the instructions repeated each cycle
* the loop stops when the condition becomes false

Vocabulary

* loop variable
* initialisation
* condition
* increment
* decrement
* loop body
* iteration

Theory questions the app should support

* label the parts of a for loop
* explain what each part does
* identify when the condition is checked conceptually

Misconceptions to address

* not seeing the update step as part of the loop control
* assuming the loop runs forever unless manually stopped

⸻

Topic 6.3.3 Loop counting and number of iterations

Subtopics

* counting iterations
* start/end logic
* inclusive and exclusive end conditions

Theory content to teach

* the number of times a loop runs depends on the start value, condition, and update step together
* inclusive conditions such as <= behave differently from strict conditions such as <

Theory questions the app should support

* calculate loop iteration count
* explain why two similar loops run a different number of times
* predict whether a loop runs zero times

Misconceptions to address

* counting only from the condition without considering the start value
* overlooking whether the final bound is included

⸻

Topic 6.3.4 Incrementing and decrementing loops

Subtopics

* count-up loops
* count-down loops
* custom step sizes

Theory content to teach

* loops may count forward or backward
* the update step can change by more than 1
* the step direction must match the stopping condition logically

Theory questions the app should support

* identify whether a loop counts up or down
* predict outputs from stepped loops
* spot invalid combinations of direction and condition

Misconceptions to address

* pairing an increasing update with a decreasing condition incorrectly

⸻

Topic 6.3.5 Loops with char

Subtopics

* character progression
* code order of characters

Theory content to teach

* character variables can also be used in loop control
* characters progress according to their code ordering

Theory questions the app should support

* predict output of simple character loops
* explain how a loop can move from one character to another

Misconceptions to address

* assuming characters cannot be incremented conceptually

⸻

Topic 6.3.6 Loop output patterns

Subtopics

* printed sequences
* repeated lines
* structured output

Theory content to teach

* loops often generate repeated output efficiently
* output may depend on the loop variable each time

Theory questions the app should support

* predict printed values
* choose a loop that matches a required pattern

Misconceptions to address

* forgetting that output happens once per iteration

⸻

Topic 6.3.7 Totals, sums, and averages in loops

Subtopics

* accumulator concept
* running total
* combining loops with arithmetic

Theory content to teach

* loops are often used to add repeated values into a total
* a running total changes each iteration
* averages may use both a total and a count

Theory questions the app should support

* trace changing totals inside loops
* explain the role of an accumulator variable
* predict the final total or average conceptually

Misconceptions to address

* resetting a total inside the loop conceptually instead of before it

⸻

Topic 6.3.8 Loop errors and special cases

Subtopics

* loop never runs
* infinite loop concept
* wrong update direction
* off-by-one errors

Theory content to teach

* a loop may never execute if the starting condition already fails
* a loop may become infinite if the condition never becomes false
* off-by-one errors happen when the loop runs one time too many or too few

Theory questions the app should support

* identify whether a loop runs zero times, some times, or forever conceptually
* explain why a loop is incorrect
* spot off-by-one issues

Misconceptions to address

* not recognising that conditions control termination
* not noticing boundary errors

⸻

7. Unit 7 — If Statements

7.1 Unit purpose

This unit introduces conditional logic and decision making in Java. It enables the learner to test conditions and choose different actions depending on whether a condition is true or false.

7.2 Unit-level learner outcomes

By the end of this unit, the learner should be able to:

* explain the purpose of an if statement
* use and interpret relational operators
* predict true/false results of conditions
* read and explain if, if...else, and nested if
* understand simple logical operators conceptually
* reason about output based on conditions

7.3 Topic map

Topic 7.3.1 Decision making in programs

Subtopics

* conditions
* true/false outcomes
* branching logic

Theory content to teach

* programs sometimes need to make decisions
* decisions depend on conditions
* conditions evaluate to true or false

Theory questions the app should support

* explain why decision structures are needed
* identify whether a statement is a condition

⸻

Topic 7.3.2 Relational operators

Subtopics

* >
* <
* >=
* <=
* ==
* !=

Theory content to teach

* relational operators compare values
* comparison expressions return true or false
* == means “is equal to” in comparisons
* != means “is not equal to”

Vocabulary

* relational operator
* comparison
* condition
* boolean result

Theory questions the app should support

* match operators to meanings
* choose the correct operator for a condition
* explain the difference between = and ==

Misconceptions to address

* confusing assignment = with equality test ==
* confusing ! with “not equal” unless paired correctly

⸻

Topic 7.3.3 Simple if statement

Subtopics

* action if true
* no alternative branch

Theory content to teach

* a simple if statement runs a block only when a condition is true
* if the condition is false, the block is skipped

Theory questions the app should support

* explain what a simple if does
* predict whether a block executes
* identify output when the condition is false

Misconceptions to address

* assuming the block runs regardless

⸻

Topic 7.3.4 if...else

Subtopics

* true branch
* false branch
* two-way decision

Theory content to teach

* if...else provides one path when the condition is true and another when it is false
* exactly one of the branches executes in a standard two-way decision

Theory questions the app should support

* explain if...else
* predict which branch runs
* compare simple if vs if...else

Misconceptions to address

* thinking both branches can run in a normal if...else

⸻

Topic 7.3.5 Nested if

Subtopics

* if inside another if
* multi-level decisions

Theory content to teach

* nested if statements are used when a second decision depends on the first one
* nesting increases logical complexity and must be read carefully

Theory questions the app should support

* explain what nested if means
* identify which path runs in a nested structure

Misconceptions to address

* losing track of which condition belongs to which block

⸻

Topic 7.3.6 Multiple separate if statements

Subtopics

* independent conditions
* more than one true block possible

Theory content to teach

* separate if statements are independent
* more than one may run if more than one condition is true
* this differs from a single if...else chain

Theory questions the app should support

* compare separate if statements with if...else
* predict output when multiple conditions are true

Misconceptions to address

* assuming separate if statements behave like if...else

⸻

Topic 7.3.7 Logical operators

Subtopics

* AND
* OR
* NOT

Theory content to teach

* AND requires both conditions to be true
* OR requires at least one condition to be true
* NOT reverses a boolean value or condition conceptually

Vocabulary

* logical operator
* AND
* OR
* NOT
* combined condition

Theory questions the app should support

* explain the meaning of AND, OR, and NOT
* determine true/false outcomes of combined conditions
* choose the correct logical operator for a scenario

Misconceptions to address

* treating OR as meaning both are required
* forgetting that NOT reverses the condition meaning

⸻

Topic 7.3.8 Output prediction with conditions

Subtopics

* condition evaluation
* branch selection
* final output

Theory content to teach

* to predict output, the learner must evaluate the condition first
* only the statements in the chosen branch execute
* nested and separate conditions require careful step-by-step reading

Theory questions the app should support

* output prediction
* explain branch choice
* complete mini trace reasoning with conditions

⸻

8. Binary Calculations and Conversions Module

8.1 Purpose of this module

This module provides detailed lesson content for binary number systems, binary calculations, and binary conversions. It can be used as a standalone theory unit or as a supporting module for broader computing understanding.

8.2 Module-level learner outcomes

By the end of this module, the learner should be able to:

* explain what binary is
* explain why computers use binary
* distinguish binary from decimal
* understand place value in binary
* convert binary to decimal
* convert decimal to binary
* perform simple binary addition
* recognise carry in binary addition
* perform simple binary subtraction conceptually where required
* explain bits, bytes, and common digital storage terminology at a basic level

⸻

8.3 Topic map for Binary

Topic 8.3.1 Number systems overview

Subtopics

* decimal number system
* binary number system
* base / radix concept

Theory content to teach

* a number system is a way of representing values using symbols and place values
* decimal is base 10 and uses digits 0 to 9
* binary is base 2 and uses only 0 and 1
* the base tells you how many symbols the system uses

Vocabulary

* number system
* base
* radix
* decimal
* binary

Theory questions the app should support

* define decimal and binary
* explain what base 10 and base 2 mean
* compare decimal and binary systems

Misconceptions to address

* thinking binary numbers are “smaller” rather than just represented differently

⸻

Topic 8.3.2 Why computers use binary

Subtopics

* two-state electronic systems
* on/off concept
* reliability of binary representation

Theory content to teach

* computers use electronic components that naturally represent two states
* these states can be treated as on/off or 1/0
* binary is reliable because it maps well to the hardware behavior of digital systems

Theory questions the app should support

* explain why computers use binary instead of decimal internally
* explain the relation between binary and electronic states

Misconceptions to address

* thinking computers “prefer” binary for mathematical reasons only

⸻

Topic 8.3.3 Binary place value

Subtopics

* powers of 2
* place columns
* reading binary from right to left

Theory content to teach

* binary place values increase in powers of 2
* from right to left the columns are 1, 2, 4, 8, 16, 32, 64, 128, and so on
* each position shows whether that power of 2 is included or not

Vocabulary

* place value
* power of 2
* bit position

Theory questions the app should support

* label binary place values
* identify the decimal value of each bit position
* explain how binary place value differs from decimal place value

Misconceptions to address

* reading place values as powers of 10 instead of powers of 2

Worked example

Binary number: 10110

Place values:

* 16
* 8
* 4
* 2
* 1

Digit-by-digit meaning:

* 1 × 16 = 16
* 0 × 8 = 0
* 1 × 4 = 4
* 1 × 2 = 2
* 0 × 1 = 0

Total = 22

⸻

Topic 8.3.4 Binary to decimal conversion

Subtopics

* place-value method
* sum of active powers of 2

Theory content to teach

* to convert binary to decimal, multiply each bit by its place value and add the results
* only positions with a 1 contribute to the total

Step-by-step lesson content

Example: Convert 1101 to decimal.

Step 1: Write the place values above the digits.

* 8, 4, 2, 1

Step 2: Multiply each bit by its place value.

* 1 × 8 = 8
* 1 × 4 = 4
* 0 × 2 = 0
* 1 × 1 = 1

Step 3: Add the results.

* 8 + 4 + 0 + 1 = 13

Therefore:

* 1101₂ = 13₁₀

More examples

* 1010₂ = 10₁₀
* 1111₂ = 15₁₀
* 100000₂ = 32₁₀

Theory questions the app should support

* convert binary to decimal
* explain each conversion step
* identify place values in a binary number

Misconceptions to address

* adding digits instead of place values
* assigning wrong place values

⸻

Topic 8.3.5 Decimal to binary conversion

Subtopics

* repeated division by 2
* reading remainders from bottom to top
* place-value decomposition method

Theory content to teach

There are two useful teaching approaches.

Method A: repeated division by 2

* divide the decimal number by 2
* record the remainder
* keep dividing the quotient by 2 until the quotient is 0
* read the remainders from bottom to top

Method B: highest powers of 2

* find the largest power of 2 that fits into the number
* mark 1 for that place
* subtract it
* continue through the place values until done

Step-by-step lesson content using repeated division

Example: Convert 13 to binary.

* 13 ÷ 2 = 6 remainder 1
* 6 ÷ 2 = 3 remainder 0
* 3 ÷ 2 = 1 remainder 1
* 1 ÷ 2 = 0 remainder 1

Read remainders from bottom to top:

* 1101

Therefore:

* 13₁₀ = 1101₂

Step-by-step lesson content using powers of 2

Example: Convert 22 to binary.

Largest power of 2 not bigger than 22 is 16.

Place values:

* 16, 8, 4, 2, 1

Now decide each bit:

* 22 includes 16 → 1, remainder 6
* 6 does not include 8 → 0
* 6 includes 4 → 1, remainder 2
* 2 includes 2 → 1, remainder 0
* 0 does not include 1 → 0

So:

* 22₁₀ = 10110₂

Theory questions the app should support

* convert decimal to binary
* explain repeated division steps
* explain reading remainders in reverse order
* choose the correct binary form for a decimal number

Misconceptions to address

* reading remainders top to bottom instead of bottom to top
* stopping division too early

⸻

Topic 8.3.6 Binary addition

Subtopics

* addition rules
* carry in binary
* column addition

Theory content to teach

Binary addition works like decimal column addition, but there are only four basic facts:

* 0 + 0 = 0
* 0 + 1 = 1
* 1 + 0 = 1
* 1 + 1 = 10

The result 10 means:

* write down 0
* carry 1 to the next column

Also:

* 1 + 1 + 1 = 11
    meaning:
* write down 1
* carry 1

Step-by-step lesson content

Example: Add 1011 and 0110

   1011
 + 0110
 ------

From right to left:

* 1 + 0 = 1
* 1 + 1 = 10 → write 0, carry 1
* 0 + 1 + carried 1 = 10 → write 0, carry 1
* 1 + 0 + carried 1 = 10 → write 0, carry 1
* final carry = 1

Result:

* 10001

Therefore:

* 1011₂ + 0110₂ = 10001₂

Theory questions the app should support

* apply basic binary addition rules
* complete binary addition columns
* explain carrying in binary
* identify errors in a binary addition problem

Misconceptions to address

* treating 1 + 1 as 2 instead of binary 10
* forgetting to carry

⸻

Topic 8.3.7 Binary subtraction

Subtopics

* simple subtraction rules
* borrowing concept

Theory content to teach

Basic binary subtraction rules:

* 0 - 0 = 0
* 1 - 0 = 1
* 1 - 1 = 0
* 0 - 1 requires borrowing

Borrowing in binary works similarly to decimal, but the borrowed value is based on powers of 2.

Step-by-step lesson content

Example: 1010 - 0011

This may be taught either by binary subtraction steps or by converting to decimal to verify:

* 1010₂ = 10₁₀
* 0011₂ = 3₁₀
* 10 - 3 = 7
* 7₁₀ = 0111₂

So:

* 1010₂ - 0011₂ = 0111₂

Theory questions the app should support

* apply basic subtraction rules
* explain borrowing conceptually
* verify subtraction by decimal conversion where appropriate

Misconceptions to address

* subtracting left to right
* not handling borrow correctly

⸻

Topic 8.3.8 Binary multiplication (optional extension)

Theory content to teach

* binary multiplication follows place-value logic and repeated addition ideas
* useful as extension content if the curriculum or application wants to deepen number-system understanding

This may be optional depending on the learner level.

⸻

Topic 8.3.9 Bits, bytes and storage basics

Subtopics

* bit
* nibble
* byte
* kilobyte / megabyte concept

Theory content to teach

* a bit is one binary digit, either 0 or 1
* 4 bits form a nibble
* 8 bits form a byte
* bytes are used to measure digital storage and data size

Vocabulary

* bit
* nibble
* byte
* storage

Theory questions the app should support

* define bit and byte
* explain how many bits are in a byte
* match terminology to quantity

Misconceptions to address

* confusing bits and bytes
* thinking byte means any group of binary digits

⸻

Topic 8.3.10 Binary lesson sequence recommendation

For application setup, the binary module can be delivered in the following lesson order:

Lesson 1

* decimal vs binary
* base concept
* why computers use binary

Lesson 2

* binary place values
* reading powers of 2
* simple binary to decimal

Lesson 3

* decimal to binary using repeated division
* decimal to binary using place values

Lesson 4

* binary addition
* carrying rules
* verification by decimal checking

Lesson 5

* binary subtraction
* borrowing
* bits and bytes recap
* mixed conversion test

⸻

9. Suggested Theory Question Bank Categories for the Application

The backend application should support these theory content categories across all units:

9.1 Define

Example:

* Define a variable.
* Define abstraction.
* Define a byte.

9.2 Explain

Example:

* Explain why input must sometimes be converted.
* Explain why computers use binary.
* Explain the difference between a simple if and if...else.

9.3 Distinguish

Example:

* Distinguish between char and String.
* Distinguish between syntax and logical errors.
* Distinguish between integer division and decimal division.

9.4 Identify

Example:

* Identify the operator used for remainder.
* Identify the flowchart symbol for decision.
* Identify the correct place value of a binary digit.

9.5 Predict

Example:

* Predict the output of a loop.
* Predict the result of a condition.
* Predict the decimal value of a binary number.

9.6 Convert / calculate

Example:

* Convert decimal to binary.
* Convert binary to decimal.
* Add binary values.

9.7 Classify

Example:

* Classify an error.
* Classify a value as int, double, char, or String.
* Classify test data as standard, abnormal, or extreme.

9.8 Sequence

Example:

* Put algorithm steps in order.
* Put decimal-to-binary conversion steps in order.

⸻

10. Suggested Application Metadata Model

For each content item or question, the application should ideally store:

* unit
* topic
* subtopic
* lesson title
* theory point
* content type
* explanation text
* worked example
* vocabulary terms
* misconception flags
* question category
* difficulty level
* learner-facing hint
* answer / marking guide

⸻

11. Final Implementation Note

This document is designed to give your application setup a complete content blueprint, rather than a progress or mastery model.

Use it to:

* create the learning unit tree
* populate learner-facing explanations
* define revision lesson screens
* structure theory question banks
* support binary lessons and calculations in full

The most useful next step after this document would be to convert it into:

1. a JSON-ready unit/topic schema, or
2. a question-bank content template, or
3. a screen-by-screen learning content pack for the app.