/**
 * Central club configuration.
 * Edit business information here only — never hardcode it in components.
 */
export const clubConfig = {
  nameAr: "جسر",
  nameEn: "JISR",
  universityAr: "جامعة الملك فيصل",
  universityEn: "King Faisal University",
  taglineAr: "جسر يربط الطلاب بالتقنية والابتكار",
  taglineEn: "A bridge connecting students to technology and innovation",
  joinFormUrl: "https://forms.cloud.microsoft/r/mcJkfr2gkX",
  defaultLanguage: "ar" as const,
} as const;

export type ClubConfig = typeof clubConfig;
