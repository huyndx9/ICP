import { COLUMNS } from '../data/columns';
import type { ICPRow } from '../types';

const escapeCell = (value: string) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export function rowsToCsv(rows: ICPRow[]): string {
  const header = ['No', ...COLUMNS.map((column) => column.label)].map(escapeCell).join(',');
  const body = rows.map((row, index) =>
    [String(index + 1), ...COLUMNS.map((column) => String(row[column.key] ?? ''))]
      .map(escapeCell)
      .join(','),
  );
  return [header, ...body].join('\r\n');
}

export function downloadCsv(rows: ICPRow[], filename = 'ICP_Qualification.csv') {
  // BOM keeps Excel from mangling non-ASCII characters on open.
  const blob = new Blob(['﻿', rowsToCsv(rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
