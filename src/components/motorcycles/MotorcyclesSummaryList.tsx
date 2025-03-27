"use client";

import { useState } from "react";
import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import SearchBar from "@/components/motorcycles/SearchBar";
import BrandFilter from "@/components/motorcycles/BrandFilter";
import CategoryFilter from "@/components/motorcycles/CategoryFilter";
import SortDropdown from "@/components/motorcycles/SortDropdown";
import { motion } from "framer-motion";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";

interface Props {
    motorcycles: MotorcycleSummary[];
}

const MotorcyclesSummaryList: React.FC<Props> = ({ motorcycles }) => {
    const [motos, setMotorcycles] = useState<MotorcycleSummary[]>(motorcycles);
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    const [sort, setSort] = useState<string>("");
    const [visibleCount, setVisibleCount] = useState(12); // Pagination (initially show 12)

    const refreshData = async () => {
        const updatedMotorcycles = await fetchAllMotorcyclesSummary();
        setMotorcycles(updatedMotorcycles);
    }
    console.log(motos); // ✅ Debugging check

    // 🏍️ Filtered Motorcycles
    const filteredMotorcycles = motos
        .filter((moto) => moto.model.toLowerCase().includes(search.toLowerCase()))
        .filter((moto) => (brand ? moto.manufacturer === brand : true))
        .filter((moto) => (category ? moto.category === category : true));

    return (

        <div className="max-w-7xl mx-auto px-4">
            <button className="text-2xl items-center my-16 bg-stone-300" onClick={refreshData}>Refresh data</button>

            {/* 🏍️ Filters Section */}
            <motion.div
                className="flex flex-col gap-4 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SearchBar value={search} onChange={setSearch} />
                <BrandFilter selectedBrand={brand} onSelect={setBrand} />
                <CategoryFilter selectedCategory={category} onSelect={setCategory} />
                <SortDropdown selectedSort={sort} onSortChange={setSort} />
            </motion.div>

            {/* 🏍️ Motorcycles Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {filteredMotorcycles.slice(0, visibleCount).map((moto, index) => (
                    <MotorcycleCard key={`${moto.id} - ${index}`} motorcycle={moto} />
                ))}
            </motion.div>

            {/* 🏍️ Load More Button */}
            {visibleCount < filteredMotorcycles.length && (
                <div className="flex justify-center mt-6">
                    <motion.button
                        onClick={() => setVisibleCount(visibleCount + 12)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Load More
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default MotorcyclesSummaryList;
