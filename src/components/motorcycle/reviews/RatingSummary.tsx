"use client"

import { Review } from "@/models/Review";

export default function RatingSummary({ reviews }: { reviews: Review[] }) {

    const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    return (
        <div className="mb-6 flex justify-center items-center flex-col">
            <h3 className="text-lg font-bold">User Rating</h3>
            <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">
                    {"★".repeat(Math.round(average))}{"☆".repeat(5 - Math.round(average))}
                </span>
            </div>
            <div className="flex items-center space-x-2">

                <a
                    className="text-gray-700 underline hover:text-blue-500 transition"
                    href="#review-section"
                >
                    <p>{average.toFixed(1)} stars from {reviews.length} reviews</p>
                </a>
            </div>
        </div>
    );
}