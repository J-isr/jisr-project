/** Small formatting helpers shared across the app. */
export function formatDate(value: string | Date, locale: string) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function pickLocalized<T extends Record<string, unknown>>(
  row: T,
  base: string,
  language: string,
): string {
  const key = language === "ar" ? `${base}_ar` : `${base}_en`;
  return (row[key] ?? row[base] ?? "") as string;
}
