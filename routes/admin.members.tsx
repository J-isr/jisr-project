import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { CardSkeleton } from "@/components/common/LoadingSkeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/adminService";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/admin/members")({
  component: AdminMembers,
});

function AdminMembers() {
  const { t, language } = useLanguage();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["admin-members"],
    queryFn: () => adminService.listMembers(),
    retry: false,
  });

  const items = data ?? [];
  const statusLabels = t.statuses as Record<string, string>;

  return (
    <div className="space-y-6">
      <SectionHeader title={t.admin.members.title} />

      {isPending ? (
        <div className="grid gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : items.length === 0 ? (
        <EmptyState title={t.admin.members.empty} icon={<Users className="size-5" />} />
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[640px] text-start text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 text-start">{t.profile.fullName}</th>
                <th className="px-4 py-3 text-start">{t.profile.email}</th>
                <th className="px-4 py-3 text-start">{t.membership.fields.college}</th>
                <th className="px-4 py-3 text-start">{t.membership.fields.major}</th>
                <th className="px-4 py-3 text-start">{t.membership.statusTitle}</th>
                <th className="px-4 py-3 text-start">{t.admin.members.joinDate}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((member) => (
                <tr key={member.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{member.full_name_ar}</td>
                  <td dir="ltr" className="px-4 py-3 text-muted-foreground">
                    {member.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{member.college || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{member.major || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {statusLabels[member.status] ?? member.status}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {member.joined_at ? formatDate(member.joined_at, language) : "—"}
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
