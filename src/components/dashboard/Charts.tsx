import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '../ui/Card';
import { CONFIDENCE_COLOR, INTENT_COLOR, TIER_COLOR } from '../../data/options';
import { countByConfidence, countByIndustry, countByIntent, countByTier } from '../../lib/metrics';
import type { ConfidenceLevel, ICPRow, StrategicIntent, Tier } from '../../types';

const AXIS = { fontSize: 11, fill: '#0A193180' } as const;

const tooltipStyle = {
  borderRadius: 14,
  border: '1px solid rgba(10,25,49,.08)',
  boxShadow: '0 12px 32px rgba(10,25,49,.12)',
  fontSize: 12,
  padding: '8px 12px',
};

function EmptyState() {
  return (
    <div className="flex h-[240px] items-center justify-center text-[12px] text-ink/35">
      No accounts yet — add one to see this chart.
    </div>
  );
}

export function TierDonut({ rows }: { rows: ICPRow[] }) {
  const data = countByTier(rows).filter((slice) => slice.value > 0);

  return (
    <Card title="Tier Distribution" subtitle="How the pipeline splits across tiers">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={86}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((slice) => (
                <Cell key={slice.name} fill={TIER_COLOR[slice.name as Tier]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export function IndustryBars({ rows }: { rows: ICPRow[] }) {
  const data = countByIndustry(rows);

  return (
    <Card title="Industry Distribution" subtitle="Accounts per industry">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={AXIS} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={AXIS} />
            <Tooltip cursor={{ fill: 'rgba(43,92,255,.06)' }} contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#2B5CFF" radius={[8, 8, 4, 4]} maxBarSize={38} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export function ConfidenceBars({ rows }: { rows: ICPRow[] }) {
  const data = countByConfidence(rows);

  return (
    <Card title="Confidence Level L1-L5" subtitle="Evidence strength across the sheet">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={AXIS} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={AXIS} />
          <Tooltip cursor={{ fill: 'rgba(43,92,255,.06)' }} contentStyle={tooltipStyle} />
          <Bar dataKey="value" radius={[8, 8, 4, 4]} maxBarSize={38}>
            {data.map((bar) => (
              <Cell key={bar.name} fill={CONFIDENCE_COLOR[bar.name as ConfidenceLevel]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function IntentPie({ rows }: { rows: ICPRow[] }) {
  const data = countByIntent(rows);

  return (
    <Card title="Strategic Intent" subtitle="What these companies are trying to achieve">
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={86} stroke="none">
              {data.map((slice) => (
                <Cell key={slice.name} fill={INTENT_COLOR[slice.name as StrategicIntent]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
