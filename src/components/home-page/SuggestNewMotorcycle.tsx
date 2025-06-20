import SuggestNewMotorcycleForm from "./SuggestNewMotorcycleForm";

export default function SuggestNewMotorcycle() {
    return (
        <section className="py-8 md:py-16">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-foreground">
                        Missing Your Dream Bike?
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground">
                        Request it and we'll add it to our catalog
                    </p>
                </div>
                <SuggestNewMotorcycleForm />
            </div>
        </section>
    );
}
