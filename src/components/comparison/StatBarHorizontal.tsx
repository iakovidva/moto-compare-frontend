"use client";

import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";

type StatBarHorizontalProps = {
    data: MotorcycleDetailsModel[];
    dataKey: keyof MotorcycleDetailsModel;
    label: string;
    unit?: string;
    color?: string;
};

const StatBarHorizontal = ({
    data,
    dataKey,
    label,
    unit = "",
    color = "bg-blue-600",
}: StatBarHorizontalProps) => {
    const maxValue = Math.max(...data.map((item) => item[dataKey] as number));

    return (
        <div className="w-full rounded-lg bg-gray-50 px-4 py-3 my-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{label}</h4>

            <div className="space-y-2 divide-y divide-gray-200">
                {data.map((bike, index) => {
                    const value = bike[dataKey] as number;
                    const barWidth = (value / maxValue) * 100;

                    return (
                        <div
                            key={`${bike.id}-${index}`}
                            className="flex items-center justify-between"
                        >
                            <div className="text-xs text-gray-600 font-medium w-28 truncate">
                                {bike.model}
                            </div>

                            <div className="flex-1 ml-2">
                                <div className="w-full bg-gray-200 h-4 rounded">
                                    <div
                                        className={`${color} h-4 rounded`}
                                        style={{ width: `${barWidth}%` }}
                                    />
                                </div>
                            </div>

                            <div className="text-xs text-gray-700 font-medium w-12 text-right ml-2">
                                {value} {unit}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatBarHorizontal;
