import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

export function AuthMenu({
  onNavigate,
  layout = "inline",
}: {
  onNavigate?: () => void;
  layout?: "inline" | "stacked";
}) {
  const { t } = useLanguage();
  const { user, displayName, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const wrapper = layout === "stacked" ? "flex flex-col gap-2" : "flex items-center gap-1";
  const width = layout === "stacked" ? "w-full" : "";

  async function handleSignOut() {
    await signOut();
    toast.success(t.auth.logoutSuccess);
    onNavigate?.();
    navigate({ to: "/", replace: true });
  }

  if (user) {
    return (
      <div className={wrapper}>
        <Link
          to="/profile"
          onClick={onNavigate}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:text-brand-blue ${width}`}
        >
          <User className="size-4 shrink-0" aria-hidden="true" />
          <span className="max-w-[10rem] truncate">{displayName}</span>
        </Link>
        <Button variant="ghost" size="sm" className={width} onClick={handleSignOut}>
          <LogOut className="size-4" aria-hidden="true" />
          {t.auth.logout}
        </Button>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <Button asChild variant="ghost" size="sm" className={width}>
        <Link to="/login" onClick={onNavigate}>
          {t.auth.login}
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm" className={width}>
        <Link to="/register" onClick={onNavigate}>
          {t.auth.register}
        </Link>
      </Button>
    </div>
  );
}
