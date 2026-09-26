type BadgeProps = {
  label: string;
  bg: string;
  fg: string;
  title?: string;
};

export function Badge({ label, bg, fg, title }: BadgeProps) {
  return (
    <span
      title={title}
      className="inline-flex max-w-full items-center truncate rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none"
      style={{ backgroundColor: bg, color: fg }}
    >
      {label}
    </span>
  );
}
