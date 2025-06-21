import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const MainNavigation: React.FC = () => {

    return (
        <nav className="bg-muted border-b sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <DesktopNav />
                    <MobileNav />
                </div>
            </div>
        </nav >
    );
}

const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-foreground">
            MotoCompare
        </span>
    </Link>
);

export default MainNavigation;