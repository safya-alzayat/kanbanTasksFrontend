export type ColumnKey = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  notes?: string;
  tag?: string;
  column: ColumnKey;
  createdAt: number;
}
