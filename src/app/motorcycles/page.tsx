import MotorcyclesPageShell from "@/components/motorcycles/MotorcyclesPageShell";
import MotorcyclesSummaryList from "@/components/motorcycles/MotorcyclesSummaryList";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { fetchAllMotorcyclesSummary } from "@/lib/api/motorcycles";
import { fetchPopularManufacturers } from "@/lib/api/statistics";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function MotorcyclesPage() {

    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ["popularManufacturers"],
            queryFn: fetchPopularManufacturers,
        });
    } catch (error) {
        console.error("Failed to prefetch popular manufacturers:", error);
        // Continue without prefetched data - the component will handle the error
    }

    const dehydratedState = dehydrate(queryClient);

    // const motorcycles = await fetchAllMotorcyclesSummary(0, 6); //TODO
    return (
        <QueryProvider hydrationState={dehydratedState} >
            <MotorcyclesPageShell>
                <Suspense>
                    <MotorcyclesSummaryList motorcycles={[]} />
                </Suspense>
            </MotorcyclesPageShell>
        </QueryProvider>
    );
};
