import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/models/navItems";

const MainNavigation: React.FC = () => {
    return (
        <nav className="bg-gray-900 text-white p-8">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    MotoCompare
                </Link>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <MobileMenu />
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-6">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link href={item.path} className="hover:text-gray-400 transition">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default MainNavigation;