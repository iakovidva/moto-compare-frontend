"use client";

import { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchMotorcycleDetails } from "@/lib/MotorcycleApi";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";

type Props = {
    motorcycles: MotorcycleSummary[]; // List of all bikes (summary)
};

export default function MotorcycleComparison({ motorcycles }: Props) {
    const [selectedSummaries, setSelectedSummaries] = useState<MotorcycleSummary[]>([]);
    const [bikeDetails, setBikeDetails] = useState<MotorcycleDetailsModel[]>([]);

    // Fetch details when selected bikes change
    useEffect(() => {
        async function fetchDetails() {
            const details = await Promise.all(
                selectedSummaries.map((bike) => fetchMotorcycleDetails(bike.id))
            );
            setBikeDetails(details.filter((detail): detail is MotorcycleDetailsModel => detail !== null)); // Remove null values
        }
        if (selectedSummaries.length > 0) fetchDetails();
    }, [selectedSummaries]);

    function toggleBikeSelection(bike: MotorcycleSummary) {
        setSelectedSummaries((prev) =>
            prev.some((b) => b.id === bike.id) ? prev.filter((b) => b.id !== bike.id) : [...prev, bike]
        );
    }

    // Prepare data for charts
    const radarData = bikeDetails.map((bike) => ({
        model: bike.model,
        horsePower: bike.horsePower,
        torque: bike.torque,
        weight: bike.weight,
        fuelConsumption: bike.fuelConsumption,
        tankCapacity: bike.tankCapacity,
    }));

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">Compare Motorcycles</h1>

            {/* Dropdown for selecting motorcycles */}
            <div className="flex gap-4 mb-6">
                {motorcycles.map((bike) => (
                    <button
                        key={bike.id}
                        className={`px-4 py-2 border rounded ${selectedSummaries.includes(bike) ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => toggleBikeSelection(bike)}
                    >
                        {bike.model}
                    </button>
                ))}
            </div>

            {bikeDetails.length > 1 && (
                <>
                    {/* Radar Chart */}
                    <h2 className="text-xl font-semibold mb-2">Performance Overview</h2>
                    <ResponsiveContainer width="80%" height={400}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="model" />
                            <PolarRadiusAxis />
                            {bikeDetails.map((bike, index) => (
                                <Radar key={bike.model} name={bike.model} dataKey="horsePower" stroke={index === 0 ? "red" : "blue"} fill={index === 0 ? "red" : "blue"} fillOpacity={0.6} />
                            ))}
                        </RadarChart>
                    </ResponsiveContainer>

                    {/* Bar Chart for Individual Stats */}
                    <h2 className="text-xl font-semibold mb-2">Detailed Comparison</h2>
                    <ResponsiveContainer width="80%" height={300}>
                        <BarChart data={bikeDetails}>
                            <XAxis dataKey="model" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="horsePower" fill="orange" name="Horsepower" />
                            <Bar dataKey="torque" fill="green" name="Torque" />
                            <Bar dataKey="weight" fill="blue" name="Weight (kg)" />
                            <Bar dataKey="tankCapacity" fill="purple" name="Tank Capacity (L)" />
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Categorical Comparison Table */}
                    <h2 className="text-xl font-semibold mt-4">Feature Comparison</h2>
                    <table className="table-auto border-collapse border border-gray-400 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Feature</th>
                                {bikeDetails.map((bike) => (
                                    <th key={bike.model} className="border border-gray-300 px-4 py-2">{bike.model}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Engine Design</td>
                                {bikeDetails.map((bike) => (
                                    <td key={bike.model} className="border border-gray-300 px-4 py-2">{bike.engineDesign}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Transmission</td>
                                {bikeDetails.map((bike) => (
                                    <td key={bike.model} className="border border-gray-300 px-4 py-2">{bike.transmission}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">ABS</td>
                                {bikeDetails.map((bike) => (
                                    <td key={bike.model} className="border border-gray-300 px-4 py-2">{bike.abs ? "✔️ Yes" : "❌ No"}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
