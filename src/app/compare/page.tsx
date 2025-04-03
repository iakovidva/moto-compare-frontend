import MotorcycleComparison from "@/components/comparison/MotorcycleComparison";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";

export default async function ComparePage() {
    const response = await fetchAllMotorcyclesSummary({});
    const motorcycles = response.motorcycles;

    return (
        <div className="flex justify-center py-10">
            <MotorcycleComparison motorcycles={motorcycles} />
        </div>
    );
}
