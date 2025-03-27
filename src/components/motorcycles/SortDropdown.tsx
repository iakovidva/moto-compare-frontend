const SortDropdown = ({ selectedSort, onSortChange }: { selectedSort: string; onSortChange: (sort: string) => void }) => {
    return (
        <select
            className="p-2 border rounded"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
        >
            <option value="">Sort By</option>
            <option value="name">Name (A-Z)</option>
            <option value="power">Power (HP) High to Low</option>
        </select>
    );
};
export default SortDropdown;
