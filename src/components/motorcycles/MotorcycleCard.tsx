import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotorcycleSummary } from "@/models/MotorcycleSummary";

const MotorcycleCard = ({ motorcycle }: { motorcycle: MotorcycleSummary }) => {
    return (
        <motion.div
            className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
        >
            <Link href={`/motorcycles/${motorcycle.id}`}
            >
                <Image
                    alt={motorcycle.model}
                    src={motorcycle.image}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <h2 className="text-lg font-bold">{motorcycle.model}  ({motorcycle.yearRange})</h2>
                <p className="text-gray-600">{motorcycle.manufacturer}</p>
                <p className="text-gray-800 font-semibold">{motorcycle.category}</p>
                <p className="text-gray-800">{motorcycle.displacement}cc {motorcycle.horsePower} HP</p>
                <Link
                    href={`/motorcycles/${motorcycle.id}`}
                    className="block mt-3 text-blue-500 font-medium"
                >
                    View Details →
                </Link>
            </div>
        </motion.div>
    );
};
export default MotorcycleCard;
