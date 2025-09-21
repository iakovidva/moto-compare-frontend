import { CategoryEnum } from "@/constants/enums";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import FilterBlock from "./FilterBlock";
import { formatCategory } from "@/lib/utils";
import { getCategoryStats } from "@/lib/api/statistics";

type CategoryFilterProps = {
    selectedCategory: string | undefined;
    onSelect: (filters: Partial<MotorcycleFilters>) => void
};

const CategoryFilter = async ({ selectedCategory, onSelect }: CategoryFilterProps) => {
    const handleClear = () => onSelect({ category: undefined });
    const categories = await getCategoryStats();

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
                {categories.map((category) => (
                    <option key={category.category} value={category.category}>
                        {formatCategory(category.category)}
                    </option>
                ))}
            </select>
        </FilterBlock>
    );
};

export default CategoryFilter;