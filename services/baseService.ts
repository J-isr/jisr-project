import { requireSupabase } from "@/lib/supabase";
import type { Row, TableName } from "@/types/database";

export interface ListOptions {
  select?: string;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  filters?: Record<string, string | number | boolean>;
}

/** Generic read helper shared by all services. Read-only by design for now. */
export async function listRows<T = Row>(
  table: TableName,
  options: ListOptions = {},
): Promise<T[]> {
  let query = requireSupabase().from(table).select(options.select ?? "*");

  for (const [column, value] of Object.entries(options.filters ?? {})) {
    query = query.eq(column, value);
  }
  if (options.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending ?? true,
    });
  }
  if (options.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function getRowById<T = Row>(
  table: TableName,
  id: string | number,
  idColumn = "id",
): Promise<T | null> {
  const { data, error } = await requireSupabase()
    .from(table)
    .select("*")
    .eq(idColumn, id)
    .maybeSingle();
  if (error) throw error;
  return (data as T) ?? null;
}
