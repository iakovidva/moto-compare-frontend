"use client";

import React from "react";

export default function MotorcyclesPageShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center bg-blue-50 rounded-xl p-8 mt-6 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                    Discover Your Next Ride
                </h1>
                <p className="text-md md:text-lg text-blue-600">
                    Browse, filter, and compare motorcycles from all the top brands—find
                    the one that’s perfect for you.
                </p>
            </div>

            {children}
        </div>
    );
}
