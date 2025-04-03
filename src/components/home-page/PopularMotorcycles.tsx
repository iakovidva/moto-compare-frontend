
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import Image from "next/image";
import Link from "next/link";

const pickRandomItems = <T extends unknown>(arr: T[], n: number): T[] => {
    const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

export default async function PopularMotorcycles() {
    const { motorcycles } = await fetchAllMotorcyclesSummary({});
    return (
        <div className="text-center">
            <p className="text-2xl font-semibold">
                The most popular motorcycles
            </p>
            <div className="flex flex-wrap justify-center mt-4">
                {pickRandomItems(motorcycles, 4)
                    .map((moto) => (
                        <Link
                            href={`/motorcycles/${moto.id}`}
                            key={moto.id}
                            className="w-60 p-8 m-4 border rounded-lg shadow-sm flex flex-col items-center bg-gray-100 "
                        >
                            <p className="text-xl font-medium">{moto.model}</p>
                            <p className="text-gray-600">{moto.manufacturer}</p>
                            <div className="mt-4">
                                <Image src={moto.image} alt={moto.model} width={300} height={300} />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};