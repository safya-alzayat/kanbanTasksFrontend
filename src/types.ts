export type ColumnKey = "todo" | "doing" | "done";
export type Priority = "high" | "medium" | "low";

export interface Task {
  id?: string;
  title: string;
  notes?: string;
  tag?: string;
  status: ColumnKey;
  priority?: string;
  createdAt: number;
}
