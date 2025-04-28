import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";

export const numericalComparisonFields = [
    {
        title: "Engine",
        fields: [
            { key: "horsePower", label: "Horsepower", unit: "HP", color: "bg-orange-500" },
            { key: "torque", label: "Torque", unit: "Nm", color: "bg-green-500" },
            { key: "displacement", label: "Displacement", unit: "cc", color: "bg-pink-500" },
            { key: "fuelConsumption", label: "Fuel Consumption", unit: "l/100", color: "bg-pink-500" },
            { key: "bore", label: "Bore", unit: "mm", color: "bg-pink-500" },
            { key: "stroke", label: "Stroke", unit: "mm", color: "bg-pink-500" },
            { key: "compressionRatio", label: "Compression Ratio", unit: "", color: "bg-pink-500" },
        ],
    },
    {
        title: "Chassis",
        fields: [
            { key: "weight", label: "Weight", unit: "kg", color: "bg-blue-500" },
            { key: "tankCapacity", label: "Tank Capacity", unit: "L", color: "bg-purple-500" },
            { key: "wheelbase", label: "Wheelbase", unit: "mm", color: "bg-indigo-500" },
            { key: "groundClearance", label: "Ground Clearance", unit: "mm", color: "bg-indigo-500" },
            { key: "frontSuspensionTravel", label: "Front Suspension Travel", unit: "mm", color: "bg-indigo-500" },
            { key: "rearSuspensionTravel", label: "Rear Suspension Travel", unit: "mm", color: "bg-indigo-500" },

        ],
    },
    {
        title: "Wheels",
        fields: [
            { key: "frontWheelSize", label: "Front Wheel Size", unit: "?", color: "bg-blue-500" },
            { key: "rearWheelSize", label: "Rear Wheel Size", unit: "?", color: "bg-purple-500" },

        ],
    },
    {
        title: "Brakes",
        fields: [
            { key: "frontDiscDiameter", label: "Front Disc Diameter", unit: "?", color: "bg-blue-500" },
            { key: "rearDiscDiameter", label: "Rear Disc Diameter", unit: "?", color: "bg-purple-500" },

        ],
    },
];

type nonNumericalComparisonFieldsType = {
    category: string,
    features: {
        key: keyof MotorcycleDetailsModel;
        label: string;
        type?: "boolean";
        highlightIfTrue?: boolean;
    }[]
};

export const nonNumericalComparisonFields: nonNumericalComparisonFieldsType[] = [
    {
        category: "Engine",
        features: [
            { key: "engineDesign", label: "Engine Design" },
            { key: "coolingSystem", label: "Cooling System" },
            { key: "emissions", label: "Emissions" },
            { key: "fuelSystem", label: "Fuel System" },
            { key: "throttleControl", label: "Throttle Control" },
            { key: "clutch", label: "Clutch" },
            { key: "transmission", label: "Transmission" },
        ]
    },

    {
        category: "Chassis",
        features: [
            { key: "frameDesign", label: "Frame Design" },
            { key: "frontSuspension", label: "Front Suspension" },
            { key: "rearSuspension", label: "Rear Suspension" },
            { key: "seatHeight", label: "Seat Height" },
        ]
    },
    {
        category: "Wheels",
        features: [
            { key: "wheelsType", label: "Wheels Type" },
            { key: "frontTyre", label: "Front Tyre" },
            { key: "rearTyre", label: "Rear Tyre" },
        ]
    },
    {
        category: "Brakes",
        features: [
            { key: "abs", label: "ABS", type: "boolean", highlightIfTrue: true },
            { key: "frontBrake", label: "Front Brake" },
            { key: "rearBrake", label: "Rear Brake" },
        ]
    },
    {
        category: "Electronics",
        features: [
            { key: "dashDisplay", label: "Dash Display" },
            { key: "ridingModes", label: "Riding Modes" },
            { key: "quickShifter", label: "Quick Shifter", type: "boolean", highlightIfTrue: true },
            { key: "cruiseControl", label: "Cruise Control", type: "boolean", highlightIfTrue: true },
            { key: "tractionControl", label: "Traction Control", type: "boolean", highlightIfTrue: true },
            { key: "lighting", label: "Lighting" },
        ]
    }
];