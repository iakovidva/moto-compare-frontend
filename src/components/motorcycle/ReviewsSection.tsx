import { ReviewResponse } from "@/models/MotorcycleDetailsModel";

interface ReviewsSectionProps {
    reviews: ReviewResponse[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {

    return (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold mb-4">User Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="p-2 border-b border-gray-300">
                        <p className="font-bold">{review.userName}</p>
                        <p className="text-yellow-400">
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </p>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review this bike!</p>
            )}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Leave a Review
            </button>
        </div>
    );
}
