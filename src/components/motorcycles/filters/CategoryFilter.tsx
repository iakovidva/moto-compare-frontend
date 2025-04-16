import { CategoryEnum } from "@/constants/enums";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import FilterBlock from "./FilterBlock";

type CategoryFilterProps = {
    selectedCategory: string | undefined;
    onSelect: (filters: Partial<MotorcycleFilters>) => void
};

const CategoryFilter = ({ selectedCategory, onSelect }: CategoryFilterProps) => {
    const handleClear = () => onSelect({ category: undefined });

    return (
        <FilterBlock label="Category" onClear={selectedCategory ? handleClear : undefined}>
            <select
                className="w-full p-2 border rounded text-sm"
                value={selectedCategory || ""}
                onChange={(e) =>
                    onSelect({ category: e.target.value || undefined })
                }
            >
                <option value="">All Categories</option>
                {CategoryEnum.options.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </FilterBlock>
    );
};

export default CategoryFilter;