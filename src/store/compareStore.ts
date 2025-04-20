import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
    selected: MotorcycleSummary[];
    addToCompare: (bike : MotorcycleSummary) => void;
    removeFromCompare: (id: string) => void;
    clearCompare: () => void;
    isSelected: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>() (
    persist(
        (set,get) => ({
            selected: [],
            addToCompare: (bike) => {
                const existing = get().selected;
                const isAlreadyAdded = existing.some((b) => b.id === bike.id);
                if (isAlreadyAdded || existing.length >=4) return;
                set({selected: [...existing, bike]});

            },
            removeFromCompare: (id) => {
                set((state) => ({
                    selected: state.selected.filter((b) => b.id !== id),
                }));
            },
            clearCompare: () => set({selected: []}),
            isSelected: (id) => get().selected.some((b) => b.id === id),
        }),
        {
            name: "compare-storage",
        }
    )
);