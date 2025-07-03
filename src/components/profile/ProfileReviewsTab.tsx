import { Review } from "@/hooks/useUserReviews";
import Link from "next/link";

export default function ProfileReviewsTab({ reviews }: { reviews: Review[] }) {
    if (reviews.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                    <span className="text-2xl text-foreground">✎</span>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-1">No reviews yet</h4>
                <p className="text-muted-foreground mb-4">Share your thoughts on motorcycles you've tried</p>
                <Link href={"/motorcycles"}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                    Browse motorcycles to review ›
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">My Reviews ({reviews.length})</h3>
                {reviews.length > 0 && (
                    <Link href={"/motorcycles"}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                        See more bikes ›
                    </Link>
                )}
            </div>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.createdAt} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{review.motorcycleName}</h4>
                            <span className="text-muted-foreground text-sm">
                                {new Date(review.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-400 text-xl">
                                {"★".repeat(Math.round(review.rating))}
                                {"☆".repeat(5 - Math.round(review.rating))}
                            </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                ))}
            </div>

            {reviews.length > 0 && (
                <div className="border-t pt-6 text-center">
                    <p className="text-muted-foreground mb-3">Your reviews help other riders make better decisions</p>
                    <Link href={"/motorcycles"}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                        <span className="text-foreground">★ Review another motorcycle</span>
                    </Link>
                </div>
            )}
        </div>
    );
}