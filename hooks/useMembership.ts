import { useQuery } from "@tanstack/react-query";
import { membershipService, type Member } from "@/services/membershipService";
import { useAuth } from "@/hooks/useAuth";

/** The signed-in user's membership record (null when they never applied). */
export function useMembership() {
  const { user, loading } = useAuth();

  const query = useQuery<Member | null>({
    queryKey: ["membership", user?.id ?? null],
    queryFn: () => membershipService.getMyMembership(),
    enabled: Boolean(user) && !loading,
    retry: false,
  });

  const member = query.data ?? null;

  return {
    member,
    memberId: member?.id ?? null,
    status: member?.status ?? null,
    isApprovedMember: member?.status === "active",
    loading: loading || (Boolean(user) && query.isPending),
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

/** Admin role flag. Real authorization is enforced by Supabase RLS. */
export function useIsAdmin() {
  const { user, loading } = useAuth();
  const query = useQuery({
    queryKey: ["is-admin", user?.id ?? null],
    queryFn: () => membershipService.isAdmin(),
    enabled: Boolean(user) && !loading,
    retry: false,
  });

  return {
    isAdmin: query.data === true,
    loading: loading || (Boolean(user) && query.isPending),
  };
}
