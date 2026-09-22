import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { EditableCell } from './EditableCell';
import { COLUMN_GROUPS } from '../../data/columns';
import { STAGE_BY_KEY } from '../../data/workflow';
import { CONFIDENCE_STYLE } from '../../data/options';
import type { ICPRow } from '../../types';

type RowDetailPanelProps = {
  row: ICPRow;
  /** Position in the visible sheet, so the panel names the same row the grid does. */
  index: number;
  onUpdateCell: (id: string, key: keyof ICPRow, value: string) => void;
  onClose: () => void;
};

/** All 20 fields of one account, stacked — the sheet without the horizontal scroll. */
export function RowDetailPanel({ row, index, onUpdateCell, onClose }: RowDetailPanelProps) {
  // Rendered at the document level: the sheet card's backdrop-blur makes it a
  // containing block, which would otherwise trap a `fixed` panel inside it.
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[70] bg-ink/20 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label={`Account detail, row ${index + 1}`}
        className="ios-scroll animate-fade-up fixed inset-y-0 right-0 z-[71] w-full max-w-md overflow-y-auto border-l border-black/[.06] bg-white shadow-ios-lg"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-black/[.06] bg-white/85 px-5 py-4 backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-ink/40">
              Row {index + 1} · {row.project || 'No project'}
            </p>
            <h2 className="truncate text-[17px] font-semibold tracking-tight">
              {row.companyName || 'Untitled account'}
            </h2>
            <p className="mt-0.5 text-[11px] text-ink/45">
              {row.confidence} · {CONFIDENCE_STYLE[row.confidence].label}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close account detail"
            className="flex-none rounded-full p-2 text-ink/45 transition hover:bg-black/[.05] hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="space-y-5 px-5 py-5">
          {COLUMN_GROUPS.map((band) => {
            const stage = STAGE_BY_KEY[band.group];
            return (
              <section key={band.group}>
                <h3
                  className="mb-2 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: stage.color }}
                >
                  {stage.key}. {stage.label}
                </h3>
                <dl className="overflow-hidden rounded-2xl border border-black/[.05]">
                  {band.columns.map((column, columnIndex) => (
                    <div
                      key={column.key}
                      className={`grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-center gap-2 px-3 py-2 ${
                        columnIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFD]'
                      }`}
                    >
                      <dt className="truncate text-[11.5px] text-ink/50">{column.label}</dt>
                      <dd className="min-w-0">
                        <EditableCell
                          column={column}
                          value={String(row[column.key] ?? '')}
                          rowLabel="detail"
                          onChange={(value) => onUpdateCell(row.id, column.key, value)}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>
      </aside>
    </>,
    document.body,
  );
}
