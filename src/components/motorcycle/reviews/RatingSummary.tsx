"use client"

import { useMotorcycleReviews } from "@/hooks/useMotorcycleReviews";

export default function RatingSummary({ motorcycleId }: { motorcycleId: string }) {

    const { data: reviews = [],
        isLoading,
        isError
    } = useMotorcycleReviews(motorcycleId);

    if (isLoading) return <p>Loading reviews...</p>;
    if (isError) return <p>Failed to load reviews.</p>;

    const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    return (
        <>
            <div className="flex items-center mt-2">
                <div className="flex items-center">
                    <span className="text-yellow-400 text-xl">
                        {"★".repeat(Math.round(average))}{"☆".repeat(5 - Math.round(average))}
                    </span>
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                    {average.toPrecision(3)} ({reviews.length} reviews)
                </span>
            </div>
        </>
    );
}