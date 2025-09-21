import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    email: string | null;
    role: "USER" | "ADMIN" | null;
    initialized: boolean;
    setAuth: (token: string, email: string, role: "USER" | "ADMIN") => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    email: null,
    role: null,
    initialized: false,
    setAuth: (token, email, role) => set({accessToken: token, email, role}),
    clearAuth: () => set({accessToken: null, email: null, role: null}),
    // Note: we'll set `initialized` from AuthProvider after rehydration
    // Use `useAuthStore.setState({ initialized: true })` where appropriate
    // consumer code can also toggle initialized if needed
    // But we provide no direct setter here to keep API minimal
    // NOTE: we'll mutate store directly in AuthProvider using setState
}));