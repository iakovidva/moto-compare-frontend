import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center text-white"
            style={{ backgroundImage: "url('/images/motorcycles/ducati-desert-X.png')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark Overlay */}

            <div className="relative text-center px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Next Adventure</h1>
                <p className="text-lg md:text-xl mb-6">Discover & compare the best motorcycles for your journey.</p>

                <Link href="/motorcycles" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                    Browse Motorcycles
                </Link>
            </div>
        </div>
    );
}
