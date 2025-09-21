'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { logout, refreshAccessToken } from '@/lib/api/auth';
import { parseJwt } from '@/lib/utils';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { accessToken, setAuth } = useAuthStore();

    // Rehydrate Zustand auth state on initial load
    useEffect(() => {
        const tryRehydrate = async () => {
            if (!accessToken) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    const { sub, role } = parseJwt(newToken);
                    setAuth(newToken, sub, role);
                }
            }
            // Mark initialized regardless of whether we recovered a token
            useAuthStore.setState({ initialized: true } as any);
        };
        tryRehydrate();
    }, [accessToken, setAuth]);

    // Auto-refresh access token every 2 minutes
    useEffect(() => {
        const interval = setInterval(async () => {
            const token = useAuthStore.getState().accessToken;
            if (!token) return;

            const payload = parseJwt(token);
            const now = Date.now() / 1000;
            const timeLeft = payload.exp - now;

            if (timeLeft <= 0) {
                logout();
            }
            if (timeLeft < 180) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    const { sub, role } = parseJwt(newToken);
                    useAuthStore.getState().setAuth(newToken, sub, role);
                } else {
                    useAuthStore.getState().clearAuth();
                }
            }
        }, 2 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return <>{children}</>;
}
