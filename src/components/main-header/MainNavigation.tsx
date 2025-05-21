import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const MainNavigation: React.FC = () => {

    return (
        <nav className="bg-gray-900 text-white p-4 md:p-8">
            <div className="container mx-auto flex justify-between items-center">
                <Logo />
                <DesktopNav />
                <MobileNav />
            </div>
        </nav >
    );
}

const Logo = () => (
    <div className="w-48 flex-shrink-0">
        <Link href="/" className="text-2xl font-bold">
            MotoCompare
        </Link>
    </div>
);

export default MainNavigation;