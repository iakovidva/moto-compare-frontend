"use client"

import { useState, useEffect } from 'react';
import { login, registerUser } from '@/lib/api/auth';
import { validatePassword } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

type FormState = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
    message?: string
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login', message }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
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

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    useEffect(() => {
        if (mode === 'register' && form.password) {
            setErrors(validatePassword(form.password));
        }
    }, [form.password, mode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'register') {
            const error = validatePassword(form.password) || (form.password !== form.confirmPassword && 'Passwords do not match');
            if (error) {
                setErrors(error);
                return;
            }
        }

        setIsSubmitting(true);
        const action = mode === "login" ? () => login(form.email, form.password) : () => registerUser(form.username, form.email, form.password);

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {message && (
                            <div className="p-4 rounded-3xl border-b bg-muted mb-8">
                                <p className="text-center text-sm text-foreground">
                                    {message}
                                </p>
                            </div>
                        )}
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your username"
                                className="w-full p-3 rounded-md bg-muted text-foreground border focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-md bg-muted text-foreground border focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-md bg-muted text-foreground border focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {mode === "register" && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your password"
                                className="w-full p-3 rounded-md bg-muted text-foreground border focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    )}

                    {errors && <p className="text-red-400 text-sm">{errors}</p>}

                    <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>

                    <div className="text-center">
                        <Button
                            type="button"
                            variant="link"
                            onClick={toggleMode}
                            className="text-sm"
                        >
                            {mode === 'login'
                                ? "Don't have an account? Sign up"
                                : "Already have an account? Sign in"
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}