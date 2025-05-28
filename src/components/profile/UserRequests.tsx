"use client";

import { useUserRequests } from "@/hooks/useUserRequests";

export default function UserRequests() {

    const { data: userRequests, isLoading, error } = useUserRequests();

    if (isLoading || !userRequests) return <p>Loading...</p>;
    if (error) return <p>Failed to load user's info</p>;

    return (
        <>
            <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">All requests</h2>
                {userRequests.map(r => (
                    <div key={`${r.createdAt} - ${r.updatedAt}`}>
                        <p><strong>newMotorcycleRequest:</strong> {r.newMotorcycleRequest ? "YES" : "NO"}</p>
                        <p><strong>Status:</strong> {r.status}</p>
                        <p><strong>Request:</strong> {r.requestContent}</p>
                        <p><strong>Created at:</strong> {r.createdAt}</p>
                        <p><strong>Updated at:</strong> {r.updatedAt}</p>
                    </div>
                ))}
            </div>
        </>
    );
}