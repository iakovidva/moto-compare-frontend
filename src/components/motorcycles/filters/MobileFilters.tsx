import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import FiltersPanel from "./FiltersPanel";
import { useMotorcycleFilters } from "@/hooks/useMotorcyclesFilter";
import { Button } from "@/components/ui/button";
import { MotorcycleFilters } from "@/models/MotorcyclesFilters";

export default function MobileFilters() {
    const [isOpen, setIsOpen] = useState(false);

    const { search, category, manufacturer, horsePowerMin, horsePowerMax, displacementMin, displacementMax, sort,
        yearMin, yearMax, setFilters } = useMotorcycleFilters();

    const [tempFilters, setTempFilters] = useState<Partial<MotorcycleFilters>>({
        category,
        manufacturer,
        horsePowerMin,
        horsePowerMax,
        displacementMin,
        displacementMax,
        yearMin,
        yearMax
    });

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setTempFilters({
                category,
                manufacturer,
                horsePowerMin,
                horsePowerMax,
                displacementMin,
                displacementMax,
                yearMin,
                yearMax
            });
        }
        setIsOpen(open);
    };


    const handleApply = () => {
        setFilters(tempFilters);
        setIsOpen(false);
    };

    const handleClear = () => {
        setTempFilters({
            category: undefined,
            manufacturer: undefined,
            horsePowerMin: undefined,
            horsePowerMax: undefined,
            displacementMin: undefined,
            displacementMax: undefined,
            yearMin: undefined,
            yearMax: undefined
        });
    };

    const handleTempFiltersChange = (newFilters?: Partial<MotorcycleFilters>) => {
        if (newFilters) {
            setTempFilters(prev => ({ ...prev, ...newFilters }));
        }
    };

    return (
        <>
            <div className="pt-16">
                <button
                    className="fixed bottom-0 right-4 bg-orange-600 text-white my-4 px-5 py-3 rounded-full shadow-md flex items-center justify-center lg:hidden z-40"
                    onClick={() => setIsOpen(true)}
                >
                    Filters
                </button>
            </div>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                        </DialogTitle>
                    </DialogHeader>
                    <FiltersPanel
                        category={tempFilters.category}
                        manufacturer={tempFilters.manufacturer}
                        horsePowerMin={tempFilters.horsePowerMin}
                        horsePowerMax={tempFilters.horsePowerMax}
                        displacementMin={tempFilters.displacementMin}
                        displacementMax={tempFilters.displacementMax}
                        yearMin={tempFilters.yearMin}
                        yearMax={tempFilters.yearMax}
                        setFilters={handleTempFiltersChange}
                        clearTempFilters={handleClear}
                    />
                    <DialogFooter className="sm:justify-between gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="flex-1"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleApply}
                            className="flex-1 bg-orange-500 hover:bg-orange-600"
                        >
                            Apply Filters
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}