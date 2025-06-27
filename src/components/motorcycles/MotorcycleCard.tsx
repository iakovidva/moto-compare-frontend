import Link from "next/link";
import { Button } from "../ui/button";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import CompareToggleButton from "../comparison/CompareToggleButton";
import Image from "next/image";

export default function MotorcycleCard({ motorcycle, actionSlot }: { motorcycle: MotorcycleSummary, actionSlot?: React.ReactNode }) {

    return (
        <>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
                <Link href={`/motorcycles/${motorcycle.id}`}>
                    <div className="h-24 md:h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                        <Image
                            alt={motorcycle.model}
                            src={motorcycle.image}
                            width={200}
                            height={100}
                            className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-orange-500 text-white rounded-full px-1.5 py-0.5 text-xs font-semibold">
                            {motorcycle.yearRange}
                        </div>
                    </div>
                </Link>

                <div className="p-2 md:p-4">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs md:text-sm font-bold text-foreground truncate pr-1">{motorcycle.model}</h3>
                    </div>

                    <p className="text-muted-foreground mb-2 text-xs">{motorcycle.manufacturer}</p>

                    <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Displacement:</span>
                            <span className="font-medium text-foreground text-right">{motorcycle.displacement} (cc)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Horsepower:</span>
                            <span className="font-medium text-foreground text-right">{motorcycle.horsePower} (hp)</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {actionSlot}
                        <CompareToggleButton bike={motorcycle} />
                    </div>
                </div>
            </div>
        </>
    );
}