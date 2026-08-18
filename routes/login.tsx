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

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in | JISR جسر" },
      { name: "description", content: "Sign in to your JISR Club account at King Faisal University." },
      { property: "og:title", content: "Sign in | JISR جسر" },
      { property: "og:description", content: "Sign in to your JISR Club account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/", replace: true });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError(t.auth.errors.emailRequired);
    if (!EMAIL_RE.test(value)) return setError(t.auth.errors.emailInvalid);
    if (!password) return setError(t.auth.errors.passwordRequired);

    setError(null);
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: value,
      password,
    });
    setLoading(false);

    if (authError) {
      const msg = authError.message.toLowerCase();
      setError(
        msg.includes("not confirmed")
          ? t.auth.errors.emailNotConfirmed
          : msg.includes("invalid")
            ? t.auth.errors.invalidCredentials
            : t.auth.errors.generic,
      );
      return;
    }

    toast.success(t.auth.loginSuccess);
    navigate({ to: "/", replace: true });
  }

  return (
    <SiteLayout>
      <Container className="flex justify-center py-16">
        <div className="surface-card w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-foreground">{t.auth.loginTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.auth.loginSubtitle}</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              {loading ? t.auth.submitting : t.auth.login}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.auth.noAccount}{" "}
            <Link to="/register" className="font-semibold text-brand-blue hover:underline">
              {t.auth.register}
            </Link>
          </p>
        </div>
      </Container>
    </SiteLayout>
  );
}
