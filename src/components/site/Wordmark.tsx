export function Wordmark({ className = "h-6" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`} aria-label="أبو حمد">
      <span className="display text-[1.25em] leading-none">أبو حمد</span>
      <span className="h-[1em] w-px bg-signal" aria-hidden />
      <span className="latin text-[0.55em] leading-none tracking-[0.3em] text-muted-foreground">
        ABUHAMAD
      </span>
    </span>
  );
}
