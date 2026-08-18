import { listRows, getRowById, type ListOptions } from "./baseService";
import { TABLES, type Row } from "@/types/database";

/** Read helpers for the existing `projects` table. Extend as pages are built. */
export const projectService = {
  list: (options?: ListOptions) => listRows<Row>(TABLES.projects, options),
  getById: (id: string | number) => getRowById<Row>(TABLES.projects, id),
};
