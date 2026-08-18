import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={t.common.switchLanguage}
      className="gap-2 font-semibold"
    >
      <Languages className="size-4" aria-hidden="true" />
      <span>{language === "ar" ? "EN" : "AR"}</span>
    </Button>
  );
}
