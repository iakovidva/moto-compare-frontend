import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    email: string | null;
    role: "USER" | "ADMIN" | null;
    setAuth: (token: string, email: string, role: "USER" | "ADMIN") => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    email: null,
    role: null,
    setAuth: (token, email, role) => set({accessToken: token, email, role}),
    clearAuth: () => set({accessToken: null, email: null, role: null})
}));