import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `members` table. Extend as pages are built. */
export const memberService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.members, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.members, id),
};
