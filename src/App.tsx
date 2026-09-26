import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { QualificationSheet } from './components/sheet/QualificationSheet';
import type { SheetFilters } from './components/sheet/SheetToolbar';
import { GtmFramework } from './components/gtm/GtmFramework';
import { LibraryTab } from './components/library/LibraryTab';
import { DEMO_ROWS } from './data/demo';
import { downloadCsv } from './lib/csv';
import { usePersistentState } from './lib/storage';
import type { ICPRow, TabKey } from './types';

const STORAGE_KEY = 'icp-bd-working-kit/rows';
const HIDDEN_COLUMNS_KEY = 'icp-bd-working-kit/hidden-columns';

const EMPTY_FILTERS: SheetFilters = { tier: 'All', confidence: 'All' };

const createId = () => `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function blankRow(index: number): ICPRow {
  return {
    id: createId(),
    project: `Project ${String.fromCharCode(65 + (index % 26))}`,
    targetDomain: '',
    icpModel: 'Traditional Extension',
    tier: 'Tier 2',
    companyName: '',
    industry: '',
    companyType: 'Traditional',
    employee: '1,000+',
    revenueBand: '$50M-$100M',
    primaryScenario: '',
    secondaryScenario: '',
    strategicIntent: 'Grow',
    expectedBuyer: '',
    expectedOffering: 'Custom Solution',
    match: 'New Opportunity',
    evidence: '',
    confidence: 'L1',
    decision: 'Observe',
    notes: '',
  };
}

export default function App() {
  const [rows, setRows] = usePersistentState<ICPRow[]>(STORAGE_KEY, DEMO_ROWS);
  const [hiddenColumns, setHiddenColumns] = usePersistentState<(keyof ICPRow)[]>(
    HIDDEN_COLUMNS_KEY,
    [],
  );
  const [tab, setTab] = useState<TabKey>('dashboard');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SheetFilters>(EMPTY_FILTERS);

  const searched = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [rows, query]);

  const visibleRows = useMemo(
    () =>
      searched.filter(
        (row) =>
          (filters.tier === 'All' || row.tier === filters.tier) &&
          (filters.confidence === 'All' || row.confidence === filters.confidence),
      ),
    [searched, filters],
  );

  const addRow = () => {
    setRows((current) => [...current, blankRow(current.length)]);
    setTab('sheet');
  };

  const updateCell = (id: string, key: keyof ICPRow, value: string) =>
    setRows((current) =>
      current.map((row) => (row.id === id ? ({ ...row, [key]: value } as ICPRow) : row)),
    );

  const duplicateRow = (id: string) =>
    setRows((current) => {
      const index = current.findIndex((row) => row.id === id);
      if (index === -1) return current;
      const copy: ICPRow = {
        ...current[index],
        id: createId(),
        companyName: `${current[index].companyName} (copy)`.trim(),
      };
      return [...current.slice(0, index + 1), copy, ...current.slice(index + 1)];
    });

  const deleteRow = (id: string) => setRows((current) => current.filter((row) => row.id !== id));

  const resetRows = () => {
    if (window.confirm('Restore the 4 demo rows? Rows you added will be removed.')) {
      setRows(DEMO_ROWS);
      setFilters(EMPTY_FILTERS);
      setQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header
        tab={tab}
        onTabChange={setTab}
        query={query}
        onQueryChange={setQuery}
        onAddAccount={addRow}
      />

      <main className="mx-auto max-w-[1680px] px-4 py-5 sm:px-6">
        {tab === 'dashboard' && (
          <Dashboard rows={searched} onOpenSheet={() => setTab('sheet')} />
        )}

        {tab === 'sheet' && (
          <QualificationSheet
            rows={visibleRows}
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={rows.length}
            onUpdateCell={updateCell}
            onAddRow={addRow}
            onDuplicateRow={duplicateRow}
            onDeleteRow={deleteRow}
            onExport={() => downloadCsv(visibleRows)}
            onReset={resetRows}
            hiddenColumns={hiddenColumns}
            onHiddenColumnsChange={setHiddenColumns}
          />
        )}

        {tab === 'gtm' && <GtmFramework />}

        {tab === 'library' && <LibraryTab />}

        <footer className="py-8 text-center text-[11px] text-ink/30">
          Capture Facts → Choose from Library → Update After Discovery → Leadership Turns Data into
          Strategy
        </footer>
      </main>
    </div>
  );
}
