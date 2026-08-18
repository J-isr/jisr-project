import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  /** Uses a neutral, user-safe message — raw database errors are never shown. */
  variant?: "error" | "unavailable";
  onRetry?: () => void;
}

export function ErrorState({ variant = "error", onRetry }: ErrorStateProps) {
  const { t } = useLanguage();
  return (
    <div
      role="alert"
      className="surface-card flex flex-col items-center gap-4 p-8 text-center"
    >
      <AlertTriangle className="size-8 text-accent" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        {variant === "unavailable" ? t.states.unavailable : t.states.error}
      </p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t.states.retry}
        </Button>
      ) : null}
    </div>
  );
}
