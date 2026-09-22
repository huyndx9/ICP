import { Download, Filter, Maximize2, Minimize2, Plus, RotateCcw } from 'lucide-react';
import { CONFIDENCE_LEVELS, MARKETS, TIERS } from '../../data/options';

export type SheetFilters = {
  market: string;
  tier: string;
  confidence: string;
};

type SheetToolbarProps = {
  filters: SheetFilters;
  onFiltersChange: (filters: SheetFilters) => void;
  visibleCount: number;
  totalCount: number;
  onAddRow: () => void;
  onExport: () => void;
  onReset: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={`Filter by ${label}`}
      className="ios-input cursor-pointer appearance-none pr-8"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230A193166' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
      }}
    >
      <option value="All">{label}: All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function SheetToolbar({
  filters,
  onFiltersChange,
  visibleCount,
  totalCount,
  onAddRow,
  onExport,
  onReset,
  fullscreen,
  onToggleFullscreen,
}: SheetToolbarProps) {
  const set = (patch: Partial<SheetFilters>) => onFiltersChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-black/[.06] px-4 py-3">
      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink/45">
        <Filter className="h-3.5 w-3.5" />
        Filters
      </span>

      <FilterSelect
        label="Market"
        value={filters.market}
        options={MARKETS}
        onChange={(market) => set({ market })}
      />
      <FilterSelect
        label="Tier"
        value={filters.tier}
        options={TIERS}
        onChange={(tier) => set({ tier })}
      />
      <FilterSelect
        label="Confidence"
        value={filters.confidence}
        options={CONFIDENCE_LEVELS}
        onChange={(confidence) => set({ confidence })}
      />

      <span className="text-[12px] text-ink/40">
        {visibleCount} of {totalCount} rows
      </span>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onToggleFullscreen}
          className="ios-pill bg-black/[.04] text-ink/70 hover:bg-black/[.07]"
          title={fullscreen ? 'Exit full screen (Esc)' : 'View the sheet full screen'}
        >
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {fullscreen ? 'Exit full screen' : 'Full screen'}
        </button>
        <button
          onClick={onReset}
          className="ios-pill bg-black/[.04] text-ink/60 hover:bg-black/[.07]"
          title="Restore the demo rows"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          onClick={onExport}
          className="ios-pill bg-black/[.04] text-ink/70 hover:bg-black/[.07]"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
        <button onClick={onAddRow} className="ios-pill bg-flowA text-white hover:bg-[#1F4CE8]">
          <Plus className="h-4 w-4" />
          Add row
        </button>
      </div>
    </div>
  );
}
