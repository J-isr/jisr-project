import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DepartmentCard } from "@/components/team/DepartmentCard";
import { CommitteeCard } from "@/components/team/CommitteeCard";
import { CommitteeMatcher } from "@/components/team/CommitteeMatcher";
import { useLanguage } from "@/hooks/useLanguage";
import { featuredDepartment, otherDepartments } from "@/config/committees";
import { pick } from "@/types/committees";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team & Committees | JISR جسر" },
      {
        name: "description",
        content:
          "Explore JISR's departments and committees at King Faisal University, and discover which committee fits you best.",
      },
      { property: "og:title", content: "Team & Committees | JISR جسر" },
      {
        property: "og:description",
        content:
          "Explore JISR's departments and committees at King Faisal University, and discover which committee fits you best.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { language, t } = useLanguage();

  return (
    <SiteLayout>
      <div className="gradient-hero py-14 sm:py-20">
        <Container>
          <SectionHeader title={t.team.title} subtitle={t.team.subtitle} />
        </Container>
      </div>

      <Container className="space-y-14 py-14 sm:py-20">
        {/* Public Relations — displayed separately and prominently */}
        <section
          aria-labelledby="pr-department"
          className="surface-card border-accent/40 p-6 sm:p-8"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-gold-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            {t.team.prEyebrow}
          </span>
          <h2 id="pr-department" className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            {pick(featuredDepartment.name, language)}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {pick(featuredDepartment.overview, language)}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDepartment.committees.map((committee) => (
              <CommitteeCard key={committee.id} committee={committee} />
            ))}
          </div>
        </section>

        <section aria-labelledby="other-departments" className="space-y-6">
          <SectionHeader
            title={t.team.departmentsTitle}
            subtitle={t.team.departmentsSubtitle}
            className="[&>h2]:text-2xl"
          />
          <h2 id="other-departments" className="sr-only">
            {t.team.departmentsTitle}
          </h2>
          <div className="space-y-5">
            {otherDepartments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
          <p className="font-mono text-xs text-muted-foreground">{t.team.membersNote}</p>
        </section>

        <CommitteeMatcher />
      </Container>
    </SiteLayout>
  );
}
