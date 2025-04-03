import { CategoryEnum } from "@/constants/enums";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";

const categoriesFromEnum = CategoryEnum.options;

type CategoryFilterProps = {
    selectedCategory: string | undefined;
    onSelect: (filters: Partial<MotorcycleFilters>) => void
};

const CategoryFilter = ({ selectedCategory, onSelect }: CategoryFilterProps) => {

    return (
        <div className="m-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Explore by Category</h2>

            <div className="flex flex-wrap gap-3">
                {CategoryEnum.options.map((category) => (
                    <button
                        key={category}
                        className={`flex items-center px-3 py-2 border rounded-lg shadow-md transition ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => onSelect({ category: category as MotorcycleFilters["manufacturer"] })}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;