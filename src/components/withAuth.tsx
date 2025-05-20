import React, { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type WithAuthOptions = {
    requiredRole?: "ADMIN" | "USER";
};

export function withAuth<T extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<T>,
    options?: WithAuthOptions
) {
    return function ProtectedRoute(props: T) {
        const { accessToken, role } = useAuthStore();
        const router = useRouter();

        const isAuthorized =
            accessToken &&
            (!options?.requiredRole || role === options.requiredRole);

        useEffect(() => {
            if (!isAuthorized) {
                router.replace("/403");
            }
        }, [isAuthorized]);

        if (!isAuthorized) {
            return null; // Or a loading spinner while redirecting
        }

        return <Component {...props} />;
    };
}
