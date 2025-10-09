import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import Column from "../components/Columns.tsx";
import TaskItem from "../components/TaskItem";
import type { ColumnKey, NewTask, Task } from "../types";
import { getTasks, addTask, updateTask, deleteTask } from "../api";
import TagFilter from "../components/Tagfilter.tsx";
import SearchBar from "../components/SearchBar.tsx";

export default function Home() {
  // state: an array of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const filteredTasks = tasks.filter((t) => {
    const matchesQuery =
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(query.toLowerCase()));

    const matchesTag =
      !tag || (t.tag && t.tag.toLowerCase() === tag.toLowerCase());

    return matchesQuery && matchesTag;
  });

  // function passed to TaskForm
  async function handleAdd(newTask: NewTask) {
    const saved = await addTask(newTask);
    setTasks((prev) => [saved, ...prev]); // put new one at the top
  }

  async function handleMove(id: string, to: ColumnKey) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await updateTask(id, { ...task, status: to });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h2>Board</h2>
      <TaskForm onAdd={handleAdd} />
      <div className="filters">
        <SearchBar query={query} setQuery={setQuery} />
        <TagFilter tag={tag} setTag={setTag} />
      </div>

      <div className="board">
        <Column title="Todo" column="todo">
          {filteredTasks
            .filter((t) => t.status === "todo")
            .map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onMove={handleMove}
                onDelete={handleDelete}
              />
            ))}
        </Column>

        <Column title="Doing" column="doing">
          {filteredTasks
            .filter((t) => t.status === "doing")
            .map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onMove={handleMove}
                onDelete={handleDelete}
              />
            ))}
        </Column>

        <Column title="Done" column="done">
          {filteredTasks
            .filter((t) => t.status === "done")
            .map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onMove={handleMove}
                onDelete={handleDelete}
              />
            ))}
        </Column>
      </div>
    </div>
  );
}
