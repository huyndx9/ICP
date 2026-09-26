import type { ConfidenceLevel, LeadershipDecision, MatchWithStrategy, StrategicIntent, Tier } from '../types';

export const TIERS: readonly Tier[] = ['Tier 1', 'Tier 2', 'Tier 3'];

export const ICP_MODELS = [
  'Traditional Extension',
  'Digital Native',
  'Platform Player',
  'Public Sector',
] as const;

export const COMPANY_TYPES = ['Traditional', 'Digital Native', 'Enterprise', 'SME', 'Public'] as const;

export const EMPLOYEE_BANDS = ['< 500', '500+', '1,000+', '2,000+', '5,000+', '10,000+'] as const;

export const REVENUE_BANDS = [
  '< $50M',
  '$50M-$100M',
  '$100M-$500M',
  '> $500M',
  '> $1B',
] as const;

export const STRATEGIC_INTENTS: readonly StrategicIntent[] = [
  'Grow',
  'Optimize',
  'Transform',
  'Protect',
  'Innovate',
];

export const EXPECTED_OFFERINGS = [
  'Custom Solution',
  'Team-based Service',
  'Consulting + Solution',
  'Managed Service',
  'Staff Augmentation',
  'Product Licence',
] as const;

export const MATCHES: readonly MatchWithStrategy[] = [
  'Perfect Match',
  'Heavily Match',
  'Partial Match',
  'New Opportunity',
  'No Match',
];

export const CONFIDENCE_LEVELS: readonly ConfidenceLevel[] = ['L1', 'L2', 'L3', 'L4', 'L5'];

export const DECISIONS: readonly LeadershipDecision[] = [
  'Observe',
  'Approach',
  'Need More Evidence',
  'Park',
  'Disqualify',
];

/** Badge palette for the Confidence column (L1 → L5 = weakest → strongest evidence). */
export const CONFIDENCE_STYLE: Record<ConfidenceLevel, { bg: string; fg: string; label: string }> = {
  L1: { bg: '#FEE2E2', fg: '#B91C1C', label: 'Assumption' },
  L2: { bg: '#FFEDD5', fg: '#C2410C', label: 'Weak Signal' },
  L3: { bg: '#FEF9C3', fg: '#A16207', label: 'Public Evidence' },
  L4: { bg: '#DCFCE7', fg: '#15803D', label: 'Validated Signal' },
  L5: { bg: '#16A34A', fg: '#FFFFFF', label: 'Confirmed by Customer' },
};

export const TIER_STYLE: Record<Tier, { bg: string; fg: string }> = {
  'Tier 1': { bg: '#EEF3FF', fg: '#2B5CFF' },
  'Tier 2': { bg: '#EAFAF3', fg: '#12805C' },
  'Tier 3': { bg: '#F1F2F6', fg: '#5A6478' },
};

export const MATCH_STYLE: Record<MatchWithStrategy, { bg: string; fg: string }> = {
  'Perfect Match': { bg: '#DCFCE7', fg: '#15803D' },
  'Heavily Match': { bg: '#E6F8FC', fg: '#0E7490' },
  'Partial Match': { bg: '#FEF9C3', fg: '#A16207' },
  'New Opportunity': { bg: '#F2EFFF', fg: '#5B3FD6' },
  'No Match': { bg: '#FEE2E2', fg: '#B91C1C' },
};

export const DECISION_STYLE: Record<LeadershipDecision, { bg: string; fg: string }> = {
  Observe: { bg: '#EAEDF6', fg: '#1A2B6B' },
  Approach: { bg: '#DCFCE7', fg: '#15803D' },
  'Need More Evidence': { bg: '#FFEDD5', fg: '#C2410C' },
  Park: { bg: '#F1F2F6', fg: '#5A6478' },
  Disqualify: { bg: '#FEE2E2', fg: '#B91C1C' },
};

export const INTENT_COLOR: Record<StrategicIntent, string> = {
  Grow: '#2ECC8F',
  Optimize: '#2B5CFF',
  Transform: '#7C5CFF',
  Protect: '#FF8C21',
  Innovate: '#00B8D9',
};

export const TIER_COLOR: Record<Tier, string> = {
  'Tier 1': '#2B5CFF',
  'Tier 2': '#2ECC8F',
  'Tier 3': '#C7CCD9',
};

export const CONFIDENCE_COLOR: Record<ConfidenceLevel, string> = {
  L1: '#F87171',
  L2: '#FB923C',
  L3: '#FACC15',
  L4: '#4ADE80',
  L5: '#16A34A',
};
