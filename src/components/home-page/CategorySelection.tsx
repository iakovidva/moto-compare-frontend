import { getCategoryStats } from "@/lib/api/statistics";
import Link from "next/link";

export default async function CategorySelection() {

    const categories = await getCategoryStats();

    return (
        <section className="py-8 md:py-16 bg-muted">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-foreground">
                        Browse by Category
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground">
                        Find motorcycles that match your riding style
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.category}
                            href={`/motorcycles?category=${category.category.toUpperCase()}`}
                            className="group block"
                        >
                            <div className="bg-background rounded-lg overflow-hidden shadow-lg  transition-all duration-300 hover:bg-accent hover:shadow-xl group-hover:-translate-y-2">
                                <div className={`h-32 md:h-48 relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-white">
                                        <h3 className="text-lg md:text-2xl font-bold">{category.category}</h3>
                                        <p className="text-white text-opacity-90 text-sm md:text-base">{category.counter}</p>
                                    </div>
                                </div>
                                <div className="p-3 md:p-6">
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        Explore {category.category.toLowerCase()} motorcycles
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
