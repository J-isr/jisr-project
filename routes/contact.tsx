import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | JISR جسر" },
      { name: "description", content: "Get in touch with the JISR club at King Faisal University." },
      { property: "og:title", content: "Contact | JISR جسر" },
      { property: "og:description", content: "Get in touch with the JISR club at King Faisal University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  return (
    <SiteLayout>
      <PagePlaceholder title={t.pages.contact.title} subtitle={t.pages.contact.subtitle} />
    </SiteLayout>
  );
}
