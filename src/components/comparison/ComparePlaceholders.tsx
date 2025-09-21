
import { MotorcycleDetailsModel } from '@/models/MotorcycleDetailsModel';
import { useCompareStore } from '@/store/compareStore';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FavoriteToggleButton from '../motorcycle/FavoriteToggleButton';

interface ComparePlaceholdersProps {
    motorcycles: MotorcycleDetailsModel[];
}

const ComparePlaceholders = ({ motorcycles }: ComparePlaceholdersProps) => {
    const { removeFromCompare } = useCompareStore();

    const placeholders = Array.from({ length: 4 }, (_, index) => {
        const motorcycle = motorcycles[index];
        return { index, motorcycle };
    });

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {placeholders.map(({ index, motorcycle }) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 min-h-[200px] flex flex-col">
                    {motorcycle ? (
                        <>
                            <button
                                onClick={() => removeFromCompare(motorcycle.id)}
                                className="self-end mb-2 text-red-500 hover:text-red-600"
                            >
                                X
                            </button>
                            <div className="flex-1 flex flex-col justify-center text-center">
                                <div className="bg-gradient-to-br from-muted to-muted/80 rounded mb-3 flex items-center justify-center">
                                    <Image
                                        width={300}
                                        height={300}
                                        src={motorcycle.image}
                                        alt="bike image"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="font-bold text-sm text-foreground">
                                    {motorcycle.model}
                                </h3>
                                <p className="text-xs text-muted-foreground mb-3">
                                    {motorcycle.manufacturer}
                                </p>
                                <FavoriteToggleButton bike={motorcycle} compact />
                            </div>
                        </>
                    ) : (
                        <Link href="/motorcycles" className="flex-1 flex flex-col justify-center items-center text-center hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center mb-3">
                                +
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Add a bike
                            </p>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ComparePlaceholders;
