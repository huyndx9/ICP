export type ReferenceTable = {
  title: string;
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
};

export const REFERENCE_TABLES: readonly ReferenceTable[] = [
  {
    title: 'Confidence Level',
    caption: 'How strong is the evidence behind this row?',
    columns: ['Level', 'Meaning', 'Typical Source'],
    rows: [
      ['L1', 'Assumption — internal guess only', 'BD judgement'],
      ['L2', 'Weak signal — indirect indication', 'News, hiring post'],
      ['L3', 'Public evidence — documented publicly', 'Annual report, website'],
      ['L4', 'Validated signal — cross-checked', 'Analyst report + referral'],
      ['L5', 'Confirmed by customer — stated directly', 'Discovery call'],
    ],
  },
  {
    title: 'Strategic Intent',
    caption: 'What is the company trying to achieve right now?',
    columns: ['Intent', 'Reads Like', 'Typical Buyer'],
    rows: [
      ['Grow', 'Expansion, new market, new line', 'CEO / COO / CRO'],
      ['Optimize', 'Efficiency, cost, throughput', 'COO / Head of Ops'],
      ['Transform', 'Re-platform, re-design, modernize', 'CIO / CDO'],
      ['Protect', 'Compliance, security, continuity', 'CISO / Head of IT'],
      ['Innovate', 'New product, new model, AI bets', 'CTO / Head of Product'],
    ],
  },
  {
    title: 'Expected Offering',
    caption: 'What shape of engagement fits the scenario?',
    columns: ['Offering', 'Fits When', 'Commercial Shape'],
    rows: [
      ['Custom Solution', 'Requirements are specific and owned', 'Fixed scope / milestone'],
      ['Team-based Service', 'Ongoing delivery capacity needed', 'Monthly team rate'],
      ['Consulting + Solution', 'Direction unclear before build', 'Assessment then build'],
      ['Managed Service', 'Run and maintain, not just build', 'SLA / retainer'],
      ['Staff Augmentation', 'Customer leads, gaps in skills', 'Per-head monthly'],
      ['Product Licence', 'A packaged product closes the gap', 'Subscription'],
    ],
  },
  {
    title: 'Tier',
    caption: 'How much BD effort does this account deserve?',
    columns: ['Tier', 'Definition', 'Working Cadence'],
    rows: [
      ['Tier 1', 'Core ICP fit, high value, reachable', 'Weekly — named plan'],
      ['Tier 2', 'Good fit, needs one more proof point', 'Bi-weekly — nurture'],
      ['Tier 3', 'Edge fit or low signal for now', 'Quarterly — observe'],
    ],
  },
  {
    title: 'Leadership Decision',
    caption: 'What did leadership decide after reading the row?',
    columns: ['Decision', 'Means', 'Next Action'],
    rows: [
      ['Observe', 'Keep watching for a stronger signal', 'Set a signal alert'],
      ['Approach', 'Go — start outreach now', 'Assign owner + sequence'],
      ['Need More Evidence', 'Promising but under-evidenced', 'Raise confidence to L3+'],
      ['Park', 'Right account, wrong timing', 'Revisit next quarter'],
      ['Disqualify', 'Outside ICP — stop spending time', 'Archive with reason'],
    ],
  },
];

export const RULE_OF_THUMB: readonly string[] = [
  'Capture Facts',
  'Choose from Library',
  'Update After Discovery',
  'Leadership Turns Data into Strategy',
];
