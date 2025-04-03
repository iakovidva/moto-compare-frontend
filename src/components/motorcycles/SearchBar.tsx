"use client"

import { useDebounce } from "@/hooks/useDebounce";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";
import { useEffect, useState } from "react";

type SearchBarProps = {
    value?: string;
    onChange: (val: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {

    const [localSearch, setLocalSearch] = useState<string>(value || "");
    const debouncedSearch = useDebounce(localSearch);

    useEffect(() => {
        console.log(" ==== > inside debounced", debouncedSearch);
        onChange(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <input
            type="text"
            placeholder="🔍 Search motorcycles..."
            className="p-2 border rounded w-full"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
        />
    );
};
export default SearchBar;
