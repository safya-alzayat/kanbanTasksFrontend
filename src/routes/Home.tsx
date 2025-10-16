import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import Column from "../components/Columns.tsx";
import TaskItem from "../components/TaskItem";
import type { ColumnKey, NewTask, Task } from "../types";
import { getTasksByStatus, addTask, updateTask, deleteTask } from "../api";
import TagFilter from "../components/Tagfilter.tsx";
import SearchBar from "../components/SearchBar.tsx";
import AssignedToFilter from "../components/AssignedToFilter.tsx";

export default function Home() {
  // state: an array of tasks
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]); // all tasks for easy searching/filtering
  
  async function fetchTasks() {
    const [todo, doing, done] = await Promise.all([
      getTasksByStatus("todo"),
      getTasksByStatus("doing"),
      getTasksByStatus("done"),
    ]);
    setTodoTasks(todo);
    setDoingTasks(doing);
    setDoneTasks(done);
    setTasks([...todo, ...doing, ...done]);
  }
  
  useEffect(() => {
    fetchTasks();
  }, []);

  // function passed to TaskForm
  async function handleAdd(newTask: NewTask) {
    const saved = await addTask(newTask);
    setTasks((prev) => [saved, ...prev]); // put new one at the top
    await fetchTasks();
  }

  async function handleMove(id: string, to: ColumnKey) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await updateTask(id, { ...task, status: to });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    await fetchTasks();
  }

  async function handleDelete(id: string) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetchTasks();
  }

  function matchesQueryAndTagAndAssignee(t: Task): boolean {
    const matchesQuery =
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(query.toLowerCase()));

    const matchesTag =
      !tag || (t.tag && t.tag.toLowerCase() === tag.toLowerCase());

    const matchesAssignee =
      !assignedTo || (t.assignedTo && t.assignedTo.toLowerCase() === assignedTo.toLowerCase());

    return Boolean(matchesQuery && matchesTag && matchesAssignee);
  }

  return (
    <div>
      <h2>Board</h2>
      <TaskForm onAdd={handleAdd} />
      <div className="filters">
        <SearchBar query={query} setQuery={setQuery} />
        <TagFilter tag={tag} setTag={setTag} />
        <AssignedToFilter
          assignedTo={assignedTo}
          setAssignedTo={setAssignedTo}
        />
      </div>

      <div className="board">
        <Column title="Todo" column="todo">
          {todoTasks
            .filter((t) => matchesQueryAndTagAndAssignee(t)) // optional if you want filtering
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
          {doingTasks
            .filter((t) => matchesQueryAndTagAndAssignee(t))
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
          {doneTasks
            .filter((t) => matchesQueryAndTagAndAssignee(t))
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
