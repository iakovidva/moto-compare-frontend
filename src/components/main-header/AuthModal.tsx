"use client"

import { useState, useEffect } from 'react';
import { login, registerUser } from '@/lib/api/auth';
import { validatePassword } from '@/lib/utils';

type FormState = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [errors, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState<FormState>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (activeTab === 'register' && form.password) {
            setErrors(validatePassword(form.password));
        }
    }, [form.password, activeTab]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === 'register') {
            const error = validatePassword(form.password) || (form.password !== form.confirmPassword && 'Passwords do not match');
            if (error) {
                setErrors(error);
                return;
            }
        }

        setIsSubmitting(true);
        const action = activeTab === "login" ? () => login(form.email, form.password) : () => registerUser(form.username, form.email, form.password);

        try {
            await action();
            onClose();
        } catch (err: any) {
            setErrors(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md border border-gray-700 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                    disabled={isSubmitting}
                >
                    ✕
                </button>

                {/* Tabs */}
                <div className="flex justify-center space-x-6 mb-6 border-b border-gray-700 pb-2">
                    {["login", "register"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as "login" | "register")}
                            className={`text-lg font-semibold pb-1 ${activeTab === tab
                                ? "text-white border-b-2 border-blue-500"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab === "login" ? "Login" : "Register"}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {activeTab === "register" && (
                        <FormInputField
                            name="username"
                            label="Username"
                            value={form.username}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                        />
                    )}

                    <FormInputField
                        name="email"
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />

                    <FormInputField
                        name="password"
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />

                    {activeTab === "register" && (
                        <FormInputField
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                        />
                    )}

                    {errors && <p className="text-red-400 text-sm">{errors}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}>
                        {isSubmitting ? "Processing..." : activeTab === "login" ? "Login" : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

type FormInputFieldProps = {
    name: keyof FormState;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

const FormInputField = ({ name, label, type = "text", value, onChange, disabled }: FormInputFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-left mb-1">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded text-white focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}