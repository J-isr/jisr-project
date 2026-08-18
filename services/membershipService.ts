import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Member = Database["public"]["Tables"]["members"]["Row"];
export type MemberStatus = Database["public"]["Enums"]["member_status"];

export interface MembershipApplicationInput {
  full_name_ar: string;
  full_name_en?: string | null;
  email?: string | null;
  phone?: string | null;
  university?: string | null;
  college?: string | null;
  major?: string | null;
  academic_level?: string | null;
  bio_ar?: string | null;
  avatar_url?: string | null;
  skills?: string[];
  interests?: string[];
  recommended_committee_id?: string | null;
}

/**
 * Membership application layer on the EXISTING `members` table.
 * RLS restricts every write to the signed-in user's own row, and a database
 * trigger blocks self-service edits of status / assignment / review fields.
 */
export const membershipService = {
  /** The signed-in user's membership record, or null when they never applied. */
  async getMyMembership(): Promise<Member | null> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return null;

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) throw error;
    return data ?? null;
  },

  /** Submits a new application (status starts as `pending`, enforced by RLS). */
  async apply(input: MembershipApplicationInput): Promise<Member> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("members")
      .insert({
        ...input,
        skills: input.skills ?? [],
        interests: input.interests ?? [],
        user_id: user.id,
        status: "pending",
        is_public: false,
        applied_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Updates the user's own application details (protected fields are ignored by the DB). */
  async updateMine(patch: Partial<MembershipApplicationInput>): Promise<Member> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("members")
      .update(patch)
      .eq("user_id", user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** True when the signed-in user holds the admin role (also enforced by RLS). */
  async isAdmin(): Promise<boolean> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return false;

    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (error) return false;
    return Boolean(data);
  },

  /** Published committees, used for the committee recommendation field. */
  async listCommittees() {
    const { data, error } = await supabase
      .from("committees")
      .select("id, name_ar, name_en")
      .eq("is_published", true)
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
};
