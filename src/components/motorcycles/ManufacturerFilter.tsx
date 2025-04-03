import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import Image from "next/image";

const manufacturers = [
    { name: "KTM", logo: "/images/manufacturers/KTM-logo.png" },
    { name: "HONDA", logo: "/images/manufacturers/honda-logo.png" },
    { name: "YAMAHA", logo: "/images/manufacturers/yamaha-logo.jpg" },
    { name: "DUCATI", logo: "/images/manufacturers/ducati-logo.png" },
];

type ManufacturerFilterProps = {
    selectedManufacturer: string | undefined;
    onSelect: (filters: Partial<MotorcycleFilters>, resetPageNumber: boolean) => void
}

const ManufacturerFilter = ({ selectedManufacturer, onSelect }: ManufacturerFilterProps) => {
    return (
        <div className="m-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Select Manufacturer</h2>

            <div className="flex flex-wrap gap-3">
                {manufacturers.map(({ name, logo }) => (
                    <button
                        key={name}
                        className={`flex items-center px-3 py-2 border rounded-lg shadow-md transition ${selectedManufacturer === name ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => onSelect({ manufacturer: name as MotorcycleFilters["manufacturer"] }, true)}
                    >
                        <Image src={logo} alt={name} width={24} height={24} />
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default ManufacturerFilter;
