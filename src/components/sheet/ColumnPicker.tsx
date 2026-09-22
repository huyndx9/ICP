import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Columns3, Lock } from 'lucide-react';
import { COLUMNS, COLUMN_GROUPS, LOCKED_COLUMN } from '../../data/columns';
import { STAGE_BY_KEY } from '../../data/workflow';
import type { ICPRow } from '../../types';

type ColumnPickerProps = {
  hidden: (keyof ICPRow)[];
  onHiddenChange: (hidden: (keyof ICPRow)[]) => void;
};

/** Picks which of the 20 columns the sheet shows, one by one or a whole A→F band. */
export function ColumnPicker({ hidden, onHiddenChange }: ColumnPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  // The sheet card clips its overflow, so the popover lives at the document
  // level and is placed against the button's box instead.
  const [anchor, setAnchor] = useState({ top: 0, right: 0 });

  const place = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setAnchor({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target) && !popoverRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [open]);

  const hiddenSet = new Set(hidden);
  const visibleCount = COLUMNS.length - hiddenSet.size;

  const setHidden = (next: Set<keyof ICPRow>) => {
    next.delete(LOCKED_COLUMN);
    onHiddenChange(COLUMNS.map((column) => column.key).filter((key) => next.has(key)));
  };

  const toggleColumn = (key: keyof ICPRow) => {
    const next = new Set(hiddenSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setHidden(next);
  };

  const toggleBand = (keys: (keyof ICPRow)[], show: boolean) => {
    const next = new Set(hiddenSet);
    keys.forEach((key) => (show ? next.delete(key) : next.add(key)));
    setHidden(next);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="ios-pill bg-black/[.04] text-ink/70 hover:bg-black/[.07]"
        title="Choose which columns the sheet shows"
      >
        <Columns3 className="h-4 w-4" />
        Columns
        <span className="tabular-nums text-ink/40">
          {visibleCount}/{COLUMNS.length}
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            className="ios-scroll animate-pop-in fixed z-[80] max-h-[70vh] w-72 overflow-y-auto rounded-ios border border-black/[.06] bg-white p-2 shadow-ios-lg"
            style={{ top: anchor.top, right: anchor.right }}
          >
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">
              Columns
            </span>
            <button
              onClick={() => onHiddenChange([])}
              className="rounded-full px-2 py-1 text-[11px] font-medium text-flowA hover:bg-flowA/[.08]"
            >
              Show all
            </button>
          </div>

          {COLUMN_GROUPS.map((band) => {
            const stage = STAGE_BY_KEY[band.group];
            const keys = band.columns.map((column) => column.key);
            const allShown = keys.every((key) => !hiddenSet.has(key));

            return (
              <section key={band.group} className="mt-1">
                <header className="flex items-center justify-between gap-2 rounded-lg px-2 py-1">
                  <span
                    className="truncate text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: stage.color }}
                  >
                    {stage.key}. {stage.label}
                  </span>
                  <button
                    onClick={() => toggleBand(keys, !allShown)}
                    className="flex-none rounded-full px-2 py-0.5 text-[11px] font-medium text-ink/45 hover:bg-black/[.05] hover:text-ink/70"
                  >
                    {allShown ? 'Hide' : 'Show'}
                  </button>
                </header>

                {band.columns.map((column) => {
                  const locked = column.key === LOCKED_COLUMN;
                  const shown = !hiddenSet.has(column.key);
                  return (
                    <button
                      key={column.key}
                      onClick={() => !locked && toggleColumn(column.key)}
                      disabled={locked}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12.5px] transition ${
                        locked ? 'cursor-default text-ink/35' : 'hover:bg-black/[.04]'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 flex-none items-center justify-center rounded-[5px] border transition ${
                          shown
                            ? 'border-flowA bg-flowA text-white'
                            : 'border-black/[.15] bg-white text-transparent'
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="truncate">{column.label}</span>
                      {locked && <Lock className="ml-auto h-3 w-3 flex-none" />}
                    </button>
                  );
                })}
              </section>
            );
          })}
          </div>,
          document.body,
        )}
    </div>
  );
}
