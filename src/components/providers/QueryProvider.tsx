"use client";

import { HydrationBoundary, HydrationBoundaryProps, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    children: React.ReactNode;
    hydrationState?: HydrationBoundaryProps["state"];
};


export function QueryProvider({ children, hydrationState }: Props) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={hydrationState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
}