import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
};

export function Container({ as: Tag = "div", size = "lg", className, ...props }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props} />;
}
