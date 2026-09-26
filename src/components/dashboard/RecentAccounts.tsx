import { ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CONFIDENCE_STYLE, DECISION_STYLE, MATCH_STYLE, TIER_STYLE } from '../../data/options';
import type { ICPRow } from '../../types';

type RecentAccountsProps = {
  rows: ICPRow[];
  onOpenSheet: () => void;
};

export function RecentAccounts({ rows, onOpenSheet }: RecentAccountsProps) {
  const recent = rows.slice(-6).reverse();

  return (
    <Card
      title="Recent Accounts"
      subtitle="Latest rows captured in the qualification sheet"
      action={
        <button
          onClick={onOpenSheet}
          className="ios-pill bg-black/[.04] px-3 text-ink/70 hover:bg-black/[.07]"
        >
          Open sheet
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      }
    >
      {recent.length === 0 ? (
        <p className="py-10 text-center text-[12px] text-ink/35">
          No accounts yet — use “+ Add Account” to start.
        </p>
      ) : (
        <div className="ios-scroll -mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-[13px]">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink/40">
                <th className="pb-2 pr-3 font-semibold">Company</th>
                <th className="pb-2 pr-3 font-semibold">Tier</th>
                <th className="pb-2 pr-3 font-semibold">Match</th>
                <th className="pb-2 pr-3 font-semibold">Confidence</th>
                <th className="pb-2 font-semibold">Decision</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((row) => (
                <tr key={row.id} className="group">
                  <td className="border-t border-black/[.05] py-2.5 pr-3">
                    <p className="font-medium">{row.companyName || 'Untitled account'}</p>
                    <p className="text-[11px] text-ink/45">
                      {row.project}
                      {row.industry ? ` · ${row.industry}` : ''}
                    </p>
                  </td>
                  <td className="border-t border-black/[.05] py-2.5 pr-3">
                    <Badge label={row.tier} {...TIER_STYLE[row.tier]} />
                  </td>
                  <td className="border-t border-black/[.05] py-2.5 pr-3">
                    <Badge label={row.match} {...MATCH_STYLE[row.match]} />
                  </td>
                  <td className="border-t border-black/[.05] py-2.5 pr-3">
                    <Badge
                      label={row.confidence}
                      bg={CONFIDENCE_STYLE[row.confidence].bg}
                      fg={CONFIDENCE_STYLE[row.confidence].fg}
                      title={CONFIDENCE_STYLE[row.confidence].label}
                    />
                  </td>
                  <td className="border-t border-black/[.05] py-2.5">
                    <Badge label={row.decision} {...DECISION_STYLE[row.decision]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
