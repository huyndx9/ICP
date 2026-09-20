import { ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import { Card } from '../ui/Card';
import { CONCEPT_FLOW, GTM_CATEGORIES, HYPOTHESIS_STATUS } from '../../data/gtm';

export function GtmFramework() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {GTM_CATEGORIES.map((category) => (
          <section
            key={category.title}
            className="animate-fade-up rounded-ios border border-black/[.05] p-5 shadow-ios"
            style={{ backgroundColor: category.bg }}
          >
            <h3
              className="text-[13px] font-bold uppercase tracking-wider"
              style={{ color: category.accent }}
            >
              {category.title}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] leading-snug text-ink/75"
                >
                  <span
                    className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full"
                    style={{ backgroundColor: category.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Card
        title="Concept Flow"
        subtitle="Every row in the sheet travels this loop before it becomes a decision"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {CONCEPT_FLOW.map((stage, index) => (
            <div key={stage.step} className="flex flex-1 items-center gap-3">
              <div className="flex-1 rounded-2xl border border-black/[.05] bg-black/[.02] p-4">
                <p className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wide text-flowA">
                  <FlaskConical className="h-3.5 w-3.5" />
                  {stage.step}
                </p>
                <p className="mt-1.5 text-[12px] leading-snug text-ink/55">{stage.detail}</p>
              </div>
              {index < CONCEPT_FLOW.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 flex-none text-ink/20 lg:block" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Hypothesis Status" subtitle="Where each GTM hypothesis stands today">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {HYPOTHESIS_STATUS.map((status) => (
            <div
              key={status.label}
              className="rounded-2xl p-4"
              style={{ backgroundColor: status.bg }}
            >
              <p
                className="inline-flex items-center gap-1.5 text-[13px] font-bold"
                style={{ color: status.fg }}
              >
                <CheckCircle2 className="h-4 w-4" />
                {status.label}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug" style={{ color: status.fg }}>
                {status.detail}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
