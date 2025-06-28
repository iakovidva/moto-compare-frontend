"use client";

import { useCompareStore } from "@/store/compareStore";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ClearAllButton, CompareNowButton } from "./ComparePanelButtons";
import AddBikePlaceholder from "./AddBikePlaceholder";

export default function CompareSelectionPanel() {
    const { selected, removeFromCompare, clearCompare } = useCompareStore();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const maxSlots = 4;
    const placeholders = Array.from({ length: maxSlots - selected.length });

    const handleAddClick = () => {
        if (isOpen) setIsOpen(false);
        if (pathname !== "/motorcycles") {
            router.push("/motorcycles");
        } else {
            // Optionally scroll to the grid or open a filter
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (selected.length === 0) return null;

    return (
        <>
            {/* ✅ Desktop Panel */}
            <div className="border hidden mt-8 lg:flex sticky bottom-0 bg-background shadow-md z-40 p-4 max-w-4xl w-full mx-auto rounded-xl">
                <div className="flex flex-col w-full gap-3">
                    {/* Header Row */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-foreground font-semibold text-sm">
                            Compare ({selected.length}/4)
                        </h3>
                        <button
                            onClick={clearCompare}
                            className="text-red-500 hover:text-red-600 text-sm"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Content Row */}
                    <div className="flex gap-4 items-center">
                        {/* Motorcycle cards + placeholders */}
                        <div className="flex gap-3 overflow-x-auto flex-1">
                            {selected.map((bike) => (
                                <div key={bike.id} className="flex flex-col items-center w-36 shadow-sm bg-muted rounded-lg p-2 relative">
                                    <button
                                        onClick={() => removeFromCompare(bike.id)}
                                        className="absolute top-1 right-1 text-red-500 hover:text-red-600"
                                    >
                                        x
                                    </button>
                                    <p className="text-sm font-semibold text-center">{bike.model} </p>
                                    <p className="text-xs text-muted-foreground text-center">{bike.manufacturer}</p>
                                    <p className="text-xs text-muted-foreground text-center">{bike.yearRange}</p>
                                </div>
                            ))}

                            <AddBikePlaceholder
                                placeholders={placeholders}
                                handleAddClick={handleAddClick}
                                classes="w-36 h-[4.5rem] flex-shrink-0"
                            />
                        </div>

                        {/* Compare Button */}
                        <CompareNowButton selected={selected} />
                    </div>
                </div>
            </div>

            {/* ✅ Mobile Floating Button */}
            <button
                className="fixed sticky bottom-4 left-4 z-50 bg-orange-600 text-white my-4 px-5 py-3 flex items-center justify-center rounded-full shadow-lg lg:hidden"
                onClick={() => setIsOpen(true)}
            >
                Compare ({selected.length})
            </button>

            {/* ✅ Mobile Bottom Sheet */}
            <Transition show={isOpen && selected.length > 1} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex items-end">
                        <TransitionChild
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-y-full"
                            enterTo="translate-y-0"
                            leave="transform transition ease-in-out duration-200"
                            leaveFrom="translate-y-0"
                            leaveTo="translate-y-full"
                        >
                            <DialogPanel className="w-full bg-background rounded-t-2xl p-4 overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Selected Motorcycles</h2>
                                    <button onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground">
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-flow-col grid-rows-2 justify-center gap-4">
                                    {selected.map((bike) => (
                                        <div key={bike.id} className="flex flex-col items-center w-36 shadow-sm bg-muted rounded-lg p-2 relative">
                                            <button
                                                onClick={() => removeFromCompare(bike.id)}
                                                className="absolute top-1 right-1 text-red-500 hover:text-red-600"
                                            >
                                                x
                                            </button>
                                            <p className="text-sm font-semibold text-center">{bike.model} </p>
                                            <p className="text-xs text-muted-foreground text-center">{bike.manufacturer}</p>
                                            <p className="text-xs text-muted-foreground text-center">{bike.yearRange}</p>
                                        </div>
                                    ))}
                                    <AddBikePlaceholder
                                        classes="w-36 h-[4.5rem] flex-shrink-0"

                                        placeholders={placeholders} handleAddClick={handleAddClick} />
                                </div>


                                <div className="mt-6 flex flex-col gap-2">
                                    <CompareNowButton selected={selected} setIsOpenMobile={setIsOpen} />
                                    <ClearAllButton clear={clearCompare} />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
