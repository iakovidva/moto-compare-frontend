import { useAddFavorite, useFavoriteMotorcycles, useRemoveFavorite } from "@/hooks/useFavoriteMotorcycles";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { useAuthStore } from "@/store/authStore";
import { useMemo } from "react";
import toast from 'react-hot-toast';

export default function FavoriteToggleButton({ bike, onRequireAuth }: { bike: MotorcycleSummary, onRequireAuth?: () => void }) {

    const { accessToken } = useAuthStore();

    const { data: favorites = [] } = useFavoriteMotorcycles();
    const { mutateAsync: addFavorite } = useAddFavorite(bike.id);
    const { mutateAsync: removeFavorite } = useRemoveFavorite(bike.id);

    const isFavorite = useMemo(
        () => favorites.some(fav => fav.id === bike.id),
        [favorites, bike.id]
    );
    const handleFavoriteClick = async () => {
        if (!accessToken) {
            onRequireAuth?.();
            return;
        }
        try {
            if (isFavorite) {
                await removeFavorite();
                toast.success(`${bike.model} removed from favorites`);
            } else {
                await addFavorite();
                toast.success(`${bike.model} added to favorites`);
            }
        } catch {
            toast.error("Could not update favorites");
        }
    }

    return (
        <button onClick={handleFavoriteClick}
            className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <span className={`text-2xl ${isFavorite ? "text-gray-400" : "text-red-500"}`}>
                {isFavorite ? "💔" : "❤️"}
            </span>
            <span className="font-medium">
                {isFavorite ? "Remove Favorite" : "Favorite"}
            </span>
        </button>
    );
}