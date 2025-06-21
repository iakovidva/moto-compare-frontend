"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/models/navItems";
import Link from "next/link";
import { Button } from "../ui/button";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "../ThemeToggle";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className="md:hidden flex w-full items-center justify-end">
            <ThemeToggle />
            <Button
                variant="ghost"
                onClick={handleToggle}
                className="text-muted hover:text-foreground text-2xl"
                aria-label="Open menu"
            >
                ☰
            </Button>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col">
                    <div className="flex justify-end p-4">
                        <Button
                            variant="ghost"
                            onClick={handleToggle}
                            className="text-2xl hover:bg-background hover:text-foreground"
                            aria-label="Close menu"
                        >
                            ✕
                        </Button>
                    </div>

                    <nav className="flex-1 flex flex-col justify-center items-center space-y-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                onClick={handleToggle}
                                className="text-xl font-semibold hover:text-muted-foreground transition"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-border text-center">
                        <UserMenu onClose={handleToggle} />
                    </div>
                </div>
            )}
        </div>
    );
}
