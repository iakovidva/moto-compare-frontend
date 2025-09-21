import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { API_BASE_URL } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ChangeUsernameBody = { username: string };

export const useChangeUsername = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ username }: ChangeUsernameBody) => {
            // Send username as a request parameter so Spring's @RequestParam can pick it up
            const url = `${API_BASE_URL}/auth/change-username?username=${encodeURIComponent(username)}`;
            const res = await fetchWithAuth(url, {
                method: "PUT",
                credentials: "include",
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type");
                let message = `Failed to change username (${res.status})`;
                try {
                    if (contentType && contentType.includes("application/json")) {
                        const data = await res.json();
                        message = data?.message || message;
                    } else {
                        const text = await res.text();
                        if (text) message = text;
                    }
                } catch (e) {
                    // ignore
                }

                // Throw specialized error for 409 conflict
                if (res.status === 409) throw new Error(message || "Username already taken");
                throw new Error(message);
            }

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }
            return { success: true };
        },
        onSuccess: (_data, variables) => {
            // Optimistically update the cached user-info so UI reflects change immediately
            if (variables?.username) {
                queryClient.setQueryData(["user-info"], (old: any) => {
                    if (!old) return old;
                    return { ...old, userName: variables.username };
                });
            }
            queryClient.invalidateQueries({ queryKey: ["user-info"] });
        },
    });
};

export default useChangeUsername;
