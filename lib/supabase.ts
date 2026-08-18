import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client for the existing JISR project.
 *
 * Credentials come from environment variables only:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_PUBLISHABLE_KEY  (or VITE_SUPABASE_ANON_KEY)
 *
 * NEVER put a service-role key in frontend code.
 */
const url = import.meta.env['VITE_SUPABASE_URL'] as string | undefined;
const publishableKey = (import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
  import.meta.env['VITE_SUPABASE_ANON_KEY']) as string | undefined;

export const isSupabaseConfigured = Boolean(url && publishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, publishableKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

/** Use inside services so failures are explicit instead of silent nulls. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }
  return supabase;
}
