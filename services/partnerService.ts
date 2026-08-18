import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `partners` table. Extend as pages are built. */
export const partnerService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.partners, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.partners, id),
};
