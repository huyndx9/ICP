import { ChevronRight } from 'lucide-react';
import { WORKFLOW } from '../data/workflow';

/** A → F workflow pills: the order a BD fills the sheet in. */
export function WorkflowBar() {
  return (
    <nav
      aria-label="Qualification workflow"
      className="ios-scroll -mx-1 flex items-center gap-1 overflow-x-auto px-1 py-3"
    >
      {WORKFLOW.map((stage, index) => (
        <div key={stage.key} className="flex flex-none items-center gap-1">
          <span
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide"
            style={{ backgroundColor: stage.tint, color: stage.color }}
          >
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{ backgroundColor: stage.color }}
            >
              {stage.key}
            </span>
            {stage.label}
          </span>
          {index < WORKFLOW.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-ink/20" />}
        </div>
      ))}
    </nav>
  );
}
