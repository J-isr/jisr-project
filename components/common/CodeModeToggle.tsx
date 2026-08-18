import { Code2 } from "lucide-react";
import { useCodeMode } from "@/hooks/useCodeMode";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

/** Subtle floating toggle for the developer / code-inspired presentation. */
export function CodeModeToggle() {
  const { enabled, toggle } = useCodeMode();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? t.codeMode.disable : t.codeMode.enable}
      title={t.codeMode.label}
      className={cn(
        "fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold shadow-[var(--shadow-soft)] backdrop-blur transition-colors",
        enabled
          ? "border-accent/60 bg-accent text-accent-foreground"
          : "border-border bg-card/90 text-muted-foreground hover:text-foreground hover:border-accent/50",
      )}
    >
      <Code2 className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline font-mono">{t.codeMode.label}</span>
    </button>
  );
}
