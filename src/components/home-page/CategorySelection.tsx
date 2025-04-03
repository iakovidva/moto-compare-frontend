import Image from "next/image";
import Link from "next/link";

const categories = [
    { id: "ADVENTURE", name: "Adventure", image: "/images/motorcycles/ktm-790-adventure.jpg" },
    { id: "CRUISER", name: "Cruiser", image: "/images/motorcycles/ktm-790-adventure.jpg" },
    { id: "SPORT_TURING", name: "Sport Turing", image: "/images/motorcycles/ktm-790-adventure.jpg" },
    { id: "NAKED", name: "Naked", image: "/images/motorcycles/ktm-790-adventure.jpg" },
];

export default function CategorySelection() {
    return (
        <div className="m-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Explore by Category</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link key={category.id} href={`/motorcycles?category=${category.id}`} className="group">
                        <div className="relative w-full h-40 md:h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md transition transform group-hover:scale-105">
                            <Image
                                fill
                                priority
                                sizes="85%"
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <span className="text-white text-lg md:text-xl font-semibold">{category.name}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
