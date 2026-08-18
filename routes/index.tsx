import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { GoalsSection } from "@/components/sections/GoalsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JISR | جسر — Technology & Innovation Club at KFU" },
      {
        name: "description",
        content:
          "JISR is the student technology and innovation club at King Faisal University, bridging students with technology, AI and future opportunities.",
      },
      { property: "og:title", content: "JISR | جسر — Technology & Innovation Club at KFU" },
      {
        property: "og:description",
        content:
          "A bridge connecting students with technology, artificial intelligence and innovation at King Faisal University.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <StatsSection />
      <AboutSection />
      <GoalsSection />
      <EventsSection />
      <CTASection />
    </SiteLayout>
  );
}
