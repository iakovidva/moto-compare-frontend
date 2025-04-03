import Link from "next/link";

export default function CombinedHeroSection() {
    return (
        <section className="flex flex-col lg:flex-row w-full">
            {/* Compare Hero - Left Column */}
            <div
                className="relative w-full lg:w-1/2 h-[40vh] md:h-[50vh] bg-cover bg-center flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black opacity-90"></div>
                <div className="relative z-10 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Compare Your Favorite Motorcycles
                    </h2>
                    <p className="mt-2 text-base md:text-lg text-gray-200">
                        Side-by-side specs and performance to find your ideal ride.
                    </p>
                    <Link href="/compare"
                        className="mt-4 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition">
                        Start Comparing

                    </Link>
                </div>
            </div>

            {/* Browse Hero - Right Column */}
            <div
                className="relative w-full lg:w-1/2 h-[40vh] md:h-[50vh] bg-cover bg-center flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="relative z-10 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Browse All Motorcycles
                    </h2>
                    <p className="mt-2 text-base md:text-lg text-gray-200">
                        Explore our extensive catalog to find your dream motorcycle.
                    </p>
                    <Link href="/motorcycles"
                        className="mt-4 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition">
                        Browse Motorcycles

                    </Link>
                </div>
            </div>
        </section>
    );
}
