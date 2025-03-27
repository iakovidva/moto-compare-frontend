import React from "react";
import ReportIncorrectSpec from "./ReportIncorrectSpec";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";

type Props = {
    bike: MotorcycleDetailsModel;
};

const ActionButtons = ({ bike }: Props) => {
    return (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                <button className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                    <span className="text-red-500 text-2xl">❤️</span>
                    <span className="font-medium">Favorite</span>
                </button>

                {/* Report Incorrect Spec Button */}
                <ReportIncorrectSpec bike={bike} />
            </div>
        </div>
    );
};

export default ActionButtons;