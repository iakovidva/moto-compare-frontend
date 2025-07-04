import Link from "next/link";

const categories = [
    {
        name: 'Sport',
        count: '57',
        image: '/placeholder.svg?height=200&width=300',
        color: 'bg-blue-500'
    },
    {
        name: 'Cruiser',
        count: '42',
        image: '/placeholder.svg?height=200&width=300',
        color: 'bg-green-500'
    },
    {
        name: 'Adventure',
        count: '38',
        image: '/placeholder.svg?height=200&width=300',
        color: 'bg-orange-500'
    },
    {
        name: 'Touring',
        count: '25',
        image: '/placeholder.svg?height=200&width=300',
        color: 'bg-purple-500'
    },
    {
        name: 'Street',
        count: '63',
        image: '/placeholder.svg?height=200&width=300',
        color: 'bg-red-500'
    },
    {
        name: 'Dirt',
        count: '31',
        image: '/placeholder.svg?height=200&width=300',
        color: 'bg-yellow-500'
    }
]; //TODO USE REAL DATA HERE.

export default function CategorySelection() {
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
                            key={category.name}
                            href={`/motorcycles?category=${category.name.toUpperCase()}`}
                            className="group block"
                        >
                            <div className="bg-background rounded-lg overflow-hidden shadow-lg  transition-all duration-300 hover:bg-accent hover:shadow-xl group-hover:-translate-y-2">
                                <div className={`h-32 md:h-48 ${category.color} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-white">
                                        <h3 className="text-lg md:text-2xl font-bold">{category.name}</h3>
                                        <p className="text-white text-opacity-90 text-sm md:text-base">{category.count}</p>
                                    </div>
                                </div>
                                <div className="p-3 md:p-6">
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        Explore {category.name.toLowerCase()} motorcycles
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
