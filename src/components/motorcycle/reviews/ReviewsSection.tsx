"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import AuthModal from "../../main-header/AuthModal";
import { useSubmitReview } from "@/hooks/useSubmitReview";
import { Review } from "@/models/Review";

type ReviewsSectionProps = {
    motorcycleId: string,
    reviews: Review[],
    onReviewSubmitted: () => void
}

export default function ReviewsSection({ motorcycleId, reviews, onReviewSubmitted }: ReviewsSectionProps) {
    const { accessToken } = useAuthStore();

    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [error, setError] = useState("");

    const mutation = useSubmitReview(motorcycleId!);
    const isSubmitting = mutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!rating || !comment.trim()) {
            setError("Please provide rating and comment");
            return;
        }
        mutation.mutate({ rating, comment }, {
            onSuccess: () => {
                setRating(0);
                setComment("");
                setShowReviewForm(false);
                onReviewSubmitted();
                console.log("Review submitted!");
            },
            onError: (err: any) => {
                setError(err.message || "Failed to submit review");
            }
        });
    };

    const handleLeaveReviewClick = () => {
        if (!accessToken) {
            setAuthModalOpen(true);
        } else {
            setShowReviewForm(true);
        }
    };

    const handleCancel = () => {
        setShowReviewForm(false);
        setRating(0);
        setComment("");
        setError("");
    };

    return (
        <>
            <div className="mt-10 p-6 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-4">User Reviews</h3>
                {reviews?.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="p-2 border-b border-gray-300">
                            <p className="font-bold">{review.userName}</p>
                            <p className="font-bold">  {new Date(review.createdAt).toLocaleString()}</p>
                            <p className="text-yellow-400">
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </p>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first!</p>
                )}
                <button
                    onClick={handleLeaveReviewClick}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Leave a Review
                </button>

                {authModalOpen && (
                    <AuthModal
                        isOpen={authModalOpen}
                        onClose={() => setAuthModalOpen(false)}
                    />
                )}

                {showReviewForm && (
                    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white rounded shadow space-y-4">
                        <div>
                            <label htmlFor="rating" className="block mb-1 font-semibold">Rating</label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                disabled={isSubmitting}
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                <option value={0} disabled>
                                    Select rating
                                </option>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <option key={star} value={star}>
                                        {"★".repeat(star)}
                                        {"☆".repeat(5 - star)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="comment" className="block mb-1 font-semibold">Comment</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={isSubmitting}
                                rows={3}
                                className="w-full border rounded px-3 py-2 resize-none"
                                placeholder="Write your review here..."
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 text-white transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white transition"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
