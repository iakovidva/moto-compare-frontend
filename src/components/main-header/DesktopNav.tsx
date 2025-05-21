import { navItems } from "@/models/navItems";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function DesktopNav() {
    return (
        <>
            <div className="hidden md:flex flex-1 justify-center px-4">
                <ul className="flex gap-6">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link href={item.path} className="hover:text-gray-400 transition">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-32 flex-shrink-0 text-right hidden md:block">
                <UserMenu variant="desktop" />
            </div>
        </>
    );
};