import FavoriteMotorcycles from "./FavoriteMotorcycles";

export default async function FavoritesPage() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Motorcycles</h1>
            <FavoriteMotorcycles />
        </div>
    );
}
