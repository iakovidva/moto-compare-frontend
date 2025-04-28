"use client";

import { nonNumericalComparisonFields } from "@/constants/comparison";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import clsx from "clsx";
import React from "react";

export default function FeatureComparisonTable({ bikeDetails }: { bikeDetails: MotorcycleDetailsModel[] }) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Feature Comparison</h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-auto">
                <table className="min-w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="text-left px-3 py-2 font-semibold text-gray-700 w-40">Feature</th>
                            {bikeDetails.map((bike) => (
                                <th key={bike.id} className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">
                                    {bike.model}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {nonNumericalComparisonFields.map(({ category, features }) => (
                            <React.Fragment key={category}>
                                {/* Category Header Row */}
                                <tr key={category} className="bg-gray-50">
                                    <td colSpan={bikeDetails.length + 1} className="px-3 py-2 font-medium text-gray-500 uppercase text-xs">
                                        {category}
                                    </td>
                                </tr>
                                {/* Feature Rows */}
                                {features.map(({ key, label, type, highlightIfTrue }) => (
                                    <tr key={key} className="border-t border-gray-200">
                                        <td className="px-3 py-2 font-medium text-gray-600">{label}</td>
                                        {bikeDetails.map((bike) => {
                                            const value = bike[key];
                                            const isBool = type === "boolean";
                                            const isPositive = isBool && highlightIfTrue && value;

                                            return (
                                                <td key={bike.id + String(key)} className="px-3 py-2">
                                                    {isBool ? (
                                                        <span className={clsx(
                                                            "px-2 py-1 rounded text-xs font-semibold",
                                                            value
                                                                ? isPositive
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-blue-100 text-blue-700"
                                                                : "bg-red-100 text-red-600"
                                                        )}>
                                                            {value ? "Yes" : "No"}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-800 text-sm">{String(value)}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion View */}
            <div className="md:hidden">
                {nonNumericalComparisonFields.map(({ category, features }) => (
                    <div key={category} className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 px-2 sticky top-0 bg-white py-2 z-10 border-b">
                            {category}
                        </h3>

                        <div className="space-y-3">
                            {features.map(({ key, label, type, highlightIfTrue }) => (
                                <div key={key} className="bg-white border rounded-lg overflow-hidden">
                                    <div className="px-4 py-3 border-b">
                                        <h4 className="font-medium text-gray-800">{label}</h4>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {bikeDetails.map((bike) => {
                                            const value = bike[key];
                                            const isBool = type === "boolean";
                                            const isPositive = isBool && highlightIfTrue && value;

                                            return (
                                                <div key={bike.id + key} className="px-4 py-2.5 flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">{bike.model}</span>
                                                    <span
                                                        className={clsx(
                                                            "text-sm font-medium",
                                                            isBool
                                                                ? value
                                                                    ? isPositive
                                                                        ? "text-green-600"
                                                                        : "text-blue-600"
                                                                    : "text-red-600"
                                                                : "text-gray-800"
                                                        )}
                                                    >
                                                        {isBool ? (value ? "✓" : "✗") : String(value)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}