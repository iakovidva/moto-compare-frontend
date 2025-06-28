"use client";

import { useRouter } from "next/navigation";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { slugify } from "@/lib/utils";
import { Button } from "../ui/button";

type CompareNowButtonProps = {
    selected: MotorcycleSummary[],
    setIsOpenMobile?: (open: boolean) => void
}

export const CompareNowButton = ({ selected, setIsOpenMobile }: CompareNowButtonProps) => {
    const router = useRouter();

    const handleCompareClick = () => {

        if (selected.length < 2) return;
        if (setIsOpenMobile) setIsOpenMobile(false);
        const q: string = selected.map((bike) =>
            (slugify(bike.model) + '-' + bike.id))
            .join("_vs_");

        router.push(`/compare/${q}`);

    };

    const isDisabled = selected.length < 2;

    return (
        <Button onClick={handleCompareClick} disabled={isDisabled} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 h-auto">
            Compare Now
        </Button>
    );
};


export const ClearAllButton = ({ clear }: { clear: () => void }) => {

    return (
        <button onClick={clear} className="text-sm text-gray-500 hover:text-red-500 transition">
            Clear All
        </button>
    );
};
