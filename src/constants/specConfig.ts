export type FieldConfig = {
    key: string;
    label: string;
    type: "string" | "number" | "boolean" | "enum";
    required? : boolean, // TODO ADD REQUIRED TO ALL THE REQUIRED FIELDS :) 
    unit?: string;
    min?: number;
    values?: string[];
};

export const specConfig: Record<string, FieldConfig[]> = {
    // general: [
    //     { key: "manufacturer", label: "Manufacturer", type: "enum", values: ManufacturerEnum.options},
    //     { key: "model", label: "Model", type: "string" },
    //     { key: "yearRange", label: "Year Range", type: "string" },
    //     { key: "image", label: "Image URL", type: "string" },
    //     { key: "category", label: "Category", type: "enum", values: CategoryEnum.options },
    // ],
    engine: [
        { key: "engineDesign", label: "Engine Design", type: "string", required:true },
        { key: "displacement", label: "Displacement", type: "number", unit: "cc", min: 50 },
        { key: "horsePower", label: "Horsepower", type: "number", unit: "HP", min: 1 },
        { key: "torque", label: "Torque", type: "number", unit: "Nm", min: 1 },
        { key: "bore", label: "Bore", type: "number", unit: "mm" },
        { key: "stroke", label: "Stroke", type: "number", unit: "mm" },
        { key: "compressionRatio", label: "Compression Ratio", type: "number" },
        { key: "coolingSystem", label: "Cooling System", type: "string" },
        { key: "fuelConsumption", label: "Fuel Consumption", type: "number", unit: "L/100km", min: 1 },
        { key: "emissions", label: "Emissions Standard", type: "string" },
        { key: "fuelSystem", label: "Fuel System", type: "string" },
        { key: "throttleControl", label: "Throttle Control", type: "string" },
        { key: "clutch", label: "Clutch Type", type: "string" },
        { key: "transmission", label: "Transmission", type: "string" },
    ],
    chassis: [
        { key: "frameDesign", label: "Frame Design", type: "string" },
        { key: "groundClearance", label: "Ground Clearance", type: "number", unit: "mm" },
        { key: "seatHeight", label: "Seat Height", type: "string" },
        { key: "weight", label: "Weight", type: "number", unit: "kg", min: 1 },
        { key: "tankCapacity", label: "Tank Capacity", type: "number", unit: "L", min: 1 },
        { key: "wheelbase", label: "Wheelbase", type: "number", unit: "mm" },
        { key: "frontSuspension", label: "Front Suspension", type: "string" },
        { key: "rearSuspension", label: "Rear Suspension", type: "string" },
        { key: "frontSuspensionTravel", label: "Front Suspension Travel", type: "number", unit: "mm" },
        { key: "rearSuspensionTravel", label: "Rear Suspension Travel", type: "number", unit: "mm" },
    ],
    wheels: [
        { key: "wheelsType", label: "Wheels Type", type: "string" },
        { key: "frontTyre", label: "Front Tyre", type: "string" },
        { key: "rearTyre", label: "Rear Tyre", type: "string" },
        { key: "frontWheelSize", label: "Front Wheel Size", type: "number", unit: "inches", min: 1 },
        { key: "rearWheelSize", label: "Rear Wheel Size", type: "number", unit: "inches", min: 1 },
    ],
    brakes: [
        { key: "frontBrake", label: "Front Brake", type: "string" },
        { key: "rearBrake", label: "Rear Brake", type: "string" },
        { key: "frontDiscDiameter", label: "Front Disc Diameter", type: "number", unit: "mm" },
        { key: "rearDiscDiameter", label: "Rear Disc Diameter", type: "number", unit: "mm" },
        { key: "abs", label: "ABS", type: "boolean" },
    ],
    electronics: [
        { key: "dashDisplay", label: "Dash Display", type: "string" },
        { key: "ridingModes", label: "Riding Modes", type: "string" },
        { key: "tractionControl", label: "Traction Control", type: "boolean" },
        { key: "quickShifter", label: "Quick Shifter", type: "string" },
        { key: "cruiseControl", label: "Cruise Control", type: "boolean" },
        { key: "lighting", label: "Lighting Type", type: "string" },
    ],
};
