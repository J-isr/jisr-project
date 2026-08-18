import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileUpdate = Pick<
  Database["public"]["Tables"]["profiles"]["Update"],
  "full_name" | "email" | "avatar_url" | "specialty" | "bio"
>;

/** Private storage bucket holding avatars under `<user-id>/...`. */
export const AVATAR_BUCKET = "avatars";
const SIGNED_URL_TTL = 60 * 60; // 1 hour

/**
 * Profile access for the CURRENT authenticated user only.
 * RLS on public.profiles restricts every row to auth.uid() = id,
 * so no other user's data can be read or written from the client.
 */
export const profileService = {
  /** Returns the signed-in user's profile, or null when signed out / not created yet. */
  async getMyProfile(): Promise<Profile | null> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    if (error) throw error;
    return data ?? null;
  },

  /** Creates the profile row if it is missing (sign-ups get one automatically via trigger). */
  async ensureMyProfile(): Promise<Profile | null> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return null;

    const existing = await profileService.getMyProfile();
    if (existing) return existing;

    const meta = (user.user_metadata ?? {}) as { full_name?: string; name?: string };
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email ?? null,
        full_name: meta.full_name ?? meta.name ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Updates only the signed-in user's own profile. */
  async updateMyProfile(patch: ProfileUpdate): Promise<Profile> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("id", user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Uploads (or replaces) the signed-in user's avatar into their own folder
   * in the private `avatars` bucket, then stores the object path on the profile.
   */
  async uploadMyAvatar(file: File): Promise<Profile> {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) throw new Error("Not authenticated");

    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${user.id}/avatar-${Date.now()}.${ext || "jpg"}`;

    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type || "application/octet-stream" });
    if (uploadError) throw uploadError;

    return profileService.updateMyProfile({ avatar_url: path });
  },

  /** Resolves a stored avatar reference to a displayable URL (signed for private storage). */
  async resolveAvatarUrl(avatarRef: string | null): Promise<string | null> {
    if (!avatarRef) return null;
    if (/^https?:\/\//i.test(avatarRef)) return avatarRef;

    const { data, error } = await supabase.storage
      .from(AVATAR_BUCKET)
      .createSignedUrl(avatarRef, SIGNED_URL_TTL);
    if (error) return null;
    return data?.signedUrl ?? null;
  },
};
