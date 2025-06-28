"use client";

import { fetchMotorcycleDetails, fetchMotorcycleSummary } from "@/lib/api/motorcycles";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { useCompareStore } from "@/store/compareStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FeatureComparisonTable from "./FeautureComparisonTable";
import { extractMotoIdsFromPathname, slugify } from "@/lib/utils";
import NumericSpecsComparison from "./NumericSpecsComparison";
import { Button } from "../ui/button";
import PopularComparisons from "./PopularComparisons";
import ComparePlaceholders from "./ComparePlaceholders";

export default function CompareMotorcycles() {
    const router = useRouter();
    const pathname = usePathname();

    const [bikesDetails, setBikesDetails] = useState<MotorcycleDetailsModel[]>([]);
    const { selected, addToCompare } = useCompareStore();

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
        return (<>
            <div className="max-w-3xl mx-auto px-6 py-4 text-center bg-muted shadow-lg rounded-2xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-background text-blue-600 p-4 rounded-full">
                        <p>🏍️</p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-3">No Motorcycles Selected</h2>
                <p className="mb-4 md:mb-6 text-sm md:text-base text-muted-foreground">
                    Start by browsing motorcycles and adding them to your comparison list
                </p>

                <Link href="/motorcycles">
                    <Button className="bg-orange-500 hover:bg-orange-600 mb-6 md:mb-8 text-sm md:text-base">
                        Browse Motorcycles
                    </Button>
                </Link>

            </div>
            {/* <PopularComparisons /> */}
        </>
        );
    }

    return (
        <div>
            <ComparePlaceholders motorcycles={bikesDetails} />
            <NumericSpecsComparison bikesDetails={bikesDetails} />
            <FeatureComparisonTable bikeDetails={bikesDetails} />
        </div>
    );
}
