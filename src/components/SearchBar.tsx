type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <input
      type="text"
      placeholder="Search tasks…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ padding: "6px", flex: 1 }}
    />
  );
}
