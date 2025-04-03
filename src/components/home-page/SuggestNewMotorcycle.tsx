"use client"

import { addMotorcycleRequest } from "@/lib/MotorcycleApi";
import { useState } from "react";

interface FormData {
    manufacturer: string;
    model: string;
    yearRange: string;
}

export default function SuggestNewMotorcycle() {
    const [formData, setFormData] = useState<FormData>({
        manufacturer: "",
        model: "",
        yearRange: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            // Handle errors from the backend or network
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
        <div className="flex flex-col items-center bg-gray-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">🌍 Cannot Find Your Dream Bike?</h2>
            <p className="mb-4 text-gray-300">Let us know the model you are looking for, and we will add it soon!</p>

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md space-y-4">
                <input
                    type="text"
                    name="manufacturer"
                    placeholder="Manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                    required
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={formData.model}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                    required
                />
                <input
                    type="text"
                    name="yearRange"
                    placeholder="Year Range (e.g. 2015-2022)"
                    value={formData.yearRange}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
                    required
                />
                <button
                    type="submit"
                    className="p-3 bg-orange-600 hover:bg-orange-700 rounded-md text-white font-semibold transition"
                >
                    Suggest Motorcycle
                </button>
            </form>

            {submitted && (
                <p className="mt-4 text-green-400 text-sm">✅ Your request has been submitted!</p>
            )}

            {error && (
                <p className="mt-4 text-red-500">{error}</p>
            )}
        </div>
    );
}
