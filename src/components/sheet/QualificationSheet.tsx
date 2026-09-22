import { Fragment, useEffect, useState } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { EditableCell } from './EditableCell';
import { SheetToolbar } from './SheetToolbar';
import type { SheetFilters } from './SheetToolbar';
import { COLUMNS, COLUMN_GROUPS, ROW_NUMBER_WIDTH } from '../../data/columns';
import { STAGE_BY_KEY } from '../../data/workflow';
import { CONFIDENCE_STYLE } from '../../data/options';
import type { ICPRow } from '../../types';

const GROUP_ROW_HEIGHT = 34;
const ACTIONS_WIDTH = 84;

/** Left offset of the second frozen column (Project) = row-number width. */
const PROJECT_LEFT = ROW_NUMBER_WIDTH;

/** Band labels stick just past the frozen columns so they never slide under them. */
const LABEL_STICKY_LEFT = ROW_NUMBER_WIDTH + COLUMNS[0].width + 12;

type QualificationSheetProps = {
  rows: ICPRow[];
  filters: SheetFilters;
  onFiltersChange: (filters: SheetFilters) => void;
  totalCount: number;
  onUpdateCell: (id: string, key: keyof ICPRow, value: string) => void;
  onAddRow: () => void;
  onDuplicateRow: (id: string) => void;
  onDeleteRow: (id: string) => void;
  onExport: () => void;
  onReset: () => void;
};

export function QualificationSheet({
  rows,
  filters,
  onFiltersChange,
  totalCount,
  onUpdateCell,
  onAddRow,
  onDuplicateRow,
  onDeleteRow,
  onExport,
  onReset,
}: QualificationSheetProps) {
  const projectColumn = COLUMNS[0];
  const scrollingColumns = COLUMNS.slice(1);
  // Full screen gives the 20 columns the whole viewport instead of the page's
  // remaining strip, so far fewer of them sit behind a scrollbar.
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    // Stop the page behind the overlay from scrolling along with the sheet.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [fullscreen]);

  return (
    <div
      className={
        fullscreen
          ? 'fixed inset-0 z-[60] flex flex-col overflow-hidden bg-white p-0'
          : 'ios-card animate-fade-up overflow-hidden p-0'
      }
    >
      <SheetToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        visibleCount={rows.length}
        totalCount={totalCount}
        onAddRow={onAddRow}
        onExport={onExport}
        onReset={onReset}
        fullscreen={fullscreen}
        onToggleFullscreen={() => setFullscreen((current) => !current)}
      />

      <div
        className={`ios-scroll overflow-auto ${
          fullscreen ? 'flex-1' : 'max-h-[calc(100vh-320px)]'
        }`}
      >
        <table className="w-max border-separate border-spacing-0 text-[12px]">
          <thead>
            {/* Band row: the A→F workflow stage each column belongs to. */}
            <tr>
              <th
                className="sticky left-0 top-0 z-40 border-b border-r border-black/[.06] bg-white"
                style={{ width: ROW_NUMBER_WIDTH, minWidth: ROW_NUMBER_WIDTH, height: GROUP_ROW_HEIGHT }}
              />
              {COLUMN_GROUPS.map((band, bandIndex) => {
                const stage = STAGE_BY_KEY[band.group];
                // Band A opens with the frozen Project column, so its label rides
                // along in that frozen cell and stays readable while scrolling.
                const isFrozenBand = bandIndex === 0;
                const scrollingSpan = band.columns.length - (isFrozenBand ? 1 : 0);
                return (
                  <Fragment key={band.group}>
                    {isFrozenBand && (
                      <th
                        className="sticky top-0 z-40 truncate border-b border-r border-black/[.06] px-3 text-left text-[9.5px] font-bold uppercase tracking-wide"
                        style={{
                          left: PROJECT_LEFT,
                          width: projectColumn.width,
                          minWidth: projectColumn.width,
                          height: GROUP_ROW_HEIGHT,
                          backgroundColor: stage.tint,
                          color: stage.color,
                        }}
                      >
                        {stage.key}. {stage.label}
                      </th>
                    )}
                    {scrollingSpan > 0 && (
                      <th
                        colSpan={scrollingSpan}
                        className="sticky top-0 z-30 border-b border-r border-black/[.06] px-3 text-left text-[9.5px] font-bold uppercase tracking-wide"
                        style={{
                          height: GROUP_ROW_HEIGHT,
                          backgroundColor: stage.tint,
                          color: stage.color,
                        }}
                      >
                        {/* Sticky inside the band so the label stays readable
                            while the band scrolls past the frozen columns. */}
                        <span
                          className="sticky whitespace-nowrap"
                          style={{ left: LABEL_STICKY_LEFT }}
                        >
                          {isFrozenBand ? '' : `${stage.key}. ${stage.label}`}
                        </span>
                      </th>
                    )}
                  </Fragment>
                );
              })}
              <th
                className="sticky right-0 top-0 z-40 border-b border-l border-black/[.06] bg-white"
                style={{ width: ACTIONS_WIDTH, minWidth: ACTIONS_WIDTH, height: GROUP_ROW_HEIGHT }}
              />
            </tr>

            {/* Column row. */}
            <tr>
              <th
                className="sticky left-0 z-40 border-b border-r border-black/[.06] bg-white px-3 py-2 text-left text-[11px] font-semibold text-ink/45"
                style={{ top: GROUP_ROW_HEIGHT, width: ROW_NUMBER_WIDTH, minWidth: ROW_NUMBER_WIDTH }}
              >
                No
              </th>
              <th
                className="sticky z-40 border-b border-r border-black/[.06] bg-white px-3 py-2 text-left text-[11px] font-semibold text-ink/70"
                style={{
                  top: GROUP_ROW_HEIGHT,
                  left: PROJECT_LEFT,
                  width: projectColumn.width,
                  minWidth: projectColumn.width,
                }}
              >
                {projectColumn.label}
              </th>
              {scrollingColumns.map((column) => (
                <th
                  key={column.key}
                  className="sticky z-30 border-b border-r border-black/[.06] bg-white px-3 py-2 text-left text-[11px] font-semibold text-ink/70"
                  style={{ top: GROUP_ROW_HEIGHT, width: column.width, minWidth: column.width }}
                >
                  {column.label}
                </th>
              ))}
              <th
                className="sticky right-0 z-40 border-b border-l border-black/[.06] bg-white px-3 py-2 text-[11px] font-semibold text-ink/45"
                style={{ top: GROUP_ROW_HEIGHT, width: ACTIONS_WIDTH, minWidth: ACTIONS_WIDTH }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => {
              // Zebra striping has to be an explicit color: frozen cells paint
              // their own background over the scrolling ones.
              const stripe = index % 2 === 0 ? '#FFFFFF' : '#FAFBFD';
              return (
                <tr key={row.id} className="group">
                  <td
                    className="sticky left-0 z-20 border-b border-r border-black/[.05] px-3 py-1.5 text-[11px] tabular-nums text-ink/35 transition-colors group-hover:bg-[#F3F6FF]"
                    style={{ backgroundColor: stripe, width: ROW_NUMBER_WIDTH, minWidth: ROW_NUMBER_WIDTH }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="sticky z-20 border-b border-r border-black/[.05] px-1.5 py-1.5 font-medium transition-colors group-hover:bg-[#F3F6FF]"
                    style={{
                      backgroundColor: stripe,
                      left: PROJECT_LEFT,
                      width: projectColumn.width,
                      minWidth: projectColumn.width,
                    }}
                  >
                    <EditableCell
                      column={projectColumn}
                      value={String(row[projectColumn.key] ?? '')}
                      rowLabel={`row ${index + 1}`}
                      onChange={(value) => onUpdateCell(row.id, projectColumn.key, value)}
                    />
                  </td>

                  {scrollingColumns.map((column) => (
                    <td
                      key={column.key}
                      className="border-b border-r border-black/[.05] px-1.5 py-1.5 align-middle transition-colors group-hover:bg-[#F3F6FF]"
                      style={{
                        backgroundColor: stripe,
                        width: column.width,
                        minWidth: column.width,
                      }}
                      title={
                        column.key === 'confidence'
                          ? CONFIDENCE_STYLE[row.confidence].label
                          : undefined
                      }
                    >
                      <EditableCell
                        column={column}
                        value={String(row[column.key] ?? '')}
                        rowLabel={`row ${index + 1}`}
                        onChange={(value) => onUpdateCell(row.id, column.key, value)}
                      />
                    </td>
                  ))}

                  <td
                    className="sticky right-0 z-20 border-b border-l border-black/[.05] px-2 py-1.5 transition-colors group-hover:bg-[#F3F6FF]"
                    style={{ backgroundColor: stripe, width: ACTIONS_WIDTH, minWidth: ACTIONS_WIDTH }}
                  >
                    <div className="flex items-center justify-center gap-1 opacity-40 transition group-hover:opacity-100">
                      <button
                        onClick={() => onDuplicateRow(row.id)}
                        title="Duplicate row"
                        className="rounded-lg p-1.5 text-ink/60 transition hover:bg-black/[.06] hover:text-flowA"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteRow(row.id)}
                        title="Delete row"
                        className="rounded-lg p-1.5 text-ink/60 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length + 2}
                  className="px-6 py-14 text-center text-[12px] text-ink/35"
                >
                  No rows match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
