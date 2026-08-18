import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  lines = 1,
}: {
  className?: string;
  lines?: number;
}) {
  return (
    <div className="space-y-3" role="status" aria-busy="true" aria-live="polite">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={cn("h-4 w-full animate-pulse rounded-md bg-muted", className)} />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="surface-card p-6">
      <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-3 w-4/5 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
