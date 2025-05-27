import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";
import { useCompareStore } from "@/store/compareStore";
import CompareToggleButton from "../comparison/CompareToggleButton";

const MotorcycleCard = ({ motorcycle, actionSlot }: { motorcycle: MotorcycleSummary, actionSlot?: React.ReactNode }) => {

    const { selected } = useCompareStore();

    const isMotoSelected = selected.find((m) => m.id === motorcycle.id);

    return (
        <motion.div
            className={`flex flex-col justify-between border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg h-full
                    ${isMotoSelected ? "border-4 rounded-3xl border-blue-800 bg-blue-400" : ""}`}
            whileHover={{ scale: 1.02 }}
        >
            <Link href={`/motorcycles/${motorcycle.id}`}>
                <Image
                    alt={motorcycle.model}
                    src={motorcycle.image}
                    width={200}
                    height={100}
                    className="w-full h-32 object-cover"
                />
                <div className="p-2">
                    <h2 className="text-lg font-bold">{motorcycle.model}  ({motorcycle.yearRange})</h2>
                    <p className="text-gray-600">{motorcycle.manufacturer}</p>
                    <p className="text-gray-800 font-semibold">{motorcycle.category}</p>
                    <p className="text-gray-800">{motorcycle.displacement}cc {motorcycle.horsePower} HP</p>
                </div>
            </Link>
            <div className="flex flex-col sm:flex-row justify-end gap-2 px-3 py-2 text-sm border-t">
                {actionSlot}
                <CompareToggleButton bike={motorcycle} compact />
            </div>

        </motion.div>
    );
};
export default MotorcycleCard;
