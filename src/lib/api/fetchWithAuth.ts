import { useAuthStore } from "@/store/authStore";
import { parseJwt } from "../utils";
import { refreshAccessToken } from "./auth";

export async function fetchWithAuth(
    input: RequestInfo,
    init: RequestInit = {},
    requireAuth: boolean = true
) : Promise<Response> {

    const auth = useAuthStore.getState();
    
    let token = auth.accessToken;
    if (requireAuth && token) {
        const payload = parseJwt(token);
        const now = Date.now() / 1000;
        const isExpiring = payload.exp < now + 60;

        if (isExpiring) await refreshAccessToken();
    }

    const headers = new Headers(init.headers || {});
    if (requireAuth && token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(input, {...init, headers});

}