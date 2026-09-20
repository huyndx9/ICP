import { Plus, Search } from 'lucide-react';
import { SegmentedControl } from './ui/SegmentedControl';
import { WorkflowBar } from './WorkflowBar';
import type { TabKey } from '../types';

const TABS: readonly { key: TabKey; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'sheet', label: 'Qualification Sheet' },
  { key: 'gtm', label: 'GTM Framework' },
  { key: 'library', label: 'Library' },
];

type HeaderProps = {
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onAddAccount: () => void;
};

export function Header({ tab, onTabChange, query, onQueryChange, onAddAccount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/[.06] bg-white/75 backdrop-blur-xl">
      <div className="mx-auto max-w-[1680px] px-4 pt-4 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-[17px] font-semibold tracking-tight sm:text-[19px]">
              ICP QUALIFICATION – BD WORKING KIT{' '}
              <span className="text-ink/35">(EXCEL TEMPLATE DEMO)</span>
            </h1>
            <p className="mt-0.5 text-[12px] text-ink/50">
              Capture Correctly. Compare Clearly. Improve Continuously.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="relative flex-1 lg:w-64 lg:flex-none">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search accounts…"
                className="ios-input w-full pl-9"
                aria-label="Search accounts"
              />
            </label>
            <button
              onClick={onAddAccount}
              className="ios-pill bg-flowA px-4 text-white shadow-ios hover:bg-[#1F4CE8]"
            >
              <Plus className="h-4 w-4" />
              Add Account
            </button>
          </div>
        </div>

        <WorkflowBar />

        <div className="ios-scroll -mx-1 overflow-x-auto px-1 pb-3">
          <SegmentedControl segments={TABS} value={tab} onChange={onTabChange} />
        </div>
      </div>
    </header>
  );
}
