import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account | JISR جسر" },
      { name: "description", content: "Create a JISR Club account to join the student technology community." },
      { property: "og:title", content: "Create account | JISR جسر" },
      { property: "og:description", content: "Create a JISR Club account to join the community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/", replace: true });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullName = name.trim();
    const value = email.trim();
    if (!fullName) return setError(t.auth.errors.nameRequired);
    if (fullName.length < 2) return setError(t.auth.errors.nameShort);
    if (!value) return setError(t.auth.errors.emailRequired);
    if (!EMAIL_RE.test(value)) return setError(t.auth.errors.emailInvalid);
    if (!password) return setError(t.auth.errors.passwordRequired);
    if (password.length < 8) return setError(t.auth.errors.passwordShort);
    if (password !== confirm) return setError(t.auth.errors.passwordMismatch);

    setError(null);
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email: value,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName },
      },
    });
    setLoading(false);

    if (authError) {
      const msg = authError.message.toLowerCase();
      setError(
        msg.includes("already") || msg.includes("registered")
          ? t.auth.errors.userExists
          : t.auth.errors.generic,
      );
      return;
    }

    if (data.session) {
      toast.success(t.auth.registerSuccess);
      navigate({ to: "/", replace: true });
      return;
    }

    setNotice(t.auth.confirmEmail);
    toast.success(t.auth.registerSuccess);
  }

  return (
    <SiteLayout>
      <Container className="flex justify-center py-16">
        <div className="surface-card w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-foreground">{t.auth.registerTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.auth.registerSubtitle}</p>

          {notice ? (
            <p className="mt-6 rounded-xl bg-secondary p-4 text-sm text-foreground">{notice}</p>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">{t.auth.name}</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder={t.auth.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                dir="ltr"
                placeholder={t.auth.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">{t.auth.confirmPassword}</Label>
              <Input
                id="confirm"
                type="password"
                autoComplete="new-password"
                dir="ltr"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {error ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              {loading ? t.auth.submitting : t.auth.register}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.auth.haveAccount}{" "}
            <Link to="/login" className="font-semibold text-brand-blue hover:underline">
              {t.auth.login}
            </Link>
          </p>
        </div>
      </Container>
    </SiteLayout>
  );
}
