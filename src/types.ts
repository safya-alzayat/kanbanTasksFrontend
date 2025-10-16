export type ColumnKey = "todo" | "doing" | "done";
export type Priority = "HIGH" | "MID" | "LOW";

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