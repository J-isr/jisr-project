import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found | JISR جسر" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CatchAllPage,
});

function CatchAllPage() {
  const { t } = useLanguage();
  return (
    <SiteLayout>
      <PagePlaceholder title={t.pages.notFound.title} subtitle={t.pages.notFound.subtitle} />
    </SiteLayout>
  );
}
