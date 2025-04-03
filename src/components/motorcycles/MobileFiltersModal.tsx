import { useState } from "react";
import FiltersPanel from "./FiltersPanel";
import RangeDropdown from "./RangeDropdown";
import { generateRange } from "./MotorcyclesSummaryList";
import { useMotorcycleFilters } from "@/hooks/useMotorcyclesFilter";

const MobileFiltersModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, setFilters } = useMotorcycleFilters();

    return (
        <>
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
                        <FiltersPanel /> {/* Render all filters here */}
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
                    </div>
                </div>
            )

            }
        </>
    );
}

export default MobileFiltersModal;