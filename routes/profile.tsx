import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Pencil, UserRound } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useMembership } from "@/hooks/useMembership";
import { MembershipStatusCard } from "@/components/membership/MembershipStatusCard";
import { AchievementsSection } from "@/components/profile/AchievementsSection";
import { RegisteredCoursesSection } from "@/components/profile/RegisteredCoursesSection";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | JISR جسر" },
      { name: "description", content: "Manage your personal JISR Club profile information." },
      { property: "og:title", content: "My Profile | JISR جسر" },
      { property: "og:description", content: "Manage your personal JISR Club profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

function ProfilePage() {
  const { t } = useLanguage();
  const { user, loading: authLoading, displayName } = useAuth();
  const { profile, avatarUrl, loading, error, update, uploadAvatar } = useProfile();
  const { member, memberId } = useMembership();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setSpecialty(profile?.specialty ?? "");
    setBio(profile?.bio ?? "");
  }, [profile]);

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
          <h1 className="text-2xl font-bold text-foreground">{t.profile.signedOutTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.profile.signedOutHint}</p>
          <Button asChild variant="gold" className="mt-6">
            <Link to="/login">{t.auth.login}</Link>
          </Button>
        </Container>
      </SiteLayout>
    );
  }

  const name = profile?.full_name?.trim() || displayName || t.profile.notSet;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await update({
        full_name: fullName.trim() || null,
        specialty: specialty.trim() || null,
        bio: bio.trim() || null,
      });
      toast.success(t.profile.saved);
      setEditing(false);
    } catch {
      toast.error(t.profile.saveError);
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(t.profile.imageTypeError);
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error(t.profile.imageSizeError);
      return;
    }

    setUploading(true);
    try {
      await uploadAvatar(file);
      toast.success(t.profile.avatarUpdated);
    } catch {
      toast.error(t.profile.uploadError);
    } finally {
      setUploading(false);
    }
  }

  return (
    <SiteLayout>
      <div className="gradient-hero py-12 sm:py-16">
        <Container>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">
            {t.profile.welcome(name)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{t.profile.subtitle}</p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        {error ? (
          <p role="alert" className="mb-6 text-sm font-medium text-destructive">
            {t.profile.loadError}
          </p>
        ) : null}

        <div className="surface-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={t.profile.avatar}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound className="size-12 text-muted-foreground" aria-hidden="true" />
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatar}
                aria-label={t.profile.changeAvatar}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                {uploading ? t.profile.uploading : t.profile.changeAvatar}
              </Button>
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">{name}</h1>
              <p dir="ltr" className="mt-1 text-sm text-muted-foreground">
                {profile?.email ?? user.email}
              </p>
              {!editing ? (
                <Button
                  type="button"
                  variant="gold"
                  size="sm"
                  className="mt-4"
                  onClick={() => setEditing(true)}
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  {t.profile.edit}
                </Button>
              ) : null}
            </div>
          </div>

          <hr className="my-8 border-border" />

          {editing ? (
            <form onSubmit={handleSave} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="full_name">{t.profile.fullName}</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">{t.profile.specialty}</Label>
                <Input
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t.profile.bio}</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" variant="gold" disabled={saving}>
                  {saving ? t.profile.saving : t.profile.save}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={saving}
                  onClick={() => {
                    setEditing(false);
                    setFullName(profile?.full_name ?? "");
                    setSpecialty(profile?.specialty ?? "");
                    setBio(profile?.bio ?? "");
                  }}
                >
                  {t.profile.cancel}
                </Button>
              </div>
            </form>
          ) : (
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {t.profile.specialty}
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {profile?.specialty || t.profile.notSet}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {t.profile.bio}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-foreground">
                  {profile?.bio || t.profile.notSet}
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="mt-10 space-y-12">
          <MembershipStatusCard member={member} />
          <RegisteredCoursesSection memberId={memberId} />
          <AchievementsSection memberId={memberId} />
        </div>
      </Container>
    </SiteLayout>
  );
}
