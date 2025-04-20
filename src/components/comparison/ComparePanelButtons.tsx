"use client";

import { useRouter } from "next/navigation";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";

type CompareNowButtonProps = {
    selected: MotorcycleSummary[],
    setIsOpenMobile?: (open: boolean) => void
}

export const CompareNowButton = ({ selected, setIsOpenMobile }: CompareNowButtonProps) => {
    const router = useRouter();

    const handleCompareClick = () => {
        if (selected.length >= 2) {
            if (setIsOpenMobile) setIsOpenMobile(false);
            const query = selected.map((bike) => bike.id).join(",");
            router.push(`/compare?ids=${query}`);
        }
    };

    const isDisabled = selected.length < 2;

    return (
        <button
            onClick={handleCompareClick}
            disabled={isDisabled}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
        >
            Compare Now ({selected.length})
        </button>
    );
};


export const ClearAllButton = ({ clear }: { clear: () => void }) => {

    return (
        <button onClick={clear} className="text-sm text-gray-500 hover:text-red-500 transition">
            Clear All
        </button>
    );
};
