import { Building2, Gauge, Sparkles, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Kpis } from '../../lib/metrics';

type Tile = {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  color: string;
  tint: string;
};

export function KpiCards({ kpis }: { kpis: Kpis }) {
  const tiles: Tile[] = [
    {
      label: 'Total Accounts',
      value: String(kpis.total),
      hint: 'Rows captured in the sheet',
      icon: Building2,
      color: '#2B5CFF',
      tint: '#EEF3FF',
    },
    {
      label: 'Tier 1',
      value: String(kpis.tier1),
      hint: 'Core ICP fit, weekly cadence',
      icon: Target,
      color: '#2ECC8F',
      tint: '#EAFAF3',
    },
    {
      label: 'Avg Confidence',
      value: kpis.total ? kpis.avgConfidence.toFixed(1) : '—',
      hint: 'Across evidence, L1 → L5',
      icon: Gauge,
      color: '#FF8C21',
      tint: '#FFF3E6',
    },
    {
      label: 'Match Rate',
      value: `${kpis.perfectMatchRate}%`,
      hint: 'Perfect or Heavily Match',
      icon: Sparkles,
      color: '#7C5CFF',
      tint: '#F2EFFF',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tiles.map((tile) => (
        <div key={tile.label} className="ios-card animate-fade-up p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-medium text-ink/50">{tile.label}</p>
              <p className="mt-2 text-[32px] font-semibold leading-none tracking-tight">
                {tile.value}
              </p>
            </div>
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: tile.tint, color: tile.color }}
            >
              <tile.icon className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-3 text-[11px] text-ink/40">{tile.hint}</p>
        </div>
      ))}
    </div>
  );
}
