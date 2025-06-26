"use client";

import React, { useState } from "react";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { groupedMotoSpecs } from "@/constants/groupedMotorcycleDetails";
import { useParams } from "next/navigation";
import { IncorrectSpecReportModel } from "@/models/IncorrectSpecRequestModel";
import { SpecCard } from "./SpecCard";
import { reportIncorrectSpec } from "@/lib/api/requests";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface ReportIncorrectSpecProps {
    bike: MotorcycleDetailsModel;
}

const ReportIncorrectSpec = ({ bike }: ReportIncorrectSpecProps) => {
    const [showReportModal, setShowReportModal] = useState(false);

    const [checkedSpecs, setCheckedSpecs] = useState(new Set<string>());
    const [updatedSpecs, setUpdatedSpecs] = useState<Record<string, string>>({});
    const params = useParams();
    const motorcycleId = params.motorcycle?.toString();

    const motoSpecs = groupedMotoSpecs(bike);

    const toggleSpec = (spec: string) => {
        setCheckedSpecs((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(spec)) {
                newSet.delete(spec);
                setUpdatedSpecs((prevSpecs) => {
                    const newSpecs = { ...prevSpecs };
                    delete newSpecs[spec];
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

    const handleChange = (spec: string, value: string) => {
        setUpdatedSpecs((prev) => ({ ...prev, [spec]: value }));
    };

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
        setShowReportModal(false);
    };

    const onClose = () => {
        setShowReportModal(false);
    }
    return (

        <>
            <div className="mt-6 pt-6 border-t border-border">
                <Button
                    onClick={() => setShowReportModal(true)}
                    variant="outline"
                    size="sm"
                    className="border-orange-500 text-orange-500 hover:bg-accent text-sm"
                >
                    <span className="text-foreground">⚠️  Report Wrong Values</span>
                </Button>
            </div>


            <Dialog open={showReportModal} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            ⚠️  Report Wrong Values
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-gray-600 mb-4 mt-2">Check the values that are incorrect and suggest the correct ones.</p>

                    <div className="columns-2 space-y-6 text-foreground">
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

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="outline"
                            className="hover:text-foreground"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                        >
                            Submit Report
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default React.memo(ReportIncorrectSpec);