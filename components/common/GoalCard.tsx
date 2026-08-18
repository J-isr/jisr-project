import { Cpu, GraduationCap, Lightbulb, Presentation, type LucideIcon } from "lucide-react";
import type { GoalItem } from "@/config/content";
import { useLanguage } from "@/hooks/useLanguage";

const icons: Record<GoalItem["icon"], LucideIcon> = {
  workshop: Presentation,
  skills: Cpu,
  leadership: GraduationCap,
  ideas: Lightbulb,
};

export function GoalCard({ goal, index }: { goal: GoalItem; index: number }) {
  const { language } = useLanguage();
  const Icon = icons[goal.icon];

  return (
    <article className="surface-card group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-soft text-accent-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-display text-2xl font-bold text-border">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-foreground/85">
        {language === "ar" ? goal.ar : goal.en}
      </p>
    </article>
  );
}
