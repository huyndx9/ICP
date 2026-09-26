import { KpiCards } from './KpiCards';
import { ConfidenceBars, IndustryBars, IntentPie, TierDonut } from './Charts';
import { RecentAccounts } from './RecentAccounts';
import { computeKpis } from '../../lib/metrics';
import type { ICPRow } from '../../types';

type DashboardProps = {
  rows: ICPRow[];
  onOpenSheet: () => void;
};

export function Dashboard({ rows, onOpenSheet }: DashboardProps) {
  const kpis = computeKpis(rows);

  return (
    <div className="space-y-4">
      <KpiCards kpis={kpis} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TierDonut rows={rows} />
        <IndustryBars rows={rows} />
        <ConfidenceBars rows={rows} />
        <IntentPie rows={rows} />
      </div>
      <RecentAccounts rows={rows} onOpenSheet={onOpenSheet} />
    </div>
  );
}
