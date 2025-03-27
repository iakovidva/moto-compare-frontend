import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { JSX, ReactElement } from "react";
import { FaBolt, FaBiking, FaTachometerAlt, FaCogs, FaTools, FaCarBattery } from "react-icons/fa";
import { specConfig } from "./specConfig";

export const categoryIcons: Record<string, JSX.Element> = {
    engine: <FaCogs className="text-white text-xl" />,
    chassis: <FaBiking className="text-white text-xl" />,
    brakes: <FaBolt className="text-white text-xl" />,
    wheels: <FaTachometerAlt className="text-white text-xl" />,
    transmission: <FaTools className="text-white text-xl" />,
    electronics: <FaCarBattery className="text-white text-xl" />,
};

export const groupedMotoSpecs = (motorcycle: MotorcycleDetailsModel) => {
    return Object.fromEntries(
        Object.entries(specConfig).map(([category, fields]) => [
            category,
            Object.fromEntries(fields.map(({ key, unit, type }) => [
                key,
                type === 'boolean'
                    ? motorcycle[key as keyof MotorcycleDetailsModel] ? "Yes" : "No"
                    : motorcycle[key as keyof MotorcycleDetailsModel] !== undefined
                        ? `${motorcycle[key as keyof MotorcycleDetailsModel]}${unit ? ` ${unit}` : ""}`
                        : "",
            ]))
        ])
    )
}

export const groupedMotoSpecsEmpty = () => {
    return Object.fromEntries(
        Object.entries(specConfig).map(([category, fields]) => [
            category,
            Object.fromEntries(fields.map(({ key }) => [key, undefined])),
        ])
    );
};


interface MotorcycleSpecItem {
    label: string;
    value: string;
}

export interface CategorySpec {
    category: string;
    icon: ReactElement;
    items: MotorcycleSpecItem[];
}

const defaultIcon = <FaTools className="text-white text-xl" />;

type GroupedSpecs = {
    engine: Record<string, string>;
    chassis: Record<string, string>;
    brakes: Record<string, string>;
    wheels: Record<string, string>;
    transmission: Record<string, string>;
    electronics: Record<string, string>;
};

export function getCardSpecs(groupedSpecs: GroupedSpecs): CategorySpec[] {
    return Object.entries(groupedSpecs).map(([category, specs]) => ({
        category: category,
        icon: categoryIcons[category] || defaultIcon,
        items: Object.entries(specs).map(([key, value]) => ({
            label: key,
            value: value ? `${value}` : "N/A",
        }))
    }))
}