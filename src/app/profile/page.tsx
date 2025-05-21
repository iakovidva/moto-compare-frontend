"use client"

import { withAuth } from "@/components/withAuth";
import { parseJwt } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

function ProfilePage() {
    const { accessToken } = useAuthStore();
    const [userEmail, setUserEmail] = useState<string>('');
    useEffect(() => {
        if (!accessToken) return;
        const { sub } = parseJwt(accessToken);
        setUserEmail(sub);
    }, [accessToken]);
    return (
        <>
            <h1>Hi {userEmail}</h1>
        </>
    );
}

export default withAuth(ProfilePage, { requiredRole: "USER" });
