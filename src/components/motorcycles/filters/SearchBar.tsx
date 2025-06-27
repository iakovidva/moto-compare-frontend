"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

type SearchBarProps = {
    value?: string;
    onChange: (val: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    const [localSearch, setLocalSearch] = useState<string>(value || "");
    const debouncedSearch = useDebounce(localSearch);

    useEffect(() => {
        onChange(debouncedSearch);
    }, [debouncedSearch]);

    const clearSearch = () => {
        setLocalSearch("");
    };

    return (
        <div className="relative max-w-md text-foreground">
            {/* <input
                type="text"
                placeholder="Find motorcycle"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
            /> */}
            <input
                type="text"
                placeholder="Search motorcycles by name or brand..."
                value={value}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="text-foreground bg-muted w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
            </div>
            {localSearch && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-red-500 transition"
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default SearchBar;
