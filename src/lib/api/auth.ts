import { JwtPayload } from "@/models/JwtPayload";
import { API_BASE_URL, parseJwt } from "../utils";
import { useAuthStore } from "@/store/authStore";
import { fetchWithAuth } from "./fetchWithAuth";

const { setAuth, clearAuth } = useAuthStore.getState();

export async function login(email: string, password: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Login failed");
        }

        const data = await response.json();
        const jwtPayload: JwtPayload = parseJwt(data.accessToken);

        setAuth(data.accessToken, jwtPayload.sub, jwtPayload.role);
    } catch (err: any) {
        console.log("error message: " + err.message);
        throw err;
    }
}

export async function refreshAccessToken() {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) return null;

    const data = await response.json();
    const refreshedToken =  data.accessToken;
    
    if (refreshedToken) {
        const {sub, role} = parseJwt(refreshedToken);
        setAuth(refreshedToken, sub, role);
    } else {
        clearAuth();
        throw new Error("Faied to refresh token");
    }
}

export async function logout(){
    await fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    clearAuth();
}

export async function registerUser(username: string, email: string, password: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            let errorMessage = "Registration failed";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                const text = await response.text();
                if (text) errorMessage = text;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        const jwtPayload: JwtPayload = parseJwt(data.accessToken);

        setAuth(data.accessToken, jwtPayload.sub, jwtPayload.role);
    } catch (err: any) {
        console.log("error message: " + err.message);
        throw err;
    }
}
