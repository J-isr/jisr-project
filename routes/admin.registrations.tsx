import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { CardSkeleton } from "@/components/common/LoadingSkeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/adminService";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/admin/registrations")({
  component: AdminRegistrations,
});

interface JoinedRegistration {
  id: string;
  status: string;
  attended: boolean;
  registered_at: string;
  events: { title_ar: string } | null;
  members: { full_name_ar: string; email: string | null; status: string } | null;
}

function AdminRegistrations() {
  const { t, language } = useLanguage();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["admin-registrations"],
    queryFn: () => adminService.listRegistrations(),
    retry: false,
  });

  const items = (data ?? []) as unknown as JoinedRegistration[];
  const statusLabels = t.statuses as Record<string, string>;

  return (
    <div className="space-y-6">
      <SectionHeader title={t.admin.registrations.title} />

      {isPending ? (
        <CardSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : items.length === 0 ? (
        <EmptyState title={t.admin.registrations.empty} icon={<UserRound className="size-5" />} />
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 text-start">{t.admin.registrations.user}</th>
                <th className="px-4 py-3 text-start">{t.profile.email}</th>
                <th className="px-4 py-3 text-start">{t.admin.registrations.event}</th>
                <th className="px-4 py-3 text-start">{t.admin.registrations.date}</th>
                <th className="px-4 py-3 text-start">{t.myCourses.status}</th>
                <th className="px-4 py-3 text-start">{t.admin.registrations.attendance}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.members?.full_name_ar ?? "—"}
                  </td>
                  <td dir="ltr" className="px-4 py-3 text-muted-foreground">
                    {row.members?.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.events?.title_ar ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(row.registered_at, language)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {statusLabels[row.status] ?? row.status}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.attended ? t.statuses.attended : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
