export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <path d="M4 6 L14 26 L16 22 L9 6 Z" className="fill-navy" style={invert ? { fill: "var(--navy-foreground)" } : undefined} />
        <path d="M28 6 L16 30 L13 24 L22 6 Z" className="fill-primary" />
        <circle cx="25" cy="8" r="2.5" className="fill-teal" />
      </svg>
      <span className={`font-display text-lg font-extrabold tracking-tight ${invert ? "text-navy-foreground" : "text-navy"}`}>
        Romkan <span className="font-semibold text-primary">Hospital</span>
      </span>
    </span>
  );
}
