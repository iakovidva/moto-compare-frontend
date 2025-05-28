import AccountActions from "@/components/profile/AccountActions";
import FavoritesPreview from "@/components/profile/FavoritesPreview";
import UserInfoCard from "@/components/profile/UserInfoCard";
import UserRequests from "@/components/profile/UserRequests";
import UserReviews from "@/components/profile/UserReviews";

export default async function ProfilePage() {

    return (
        <div className="max-w-4xl mx-auto mt-8 space-y-6 px-4">
            <h1 className="text-3xl font-bold text-center">Your Profile</h1>
            <UserInfoCard />
            <UserRequests />
            <FavoritesPreview />
            <UserReviews />
            <AccountActions />
        </div>
    );
}

// export default withAuth(ProfilePage, { requiredRole: "USER" }); TODO protect page.
