import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import FilterBlock from "./FilterBlock";

type RangeDropdownProps = {
    label: string,
    unit?: string,
    min?: number,
    max?: number,
    values: number[],
    minKey: keyof MotorcycleFilters,
    maxKey: keyof MotorcycleFilters,
    onChange: (filters: Partial<MotorcycleFilters>) => void
}

export default function RangeDropdown({ label, unit, min, max, values, minKey, maxKey, onChange }: RangeDropdownProps) {
    const [minValue, maxValue] = [min ?? values?.at(0), max ?? values?.at(-1)];

    const updateFilter = (key: keyof MotorcycleFilters, value: number) => {
        onChange({ [key]: value });
    };

    const clearFilters = () => {
        onChange({ [minKey]: undefined, [maxKey]: undefined });
    };

    return (
        <FilterBlock label={label} onClear={(min || max) ? clearFilters : undefined}>
            <div className="flex gap-2">
                <select
                    className="p-2 border rounded text-sm w-1/2"
                    value={minValue}
                    onChange={(e) => updateFilter(minKey, Number(e.target.value))}
                >
                    {values.map((option) => (
                        <option key={option} value={option} disabled={option > maxValue!}>
                            Min: {option} {unit}
                        </option>
                    ))}
                </select>

                <select
                    className="p-2 border rounded text-sm w-1/2"
                    value={maxValue}
                    onChange={(e) => updateFilter(maxKey, Number(e.target.value))}
                >
                    {values.map((option) => (
                        <option key={option} value={option} disabled={option < minValue!}>
                            Max: {option} {unit}
                        </option>
                    ))}
                </select>
            </div>
        </FilterBlock>
    );
};