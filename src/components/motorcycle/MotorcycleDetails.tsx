import { groupedMotoSpecs } from "@/constants/groupedMotorcycleDetails";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";
import { SpecCard } from "./SpecCard";

interface MotorcycleDetailsProps {
    motorcycle: MotorcycleDetailsModel | null;
}

export default async function MotorcycleDetails({ motorcycle }: MotorcycleDetailsProps) {

    if (!motorcycle) return null;
    const motoSpecs = groupedMotoSpecs(motorcycle);

    return (
        <div className="md:columns-2 gap-4 space-y-4">
            {Object.entries(motoSpecs).map(([category, fields]) => (
                <SpecCard key={category} category={category} fields={fields} />
            ))}
        </div>
    );
}
