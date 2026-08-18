import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { toEventCardData } from "@/components/common/EventListCard";
import { useLanguage } from "@/hooks/useLanguage";
import { eventService } from "@/services/eventService";
import { EventRegisterButton } from "@/components/common/EventRegisterButton";

export const Route = createFileRoute("/events/$id")({
  head: () => ({
    meta: [
      { title: "Event details | JISR جسر" },
      { name: "description", content: "Details of a JISR club event at King Faisal University." },
      { property: "og:title", content: "Event details | JISR جسر" },
      { property: "og:description", content: "Details of a JISR club event at King Faisal University." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventDetailPage,
});

function EventDetailPage() {
  const { id } = Route.useParams();
  const { language, t } = useLanguage();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["event", id],
    queryFn: () => eventService.getById(id),
    retry: false,
  });

  const record = data as Record<string, unknown> | null | undefined;
  const event = record ? toEventCardData(record, language) : null;

  return (
    <SiteLayout>
      <Container className="space-y-8 py-14 sm:py-20">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
        >
          <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" aria-hidden="true" />
          {t.events.backToEvents}
        </Link>

        {isPending ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : !event ? (
          <EmptyState
            title={t.events.notFoundTitle}
            description={t.events.notFoundHint}
            icon={<CalendarDays className="size-5" />}
            action={
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link to="/events">{t.events.backToEvents}</Link>
              </Button>
            }
          />
        ) : (
          <article className="space-y-6">
            <SectionHeader title={event.title} subtitle={event.description} />

            {event.coverImageUrl ? (
              <img
                src={event.coverImageUrl}
                alt={event.title}
                className="surface-card h-64 w-full object-cover sm:h-80"
              />
            ) : null}

            <EventRegisterButton
              eventId={event.id}
              status={typeof record?.["status"] === "string" ? (record["status"] as string) : null}
              capacity={typeof record?.["capacity"] === "number" ? (record["capacity"] as number) : null}
            />

            <dl className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {event.date ? (
                <div className="surface-card flex items-center gap-2 p-4">
                  <CalendarDays className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <dt className="sr-only">{t.events.date}</dt>
                  <dd>{event.date}</dd>
                </div>
              ) : null}
              {event.location ? (
                <div className="surface-card flex items-center gap-2 p-4">
                  <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <dt className="sr-only">{t.events.location}</dt>
                  <dd>{event.location}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        )}
      </Container>
    </SiteLayout>
  );
}
