import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | JISR جسر" },
      { name: "description", content: "Explore student technology and AI projects built by JISR members." },
      { property: "og:title", content: "Projects | JISR جسر" },
      { property: "og:description", content: "Explore student technology and AI projects built by JISR members." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useLanguage();
  return (
    <SiteLayout>
      <PagePlaceholder title={t.pages.projects.title} subtitle={t.pages.projects.subtitle} />
    </SiteLayout>
  );
}
