import type { Task, ColumnKey } from "../types";

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

  return (
    <div className="card">
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
    </div>
  );
}
