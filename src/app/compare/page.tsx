import MotorcycleComparison from "@/components/comparison/MotorcycleComparison";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";

export default async function ComparePage() {
    const motorcycles: MotorcycleSummary[] = await fetchAllMotorcyclesSummary();

    return (
        <div className="flex justify-center py-10">
            <MotorcycleComparison motorcycles={motorcycles} />
        </div>
    );
}
