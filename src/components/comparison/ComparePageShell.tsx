export default function ComparePageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="bg-card border-b border-border mb-8">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Compare Your Favorite Bikes
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                        Add up to 4 motorcycles to compare their specifications side by side
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}
