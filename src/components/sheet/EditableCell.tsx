import { useEffect, useRef, useState } from 'react';
import {
  CONFIDENCE_STYLE,
  DECISION_STYLE,
  MATCH_STYLE,
  TIER_STYLE,
  INTENT_COLOR,
} from '../../data/options';
import type { ColumnDef, ICPRow } from '../../types';

/** Columns whose value carries a color chip, so the <select> renders as a badge. */
function badgeStyle(key: keyof ICPRow, value: string): { bg: string; fg: string } | null {
  switch (key) {
    case 'tier':
      return TIER_STYLE[value as keyof typeof TIER_STYLE] ?? null;
    case 'match':
      return MATCH_STYLE[value as keyof typeof MATCH_STYLE] ?? null;
    case 'confidence': {
      const style = CONFIDENCE_STYLE[value as keyof typeof CONFIDENCE_STYLE];
      return style ? { bg: style.bg, fg: style.fg } : null;
    }
    case 'decision':
      return DECISION_STYLE[value as keyof typeof DECISION_STYLE] ?? null;
    case 'strategicIntent': {
      const color = INTENT_COLOR[value as keyof typeof INTENT_COLOR];
      return color ? { bg: `${color}1F`, fg: color } : null;
    }
    default:
      return null;
  }
}

type EditableCellProps = {
  column: ColumnDef;
  value: string;
  /** Row identity, so each control reads as "Tier, row 3" rather than just "Tier". */
  rowLabel: string;
  onChange: (value: string) => void;
};

export function EditableCell({ column, value, rowLabel, onChange }: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  if (column.options) {
    const style = badgeStyle(column.key, value);
    return (
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={`${column.label}, ${rowLabel}`}
        className={`w-full cursor-pointer appearance-none truncate rounded-full border-none px-2.5 py-1 text-[12px] outline-none transition focus:ring-2 focus:ring-flowA/30 ${
          style ? 'font-semibold' : 'bg-transparent hover:bg-black/[.04]'
        }`}
        style={style ? { backgroundColor: style.bg, color: style.fg } : undefined}
      >
        {column.options.map((option) => (
          <option key={option} value={option} className="bg-white font-normal text-ink">
            {option}
          </option>
        ))}
      </select>
    );
  }

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        autoFocus
        aria-label={`${column.label}, ${rowLabel}`}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') commit();
          if (event.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          }
        }}
        className="w-full rounded-lg border border-flowA/40 bg-white px-2 py-1 text-[12px] outline-none ring-4 ring-flowA/10"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      title={value || undefined}
      aria-label={`Edit ${column.label}, ${rowLabel}: ${value || 'empty'}`}
      className="w-full truncate rounded-lg px-2 py-1 text-left text-[12px] transition hover:bg-black/[.04]"
    >
      {value || <span className="text-ink/25">—</span>}
    </button>
  );
}
