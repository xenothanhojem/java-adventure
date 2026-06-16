export 
const LEVELS = {
  variables: [
    { id: 'v-l1', name: 'Type Selector',     subtitle: 'Recognise the right data type', challengeIds: ['v1','v2','v3'] },
    { id: 'v-l2', name: 'Arithmetic Lab',    subtitle: 'Predict what maths produces',   challengeIds: ['v4','v5','v6','v7'] },
    { id: 'v-l3', name: 'Variables Boss',    subtitle: 'Mixed challenges to wrap up',   challengeIds: ['v8','v9','v10','v11','v12'] },
    { id: 'v-l4', name: 'Code Workshop',     subtitle: 'Read code, spot bugs, write your first program', challengeIds: ['v13','v14','v15','v16','v17'], hasCoding: true },
  ],
  strings: [
    { id: 's-l1', name: 'Quote Quarry',      subtitle: 'char vs String',                challengeIds: ['s1','s2','s3'] },
    { id: 's-l2', name: 'String Operations', subtitle: 'length, charAt, escapes',       challengeIds: ['s4','s5','s6','s7'] },
    { id: 's-l3', name: 'String Boss',       subtitle: 'Math class + casting + strings',challengeIds: ['s8','s9','s10','s11','s12'] },
    { id: 's-l4', name: 'Code Workshop',     subtitle: 'Read string code, spot bugs, write your own', challengeIds: ['s13','s14','s15','s16','s17'], hasCoding: true },
  ],
  loops: [
    { id: 'l-l1', name: 'How Many Times?',   subtitle: 'Counting loop iterations',      challengeIds: ['l1','l2','l3'] },
    { id: 'l-l2', name: 'Loop Output',       subtitle: 'What does it print?',           challengeIds: ['l4','l5','l6','l7'] },
    { id: 'l-l3', name: 'Loop Boss',         subtitle: 'Sums, traces, broken loops',    challengeIds: ['l8','l9','l10','l11','l12'] },
    { id: 'l-l4', name: 'Code Workshop',     subtitle: 'Loop reading, debugging, and writing your own', challengeIds: ['l13','l14','l15','l16','l17'], hasCoding: true },
  ],
  logic: [
    { id: 'g-l1', name: 'Condition Check',   subtitle: 'Evaluating true/false',         challengeIds: ['g1','g2','g3'] },
    { id: 'g-l2', name: 'If / Else',         subtitle: 'Picking the right branch',      challengeIds: ['g4','g5','g6','g7'] },
    { id: 'g-l3', name: 'Logic Boss',        subtitle: 'Nested logic and operators',    challengeIds: ['g8','g9','g10','g11','g12'] },
    { id: 'g-l4', name: 'Code Workshop',     subtitle: 'Read decisions, spot bugs, write a classifier', challengeIds: ['g13','g14','g15','g16','g17'], hasCoding: true },
  ],
  algorithms: [
    { id: 'a-l1', name: 'Four Pillars',      subtitle: 'Decompose, spot patterns, abstract, sequence', challengeIds: ['a1','a2','a3','a4'] },
    { id: 'a-l2', name: 'IPO Model',         subtitle: 'Input · Processing · Output',  challengeIds: ['a5','a6','a7','a8'] },
    { id: 'a-l3', name: 'Flowcharts & Pseudocode', subtitle: 'Symbols and the rules',  challengeIds: ['a9','a10','a11','a12','a13'] },
    { id: 'a-l4', name: 'Errors, Tests & Traces',  subtitle: 'Boss level — bring it all together', challengeIds: ['a14','a15','a16','a17','a18','a19','a20'], hasCoding: true },
  ],
  objects: [
    { id: 'o-l1', name: 'Objects 101',       subtitle: 'Declaring, instantiating, the new keyword', challengeIds: ['o1','o2','o3','o4'] },
    { id: 'o-l2', name: 'Constructors',      subtitle: 'Overloading and method resolution',         challengeIds: ['o5','o6','o7','o8'] },
    { id: 'o-l3', name: 'Color & Random',    subtitle: 'RGB and Math.random',                       challengeIds: ['o9','o10','o11','o12','o13'] },
    { id: 'o-l4', name: 'Object Forge Boss', subtitle: 'State, randomness, and your own program',   challengeIds: ['o14','o15','o16','o17','o18'], hasCoding: true },
  ],
  binary: [
    { id: 'b-l1', name: 'Number Systems',     subtitle: 'Decimal vs binary, bases, why computers use binary', challengeIds: ['b1','b2','b3','b4'] },
    { id: 'b-l2', name: 'Place Value & Conversion', subtitle: 'Powers of 2, binary <-> decimal',      challengeIds: ['b5','b6','b7','b8'] },
    { id: 'b-l3', name: 'Binary Arithmetic',  subtitle: 'Addition, subtraction, carry, borrow',       challengeIds: ['b9','b10','b11','b12'] },
    { id: 'b-l4', name: 'Binary Boss',        subtitle: 'Bits, bytes, mixed conversions, and arithmetic', challengeIds: ['b13','b14','b15','b16','b17'] },
  ],
};
