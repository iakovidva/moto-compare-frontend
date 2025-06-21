
import { fetchAllMotorcyclesSummary } from "@/lib/api/motorcycles";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const pickRandomItems = <T extends unknown>(arr: T[], n: number): T[] => {
    const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

export default async function PopularMotorcycles() {
    const { motorcycles } = await fetchAllMotorcyclesSummary({});
    return (
        <section className="py-8 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-foreground">
                        Popular Motorcycles
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground">
                        Explore the rides everyone's talking about
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {pickRandomItems(motorcycles, 4).map((motorcycle) => (
                        <div key={motorcycle.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <Link
                                href={`/motorcycles/${motorcycle.id}`}>
                                <div className="relative h-32 md:h-48 bg-muted">
                                    {/* TODO use images without background so all of them have the correct background depending on the theme selection. */}
                                    <Image
                                        src={motorcycle.image}
                                        alt={`${motorcycle.manufacturer} ${motorcycle.model}`}
                                        fill
                                        className="object-cover"
                                        priority={false}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                                    />
                                </div>
                            </Link>
                            <div className="p-3 md:p-6">
                                <div className="flex items-center justify-between mb-1 md:mb-2">
                                    <h3 className="text-sm md:text-xl font-bold truncate text-foreground">
                                        {motorcycle.model}
                                    </h3>
                                    <div className="flex items-center ml-1">
                                        <span className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current">✰</span>
                                        <span className="text-xs md:text-sm ml-1 text-muted-foreground">
                                            {/* TODO use actual review rating, or remove this at all. */}
                                            4.5
                                        </span>
                                    </div>
                                </div>
                                <p className="mb-2 md:mb-4 text-xs md:text-base text-muted-foreground">
                                    {motorcycle.manufacturer}
                                </p>

                                <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-muted-foreground">Displacement:</span>
                                        <span className="font-medium text-foreground">
                                            {motorcycle.displacement}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-muted-foreground">Horsepower:</span>
                                        <span className="font-medium text-foreground">
                                            {motorcycle.horsePower}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-muted-foreground">Year:</span>
                                        <span className="font-medium text-foreground">
                                            {motorcycle.yearRange}
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-xs md:text-sm py-1.5 md:py-2">
                                    + Compare
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};