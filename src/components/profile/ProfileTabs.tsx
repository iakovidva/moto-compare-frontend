"use client";

import { ReactNode, useState } from "react";
import ProfileRequestsTab from "./ProfileRequestsTab";
import ProfileReviewsTab from "./ProfileReviewsTab";
import ProfileFavoritesTabs from "./ProfileFavoritesTab";
import ProfileOverviewTab from "./ProfileOverviewTab";
import { UserRequest } from "@/hooks/useUserRequests";
import { Review } from "@/hooks/useUserReviews";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";


type ProfileTabsProps = {
    userRequests: UserRequest[]
    favorites: MotorcycleSummary[]
    reviews: Review[]
}

export default function ProfileTabs({ userRequests, favorites, reviews }: ProfileTabsProps) {

    const [activeTab, setActiveTab] = useState('overview');
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'favorites', label: 'Favorites', icon: '♡' },
        { id: 'reviews', label: 'Reviews', icon: '★' },
        { id: 'requests', label: 'Requests' }
    ];

    return (
        <div className="bg-card rounded-lg shadow-lg border border-border">
            <div className="border-b border-border">
                <nav className="flex">
                    {tabs.map(tab => (
                        <TabButton
                            key={tab.id}
                            id={tab.id}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            icon={tab.icon}
                        >
                            {tab.label}
                        </TabButton>
                    ))}
                </nav>
            </div>

            <div className="p-6">
                {activeTab === 'overview' && (
                    <ProfileOverviewTab
                        setActiveTab={setActiveTab}
                        favorites={favorites}
                        reviews={reviews}
                        userRequests={userRequests}
                    />
                )}

                {activeTab === 'favorites' && (
                    <ProfileFavoritesTabs favorites={favorites} />
                )}

                {activeTab === 'reviews' && (
                    <ProfileReviewsTab reviews={reviews} />
                )}

                {activeTab === 'requests' && (
                    <ProfileRequestsTab userRequests={userRequests} />
                )}
            </div>
        </div>
    );
}

interface TabButtonProps {
    id: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    children: ReactNode;
    icon?: ReactNode;
}

const TabButton = ({
    id,
    activeTab,
    setActiveTab,
    children,
    icon
}: TabButtonProps) => {
    const isActive = activeTab === id;

    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`
                px-4 py-3 font-medium transition-colors
                ${isActive
                    ? 'border-b-2 border-orange-500 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }
            `}
        >
            {icon && <span className={isActive ? '' : 'text-muted-foreground'}>{icon}</span>}
            {` ${children}`}
        </button>
    );
};