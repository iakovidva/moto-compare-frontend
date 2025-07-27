import { fetchPopularManufacturers } from "@/lib/api/statistics";
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
        <div className="my-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Popular Manufacturers</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {manufacturers!.map((manufacturer) => {
                    const isSelected = selected === manufacturer.name; //TODO doesn't work.

                    return (
                        <button
                            key={manufacturer.name}
                            onClick={() => onSelect(manufacturer.name)}
                            className={`flex flex-col items-center w-[80px] p-2 rounded-xl border transition duration-200 shadow-sm
                  ${isSelected
                                    ? "bg-muted text-green-800 border-blue-600"
                                    : "bg-muted hover:shadow-lg hover:border-orange-600"}
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
                                <span className="text-xs">
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