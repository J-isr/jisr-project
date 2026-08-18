import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | JISR جسر" },
      { name: "description", content: "Learn about JISR, the student technology and innovation club at King Faisal University." },
      { property: "og:title", content: "About | JISR جسر" },
      { property: "og:description", content: "Learn about JISR, the student technology and innovation club at King Faisal University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();
  return (
    <SiteLayout>
      <PagePlaceholder title={t.pages.about.title} subtitle={t.pages.about.subtitle} />
    </SiteLayout>
  );
}
