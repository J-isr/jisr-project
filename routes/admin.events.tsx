import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Loader2 } from "lucide-react";
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
import { adminService, type EventFormValues } from "@/services/adminService";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
});

const emptyForm: EventFormValues = {
  title_ar: "",
  title_en: "",
  description_ar: "",
  description_en: "",
  starts_at: "",
  ends_at: "",
  location_ar: "",
  cover_image_url: "",
  capacity: "",
  status: "open",
  publish_status: "published",
};

function toLocalInput(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function AdminEvents() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState<EventFormValues>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["admin-events"],
    queryFn: () => adminService.listEvents(),
    retry: false,
  });

  const items = data ?? [];
  const set = (key: keyof EventFormValues) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }) as EventFormValues);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title_ar.trim()) return;
    setSaving(true);
    try {
      await adminService.saveEvent(form, editingId ?? undefined);
      toast.success(t.admin.events.created);
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await refetch();
    } catch {
      toast.error(t.admin.events.error);
    } finally {
      setSaving(false);
    }
  }

  async function toggle(id: string, patch: Parameters<typeof adminService.setEventFlags>[1]) {
    try {
      await adminService.setEventFlags(id, patch);
      await refetch();
    } catch {
      toast.error(t.admin.events.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader title={t.admin.events.title} />
        <Button
          type="button"
          variant="gold"
          size="sm"
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm((v) => !v);
          }}
        >
          {t.admin.events.create}
        </Button>
      </div>

      {showForm ? (
        <form onSubmit={handleSave} className="surface-card space-y-5 p-6" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="title_ar"
              label={t.admin.events.fields.titleAr}
              value={form.title_ar}
              onChange={set("title_ar")}
            />
            <TextField
              id="title_en"
              label={t.admin.events.fields.titleEn}
              value={form.title_en}
              onChange={set("title_en")}
            />
            <TextField
              id="starts_at"
              type="datetime-local"
              label={t.admin.events.fields.startsAt}
              value={form.starts_at}
              onChange={set("starts_at")}
            />
            <TextField
              id="ends_at"
              type="datetime-local"
              label={t.admin.events.fields.endsAt}
              value={form.ends_at}
              onChange={set("ends_at")}
            />
            <TextField
              id="location_ar"
              label={t.admin.events.fields.locationAr}
              value={form.location_ar}
              onChange={set("location_ar")}
            />
            <TextField
              id="cover_image_url"
              label={t.admin.events.fields.coverImageUrl}
              value={form.cover_image_url}
              onChange={set("cover_image_url")}
            />
            <TextField
              id="capacity"
              type="number"
              label={t.admin.events.fields.capacity}
              value={form.capacity}
              onChange={set("capacity")}
            />
            <div className="space-y-2">
              <Label htmlFor="status">{t.admin.events.fields.status}</Label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => set("status")(e.target.value)}
                className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 text-sm"
              >
                <option value="open">{t.admin.events.openRegistration}</option>
                <option value="upcoming">{t.admin.events.closeRegistration}</option>
                <option value="full">{t.registration.full}</option>
                <option value="completed">{t.statuses.attended}</option>
                <option value="cancelled">{t.statuses.cancelled}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="publish_status">{t.admin.events.fields.publishStatus}</Label>
              <select
                id="publish_status"
                value={form.publish_status}
                onChange={(e) => set("publish_status")(e.target.value)}
                className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 text-sm"
              >
                <option value="published">{t.admin.events.published}</option>
                <option value="draft">{t.admin.events.draft}</option>
                <option value="archived">{t.statuses.inactive}</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description_ar">{t.admin.events.fields.descriptionAr}</Label>
              <Textarea
                id="description_ar"
                rows={3}
                value={form.description_ar}
                onChange={(e) => set("description_ar")(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description_en">{t.admin.events.fields.descriptionEn}</Label>
              <Textarea
                id="description_en"
                rows={3}
                value={form.description_en}
                onChange={(e) => set("description_en")(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="gold" disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              {saving ? t.admin.events.saving : t.admin.events.save}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
              {t.admin.events.cancel}
            </Button>
          </div>
        </form>
      ) : null}

      {isPending ? (
        <CardSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : items.length === 0 ? (
        <EmptyState title={t.admin.events.empty} icon={<CalendarDays className="size-5" />} />
      ) : (
        <ul className="space-y-4">
          {items.map((event) => (
            <li key={event.id} className="surface-card flex flex-wrap items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{event.title_ar}</p>
                <p className="text-xs text-muted-foreground">
                  {event.starts_at ? formatDate(event.starts_at, language) : "—"} ·{" "}
                  {event.publish_status === "published"
                    ? t.admin.events.published
                    : t.admin.events.draft}{" "}
                  · {event.status}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(event.id);
                    setShowForm(true);
                    setForm({
                      title_ar: event.title_ar,
                      title_en: event.title_en ?? "",
                      description_ar: event.description_ar ?? "",
                      description_en: event.description_en ?? "",
                      starts_at: toLocalInput(event.starts_at),
                      ends_at: toLocalInput(event.ends_at),
                      location_ar: event.location_ar ?? "",
                      cover_image_url: event.cover_image_url ?? "",
                      capacity: event.capacity ? String(event.capacity) : "",
                      status: event.status,
                      publish_status: event.publish_status,
                    });
                  }}
                >
                  {t.admin.events.edit}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    void toggle(event.id, {
                      publish_status: event.publish_status === "published" ? "draft" : "published",
                    })
                  }
                >
                  {event.publish_status === "published"
                    ? t.admin.events.unpublish
                    : t.admin.events.publish}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    void toggle(event.id, {
                      status: event.status === "open" ? "upcoming" : "open",
                    })
                  }
                >
                  {event.status === "open"
                    ? t.admin.events.closeRegistration
                    : t.admin.events.openRegistration}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
