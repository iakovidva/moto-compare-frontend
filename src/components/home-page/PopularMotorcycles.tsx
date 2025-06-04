
import { fetchAllMotorcyclesSummary } from "@/lib/api/motorcycles";
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
        <section className="py-16 px-4 bg-white">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">🔥 Popular Motorcycles</h2>
                <p className="text-gray-500 mt-2">Top trending bikes in our community</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {pickRandomItems(motorcycles, 4).map((moto) => (
                    <Link
                        href={`/motorcycles/${moto.id}`}
                        key={moto.id}
                        className="group relative bg-gray-50 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                    >
                        <div className="p-4 flex flex-col items-center text-center">
                            <div className="w-full h-40 relative mb-4">
                                <Image
                                    src={moto.image}
                                    alt={moto.model}
                                    fill
                                    sizes="100%"
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <p className="text-lg font-semibold text-gray-800">{moto.model}</p>
                            <p className="text-sm text-gray-500">{moto.manufacturer}</p>
                        </div>

                        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Popular
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};