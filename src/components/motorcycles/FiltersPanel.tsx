"use client"

import CategoryFilter from "./CategoryFilter";
import ManufacturerFilter from "./ManufacturerFilter";

import { useMotorcycleFilters } from "@/hooks/useMotorcyclesFilter";
import SearchBar from "./SearchBar";
import { useSearchMotorcycle } from "@/hooks/useSearchMotorcycle";

const FiltersPanel = () => {
    const { category, manufacturer, setFilters } = useMotorcycleFilters();
    const { search, setSearch } = useSearchMotorcycle(); // ✅ Use the new search hook

    const clearFilters = () => {
        setFilters(undefined);
    };

    return (
        <div className="flex flex-col gap-4 mb-6">
            <SearchBar value={search} onChange={setSearch} />
            <ManufacturerFilter selectedManufacturer={manufacturer} onSelect={setFilters} />
            <CategoryFilter selectedCategory={category} onSelect={setFilters} />

            {/* ✅ "Clear Filters" Button */}
            {(manufacturer || category) && (
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                    onClick={clearFilters}
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );
};

export default FiltersPanel;
