import { Boxes, MessagesSquare, Sparkles, Trophy, type LucideIcon } from "lucide-react";
import type { InitiativeItem } from "@/config/content";
import { useLanguage } from "@/hooks/useLanguage";

const icons: Record<InitiativeItem["icon"], LucideIcon> = {
  hackathon: Trophy,
  lab: Sparkles,
  talks: MessagesSquare,
  expo: Boxes,
};

/**
 * Reusable event/initiative card.
 * Shaped so future database-driven events can map into the same props
 * (title + labelled detail rows). No dates/locations/speakers are rendered
 * unless they are supplied by real data.
 */
export function EventCard({ item }: { item: InitiativeItem }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const Icon = icons[item.icon];

  return (
    <article className="surface-card flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-accent">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">
          {isAr ? item.titleAr : item.titleEn}
        </h3>
      </div>

      <dl className="mt-5 space-y-3.5">
        {item.details.map((detail) => (
          <div key={detail.labelEn}>
            <dt className="text-xs font-semibold tracking-wide text-brand-blue uppercase">
              {isAr ? detail.labelAr : detail.labelEn}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {isAr ? detail.ar : detail.en}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
