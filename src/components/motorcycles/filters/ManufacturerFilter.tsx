import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import FilterBlock from "./FilterBlock";
import { ManufacturerEnum } from "@/constants/enums";

type ManufacturerFilterProps = {
    selectedManufacturer: string | undefined;
    onSelect: (filters: Partial<MotorcycleFilters>, resetPageNumber: boolean) => void
}

const ManufacturerFilter = ({ selectedManufacturer, onSelect }: ManufacturerFilterProps) => {
    const handleClear = () => onSelect({ manufacturer: undefined }, true);

    return (
        <FilterBlock label="Manufacturer" onClear={selectedManufacturer ? handleClear : undefined}>
            <select
                className="w-full p-2 border rounded text-sm"
                value={selectedManufacturer || ""}
                onChange={(e) =>
                    onSelect(
                        { manufacturer: e.target.value || undefined },
                        true
                    )
                }
            >
                <option value="">All Manufacturers</option>
                {ManufacturerEnum.options.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </FilterBlock>
    );
};

export default ManufacturerFilter;
