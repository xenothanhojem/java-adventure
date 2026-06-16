/*
 * Business Studies skill registry — Grade 10 IEB.
 * Units B1–B12 map to game worlds.
 */

export const UNITS = {
  B1: { id: 'B1', number: 1, name: 'Report Writing', worldId: 'report' },
  B2: { id: 'B2', number: 2, name: 'Core Business Concepts', worldId: 'concepts' },
  B3: { id: 'B3', number: 3, name: 'Choosing Ownership', worldId: 'factors' },
  B4: { id: 'B4', number: 4, name: 'Sole Trader & Partnership', worldId: 'sole-partner' },
  B5: { id: 'B5', number: 5, name: 'Companies', worldId: 'companies' },
  B6: { id: 'B6', number: 6, name: 'SOE & NPO', worldId: 'public-sector' },
  B7: { id: 'B7', number: 7, name: 'Compare & Grow', worldId: 'compare' },
  B8: { id: 'B8', number: 8, name: 'Ethics & Culture', worldId: 'ethics' },
  B9: { id: 'B9', number: 9, name: 'Citizenship', worldId: 'citizenship' },
  B10: { id: 'B10', number: 10, name: 'Contracts', worldId: 'contracts' },
  B11: { id: 'B11', number: 11, name: 'Self-Management', worldId: 'self-mgmt' },
  B12: { id: 'B12', number: 12, name: 'Exam Arena', worldId: 'exam' },
};

export const SKILLS = {
  'BS1-S1': { unit: 'B1', name: 'Report structure', description: 'Title, introduction, procedure, findings, conclusion, recommendations.' },
  'BS1-S2': { unit: 'B1', name: 'Formal report tone', description: 'Professional language without slang or casual wording.' },
  'BS1-S3': { unit: 'B1', name: 'Apply theory in reports', description: 'Link business concepts to case study scenarios.' },
  'BS1-S4': { unit: 'B1', name: 'Justified recommendations', description: 'Practical recommendations linked to findings.' },

  'BS2-S1': { unit: 'B2', name: 'Capital and liability', description: 'Define capital, debt, unlimited and limited liability.' },
  'BS2-S2': { unit: 'B2', name: 'Legal personality', description: 'Separate legal entity; registration requirement.' },
  'BS2-S3': { unit: 'B2', name: 'Continuity and shareholders', description: 'Business continuity, shareholders, dividends.' },
  'BS2-S4': { unit: 'B2', name: 'MOI and CIPC', description: 'Memorandum of Incorporation and CIPC registration.' },
  'BS2-S5': { unit: 'B2', name: 'Tax concepts', description: 'Income tax vs corporate tax.' },

  'BS3-S1': { unit: 'B3', name: 'Seven ownership factors', description: 'Legal persona, liability, tax, continuity, management, capital, formation.' },
  'BS3-S2': { unit: 'B3', name: 'Forms overview', description: 'Six main forms of ownership at Grade 10 level.' },

  'BS4-S1': { unit: 'B4', name: 'Sole trader characteristics', description: 'One owner, unlimited liability, no separate legal personality.' },
  'BS4-S2': { unit: 'B4', name: 'Sole trader adv/disadv', description: 'Advantages and disadvantages of sole proprietorship.' },
  'BS4-S3': { unit: 'B4', name: 'Partnership characteristics', description: 'Two or more owners, shared profits, unlimited liability.' },
  'BS4-S4': { unit: 'B4', name: 'Partnership agreement', description: 'Clauses in a partnership agreement and why it matters.' },

  'BS5-S1': { unit: 'B5', name: 'Private company Pty Ltd', description: 'Separate legal personality, limited liability, private shares.' },
  'BS5-S2': { unit: 'B5', name: 'Public company Ltd', description: 'Shares sold to public, JSE listing, strict requirements.' },
  'BS5-S3': { unit: 'B5', name: 'Company adv/disadv', description: 'Compare advantages and disadvantages of companies.' },

  'BS6-S1': { unit: 'B6', name: 'State-owned enterprise', description: 'Government ownership, public service focus.' },
  'BS6-S2': { unit: 'B6', name: 'NPO and NPC', description: 'Non-profit purpose, donations, no profit distribution.' },

  'BS7-S1': { unit: 'B7', name: 'Ownership comparison', description: 'Compare forms using liability, capital, continuity criteria.' },
  'BS7-S2': { unit: 'B7', name: 'Growth stages', description: 'Green Harvest model: sole trader to partnership to company.' },
  'BS7-S3': { unit: 'B7', name: 'Scenario recommendations', description: 'Recommend suitable ownership for business scenarios.' },

  'BS8-S1': { unit: 'B8', name: 'Organisational culture', description: 'Shared values, beliefs, attitudes in a business.' },
  'BS8-S2': { unit: 'B8', name: 'Ethical behaviour', description: 'Honest, fair, responsible business conduct.' },
  'BS8-S3': { unit: 'B8', name: 'Unethical behaviour', description: 'Identify bribery, false advertising, tax evasion, etc.' },
  'BS8-S4': { unit: 'B8', name: 'Marketing ethics', description: 'Honest advertising vs bait advertising and hidden costs.' },

  'BS9-S1': { unit: 'B9', name: 'Rights and responsibilities', description: 'Citizen and business rights paired with duties.' },
  'BS9-S2': { unit: 'B9', name: 'Business in society', description: 'Why businesses must respect stakeholder rights.' },

  'BS10-S1': { unit: 'B10', name: 'Valid contract requirements', description: 'Capacity, consensus, legal purpose, performance, formalities.' },
  'BS10-S2': { unit: 'B10', name: 'Breach of contract', description: 'When a party fails to fulfil contract terms.' },
  'BS10-S3': { unit: 'B10', name: 'Contract types', description: 'Sale, service, employment, lease contracts.' },

  'BS11-S1': { unit: 'B11', name: 'Time management', description: 'Planning, prioritising, meeting deadlines.' },
  'BS11-S2': { unit: 'B11', name: 'Delegation', description: 'Assigning tasks to others effectively.' },
  'BS11-S3': { unit: 'B11', name: 'Stress and workload', description: 'Managing pressure and workload balance.' },
  'BS11-S4': { unit: 'B11', name: 'Communication', description: 'Effective business communication.' },
  'BS11-S5': { unit: 'B11', name: 'Assertiveness', description: 'Standing up for rights respectfully.' },

  'BS12-S1': { unit: 'B12', name: 'Integrated exam skills', description: 'Combine ownership, ethics, and report writing.' },
  'BS12-S2': { unit: 'B12', name: 'Test structure', description: '50-mark test: definitions, comparison, scenario, ethics, report.' },
};

export const MASTERY_LABEL = {
  notStarted: 'Not started',
  introduced: 'Introduced',
  practising: 'Practising',
  secure: 'Secure',
  mastered: 'Mastered',
};

export const MASTERY_COLOR = {
  notStarted: 'var(--ink-mute)',
  introduced: 'var(--ink-dim)',
  practising: 'var(--amber)',
  secure: 'var(--cyan)',
  mastered: 'var(--emerald)',
};

export function deriveMastery(stat) {
  if (!stat || (stat.correct + stat.wrong) === 0) return 'notStarted';
  const total = stat.correct + stat.wrong;
  const rate = stat.correct / total;
  if (total < 2) return 'introduced';
  if (rate < 0.5) return 'practising';
  if (rate < 0.85 || total < 4) return 'secure';
  return 'mastered';
}

export function migrateSkillIds(skills) {
  return (skills || []).filter((s) => SKILLS[s]);
}
