import { SimilarBike } from "@/models/SimilarBike";
import Image from "next/image";
import Link from "next/link";

interface SimilarBikesProps {
    similarBikes: SimilarBike[],
}

export default function SimilarBikes({ similarBikes }: SimilarBikesProps) {
    if (!similarBikes || similarBikes.length === 0) return null;

    return (
        <>
            <h3 className="text-xl font-semibold mb-4">Similar Bikes</h3>

            <div className="space-y-4">
                {similarBikes.map((bike) => (
                    <Link
                        key={bike.id}
                        href={`/motorcycles/${bike.id}`}
                        className="block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-16 relative">
                                <Image
                                    src={bike.image}
                                    alt={bike.model}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                            <div>
                                <p className="font-semibold">{bike.model}</p>
                                <p className="text-sm text-gray-500">{bike.manufacturer}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
