"use client";

import FavoriteToggleButton from "@/components/motorcycle/FavoriteToggleButton";
import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import { useFavoriteMotorcycles } from "@/hooks/useFavoriteMotorcycles";
import Link from "next/link";

export default function FavoriteMotorcycles() {

    const {
        data: favorites,
        isLoading,
    } = useFavoriteMotorcycles();

    if (isLoading) return <p>Loading...</p>;

    if (!favorites || favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h2 className="text-2xl font-semibold mb-2">No Favorites Yet</h2>
                <p className="text-gray-600 mb-6">
                    You haven’t added any motorcycles to your favorites. Browse our collection and find the ones you love!
                </p>
                <Link
                    href="/motorcycles"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Browse Motorcycles
                </Link>
            </div>
        );
    }

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
