import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research | JISR جسر" },
      { name: "description", content: "Research, knowledge and innovation initiatives from the JISR club." },
      { property: "og:title", content: "Research | JISR جسر" },
      { property: "og:description", content: "Research, knowledge and innovation initiatives from the JISR club." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const { t } = useLanguage();
  return (
    <SiteLayout>
      <PagePlaceholder title={t.pages.research.title} subtitle={t.pages.research.subtitle} />
    </SiteLayout>
  );
}
