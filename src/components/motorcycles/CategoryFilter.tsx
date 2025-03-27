const categories = ["engine", "transmission", "chassis", "brakes", "electronics"];

const CategoryFilter = ({ selectedCategory, onSelect }: { selectedCategory: string | null; onSelect: (category: string | null) => void }) => {
    return (
        <select
            className="p-2 border rounded"
            value={selectedCategory || ""}
            onChange={(e) => onSelect(e.target.value || null)}
        >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
            ))}
        </select>
    );
};
export default CategoryFilter;
