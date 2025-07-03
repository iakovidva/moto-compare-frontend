import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import MotorcycleCard from "./MotorcycleCard";

export default function RecommendedMotorcycles({ recommendations }: { recommendations: MotorcycleSummary[] }) {
    return (
        <div className="rounded-lg border text-card-foreground shadow-sm border-border mb-6 md:mb-8"> {/* CARD */}
            <div className="pb-3 md:pb-6 flex flex-col space-y-1.5 p-6"> {/* CARD HEADER */}
                <div className="text-foreground text-lg md:text-xl text-2xl font-semibold leading-none tracking-tight"> {/* CARD TITLE */}
                    Recommended for You
                </div>
            </div>
            <div className="p-6 pt-0">
                <p className="text-xs md:text-sm mb-4 md:mb-6 text-muted-foreground">
                    Based on your favorites, you might also like these motorcycles:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {recommendations.map((motorcycle) => (
                        <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
                    ))}
                </div>
            </div>
        </div>
    );
}