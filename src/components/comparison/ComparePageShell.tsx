export default function ComparePageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="bg-blue-100 border border-blue-200 rounded-2xl px-6 py-10 text-center shadow-sm mt-8 mb-12 relative">
                <div className="absolute left-6 top-6 hidden md:flex items-center justify-center w-12 h-12 bg-blue-200 text-blue-700 rounded-full">
                    ⚖️
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
                        Compare Your Favorite Bikes
                    </h1>
                    <p className="text-base md:text-lg text-blue-700 leading-relaxed">
                        Add up to 4 motorcycles to view side-by-side specifications, engine performance, and key differences — all in one place.
                    </p>
                </div>

                {/* Optional CTA if no bikes selected */}
                {/* 
                <div className="mt-6">
                    <Link
                        href="/motorcycles"
                        className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Browse Motorcycles
                    </Link>
                </div>
                */}
            </div>
            {children}
        </div>
    );
}
