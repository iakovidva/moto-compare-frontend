export default function ComparePageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center bg-blue-50 rounded-xl p-8 mt-6 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                    Compare Your Favorite Bikes
                </h1>
                <p className="text-md md:text-lg text-blue-600">
                    Pick up to 4 motorcycles to see side-by-side specs, performance charts, and key differences at a glance.
                </p>
            </div>
            {children}
        </div>
    );
}
