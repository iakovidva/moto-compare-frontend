import Link from "next/link";

export default function CombinedHeroSection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2">
            {/* Compare Hero */}
            {/* bg-[url('/images/hero-compare.jpg')] bg-cover bg-center */}
            <div className="relative h-[45vh] lg:h-[60vh] bg-amber-700">
                <Hero
                    label="Compare. Choose. Ride."
                    text="Side-by-side motorcycle specs to help you pick the perfect ride."
                    buttonText="Start Comparing"
                    buttonClasses="bg-blue-600 hover:bg-blue-700"

                />
            </div>
            <div className="relative h-[45vh] lg:h-[60vh] bg-amber-800">
                <Hero
                    label="Browse Motorcycles"
                    text="Explore our catalog by style, brand, or performance level."
                    buttonText="Browse Now"
                    buttonClasses="bg-green-600 hover:bg-green-700"

                />
            </div>


        </section>
    );
}

const Hero = ({ label, text, buttonText, buttonClasses }: { label: string, text: string, buttonText: string, buttonClasses: string }) => {
    return (
        <>
            <div className="absolute inset-0  bg-opacity-60" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h2 className="text-white text-4xl font-bold">{label}</h2>
                <p className="text-gray-200 mt-2 text-lg max-w-md">{text}</p>
                <Link href="/motorcycles">
                    <span className={`mt-4 inline-block text-white font-semibold py-2 px-5 rounded-xl shadow transition ${buttonClasses}`}>
                        {buttonText}
                    </span>
                </Link>
            </div>
        </>
    );
}