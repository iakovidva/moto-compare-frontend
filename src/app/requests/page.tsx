"use client";

import { withAuth } from "@/components/withAuth";
import { fetchOpenRequests } from "@/lib/api/requests";
import { UserRequestModel } from "@/models/UserRequestModel";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

function RequestsPage() {
    const [openRequests, setOpenRequests] = useState<UserRequestModel[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { accessToken } = useAuthStore();

    useEffect(() => {
        if (!accessToken) return;
        fetchOpenRequests().then((requests) => {
            if (requests) setOpenRequests(requests);
            else setError("Could not load requests");
        });
    }, [accessToken]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!openRequests) {
        return <div>Loading requests...</div>;
    }

    return (
        <div className="flex flex-col text-center">
            <h1>Here will be listed all the requests!</h1>
            {openRequests.map((request) => (
                <li key={request.id}>{request.requestContent}</li>
            ))}
        </div>
    );
}

export default withAuth(RequestsPage, { requiredRole: "ADMIN" }); //TODO WHEN REFRESH BREAKS!!!
