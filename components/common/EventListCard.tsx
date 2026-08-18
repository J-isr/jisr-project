import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, pickLocalized } from "@/utils/format";

export interface EventCardData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImageUrl: string;
}

/** Maps a raw `events` row into card props without inventing missing values. */
export function toEventCardData(row: Record<string, unknown>, language: string): EventCardData {
  const startsAt = row["starts_at"];
  return {
    id: String(row["id"] ?? ""),
    title: pickLocalized(row, "title", language),
    description: pickLocalized(row, "description", language),
    date: typeof startsAt === "string" ? formatDate(startsAt, language) : "",
    location: pickLocalized(row, "location", language),
    coverImageUrl: typeof row["cover_image_url"] === "string" ? row["cover_image_url"] : "",
  };
}

export function EventListCard({ event }: { event: EventCardData }) {
  const { t } = useLanguage();

  return (
    <article className="surface-card flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      {event.coverImageUrl ? (
        <img
          src={event.coverImageUrl}
          alt={event.title}
          loading="lazy"
          className="h-44 w-full object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>

        {event.description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        ) : null}

        <dl className="mt-1 space-y-2 text-sm text-muted-foreground">
          {event.date ? (
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <dt className="sr-only">{t.events.date}</dt>
              <dd>{event.date}</dd>
            </div>
          ) : null}
          {event.location ? (
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <dt className="sr-only">{t.events.location}</dt>
              <dd>{event.location}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-auto pt-4">
          <Button asChild size="sm" variant="outline">
            <Link to="/events/$id" params={{ id: event.id }}>
              {t.events.details}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
