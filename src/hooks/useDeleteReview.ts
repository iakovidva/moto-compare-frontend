import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export const useDeleteReview = (motorcycleId: string) => {
    return useMutation({
        mutationFn: async () => {
            const res = await fetchWithAuth(`${API_BASE_URL}/motorcycles/${motorcycleId}/reviews`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to delete review");
            
            // Handle empty response body for DELETE requests
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }
            // Return a simple success object for empty responses
            return { success: true };
        },
    });
};