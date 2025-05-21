"use client"

import { navItems } from "@/models/navItems";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="text-white text-2xl focus:outline-none"
                aria-label="Open menu">
                ☰
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50">
                    <div className="flex flex-col h-full p-6">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="self-end text-white text-3xl mb-8"
                            aria-label="Close menu">
                            ✕
                        </button>

                        <ul className="space-y-6 flex-1 flex flex-col items-center justify-center">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.path}
                                        className="block text-xl py-3 hover:text-gray-400 transition text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-gray-700 pt-6 text-center">
                            <UserMenu variant="mobile" onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};