import MotorcyclesSummaryList from "@/components/motorcycles/MotorcyclesSummaryList";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";

export default async function MotorcyclesPage() {
    // const motorcycles = await fetchAllMotorcyclesSummary(0, 6); //TODO
    return <MotorcyclesSummaryList motorcycles={[]} />
};
