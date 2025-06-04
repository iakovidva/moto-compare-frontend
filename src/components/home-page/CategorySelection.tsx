import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: "ADVENTURE",
        name: "Adventure",
        // image: "/images/categories/adventure.jpg",
        image: "/images/manufacturers/bmw-logo.png"
    },
    {
        id: "CRUISER",
        name: "Cruiser",
        // image: "/images/categories/cruiser.jpg",
        image: "/images/manufacturers/bmw-logo.png"
    },
    {
        id: "SPORT_TOURING",
        name: "Sport Touring",
        // image: "/images/categories/sport-touring.jpg",
        image: "/images/manufacturers/bmw-logo.png"
    },
    {
        id: "NAKED",
        name: "Naked",
        // image: "/images/categories/naked.jpg",
        image: "/images/manufacturers/bmw-logo.png"
    },
];

export default function CategorySelection() {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">🏍️ Explore by Category</h2>
                <p className="text-gray-500 mt-2">Find motorcycles that match your riding style</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/motorcycles?category=${category.id}`}
                        className="group"
                    >
                        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                sizes="100%"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold">{category.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
