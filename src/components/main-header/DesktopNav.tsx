"use client"

import { navItems } from "@/models/navItems";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

export default function DesktopNav() {
    const path = usePathname();
    const isActive = (href: string) => path === href;

    return (
        <div className="hidden md:flex w-full items-center justify-between px-6">

            <div className="flex-1 flex justify-center space-x-8">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.path}
                        className={`font-medium transition-colors ${isActive(item.path)
                            ? 'text-orange-500'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="flex items-center space-x-4">
                <ThemeToggle />
                <UserMenu />
            </div>
        </div>
    );
};