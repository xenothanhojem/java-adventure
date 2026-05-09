/*
 * High-stakes timed scenarios for the Do or Die mode.
 * Each unit has multiple themed scenarios with their own ticker messages,
 * narrative beats, and time pressure.
 *
 * The ticker messages escalate as time runs out: index 0 plays at the start,
 * subsequent messages drip in at proportional time intervals.
 */

export const SCENARIOS = [
  // -------------------- Unit 2 --------------------
  {
    id: 'u2-nuclear',
    unitId: 'U2',
    title: 'Nuclear Countdown',
    icon: 'nuke',
    summary: 'Defuse the warhead. Java calculations only.',
    briefing:
      'A rogue warhead is armed and counting down. The disarm system requires a Java program that converts user input, performs arithmetic, and prints the abort code. The launch sequence accepts only correct integer arithmetic.',
    tickerMessages: [
      'BREAKING: Suspicious satellite activity detected over the Pacific.',
      'CNN: Pentagon raises alert level to DEFCON 3.',
      'Russia and North Korea are reportedly arming warheads.',
      'NORAD: Multiple silo doors opening across Siberia.',
      'EVACUATION ORDERS issued in 14 major cities.',
      'NUCLEAR WAR IMMINENT - FINAL ABORT CODE REQUIRED.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U2-S3', 'U2-S4', 'U2-S5', 'U2-S6', 'U2-S7'],
    victoryMessage: 'Abort code accepted. The warhead stands down. Civilisation continues.',
    failMessage: 'Calculation rejected. Detonation imminent. Try again, soldier.',
  },
  {
    id: 'u2-bank-vault',
    unitId: 'U2',
    title: 'The Vault Code',
    icon: 'vault',
    summary: 'Crack the vault math under pressure.',
    briefing:
      'Heist crew in trouble: the vault timer is running and the door requires a sequence of arithmetic answers, type conversions, and modulus calculations. Get them right or the alarm trips.',
    tickerMessages: [
      'POLICE SCANNER: silent alarm reported at bank branch on 5th street.',
      'Two patrol cars dispatched, ETA 4 minutes.',
      'Helicopter spotted approaching downtown.',
      'GETAWAY DRIVER: "Boss, hurry up - I see flashing lights."',
      'SWAT TEAM en route. Lockdown imminent.',
    ],
    timeLimitSeconds: 210,
    questionCount: 6,
    skills: ['U2-S5', 'U2-S6', 'U2-S7', 'U2-S4'],
    victoryMessage: 'Vault open. Cash in the bag. You vanish into the night.',
    failMessage: 'Alarm tripped. Backup is here. Game over.',
  },

  // -------------------- Unit 3 --------------------
  {
    id: 'u3-space-distress',
    unitId: 'U3',
    title: 'Distress Signal',
    icon: 'radio',
    summary: 'Decode the alien message before life support fails.',
    briefing:
      'Your crewmate is trapped on a damaged station. Their suit transmits garbled strings, escape sequences, and Math computations. Decode each piece - charAt indexes, length checks, Math.sqrt distance calcs - to triangulate their location.',
    tickerMessages: [
      'STATION COMMS: "...life support... 12 percent... please..."',
      'Oxygen reserves on the suit dropping rapidly.',
      'Hull breach detected on deck 7.',
      'CO2 levels critical. Crewmate consciousness fading.',
      'FINAL TRANSMISSION incoming...',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U3-S1', 'U3-S3', 'U3-S4', 'U3-S5', 'U3-S7'],
    victoryMessage: 'Coordinates locked. Rescue shuttle launched. They are coming home.',
    failMessage: 'Signal lost. We could not reach them in time.',
  },
  {
    id: 'u3-virus-scan',
    unitId: 'U3',
    title: 'Patient Zero',
    icon: 'virus',
    summary: 'Parse symptom strings and run the diagnostic.',
    briefing:
      'A new virus is spreading. The diagnostic engine needs you to interpret patient string data, count characters, parse symptoms, and apply Math.round to lab readings. Get the strain right or the wrong cure ships worldwide.',
    tickerMessages: [
      'WHO: New unidentified virus detected in three countries.',
      'Hospitals reporting overflow. Borders closing.',
      'Strain mutation rate exceeds containment models.',
      'Global infections doubling every 6 hours.',
      'CURE WINDOW CLOSING - DIAGNOSIS REQUIRED.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U3-S4', 'U3-S5', 'U3-S6', 'U3-S7'],
    victoryMessage: 'Strain identified. Cure synthesis underway. You saved millions.',
    failMessage: 'Misdiagnosed. The wrong cure ships. Catastrophe.',
  },

  // -------------------- Unit 4 --------------------
  {
    id: 'u4-power-grid',
    unitId: 'U4',
    title: 'Power Grid Crisis',
    icon: 'lightning',
    summary: 'Decompose the failure. Restore the city.',
    briefing:
      'Half the city is dark. To reroute power you must read flowcharts, complete IPO models, classify the error type, and order the recovery algorithm steps. One wrong move blacks out the hospitals.',
    tickerMessages: [
      'CITY UPDATE: Cascading power failures across districts 3, 5, and 9.',
      'Traffic lights offline. Multiple collisions reported.',
      'Hospital backup generators at 30 percent.',
      'Cold storage failing. Vaccine stockpile at risk.',
      'Mayor demands restoration within minutes.',
    ],
    timeLimitSeconds: 270,
    questionCount: 6,
    skills: ['U4-S2', 'U4-S3', 'U4-S5', 'U4-S6', 'U4-S7', 'U4-S10'],
    victoryMessage: 'Grid stabilised. Lights flicker back on across the city.',
    failMessage: 'Wrong sequence. Total blackout. The city goes dark.',
  },
  {
    id: 'u4-asteroid',
    unitId: 'U4',
    title: 'Asteroid Deflection',
    icon: 'asteroid',
    summary: 'Plan the deflection algorithm before impact.',
    briefing:
      'A 2km asteroid is on collision course with Earth. NASA needs you to break down the deflection problem, identify the IPO of the laser array, choose the right test data, and trace the firing sequence.',
    tickerMessages: [
      'NASA: Object 2026-XR confirmed on collision trajectory.',
      'Impact zone: North Atlantic. Tsunami risk: catastrophic.',
      'Deflection window narrowing. Time-to-impact decreasing.',
      'Global emergency declared by UN.',
      'FINAL FIRING WINDOW open - sequence required NOW.',
    ],
    timeLimitSeconds: 270,
    questionCount: 6,
    skills: ['U4-S2', 'U4-S3', 'U4-S5', 'U4-S11', 'U4-S12'],
    victoryMessage: 'Laser array fired. Asteroid deflected. Earth survives.',
    failMessage: 'Sequence error. Asteroid hit. Impact catastrophic.',
  },

  // -------------------- Unit 5 --------------------
  {
    id: 'u5-zombie-loop',
    unitId: 'U5',
    title: 'Outbreak Containment',
    icon: 'biohazard',
    summary: 'Loop through every quarantine zone before they breach.',
    briefing:
      'A containment outbreak. You must write loops that count zones, total infected, average symptoms across patients, and detect a never-runs loop in the bunker doors. Get the for loops right.',
    tickerMessages: [
      'CDC ALERT: Containment perimeter breach in zone 7.',
      'Infected sprinting toward checkpoint Bravo.',
      'Quarantine doors not responding.',
      'Helicopter extraction in 3 minutes.',
      'PERIMETER FAILING - SEAL ALL ZONES.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U5-S2', 'U5-S3', 'U5-S4', 'U5-S5', 'U5-S9', 'U5-S10'],
    victoryMessage: 'All zones sealed. Containment restored. Outbreak contained.',
    failMessage: 'Loop error. A zone stays open. The outbreak spreads.',
  },
  {
    id: 'u5-rocket',
    unitId: 'U5',
    title: 'Launch Sequence',
    icon: 'rocket',
    summary: 'Run the countdown loops without an infinite loop.',
    briefing:
      'Mars colony ship launches in minutes. The countdown systems need correct for loops: counting down, char-loops for bay doors A-Z, accumulating fuel totals. One infinite loop and the rocket aborts.',
    tickerMessages: [
      'MISSION CONTROL: All hands report ready.',
      'Fuel pumps engaged. Pressure climbing.',
      'Weather window narrowing. Storm front 80km out.',
      'Backup launch slot 14 days from now - delay = mission failure.',
      'T-MINUS COUNTDOWN INITIATED.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U5-S2', 'U5-S3', 'U5-S6', 'U5-S7', 'U5-S8', 'U5-S9'],
    victoryMessage: 'Launch sequence complete. Rocket clears the tower. Mars awaits.',
    failMessage: 'Infinite loop in countdown. Launch aborted. Mission lost.',
  },

  // -------------------- Unit 7 --------------------
  {
    id: 'u7-hostage',
    unitId: 'U7',
    title: 'Negotiator',
    icon: 'phone',
    summary: 'Branch the right way at every decision.',
    briefing:
      'Hostage situation. Each move depends on a condition: age check, weapon type, demand validity. Use if/else, nested ifs, and logical operators (&&, ||, !) to choose the right response. One wrong branch and the situation explodes.',
    tickerMessages: [
      'POLICE FREQ: Suspect inside, hostages confirmed.',
      'Suspect demands: helicopter and 2 million.',
      'Snipers in position. Awaiting your call.',
      'Hostage child showing signs of distress.',
      'FINAL DEADLINE - DECISION REQUIRED.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['U7-S1', 'U7-S2', 'U7-S3', 'U7-S5', 'U7-S6', 'U7-S8'],
    victoryMessage: 'Hostages free. Suspect in custody. Crisis defused.',
    failMessage: 'Wrong branch. Situation escalated. Catastrophic outcome.',
  },
  {
    id: 'u7-ai-firewall',
    unitId: 'U7',
    title: 'AI Firewall',
    icon: 'cpu',
    summary: 'Filter the threats with the right logic.',
    briefing:
      'A rogue AI is probing your network. The firewall rules need correct relational operators (==, !=, <=) and combined && / || conditions. Wrong logic lets the AI through.',
    tickerMessages: [
      'NETWORK ALERT: Anomalous packets from 14 source IPs.',
      'Intrusion detection: probe attempts escalating.',
      'AI learning your filter patterns.',
      'Critical systems queried - financial database next.',
      'FIREWALL BREACH IMMINENT - LOCK IT DOWN.',
    ],
    timeLimitSeconds: 210,
    questionCount: 6,
    skills: ['U7-S2', 'U7-S3', 'U7-S5', 'U7-S7', 'U7-S8', 'U7-S9'],
    victoryMessage: 'Firewall holds. AI quarantined. Network secure.',
    failMessage: 'Filter logic failed. AI inside the network. Total compromise.',
  },

  // -------------------- Binary --------------------
  {
    id: 'ub-enigma',
    unitId: 'UB',
    title: 'Enigma Protocol',
    icon: 'cpu',
    summary: 'Crack the binary cipher before the message expires.',
    briefing:
      'An intercepted enemy transmission is encoded in binary. Convert binary to decimal, decimal to binary, perform binary addition to reconstruct the cipher key, and identify storage units. The message self-destructs in minutes.',
    tickerMessages: [
      'SIGNALS INTELLIGENCE: Encrypted burst detected on hostile frequency.',
      'Cipher header indicates time-locked self-destruct.',
      'Partial decode: location coordinates embedded in binary.',
      'Message integrity degrading. Bits corrupting.',
      'FINAL DECODE WINDOW - CRACK IT NOW.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['UB-S1', 'UB-S3', 'UB-S4', 'UB-S5', 'UB-S6', 'UB-S8'],
    victoryMessage: 'Cipher cracked. Coordinates decoded. The intel is ours.',
    failMessage: 'Message self-destructed. The binary secrets are lost.',
  },
  {
    id: 'ub-mars-relay',
    unitId: 'UB',
    title: 'Mars Relay',
    icon: 'radio',
    summary: 'Fix the corrupted binary data link to Mars.',
    briefing:
      'The Mars colony data relay is transmitting garbled binary. Sensor readings need binary-to-decimal conversion, supply manifests need decimal-to-binary encoding, and the checksum requires binary addition. Fix the relay before the colony loses contact.',
    tickerMessages: [
      'MARS COLONY: Data link degrading. Packet loss at 40 percent.',
      'Life support telemetry unreadable.',
      'Colony commander requesting immediate relay repair.',
      'Solar storm approaching. Communications window closing.',
      'TOTAL BLACKOUT in 2 minutes unless relay is restored.',
    ],
    timeLimitSeconds: 240,
    questionCount: 6,
    skills: ['UB-S3', 'UB-S4', 'UB-S5', 'UB-S6', 'UB-S7'],
    victoryMessage: 'Relay restored. Mars colony back online. Data flowing clean.',
    failMessage: 'Relay failed. Mars colony goes dark. Contact lost.',
  },
];

export function getScenariosForUnit(unitId) {
  return SCENARIOS.filter((s) => s.unitId === unitId);
}

export function getScenarioById(id) {
  return SCENARIOS.find((s) => s.id === id) || null;
}

/*
 * Map ticker index to a fraction of total time at which it should fire.
 * The first message fires at 0; subsequent messages spaced evenly through
 * the run, with the final message arriving in the last 10 percent.
 */
export function tickerScheduleFor(scenario) {
  const n = scenario.tickerMessages.length;
  if (n === 0) return [];
  if (n === 1) return [0];
  const schedule = [];
  for (let i = 0; i < n; i += 1) {
    if (i === 0) schedule.push(0);
    else if (i === n - 1) schedule.push(0.9);
    else schedule.push(i / (n - 1) * 0.85);
  }
  return schedule;
}

/*
 * Compute final score and grade for a Do or Die run.
 *
 *   completionScore = (questionsAnswered / totalQuestions) * 40
 *   accuracyScore   = (correctAnswers / questionsAnswered) * 40
 *   speedBonus      = (timeRemaining / timeLimit) * 20
 *   finalScore      = sum of above (max 100)
 */
export function scoreRun({ totalQuestions, questionsAnswered, correctAnswers, timeRemainingSec, timeLimitSec }) {
  const completionPct = totalQuestions > 0 ? questionsAnswered / totalQuestions : 0;
  const accuracyPct = questionsAnswered > 0 ? correctAnswers / questionsAnswered : 0;
  const speedPct = timeLimitSec > 0 ? Math.max(0, timeRemainingSec) / timeLimitSec : 0;
  const completionScore = completionPct * 40;
  const accuracyScore = accuracyPct * 40;
  const speedBonus = speedPct * 20;
  const finalScore = completionScore + accuracyScore + speedBonus;
  const grade = gradeFor(finalScore);
  return {
    completionPct, accuracyPct, speedPct,
    completionScore, accuracyScore, speedBonus,
    finalScore, grade,
  };
}

export function gradeFor(score) {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 60) return 'B';
  if (score >= 45) return 'C';
  return 'F';
}

export const GRADE_COLOR = {
  S: '#d68aff',
  A: '#5cf2ff',
  B: '#6ee7a8',
  C: '#ffb454',
  F: '#ff7a7a',
};
