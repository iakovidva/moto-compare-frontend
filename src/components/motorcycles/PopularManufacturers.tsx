import { fetchPopularManufacturers } from "@/lib/MotorcycleApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type PopularManufacturersProps = {
    onSelect: (manufacturer: string) => void;
    selected?: string;
};

const PopularManufacturers = ({ onSelect, selected }: PopularManufacturersProps) => {

    const { data: manufacturers, isLoading } = useQuery({
        queryKey: ['popularManufacturers'],
        queryFn: fetchPopularManufacturers,
        // staleTime: 1000 * 60 * 5,
    });

    if (isLoading || !manufacturers) return <p>Loading manufacturers...</p>;

    return (
        <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Popular Manufacturers</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {manufacturers!.map((manufacturer) => {
                    const isSelected = selected === manufacturer.name;

                    return (
                        <button
                            key={manufacturer.name}
                            onClick={() => onSelect(manufacturer.name)}
                            className={`flex flex-col items-center w-[100px] p-2 rounded-xl border transition duration-200 shadow-sm
                  ${isSelected
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white hover:shadow-md hover:border-blue-300"}
                `}
                        >
                            <div className="relative w-[50px] h-[50px] mb-2">
                                <Image
                                    src={manufacturer.logo}
                                    alt={manufacturer.name}
                                    fill
                                    className="object-contain"
                                    sizes="50px"
                                />
                            </div>
                            {manufacturer.count !== undefined && (
                                <span className={`text-xs ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                                    ({manufacturer.count})
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularManufacturers;