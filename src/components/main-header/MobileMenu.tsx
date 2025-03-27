"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/models/navItems";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
                ☰
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center z-50">
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-6 text-3xl text-white">
                        ✕
                    </button>

                    <ul className="space-y-6 text-center">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link href={item.path} className="text-xl hover:text-gray-400 transition" onClick={() => setIsOpen(false)}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;