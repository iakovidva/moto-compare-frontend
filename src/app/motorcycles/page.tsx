import MotorcyclesPageShell from "@/components/motorcycles/MotorcyclesPageShell";
import MotorcyclesSummaryList from "@/components/motorcycles/MotorcyclesSummaryList";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { fetchAllMotorcyclesSummary, fetchPopularManufacturers } from "@/lib/api/motorcycles";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function MotorcyclesPage() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["popularManufacturers"],
        queryFn: fetchPopularManufacturers,
    });

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
