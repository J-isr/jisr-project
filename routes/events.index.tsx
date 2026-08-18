import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CardSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { EventCard } from "@/components/common/EventCard";
import { EventListCard, toEventCardData } from "@/components/common/EventListCard";
import { initiatives } from "@/config/content";
import { useLanguage } from "@/hooks/useLanguage";
import { eventService } from "@/services/eventService";
import type { Row } from "@/types/database";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events | JISR جسر" },
      { name: "description", content: "Workshops, hackathons and technology events hosted by JISR at King Faisal University." },
      { property: "og:title", content: "Events | JISR جسر" },
      { property: "og:description", content: "Workshops, hackathons and technology events hosted by JISR at King Faisal University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { t, language } = useLanguage();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["events", "list"],
    queryFn: () => eventService.list({ orderBy: { column: "starts_at", ascending: true } }),
    retry: false,
  });

  const rows = (data ?? []) as Row[];

  return (
    <SiteLayout>
      <Container className="py-14 sm:py-20">
        <SectionHeader
          eyebrow="JISR"
          title={t.events.upcomingTitle}
          subtitle={t.events.upcomingSubtitle}
        />

        <div className="mt-10">
          {isPending ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : rows.length === 0 ? (
            <EmptyState
              title={t.events.emptyTitle}
              description={t.events.emptyHint}
              icon={<CalendarDays className="size-5" />}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rows.map((row) => (
                <EventListCard
                  key={String(row["id"])}
                  event={toEventCardData(row as Record<string, unknown>, language)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-16">
          <SectionHeader
            title={t.events.initiativesTitle}
            subtitle={t.events.initiativesSubtitle}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {initiatives.map((item) => (
              <EventCard key={item.key} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </SiteLayout>
  );
}
