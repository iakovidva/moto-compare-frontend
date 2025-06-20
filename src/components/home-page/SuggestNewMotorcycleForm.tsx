"use client"

import { ManufacturerEnum } from "@/constants/enums";
import { addMotorcycleRequest } from "@/lib/api/requests";
import { useState } from "react";

interface FormData {
    manufacturer: string;
    model: string;
    yearRange: string;
}

export default function SuggestNewMotorcycleForm() {
    const [formData, setFormData] = useState<FormData>({
        manufacturer: "",
        model: "",
        yearRange: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.manufacturer || !formData.model || !formData.yearRange) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("sending request");
            await addMotorcycleRequest(formData);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2000);
            if (!loading)
                setFormData({
                    manufacturer: '',
                    model: '',
                    yearRange: '',
                });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Failed to submit the request. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-muted text-foreground border border-gray-700 focus:ring-2 focus:ring-orange-500"
                    required
                >
                    <option value="" disabled>
                        Select Manufacturer
                    </option>
                    {ManufacturerEnum.options.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="model"
                    placeholder="Model (e.g. Street Triple)"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-muted text-foreground border border-gray-700 focus:ring-2 focus:ring-orange-500"
                    required
                />

                <input
                    type="text"
                    name="yearRange"
                    placeholder="Year Range (e.g. 2017–2024)"
                    value={formData.yearRange}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-muted text-foreground border border-gray-700 focus:ring-2 focus:ring-orange-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md font-semibold text-foreground transition ${loading
                        ? "bg-orange-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700"
                        }`}
                >
                    {loading ? "Submitting..." : "Suggest Motorcycle"}
                </button>
            </form>

            {submitted && (
                <p className="mt-4 text-green-400 text-center">✅ Thanks! Your suggestion has been received.</p>
            )}

            {error && (
                <p className="mt-4 text-red-400 text-center">{error}</p>
            )}
        </>
    );
}