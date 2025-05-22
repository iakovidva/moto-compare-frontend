import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubmitReview = (motorcycleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ rating, comment }: { rating: number; comment: string }) => {
            const res = await fetchWithAuth(`${API_BASE_URL}/motorcycles/${motorcycleId}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, comment }),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to submit review");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews", motorcycleId] });
        },
    });
};