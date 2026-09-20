export type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3';
export type StrategicIntent = 'Grow' | 'Optimize' | 'Transform' | 'Protect' | 'Innovate';
export type MatchWithStrategy =
  | 'Perfect Match'
  | 'Heavily Match'
  | 'Partial Match'
  | 'New Opportunity'
  | 'No Match';
export type ConfidenceLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
export type LeadershipDecision =
  | 'Observe'
  | 'Approach'
  | 'Need More Evidence'
  | 'Park'
  | 'Disqualify';

/** One qualified account — a single row of the Excel-replacement sheet. */
export type ICPRow = {
  id: string;
  project: string;
  market: string;
  targetDomain: string;
  icpModel: string;
  tier: Tier;
  companyName: string;
  industry: string;
  companyType: string;
  employee: string;
  revenueBand: string;
  primaryScenario: string;
  secondaryScenario: string;
  strategicIntent: StrategicIntent;
  expectedBuyer: string;
  expectedOffering: string;
  match: MatchWithStrategy;
  evidence: string;
  confidence: ConfidenceLevel;
  decision: LeadershipDecision;
  notes: string;
};

/** The six workflow stages (A→F) every column of the sheet belongs to. */
export type WorkflowKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type ColumnDef = {
  key: keyof ICPRow;
  label: string;
  group: WorkflowKey;
  width: number;
  /** Fixed option list renders a <select>; omitted means free text. */
  options?: readonly string[];
  /** Longer free-text fields get a wider editor. */
  multiline?: boolean;
};

export type TabKey = 'dashboard' | 'sheet' | 'gtm' | 'library';
