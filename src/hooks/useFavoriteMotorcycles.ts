import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavoriteMotorcycles = () => {

    const {accessToken} = useAuthStore();

    return useQuery<MotorcycleSummary[]>({
        queryKey: ["favorite"],
        queryFn: async () => {
            const res = await fetchWithAuth(`${API_BASE_URL}/motorcycles/favorites`, {
                            method: "GET",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include"
                        });
            if (!res.ok) throw new Error("Failed to fetch reviews");
            return await res.json();
        },
        enabled: !!accessToken,
        staleTime: 0,
        refetchOnWindowFocus: false,
    });
};

export const useAddFavorite = (id: string ) => {
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const res = await fetchWithAuth(`${API_BASE_URL}/motorcycles/${id}/favorites`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include"
            
                        });
                        if (!res.ok) throw new Error("Failed to fetch reviews");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorite"] });
        },
    })
}

export const useRemoveFavorite = (id:string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const res = await fetchWithAuth(`${API_BASE_URL}/motorcycles/${id}/favorites`, {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"},
                credentials: "include"
            });
            if (!res.ok) throw new Error("Failed to remove favorite");
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["favorite"]})
        }
    })
}