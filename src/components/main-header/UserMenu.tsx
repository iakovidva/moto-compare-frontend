"use client"

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { logout } from "@/lib/api/auth";

type Props = {
    variant: 'desktop' | 'mobile';
    onClose?: () => void;
};

export default function UserMenu({ variant, onClose }: Props) {
    const { accessToken, email, role } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const isMobile = variant === 'mobile';
    const userName = email?.split('@')[0] || 'Account';

    if (!accessToken) {
        return (
            <>
                <button onClick={() => setShowAuthModal(true)} className="hover:text-gray-400 transition">
                    Account
                </button>
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

    if (isMobile) {
        return (
            <>
                <div className="text-gray-400 mb-4">
                    Signed in as <span className="text-white">{userName}</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    {menuItems.map(({ href, label }) => (
                        <Link key={label} href={href} onClick={onClose} className="text-xl hover:text-gray-400 transition">
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
            </>
        );
    }

    // Desktop
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:text-gray-400 transition"
            >
                <span>My Account</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700 ">
                    <div className="whitespace-nowrap ml-4">
                        {menuItems.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="block px-4 py-2 hover:bg-gray-700 transition text-right"
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
                            className="block w-full px-4 py-2 text-red-400 hover:text-red-300 transition text-right"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </div>
    );
};