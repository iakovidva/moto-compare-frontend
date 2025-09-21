import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type WithAuthOptions = {
    requiredRole?: "ADMIN" | "USER";
};

export function withAuth<T extends {}>(
    Component: React.ComponentType<T>,
    options?: WithAuthOptions
) {
    return function ProtectedRoute(props: T) {
        const { accessToken, role } = useAuthStore();
        const { initialized } = useAuthStore();
        const router = useRouter();
        const wasAuthenticated = useRef(!!accessToken);
        
        const isAuthenticated = !!accessToken;
        const hasRequiredRole = !options?.requiredRole || role === options.requiredRole;
        const isAuthorized = isAuthenticated && hasRequiredRole;

        useEffect(() => {
            if (wasAuthenticated.current && !isAuthenticated) {
                router.replace("/");
                return;
            }
            wasAuthenticated.current = isAuthenticated;
        }, [isAuthenticated, router]);

        // If auth state isn't initialized yet, show a neutral loading state
        if (!initialized) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-muted-foreground">Loading...</p>
                    </div>
                </div>
            );
        }

        if (!isAuthenticated) {
            router.replace("/not-found");
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-muted-foreground">Redirecting...</p>
                    </div>
                </div>
            );
        }

        if (!isAuthorized) {
            router.replace("/not-found");
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-muted-foreground">Redirecting...</p>
                    </div>
                </div>
            );
        }

        return <Component {...props} />;
    };
}
