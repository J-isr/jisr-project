import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `events` table. Extend as pages are built. */
export const eventService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.events, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.events, id),
};
