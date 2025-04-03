"use client";

import { useState } from "react";
import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import { motion } from "framer-motion";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { fetchAllMotorcyclesSummary } from "@/lib/MotorcycleApi";
import { useMotorcycleFilters } from "@/hooks/useMotorcyclesFilter";
import FiltersPanel from "./FiltersPanel";
import RangeDropdown from "./RangeDropdown";
import MobileFiltersModal from "./MobileFiltersModal";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "./pagination/PaginationControls";

interface Props {
    motorcycles: MotorcycleSummary[];
}
const PAGE_SIZES = [6, 12, 24, 48];


const MotorcyclesSummaryList: React.FC<Props> = ({ motorcycles }) => {

    // const { page, pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax,
    //     setFilters, setPage, setPageSize
    // } = useMotorcycleFilters();

    const { category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax,
        setFilters
    } = useMotorcycleFilters();

    const { page, pageSize, setPage, setPageSize } = usePagination(); // ✅ Separate pagination logic


    const { status, error, data } = useQuery({
        queryKey: ["motorcycles", page, pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax],
        queryFn: () => fetchAllMotorcyclesSummary({ page: page - 1, size: pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax }),
    });

    if (status === "pending") {
        return <p>Loading placeholder</p>
    }

    const motos = data?.motorcycles || [];
    const totalPages = data?.totalPages || 0;

    return (
        <div>
            <div className="hidden md:block">
                <RangeDropdown
                    label="Horsepower"
                    unit="HP"
                    min={horsePowerMin}
                    max={horsePowerMax}
                    values={generateRange(5, 300, 20)}
                    minKey="horsePowerMin"
                    maxKey="horsePowerMax"
                    onChange={setFilters}
                />
                <RangeDropdown
                    label="Displacement"
                    unit="cc"
                    min={displacementMin}
                    max={displacementMax}
                    values={generateRange(50, 1500, 50)}
                    minKey="displacementMin"
                    maxKey="displacementMax"
                    onChange={setFilters}
                />
            </div>
            <div className="hidden md:block">

                <FiltersPanel />
            </div>
            <MobileFiltersModal />

            <div className="max-w-7xl mx-auto px-4">
                {/* <SortDropdown selectedSort={sort} onSortChange={setSort} /> */}

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
                />
            </div>
        </div >
    );
};

export default MotorcyclesSummaryList;

export const generateRange = (min: number, max: number, step: number) => {
    const result: number[] = [];
    for (let i = min; i <= max; i += step) {
        result.push(i);
    }
    return result;
}