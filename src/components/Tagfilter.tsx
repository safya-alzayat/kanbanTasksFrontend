type Props = {
  tag: string;
  setTag: (value: string) => void;
};

export default function TagFilter({ tag, setTag }: Props) {
  return (
    <input
      type="text"
      placeholder="Filter by tag…"
      value={tag}
      onChange={(e) => setTag(e.target.value)}
      style={{ padding: "6px", width: "160px" }}
    />
  );
}
