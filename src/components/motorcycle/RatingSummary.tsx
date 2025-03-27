
const RatingSummary: React.FC<{ averageRating: number, totalReviews: number }> = ({ averageRating, totalReviews }) => {
    return (
        <div className="mb-6 flex justify-center items-center flex-col">
            <h3 className="text-lg font-bold">User Rating</h3>
            <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">
                    {"★".repeat(Math.round(averageRating))}{"☆".repeat(5 - Math.round(averageRating))}
                </span>
            </div>
            <div className="flex items-center space-x-2">

                <a
                    className="text-gray-700 underline hover:text-blue-500 transition"
                    href="#review-section"
                // onClick={onScrollToReviews} 
                >
                    ({averageRating} / 5 based on {totalReviews} reviews)
                </a>
            </div>
        </div>
    );
}

export default RatingSummary;