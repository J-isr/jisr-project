import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `site_settings` table. Extend as pages are built. */
export const siteSettingsService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.siteSettings, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.siteSettings, id),
};
