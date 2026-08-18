/** Official JISR statistics. Edit here only — never hardcode in components. */
export interface StatItem {
  key: string;
  value: string;
  labelAr: string;
  labelEn: string;
  icon: "calendar" | "users" | "layers";
}

export const statistics: StatItem[] = [
  { key: "years", value: "1", labelAr: "سنة من العطاء", labelEn: "Year of impact", icon: "calendar" },
  { key: "members", value: "90+", labelAr: "الأعضاء", labelEn: "Members", icon: "users" },
  { key: "teams", value: "10+", labelAr: "الفرق", labelEn: "Teams", icon: "layers" },
];
