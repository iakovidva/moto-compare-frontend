import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

type UserRequest = {
    newMotorcycleRequest: boolean,
    requestContent: string,
    status: string,
    createdAt: string,
    updatedAt: string;
}

export function useUserRequests() {
    const {accessToken} = useAuthStore();

    return useQuery<UserRequest[]>({
        queryKey: ["user-requests"],
        queryFn: async () => {
            const response = await fetchWithAuth(`${API_BASE_URL}/user/requests`, {
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