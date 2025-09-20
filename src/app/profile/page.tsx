"use client"

import AccountActions from "@/components/profile/AccountActions";
import ProfileTabs from "@/components/profile/ProfileTabs";
import UserInfoCard from "@/components/profile/UserInfoCard";
import { withAuth } from "@/components/withAuth";
import { useFavoriteMotorcycles } from "@/hooks/useFavoriteMotorcycles";
import { useUserRequests } from "@/hooks/useUserRequests";
import { useUserReviews } from "@/hooks/useUserReviews";

function ProfilePage() {

    const { data: userRequests = [], isLoading, error } = useUserRequests();
    const { data: userFavorites = [] } = useFavoriteMotorcycles();
    const { data: userReviews = [] } = useUserReviews();

    return (
        <div className="min-h-screen max-w-7xl mx-auto mt-8 space-y-6 px-4">
            <h1 className="text-3xl font-bold text-center">My Profile</h1>
            <UserInfoCard contributions={{ reviews: userReviews.length, requests: userRequests.length, favorites: userFavorites.length }} />
            <ProfileTabs userRequests={userRequests} favorites={userFavorites} reviews={userReviews} />
            <AccountActions />
        </div>
    );
}

export default withAuth(ProfilePage);
