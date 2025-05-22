import { API_BASE_URL } from "@/lib/utils";
import { Review } from "@/models/Review";
import { useQuery } from "@tanstack/react-query";

export const useMotorcycleReviews = (motorcycleId: string) => {
  return useQuery<Review[]>({
    queryKey: ["reviews", motorcycleId],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/motorcycles/${motorcycleId}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
