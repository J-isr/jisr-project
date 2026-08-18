import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `gallery` table. Extend as pages are built. */
export const galleryService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.gallery, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.gallery, id),
};
