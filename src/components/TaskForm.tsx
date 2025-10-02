import { useState } from "react";
import type { Task } from "../types";

type Props = {
  onAdd: (task: Task) => void;
};

export default function TaskForm({ onAdd }: Props) {
  // local state for form inputs
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [priority, setPriority] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // prevent page reload
    if (!title.trim()) return; // don’t add empty tasks

    const newTask: Task = {
      id: crypto.randomUUID(), // unique id
      title: title.trim(),
      tag: tag.trim() || undefined,
      column: "todo", // new tasks always start in todo
      createdAt: Date.now(),
      priority: priority.trim() || undefined,
    };

    onAdd(newTask); // give task to parent
    setTitle(""); // clear form
    setTag("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tag (optional)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <select
        name="priority"
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
