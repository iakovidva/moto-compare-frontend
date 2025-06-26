"use client"

import AuthModal from "@/components/main-header/AuthModal";
import { Button } from "@/components/ui/button";
import { useMotorcycleReviews } from "@/hooks/useMotorcycleReviews";
import { useSubmitReview } from "@/hooks/useSubmitReview";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export default function NewReviewsSection({ motorcycleId }: { motorcycleId: string }) {

    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [error, setError] = useState("");

    const { data: reviews = [],
        isLoading,
        isError,
        refetch
    } = useMotorcycleReviews(motorcycleId);

    const mutation = useSubmitReview(motorcycleId!);
    const { accessToken } = useAuthStore();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!accessToken) {
            setAuthModalOpen(true);
            return;
        }

        setError("");
        if (!newReview.rating || !newReview.comment.trim()) {
            setError("Please provide rating and comment");
            return;
        }
        mutation.mutate(newReview, {
            onSuccess: () => {
                setNewReview({ rating: 0, comment: '' })
                refetch();
                console.log("Review submitted!");
            },
            onError: (err: any) => {
                setError(err.message || "Failed to submit review");
            }
        });
    };

    const [reviewsToShow, setReviewsToShow] = useState(5);
    const [reviewSort, setReviewSort] = useState('latest');
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const sortedReviews = [...reviews || []].sort((a, b) => {
        switch (reviewSort) {
            case 'best':
                return b.rating - a.rating;
            case 'worst':
                return a.rating - b.rating;
            case 'latest':
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const displayedReviews = sortedReviews.slice(0, reviewsToShow);
    const hasMoreReviews = reviewsToShow < sortedReviews.length;

    return (
        <>
            {/* Reviews Section - Always Open */}
            <div className="bg-card rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-3">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">User Reviews</h2>
                    <select
                        value={reviewSort}
                        onChange={(e) => setReviewSort(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm bg-background border-input text-foreground"
                    >
                        <option value="latest">Latest Reviews</option>
                        <option value="best">Best Reviews</option>
                        <option value="worst">Worst Reviews</option>
                    </select>
                </div>

                {/* Write Review */}
                <div className="border-b border-border pb-4 md:pb-6 mb-4 md:mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Write a Review</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-muted-foreground mb-2 text-sm md:text-base">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="p-1 focus:outline-none"
                                    >
                                        <span className={`text-2xl ${star <= (hoveredRating || newReview.rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                            }`}>
                                            ★
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-muted-foreground mb-2 text-sm md:text-base">Comment</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                className="w-full bg-background border-input border rounded-lg p-3 h-20 md:h-24 text-sm md:text-base text-foreground"
                                placeholder="Share your experience with this motorcycle..."
                            />
                        </div>
                        <Button
                            onClick={handleSubmit}
                            className="bg-orange-500 hover:bg-orange-600 text-sm md:text-base"
                        >
                            Submit Review
                        </Button>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                    </div>
                </div>

                {/* Display Reviews */}
                <div className="space-y-4">
                    {displayedReviews?.length > 0 ? (
                        displayedReviews.map((review) => (
                            <div key={review.createdAt + review.userName} className="border border-border rounded-lg p-3">
                                <div className="flex justify-between items-start gap-2">
                                    <p className="text-foreground font-medium text-sm">{review.userName}</p>
                                    <span className="text-muted-foreground text-xs">
                                        {new Date(review.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 mb-2 text-sm">
                                    <span className="text-yellow-400">
                                        {"★".repeat(Math.round(review.rating))}
                                        {"☆".repeat(5 - Math.round(review.rating))}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {review.rating.toFixed(1)}/5
                                    </span>
                                </div>

                                <p className="text-foreground text-sm">{review.comment}</p>
                            </div>
                        ))) : (
                        <p>No reviews yet. Be the first!</p>
                    )}

                    {hasMoreReviews && (
                        <Button
                            onClick={() => setReviewsToShow(prev => prev + 5)}
                            variant="outline"
                            className="w-full mt-4 text-sm md:text-base"
                        >
                            Show More Reviews ({sortedReviews.length - reviewsToShow} remaining)
                        </Button>
                    )}
                </div>
            </div>

            {authModalOpen && (
                <AuthModal
                    isOpen={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                    message="✨ Please log in or create an account to leave a review and share your experience!"
                />
            )}
        </>
    );
}