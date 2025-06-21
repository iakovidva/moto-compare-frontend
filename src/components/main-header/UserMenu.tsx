"use client"

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { logout } from "@/lib/api/auth";
import { Button } from "../ui/button";

type Props = {
    onClose?: () => void;
};

export default function UserMenu({ onClose }: Props) {
    const { accessToken, email, role } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const userName = email?.split('@')[0] || 'Account';

    if (!accessToken) {
        return (
            <>
                <Button variant="ghost" onClick={() => setShowAuthModal(true)} className="text-xl md:text-sm text-muted-foreground hover:text-foreground">
                    Sign In
                </Button>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </>
        );
    }

    const menuItems = [
        { href: '/profile', label: 'Profile' },
        { href: '/favorites', label: 'Favorites' },
        ...(role === 'ADMIN'
            ? [
                { href: '/requests', label: 'Open Requests' },
                { href: '/motorcycles/create', label: 'Create motorcycle' },
            ]
            : []),
    ];

    return (
        <>
            {/* MOBILE */}
            <div className="md:hidden bg-muted rounded-xl p-4">
                <div className="text-foreground mb-4">
                    Signed in as <span className="text-foreground">{userName}</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    {menuItems.map(({ href, label }) => (
                        <Link key={label} href={href} onClick={onClose} className="text-xl text-muted hover:text-foreground transition hover:bg-accent p-1 rounded-md">
                            {label}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            logout();
                            onClose?.();
                        }}
                        className="text-xl text-red-400 hover:text-red-300 transition"
                    >
                        Sign Out
                    </button>
                </div>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex">
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition"
                    >
                        <span>My Account</span>
                    </button>

                    {isOpen && (
                        <div className="bg-muted absolute right-0 mt-2 rounded-md shadow-lg py-1 z-50 ">
                            <div className="whitespace-nowrap ml-4">
                                {menuItems.map(({ href, label }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="block px-4 py-2 transition text-right text-muted-foreground hover:text-foreground hover:bg-accent transition "
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-red-400 hover:bg-accent transition text-right"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
                </div>
            </div>
        </>
    );
};