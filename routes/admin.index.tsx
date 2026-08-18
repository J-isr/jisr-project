import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ErrorState } from "@/components/common/ErrorState";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/adminService";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { t } = useLanguage();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminService.getStats(),
    retry: false,
  });

  const cards = [
    { key: "accounts", value: data?.accounts },
    { key: "applications", value: data?.applications },
    { key: "approved", value: data?.approved },
    { key: "pending", value: data?.pending },
    { key: "events", value: data?.events },
    { key: "registrations", value: data?.registrations },
    { key: "achievements", value: data?.achievements },
  ] as const;

  return (
    <div className="space-y-6">
      <SectionHeader title={t.admin.title} subtitle={t.admin.subtitle} />

      {isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div key={card.key} className="surface-card p-6">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {t.admin.stats[card.key]}
              </p>
              {isPending ? (
                <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-muted" />
              ) : (
                <p className="mt-2 text-3xl font-bold text-foreground">{card.value ?? 0}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
