import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { clubConfig } from "@/config/club";
import { translations, type Language, type Translation } from "@/translations";

interface LanguageContextValue {
  language: Language;
  dir: "rtl" | "ltr";
  isRTL: boolean;
  t: Translation;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "jisr:language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(clubConfig.defaultLanguage);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLanguageState(stored);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir,
      isRTL: dir === "rtl",
      t: translations[language],
      setLanguage,
      toggleLanguage: () => setLanguage(language === "ar" ? "en" : "ar"),
    }),
    [language, dir, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
