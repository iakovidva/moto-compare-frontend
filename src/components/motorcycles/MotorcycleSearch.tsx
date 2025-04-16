"use client"

import { useSearchMotorcycle } from "@/hooks/useSearchMotorcycle";
import SearchBar from "./filters/SearchBar";

const MotorcycleSearch = () => {
    const { search, setSearch } = useSearchMotorcycle();

    return (
        <div className="my-4">
            <SearchBar value={search} onChange={setSearch} />
        </div>
    );
};

export default MotorcycleSearch;
