type Segment<T extends string> = { key: T; label: string };

type SegmentedControlProps<T extends string> = {
  segments: readonly Segment<T>[];
  value: T;
  onChange: (value: T) => void;
};

/** iOS segmented control: a sliding white pill behind the active segment. */
export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    segments.findIndex((segment) => segment.key === value),
  );

  return (
    <div
      role="tablist"
      className="relative inline-flex w-max rounded-full bg-black/[.05] p-1"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 rounded-full bg-white shadow-sm transition-[left] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          width: `calc((100% - 8px) / ${segments.length})`,
          left: `calc(4px + (100% - 8px) / ${segments.length} * ${activeIndex})`,
        }}
      />
      {segments.map((segment) => (
        <button
          key={segment.key}
          role="tab"
          aria-selected={segment.key === value}
          onClick={() => onChange(segment.key)}
          className={`relative z-10 flex-1 whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
            segment.key === value ? 'text-ink' : 'text-ink/50 hover:text-ink/70'
          }`}
        >
          {segment.label}
        </button>
      ))}
    </div>
  );
}
