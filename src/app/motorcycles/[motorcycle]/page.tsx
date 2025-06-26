import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import SimilarBikes from '@/components/motorcycle/SimilarBikes';
import { SimilarBike } from '@/models/SimilarBike';
import MotorcycleDetails from '@/components/motorcycle/MotorcycleDetails';
import { fetchMotorcycleDetails } from '@/lib/api/motorcycles';
import { MotorcycleDetailsModel } from '@/models/MotorcycleDetailsModel';
import ReportIncorrectSpec from '@/components/motorcycle/ReportIncorrectSpec';
import CompareToggleButton from '@/components/comparison/CompareToggleButton';
import FavoriteToggleButton from '@/components/motorcycle/FavoriteToggleButton';
import NewReviewsSection from '@/components/motorcycle/reviews/NewReviewsSection';
import RatingSummary from '@/components/motorcycle/reviews/RatingSummary';

type Params = {
    motorcycle: string;
};

type Props = {
    params: Promise<Params>
}

export default async function MotorcyclePage({ params }: Props) {
    const { motorcycle: id } = await params;

    const motorcycle: MotorcycleDetailsModel | null = await fetchMotorcycleDetails(id);

    if (!motorcycle) {
        notFound();
    }

    const similarBikes: SimilarBike[] = motorcycle.similarMotorcycles;

    return (
        <div className="min-h-screen bg-background">

            {/* TOP LEFT COMPONENT*/}
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-foreground">{motorcycle.model}</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mt-2">{motorcycle.manufacturer} • {motorcycle.yearRange}</p>
                        <div className="flex items-center mt-2">
                            <span className="ml-2 text-sm text-muted-foreground">
                                <RatingSummary motorcycleId={motorcycle.id} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mx-auto px-4 py-4 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg shadow-lg overflow-hidden mb-6 md:mb-8">
                            <div className="h-48 md:h-96 flex items-center justify-center relative">
                                <Image
                                    src={motorcycle.image}
                                    alt={motorcycle.manufacturer}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 1896px) 200vw, 1896px"
                                />
                            </div>
                        </div>

                        {/* Quick Actions : MOBILE ONLY */}
                        <div className="lg:hidden bg-card rounded-lg shadow-lg p-4 mb-6">
                            <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                                <CompareToggleButton bike={motorcycle} />
                                <FavoriteToggleButton bike={motorcycle} />
                            </div>
                        </div>

                        {/* Detailed Specifications */}
                        <div className="bg-card rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Detailed Specifications</h2>
                            <MotorcycleDetails motorcycle={motorcycle} />
                            <ReportIncorrectSpec bike={motorcycle} />
                        </div>

                        <div className="mb-6 md:mb-8">
                            <SimilarBikes similarBikes={similarBikes} />
                        </div>

                        <NewReviewsSection motorcycleId={motorcycle.id} />
                    </div>

                    {/* Right Column - Actions & Quick Specs - Desktop Only */}
                    <div className="lg:col-spa  n-1 hidden lg:block">
                        <div className="bg-card rounded-lg shadow-lg p-4 md:p-6 sticky top-6">
                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">Quick Actions</h3>

                            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                                <CompareToggleButton bike={motorcycle} />
                                <FavoriteToggleButton bike={motorcycle} />
                            </div>

                            <div className="border-t border-border pt-4 md:pt-6">
                                <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Key Specifications</h4>
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-xs md:text-sm">Year:</span>
                                        <span className="font-medium text-foreground text-xs md:text-sm">{motorcycle.yearRange}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-xs md:text-sm">Displacement:</span>
                                        <span className="font-medium text-foreground text-xs md:text-sm">{motorcycle.displacement}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-xs md:text-sm">Horsepower:</span>
                                        <span className="font-medium text-foreground text-xs md:text-sm">{motorcycle.horsePower}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-xs md:text-sm">Weight:</span>
                                        <span className="font-medium text-foreground text-xs md:text-sm">{motorcycle.weight}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-xs md:text-sm">Seat Height:</span>
                                        <span className="font-medium text-foreground text-xs md:text-sm">{motorcycle.seatHeight}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { motorcycle: id } = await params;

    const motorcycle = await fetchMotorcycleDetails(id);

    if (!motorcycle) {
        return {
            title: 'Motorcycle Not Found',
        };
    }

    return {
        title: motorcycle.manufacturer,
        description: motorcycle.model,
        authors: { name: 'VAIAK' },
    };
}

