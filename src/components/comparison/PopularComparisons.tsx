
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCompareStore } from '@/store/compareStore';
import { fetchMotorcycleSummary } from '@/lib/api/motorcycles';

const popularComparisons = [
    {
        title: 'Sport Bikes Showdown',
        bikes: ['Ninja ZX-10R', 'Panigale V4'],
        description: 'Compare top sport bikes'
    },
    {
        title: 'Adventure Ready',
        bikes: ['R1250GS', 'Gold Wing'],
        description: 'Touring vs Adventure'
    },
    {
        title: 'Street Performance',
        bikes: ['MT-09', 'Street 750'],
        description: 'Urban riding machines'
    }
];

const PopularComparisons = () => {
    const { selected, addToCompare } = useCompareStore();

    async function handlePopularComparison(comparison: typeof popularComparisons[0]) {
        // Add mock motorcycles for demonstration
        const mockMotorcycles = [await fetchMotorcycleSummary("1"), await fetchMotorcycleSummary("2")];

        mockMotorcycles.forEach(bike => {
            if (bike) addToCompare(bike);
        });
    };

    return (
        <div className="py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Popular Comparisons
                </h2>
                <p className="text-lg text-muted-foreground">
                    Try these popular bike comparisons to get started
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularComparisons.map((comparison, index) => (
                    <div
                        key={index}
                        className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                            {comparison.title}
                        </h3>
                        <p className="text-sm mb-3 text-muted-foreground">
                            {comparison.description}
                        </p>
                        <div className="mb-4">
                            {comparison.bikes.map((bike, bikeIndex) => (
                                <span
                                    key={bikeIndex}
                                    className="inline-block px-2 py-1 rounded text-xs mr-2 mb-1 bg-muted text-muted-foreground"
                                >
                                    {bike}
                                </span>
                            ))}
                        </div>
                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => handlePopularComparison(comparison)}
                        >
                            Compare Now
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularComparisons;
