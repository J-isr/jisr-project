import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `social_links` table. Extend as pages are built. */
export const socialService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.socialLinks, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.socialLinks, id),
};
