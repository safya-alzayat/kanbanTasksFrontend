import type { Task } from "../types"

type Props = {
  task: Task
}

export default function TaskItem({ task }: Props) {
  return (
    <div className="card">
      <strong>{task.title}</strong>
      {task.tag && <span className="tag">#{task.tag}</span>}
    </div>
  )
}
