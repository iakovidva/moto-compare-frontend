"use client"

import AuthModal from "@/components/main-header/AuthModal";
import { Button } from "@/components/ui/button";
import { useMotorcycleReviews } from "@/hooks/useMotorcycleReviews";
import { useSubmitReview } from "@/hooks/useSubmitReview";
import { useUpdateReview } from "@/hooks/useUpdateReview";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function NewReviewsSection({ motorcycleId }: { motorcycleId: string }) {

    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [error, setError] = useState("");
    const [editingReview, setEditingReview] = useState<{ rating: number, comment: string } | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && showDeleteConfirm) {
                setShowDeleteConfirm(false);
            }
        };

        if (showDeleteConfirm) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [showDeleteConfirm]);

    const { data: reviews = [],
        isLoading,
        isError
    } = useMotorcycleReviews(motorcycleId);

    const submitMutation = useSubmitReview(motorcycleId!);
    const updateMutation = useUpdateReview(motorcycleId!);
    const deleteMutation = useDeleteReview(motorcycleId!);
    const { accessToken, email } = useAuthStore();

    // Convert email to username format (remove @domain.com and replace . with _)
    const getUsernameFromEmail = (email: string) => {
        if (!email) return null;
        return email.split('@')[0].replace(/\./g, '_');
    };

    const currentUsername = email ? getUsernameFromEmail(email) : null;    
    const userExistingReview = reviews.find(review => review.userName === currentUsername);
    const hasExistingReview = !!userExistingReview;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!accessToken) {
            setAuthModalOpen(true);
            return;
        }

        setError("");
        const reviewData = editingReview || newReview;
        
        if (!reviewData.rating || !reviewData.comment.trim()) {
            setError("Please provide rating and comment");
            return;
        }

        // Use appropriate mutation based on whether we're editing or creating
        const mutation = editingReview ? updateMutation : submitMutation;
        
        mutation.mutate(reviewData, {
            onSuccess: () => {
                setNewReview({ rating: 0, comment: '' });
                setEditingReview(null);
            },
            onError: (err: any) => {
                setError(err.message || (editingReview ? "Failed to update review" : "Failed to submit review"));
            }
        });
    };

    const handleEditReview = () => {
        if (userExistingReview) {
            setEditingReview({
                rating: userExistingReview.rating,
                comment: userExistingReview.comment
            });
        }
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
        setError("");
    };

    const handleDeleteReview = async () => {
        setShowDeleteConfirm(true);
    };

    const confirmDeleteReview = async () => {
        setError("");
        setShowDeleteConfirm(false);
        
        // Optimistically remove the user's review from the UI immediately
        const currentUsername = email ? getUsernameFromEmail(email) : null;
        if (currentUsername) {
            queryClient.setQueryData(["reviews", motorcycleId], (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.filter((review: any) => review.userName !== currentUsername);
            });
        }
        
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                console.log("Review deleted!");
                // Ensure the cache is properly updated
                queryClient.invalidateQueries({ queryKey: ["reviews", motorcycleId] });
            },
            onError: (err: any) => {
                // If deletion fails, restore the original data
                queryClient.invalidateQueries({ queryKey: ["reviews", motorcycleId] });
                setError(err.message || "Failed to delete review");
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

    // Separate user's review from others and always put it first
    const userReview = sortedReviews.find(review => accessToken && review.userName === currentUsername);
    const otherReviews = sortedReviews.filter(review => !accessToken || review.userName !== currentUsername);
    
    // Combine with user's review first, then others
    const reviewsWithUserFirst = userReview ? [userReview, ...otherReviews] : otherReviews;
    
    const displayedReviews = reviewsWithUserFirst.slice(0, reviewsToShow);
    const hasMoreReviews = reviewsToShow < reviewsWithUserFirst.length;

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

                {/* Write Review Section */}
                <div className="border-b border-border pb-4 md:pb-6 mb-4 md:mb-6">
                    {accessToken && hasExistingReview && !editingReview ? (
                        /* User has existing review - show message to scroll down */
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">Write a Review</h3>
                            <div className="bg-muted border rounded-lg p-4 text-center">
                                <p className="text-foreground text-sm mb-2">
                                    ✨ You already have a review for this motorcycle!
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Scroll down to see your review and edit or delete it if needed.
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Show new review form or edit form */
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                {editingReview ? "Edit Your Review" : "Write a Review"}
                            </h3>
                            {!accessToken && (
                                <div className="bg-muted rounded-lg p-4 mb-4 text-center">
                                    <p className="text-muted-foreground text-sm mb-3">
                                        Please log in to write a review and share your experience with this motorcycle.
                                    </p>
                                    <Button
                                        onClick={() => setAuthModalOpen(true)}
                                        variant="outline"
                                        className="text-sm"
                                    >
                                        Log In to Review
                                    </Button>
                                </div>
                            )}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-muted-foreground mb-2 text-sm md:text-base">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            const currentRating = editingReview?.rating || newReview.rating;
                                            return (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    disabled={!accessToken}
                                                    onClick={() => {
                                                        if (editingReview) {
                                                            setEditingReview({ ...editingReview, rating: star });
                                                        } else {
                                                            setNewReview({ ...newReview, rating: star });
                                                        }
                                                    }}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    className={`p-1 focus:outline-none ${!accessToken ? 'cursor-not-allowed opacity-50' : ''}`}
                                                >
                                                    <span className={`text-2xl ${star <= (hoveredRating || currentRating)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                        }`}>
                                                        ★
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-muted-foreground mb-2 text-sm md:text-base">Comment</label>
                                    <textarea
                                        disabled={!accessToken}
                                        value={editingReview?.comment || newReview.comment}
                                        onChange={(e) => {
                                            if (editingReview) {
                                                setEditingReview({ ...editingReview, comment: e.target.value });
                                            } else {
                                                setNewReview({ ...newReview, comment: e.target.value });
                                            }
                                        }}
                                        className={`w-full bg-background border-input border rounded-lg p-3 h-20 md:h-24 text-sm md:text-base text-foreground ${
                                            !accessToken ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        placeholder={accessToken ? "Share your experience with this motorcycle..." : "Log in to write a review"}
                                    />
                                </div>
                                {accessToken && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleSubmit}
                                            className="bg-orange-500 hover:bg-orange-600 text-sm md:text-base text-white"
                                            disabled={submitMutation.isPending || updateMutation.isPending}
                                        >
                                            {(submitMutation.isPending || updateMutation.isPending) 
                                                ? "Please wait..." 
                                                : editingReview 
                                                ? "Update Review" 
                                                : "Submit Review"
                                            }
                                        </Button>
                                        {editingReview && (
                                            <Button
                                                onClick={handleCancelEdit}
                                                variant="outline"
                                                className="text-sm md:text-base"
                                                disabled={updateMutation.isPending}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                )}
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Display Reviews */}
                <div className="space-y-4">
                    {displayedReviews?.length > 0 ? (
                        displayedReviews.map((review) => {
                            const isCurrentUserReview = accessToken && review.userName === currentUsername;
                            return (
                                <div 
                                    key={review.createdAt + review.userName} 
                                    className={`border rounded-lg p-4 ${
                                        isCurrentUserReview ? 'border-primary bg-accent' : 'border-border'
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <p className="text-foreground font-medium text-sm">{review.userName}</p>
                                            {isCurrentUserReview && (
                                                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                                    Your review
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-muted-foreground text-xs">
                                            {new Date(review.createdAt).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-1 text-sm">
                                            <span className="text-yellow-400">
                                                {"★".repeat(Math.round(review.rating))}
                                                {"☆".repeat(5 - Math.round(review.rating))}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {review.rating.toFixed(1)}/5
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-foreground text-sm mb-3">{review.comment}</p>
                                    
                                    {/* Action buttons for user's own review - bottom right */}
                                    {isCurrentUserReview && !editingReview && (
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                onClick={handleEditReview}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-7 px-3"
                                                disabled={updateMutation.isPending || deleteMutation.isPending}
                                            >
                                                ✏️ Edit
                                            </Button>
                                            <Button
                                                onClick={handleDeleteReview}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-7 px-3"
                                                disabled={updateMutation.isPending || deleteMutation.isPending}
                                            >
                                                {deleteMutation.isPending ? "🔄 Deleting..." : "🗑️ Delete"}
                                            </Button>
                                        </div>
                                    )}
                                    
                                    {/* Show editing message if user is currently editing this review */}
                                    {isCurrentUserReview && editingReview && (
                                        <div className="pt-2 border-t border-border">
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                ✏️ Currently editing this review above...
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p>No reviews yet. Be the first!</p>
                    )}

                    {hasMoreReviews && (
                        <Button
                            onClick={() => setReviewsToShow(prev => prev + 5)}
                            variant="outline"
                            className="w-full mt-4 text-sm md:text-base"
                        >
                            Show More Reviews ({reviewsWithUserFirst.length - reviewsToShow} remaining)
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

            {/* Custom Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-background border-2 border-border rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all scale-100 animate-in fade-in duration-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center ring-2 ring-red-200 dark:ring-red-800">
                                <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Delete Review</h3>
                                <p className="text-sm text-red-600 dark:text-red-400 font-medium">This action cannot be undone</p>
                            </div>
                        </div>
                        
                        <p className="text-foreground mb-8 text-base leading-relaxed">
                            Are you sure you want to delete your review? This will permanently remove your rating and comments from this motorcycle.
                        </p>

                        <div className="flex gap-4 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={deleteMutation.isPending}
                                className="px-6 py-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDeleteReview}
                                disabled={deleteMutation.isPending}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                                {deleteMutation.isPending ? "Deleting..." : "Delete Review"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}