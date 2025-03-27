import MotorcyclesSummaryList from "@/components/motorcycles/MotorcyclesSummaryList";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";


export default async function MotorcyclesPage() {
    const motorcycles = await fetchAllMotorcyclesSummary();
    const extentedMotorcycles = [...motorcycles, ...motorcycles, ...motorcycles];
    const ultraExtented = [...extentedMotorcycles, ...extentedMotorcycles, ...extentedMotorcycles];
    return <MotorcyclesSummaryList motorcycles={ultraExtented} />
};
