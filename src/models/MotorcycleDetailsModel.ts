import { MotorcycleSummary } from "./MotorcycleSummary";
import { CategoryEnum, ManufacturerEnum } from "../constants/enums";
import { z } from "zod";

export type ManufacturerEnumType = z.infer<typeof ManufacturerEnum>;
export type CategoryEnumType = z.infer<typeof CategoryEnum>;

export interface MotorcycleDetailsModel extends MotorcycleSummary {
    
    // Engine fields
    engineDesign: string;
    torque: number;
    bore: number;
    stroke: number;
    compressionRatio: number;
    coolingSystem: string;
    fuelConsumption: number;
    emissions: string;
    fuelSystem: string;
    throttleControl: string;
    clutch: string;
    transmission: string;

    // Chassis
    weight: number;
    tankCapacity: number;
    wheelbase: number;
    groundClearance: number;
    frameDesign: string;
    frontSuspension: string;
    rearSuspension: string;
    frontSuspensionTravel: number;
    rearSuspensionTravel: number;
    seatHeight: string;

    // Wheels
    wheelsType: string;
    frontTyre: string;
    rearTyre: string;
    frontWheelSize: number;
    rearWheelSize: number;

    // Brakes
    frontBrake: string;
    rearBrake: string;
    frontDiscDiameter: number;
    rearDiscDiameter: number;
    abs: boolean;

    // Electronics
    dashDisplay: string;
    ridingModes: string;
    tractionControl: boolean;
    quickShifter: string;
    cruiseControl: boolean;
    lighting: string;

    // Related motorcycles
    similarMotorcycles: MotorcycleSummary[];

    // Reviews
    reviews: ReviewResponse[];
    averageRating: number;
    numberOfReviews: number;
}

export interface ReviewResponse {
    userName: string;
    motorcycleId: string;
    rating: number;
    comment: string;
    createdAt: string;
}
