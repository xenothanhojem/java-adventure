import * as javaSubject from './java/index.js';
import * as theorySubject from './theory/index.js';
import * as businessSubject from './business/index.js';

export const SUBJECTS = {
  theory: {
    id: 'theory',
    title: 'IT Theory',
    subtitle: 'Grade 10 · Information Technology',
    description: 'Data representation, hardware, system software, networks, Boolean logic, the Internet and social issues. All 8 theory learning units.',
    mapTagline: 'From bits and bytes to networks and ethics.',
    accentColor: 'lime',
    glowClass: 'ja-glow-lime',
    bgClass: 'ja-w-data-representation',
    module: theorySubject,
    hasPracticalTest: false,
  },
  java: {
    id: 'java',
    title: 'Java Practical',
    subtitle: 'Grade 10 · Information Technology',
    description: 'Gogga objects, variables, strings, loops, decisions, methods and SQL. All 12 programming learning units, with coding challenges.',
    mapTagline: 'Then make Java make sense.',
    accentColor: 'cyan',
    glowClass: 'ja-glow-cyan',
    bgClass: 'ja-w-variables',
    storageKey: 'java-adventure-state-java-v1',
    legacyStorageKey: 'java-adventure-state-v2',
    module: javaSubject,
    hasPracticalTest: true,
    practicalTestLabel: 'Practical Test',
  },
  business: {
    id: 'business',
    title: 'Business Studies',
    subtitle: 'Grade 10 · Business Studies (IEB)',
    description: 'Business environments, entrepreneurship, ownership, ethics, teamwork and the business functions. All 11 textbook chapters, with case-study practice exams.',
    mapTagline: 'From the micro environment to the income statement.',
    accentColor: 'gold',
    glowClass: 'ja-glow-gold',
    bgClass: 'ja-w-business-environments',
    module: businessSubject,
    hasPracticalTest: true,
    practicalTestLabel: 'Practice Exam',
    practicalTestKind: 'businessExam',
  },
};

export function getSubject(subjectId) {
  return SUBJECTS[subjectId] || SUBJECTS.java;
}

export function getSubjectModule(subjectId) {
  return getSubject(subjectId).module;
}
