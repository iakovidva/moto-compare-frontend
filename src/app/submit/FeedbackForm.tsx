import { submitFeedbackRequest } from '@/lib/api/requests';
import React, { useState } from 'react';

enum FeedbackType {
    FeatureRequest = 'Feature Request',
    BugReport = 'Bug Report',
    ImprovementSuggestion = 'Improvement Suggestion',
    GeneralFeedback = 'General Feedback'
}

export interface FeedbackRequest {
    type: FeedbackType | '';
    subject: string;
    text: string;
}

export default function FeedbackForm() {
    const [formData, setFormData] = useState<FeedbackRequest>({
        type: FeedbackType.GeneralFeedback,
        subject: '',
        text: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await submitFeedbackRequest(formData);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2000);
            if (!loading)
                setFormData({
                    type: '',
                    subject: '',
                    text: ''
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
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-muted text-foreground border border-gray-700 focus:ring-2 focus:ring-orange-500"
                >
                    <option value="" disabled>
                        Select Feedback Type
                    </option>
                    {Object.values(FeedbackType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-muted text-foreground border border-gray-700 focus:ring-2 focus:ring-orange-500"
                />

                <textarea
                    name="text"
                    placeholder="Tell us more about your feedback..."
                    value={formData.text}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-muted text-foreground border border-gray-700 focus:ring-2 focus:ring-orange-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md font-semibold text-white transition ${loading
                        ? "bg-orange-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit Feedback"}
                </button>
            </form>

            {submitted && (
                <p className="mt-4 text-green-400 text-center">✅ Thanks! Your feedback has been received.</p>
            )}

            {error && (
                <p className="mt-4 text-red-400 text-center">{error}</p>
            )}
        </>
    );
};