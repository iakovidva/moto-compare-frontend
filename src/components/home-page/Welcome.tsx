const Welcome: React.FC = () => {
    return (
        <section className="py-8 md:py-16 border-t">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
                    Welcome to MotoCompare
                </h2>
                <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto text-muted-foreground">
                    The ultimate platform for motorcycle enthusiasts. Compare specifications,
                    read reviews, and find your perfect ride with our comprehensive database
                    of motorcycles from all major manufacturers.
                </p>
            </div>
        </section>
    );
};

export default Welcome;