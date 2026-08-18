import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type EventRegistration = Database["public"]["Tables"]["event_registrations"]["Row"];
export type EventRow = Database["public"]["Tables"]["events"]["Row"];

export interface MyRegistration extends EventRegistration {
  events: Pick<
    EventRow,
    | "id"
    | "title_ar"
    | "title_en"
    | "starts_at"
    | "ends_at"
    | "location_ar"
    | "location_en"
    | "cover_image_url"
  > | null;
}

/**
 * Event/course registrations on the EXISTING `event_registrations` table.
 * RLS only allows a row whose `member_id` belongs to the signed-in user,
 * so nobody can register on behalf of somebody else.
 */
export const registrationService = {
  /** Registrations of the signed-in user, with the linked event record. */
  async listMine(memberId: string | null): Promise<MyRegistration[]> {
    if (!memberId) return [];
    const { data, error } = await supabase
      .from("event_registrations")
      .select(
        "*, events(id, title_ar, title_en, starts_at, ends_at, location_ar, location_en, cover_image_url)",
      )
      .eq("member_id", memberId)
      .order("registered_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as unknown as MyRegistration[];
  },

  /** Existing registration for one event, or null. */
  async getForEvent(memberId: string | null, eventId: string): Promise<EventRegistration | null> {
    if (!memberId) return null;
    const { data, error } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("member_id", memberId)
      .eq("event_id", eventId)
      .maybeSingle();
    if (error) throw error;
    return data ?? null;
  },

  /** Number of non-cancelled registrations for an event (capacity check). */
  async countForEvent(eventId: string): Promise<number> {
    const { count, error } = await supabase
      .from("event_registrations")
      .select("id", { count: "exact", head: true })
      .eq("event_id", eventId)
      .neq("status", "cancelled");
    if (error) throw error;
    return count ?? 0;
  },

  /** Creates the registration for the signed-in member; duplicates are rejected. */
  async register(memberId: string, eventId: string): Promise<EventRegistration> {
    const existing = await registrationService.getForEvent(memberId, eventId);
    if (existing) return existing;

    const { data, error } = await supabase
      .from("event_registrations")
      .insert({ member_id: memberId, event_id: eventId, status: "pending" })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
