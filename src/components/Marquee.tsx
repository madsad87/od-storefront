export default function Marquee() {
  const text = "Break Expectations \u00B7 Steal the Spotlight \u00B7 Outlaw Dolls \u00B7 ";
  const repeated = text.repeat(8);

  return (
    <div
      data-testid="marquee"
      className="bg-brand-dark border-y border-white/5 py-4 overflow-hidden whitespace-nowrap"
    >
      <div className="animate-marquee inline-block">
        <span className="font-heading text-sm sm:text-base tracking-ultra-wide uppercase text-brand-offwhite/40">
          {repeated}
        </span>
        <span className="font-heading text-sm sm:text-base tracking-ultra-wide uppercase text-brand-offwhite/40">
          {repeated}
        </span>
      </div>
    </div>
  );
}
