const Welcome: React.FC = () => {
    return (
        <section className="text-center py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <h1 className="text-5xl font-extrabold tracking-tight">
                Welcome to <span className="text-orange-500">MotoCompare</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Your one-stop platform to compare motorcycles and choose your next two-wheeled adventure with confidence.
            </p>
        </section>
    );
};

export default Welcome;