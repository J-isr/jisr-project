import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `statistics` table. Extend as pages are built. */
export const statisticsService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.statistics, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.statistics, id),
};
