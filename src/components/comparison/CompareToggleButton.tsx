"use client";

import { useCompareStore } from "@/store/compareStore";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { Button } from "../ui/button";

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
        <Button
            onClick={handleClick}
            size="sm"
            className={`w-full py-1.5 ${isSelected
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
                }${compact ? "text-xs h-7" : "text-base px-3 py-2"}`}
        >
            {isSelected ? "✕ Remove" : "+ Compare"}
        </Button>
    );
}
