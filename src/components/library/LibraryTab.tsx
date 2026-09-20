import { ChevronRight, Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';
import { REFERENCE_TABLES, RULE_OF_THUMB } from '../../data/reference';

export function LibraryTab() {
  return (
    <div className="space-y-4">
      <section className="ios-card animate-fade-up flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
            <Lightbulb className="h-4 w-4 text-flowC" />
            Rule of Thumb
          </p>
          <p className="mt-1 text-[12px] text-ink/50">
            Pick values from this library instead of inventing wording — that is what makes rows
            comparable.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {RULE_OF_THUMB.map((step, index) => (
            <div key={step} className="flex items-center gap-1.5">
              <span className="whitespace-nowrap rounded-full bg-flowA/[.08] px-3 py-1.5 text-[12px] font-medium text-flowA">
                {step}
              </span>
              {index < RULE_OF_THUMB.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-ink/20" />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {REFERENCE_TABLES.map((table) => (
          <Card key={table.title} title={table.title} subtitle={table.caption}>
            <div className="ios-scroll overflow-x-auto">
              <table className="w-full min-w-[420px] border-separate border-spacing-0 text-[12.5px]">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-ink/40">
                    {table.columns.map((column) => (
                      <th key={column} className="pb-2 pr-3 font-semibold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cell}
                          className={`border-t border-black/[.05] py-2 pr-3 ${
                            cellIndex === 0 ? 'font-semibold' : 'text-ink/60'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
