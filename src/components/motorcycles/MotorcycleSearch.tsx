"use client"

import { useSearchMotorcycle } from "@/hooks/useSearchMotorcycle";
import SearchBar from "./filters/SearchBar";

const MotorcycleSearch = () => {
    const { search, setSearch } = useSearchMotorcycle();

    return (
        <div className="bg-background border-b border-border">
            <div className="container mx-auto px-4 py-4 md:py-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    Browse Motorcycles
                </h1>
                <SearchBar value={search} onChange={setSearch} />
            </div>
        </div>
    );
};

export default MotorcycleSearch;
