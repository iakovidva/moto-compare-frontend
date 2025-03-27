const SearchBar = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
    return (
        <input
            type="text"
            placeholder="🔍 Search motorcycles..."
            className="p-2 border rounded w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
export default SearchBar;
