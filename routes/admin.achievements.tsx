import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Award, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { CardSkeleton } from "@/components/common/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/useLanguage";
import { adminService } from "@/services/adminService";
import { ACHIEVEMENT_TYPES } from "@/services/achievementService";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/admin/achievements")({
  component: AdminAchievements,
});

interface JoinedAchievement {
  id: string;
  title_ar: string;
  achievement_type: string;
  awarded_at: string | null;
  members: { full_name_ar: string } | null;
}

function AdminAchievements() {
  const { t, language } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    member_id: "",
    title_ar: "",
    description_ar: "",
    achievement_type: "certificate",
    awarded_at: "",
    image_url: "",
  });

  const membersQuery = useQuery({
    queryKey: ["admin-members"],
    queryFn: () => adminService.listMembers(),
    retry: false,
  });
  const listQuery = useQuery({
    queryKey: ["admin-achievements"],
    queryFn: () => adminService.listAchievements(),
    retry: false,
  });

  const members = membersQuery.data ?? [];
  const items = (listQuery.data ?? []) as unknown as JoinedAchievement[];
  const typeLabels = t.achievements.types as Record<string, string>;
  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.member_id || !form.title_ar.trim()) return;
    setSaving(true);
    try {
      await adminService.createAchievement(form);
      toast.success(t.admin.achievements.created);
      setForm({ ...form, title_ar: "", description_ar: "", awarded_at: "", image_url: "" });
      await listQuery.refetch();
    } catch {
      toast.error(t.admin.achievements.error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title={t.admin.achievements.title} />

      {members.length === 0 ? (
        <EmptyState title={t.admin.achievements.noMembers} icon={<Award className="size-5" />} />
      ) : (
        <form onSubmit={handleSubmit} className="surface-card space-y-4 p-6" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="member_id">{t.admin.achievements.member}</Label>
              <select
                id="member_id"
                value={form.member_id}
                onChange={(e) => set("member_id")(e.target.value)}
                className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 text-sm"
              >
                <option value="">—</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name_ar}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="achievement_type">{t.admin.achievements.typeField}</Label>
              <select
                id="achievement_type"
                value={form.achievement_type}
                onChange={(e) => set("achievement_type")(e.target.value)}
                className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 text-sm"
              >
                {ACHIEVEMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {typeLabels[type]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_ar">{t.admin.achievements.titleField}</Label>
              <Input
                id="title_ar"
                value={form.title_ar}
                onChange={(e) => set("title_ar")(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="awarded_at">{t.admin.achievements.dateField}</Label>
              <Input
                id="awarded_at"
                type="date"
                value={form.awarded_at}
                onChange={(e) => set("awarded_at")(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="image_url">{t.admin.achievements.imageField}</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) => set("image_url")(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description_ar">{t.admin.achievements.descriptionField}</Label>
              <Textarea
                id="description_ar"
                rows={3}
                value={form.description_ar}
                onChange={(e) => set("description_ar")(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" variant="gold" disabled={saving}>
            {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {t.admin.achievements.create}
          </Button>
        </form>
      )}

      {listQuery.isPending ? (
        <CardSkeleton />
      ) : listQuery.isError ? (
        <ErrorState onRetry={() => void listQuery.refetch()} />
      ) : items.length === 0 ? (
        <EmptyState title={t.admin.achievements.empty} icon={<Award className="size-5" />} />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="surface-card flex flex-wrap justify-between gap-3 p-4">
              <div>
                <p className="font-medium text-foreground">{item.title_ar}</p>
                <p className="text-xs text-muted-foreground">
                  {item.members?.full_name_ar ?? "—"} ·{" "}
                  {typeLabels[item.achievement_type] ?? item.achievement_type}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.awarded_at ? formatDate(item.awarded_at, language) : "—"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
