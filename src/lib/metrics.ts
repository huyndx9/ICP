import { CONFIDENCE_LEVELS, STRATEGIC_INTENTS, TIERS } from '../data/options';
import type { ICPRow } from '../types';

export type Kpis = {
  total: number;
  tier1: number;
  avgConfidence: number;
  perfectMatchRate: number;
};

const confidenceScore = (row: ICPRow) => Number(row.confidence.slice(1));

export function computeKpis(rows: ICPRow[]): Kpis {
  const total = rows.length;
  if (total === 0) {
    return { total: 0, tier1: 0, avgConfidence: 0, perfectMatchRate: 0 };
  }

  const strongMatches = rows.filter(
    (row) => row.match === 'Perfect Match' || row.match === 'Heavily Match',
  ).length;

  return {
    total,
    tier1: rows.filter((row) => row.tier === 'Tier 1').length,
    avgConfidence: rows.reduce((sum, row) => sum + confidenceScore(row), 0) / total,
    perfectMatchRate: Math.round((strongMatches / total) * 100),
  };
}

export function countByTier(rows: ICPRow[]) {
  return TIERS.map((tier) => ({
    name: tier,
    value: rows.filter((row) => row.tier === tier).length,
  }));
}

export function countByMarket(rows: ICPRow[]) {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    const market = row.market || '—';
    counts.set(market, (counts.get(market) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function countByConfidence(rows: ICPRow[]) {
  return CONFIDENCE_LEVELS.map((level) => ({
    name: level,
    value: rows.filter((row) => row.confidence === level).length,
  }));
}

export function countByIntent(rows: ICPRow[]) {
  return STRATEGIC_INTENTS.map((intent) => ({
    name: intent,
    value: rows.filter((row) => row.strategicIntent === intent).length,
  })).filter((slice) => slice.value > 0);
}
