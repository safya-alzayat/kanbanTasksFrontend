
import type {Task} from "./types.ts"

const KEY = "kanbantasks:v1"; // localStorage key

// load tasks from browser localStorage
export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

// save tasks back into localStorage
export function saveTasks(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}
