import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export type Review = {
    userName: string,
    motorcycleId: string,
    motorcycleName: string,
    rating: number,
    comment: string,
    createdAt: string
}

export function useUserReviews() {
    const {accessToken} = useAuthStore();

    return useQuery<Review[]>({
        queryKey: ["user-reviews"],
        queryFn: async () => {
            const response = await fetchWithAuth(`${API_BASE_URL}/user/reviews`, {
                method: "GET",
                headers: {"Content-Type" : "application/json"},
                credentials: "include"
            });

            if (!response.ok) throw new Error("Couldn't fetch user's reviews");
            return await response.json();
        },
        enabled: !!accessToken,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}