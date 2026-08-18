import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `committees` table. Extend as pages are built. */
export const committeeService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.committees, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.committees, id),
};
