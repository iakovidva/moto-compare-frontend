"use client"

import { withAuth } from "@/components/withAuth";
import FavoriteMotorcycles from "./FavoriteMotorcycles";

function FavoritesPage() {
    return (
        <div className="p-3 mx-auto max-w-7xl">
            <FavoriteMotorcycles />
        </div>
    );
}

export default withAuth(FavoritesPage);
