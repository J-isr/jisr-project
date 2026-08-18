import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { brandingConfig } from "@/config/branding";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Contributors | JISR جسر" },
      {
        name: "description",
        content:
          "The organizations supporting JISR Club at King Faisal University: King Faisal University and Jubail Technical Institute.",
      },
      { property: "og:title", content: "Partners & Contributors | JISR جسر" },
      {
        property: "og:description",
        content: "Organizations that support the mission of JISR Club.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

const partners = [brandingConfig.kfu, brandingConfig.institute];

function PartnersPage() {
  const { t, language } = useLanguage();

  return (
    <SiteLayout>
      <div className="gradient-hero py-14 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow={t.partners.eyebrow}
            title={t.partners.title}
            subtitle={t.partners.subtitle}
          />
          <p className="mt-3 text-base text-muted-foreground">{t.partners.tagline}</p>
        </Container>
      </div>

      <Container className="py-14 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2">
          {partners.map((partner) => (
            <li key={partner.src}>
              <article className="surface-card flex h-full flex-col items-center gap-5 p-8 text-center transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="flex h-36 w-full items-center justify-center rounded-2xl bg-card p-4">
                  <img
                    src={partner.src}
                    alt={language === "ar" ? partner.altAr : partner.altEn}
                    loading="lazy"
                    className="max-h-28 w-auto max-w-full object-contain"
                  />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {language === "ar"
                    ? partner.altAr.replace("شعار ", "")
                    : partner.altEn.replace(" logo", "")}
                </h2>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.partners.note}
        </p>
      </Container>
    </SiteLayout>
  );
}
