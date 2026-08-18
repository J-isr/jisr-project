import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface JisrCardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  children: ReactNode;
}

/** Premium rounded card used across all JISR sections. */
export function JisrCard({ interactive = false, className, children, ...props }: JisrCardProps) {
  return (
    <div
      className={cn(
        "surface-card p-6",
        interactive && "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function JisrCardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />;
}

export function JisrCardBody({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground", className)} {...props} />;
}
