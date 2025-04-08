
type SortDropdownProps = {
    selectedSort: string,
    onSortChange: (sortKey: string) => void
}

const SortDropdown = ({ selectedSort, onSortChange }: SortDropdownProps) => {
    return (
        <select
            className="p-2 border rounded"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
        >
            <option value="" disabled>Sort By</option>
            <option value="latest">Latest added</option>
            <option value="horsePower_desc">Power (High → Low)</option>
            <option value="horsePower_asc">Power (Low → High)</option>
            <option value="displacement_desc">Displacement (High → Low)</option>
            <option value="displacement_asc">Displacement (Low → High)</option>
            <option value="date_desc">Date (New → Old)</option>
            <option value="date_asc">Date (Old → New)</option>
        </select>
    );
};

export default SortDropdown;
