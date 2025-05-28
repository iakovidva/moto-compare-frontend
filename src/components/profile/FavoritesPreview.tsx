"use client";

import { useFavoriteMotorcycles } from "@/hooks/useFavoriteMotorcycles";
import Link from "next/link";
import MotorcycleCard from "../motorcycles/MotorcycleCard";
import FavoriteToggleButton from "../motorcycle/FavoriteToggleButton";

export default function FavoritesPreview() {

    const { data: favorites = [], isLoading, error } = useFavoriteMotorcycles();

    if (isLoading || !favorites) return <p>Loading...</p>;
    if (error) return <p>Failed to user's reviews</p>;

    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Your Favorites</h2>
                <Link href="/favorites" className="text-blue-500 hover:underline">View all</Link>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {favorites.slice(0, 3).map((bike) => (
                    <MotorcycleCard
                        key={bike.id}
                        motorcycle={bike}
                        actionSlot={<FavoriteToggleButton bike={bike} />}
                    />
                ))}
            </ul>
        </div>
    );

}