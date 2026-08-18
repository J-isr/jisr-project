import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Member } from "./membershipService";

type EventRow = Database["public"]["Tables"]["events"]["Row"];
type EventStatus = Database["public"]["Enums"]["event_status"];
type PublishStatus = Database["public"]["Enums"]["publish_status"];

export interface AdminStats {
  accounts: number;
  applications: number;
  approved: number;
  pending: number;
  events: number;
  registrations: number;
  achievements: number;
}

export interface EventFormValues {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  starts_at: string;
  ends_at: string;
  location_ar: string;
  cover_image_url: string;
  capacity: string;
  status: EventStatus;
  publish_status: PublishStatus;
}

function slugify(value: string): string {
  const base = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return `${base || "event"}-${Date.now().toString(36)}`;
}

async function countRows(
  table: "profiles" | "members" | "events" | "event_registrations" | "achievements",
  filter?: (q: ReturnType<typeof buildCountQuery>) => ReturnType<typeof buildCountQuery>,
): Promise<number> {
  let query = buildCountQuery(table);
  if (filter) query = filter(query);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

function buildCountQuery(table: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase as any).from(table).select("id", { count: "exact", head: true });
}

/**
 * Administrative reads/writes. Every call runs as the signed-in user, so
 * Supabase RLS (`is_admin()`) is the real authorization boundary — the UI
 * guard is only a convenience.
 */
export const adminService = {
  async getStats(): Promise<AdminStats> {
    const [accounts, applications, approved, pending, events, registrations, achievements] =
      await Promise.all([
        countRows("profiles"),
        countRows("members"),
        countRows("members", (q) => q.eq("status", "active")),
        countRows("members", (q) => q.eq("status", "pending")),
        countRows("events"),
        countRows("event_registrations"),
        countRows("achievements"),
      ]);
    return { accounts, applications, approved, pending, events, registrations, achievements };
  },

  async listApplications(): Promise<Member[]> {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("status", "pending")
      .order("applied_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return data ?? [];
  },

  async listMembers(): Promise<Member[]> {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .in("status", ["active", "alumni", "suspended"])
      .order("joined_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return data ?? [];
  },

  async approveMember(memberId: string): Promise<void> {
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("members")
      .update({
        status: "active",
        joined_at: new Date().toISOString().slice(0, 10),
        reviewed_at: new Date().toISOString(),
        reviewed_by: auth.user?.id ?? null,
        rejection_reason: null,
      })
      .eq("id", memberId);
    if (error) throw error;
  },

  async rejectMember(memberId: string, reason?: string): Promise<void> {
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("members")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: auth.user?.id ?? null,
        rejection_reason: reason ?? null,
      })
      .eq("id", memberId);
    if (error) throw error;
  },

  async listEvents(): Promise<EventRow[]> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return data ?? [];
  },

  async saveEvent(values: EventFormValues, id?: string): Promise<void> {
    const payload = {
      title_ar: values.title_ar.trim(),
      title_en: values.title_en.trim() || null,
      description_ar: values.description_ar.trim() || null,
      description_en: values.description_en.trim() || null,
      starts_at: values.starts_at ? new Date(values.starts_at).toISOString() : null,
      ends_at: values.ends_at ? new Date(values.ends_at).toISOString() : null,
      location_ar: values.location_ar.trim() || null,
      cover_image_url: values.cover_image_url.trim() || null,
      capacity: values.capacity ? Number(values.capacity) : null,
      status: values.status,
      publish_status: values.publish_status,
    };

    if (id) {
      const { error } = await supabase.from("events").update(payload).eq("id", id);
      if (error) throw error;
      return;
    }

    const { error } = await supabase
      .from("events")
      .insert({ ...payload, slug: slugify(values.title_en || values.title_ar) });
    if (error) throw error;
  },

  async setEventFlags(
    id: string,
    patch: { status?: EventStatus; publish_status?: PublishStatus },
  ): Promise<void> {
    const { error } = await supabase.from("events").update(patch).eq("id", id);
    if (error) throw error;
  },

  async listRegistrations() {
    const { data, error } = await supabase
      .from("event_registrations")
      .select(
        "*, events(id, title_ar, title_en, starts_at), members(id, full_name_ar, email, status)",
      )
      .order("registered_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async listAchievements() {
    const { data, error } = await supabase
      .from("achievements")
      .select("*, members(id, full_name_ar)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async createAchievement(input: {
    member_id: string;
    title_ar: string;
    description_ar?: string | null;
    achievement_type: string;
    awarded_at?: string | null;
    image_url?: string | null;
  }): Promise<void> {
    const { error } = await supabase.from("achievements").insert({
      member_id: input.member_id,
      title_ar: input.title_ar,
      description_ar: input.description_ar || null,
      achievement_type: input.achievement_type,
      awarded_at: input.awarded_at || null,
      image_url: input.image_url || null,
    });
    if (error) throw error;
  },
};
