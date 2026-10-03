// Unit 11: Methods (Exploring IT: Java Programming Grade 10, 3rd ed)
import { Workflow } from 'lucide-react';

export const UNIT = { id: 'U11', number: 11, name: 'Methods', worldId: 'methods' };

export const SKILLS = {
  'U11-S1': {
    unit: 'U11',
    name: 'Decompose with methods',
    description: 'Subdivide a program into methods that reflect the tasks the problem is decomposed into, such as upSteps, downSteps and bottomLine.',
    sections: ['11.1'],
  },
  'U11-S2': {
    unit: 'U11',
    name: 'Declare and call methods',
    description: 'Write static void methods with no parameters, call them from main and follow how control jumps to a method and returns to the line after the call.',
    sections: ['11.1'],
  },
  'U11-S3': {
    unit: 'U11',
    name: 'Local and class variables',
    description: 'Tell local variables from static class variables and fix the Gogga declaration so every method can see the object.',
    sections: ['11.1'],
  },
  'U11-S4': {
    unit: 'U11',
    name: 'Reuse methods',
    description: 'Abstract common code out of similar methods into one method that is called repeatedly, with the orientation code placed in main.',
    sections: ['11.2'],
  },
  'U11-S5': {
    unit: 'U11',
    name: 'Advantages of methods',
    description: 'Explain structured programming as divide and conquer and list the advantages of using methods.',
    sections: ['11.3'],
  },
  'U11-S6': {
    unit: 'U11',
    name: 'Methods in nested loops',
    description: 'Place the inner loop in a method and call it from the outer loop in main, as in ThickCross.',
    sections: ['11.4'],
  },
  'U11-S7': {
    unit: 'U11',
    name: 'Top down and bottom up',
    description: 'Distinguish the top down and bottom up approaches to building a solution with methods.',
    sections: ['11.5', '11.5.1', '11.5.2'],
  },
  'U11-S8': {
    unit: 'U11',
    name: 'Divers helper method',
    description: 'Trace and fix the Divers program: the oneDiver helper method, eliminating the highest and lowest scores, finding the winner and handling XXX as the first name.',
    sections: ['11.5', '11.5.1', '11.5.2'],
  },
  'U11-S9': {
    unit: 'U11',
    name: 'Solve problems with methods',
    description: 'Apply methods to the Exercise 1 problems: FourPyramids, ChemicalTest and AnimalsForAfrica.',
    sections: ['Check Point 1', 'Exercise 1'],
  },
};

export const SKILL_HINTS = {
  'U11-S1': 'Methods subdivide code into tasks; the Pyramid splits into upSteps, downSteps and bottomLine, each called from main',
  'U11-S2': 'Methods in this unit are static void name() with no parameters, in curly brackets; main is the first method run; after a call, execution returns to the line after the call',
  'U11-S3': 'A local variable exists only in its method; a class variable is declared in the class but outside any method and must be static to be used in static methods; declare static Gogga flea; and instantiate it in main after Gogga.setGridSize',
  'U11-S4': 'Abstract the common zigzag loop of upSteps and downSteps into one steps() method called twice; setPosition and turnRight stay in main to orient the flea',
  'U11-S5': 'Methods give a structured, divide and conquer approach (structured programming); they decompose tasks, help locate errors, aid readability and reduce repetition; a method should generally have three or more lines',
  'U11-S6': 'The inner loop goes in a method (oneCross) called from the outer loop in main, which sets the position and changes x and y for each cross',
  'U11-S7': 'Top down: consider the whole problem and decompose into smaller tasks (Divers main first, empty oneDiver); bottom up: code and test the small task first (oneDiver in Divers2), then combine',
  'U11-S8': 'oneDiver: input numJudges, first score sets hiScore, loScore and sum; loop 2 to numJudges; result = (sum - hiScore - loScore) / (numJudges - 2); main loops until XXX and keeps hiName and hiScore',
  'U11-S9': 'ChemicalTest: testOne method, efficiency = (initial - final) / time averaged over 5 tests and rounded to 3 decimals; AnimalsForAfrica: oneCar method, R50 per car + R20 per adult + R10 per child under 12',
};

export const WORLD = {
  id: UNIT.worldId,
  name: 'Method Goldmine',
  subtitle: 'Unit 11 \u00b7 Methods',
  color: 'gold',
  glow: 'ja-glow-gold',
  bg: 'ja-w-methods',
  icon: Workflow,
  blurb: 'Dig your program into neat static void methods, reuse them in loops and score a diving competition from the top down or the bottom up.',
};

export const LEVELS = [
  {
    id: 'u11-l1',
    name: 'Calling All Methods',
    subtitle: 'Decomposing the Pyramid, method calls, local and class variables',
    challengeIds: ['u11-c1', 'u11-c2', 'u11-c3', 'u11-c4', 'u11-c5', 'u11-c6'],
  },
  {
    id: 'u11-l2',
    name: 'Reuse and Repeat',
    subtitle: 'One steps() method, advantages of methods, methods in nested loops',
    challengeIds: ['u11-c7', 'u11-c8', 'u11-c9', 'u11-c10', 'u11-c11', 'u11-c12'],
  },
  {
    id: 'u11-l3',
    name: 'Diving Into Design',
    subtitle: 'Top down, bottom up, the oneDiver helper and your first method programs',
    hasCoding: true,
    challengeIds: ['u11-c13', 'u11-c14', 'u11-c15', 'u11-c16', 'u11-c17', 'u11-c18', 'u11-c19'],
  },
  {
    id: 'u11-l4',
    name: 'Boss: The Chemical Lab',
    subtitle: 'Mixed review of the whole unit plus the ChemicalTest program',
    hasCoding: true,
    challengeIds: ['u11-c20', 'u11-c21', 'u11-c22', 'u11-c23', 'u11-c24', 'u11-c25', 'u11-c26'],
  },
];

export const CHALLENGES = {
  'u11-c1': {
    type: 'mc',
    world: UNIT.worldId,
    prompt: 'Which method is the first to be run when a Java program is executed?',
    options: [
      'The first method typed below the class header',
      'The main method, declared as public static void main (String[] args)',
      'Every static void method in the class, one after the other',
      'The method with the most lines of code in it',
    ],
    answer: 1,
    hint: 'Every Java program already has this method, even before you add your own.',
    explanation: 'The main method is the first method run and the starting point of a program. Other methods only run when they are called.',
    skills: ['U11-S2'],
  },
  'u11-c2': {
    type: 'order',
    world: UNIT.worldId,
    prompt: 'Put the statements of the final PyramidWithMethods main method in the order they must run so the pyramid is drawn correctly.',
    items: ['downSteps();', 'flea = new Gogga ();', 'bottomLine();', 'Gogga.setGridSize(20,10);', 'upSteps();'],
    answer: [3, 1, 4, 0, 2],
    hint: 'The grid must be set up before any Gogga exists, and the tasks follow the shape: up, down, then the base.',
    explanation: 'The grid size cannot change after a Gogga is instantiated, so setGridSize comes before flea = new Gogga(). Then the three task methods are called in the order up steps, down steps, bottom line.',
    skills: ['U11-S1', 'U11-S3'],
  },
  'u11-c3': {
    type: 'tf',
    world: UNIT.worldId,
    prompt: 'When main reaches the statement upSteps(); the program moves to the upSteps method, executes it, and then returns to the line after the call in main.',
    answer: true,
    hint: 'Think about what happens to downSteps(); on the next line.',
    explanation: 'A method call transfers control to the method. When the method ends, execution continues with the statement after the call.',
    skills: ['U11-S2'],
  },
  'u11-c4': {
    type: 'match',
    world: UNIT.worldId,
    prompt: 'Match each term to its meaning.',
    pairs: [
      { left: 'Local variable', right: 'Declared in a method and only exists in that method' },
      { left: 'Class variable', right: 'Declared inside the class but not in any method; visible to all methods' },
      { left: 'main method', right: 'First method run when the program is executed; the starting point' },
      { left: 'Method call', right: 'A statement such as upSteps(); that runs a method and then returns' },
    ],
    answer: [0, 1, 2, 3],
    hint: 'Ask where each thing is declared or what it does when the program runs.',
    explanation: 'A local variable is local to its method, a class variable is visible to every method in the class, main is the starting point and a call runs a method then returns.',
    skills: ['U11-S2', 'U11-S3'],
  },
  'u11-c5': {
    type: 'error-spot',
    world: UNIT.worldId,
    prompt: 'This first version of PyramidWithMethods will not run. What is the problem?',
    code: `import it.*;
public class PyramidWithMethods
{
   public static void main (String[] args)
   {
      Gogga.setGridSize(20,10);
      Gogga flea = new Gogga ();
      upSteps();
      downSteps();
      bottomLine();
   }

   static void upSteps()
   {
      flea.setPosition (1, 9);
      for (int loop = 1; loop <=4; loop ++)
      {
         flea.move ();
         flea.turnRight ();
         flea.move ();
         flea.turnLeft ();
      }
   }
   // downSteps and bottomLine also use flea
}`,
    options: [
      'Run time error: the grid size cannot be changed after flea is created',
      'Logic error: the pyramid is drawn upside down',
      'Compiler error: flea cannot be found in upSteps because it is local to main',
      'Compiler error: upSteps must be declared above the main method',
    ],
    answer: 2,
    hint: 'Where is flea declared, and which method is trying to use it?',
    explanation: 'Any variable declared in a method is a local variable that only exists in that method. flea is local to main, so upSteps cannot see it and the compiler reports that flea cannot be found.',
    skills: ['U11-S3'],
  },
  'u11-c6': {
    type: 'error-spot',
    world: UNIT.worldId,
    prompt: 'The flea declaration was moved out of main. The program compiles. What happens when it runs?',
    code: `import it.*;
public class PyramidWithMethods
{
   static Gogga flea = new Gogga ();

   public static void main (String[] args)
   {
      Gogga.setGridSize(20,10);
      upSteps();
      downSteps();
      bottomLine();
   }
   // the three methods follow
}`,
    options: [
      'Compiler error: flea cannot be found in the upSteps method',
      'Compiler error: a class variable may not be declared as static',
      'No error: the pyramid is drawn on a 20 by 10 grid',
      'Run time error: the grid size cannot be changed after a Gogga object has been instantiated',
    ],
    answer: 3,
    hint: 'When is flea created compared with when setGridSize runs?',
    explanation: 'flea is instantiated with the class variable, before main calls setGridSize, so the Gogga class gives a run time error. The fix is to declare static Gogga flea; and write flea = new Gogga (); in main after setGridSize.',
    skills: ['U11-S3'],
  },
  'u11-c7': {
    type: 'code-read',
    world: UNIT.worldId,
    prompt: 'In PyramidWithMethods2 one steps() method draws both the up steps and the down steps. Why does the second call draw steps going down?',
    code: `flea.setPosition (1, 9);
steps();
flea.turnRight ();
steps();
bottomLine();

static void steps()
{
   for (int loop = 1; loop <=4; loop ++)
   {
      flea.move ();
      flea.turnRight ();
      flea.move ();
      flea.turnLeft ();
   }
}`,
    options: [
      'flea.turnRight() in main makes flea face right, so the same zigzag goes right then down',
      'steps() counts how many times it has been called and reverses on the second call',
      'The second call runs the for loop backwards from 4 down to 1',
      'bottomLine() runs before the second call and turns flea around',
    ],
    answer: 0,
    hint: 'Which direction is flea facing when each call starts?',
    explanation: 'The orientation code was moved into main. After the up steps flea faces up; turnRight makes it face right, so move, turnRight, move, turnLeft now steps down to the right.',
    skills: ['U11-S4'],
  },
  'u11-c8': {
    type: 'trace',
    world: UNIT.worldId,
    prompt: 'Trace PyramidWithMethods2. Row 0 is at the top of the grid, so moving up decreases y. flea starts at (1, 9) facing up. Fill in flea\'s position.',
    code: `Gogga.setGridSize(20,10);
flea = new Gogga ();
flea.setPosition (1, 9);
steps();
flea.turnRight ();
steps();
bottomLine();

static void steps()
{
   for (int loop = 1; loop <=4; loop ++)
   {
      flea.move ();
      flea.turnRight ();
      flea.move ();
      flea.turnLeft ();
   }
}

static void bottomLine()
{
   flea.turnRight ();
   flea.turnRight ();
   for (int loop = 1; loop <=8; loop ++)
   {
      flea.move ();
   }
}`,
    rows: [
      { label: 'x after the first steps()', answer: '5' },
      { label: 'y after the first steps()', answer: '5' },
      { label: 'x after the second steps()', answer: '9' },
      { label: 'y after the second steps()', answer: '9' },
      { label: 'x after bottomLine()', answer: '1' },
    ],
    hint: 'Each pass of the loop moves flea one block in each of two directions. Count four passes.',
    explanation: 'The first call climbs from (1, 9) to (5, 5). After turnRight the second call descends to (9, 9) facing right; bottomLine turns flea to face left and moves 8 blocks back to (1, 9), closing the pyramid.',
    skills: ['U11-S4', 'U11-S2'],
  },
  'u11-c9': {
    type: 'tf',
    world: UNIT.worldId,
    prompt: 'The textbook advises that a method should generally contain only one or two lines of code.',
    answer: false,
    hint: 'Think about the minimum size the textbook recommends.',
    explanation: 'The textbook states that a method should generally have three or more lines of code. Very short methods add calls without making the program clearer.',
    skills: ['U11-S5'],
  },
  'u11-c10': {
    type: 'mc',
    world: UNIT.worldId,
    prompt: 'Which of these is NOT one of the advantages of methods listed in the textbook?',
    options: [
      'Descriptive method names let you read main and understand the program',
      'Code that is often reused can be placed in a method to reduce repetition',
      'Coding with methods aids locating errors',
      'Methods make the program run much faster than code written in main',
    ],
    answer: 3,
    hint: 'The listed advantages are about decomposition, errors, readability and repetition.',
    explanation: 'The textbook lists decomposing a large program into tasks, locating errors, readability and reducing repetition. Speed is not given as an advantage.',
    skills: ['U11-S5'],
  },
  'u11-c11': {
    type: 'trace',
    world: UNIT.worldId,
    prompt: 'Trace the main method of ThickCross. Fill in the values of x and y.',
    code: `Gogga.setGridSize(12,16);
cross = new Gogga();
cross.setColor(Color.BLUE);
int x = 2, y = 2;
for(int numCrosses = 1; numCrosses <= 3; numCrosses++)
{
   cross.setTrailWidth(8);
   cross.setPosition(x, y);
   oneCross();
   x = x + 2;
   y = y + 4;
}`,
    rows: [
      { label: 'x when oneCross() is called the 2nd time', answer: '4' },
      { label: 'y when oneCross() is called the 3rd time', answer: '10' },
      { label: 'x after the for loop ends', answer: '8' },
      { label: 'y after the for loop ends', answer: '14' },
    ],
    hint: 'x and y change after each cross is drawn, including after the last one.',
    explanation: 'The crosses start at (2, 2), (4, 6) and (6, 10). After the third cross x and y are updated once more, giving 8 and 14.',
    skills: ['U11-S6'],
  },
  'u11-c12': {
    type: 'mc',
    world: UNIT.worldId,
    prompt: 'How does ThickCross use a method to make its nested loops clearer?',
    options: [
      'main draws each cross and oneCross positions the three crosses',
      'oneCross contains both loops and main calls it only once',
      'main has the outer loop that positions three crosses; oneCross has the loop that draws one cross',
      'There are four methods, one for each arm of the cross',
    ],
    answer: 2,
    hint: 'The textbook says the inner loop can be placed in a method.',
    explanation: 'The inner loop is placed in oneCross and called from the outer loop in main. main deals with positioning the three crosses and repeatedly calls oneCross.',
    skills: ['U11-S6'],
  },
  'u11-c13': {
    type: 'match',
    world: UNIT.worldId,
    prompt: 'Match each term from this unit to its description.',
    pairs: [
      { left: 'Top down', right: 'Consider the whole problem, then decompose it into smaller and smaller tasks' },
      { left: 'Bottom up', right: 'Start with the smaller tasks, which are combined to solve the problem' },
      { left: 'Helper method', right: 'A method such as oneDiver that helps other methods solve the problem' },
      { left: 'Structured programming', right: 'Divide and conquer problem solving with methods, used before OOP' },
    ],
    answer: [0, 1, 2, 3],
    hint: 'Two of these are about which part of the solution you build first.',
    explanation: 'Top down starts from the whole problem and bottom up from the small tasks. oneDiver is called a helper method, and structured programming was the divide and conquer methodology before object-oriented programming.',
    skills: ['U11-S7', 'U11-S5', 'U11-S8'],
  },
  'u11-c14': {
    type: 'order',
    world: UNIT.worldId,
    prompt: 'Put the steps of the top down algorithm for the Divers main method in the correct order.',
    items: [
      'Set hiScore to score',
      'Input the name of the first entrant',
      'Display hiName and hiScore as the winner',
      'Call oneDiver() to calculate and display the first diver\'s score',
      'Input the next name and loop while it is not XXX: call oneDiver() and update hiName and hiScore if score is higher',
      'Set hiName to name',
    ],
    answer: [1, 5, 3, 0, 4, 2],
    hint: 'The first diver is used to initialise the highest name and score before the loop.',
    explanation: 'The first entrant\'s name and score initialise hiName and hiScore before the while loop. The loop processes the remaining divers until XXX, and the winner is displayed after it.',
    skills: ['U11-S7', 'U11-S8'],
  },
  'u11-c15': {
    type: 'trace',
    world: UNIT.worldId,
    prompt: 'oneDiver runs with these inputs: number of judges 5, scores 4, 5, 6, 2, 3. Type doubles the way Java prints them, for example 7.0.',
    code: `int numJudges = Integer.parseInt
   (JOptionPane.showInputDialog("Enter the number of judges"));
score = Integer.parseInt
   (JOptionPane.showInputDialog("Enter the first score"));
double hiScore = score;
double loScore = score;
double sum = score;
for (int loop = 2; loop <= numJudges; loop++)
{
   score = Integer.parseInt
      (JOptionPane.showInputDialog("Enter the next score"));
   if (score > hiScore)
      hiScore = score;
   else if (score < loScore)
      loScore = score;
   sum = sum + score;
}
score = (sum - hiScore - loScore) / (numJudges - 2);`,
    rows: [
      { label: 'hiScore after the loop', answer: '6.0' },
      { label: 'loScore after the loop', answer: '2.0' },
      { label: 'sum after the loop', answer: '20.0' },
      { label: 'Final value of score', answer: '4.0' },
    ],
    hint: 'The first score sets hiScore, loScore and sum before the loop starts at 2.',
    explanation: 'The highest is 6 and the lowest is 2, and the sum of all five scores is 20. The result is (20 - 6 - 2) / (5 - 2) = 12 / 3 = 4.0.',
    skills: ['U11-S8'],
  },
  'u11-c16': {
    type: 'error-spot',
    world: UNIT.worldId,
    prompt: 'In the textbook\'s oneDiver method a judge types 4.5 for the first score. What happens?',
    code: `static double score;
...
score = Integer.parseInt
   (JOptionPane.showInputDialog("Enter the first score"));`,
    options: [
      'score is stored as 4 because parseInt drops the decimal part',
      'A NumberFormatException run time error occurs; Double.parseDouble should be used',
      'A syntax error, because parseInt returns an int but score is a double',
      'score is stored as 4.5 because score is declared as a double',
    ],
    answer: 1,
    hint: 'Look at the method used to convert the String, not at the variable type.',
    explanation: 'Integer.parseInt cannot convert "4.5", so the program halts with a NumberFormatException. The scores are real numbers, so Double.parseDouble is needed; assigning an int to a double is not itself an error.',
    skills: ['U11-S8'],
  },
  'u11-c17': {
    type: 'code-read',
    world: UNIT.worldId,
    prompt: 'The first if statement has been added to Divers but the final output has not been changed yet. The user types XXX as the first name. What is displayed?',
    code: `static String name, hiName;
static double score;
static double hiScore;
...
name = JOptionPane.showInputDialog
   ("Enter the name of the first entrant");
if (!name.equalsIgnoreCase("XXX"))
{
   hiName = name;
   oneDiver();
   hiScore = score;
   name = JOptionPane.showInputDialog
      ("Enter the name of the next entrant");
}
while (!name.equalsIgnoreCase("XXX"))
{
   // process the next diver
}
System.out.println
   ("The winner is " + hiName + " with a score of " + hiScore);`,
    options: [
      'Nothing; the program keeps asking for the number of judges',
      'The winner is null with a score of 0.0',
      'The winner is XXX with a score of 0.0',
      'Program terminated',
    ],
    answer: 1,
    hint: 'hiName and hiScore are never assigned. What do static String and double class variables hold by default?',
    explanation: 'The if and the while are both skipped, so hiName still holds null and hiScore holds 0.0. The textbook fixes this with an if ... else that displays "Program terminated" when the first name is XXX.',
    skills: ['U11-S8'],
  },
  'u11-c18': {
    type: 'code-write',
    world: UNIT.worldId,
    prompt: 'Code a program DiagSquares that draws three squares in a diagonal line, using a method oneSquare() that draws one square and an outer loop in main that calls it.',
    criteria: [
      'Class DiagSquares with import it.*; at the top.',
      'A class variable declared inside the class but outside any method as static Gogga bug; (not instantiated in the declaration).',
      'main first calls Gogga.setGridSize(18, 18); and only then instantiates bug = new Gogga ();.',
      'main declares int x = 5, y = 5; and uses a for loop that runs exactly 3 times. Each pass calls bug.setPosition(x, y);, then oneSquare();, then adds 6 to both x and y.',
      'A method declared as static void oneSquare() with no parameters, which uses a for loop for the 4 sides, containing a for loop that calls bug.move() 5 times, followed by bug.turnLeft(); after each side.',
      'oneSquare is called only from the loop in main; no square-drawing code is repeated in main.',
      'No parameters or return values are used in your own methods.',
    ].join(' '),
    starter: `import it.*;

public class DiagSquares
{
   public static void main (String[] args)
   {
      // your code here
   }
}`,
    explanation: 'This follows the ThickCross pattern: the inner loops that draw one square are placed in oneSquare and the outer loop in main positions each square. bug must be a static class variable so oneSquare can see it, and it is instantiated after setGridSize.',
    skills: ['U11-S6', 'U11-S2', 'U11-S3'],
  },
  'u11-c19': {
    type: 'code-write',
    world: UNIT.worldId,
    prompt: 'Animals for Africa charges R50 per car plus R20 per adult and R10 per child under twelve. Code AnimalsForAfrica so that a method oneCar() handles ONE carload and main calls it for exactly ten cars.',
    criteria: [
      'Class AnimalsForAfrica with import javax.swing.*;.',
      'A method declared as static void oneCar() with no parameters.',
      'oneCar inputs the number of adults and the number of children under twelve with JOptionPane.showInputDialog and Integer.parseInt.',
      'oneCar calculates total = 50 + 20 * adults + 10 * children.',
      'oneCar displays a ticket with System.out.println showing the name Animals for Africa Game Reserve, the car charge R50, the number of adults, the number of children under twelve and the total cost.',
      'With 2 adults and 3 children the total displayed is R120.',
      'main uses a for loop that calls oneCar() exactly 10 times; main contains no input or fee calculations itself.',
    ].join(' '),
    starter: `import javax.swing.*;

public class AnimalsForAfrica
{
   public static void main (String[] args)
   {
      // your code here
   }
}`,
    explanation: 'One carload is a separate task, so it goes in its own method and main simply repeats the call ten times. Variables only needed inside oneCar can stay local to oneCar.',
    skills: ['U11-S9', 'U11-S1'],
  },
  'u11-c20': {
    type: 'tf',
    world: UNIT.worldId,
    prompt: 'In the bottom up approach used for Divers2, the while loop for all the entrants in main is coded first and the oneDiver method is written last.',
    answer: false,
    hint: 'Bottom up starts with the smaller task.',
    explanation: 'Bottom up starts with one diver: oneDiver is coded and tested for a single entrant first. Only then is the main method developed for all the entrants.',
    skills: ['U11-S7'],
  },
  'u11-c21': {
    type: 'mc',
    world: UNIT.worldId,
    prompt: 'In Divers, why are name, hiName, score and hiScore declared as static at the start of the class?',
    options: [
      'They are used in static methods, and any variable used in a static method must also be static',
      'static makes them constants, so their values cannot change while the program runs',
      'static makes them local to main, so oneDiver cannot accidentally change them',
      'static is only needed because they store Gogga objects',
    ],
    answer: 0,
    hint: 'How are main and oneDiver declared?',
    explanation: 'The variables are declared at the start of the class so they are accessible in oneDiver. Because main and oneDiver are static methods, the class variables must be declared static as well.',
    skills: ['U11-S3'],
  },
  'u11-c22': {
    type: 'error-spot',
    world: UNIT.worldId,
    prompt: 'This PyramidWithMethods2 compiles and runs, but the shape is not finished. What is wrong?',
    code: `public static void main (String[] args)
{
   Gogga.setGridSize(20,10);
   flea = new Gogga ();
   flea.setPosition (1, 9);
   steps();
   flea.turnRight ();
   steps();
}

static void steps()
{
   // zigzag loop
}

static void bottomLine()
{
   flea.turnRight ();
   flea.turnRight ();
   for (int loop = 1; loop <=8; loop ++)
   {
      flea.move ();
   }
}`,
    options: [
      'Compiler error: bottomLine is declared but never used',
      'Run time error: flea walks off the edge of the grid',
      'Logic error: bottomLine() is never called, so the base line is not drawn',
      'No error: Java runs every method in the class after main ends',
    ],
    answer: 2,
    hint: 'A method only runs when it is called.',
    explanation: 'Declaring a method does not run it. main never calls bottomLine(), so the program runs without errors but the base of the pyramid is missing.',
    skills: ['U11-S2', 'U11-S1'],
  },
  'u11-c23': {
    type: 'trace',
    world: UNIT.worldId,
    prompt: 'Trace the program. total is a class variable shared by all the methods.',
    code: `public class Counter
{
   static int total;

   public static void main (String[] args)
   {
      total = 2;
      addFive();
      timesTwo();
      addFive();
      System.out.println("Total: " + total);
   }

   static void addFive()
   {
      total = total + 5;
      System.out.println("Added 5");
   }

   static void timesTwo()
   {
      total = total * 2;
      System.out.println("Doubled");
   }
}`,
    rows: [
      { label: 'total after the first addFive()', answer: '7' },
      { label: 'total after timesTwo()', answer: '14' },
      { label: 'Value of total printed on the last line', answer: '19' },
      { label: 'Number of lines of output', answer: '4' },
    ],
    hint: 'Follow each call in main in order; every method prints one line.',
    explanation: 'total goes 2, 7, 14, 19 as the methods are called in order. The output is Added 5, Doubled, Added 5 and Total: 19, which is four lines.',
    skills: ['U11-S2', 'U11-S3'],
  },
  'u11-c24': {
    type: 'code-read',
    world: UNIT.worldId,
    prompt: 'A learner tries to build the ChemicalTest abbreviated name (first letter + last letter + random number). What does this print?',
    code: `String hiName = "cyanide";
int num = 5;
System.out.println(hiName.charAt(0)
   + hiName.charAt(hiName.length() - 1) + num);`,
    options: ['205', 'ce5', 'c5', 'cyanide5'],
    answer: 0,
    hint: 'There is no String in the expression until it is printed. What happens when two chars are added?',
    explanation: 'Adding chars uses their Unicode values: \'c\' is 99 and \'e\' is 101, so 99 + 101 + 5 = 205. Starting with "" + makes it concatenate to ce5, as required in the exercise.',
    skills: ['U11-S9'],
  },
  'u11-c25': {
    type: 'tf',
    world: UNIT.worldId,
    prompt: 'numChem is a static class variable. If testOne adds 1 to numChem when the same chemical is entered twice, the loop below calls testOne one extra time, so the correct number of chemicals is still tested.',
    code: `for (int loop = 1; loop <= numChem; loop++)
{
   testOne();
}`,
    answer: true,
    hint: 'When is the condition loop <= numChem checked?',
    explanation: 'The for loop condition is checked before every pass, and testOne can change numChem because it is a class variable. Increasing it by 1 adds one more pass to replace the rejected duplicate.',
    skills: ['U11-S9', 'U11-S3'],
  },
  'u11-c26': {
    type: 'code-write',
    world: UNIT.worldId,
    prompt: 'Hi-Jean International tests chemicals that kill germs. Code ChemicalTest with a method testOne() that tests one chemical 5 times, and a main method that tests numChem chemicals and reports the least and most efficient ones.',
    criteria: [
      'Class ChemicalTest with import javax.swing.*;.',
      'Static class variables (declared outside any method) for at least the chemical name and its average efficiency, so main can read them after each call to testOne.',
      'A method declared as static void testOne() with no parameters. It inputs the chemical name, then uses a for loop that runs exactly 5 times, each time inputting the initial number of germs, the final number of germs and the time taken as whole numbers with Integer.parseInt.',
      'Each test\'s efficiency is a real number: (initial - final) / time, calculated without integer division (use double variables or a (double) cast).',
      'testOne calculates the average of the 5 efficiencies, rounds it to 3 decimal places (for example Math.round(average * 1000) / 1000.0) and displays: Chemical cyanide has an efficiency rating of 5.234. (with the actual name and value).',
      'main inputs numChem with the prompt asking how many chemicals to test, and uses a for loop to call testOne() numChem times.',
      'After each call main compares the average with the lowest and highest so far, using the first chemical to initialise both, and stores the name and rating of each.',
      'main finally displays: The least efficient chemical is propane with a rating of 1.345. and The most efficient chemical is cyanide with a rating of 5.234. (with the actual names and values).',
      'No parameters or return values are used in your own methods.',
    ].join(' '),
    starter: `import javax.swing.*;

public class ChemicalTest
{
   // class variables here

   public static void main (String[] args)
   {
      // your code here
   }

   static void testOne()
   {
      // your code here
   }
}`,
    explanation: 'This mirrors the Divers program: testOne is the helper method for one chemical, and static class variables pass its result back so main can track the highest and lowest. Real division and rounding with Math.round give the 3 decimal rating.',
    skills: ['U11-S9', 'U11-S8', 'U11-S3'],
  },
};

export const THEORY = {
  unitId: UNIT.id,
  title: UNIT.name,
  purpose: 'Use static void methods to decompose a problem into tasks, reuse code, clarify nested loops and build solutions top down or bottom up.',
  outcomes: [
    'By the end you can decompose a problem into tasks and code each task as a static void method called from main.',
    'By the end you can follow the flow of control when a method is called and returns.',
    'By the end you can explain the difference between local variables and static class variables and fix the Gogga declaration error.',
    'By the end you can abstract repeated code into one method that is called more than once.',
    'By the end you can list the advantages of methods and explain structured programming.',
    'By the end you can place the inner loop of a nested loop in a method called from the outer loop.',
    'By the end you can distinguish top down and bottom up approaches and trace the Divers program.',
    'By the end you can code programs such as ChemicalTest and AnimalsForAfrica using methods.',
  ],
  topics: [
    {
      id: 'U11-T1',
      title: 'Decomposing a problem with methods',
      sections: ['11.1'],
      skills: ['U11-S1', 'U11-S2'],
      explanation: [
        'Methods can be used to subdivide code into sections or tasks. We use them to reflect the tasks into which the problem is decomposed.',
        'The earlier Pyramid problem decomposes into three tasks: draw up steps, draw down steps and draw the horizontal line. Without methods, the tasks can only be separated with comments and blank lines in main.',
        'Every Java program already has a main method with the header public static void main (String[] args). It is the first method run when the program is executed and is the starting point of the program.',
        'In PyramidWithMethods, main sets the grid size, instantiates the flea object and then calls three methods: upSteps(); downSteps(); bottomLine();.',
        'Each method is enclosed in curly brackets and is defined as static and void, for example static void upSteps(). The reasons for static and void are explained in Grade 11, and the methods in this unit have empty brackets.',
        'When main calls upSteps, the program moves to the upSteps method. The method executes and then returns to the line after the call.',
      ],
      vocabulary: [
        { term: 'Method', definition: 'A named section of code that performs one task; in this unit declared as static void name().' },
        { term: 'main method', definition: 'The method declared as public static void main (String[] args); the first method run and the starting point of a program.' },
        { term: 'Method call', definition: 'A statement such as upSteps(); that runs the method and then returns to the line after the call.' },
        { term: 'Decompose', definition: 'Divide a problem into smaller, more manageable tasks.' },
      ],
      workedExamples: [
        {
          code: `public static void main (String[] args)
{
   Gogga.setGridSize(20,10);
   flea = new Gogga ();
   upSteps();
   downSteps();
   bottomLine();
}

static void upSteps()
{
   flea.setPosition (1, 9);
   for (int loop = 1; loop <=4; loop ++)
   {
      flea.move ();
      flea.turnRight ();
      flea.move ();
      flea.turnLeft ();
   }
}`,
          explanation: 'main reads like a summary of the three tasks. Each call jumps to the method, runs it and returns to the next line in main.',
        },
      ],
      misconceptions: [
        'Methods run in the order they are typed in the class. Wrong: only main runs automatically; other methods run when, and as often as, they are called.',
        'A method must be written above main to be called. Wrong: in the textbook programs the methods are written after main and are still called from it.',
      ],
      questions: [
        {
          id: 'U11-T1-Q1',
          type: 'mc',
          category: 'define',
          prompt: 'What is the starting point of every Java program?',
          options: [
            'The class header public class Pyramid',
            'The import it.*; statement',
            'The first static void method in the class',
            'The main method',
          ],
          answer: 3,
          hint: 'It has the header public static void main (String[] args).',
          explanation: 'The main method is the first method run when the program is executed, so it is the starting point.',
          skills: ['U11-S2'],
        },
        {
          id: 'U11-T1-Q2',
          type: 'tf',
          category: 'explain',
          prompt: 'A method declared as static void bottomLine() runs automatically when the program starts, even if main never calls it.',
          answer: false,
          hint: 'How did upSteps get to run in PyramidWithMethods?',
          explanation: 'Only main runs automatically. Any other method only runs when it is called.',
          skills: ['U11-S2'],
        },
        {
          id: 'U11-T1-Q3',
          type: 'trace',
          category: 'predict',
          prompt: 'Write the output line by line. Type each word exactly as printed.',
          code: `public static void main (String[] args)
{
   System.out.println("Start");
   greet();
   System.out.println("End");
}

static void greet()
{
   System.out.println("Hello");
   System.out.println("Learner");
   System.out.println("Welcome");
}`,
          rows: [
            { label: 'Line 1 of output', answer: 'Start' },
            { label: 'Line 2 of output', answer: 'Hello' },
            { label: 'Line 4 of output', answer: 'Welcome' },
            { label: 'Line 5 of output', answer: 'End' },
          ],
          hint: 'The whole method runs before control returns to main.',
          explanation: 'main prints Start, then greet() prints its three lines, and then control returns to main, which prints End.',
          skills: ['U11-S2', 'U11-S1'],
        },
      ],
    },
    {
      id: 'U11-T2',
      title: 'Local and class variables',
      sections: ['11.1'],
      skills: ['U11-S3'],
      explanation: [
        'When flea is declared in main, running PyramidWithMethods gives a compiler error stating that flea cannot be found in the line flea.setPosition (1, 9);.',
        'Any variable declared in a method only exists in that method and is termed a local variable. flea only exists locally in main and cannot be seen in upSteps.',
        'Moving the declaration inside the class but not inside any method makes it a class variable. A class variable is the opposite of a local variable: it is visible to all methods in the class.',
        'The declaration must include the word static, because any variable that is used in a static method MUST also be declared as static.',
        'Writing static Gogga flea = new Gogga (); before main gives a run time error, because the Gogga grid size cannot be changed after a Gogga object has been instantiated.',
        'The fix is to split it into two statements: static Gogga flea; as the class variable, and flea = new Gogga (); in main after Gogga.setGridSize(20,10);.',
      ],
      vocabulary: [
        { term: 'Local variable', definition: 'A variable declared in a method; it only exists in the method in which it is declared.' },
        { term: 'Class variable', definition: 'A variable declared inside the class but not in any method; it is visible to all methods in the class.' },
        { term: 'static', definition: 'Required on class variables used in static methods: any variable used in a static method must also be declared as static.' },
      ],
      workedExamples: [
        {
          code: `public class PyramidWithMethods
{
   static Gogga flea;

   public static void main (String[] args)
   {
      Gogga.setGridSize(20,10);
      flea = new Gogga ();
      upSteps();
      downSteps();
      bottomLine();
   }
}`,
          explanation: 'flea is declared as a static class variable so every method can see it, but it is only instantiated after the grid size has been set.',
        },
      ],
      misconceptions: [
        'A variable declared in main can be used by every method in the class. Wrong: it is local to main, so other methods get a "cannot find" compiler error.',
        'Declaring and instantiating the class variable in one line is always fine. Wrong: for a Gogga it causes a run time error because the grid size can no longer be changed.',
      ],
      questions: [
        {
          id: 'U11-T2-Q1',
          type: 'mc',
          category: 'define',
          prompt: 'What is a local variable?',
          options: [
            'A variable declared in a method that only exists in that method',
            'A variable declared inside the class but outside every method',
            'A variable that must always be declared as static',
            'A variable that every method in the class can see',
          ],
          answer: 0,
          hint: 'It is local to something.',
          explanation: 'A local variable is declared in a method and is local to that method. The other options describe a class variable.',
          skills: ['U11-S3'],
        },
        {
          id: 'U11-T2-Q2',
          type: 'tf',
          category: 'predict',
          prompt: 'The program runs correctly if flea is declared as static Gogga flea = new Gogga (); before main, and main starts with Gogga.setGridSize(20,10);.',
          answer: false,
          hint: 'Which happens first: creating flea or setting the grid size?',
          explanation: 'flea is instantiated before main runs, so setGridSize causes a run time error. The declaration must be split and flea created after setGridSize.',
          skills: ['U11-S3'],
        },
        {
          id: 'U11-T2-Q3',
          type: 'mc',
          category: 'explain',
          prompt: 'Why are class variables necessary when a program uses methods?',
          options: [
            'They make the program compile faster',
            'They let several methods see and use the same variable',
            'They are the only variables that can store numbers',
            'They stop main from changing the variable',
          ],
          answer: 1,
          hint: 'Remember why upSteps could not find flea.',
          explanation: 'A class variable is visible to all methods in the class, so main and the task methods can share the same Gogga object or score.',
          skills: ['U11-S3'],
        },
      ],
    },
    {
      id: 'U11-T3',
      title: 'Optimising the problem to reuse methods',
      sections: ['11.2'],
      skills: ['U11-S4'],
      explanation: [
        'Programs often contain code that is repeated. Loops are usually used to duplicate code, but methods can also group similar statements that can be called repeatedly.',
        'upSteps and downSteps both draw a series of zigzag lines with the same for loop: move, turnRight, move, turnLeft, four times.',
        'Instead of two similar methods, create a single method called steps and place the code to orient the flea in main: setPosition (1, 9) before the first call and turnRight () before the second.',
        'The common code is abstracted out to a separate method that can be repeatedly called. This eliminates the two similar methods that were each only called once.',
        'PyramidWithMethods2 therefore has main, steps (called twice) and bottomLine.',
      ],
      vocabulary: [
        { term: 'Abstract out', definition: 'Move the common code of similar sections into one separate method that can be called repeatedly.' },
        { term: 'Orient', definition: 'Set the position or direction of the Gogga before a method draws, for example flea.turnRight ();.' },
      ],
      workedExamples: [
        {
          code: `flea.setPosition (1, 9);
steps();
flea.turnRight ();
steps();
bottomLine();`,
          explanation: 'The same steps method draws the up steps when flea faces up and the down steps after turnRight makes flea face right.',
        },
      ],
      misconceptions: [
        'Two tasks that look different on screen always need two different methods. Wrong: upSteps and downSteps had identical loops; only the starting direction differed.',
        'A method can only be called once. Wrong: steps() is called twice from main.',
      ],
      questions: [
        {
          id: 'U11-T3-Q1',
          type: 'mc',
          category: 'identify',
          prompt: 'When upSteps and downSteps were replaced by one steps method, which statements were moved into main?',
          options: [
            'The four move statements of the zigzag',
            'The for loop header for (int loop = 1; loop <=4; loop ++)',
            'Gogga.setGridSize(20,10); and the two turnRight statements of bottomLine',
            'flea.setPosition (1, 9); and flea.turnRight ();',
          ],
          answer: 3,
          hint: 'These statements were the only parts of upSteps and downSteps that were different.',
          explanation: 'The orientation code, setPosition in upSteps and turnRight in downSteps, was moved to main so the remaining identical loop could become steps().',
          skills: ['U11-S4'],
        },
        {
          id: 'U11-T3-Q2',
          type: 'tf',
          category: 'explain',
          prompt: 'After optimising, PyramidWithMethods2 still has separate upSteps and downSteps methods, each called once.',
          answer: false,
          hint: 'What did the optimisation eliminate?',
          explanation: 'The two similar methods were eliminated and replaced by a single steps method that main calls twice.',
          skills: ['U11-S4'],
        },
        {
          id: 'U11-T3-Q3',
          type: 'trace',
          category: 'calculate',
          prompt: 'In PyramidWithMethods2, steps() loops 4 times with two move() calls per pass, and bottomLine() moves 8 times. Count the move() calls.',
          code: `steps();       // called twice in main
bottomLine();  // called once in main`,
          rows: [
            { label: 'move() calls in one call of steps()', answer: '8' },
            { label: 'Total move() calls in the whole program', answer: '24' },
          ],
          hint: 'Multiply by the number of passes and the number of calls.',
          explanation: 'One steps() call does 4 x 2 = 8 moves. Two calls give 16, plus 8 for bottomLine, which is 24.',
          skills: ['U11-S4'],
        },
      ],
    },
    {
      id: 'U11-T4',
      title: 'Advantages of methods',
      sections: ['11.3'],
      skills: ['U11-S5'],
      explanation: [
        'Methods provide a structured approach to solving problems. It can be considered a divide and conquer strategy.',
        'Before object-oriented programming, this was a significant methodology for problem solving, defined by the term structured programming. Object-oriented programming was an improvement on structured programming and is explored in Grade 11.',
        'Methods are useful to decompose a large program into defined separate tasks. We can zoom into each method and focus on the code for each task.',
        'Coding with methods aids locating errors.',
        'If you use descriptive method names, a programmer can look at the main method and have a general understanding of the program, aiding readability.',
        'Code that is often reused can be placed in a method to reduce repetition of code. Generally, a method should have three or more lines of code.',
      ],
      vocabulary: [
        { term: 'Structured programming', definition: 'A divide and conquer methodology of problem solving with methods, significant before object-oriented programming.' },
        { term: 'Divide and conquer', definition: 'Solving a problem by splitting it into separate tasks and solving each one.' },
      ],
      workedExamples: [],
      misconceptions: [
        'Methods are only useful for code that is repeated. Wrong: they also decompose a large program into tasks, aid locating errors and make main readable.',
        'Structured programming replaced object-oriented programming. Wrong: object-oriented programming was the improvement on structured programming.',
      ],
      questions: [
        {
          id: 'U11-T4-Q1',
          type: 'mc',
          category: 'identify',
          prompt: 'Which term describes the divide and conquer methodology of solving problems with methods that was significant before object-oriented programming?',
          options: ['Bottom up design', 'Abstraction', 'Structured programming', 'Pattern recognition'],
          answer: 2,
          hint: 'Methods give a structured approach.',
          explanation: 'The textbook defines this methodology as structured programming. Object-oriented programming later improved on it.',
          skills: ['U11-S5'],
        },
        {
          id: 'U11-T4-Q2',
          type: 'tf',
          category: 'explain',
          prompt: 'According to the textbook, object-oriented programming was an improvement on structured programming.',
          answer: true,
          hint: 'Which one came first?',
          explanation: 'Structured programming came first; object-oriented programming improved on it and is explored in Grade 11.',
          skills: ['U11-S5'],
        },
        {
          id: 'U11-T4-Q3',
          type: 'mc',
          category: 'apply',
          prompt: 'A new programmer reads only the main method of PyramidWithMethods (upSteps(); downSteps(); bottomLine();) and immediately understands what the program draws. Which advantage of methods is this?',
          options: [
            'Reducing repetition of code',
            'Readability from descriptive method names',
            'Locating errors more easily',
            'Making the program run faster',
          ],
          answer: 1,
          hint: 'The names describe the tasks.',
          explanation: 'Descriptive method names let a programmer look at main and get a general understanding of the program, which aids readability.',
          skills: ['U11-S5'],
        },
      ],
    },
    {
      id: 'U11-T5',
      title: 'Methods in nested loops',
      sections: ['11.4'],
      skills: ['U11-S6'],
      explanation: [
        'Methods can provide clarity in programs with nested loops. The inner loop can be placed in a method and called from the outer loop.',
        'ThickCross (from Exercise 3 of Learning Unit 10) draws three crosses in a diagonal line. main sets the grid size to 12 by 16, instantiates the static class variable cross and sets its colour to Color.BLUE.',
        'main deals with positioning: x and y start at 2, and a for loop runs 3 times, setting the trail width to 8, calling setPosition(x, y) and oneCross(), then adding 2 to x and 4 to y.',
        'The method oneCross draws a single cross with a loop that runs 4 times: move twice, turnRight, move twice, turnRight, move twice, turnLeft.',
        'Each pass makes two right turns and one left turn, a net quarter turn right, so after 4 passes the Gogga is back where it started, facing the same way. Every cross therefore starts the same way.',
      ],
      vocabulary: [
        { term: 'Outer loop', definition: 'The loop in main that repeats the whole task, here positioning and calling oneCross three times.' },
        { term: 'Inner loop', definition: 'The loop placed in the method, here drawing a single cross.' },
      ],
      workedExamples: [
        {
          code: `static void oneCross()
{
   for(int i = 1; i <= 4; i++)
   {
      cross.move();
      cross.move();
      cross.turnRight();
      cross.move();
      cross.move();
      cross.turnRight();
      cross.move();
      cross.move();
      cross.turnLeft();
   }
}//end oneCross method`,
          explanation: 'The inner loop lives in its own method, so main only shows the outer loop and reads clearly.',
        },
      ],
      misconceptions: [
        'Putting the inner loop in a method changes what the program draws. Wrong: the output is the same; the method only makes the nested loop clearer.',
        'A method containing a loop cannot be called from inside another loop. Wrong: oneCross is called from the outer for loop in main.',
      ],
      questions: [
        {
          id: 'U11-T5-Q1',
          type: 'trace',
          category: 'calculate',
          prompt: 'Count the moves in ThickCross: oneCross loops 4 times with 6 move() calls per pass, and main calls oneCross 3 times.',
          code: `for(int numCrosses = 1; numCrosses <= 3; numCrosses++)
{
   cross.setTrailWidth(8);
   cross.setPosition(x, y);
   oneCross();
   x = x + 2;
   y = y + 4;
}`,
          rows: [
            { label: 'move() calls in one call of oneCross()', answer: '24' },
            { label: 'move() calls in the whole program', answer: '72' },
          ],
          hint: 'Multiply passes by moves per pass, then by the number of calls.',
          explanation: 'One cross needs 4 x 6 = 24 moves, and three crosses need 3 x 24 = 72 moves.',
          skills: ['U11-S6'],
        },
        {
          id: 'U11-T5-Q2',
          type: 'mc',
          category: 'explain',
          prompt: 'According to the textbook, how do methods provide clarity in programs with nested loops?',
          options: [
            'The inner loop is placed in a method and called from the outer loop',
            'The outer loop is placed in a method and called from the inner loop',
            'Both loops are replaced by a single while loop inside the method',
            'Each statement of the inner loop gets its own method',
          ],
          answer: 0,
          hint: 'Look at where the loop that draws one cross ended up.',
          explanation: 'The inner loop goes into a method such as oneCross, and the outer loop in main calls it repeatedly.',
          skills: ['U11-S6'],
        },
        {
          id: 'U11-T5-Q3',
          type: 'tf',
          category: 'predict',
          prompt: 'Each call to oneCross() leaves the Gogga at the same position and facing the same direction as when the call started.',
          answer: true,
          hint: 'Add up the turns: two rights and one left per pass, four passes.',
          explanation: 'Each pass is a net quarter turn right, so four passes make a full turn, and the cross outline ends where it began. That is why main can simply set the next position.',
          skills: ['U11-S6'],
        },
      ],
    },
    {
      id: 'U11-T6',
      title: 'Computational thinking: top down and bottom up',
      sections: ['11.5', '11.5.1', '11.5.2'],
      skills: ['U11-S7'],
      explanation: [
        'The diving competition problem: an unknown number of entrants (terminated by XXX), each with between three and seven judges. The number of judges is entered before the scores, each score is between 0 and 6, and the highest and lowest scores are eliminated to avoid bias. The result is the average of the remaining scores.',
        'The problem can be tackled top down or bottom up. Top down considers the whole problem and then decomposes it into smaller and smaller, more manageable tasks. Bottom up starts with the smaller tasks, which are combined to solve the problem.',
        'Top down (Divers): the algorithm for many entrants is coded first in main, with a while loop until XXX and the first diver used to initialise hiName and hiScore. The code for one diver is left in an empty oneDiver method to be completed later.',
        'Bottom up (Divers2): we start by considering what needs to be done for one diver, developing and coding the oneDiver method first. main only inputs one name and calls oneDiver, so it can be tested for a single entrant.',
        'Then the algorithm for main is developed for all the entrants. Both approaches end with the same code as Divers.',
      ],
      vocabulary: [
        { term: 'Top down', definition: 'Consider the whole problem and then decompose it into smaller and smaller, more manageable tasks.' },
        { term: 'Bottom up', definition: 'Start with the smaller tasks, which are combined to solve the problem.' },
      ],
      workedExamples: [
        {
          code: `public static void main (String [] args)
{
   name = JOptionPane.showInputDialog
   ("Enter the name of the first entrant");
   oneDiver();
}`,
          explanation: 'The bottom up Divers2 main only tests oneDiver for a single entrant. The full loop for all entrants is added afterwards.',
        },
      ],
      misconceptions: [
        'Top down and bottom up produce different final programs. Wrong: both approaches lead to the same Divers code; only the order of development differs.',
        'An empty method is a syntax error. Wrong: Divers compiles with an empty oneDiver method that is completed later.',
      ],
      questions: [
        {
          id: 'U11-T6-Q1',
          type: 'mc',
          category: 'distinguish',
          prompt: 'What is the difference between top down and bottom up?',
          options: [
            'Top down codes the methods first; bottom up codes main first',
            'Top down uses while loops; bottom up uses for loops',
            'Top down is used for Gogga programs; bottom up for JOptionPane programs',
            'Top down decomposes the whole problem into smaller tasks; bottom up starts with small tasks and combines them',
          ],
          answer: 3,
          hint: 'Think about where each approach starts.',
          explanation: 'Top down starts from the whole problem and decomposes it, while bottom up starts from the smaller tasks and combines them.',
          skills: ['U11-S7'],
        },
        {
          id: 'U11-T6-Q2',
          type: 'tf',
          category: 'define',
          prompt: 'Top down starts with the smaller tasks, which are then combined to solve the problem.',
          answer: false,
          hint: 'That describes the other approach.',
          explanation: 'That is bottom up. Top down considers the whole problem first and then decomposes it into smaller tasks.',
          skills: ['U11-S7'],
        },
        {
          id: 'U11-T6-Q3',
          type: 'mc',
          category: 'classify',
          prompt: 'A programmer types the full main method of Divers with its while loop, and leaves oneDiver empty with the comment "to be completed after discussion and algorithm". Which approach is this?',
          options: ['Bottom up', 'Top down', 'Structured testing', 'Abstraction only'],
          answer: 1,
          hint: 'Was the whole problem or the small task done first?',
          explanation: 'Coding the overall algorithm in main first and filling in the smaller oneDiver task later is the top down approach of Activity 4.',
          skills: ['U11-S7'],
        },
      ],
    },
    {
      id: 'U11-T7',
      title: 'The Divers program and the oneDiver helper method',
      sections: ['11.5', '11.5.1', '11.5.2'],
      skills: ['U11-S8'],
      explanation: [
        'name, hiName, score and hiScore are declared as static at the beginning of the class so that they are accessible in the oneDiver method.',
        'main inputs the first name, sets hiName to name, calls oneDiver and sets hiScore to score. It then inputs the next name and loops while !name.equalsIgnoreCase("XXX"), calling oneDiver and replacing hiName and hiScore when score > hiScore. Finally it displays the winner.',
        'oneDiver inputs numJudges and the first score, which sets hiScore, loScore and sum. A for loop from 2 to numJudges inputs each next score, updates the highest or lowest and adds it to sum.',
        'The result removes the highest and lowest: score = (sum - hiScore - loScore) / (numJudges - 2), and it is displayed with the diver\'s name. oneDiver is called a helper method because it helps other methods solve the problem; helper methods are studied in more detail in Grade 11.',
        'Extreme data: if XXX is entered as the first name, the program still asks for the number of judges. An if statement around the first diver fixes this, but then it displays "The winner is null with a score of 0.0", so the final output is placed in an if ... else that displays "Program terminated".',
      ],
      vocabulary: [
        { term: 'Helper method', definition: 'A method, such as oneDiver, that helps other methods solve the problem.' },
        { term: 'Sentinel', definition: 'The terminating value XXX entered as a name to end the list of entrants.' },
      ],
      workedExamples: [
        {
          code: `Rabbit: 5 judges, scores 4.5, 4.9, 5.5, 3.2, 3.5
sum = 21.6, hiScore = 5.5, loScore = 3.2
score = (21.6 - 5.5 - 3.2) / (5 - 2)
      = 12.9 / 3
      = 4.3`,
          explanation: 'The highest and lowest scores are removed and the rest are averaged over numJudges - 2 judges.',
        },
        {
          code: `if (!name.equalsIgnoreCase("XXX"))
   System.out.println
   ("The winner is " + hiName + " with a score of " + hiScore);
else
   System.out.println("Program terminated");`,
          explanation: 'The final output only shows a winner if the first name was not XXX.',
        },
      ],
      misconceptions: [
        'The average is divided by numJudges. Wrong: two scores were removed, so the sum is divided by numJudges - 2.',
        'hiScore must start at 0. Wrong: the first diver\'s score (and in oneDiver the first judge\'s score) is used to initialise the highest and lowest.',
      ],
      questions: [
        {
          id: 'U11-T7-Q1',
          type: 'mc',
          category: 'calculate',
          prompt: 'Tigger has 4 judges with scores 5.1, 5.4, 5.4 and 4.9. What result does oneDiver calculate?',
          options: ['5.2', '5.3', '5.25', '5.0'],
          answer: 2,
          hint: 'Only one highest and one lowest score are removed.',
          explanation: 'sum = 20.8; removing one 5.4 and the 4.9 leaves 10.5, and 10.5 / (4 - 2) = 5.25.',
          skills: ['U11-S8'],
        },
        {
          id: 'U11-T7-Q2',
          type: 'order',
          category: 'sequence',
          prompt: 'Put the steps of the oneDiver algorithm in order.',
          items: [
            'result = (sum - hiScore - loScore) / (numJudges - 2)',
            'Input numJudges',
            'Display the result',
            'Set hiScore, loScore and sum to the first score',
            'Loop from 2 to numJudges: input a score, update hiScore or loScore, add it to sum',
            'Input the first score',
          ],
          answer: [1, 5, 3, 4, 0, 2],
          hint: 'The number of judges is entered before any scores.',
          explanation: 'numJudges and the first score come first, the first score initialises the highest, lowest and sum, the loop processes the rest and the result is calculated and displayed.',
          skills: ['U11-S8'],
        },
        {
          id: 'U11-T7-Q3',
          type: 'tf',
          category: 'predict',
          prompt: 'Before any extra if statements are added, typing XXX as the first name makes Divers ask for the number of judges instead of terminating.',
          answer: true,
          hint: 'Look at what main does straight after inputting the first name.',
          explanation: 'main calls oneDiver for the first name without checking it, so the program asks for the number of judges. An if statement is inserted to test the first name.',
          skills: ['U11-S8'],
        },
        {
          id: 'U11-T7-Q4',
          type: 'mc',
          category: 'explain',
          prompt: 'Why does the result divide by (numJudges - 2)?',
          options: [
            'Because the highest and lowest scores were removed, leaving numJudges - 2 scores',
            'Because the loop starts at 2',
            'Because each score is between 0 and 6',
            'Because there must be at least two judges',
          ],
          answer: 0,
          hint: 'How many scores are left in the sum after the elimination?',
          explanation: 'To avoid bias the highest and lowest are eliminated, so the average is taken over the remaining numJudges - 2 scores.',
          skills: ['U11-S8'],
        },
      ],
    },
    {
      id: 'U11-T8',
      title: 'Check Point 1 and Exercise 1: solving problems with methods',
      sections: ['Check Point 1', 'Exercise 1'],
      skills: ['U11-S9', 'U11-S3', 'U11-S5'],
      explanation: [
        'Check Point 1 asks you to explain decomposition and abstraction with methods, list the advantages of methods, define a local variable, explain why class variables are needed and why they are static, and compare top down and bottom up.',
        'Exercise 1.1: solve FourPyramids (Exercise 2 of Learning Unit 10) with a method onePyramid that draws a single pyramid and a loop in main that calls it.',
        'Exercise 1.2, ChemicalTest: a method testOne inputs the chemical name and, 5 times, the initial germs, final germs and time (whole numbers). Efficiency = (initial - final) / time as a real number. The average is rounded to 3 decimals and displayed, for example "Chemical cyanide has an efficiency rating of 5.234.".',
        'In main, numChem chemicals are tested by calling testOne repeatedly, and the least and most efficient names and ratings are stored and displayed. testOne must reject a chemical with the same name as the previous one and adjust numChem. The abbreviated name is the first character + the last character + a random number from 1 to 10, for example ce5 for cyanide.',
        'Exercise 1.3, AnimalsForAfrica: entrance is R50 per car plus R20 per adult and R10 per child under twelve. One carload is coded in a separate method that displays a ticket; the program is extended to ten cars, then an unknown number of cars, then limits of eighty people and fifteen cars, with test plans.',
      ],
      vocabulary: [
        { term: 'Efficiency rating', definition: 'The number of germs killed (initial minus final) divided by the time taken.' },
        { term: 'Test plan', definition: 'A planned set of test data (standard, extreme and abnormal) used to test a program thoroughly.' },
      ],
      workedExamples: [
        {
          code: `One car, 2 adults, 3 children under twelve
total = 50 + 20 * 2 + 10 * 3
      = 50 + 40 + 30
      = R120`,
          explanation: 'The test data from Exercise 3.2 gives a ticket total of R120.',
        },
        {
          code: `double avg = 5.23449;
avg = Math.round(avg * 1000) / 1000.0;
System.out.println(avg);   // 5.234`,
          explanation: 'Multiplying by 1000, rounding and dividing by 1000.0 rounds to 3 decimal places.',
        },
      ],
      misconceptions: [
        'For an unknown number of cars you can ask the user how many cars there will be. Wrong: the exercise says the user will not know this in advance, so a sentinel loop is needed.',
        'Efficiency can be calculated with int variables. Wrong: (initial - final) / time with ints uses integer division and loses the decimal part.',
      ],
      questions: [
        {
          id: 'U11-T8-Q1',
          type: 'trace',
          category: 'calculate',
          prompt: 'Animals for Africa charges R50 per car, R20 per adult and R10 per child under twelve. Give each total cost in rand as a whole number.',
          code: `total = 50 + 20 * adults + 10 * children;`,
          rows: [
            { label: 'Total: 3 adults, 2 children', answer: '130' },
            { label: 'Total: 1 adult, 0 children', answer: '70' },
          ],
          hint: 'Every car pays R50 before the people are added.',
          explanation: '50 + 60 + 20 = 130 and 50 + 20 + 0 = 70.',
          skills: ['U11-S9'],
        },
        {
          id: 'U11-T8-Q2',
          type: 'trace',
          category: 'calculate',
          prompt: 'One ChemicalTest run: initial germs 1200, final germs 450, time 150. Type the efficiency as Java prints a double, for example 3.0.',
          code: `double eff = (double) (initial - fin) / time;`,
          rows: [{ label: 'Efficiency', answer: '5.0' }],
          hint: 'Subtract first, then divide by the time.',
          explanation: '1200 - 450 = 750 germs killed, and 750 / 150 = 5.0.',
          skills: ['U11-S9'],
        },
        {
          id: 'U11-T8-Q3',
          type: 'mc',
          category: 'apply',
          prompt: 'Which statement generates the random number between 1 and 10 inclusive needed for the abbreviated chemical name?',
          options: [
            'int num = (int) Math.random() * 10 + 1;',
            'int num = (int) (Math.random() * 10);',
            'int num = (int) (Math.random() * 11);',
            'int num = (int) (Math.random() * 10) + 1;',
          ],
          answer: 3,
          hint: 'Math.random() * 10 gives 0 up to (but not including) 10 before the cast.',
          explanation: '(int) (Math.random() * 10) gives 0 to 9, and adding 1 gives 1 to 10. Without the brackets the cast makes Math.random() 0 first.',
          skills: ['U11-S9'],
        },
        {
          id: 'U11-T8-Q4',
          type: 'tf',
          category: 'apply',
          prompt: 'In Exercise 3.5 (any number of cars until the gate closes), the program may ask the user to type in the number of cars at the start.',
          answer: false,
          hint: 'Will the gate keeper know in the morning how many cars will arrive?',
          explanation: 'The exercise states you may not ask for the number of cars because the user will not know it in advance, so the loop must end on a terminating value.',
          skills: ['U11-S9'],
        },
      ],
    },
  ],
};

export const SCENARIOS = [
  {
    id: 'u11-refinery-meltdown',
    unitId: UNIT.id,
    title: 'Rand Refinery Meltdown',
    icon: 'vault',
    summary: 'Decompose a gold refinery\'s runaway program into working methods.',
    briefing: 'The gold refinery\'s pouring robot runs one giant main method and nobody can find the bug that is spilling molten gold. Decompose it into static void methods, fix the class variables and get the pour sequence back under control before the furnace overheats.',
    tickerMessages: [
      'Refinery control room reports erratic pouring robot',
      'Engineers: "The main method is 600 lines long and nobody can read it"',
      'Compiler error: robot object cannot be found in method pourBar',
      'Furnace temperature rising; evacuation of the casting floor begins',
      'Gold reserves at risk as the run time error repeats',
      'Final warning: restructure the program now or lose the vault',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U11-S1', 'U11-S2', 'U11-S3', 'U11-S4', 'U11-S5'],
    victoryMessage: 'The robot pours perfect bars again. Clean methods, shared class variables and a readable main saved the vault.',
    failMessage: 'Molten gold floods the casting floor. The tangled main method wins this round; study your methods and try again.',
  },
  {
    id: 'u11-dive-scoreboard',
    unitId: UNIT.id,
    title: 'Scoreboard Down in Durban',
    icon: 'alert',
    summary: 'Repair the diving championship scoring program before the medal ceremony.',
    briefing: 'The national diving championships are live on TV and the scoreboard program has crashed. Trace the oneDiver helper method, drop the highest and lowest judge scores and crown the right winner before the cameras cut to the podium.',
    tickerMessages: [
      'Scoreboard blank at the national diving championships',
      'Judges\' scores entered but no results displayed',
      'Commentators: "The winner is null with a score of 0.0?"',
      'Broadcaster threatens to switch to a cooking programme',
      'Divers waiting on the podium; officials demand the correct winner',
    ],
    timeLimitSeconds: 210,
    questionCount: 6,
    skills: ['U11-S6', 'U11-S7', 'U11-S8', 'U11-S9', 'U11-S3'],
    victoryMessage: 'The scoreboard lights up with the correct winner. Your helper method and top down thinking saved the broadcast.',
    failMessage: 'The wrong diver gets the gold and the TV audience riots online. Trace oneDiver again and get it right next time.',
  },
];
