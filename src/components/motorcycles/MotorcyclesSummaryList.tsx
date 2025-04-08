"use client";

import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import { motion } from "framer-motion";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
import { useMotorcycleFilters } from "@/hooks/useMotorcyclesFilter";
import FiltersPanel from "./FiltersPanel";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "./pagination/PaginationControls";
import { useState } from "react";
import SortDropdown from "./SortDropdown";

interface Props {
    motorcycles: MotorcycleSummary[];
}

const MotorcyclesSummaryList: React.FC<Props> = ({ motorcycles }) => {

    const { category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, sort,
        setFilters
    } = useMotorcycleFilters();

    const { page, pageSize, setPage, setPageSize } = usePagination(); // ✅ Separate pagination logic
    const [showPagination, setShowPagination] = useState<boolean>(true); // insead of that I could make the model to be above everything and block everything in the background.


    const { status, error, data } = useQuery({
        queryKey: ["motorcycles", page, pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, sort],
        queryFn: () => fetchAllMotorcyclesSummary({ page: page - 1, size: pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, sort }),
    });

    if (status === "pending") {
        return <p>Loading placeholder</p>
    }

    const motos = data?.motorcycles || [];
    const totalPages = data?.totalPages || 0;

    return (
        <div>
            <FiltersPanel
                category={category}
                manufacturer={manufacturer}
                horsePowerMin={horsePowerMin}
                horsePowerMax={horsePowerMax}
                displacementMin={displacementMin}
                displacementMax={displacementMax}
                setFilters={setFilters}
                setShowPagination={setShowPagination}
            />

            <div className="max-w-7xl mx-auto px-4">
                <SortDropdown selectedSort={sort || ""}
                    onSortChange={(newSort) => setFilters({ sort: newSort })} />

                {/* 🏍️ Motorcycles Grid */}
                <motion.div
                    className="grid grid-cols-1 mx-8 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {motos.map((moto, index) => (
                        <MotorcycleCard key={`${moto.id} - ${index}`} motorcycle={moto} />
                    ))}

                </motion.div>

                <PaginationControls
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    totalPages={totalPages}
                    showPagination={showPagination}
                />
            </div>
        </div >
    );
};

export default MotorcyclesSummaryList;

