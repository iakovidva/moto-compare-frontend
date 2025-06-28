import { numericalComparisonFields } from "@/constants/comparison";
import StatBarHorizontal from "./StatBarHorizontal";
import { MotorcycleDetailsModel } from "@/models/MotorcycleDetailsModel";

export default function NumericSpecsComparison({ bikesDetails }: { bikesDetails: MotorcycleDetailsModel[] }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 my-4 border">
            {numericalComparisonFields.map((column) => (
                <div key={column.title} className="space-y-4">
                    <h2 className="text-lg font-semibold text-center">{column.title}</h2>
                    {column.fields.map(({ key, label, unit }) => (
                        <StatBarHorizontal
                            key={key}
                            data={bikesDetails}
                            dataKey={key as keyof MotorcycleDetailsModel}
                            label={label}
                            unit={unit}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}