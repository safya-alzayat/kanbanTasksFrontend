import { useState } from "react";
import type { Task, ColumnKey } from "../types";
import { updateTask } from "../api";

type Props = {
  task: Task;
  onMove: (id: string, to: ColumnKey) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onMove, onDelete }: Props) {
  const columns: ColumnKey[] = ["todo", "doing", "done"];
  const index = columns.indexOf(task.status);
  const prevColumn = columns[index - 1];
  const nextColumn = columns[index + 1];
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [assignedTo, setAssignedTo] = useState("");


  async function handleAssign(e: React.FormEvent) {
    e.preventDefault(); // prevent page reload
    if (!assignedTo.trim()) return; // don’t add empty assignee
    if (!selectedTask) return;
    selectedTask.assignedTo = assignedTo.trim();
    await updateTask(task.id, selectedTask);
    setAssignedTo("");
  }
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  }
  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="card" onClick={() => handleTaskClick(task)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {task.priority && (
          <span className={`priority-${task.priority}`}>[{task.priority}]</span>
        )}
        <strong>{task.title}</strong>
        {task.tag && <span className="tag">#{task.tag}</span>}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        {/* left arrow: only if not the first column */}
        {prevColumn && (
          <button onClick={() => onMove(task.id, prevColumn)}>↤</button>
        )}

        {/* right arrow: only if not the last column */}
        {nextColumn && (
          <button onClick={() => onMove(task.id, nextColumn)}>↦</button>
        )}

        {/* delete button */}
        <button
          onClick={() => onDelete(task.id)}
          style={{ marginLeft: "auto" }}
        >
          ✕
        </button>
      </div>
      {selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTask.title}</h2>
            <p>Status: {selectedTask.status}</p>
            <p>Tag: {selectedTask.tag}</p>
            <p>Priority: {selectedTask.priority}</p>
            <p>Assignee: {selectedTask.assignedTo || "Unassigned"}</p>
            <form onSubmit={handleAssign} className="task-assignment-form">
              <input
                type="text"
                placeholder="Assign task to..."
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                style={{ padding: "6px", flex: 1 }}
              />
              <button type="submit">Assign</button>
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
