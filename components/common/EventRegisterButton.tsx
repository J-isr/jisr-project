import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";
import { useLanguage } from "@/hooks/useLanguage";
import { registrationService } from "@/services/registrationService";

interface EventRegisterButtonProps {
  eventId: string;
  /** Raw `events.status` value; only `open` accepts registrations. */
  status?: string | null;
  capacity?: number | null;
  className?: string;
}

export function EventRegisterButton({
  eventId,
  status,
  capacity,
  className,
}: EventRegisterButtonProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { memberId, isApprovedMember, member } = useMembership();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  const registrationQuery = useQuery({
    queryKey: ["my-registration", memberId, eventId],
    queryFn: () => registrationService.getForEvent(memberId, eventId),
    enabled: Boolean(memberId),
    retry: false,
  });

  const countQuery = useQuery({
    queryKey: ["event-registration-count", eventId],
    queryFn: () => registrationService.countForEvent(eventId),
    enabled: typeof capacity === "number" && capacity > 0,
    retry: false,
  });

  const registered = Boolean(registrationQuery.data);
  const isFull =
    typeof capacity === "number" &&
    capacity > 0 &&
    typeof countQuery.data === "number" &&
    countQuery.data >= capacity;
  const isOpen = status === "open";

  if (registered) {
    return (
      <div className={className}>
        <Button type="button" variant="outline" size="sm" disabled>
          <CheckCircle2 className="size-4" aria-hidden="true" />
          {t.registration.registered}
        </Button>
      </div>
    );
  }

  if (!isOpen && !isFull) {
    return (
      <div className={className}>
        <Button type="button" variant="outline" size="sm" disabled>
          {t.registration.closed}
        </Button>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className={className}>
        <Button type="button" variant="outline" size="sm" disabled>
          {t.registration.full}
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={className}>
        <Button asChild variant="gold" size="sm">
          <Link to="/login">{t.registration.register}</Link>
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">{t.registration.loginRequired}</p>
      </div>
    );
  }

  if (!isApprovedMember || !memberId) {
    return (
      <div className={className}>
        <Button asChild variant="outline" size="sm">
          <Link to="/membership">
            {member ? t.registration.membersOnly : t.registration.applyFirst}
          </Link>
        </Button>
      </div>
    );
  }

  async function handleRegister() {
    if (!memberId) return;
    setSubmitting(true);
    try {
      await registrationService.register(memberId, eventId);
      toast.success(t.registration.success);
      await Promise.all([
        registrationQuery.refetch(),
        queryClient.invalidateQueries({ queryKey: ["my-registrations"] }),
        queryClient.invalidateQueries({ queryKey: ["event-registration-count", eventId] }),
      ]);
    } catch {
      toast.error(t.registration.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={className}>
      <Button
        type="button"
        variant="gold"
        size="sm"
        disabled={submitting}
        onClick={() => void handleRegister()}
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {t.registration.registering}
          </>
        ) : (
          t.registration.register
        )}
      </Button>
    </div>
  );
}
