"use client"

import { useAddFavorite, useFavoriteMotorcycles, useRemoveFavorite } from "@/hooks/useFavoriteMotorcycles";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { useAuthStore } from "@/store/authStore";
import { useMemo, useState } from "react";
import toast from 'react-hot-toast';
import AuthModal from "../main-header/AuthModal";
import { Button } from "../ui/button";

export default function FavoriteToggleButton({ bike, compact = false }: { bike: MotorcycleSummary, compact?: boolean }) {

    const { accessToken } = useAuthStore();
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const { data: favorites = [] } = useFavoriteMotorcycles();
    const { mutateAsync: addFavorite } = useAddFavorite(bike.id);
    const { mutateAsync: removeFavorite } = useRemoveFavorite(bike.id);

    const isFavorite = useMemo(
        () => favorites.some(fav => fav.id === bike.id),
        [favorites, bike.id]
    );
    const handleFavoriteClick = async () => {
        if (!accessToken) {
            setAuthModalOpen(true);
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
        <>
            {authModalOpen && (
                <AuthModal
                    isOpen={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                    message="❤️ Please log in or create an account to save bikes to your favorites!"
                />
            )}

            {compact ?
                <Button
                    variant="outline"
                    className="py-2 px-3 text-xs h-7"
                    onClick={handleFavoriteClick}
                >
                    <span className={`text-xl mr-1 ${isFavorite ? "text-red-500" : "text-gray-400"}`}>
                        {isFavorite ? "♡" : "❤️"}
                    </span>
                    {isFavorite ? "Remove" : "Save"}
                </Button>
                :
                <Button variant="outline" className="w-full py-2 md:py-3 text-sm md:text-base" onClick={handleFavoriteClick}>
                    <span className={`text-2xl ${isFavorite ? "text-gray-400" : "text-red-500"}`}>
                        {isFavorite ? "💔" : "❤️"}
                    </span>
                    <span className="font-medium">
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </span>
                </Button>
            }
        </>
    );
}