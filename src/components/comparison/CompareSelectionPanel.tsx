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
            <div className="hidden mt-4 lg:flex sticky bottom-0 bg-white border-t shadow-md z-40 px-6 py-4 items-start gap-6 max-w-6xl w-full justify-between mx-auto">
                {/* Motorcycle cards + placeholders */}
                <div className="flex gap-4 overflow-x-auto max-w-[70%] items-start">
                    {selected.map((bike) => (
                        <div key={bike.id} className="flex flex-col items-center w-36 bg-gray-100 p-3 rounded-lg shadow-sm">
                            <div className="relative w-full h-[60px] mb-2">
                                <Image
                                    src={bike.image || "/placeholder.png"}
                                    alt={bike.model}
                                    fill
                                    className="object-contain rounded"
                                    sizes="100px"
                                />
                            </div>
                            <p className="text-sm font-semibold text-center">{bike.model}</p>
                            <p className="text-xs text-gray-500 text-center">{bike.manufacturer}</p>
                            <button
                                onClick={() => removeFromCompare(bike.id)}
                                className="text-xs text-red-600 mt-2 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <AddBikePlaceholder classes="w-36" placeholders={placeholders} handleAddClick={handleAddClick} />
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                    <CompareNowButton selected={selected} />
                    <ClearAllButton clear={clearCompare} />
                </div>
            </div>

            {/* ✅ Mobile Floating Button */}
            <button
                className="fixed sticky bottom-4 left-4 z-50 bg-blue-600 text-white my-4 px-5 py-3 flex items-center justify-center rounded-full shadow-lg lg:hidden"
                onClick={() => setIsOpen(true)}
            >
                Compare ({selected.length})
            </button>

            {/* ✅ Mobile Bottom Sheet */}
            <Transition show={isOpen} as={Fragment}>
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
                            <DialogPanel className="w-full bg-white rounded-t-2xl p-4  overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Selected Motorcycles</h2>
                                    <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500">
                                        ✕
                                    </button>
                                </div>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {selected.map((bike) => (
                                        <div
                                            key={bike.id}
                                            className="w-32 bg-gray-100 rounded-lg p-3 flex flex-col items-center shadow-sm"
                                        >
                                            <div className="relative w-full h-[80px] mb-2">
                                                <Image
                                                    src={bike.image || "/placeholder.png"}
                                                    alt={bike.model}
                                                    fill
                                                    className="object-contain rounded"
                                                />
                                            </div>
                                            <p className="text-sm font-semibold text-center">{bike.model}</p>
                                            <p className="text-xs text-gray-500 text-center mb-2">{bike.manufacturer}</p>
                                            <button
                                                className="text-xs text-red-600 hover:underline"
                                                onClick={() => removeFromCompare(bike.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <AddBikePlaceholder classes="w-24" placeholders={placeholders} handleAddClick={handleAddClick} />
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
