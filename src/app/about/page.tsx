
import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-6 text-foreground">
                            About MotoCompare
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Your ultimate destination for motorcycle comparison and discovery
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="border border-border p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">
                                Our Mission
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We believe every rider deserves to find their perfect motorcycle. MotoCompare was created
                                to simplify the bike selection process by providing comprehensive specifications,
                                user reviews, and side-by-side comparisons.
                            </p>
                        </div>

                        <div className="border p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">
                                What We Offer
                            </h2>
                            <ul className="text-muted-foreground space-y-2">
                                <li>• Comprehensive motorcycle database</li>
                                <li>• Advanced filtering and search</li>
                                <li>• Side-by-side comparisons</li>
                                <li>• User reviews and ratings</li>
                                <li>• Mobile-friendly experience</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border border-border p-8 rounded-lg text-center">
                        <h2 className="text-3xl font-bold mb-4 text-foreground">
                            Join Our Community
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Whether you're a seasoned rider or just starting your motorcycle journey,
                            MotoCompare is here to help you make informed decisions and connect with
                            fellow motorcycle enthusiasts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold">
                                Get Started
                            </button>
                            <button className="border border-border text-foreground hover:bg-accent px-8 py-3 rounded-lg font-semibold">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
