import { useCallback, useEffect, useState } from "react";
import { profileService, type Profile, type ProfileUpdate } from "@/services/profileService";
import { useAuth } from "@/hooks/useAuth";

/** Loads and updates the signed-in user's own profile (RLS-scoped to auth.uid()). */
export function useProfile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const applyProfile = useCallback(async (next: Profile | null) => {
    setProfile(next);
    setAvatarUrl(await profileService.resolveAvatarUrl(next?.avatar_url ?? null));
  }, []);

  const refresh = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setAvatarUrl(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await applyProfile(await profileService.ensureMyProfile());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, [user, applyProfile]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  const update = useCallback(
    async (patch: ProfileUpdate) => {
      const next = await profileService.updateMyProfile(patch);
      await applyProfile(next);
      return next;
    },
    [applyProfile],
  );

  const uploadAvatar = useCallback(
    async (file: File) => {
      const next = await profileService.uploadMyAvatar(file);
      await applyProfile(next);
      return next;
    },
    [applyProfile],
  );

  return {
    profile,
    avatarUrl,
    loading: authLoading || loading,
    error,
    refresh,
    update,
    uploadAvatar,
  };
}
