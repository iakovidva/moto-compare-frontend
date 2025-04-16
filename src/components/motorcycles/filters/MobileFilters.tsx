"use client"

import React, { useState } from "react";

const MobileFilters = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="fixed bottom-4 right-4 h-12 bg-blue-600 text-white px-6 rounded-full shadow-md flex items-center justify-center lg:hidden z-40"
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
