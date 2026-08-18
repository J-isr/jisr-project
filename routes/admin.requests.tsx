import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, Loader2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { CardSkeleton } from "@/components/common/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/adminService";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/admin/requests")({
  component: AdminRequests,
});

function AdminRequests() {
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: () => adminService.listApplications(),
    retry: false,
  });

  const items = data ?? [];

  async function act(id: string, action: "approve" | "reject") {
    setBusyId(id);
    try {
      if (action === "approve") await adminService.approveMember(id);
      else await adminService.rejectMember(id);
      toast.success(action === "approve" ? t.admin.requests.approved : t.admin.requests.rejected);
      await Promise.all([
        refetch(),
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-members"] }),
      ]);
    } catch {
      toast.error(t.admin.requests.error);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title={t.admin.requests.title} />

      {isPending ? (
        <div className="grid gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : items.length === 0 ? (
        <EmptyState title={t.admin.requests.empty} icon={<ClipboardList className="size-5" />} />
      ) : (
        <ul className="space-y-4">
          {items.map((member) => (
            <li key={member.id} className="surface-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                    {member.avatar_url && /^https?:\/\//.test(member.avatar_url) ? (
                      <img src={member.avatar_url} alt="" className="size-full object-cover" />
                    ) : (
                      <UserRound className="size-5 text-muted-foreground" aria-hidden="true" />
                    )}
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{member.full_name_ar}</p>
                    <p dir="ltr" className="text-sm text-muted-foreground">
                      {member.email ?? "—"}
                    </p>
                    <dl className="grid gap-x-6 gap-y-1 pt-1 text-xs text-muted-foreground sm:grid-cols-2">
                      <div>
                        {t.membership.fields.college}: {member.college || "—"}
                      </div>
                      <div>
                        {t.membership.fields.major}: {member.major || "—"}
                      </div>
                      <div>
                        {t.membership.fields.academicLevel}: {member.academic_level || "—"}
                      </div>
                      <div>
                        {t.membership.appliedAt}:{" "}
                        {member.applied_at ? formatDate(member.applied_at, language) : "—"}
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    variant="gold"
                    size="sm"
                    disabled={busyId === member.id}
                    onClick={() => void act(member.id, "approve")}
                  >
                    {busyId === member.id ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    ) : null}
                    {t.admin.requests.approve}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={busyId === member.id}
                    onClick={() => void act(member.id, "reject")}
                  >
                    {t.admin.requests.reject}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
