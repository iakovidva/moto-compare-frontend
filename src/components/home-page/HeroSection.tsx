import Link from "next/link";
import { Button } from "../ui/button";

const HeroSection: React.FC = () => {
    return (
        <div className="relative min-h-screen flex items-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
            // style={{
            //     backgroundImage: `url('/background.jpg')`
            // }}
            >
                <div className="absolute inset-0 bg-opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                {/* <div className="backdrop-blur-sm bg-background/70 p-8 rounded-lg max-w-3xl shadow-lg"> TODO: CONSIDER ADDING A SLIGHT BACKGROUND HERE BASED ON THEME, SO AN ACTUAL IMAGE BACKGROUND LOOK NICE*/}
                <div className="max-w-3xl">
                    <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
                        Compare.<br />
                        Choose.<br />
                        <span className="text-orange-500">Ride.</span>
                    </h1>
                    <p className="text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl">
                        Compare motorcycle specifications and make the right choice for your next adventure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/compare">
                            <Button
                                size="lg"
                                className="bg-orange-500 hover:bg-orange-600 text-foreground px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                Start Comparing <span className="ml-3 h-6 w-6">→</span>
                                {/* <ArrowRight className="ml-3 h-6 w-6" /> */}
                            </Button>
                        </Link>
                        <Link href="/motorcycles">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                Browse All Bikes
                            </Button>
                        </Link>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div >
    );
};

export default HeroSection;