import { SimilarBike } from "@/models/SimilarBike";
import Image from "next/image";
import Link from "next/link";
import CompareToggleButton from "../comparison/CompareToggleButton";

interface SimilarBikesProps {
    similarBikes: SimilarBike[],
}

export default function SimilarBikes({ similarBikes }: SimilarBikesProps) {
    if (!similarBikes || similarBikes.length === 0) return null;

    return (
        <div className="bg-background rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Similar Motorcycles
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {similarBikes.map((bike) => (
                    <div
                        key={bike.id}
                        className="bg-muted border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <Link href={`/motorcycles/${bike.id}`}>
                            <div className="h-32 relative flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                                <Image
                                    src={bike.image}
                                    alt={bike.model}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        </Link>

                        <div className="p-3">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm text-foreground truncate">
                                        {bike.model}
                                    </h3>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {bike.manufacturer} • {bike.yearRange}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-1 mb-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Engine:</span>
                                    <span className="font-medium text-foreground text-right">
                                        {bike.displacement}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Horsepower:</span>
                                    <span className="font-medium text-foreground text-right">
                                        {bike.horsePower}
                                    </span>
                                </div>
                            </div>
                            <CompareToggleButton bike={bike} compact />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
