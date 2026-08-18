import { affiliationLogos } from "@/config/branding";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface AffiliationLogosProps {
  className?: string;
  size?: "sm" | "md";
}

export function AffiliationLogos({ className, size = "md" }: AffiliationLogosProps) {
  const { language } = useLanguage();

  return (
    <ul className={cn("flex flex-wrap items-center gap-4 sm:gap-6", className)}>
      {affiliationLogos.map((logo) => (
        <li key={logo.src}>
          <img
            src={logo.src}
            alt={language === "ar" ? logo.altAr : logo.altEn}
            loading="lazy"
            className={cn(
              "w-auto shrink-0 rounded-xl bg-card object-contain p-1",
              size === "sm" ? "h-12 sm:h-14" : "h-16 sm:h-20",
            )}
          />
        </li>
      ))}
    </ul>
  );
}
