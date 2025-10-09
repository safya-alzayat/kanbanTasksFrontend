export type ColumnKey = "todo" | "doing" | "done";
export type Priority = "high" | "medium" | "low";

export interface NewTask {
  title: string;
  notes?: string;
  tag?: string;
  status: ColumnKey;
  priority?: string;
  createdAt: number;
}

export interface Task extends NewTask {
  id: string;
}