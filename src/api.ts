import type { NewTask, Task } from "./types";


const BASE_URL = import.meta.env.VITE_API_URL + "/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function addTask(task: NewTask): Promise<Task> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(id: string, task: Task): Promise<Task> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
