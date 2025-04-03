import { MotorcycleFilters } from "@/models/MotorcyclesFilters";


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
        onChange({ [key]: value }); // ✅ Dynamic property name
    };

    const clearFilters = () => {
        onChange({ [minKey]: undefined, [maxKey]: undefined }); // ✅ Remove filters
    };

    return (
        <div className="w-80 p-3 bg-white border rounded-lg shadow-sm">
            <div className="flex justify-between text-xs font-medium mb-1">
                <span>{label}</span>
                <span className="text-blue-600">{minValue} - {maxValue} {unit}</span>
            </div>

            <div className="flex gap-2">
                {/* Min Dropdown */}
                <select
                    className="p-2 border rounded text-sm w-1/2"
                    name="min"
                    value={minValue}
                    onChange={(e) => updateFilter(minKey, Number(e.target.value))}
                >
                    {values.map((option) => (
                        <option key={option} value={option} disabled={option > maxValue!}>
                            Min: {option} {unit}
                        </option>
                    ))}
                </select>

                {/* Max Dropdown */}
                <select
                    className="p-2 border rounded text-sm w-1/2"
                    name="max"
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
            {(min || max) && <button className="text-xs text-red-600 hover:underline" onClick={clearFilters}>Clear</button>}

        </div>
    );
};