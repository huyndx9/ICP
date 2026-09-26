import type { WorkflowKey } from '../types';

export type WorkflowStage = {
  key: WorkflowKey;
  label: string;
  color: string;
  /** Tint used for the sheet's grouped header band. */
  tint: string;
};

export const WORKFLOW: readonly WorkflowStage[] = [
  { key: 'A', label: 'STRATEGY ASSIGNMENT', color: '#2B5CFF', tint: '#EEF3FF' },
  { key: 'B', label: 'COMPANY INFORMATION', color: '#2ECC8F', tint: '#EAFAF3' },
  { key: 'C', label: 'GTM HYPOTHESIS', color: '#FF8C21', tint: '#FFF3E6' },
  { key: 'D', label: 'STRATEGY ALIGNMENT', color: '#7C5CFF', tint: '#F2EFFF' },
  { key: 'E', label: 'EVIDENCE & CONFIDENCE', color: '#00B8D9', tint: '#E6F8FC' },
  { key: 'F', label: 'LEADERSHIP DECISION', color: '#1A2B6B', tint: '#EAEDF6' },
] as const;

export const STAGE_BY_KEY: Record<WorkflowKey, WorkflowStage> = WORKFLOW.reduce(
  (acc, stage) => ({ ...acc, [stage.key]: stage }),
  {} as Record<WorkflowKey, WorkflowStage>,
);
