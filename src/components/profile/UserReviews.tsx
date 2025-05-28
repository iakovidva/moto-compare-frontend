"use client";

import { useUserReviews } from "@/hooks/useUserReviews";

export default function UserReviews() {

    const { data: reviews = [], isLoading, error } = useUserReviews();

    if (isLoading || !reviews) return <p>Loading...</p>;
    if (error) return <p>Failed to user's reviews</p>;

    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your Reviews</h2>
            {reviews.length === 0 ? (
                <p>You haven’t reviewed any motorcycles yet.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.createdAt} className="border rounded p-3">
                            <p className="font-bold">{review.userName}</p>
                            <p className="font-bold">{review.motorcycleId} Maybe show moto Info - maybe model</p>
                            <p className="text-yellow-500">Rating: {"⭐".repeat(review.rating)}</p>
                            <p className="text-gray-700 italic">{review.comment}</p>
                            <p className="text-sm text-gray-400">Posted on {new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}