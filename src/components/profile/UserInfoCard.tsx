"use client";

import { useUserInfo } from "@/hooks/useUserInfo";

type UserInfoCardProps = {
    contributions: {
        reviews: number,
        requests: number,
        favorites: number
    }
}

export default function UserInfoCard({ contributions }: UserInfoCardProps) {
    const { data: userInfo, isLoading, error } = useUserInfo();
    const totalContributions = contributions.reviews + contributions.requests + contributions.favorites;

    if (isLoading || !userInfo) return <p>Loading...</p>;
    if (error) return <p>Failed to load user's info</p>;

    return (
        <div className="bg-background border border-border rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        {userInfo.userName}
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                        <span>✉ {userInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                        <span>
                            📅 Member since:{" "}
                            {new Date(userInfo.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="bg-muted text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-1">
                        <span className="font-bold">{totalContributions}</span> Total Contributions
                    </div>

                    <div className="flex gap-2">
                        <MetricBadge value={contributions.reviews} label="Reviews" />
                        <MetricBadge value={contributions.requests} label="Requests" />
                        <MetricBadge value={contributions.favorites} label="Favorites" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricBadge({ value, label }: { value: number; label: string }) {
    return (
        <div className="bg-muted text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
            <span className="font-bold">{value}</span> {label}
        </div>
    );
}