import FavoriteMotorcycles from "./FavoriteMotorcycles";

export default async function FavoritesPage() {
    return (
        <div className="p-3 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Motorcycles</h1>
            <FavoriteMotorcycles />
        </div>
    );
}
