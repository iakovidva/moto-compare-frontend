"use client";

import { useCompareStore } from "@/store/compareStore";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";

type Props = {
    bike: MotorcycleSummary;
    compact?: boolean;
};

export default function CompareToggleButton({ bike, compact = false }: Props) {
    const selected = useCompareStore((s) => s.selected);
    const add = useCompareStore((s) => s.addToCompare);
    const remove = useCompareStore((s) => s.removeFromCompare);

    const isSelected = selected.some((b) => b.id === bike.id);

    const handleClick = () => {
        isSelected ? remove(bike.id) : add(bike);
    };

    return (
        <button
            onClick={handleClick}
            className={`transition font-medium rounded ${isSelected
                ? "text-red-500 hover:underline"
                : "text-blue-600 hover:underline"
                } ${compact ? "text-sm px-2 py-1" : "text-base px-3 py-2"}`}
        >
            {isSelected ? "✕ Remove" : "+ Compare"}
        </button>
    );
}
