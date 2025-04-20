"use client"

import React, { useState } from "react";

const MobileFilters = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="fixed bottom-0 right-4 bg-blue-600 text-white my-4 px-5 py-3 rounded-full shadow-md flex items-center justify-center lg:hidden z-40"
                onClick={() => setIsOpen(true)}
            >
                Filters
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
                    <div className="relative bg-white w-11/12 h-5/6 p-6 rounded-lg overflow-auto">
                        <button
                            className="absolute top-4 right-6 text-3xl text-gray-600"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileFilters;
