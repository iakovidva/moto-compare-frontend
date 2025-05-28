"use client";

import { useUserInfo } from "@/hooks/useUserInfo";

export default function UserInfoCard() {

    const { data: userInfo, isLoading, error } = useUserInfo();

    if (isLoading || !userInfo) return <p>Loading...</p>;
    if (error) return <p>Failed to load user's info</p>;

    return (
        <>
            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Account Information</h2>
                <p><strong>Username:</strong> {userInfo.userName}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Created at:</strong> {userInfo.createdAt}</p>
            </div>
        </>
    );
}