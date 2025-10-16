type Props = {
  assignedTo: string;
  setAssignedTo: (value: string) => void;
};

export default function AssignedToFilter({ assignedTo, setAssignedTo }: Props) {
  return (
    <input
      type="text"
      placeholder="Filter by assignee…"
      value={assignedTo}
      onChange={(e) => setAssignedTo(e.target.value)}
      style={{ padding: "6px", width: "160px" }}
    />
  );
}