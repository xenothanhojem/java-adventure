import * as javaSubject from './java/index.js';
import * as businessSubject from './business/index.js';

export const SUBJECTS = {
  java: {
    id: 'java',
    title: 'Java Adventure',
    subtitle: 'Grade 10 · Information Technology',
    description: 'Variables, strings, loops, logic, algorithms, and binary. Code your way through each world.',
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
    title: 'Business Studies Adventure',
    subtitle: 'Grade 10 · IEB Business Studies',
    description: 'Forms of ownership, professionalism, ethics, and business report writing. Apply theory to real scenarios.',
    accentColor: 'gold',
    glowClass: 'ja-glow-gold',
    bgClass: 'ja-w-report',
    storageKey: 'java-adventure-state-business-v1',
    module: businessSubject,
    hasPracticalTest: true,
    practicalTestLabel: 'Business Report Test',
    practicalTestKind: 'businessReport',
  },
};

export function getSubject(subjectId) {
  return SUBJECTS[subjectId] || SUBJECTS.java;
}

export function getSubjectModule(subjectId) {
  return getSubject(subjectId).module;
}
