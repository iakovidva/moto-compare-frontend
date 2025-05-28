import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

type UserInfo = {
    userName: string,
    email: string,
    createdAt: string
}

export function useUserInfo() {
    const {accessToken} = useAuthStore();

    return useQuery<UserInfo>({
        queryKey: ["user-info"],
        queryFn: async () => {
            const response = await fetchWithAuth(`${API_BASE_URL}/user`, {
                method: "GET",
                headers: {"Content-Type" : "application/json"},
                credentials: "include"
            });

            if (!response.ok) throw new Error("Couldn't fetch user's info");
            return await response.json();
        },
        enabled: !!accessToken,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}