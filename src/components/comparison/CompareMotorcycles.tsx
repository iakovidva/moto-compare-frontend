"use client";

import { fetchMotorcycleDetails, fetchMotorcycleSummary } from "@/lib/api/motorcycles";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { useCompareStore } from "@/store/compareStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FeatureComparisonTable from "./FeautureComparisonTable";
import { extractMotoIdsFromPathname, slugify } from "@/lib/utils";
import NumericSpecsComparison from "./NumericSpecsComparison";

export default function CompareMotorcycles() {
    const router = useRouter();
    const pathname = usePathname();

    const [bikesDetails, setBikesDetails] = useState<MotorcycleDetailsModel[]>([]);
    const { selected, addToCompare } = useCompareStore();

    // A ref to mark that we're in the “initial sync” phase
    const isInitial = useRef(true);

    // Sync motos from URL to state in the first visit
    useEffect(() => {
        const motoIds = extractMotoIdsFromPathname(pathname);

        if (motoIds.length > 0) {
            const fetchAndAddBikes = async () => {
                for (const id of motoIds) {
                    if (!selected.some((b) => b.id === id)) {
                        const bike = await fetchMotorcycleSummary(id);
                        if (bike) addToCompare(bike);
                    }
                }
            }

            fetchAndAddBikes();
        }
        isInitial.current = false;
    }, []);

    // whenever selected motorcycles change, change the URL
    useEffect(() => {
        if (isInitial.current) return;

        const q: string = selected.map((bike) =>
            (slugify(bike.model) + '-' + bike.id))
            .join("_vs_");
        router.push(`/compare/${q}`);
    }, [selected])

    // fetching all the details for the selected bikes!
    useEffect(() => {
        async function fetchDetails() {
            const details = await Promise.all(
                selected.map((bike) => fetchMotorcycleDetails(bike.id))
            );
            setBikesDetails(details.filter((detail): detail is MotorcycleDetailsModel => detail !== null)); // Remove null values
        }
        if (selected.length > 0) fetchDetails();
    }, [selected]);

    if (selected.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-16 text-center bg-white shadow-lg rounded-2xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                        <p>🏍️</p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-3">No Motorcycles Selected</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Use the <strong>Compare</strong> button while browsing to add motorcycles here.
                    Compare up to <strong>4 bikes</strong> side-by-side and find the perfect match for your ride.
                </p>

                <Link href="/motorcycles">
                    <span className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition">
                        Browse Motorcycles
                    </span>
                </Link>
            </div>
        );
        // return (
        //     <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        //         <h2 className="text-2xl font-semibold mb-4">No motorcycles selected</h2>
        //         <p className="text-gray-600 mb-6">
        //             Select up to 4 motorcycles to compare their specs side by side.
        //         </p>
        //         <Link
        //             href="/motorcycles"
        //             className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        //         >
        //             Browse Motorcycles
        //         </Link>
        //     </div>
        // );
    }

    return (
        <div>
            <div className="flex flex-wrap lg:flex-nowrap justify-center bg-gray-200 p-4 m-4">
                {bikesDetails.map((bike) => (
                    <Link
                        key={bike.id}
                        className="flex-shrink-0 w-5/12 sm:w-1/3 md:w-1/4  xl:w-2/8 rounded-lg flex flex-col items-center transition hover:shadow-md px-2 "
                        href={`motorcycles/${bike.id}`
                        }>
                        <div className="w-full h-40 mb-3 overflow-hidden rounded-md ">
                            <Image
                                width={300}
                                height={300}
                                src={bike.image}
                                alt="bike image"
                                className="w-full h-full object-cover "
                            />
                        </div>
                        <h2>{bike.manufacturer} {bike.model}</h2>
                        <p>{bike.yearRange}</p>

                    </Link>
                ))}
            </div>
            <NumericSpecsComparison bikesDetails={bikesDetails} />
            <FeatureComparisonTable bikeDetails={bikesDetails} />
        </div>
    );
}
