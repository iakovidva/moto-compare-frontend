"use client"

import CategoryFilter from "./CategoryFilter";
import ManufacturerFilter from "./ManufacturerFilter";

import SearchBar from "./SearchBar";
import { useSearchMotorcycle } from "@/hooks/useSearchMotorcycle";
import RangeDropdown from "./RangeDropdown";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import { useState } from "react";

interface FiltersPanelProps {
    category?: string,
    manufacturer?: string,
    horsePowerMin?: number,
    horsePowerMax?: number,
    displacementMin?: number,
    displacementMax?: number,
    setFilters: (newFilters?: Partial<MotorcycleFilters>) => void
}

const FiltersPanel = ({ category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, setFilters }: FiltersPanelProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); // USED FOR MOBILE
    const { search, setSearch } = useSearchMotorcycle(); // TODO Maybe that should be go to an individual component and move to another place

    const clearFilters = () => {
        setFilters(undefined);
    };

    return (
        <>
            {/* // MOBILE VIEW */}
            <div className="md:hidden">
                <button className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg md:hidden" onClick={() => setIsOpen(true)}>
                    Filters
                </button>

                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center">
                        <button
                            className="absolute top-4 right-6 text-white text-3xl"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                        <div className="bg-white w-11/12 h-5/6 p-6 rounded-lg overflow-auto">
                            <h2 className="text-xl font-bold mb-4">Filters</h2>
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
                    </div>
                )
                }
            </div>

            {/* // BIG SCREEN VIEW */}
            <div className="hidden md:block">
                <div className="flex flex-col gap-4 mb-6">
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
            </div>
        </>
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