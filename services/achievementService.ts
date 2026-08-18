import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Achievement = Database["public"]["Tables"]["achievements"]["Row"];

export const ACHIEVEMENT_TYPES = [
  "certificate",
  "award",
  "project",
  "workshop",
  "competition",
  "volunteer",
  "club",
  "other",
] as const;

export type AchievementType = (typeof ACHIEVEMENT_TYPES)[number];

/**
 * Achievements live on the EXISTING `achievements` table.
 * RLS: members can only read achievements attached to their own member row;
 * only admins can create or modify them, so no self-awarded fake records.
 */
export const achievementService = {
  async listForMember(memberId: string | null): Promise<Achievement[]> {
    if (!memberId) return [];
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("member_id", memberId)
      .order("awarded_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return data ?? [];
  },
};
