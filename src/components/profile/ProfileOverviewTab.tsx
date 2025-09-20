import { UserRequest } from "@/hooks/useUserRequests";
import { Review } from "@/hooks/useUserReviews";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import Image from "next/image";
import Link from "next/link";

type ProfileOverviewTabProps = {
    setActiveTab: (tab: string) => void,
    favorites: MotorcycleSummary[],
    reviews: Review[],
    userRequests: UserRequest[]
}

export default function ProfileOverviewTab({ setActiveTab, favorites, reviews, userRequests }: ProfileOverviewTabProps) {

    const avgRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">My Overview</h3>
                <div className="md:columns-2 space-y-6 ">
                    <Summary
                        requests={userRequests.length}
                        favorites={favorites.length}
                        reviews={reviews.length}
                        avgRating={avgRating}
                    />
                    <LatestReviews
                        reviews={reviews}
                        setActiveTab={setActiveTab}
                    />
                    <LatestFavorites
                        favorites={favorites}
                        setActiveTab={setActiveTab}
                    />
                    <LatestRequests
                        requests={userRequests}
                        setActiveTab={setActiveTab}
                    />
                </div>
            </div>
        </div>
    );
}


type SummaryProps = {
    requests: number;
    favorites: number;
    reviews: number;
    avgRating: number;
};

const Summary = ({ requests, favorites, reviews, avgRating }: SummaryProps) => {
    return (
        <div className="border border-border rounded-lg bg-muted/50 p-4 shadow-sm self-start overflow-hidden">
            <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Requests</p>
                    <p className="text-2xl font-bold text-foreground">{requests}</p>
                </div>
                <div className="bg-accent rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Favorites</p>
                    <p className="text-2xl font-bold text-foreground">{favorites}</p>
                </div>
                <div className="bg-accent rounded-lg p-4 text-center col-span-2 sm:col-span-1">
                    <p className="text-sm text-muted-foreground">Reviews</p>
                    <div className="flex justify-center items-center gap-2 mt-1">
                        <p className="text-2xl font-bold text-foreground">{reviews}</p>
                        <span className="text-sm bg-muted px-2 py-0.5 rounded-full font-medium">
                            ★ {avgRating.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


const LatestReviews = ({ reviews, setActiveTab }: { reviews: Review[], setActiveTab: (tab: string) => void }) => {
    if (reviews.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-4 text-center overflow-hidden">
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

    const latestReviews = [...reviews]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    return (
        <div className="border border-border rounded-lg bg-muted/50 p-4 shadow-sm self-start overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Latest Reviews</h3>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                    View All ›
                </button>
            </div>

            <div className="space-y-4">
                {latestReviews.map(review => (
                    <div
                        key={`${review.userName}-${review.createdAt}`}
                        className="border border-border rounded-md p-3 hover:bg-accent/50 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <Link href={`/motorcycles/${review.motorcycleId}`}>
                                    <h4 className="font-medium text-foreground">{review.motorcycleName}</h4>
                                </Link>
                                <p className="text-xs text-muted-foreground mt-1">By {review.userName}</p>
                            </div>
                            <span className="text-sm font-medium text-yellow-600">
                                {review.rating.toFixed(1)} ★
                            </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                            <span className="text-xs text-muted-foreground ml-2 shrink-0">
                                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const LatestFavorites = ({ favorites, setActiveTab }: { favorites: MotorcycleSummary[], setActiveTab: (tab: string) => void }) => {
    if (favorites.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-4 text-center overflow-hidden">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                    <span className="text-2xl text-foreground">♡</span>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-1">Your favorites list is empty</h4>
                <p className="text-muted-foreground mb-4">Save motorcycles to compare them later</p>
                <Link href={"/motorcycles"}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                    Discover motorcycles ›
                </Link>
            </div>
        );
    }

    return (
        <div className="border border-border rounded-lg bg-muted/50 p-4 shadow-sm self-start overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Latest Favorites</h3>
                <button
                    onClick={() => setActiveTab("favorites")}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                    View All ›
                </button>
            </div>

            <div className="space-y-3">
                {favorites.slice(0, 3).map(bike => (
                    <Link
                        key={bike.id}
                        href={`/motorcycles/${bike.id}`}
                        className="group flex items-center gap-3 border border-border rounded-md p-3 hover:bg-accent/50 transition-colors"
                    >
                        {bike.image && (
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border/50">
                                <Image
                                    src={bike.image}
                                    alt={`${bike.manufacturer} ${bike.model}`}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h4 className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
                                {bike.manufacturer} {bike.model}
                            </h4>
                            <p className="text-xs text-muted-foreground">{bike.yearRange}</p>
                        </div>
                        <span className="text-xl text-muted-foreground">›</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const LatestRequests = ({ requests, setActiveTab }: { requests: UserRequest[], setActiveTab: (tab: string) => void }) => {
    if (requests.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-4 text-center overflow-hidden">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                    <span className="text-foreground">💬</span>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-1">No requests yet</h4>
                <p className="text-muted-foreground mb-4">
                    Ask our team to add new motorcycles, features, or report issues
                </p>
                <Link
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    href={"/submit"}
                >
                    Submit your first request ›
                </Link>
            </div>
        );
    }

    const latestRequests = [...requests]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    return (
        <div className="border border-border rounded-lg bg-muted/50 p-4 shadow-sm self-start overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Latest Requests</h3>
                <button
                    onClick={() => setActiveTab("requests")}
                    className="text-sm text-primary transition-colors"
                >
                    View All ›
                </button>
            </div>

            <div className="space-y-3">
                {latestRequests.map(request => {
                    const content = typeof request.requestContent === 'string'
                        ? JSON.parse(request.requestContent)
                        : request.requestContent;

                    return (
                        <div
                            key={`${request.createdAt}-${request.requestContent}`}
                            className="border border-border rounded-lg p-4 space-y-2 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    {content.model && content.manufacturer ? (
                                        <p className="font-medium text-foreground">
                                            {content.manufacturer} {content.model}
                                        </p>
                                    ) : content.data ? (
                                        <p className="font-medium text-foreground">
                                            {content.data.length} field update{content.data.length > 1 ? 's' : ''}
                                        </p>
                                    ) : (
                                        <p className="font-medium text-foreground">
                                            {content.type || 'General Request'}
                                        </p>
                                    )}
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                        {content.text || content.subject || 'Request submitted'}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-foreground">
                                        {request.status === 'COMPLETED' ? 'Done' :
                                            request.status === 'IN_PROGRESS' ? 'In Progress' : 'Submitted'}
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(request.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}