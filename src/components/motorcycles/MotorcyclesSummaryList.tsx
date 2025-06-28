"use client";

import MotorcycleCard from "@/components/motorcycles/MotorcycleCard";
import { motion } from "framer-motion";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { fetchAllMotorcyclesSummary } from "@/lib/api/motorcycles";
import { useMotorcycleFilters } from "@/hooks/useMotorcyclesFilter";
import FiltersPanel from "./filters/FiltersPanel";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "./pagination/PaginationControls";
import MobileFilters from "./filters/MobileFilters";
import MotorcycleSearch from "./MotorcycleSearch";
import TopControlsBar from "./TopControlsBar";
import PopularManufacturers from "./PopularManufacturers";

interface Props {
    motorcycles: MotorcycleSummary[];
}

const MotorcyclesSummaryList: React.FC<Props> = ({ motorcycles }) => {

    const { search, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, sort,
        yearMin, yearMax, setFilters } = useMotorcycleFilters();

    const { page, pageSize, setPage, setPageSize } = usePagination();

    const { status, error, data } = useQuery({
        queryKey: ["motorcycles", search, page, pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, yearMin, yearMax, sort],
        queryFn: () => fetchAllMotorcyclesSummary({ search, page: page - 1, size: pageSize, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, yearMin, yearMax, sort }),
    });

    if (status === "pending") {
        return <p>Loading placeholder</p>
    }

    const motos = data?.motorcycles || [];
    const totalPages = data?.totalPages || 0;

    return (
        <div className="max-w-8xl mx-auto px-2">
            <MotorcycleSearch />
            <PopularManufacturers onSelect={(name) => setFilters({ manufacturer: name })} />

            <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="h-fit hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 p-2 rounded-2xl">
                    <FiltersPanel
                        category={category}
                        manufacturer={manufacturer}
                        horsePowerMin={horsePowerMin}
                        horsePowerMax={horsePowerMax}
                        displacementMin={displacementMin}
                        displacementMax={displacementMax}
                        yearMin={yearMin}
                        yearMax={yearMax}
                        setFilters={setFilters}
                    />
                </div>

                {/* Motorcycle grid */}
                <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                    <div className="p-4 rounded-2xl shadow-sm ">
                        <TopControlsBar
                            sort={sort || ""}
                            onSortChange={(newSort) => setFilters({ sort: newSort })}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />

                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {motos.map((moto, index) => (
                                <MotorcycleCard key={`${moto.id}-${index}`} motorcycle={moto} />
                            ))}
                        </motion.div>

                        <PaginationControls
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>

            <MobileFilters />
        </div>
    );
};

export default MotorcyclesSummaryList;

