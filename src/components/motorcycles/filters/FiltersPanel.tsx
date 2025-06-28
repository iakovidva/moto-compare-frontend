"use client"

import CategoryFilter from "./CategoryFilter";
import ManufacturerFilter from "./ManufacturerFilter";
import RangeDropdown from "./RangeDropdown";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";

interface FiltersPanelProps {
    category?: string,
    manufacturer?: string,
    horsePowerMin?: number,
    horsePowerMax?: number,
    displacementMin?: number,
    displacementMax?: number,
    yearMin?: number,
    yearMax?: number,
    setFilters: (newFilters?: Partial<MotorcycleFilters>) => void,
    clearTempFilters?: () => void
}

const FiltersPanel = ({ category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, yearMin, yearMax,
    setFilters, clearTempFilters }: FiltersPanelProps) => {

    const clearFilters = () => {
        if (clearTempFilters) clearTempFilters();
        setFilters(undefined);
    };

    return (
        <div className="rounded-lg shadow-lg p-1 sticky top-6 bg-background">
            <div className="flex flex-row justify-between mb-4 bg-background">
                <h2 className="text-xl font-bold">Filters</h2>
                {(manufacturer || category || horsePowerMin || horsePowerMax || displacementMin || displacementMax || yearMin || yearMax) && (
                    <button
                        className="bg-red-500 text-white px-2 rounded"
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                )}
            </div>
            <RangeDropdown
                label="Horsepower"
                unit="HP"
                min={horsePowerMin}
                max={horsePowerMax}
                values={generateRange(5, 300, 20)}
                minKey="horsePowerMin"
                maxKey="horsePowerMax"
                onChange={setFilters}
            />

            <RangeDropdown
                label="Displacement"
                unit="cc"
                min={displacementMin}
                max={displacementMax}
                values={generateRange(50, 1500, 50)}
                minKey="displacementMin"
                maxKey="displacementMax"
                onChange={setFilters}
            />

            <RangeDropdown
                label="Year"
                min={yearMin}
                max={yearMax}
                values={generateRange(1990, 2025, 1)}
                minKey="yearMin"
                maxKey="yearMax"
                onChange={setFilters}
            />

            <ManufacturerFilter selectedManufacturer={manufacturer} onSelect={setFilters} />
            <CategoryFilter selectedCategory={category} onSelect={setFilters} />
        </div>
    );

};

export default FiltersPanel;

export const generateRange = (min: number, max: number, step: number) => {
    const result: number[] = [];
    for (let i = min; i <= max; i += step) {
        result.push(i);
    }
    return result;
}