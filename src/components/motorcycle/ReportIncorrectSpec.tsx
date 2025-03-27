"use client";

import React, { useState } from "react";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { groupedMotoSpecs } from "@/constants/groupedMotorcycleDetails";
import { reportIncorrectSpec } from "@/lib/MotorcycleApi";
import { useParams } from "next/navigation";
import { IncorrectSpecReportModel } from "@/models/IncorrectSpecRequestModel";
import { SpecCard } from "./SpecCard";

interface ReportIncorrectSpecProps {
    bike: MotorcycleDetailsModel;
}


const ReportIncorrectSpec = ({ bike }: ReportIncorrectSpecProps) => {
    const [open, setOpen] = useState(false);
    const [checkedSpecs, setCheckedSpecs] = useState(new Set<string>());
    const [updatedSpecs, setUpdatedSpecs] = useState<Record<string, string>>({});
    const params = useParams();
    const motorcycleId = params.motorcycle?.toString();

    const motoSpecs = groupedMotoSpecs(bike);

    // Handle checking/unchecking a spec
    const toggleSpec = (spec: string) => {
        setCheckedSpecs((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(spec)) {
                newSet.delete(spec);
                setUpdatedSpecs((prevSpecs) => {
                    const newSpecs = { ...prevSpecs };
                    delete newSpecs[spec]; // Remove from updates
                    return newSpecs;
                });
            } else {
                newSet.add(spec);
                setUpdatedSpecs((prevSpecs) => ({
                    ...prevSpecs,
                    [spec]: bike[spec as keyof MotorcycleDetailsModel]?.toString() || "",
                }));
            }
            return newSet;
        });
    };

    // Handle value change
    const handleChange = (spec: string, value: string) => {
        setUpdatedSpecs((prev) => ({ ...prev, [spec]: value }));
    };

    // Handle submission
    const handleSubmit = () => {
        const report = Object.entries(updatedSpecs).map(([key, newValue]) => ({
            field: key,
            oldValue: bike[key as keyof MotorcycleDetailsModel]?.toString() || "",
            newValue,
        }));

        const requestBody: IncorrectSpecReportModel = {
            motorcycleId: motorcycleId!,
            data: report,
        };

        reportIncorrectSpec(requestBody);
        console.log("Report Submitted:", requestBody);
        setOpen(false);
    };

    return (
        <>
            <button
                className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                onClick={() => setOpen(true)}
            >
                <span className="text-2xl">⚠️</span>
                <span className="font-medium">Report Incorrect Spec</span>
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h2 className="text-xl font-semibold">Report Incorrect Specifications</h2>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)}>✖</button>
                        </div>

                        <p className="text-gray-600 mb-4 mt-2">Check the values that are incorrect and suggest the correct ones.</p>

                        <div className="columns-2 space-y-6">
                            {Object.entries(motoSpecs).map(([category, fields]) => (
                                <SpecCard
                                    key={category}
                                    category={category}
                                    fields={fields}
                                    isEditable={true}
                                    checkedSpecs={checkedSpecs}
                                    updatedSpecs={updatedSpecs}
                                    onToggle={toggleSpec}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end space-x-3 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setOpen(false)}>Cancel</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>Submit Report</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(ReportIncorrectSpec);