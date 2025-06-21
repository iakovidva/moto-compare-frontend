import Link from "next/link";
import { Button } from "../ui/button";

export default function Quiz() {
    return (
        <section className="py-8 md:py-16 bg-muted border-t">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-foreground text-3xl">?</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
                        Not Sure Which Bike is Right for You?
                    </h2>
                    <p className="text-base md:text-xl mb-6 md:mb-8 text-muted-foreground">
                        Take our interactive quiz and discover motorcycles perfectly matched to your riding style,
                        experience level, and preferences. Get personalized recommendations in just a few minutes!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/quiz">
                            <Button
                                size="lg"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                Take the Quiz <span className="ml-3 h-6 w-6">→</span>
                            </Button>
                        </Link>
                        <Link href="/motorcycles">
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 border-foreground text-foreground hover:bg-foreground hover:text-background hover:scale-105"
                            >
                                Browse All Bikes
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};