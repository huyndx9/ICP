import type { ColumnDef } from '../types';
import {
  COMPANY_TYPES,
  CONFIDENCE_LEVELS,
  DECISIONS,
  EMPLOYEE_BANDS,
  EXPECTED_OFFERINGS,
  ICP_MODELS,
  MARKETS,
  MATCHES,
  REVENUE_BANDS,
  STRATEGIC_INTENTS,
  TIERS,
} from './options';

/** Sheet layout, in Excel order. `group` drives the colored sticky header band. */
export const COLUMNS: readonly ColumnDef[] = [
  { key: 'project', label: 'Project', group: 'A', width: 168 },
  { key: 'market', label: 'Market', group: 'A', width: 104, options: MARKETS },
  { key: 'targetDomain', label: 'Target Domain', group: 'A', width: 150 },
  { key: 'icpModel', label: 'ICP Model', group: 'A', width: 176, options: ICP_MODELS },
  { key: 'tier', label: 'Tier', group: 'A', width: 104, options: TIERS },
  { key: 'companyName', label: 'Company Name', group: 'B', width: 160 },
  { key: 'industry', label: 'Industry', group: 'B', width: 150 },
  { key: 'companyType', label: 'Company Type', group: 'B', width: 150, options: COMPANY_TYPES },
  { key: 'employee', label: 'Employee', group: 'B', width: 116, options: EMPLOYEE_BANDS },
  { key: 'revenueBand', label: 'Revenue Band', group: 'B', width: 140, options: REVENUE_BANDS },
  { key: 'primaryScenario', label: 'Primary Buying Scenario', group: 'C', width: 200 },
  { key: 'secondaryScenario', label: 'Secondary Buying Scenario', group: 'C', width: 230, multiline: true },
  { key: 'strategicIntent', label: 'Strategic Intent', group: 'C', width: 140, options: STRATEGIC_INTENTS },
  { key: 'expectedBuyer', label: 'Expected Buyer', group: 'C', width: 160 },
  { key: 'expectedOffering', label: 'Expected Offering', group: 'C', width: 176, options: EXPECTED_OFFERINGS },
  { key: 'match', label: 'Match With Strategy', group: 'D', width: 172, options: MATCHES },
  { key: 'evidence', label: 'Evidence Source', group: 'E', width: 170 },
  { key: 'confidence', label: 'Confidence', group: 'E', width: 128, options: CONFIDENCE_LEVELS },
  { key: 'decision', label: 'Leadership Decision', group: 'F', width: 180, options: DECISIONS },
  { key: 'notes', label: 'Notes', group: 'F', width: 260, multiline: true },
] as const;

/** The first two columns stay frozen like in Excel: row number + Project. */
export const ROW_NUMBER_WIDTH = 56;
export const FROZEN_COLUMN_COUNT = 1;

/** Columns grouped into contiguous header bands (A→F), preserving sheet order. */
export const COLUMN_GROUPS = COLUMNS.reduce<{ group: ColumnDef['group']; columns: ColumnDef[] }[]>(
  (bands, column) => {
    const last = bands[bands.length - 1];
    if (last && last.group === column.group) {
      last.columns.push(column);
      return bands;
    }
    return [...bands, { group: column.group, columns: [column] }];
  },
  [],
);
