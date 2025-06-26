import { categoryIcons } from "@/constants/groupedMotorcycleDetails";
import { FaTools } from "react-icons/fa";

const defaultIcon = <FaTools className="text-white text-xl" />;

interface SpecCardProps {
    category: string;
    fields: Record<string, string | boolean | number>;
    isEditable?: boolean;
    checkedSpecs?: Set<string>;
    updatedSpecs?: Record<string, string>;
    onToggle?: (spec: string) => void;
    onChange?: (spec: string, value: string) => void;
}

export const SpecCard = ({
    category,
    fields,
    isEditable = false,
    checkedSpecs = new Set(),
    updatedSpecs = {},
    onToggle,
    onChange,
}: SpecCardProps) => (
    <div className="self-start rounded-xl shadow-md overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white">
            {categoryIcons[category] || defaultIcon}
            <h2 className="text-lg font-semibold">{formatCategoryName(category)}</h2>
        </div>

        {/* Card Body */}
        <div className="p-4">
            <ul className="space-y-2">
                {Object.entries(fields).map(([key, field]) => {
                    const isChecked = checkedSpecs.has(key);
                    const fieldValue = isChecked ? updatedSpecs[key] ?? String(field) : String(field);

                    return (
                        <li key={key} className="flex flex-col border-b pb-2">
                            {isEditable ? (
                                <>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => onToggle?.(key)}
                                            className="w-4 h-4 mr-2"
                                        />
                                        <span className="text-sm text-foreground">{formatLabel(key)}:</span>
                                    </div>
                                    <input
                                        type="text"
                                        className={`mt-1 w-full border rounded px-2 py-1 ${isChecked ? "bg-muted" : "bg-background"
                                            }`}
                                        value={fieldValue}
                                        onChange={(e) => onChange?.(key, e.target.value)}
                                        disabled={!isChecked}
                                    />
                                </>
                            ) : (
                                <div className="flex justify-between border-b pb-1 text-gray-800">
                                    <span className="text-sm text-foreground">{formatLabel(key)}:</span>
                                    <span className="font-medium text-foreground">
                                        {typeof field === "boolean" ? (field ? "Yes" : "No") : String(field)}
                                    </span>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
);

// 🛠 **Helper Functions**
const formatCategoryName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

const formatLabel = (label: string) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
