"use client"

import { useMotorcycleReviews } from "@/hooks/useMotorcycleReviews";
import RatingSummary from "./RatingSummary";
import ReviewsSection from "./ReviewsSection";

export default function ReviewsWrapper({ option, motorcycleId }: { option: "rating-summary" | "reviews", motorcycleId: string }) {

    const { data: reviews = [],
        isLoading,
        isError,
        refetch
    } = useMotorcycleReviews(motorcycleId);

    if (isLoading) return <p>Loading reviews...</p>;
    if (isError) return <p>Failed to load reviews.</p>;

    if (option === "rating-summary") {
        return <RatingSummary reviews={reviews} />
    }

    if (option === "reviews") {
        return <ReviewsSection motorcycleId={motorcycleId} reviews={reviews} onReviewSubmitted={refetch} />
    }

    return null;
}