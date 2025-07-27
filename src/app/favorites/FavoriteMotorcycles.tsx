"use client";

import FavoriteToggleButton from "@/components/motorcycle/FavoriteToggleButton";
import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import { useFavoriteMotorcycles } from "@/hooks/useFavoriteMotorcycles";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import RecommendedMotorcycles from "@/components/motorcycles/RecommendedMotorcycles";

export default function FavoriteMotorcycles() {

    const {
        data: favorites,
        isLoading,
    } = useFavoriteMotorcycles();

    if (isLoading) return <p>Loading...</p>;

    if (!favorites || favorites.length === 0) {
        return (
            <div className="text-center py-8 md:py-16">
                <span className="text-muted-foreground mx-auto mb-4 md:mb-6 text-9xl">♡</span>
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                    No favorites yet
                </h2>
                <p className="text-base md:text-lg mb-6 md:mb-8 text-muted-foreground max-w-md mx-auto">
                    Start browsing motorcycles and add them to your favorites to keep track of bikes you love!
                </p>
                <Link href={"/motorcycles"}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        Browse Motorcycles
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-4 md:py-8">
            <div className="mb-6 md:mb-8">
                <div className="flex items-center space-x-3 mb-3 md:mb-4">
                    <span className="text-3xl text-red-500">♡</span>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        My Favorites
                    </h1>
                </div>
                <p className="text-base md:text-lg text-muted-foreground">
                    Your saved motorcycles ({favorites.length})
                </p>
            </div>
            <div className="flex justify-center mb-6 md:mb-8">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {favorites.map((moto, index) => (
                        <MotorcycleCard key={`${moto.id}-${index}`} motorcycle={moto}
                            actionSlot={<FavoriteToggleButton bike={moto} compact />} />
                    ))}
                </motion.div>
            </div>
            <RecommendedMotorcycles recommendations={favorites} />

        </div>
    );
}
