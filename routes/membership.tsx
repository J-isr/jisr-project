import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MembershipStatusCard } from "@/components/membership/MembershipStatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { useMembership } from "@/hooks/useMembership";
import { useProfile } from "@/hooks/useProfile";
import { membershipService } from "@/services/membershipService";
import { pickLocalized } from "@/utils/format";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "JISR Membership Application | جسر" },
      {
        name: "description",
        content: "Apply for official JISR Club membership at King Faisal University.",
      },
      { property: "og:title", content: "JISR Membership Application | جسر" },
      {
        property: "og:description",
        content: "Apply for official JISR Club membership at King Faisal University.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MembershipPage,
});

function toList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function MembershipPage() {
  const { t, language } = useLanguage();
  const { user, loading: authLoading, displayName } = useAuth();
  const { profile } = useProfile();
  const { member, loading, refetch } = useMembership();

  const committeesQuery = useQuery({
    queryKey: ["committees-published"],
    queryFn: () => membershipService.listCommittees(),
    retry: false,
  });
  const committees = committeesQuery.data ?? [];

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name_ar: "",
    full_name_en: "",
    phone: "",
    university: "",
    college: "",
    major: "",
    academic_level: "",
    bio_ar: "",
    skills: "",
    interests: "",
    recommended_committee_id: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      full_name_ar: prev.full_name_ar || profile?.full_name || displayName || "",
      major: prev.major || profile?.specialty || "",
      bio_ar: prev.bio_ar || profile?.bio || "",
    }));
  }, [profile, displayName]);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name_ar.trim()) {
      toast.error(t.membership.fields.requiredName);
      return;
    }
    setSubmitting(true);
    try {
      await membershipService.apply({
        full_name_ar: form.full_name_ar.trim(),
        full_name_en: form.full_name_en.trim() || null,
        email: profile?.email ?? user?.email ?? null,
        phone: form.phone.trim() || null,
        university: form.university.trim() || null,
        college: form.college.trim() || null,
        major: form.major.trim() || null,
        academic_level: form.academic_level.trim() || null,
        bio_ar: form.bio_ar.trim() || null,
        avatar_url: profile?.avatar_url ?? null,
        skills: toList(form.skills),
        interests: toList(form.interests),
        recommended_committee_id: form.recommended_committee_id || null,
      });
      toast.success(t.membership.success);
      await refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      toast.error(/duplicate key/i.test(message) ? t.membership.duplicate : t.membership.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || (user && loading)) {
    return (
      <SiteLayout>
        <Container className="flex items-center justify-center gap-2 py-24 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          {t.states.loading}
        </Container>
      </SiteLayout>
    );
  }

  if (!user) {
    return (
      <SiteLayout>
        <Container className="py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t.membership.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.membership.signedOut}</p>
          <Button asChild variant="gold" className="mt-6">
            <Link to="/login">{t.auth.login}</Link>
          </Button>
        </Container>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Container className="space-y-8 py-12 sm:py-16">
        <SectionHeader title={t.membership.title} subtitle={t.membership.subtitle} />

        <MembershipStatusCard member={member} committees={committees} showApplyCta={false} />

        {member ? (
          <Button asChild variant="outline" size="sm">
            <Link to="/profile">{t.auth.profile}</Link>
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="surface-card space-y-5 p-6 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="full_name_ar"
                label={t.membership.fields.fullNameAr}
                value={form.full_name_ar}
                onChange={set("full_name_ar")}
              />
              <Field
                id="full_name_en"
                label={t.membership.fields.fullNameEn}
                value={form.full_name_en}
                onChange={set("full_name_en")}
              />
              <div className="space-y-2">
                <Label htmlFor="email">{t.membership.fields.email}</Label>
                <Input id="email" dir="ltr" value={profile?.email ?? user.email ?? ""} disabled />
              </div>
              <Field
                id="phone"
                label={t.membership.fields.phone}
                value={form.phone}
                onChange={set("phone")}
              />
              <Field
                id="university"
                label={t.membership.fields.university}
                value={form.university}
                onChange={set("university")}
              />
              <Field
                id="college"
                label={t.membership.fields.college}
                value={form.college}
                onChange={set("college")}
              />
              <Field
                id="major"
                label={t.membership.fields.major}
                value={form.major}
                onChange={set("major")}
              />
              <Field
                id="academic_level"
                label={t.membership.fields.academicLevel}
                value={form.academic_level}
                onChange={set("academic_level")}
              />
              <Field
                id="skills"
                label={t.membership.fields.skills}
                hint={t.membership.fields.skillsHint}
                value={form.skills}
                onChange={set("skills")}
              />
              <Field
                id="interests"
                label={t.membership.fields.interests}
                hint={t.membership.fields.interestsHint}
                value={form.interests}
                onChange={set("interests")}
              />
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="committee">{t.membership.fields.committee}</Label>
                <select
                  id="committee"
                  value={form.recommended_committee_id}
                  onChange={(e) => set("recommended_committee_id")(e.target.value)}
                  className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 text-sm"
                >
                  <option value="">{t.membership.fields.committeeNone}</option>
                  {committees.map((committee) => (
                    <option key={committee.id} value={committee.id}>
                      {pickLocalized(
                        committee as unknown as Record<string, unknown>,
                        "name",
                        language,
                      )}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio_ar">{t.membership.fields.bio}</Label>
                <Textarea
                  id="bio_ar"
                  rows={4}
                  value={form.bio_ar}
                  onChange={(e) => set("bio_ar")(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {t.membership.submitting}
                </>
              ) : (
                t.membership.applyCta
              )}
            </Button>
          </form>
        )}
      </Container>
    </SiteLayout>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
