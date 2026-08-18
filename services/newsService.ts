import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `news` table. Extend as pages are built. */
export const newsService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.news, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.news, id),
};
