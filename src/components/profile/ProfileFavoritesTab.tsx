import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import MotorcycleCard from "../motorcycles/MotorcycleCard";
import FavoriteToggleButton from "../motorcycle/FavoriteToggleButton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfileFavoritesTabs({ favorites }: { favorites: MotorcycleSummary[] }) {
    if (favorites.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                    <span className="text-2xl text-foreground">♡</span>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-1">Your favorites list is empty</h4>
                <p className="text-muted-foreground mb-4">Save motorcycles to compare them later</p>
                <Link href={"/motorcycles"}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                    Discover motorcycles ›
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">My saved motorcycles ({favorites.length})</h3>
                {favorites.length > 0 && (
                    <Link href={"/motorcycles"}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                        Find more ›
                    </Link>
                )}
            </div>

            <div className="flex mb-6 md:mb-8">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {favorites.map((moto, index) => (
                        <MotorcycleCard
                            key={`${moto.id}-${index}`}
                            motorcycle={moto}
                            actionSlot={<FavoriteToggleButton bike={moto} compact />}
                        />
                    ))}
                </motion.div>
            </div>

            {favorites.length > 0 && (
                <div className="border-t pt-6 text-center">
                    <p className="text-muted-foreground mb-3">Keep building your dream garage</p>

                    <Link href={"/motorcycles"}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
                        ♡ Browse more motorcycles
                    </Link>
                </div>
            )}
        </div>
    );
}