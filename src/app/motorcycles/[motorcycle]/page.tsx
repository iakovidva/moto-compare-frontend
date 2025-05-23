import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import SimilarBikes from '@/components/motorcycle/SimilarBikes';
import { SimilarBike } from '@/models/SimilarBike';
import ActionButtons from '@/components/motorcycle/ActionButtons';
import MotorcycleDetails from '@/components/motorcycle/MotorcycleDetails';
import { fetchMotorcycleDetails } from '@/lib/api/motorcycles';
import { MotorcycleDetailsModel } from '@/models/MotorcycleDetailsModel';
import CompareToggleButton from '@/components/comparison/CompareToggleButton';
import ReviewsWrapper from '@/components/motorcycle/reviews/ReviewsWrapper';

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
        <div className="container mx-auto p-8">
            {/* Left Side - Motorcycle Details */}
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:flex-grow bg-white shadow-lg rounded-lg overflow-hidden">

                    <div className="relative aspect-video">
                        <Image
                            src={motorcycle.image}
                            alt={motorcycle.manufacturer}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 896px) 100vw, 896px"
                        />
                    </div>
                    <div className="flex justify-end mr-4">
                        <CompareToggleButton bike={motorcycle} />
                    </div>

                    <ReviewsWrapper option="rating-summary" motorcycleId={motorcycle.id} />

                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-2">{motorcycle.model}</h1>
                        <p className="text-gray-600 mb-4">{motorcycle.manufacturer}</p>

                        <MotorcycleDetails motorcycle={motorcycle} />
                        <ActionButtons bike={motorcycle} />
                    </div>

                    <div id="review-section">
                        <ReviewsWrapper option="reviews" motorcycleId={motorcycle.id} />
                    </div>
                </div>

                <div className="lg:self-start mt-8 lg:mt-0 lg:w-1/3 lg:max-w-[400px] bg-gray-100 p-4 rounded-lg shadow-md">
                    <SimilarBikes similarBikes={similarBikes} />
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

