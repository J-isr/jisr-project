export const contactConfig = {
  email: "info@jisrclub.sa",
  /** Intentionally empty — never render a placeholder phone number. */
  phone: "",
  locationAr: "جامعة الملك فيصل",
  locationEn: "King Faisal University",
} as const;

export const hasPhone = contactConfig.phone.trim().length > 0;
