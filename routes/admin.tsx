import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Loader2,
  Menu,
  UserRound,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useMembership";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | JISR جسر" },
      { name: "description", content: "JISR Club administration dashboard." },
      { property: "og:title", content: "Admin Dashboard | JISR جسر" },
      { property: "og:description", content: "JISR Club administration dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const links = [
  { to: "/admin", exact: true, key: "dashboard", icon: LayoutDashboard },
  { to: "/admin/requests", key: "requests", icon: ClipboardList },
  { to: "/admin/members", key: "members", icon: Users },
  { to: "/admin/events", key: "events", icon: CalendarDays },
  { to: "/admin/registrations", key: "registrations", icon: UserRound },
  { to: "/admin/achievements", key: "achievements", icon: Award },
] as const;

function AdminLayout() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading } = useIsAdmin();
  const [open, setOpen] = useState(false);

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

  if (!user || !isAdmin) {
    return (
      <SiteLayout>
        <Container className="py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t.admin.deniedTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.admin.deniedHint}</p>
          <Button asChild variant="gold" className="mt-6">
            <Link to={user ? "/" : "/login"}>{user ? t.nav.home : t.auth.login}</Link>
          </Button>
        </Container>
      </SiteLayout>
    );
  }

  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map(({ to, key, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/admin" }}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          )}
          activeProps={{ className: "bg-brand-blue-soft text-brand-blue" }}
        >
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          {t.admin.nav[key]}
        </Link>
      ))}
    </nav>
  );

  return (
    <SiteLayout>
      <Container className="py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <h1 className="text-xl font-bold text-foreground">{t.admin.title}</h1>
          <Button type="button" variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
            <Menu className="size-4" aria-hidden="true" />
            {t.nav.menu}
          </Button>
        </div>
        {open ? <div className="surface-card mb-6 p-3 lg:hidden">{nav}</div> : null}

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="surface-card hidden h-fit p-3 lg:block">
            <p className="px-4 pt-2 pb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t.admin.subtitle}
            </p>
            {nav}
          </aside>
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </Container>
    </SiteLayout>
  );
}
