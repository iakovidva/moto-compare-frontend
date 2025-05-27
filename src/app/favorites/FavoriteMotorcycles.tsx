"use client";

import FavoriteToggleButton from "@/components/motorcycle/FavoriteToggleButton";
import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import { useFavoriteMotorcycles } from "@/hooks/useFavoriteMotorcycles";

export default function FavoriteMotorcycles() {

    const {
        data: favorites,
        isLoading,
    } = useFavoriteMotorcycles();

    if (isLoading) return <p>Loading...</p>;

    if (!favorites || favorites.length === 0) return <p>You have no favorite motorcycles yet.</p>;

    return (
        <ul className="grid grid-cols-3 lg:grid-cols-4 gap-4">

            {favorites.map((bike) => (
                <li key={bike.id}>
                    <MotorcycleCard motorcycle={bike}
                        actionSlot={<FavoriteToggleButton bike={bike} />}
                    />
                </li>
            ))}
        </ul>
    );
}
