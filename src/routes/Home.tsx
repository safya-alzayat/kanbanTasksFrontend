import { useState, useEffect } from "react"
import TaskForm from "../components/TaskForm"
import Column from "../components/Columns.tsx"
import TaskItem from "../components/TaskItem"
import type { ColumnKey, Task } from "../types"
import { loadTasks, saveTasks } from "../storage"

export default function Home() {
  // state: an array of tasks
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  // persist tasks whenever they change
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // function passed to TaskForm
  function addTask(newTask: Task) {
    setTasks(prev => [newTask, ...prev]) // put new one at the top
  }

  return (
    <div>
      <h2>Board</h2>
      <TaskForm onAdd={addTask} />
      
<div className="board">
        <Column title="Todo" column="todo">
        {tasks.filter(t => t.column === "todo").map(t =>
            <TaskItem key={t.id} task={t} onMove={moveTask} onDelete={deleteTask} />
        )}
        </Column>

        <Column title="Doing" column="doing">
        {tasks.filter(t => t.column === "doing").map(t =>
            <TaskItem key={t.id} task={t} onMove={moveTask} onDelete={deleteTask} />
        )}
        </Column>

        <Column title="Done" column="done">
        {tasks.filter(t => t.column === "done").map(t =>
            <TaskItem key={t.id} task={t} onMove={moveTask} onDelete={deleteTask} />
        )}
        </Column>
      </div>
    </div>
  )

  function moveTask(id: string, to: ColumnKey) {
  setTasks(prev =>
    prev.map(t => (t.id === id ? { ...t, column: to } : t))
  )
}

function deleteTask(id: string) {
  setTasks(prev => prev.filter(t => t.id !== id))
}

}
