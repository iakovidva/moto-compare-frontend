import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ChangePasswordBody = {
    currentPassword: string;
    newPassword: string;
};

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ currentPassword, newPassword }: ChangePasswordBody) => {
            const res = await fetchWithAuth(`${API_BASE_URL}/auth/change-password`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!res.ok) {
                // Try to parse error message
                const contentType = res.headers.get("content-type");
                let message = `Failed to change password (${res.status})`;
                try {
                    if (contentType && contentType.includes("application/json")) {
                        const data = await res.json();
                        message = data?.message || message;
                    } else {
                        const text = await res.text();
                        if (text) message = text;
                    }
                } catch (e) {
                    // ignore parse errors
                }
                throw new Error(message);
            }

            // Handle JSON or empty responses
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }

            return { success: true };
        },
        onSuccess: () => {
            // Invalidate any relevant user queries (e.g., user info) if present
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};

export default useChangePassword;
